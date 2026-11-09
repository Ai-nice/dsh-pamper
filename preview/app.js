/**
 * pamper · 多形象预览页
 * ------------------------------------------------------------------
 * 原生 ES module（无 import / export，便于直接 `node --check` 校验），
 * 不依赖任何 npm 包或构建步骤。
 *
 * 数据流：
 *   manifest.json ──► 形象 / 动作元数据 ──► 每个宠物一个 <canvas>
 *   jsDelivr CDN ──► WebP 精灵图（超大拼图）──► 按 frameCount/fps 逐帧裁剪
 *
 * 渲染：单一 requestAnimationFrame 循环驱动全部宠物；仅在帧号变化时重绘，
 * 精灵图在解码阶段按约 0.65 倍缩放以控制内存（原图单张约 42MP）。
 */

'use strict';

/* ============================================================
 * 常量
 * ============================================================ */

const MANIFEST_FILENAME = 'manifest.json';
const CDN_ROOT = 'https://cdn.jsdelivr.net/gh/hunmer/aboutme-pets@main/';
const MAX_PETS = 6;
const DEFAULT_PETS = 4;

const PET_W = 280; // 宠物默认显示宽度（CSS px）
const PET_H = (PET_W * 9) / 16; // 逻辑画布 640x360 → 16:9
const CANVAS_W = 1280; // canvas 后备分辨率（2 倍于逻辑画布，缩放更清晰）
const CANVAS_H = 720;

const BITMAP_SCALE = 0.65; // 解码缩放比例（控制 42MP 精灵图的内存占用）
const BITMAP_MIN_PIXELS = 8_000_000; // 仅对超大图做缩放
const IMAGE_LOAD_CONCURRENCY = 2; // 同时解码的精灵图数量
const IMAGE_CACHE_BUDGET = 500 * 1024 * 1024; // 解码位图缓存预算（字节）

const MIN_PET_SCALE = 0.5;
const MAX_PET_SCALE = 2;
const ZOOM_STEP = 0.12;
const WHEEL_ZOOM_STEP = 0.06;
const THEME_KEY = 'dpet-preview-theme';

const DEFAULT_SLOTS = [
  { x: 0.15, y: 0.56, scale: 1.04 },
  { x: 0.38, y: 0.5, scale: 0.97 },
  { x: 0.61, y: 0.58, scale: 1.08 },
  { x: 0.85, y: 0.52, scale: 0.95 },
];

const FALLBACK_PACKS = [
  {
    id: 'aboutme-main',
    name: '蓝毛小女仆',
    pack: 'dsh',
    previewOnly: true,
    idle: '待机呼吸休闲',
    extras: [],
    clicks: [
      '点击回应-傲娇生气',
      '点击回应-元气挥手',
      '点击回应-害羞惊讶',
      '点击回应-开心跃动',
      '点击回应-挠痒咯咯笑',
    ],
  },
  {
    id: 'aboutme-dragon',
    name: '白龙娘',
    pack: 'gpt',
    previewOnly: false,
    idle: '待机呼吸起伏',
    extras: ['待机伸懒腰', '待机发丝飘落', '待机吞口水', '待机呆毛摆动'],
    clicks: [],
  },
  {
    id: 'aboutme-claude',
    name: '橙发书娘',
    pack: 'claude',
    previewOnly: false,
    idle: '待机呼吸休闲',
    extras: [],
    clicks: [
      '点击回应-元气挥手',
      '点击回应-挠痒咯咯笑',
      '点击回应-傲娇生气',
      '点击回应-害羞惊讶',
      '点击回应-开心跃动',
    ],
  },
  {
    id: 'aboutme-gemini',
    name: '紫发猫耳娘',
    pack: 'gemini',
    previewOnly: false,
    idle: '待机呼吸休闲',
    extras: [],
    clicks: [
      '点击回应-傲娇生气',
      '点击回应-元气挥手',
      '点击回应-害羞惊讶',
      '点击回应-开心跃动',
    ],
  },
];

/* ============================================================
 * 小工具
 * ============================================================ */

const $ = (id) => document.getElementById(id);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function randomOf(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function formatNumber(value) {
  try {
    return new Intl.NumberFormat('zh-CN').format(value);
  } catch (error) {
    return String(value);
  }
}

function formatDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  try {
    return date.toLocaleString('zh-CN', { hour12: false });
  } catch (error) {
    return date.toISOString();
  }
}

function shortUrl(url) {
  try {
    const parsed = new URL(url);
    const name = parsed.pathname.split('/').filter(Boolean).pop();
    return name ? decodeURIComponent(name) : parsed.href;
  } catch (error) {
    return String(url);
  }
}

function waitFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function resolveUrl(value, baseUrl) {
  if (!value) return '';
  try {
    return new URL(String(value).trim(), baseUrl).href;
  } catch (error) {
    return '';
  }
}

function isTypingTarget(target) {
  if (!target || !(target instanceof Element)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

/* ============================================================
 * 全局状态
 * ============================================================ */

const state = {
  source: 'loading', // loading | manifest | fallback
  characters: [],
  charsById: new Map(),
  pets: [],
  focusCharId: null,
  selectedUid: null,
  paused: false,
  nextUid: 1,
  searchQuery: '',
  manifestMeta: {
    generatedAt: '',
    cdn: '',
    actionCount: 0,
    source: 'loading',
    manifestUrl: null,
    error: null,
    warnings: [],
  },
};

const els = {};

/* ============================================================
 * 精灵图缓存与并发解码
 * ============================================================ */

const sheetCache = new Map(); // url -> { promise, sheet, state, lastUsed }
const loadGate = { active: 0, queue: [] };
let usageClock = 0;
let cachedBytes = 0;

function scheduleImageTask(task) {
  return new Promise((resolve, reject) => {
    const run = () => {
      loadGate.active += 1;
      Promise.resolve()
        .then(task)
        .then(resolve, reject)
        .finally(() => {
          loadGate.active -= 1;
          const next = loadGate.queue.shift();
          if (next) next();
        });
    };
    if (loadGate.active < IMAGE_LOAD_CONCURRENCY) run();
    else loadGate.queue.push(run);
  });
}

function loadHtmlImage(url, withCors) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    if (withCors) image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => {
      if (withCors) {
        // 某些 CDN 可能未开放 CORS：回退为普通图片（canvas 会被标记为
        // tainted，但本页从不读取像素，不影响绘制）。
        loadHtmlImage(url, false).then(resolve, reject);
      } else {
        reject(new Error(`精灵图加载失败：${shortUrl(url)}`));
      }
    };
    image.src = url;
  });
}

async function decodeSheet(url) {
  const image = await loadHtmlImage(url, true);
  let source = image;
  let scale = 1;
  let width = image.naturalWidth || image.width;
  let height = image.naturalHeight || image.height;

  if (typeof createImageBitmap === 'function' && width * height >= BITMAP_MIN_PIXELS) {
    try {
      const targetWidth = Math.max(1, Math.round(width * BITMAP_SCALE));
      const targetHeight = Math.max(1, Math.round(height * BITMAP_SCALE));
      const bitmap = await createImageBitmap(image, {
        resizeWidth: targetWidth,
        resizeHeight: targetHeight,
        resizeQuality: 'high',
      });
      if (bitmap.width === targetWidth && bitmap.height === targetHeight) {
        source = bitmap;
        scale = targetWidth / width;
        width = bitmap.width;
        height = bitmap.height;
      } else if (typeof bitmap.close === 'function') {
        bitmap.close();
      }
    } catch (error) {
      console.warn('[desktop-pet-preview] createImageBitmap 缩放失败，退化为原图绘制', error);
    }
  }

  return {
    url,
    source,
    scale,
    width,
    height,
    bytes: Math.max(1, width * height * 4),
  };
}

function getSheet(action) {
  const url = action.url;
  const cached = sheetCache.get(url);
  if (cached) {
    cached.lastUsed = ++usageClock;
    return cached.promise;
  }

  const entry = { promise: null, sheet: null, state: 'loading', lastUsed: ++usageClock };
  entry.promise = scheduleImageTask(() => decodeSheet(url))
    .then((sheet) => {
      entry.sheet = sheet;
      entry.state = 'ready';
      cachedBytes += sheet.bytes;
      evictSheets();
      return sheet;
    })
    .catch((error) => {
      entry.state = 'error';
      sheetCache.delete(url);
      throw error;
    });

  sheetCache.set(url, entry);
  return entry.promise;
}

function evictSheets() {
  if (cachedBytes <= IMAGE_CACHE_BUDGET) return;
  const inUse = new Set();
  for (const pet of state.pets) {
    if (pet.pending) inUse.add(pet.pending.action.url);
    if (pet.current) inUse.add(pet.current.sheet.url);
  }
  const evictable = [...sheetCache.entries()]
    .filter(([url, entry]) => entry.state === 'ready' && entry.sheet && !inUse.has(url))
    .sort((a, b) => a[1].lastUsed - b[1].lastUsed);

  for (const [url, entry] of evictable) {
    if (cachedBytes <= IMAGE_CACHE_BUDGET * 0.8) break;
    cachedBytes -= entry.sheet.bytes || 0;
    // 不主动 close ImageBitmap：可能仍被正在绘制的宠物引用，交给 GC 回收。
    sheetCache.delete(url);
  }
}

/* ============================================================
 * Manifest 解析
 * ============================================================ */

function normalizeManifest(raw, manifestUrl) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('manifest 根节点不是对象');
  }
  const rawCharacters = Array.isArray(raw.characters) ? raw.characters : null;
  if (!rawCharacters || !rawCharacters.length) {
    throw new Error('manifest.characters 缺失或为空');
  }

  const dirUrl = new URL('.', manifestUrl);
  const warnings = [];
  const characters = [];
  const usedCharacterIds = new Set();

  for (const rawChar of rawCharacters) {
    if (!rawChar || typeof rawChar !== 'object') continue;

    const baseId = String(rawChar.id || rawChar.storePack || rawChar.name || `char-${characters.length + 1}`).trim();
    let charId = baseId;
    let suffix = 2;
    while (usedCharacterIds.has(charId)) {
      charId = `${baseId}-${suffix}`;
      suffix += 1;
    }
    usedCharacterIds.add(charId);

    const name = String(rawChar.name || charId);
    const avatar = resolveUrl(rawChar.avatar, dirUrl);
    const rawActions = Array.isArray(rawChar.actions)
      ? rawChar.actions
      : Array.isArray(rawChar.animations)
        ? rawChar.animations
        : [];

    const actions = [];
    const actionById = new Map();
    const usedActionIds = new Set();
    for (const rawAction of rawActions) {
      const action = normalizeAction(rawAction, dirUrl);
      if (!action) continue;
      let actionId = action.id;
      let actionSuffix = 2;
      while (usedActionIds.has(actionId)) {
        actionId = `${action.id}-${actionSuffix}`;
        actionSuffix += 1;
      }
      usedActionIds.add(actionId);
      action.id = actionId;
      actions.push(action);
      actionById.set(actionId, action);
    }

    if (!actions.length) {
      warnings.push(`形象「${name}」没有可用的动作，已跳过`);
      continue;
    }

    const defaults = rawChar.defaults && typeof rawChar.defaults === 'object' ? rawChar.defaults : {};
    const idle =
      pickAction(actionById, defaults.idle) ||
      actions.find((action) => String(action.category).includes('待机')) ||
      actions.find((action) => String(action.name).includes('待机')) ||
      actions[0];

    let clicks = [];
    if (Array.isArray(defaults.clicks)) {
      clicks = defaults.clicks
        .map((reference) => pickAction(actionById, reference))
        .filter(Boolean);
    }
    if (!clicks.length) {
      clicks = actions.filter(
        (action) => String(action.category).includes('点击回应') || String(action.id).includes('点击回应'),
      );
    }

    let categories = [];
    if (Array.isArray(defaults.categories) && defaults.categories.length) {
      const covered = new Set();
      for (const rawCategory of defaults.categories) {
        if (!rawCategory || typeof rawCategory !== 'object') continue;
        const ids = Array.isArray(rawCategory.actions) ? rawCategory.actions : [];
        const list = ids
          .map((reference) => pickAction(actionById, reference))
          .filter(Boolean);
        if (!list.length) continue;
        list.forEach((action) => covered.add(action.id));
        categories.push({
          id: String(rawCategory.id || rawCategory.name || '其他'),
          actions: list,
        });
      }
      const remaining = actions.filter((action) => !covered.has(action.id));
      categories.push(...groupByCategory(remaining));
    } else {
      categories = groupByCategory(actions);
    }

    characters.push({
      id: charId,
      name,
      storePack: String(rawChar.storePack || ''),
      avatar,
      previewOnly: !!rawChar.previewOnly,
      actions,
      actionById,
      idle,
      clicks,
      categories,
    });
  }

  if (!characters.length) {
    throw new Error('manifest 中没有可用的形象（所有形象都缺少动作或数据不合法）');
  }

  return {
    characters,
    warnings,
    generatedAt: raw.generatedAt ? String(raw.generatedAt) : '',
    cdn: raw.cdn ? String(raw.cdn) : '',
  };
}

function normalizeAction(raw, dirUrl) {
  if (!raw || typeof raw !== 'object') return null;

  const rawId = String(raw.id || raw.name || '').trim();
  if (!rawId) return null;

  const meta = raw.spritesheet && typeof raw.spritesheet === 'object' ? raw.spritesheet : raw;
  const url = resolveUrl(
    raw.url || (raw.spritesheet && raw.spritesheet.url) || (raw.sources && raw.sources.webp) || '',
    dirUrl,
  );
  if (!url) return null;

  const frameWidth = positiveNumber(raw.frameWidth ?? meta.frameWidth, 640);
  const frameHeight = positiveNumber(raw.frameHeight ?? meta.frameHeight, 360);
  const columns = Math.max(1, Math.floor(positiveNumber(raw.columns ?? meta.columns, 8)));
  const rows = Math.max(1, Math.floor(positiveNumber(raw.rows ?? meta.rows, 1)));
  const frameCount = Math.max(
    1,
    Math.floor(positiveNumber(raw.frameCount ?? meta.frameCount, rows * columns)),
  );
  const fps = clamp(positiveNumber(raw.fps ?? meta.fps, 12), 1, 60);

  return {
    id: rawId,
    name: String(raw.name || rawId),
    category: String(raw.category || (raw.spritesheet && raw.spritesheet.category) || '其他'),
    url,
    frameWidth,
    frameHeight,
    columns,
    rows,
    frameCount,
    fps,
  };
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function pickAction(actionById, reference) {
  if (!reference) return null;
  const key = typeof reference === 'string' ? reference : reference && reference.id ? String(reference.id) : '';
  if (!key) return null;
  return actionById.get(key) || null;
}

function groupByCategory(actions) {
  const groups = new Map();
  for (const action of actions) {
    const key = action.category || '其他';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(action);
  }
  return [...groups.entries()].map(([id, list]) => ({ id, actions: list }));
}

function buildFallbackManifest() {
  return {
    generatedAt: '',
    cdn: CDN_ROOT,
    characters: FALLBACK_PACKS.map((definition) => {
      const isGpt = definition.pack === 'gpt';
      const rows = isGpt ? 23 : 15;
      const frameCount = isGpt ? 180 : 120;
      const buildAction = (id, category) => ({
        id,
        name: id,
        category,
        url: `${CDN_ROOT}pets/${definition.pack}/spritesheet/${encodeURIComponent(id)}.webp`,
        frameWidth: 640,
        frameHeight: 360,
        columns: 8,
        rows,
        frameCount,
        fps: 12,
      });
      const actions = [buildAction(definition.idle, '待机')];
      for (const extra of definition.extras) actions.push(buildAction(extra, '待机'));
      for (const click of definition.clicks) actions.push(buildAction(click, '点击回应'));
      return {
        id: definition.id,
        name: definition.name,
        storePack: definition.pack,
        avatar: `${CDN_ROOT}pets/${definition.pack}/avatar.webp`,
        previewOnly: definition.previewOnly,
        actions,
        defaults: {
          idle: definition.idle,
          clicks: definition.clicks.slice(),
          categories: [
            { id: '待机', actions: [definition.idle, ...definition.extras] },
            { id: '点击回应', actions: definition.clicks.slice() },
          ],
        },
      };
    }),
  };
}

/* ============================================================
 * 加载入口
 * ============================================================ */

async function loadManifest() {
  state.source = 'loading';
  state.manifestMeta.source = 'loading';
  updateManifestStatus();
  els.stageLoading.hidden = false;
  els.stageLoadingText.textContent = '正在载入形象与精灵图…';

  const manifestUrl = new URL(MANIFEST_FILENAME, document.baseURI);

  try {
    const response = await fetch(manifestUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`);
    }
    let raw;
    try {
      raw = await response.json();
    } catch (error) {
      throw new Error(`manifest.json 不是合法的 JSON：${error.message}`);
    }

    const normalized = normalizeManifest(raw, manifestUrl);
    hideNotice();
    await applyManifest(normalized, 'manifest', { manifestUrl });
    if (normalized.warnings.length) {
      showNotice('warn', 'manifest 已加载，但部分内容被跳过', normalized.warnings.join('；'));
    }
  } catch (error) {
    console.warn('[desktop-pet-preview] manifest 加载失败，启用内置兜底数据', error);
    showNotice(
      'error',
      '无法加载 preview/manifest.json，已切换到内置兜底数据',
      describeManifestError(error, manifestUrl),
      { retry: true },
    );
    try {
      const fallback = normalizeManifest(buildFallbackManifest(), manifestUrl);
      await applyManifest(fallback, 'fallback', { manifestUrl, error });
    } catch (fallbackError) {
      console.error('[desktop-pet-preview] 内置兜底数据也失败', fallbackError);
      els.stageLoadingText.textContent = '预览数据加载失败，请查看控制台错误与静态服务器配置';
      return;
    }
  }

  els.stageLoading.hidden = true;
}

function describeManifestError(error, manifestUrl) {
  const lines = [];
  if (window.location.protocol === 'file:') {
    lines.push(
      '当前页面以 file:// 协议打开，浏览器会拦截本地 JSON 请求。请在 pamper/ 目录执行 node scripts/serve.mjs，再访问 http://127.0.0.1:8899/preview/ 。',
    );
  }
  lines.push(`请求地址：${manifestUrl.href}`);
  lines.push(`错误原因：${error && error.message ? error.message : String(error)}`);
  lines.push('若 manifest.json 尚未生成，请生成后点击「重试加载」或刷新页面。');
  return lines.join('\n');
}

async function applyManifest(normalized, source, meta) {
  state.source = source;
  state.characters = normalized.characters;
  state.charsById = new Map();
  for (const character of normalized.characters) {
    if (!state.charsById.has(character.id)) state.charsById.set(character.id, character);
  }
  state.manifestMeta = {
    generatedAt: normalized.generatedAt,
    cdn: normalized.cdn,
    actionCount: normalized.characters.reduce((sum, character) => sum + character.actions.length, 0),
    source,
    manifestUrl: meta.manifestUrl || null,
    error: meta.error || null,
    warnings: normalized.warnings,
  };
  state.selectedUid = null;
  state.focusCharId = null;

  clearPets();
  buildCharacterStrip();
  await waitFrame();

  const defaults = state.characters.slice(0, DEFAULT_PETS);
  defaults.forEach((character, index) => spawnPet(character, { defaultIndex: index }));

  const focus = state.characters[0];
  if (focus) setFocusCharacter(focus.id);
  updateChipCounts();
  updateAddButton();
  updateManifestStatus();
  updateFooterManifestInfo();
  updateZoomReadout();
  updateSelectionChip();
}

/* ============================================================
 * 顶栏 / 提示
 * ============================================================ */

function updateManifestStatus() {
  const meta = state.manifestMeta;
  const total = state.characters.reduce((sum, character) => sum + character.actions.length, 0);

  if (state.source === 'manifest') {
    els.manifestStatus.dataset.state = 'ready';
    els.manifestStatusText.textContent = `manifest 已加载 · ${state.characters.length} 形象 / ${formatNumber(total)} 动作`;
    els.manifestStatus.title = [
      meta.generatedAt ? `生成时间：${formatDateTime(meta.generatedAt)}` : '生成时间：未提供',
      meta.manifestUrl ? `来源：${meta.manifestUrl.href}` : '',
      '数据由项目构建脚本生成',
    ]
      .filter(Boolean)
      .join('\n');
  } else if (state.source === 'fallback') {
    els.manifestStatus.dataset.state = 'warn';
    els.manifestStatusText.textContent = '内置兜底数据（manifest 不可用）';
    els.manifestStatus.title = meta.error
      ? `manifest 加载失败：${meta.error.message}`
      : '当前展示内置兜底数据';
  } else {
    els.manifestStatus.dataset.state = 'loading';
    els.manifestStatusText.textContent = '正在加载 manifest…';
    els.manifestStatus.title = '正在读取 preview/manifest.json';
  }
}

function updateFooterManifestInfo() {
  if (!els.footerManifestInfo) return;
  const meta = state.manifestMeta;
  const total = state.characters.reduce((sum, character) => sum + character.actions.length, 0);
  if (state.source === 'manifest') {
    const generated = meta.generatedAt ? ` · 生成于 ${formatDateTime(meta.generatedAt)}` : '';
    els.footerManifestInfo.textContent = `manifest：已加载 ${state.characters.length} 个形象 / ${formatNumber(total)} 个动作${generated}`;
  } else if (state.source === 'fallback') {
    els.footerManifestInfo.textContent = 'manifest：加载失败，当前展示内置兜底数据';
  } else {
    els.footerManifestInfo.textContent = 'manifest：加载中…';
  }
}

function showNotice(kind, title, text, options = {}) {
  els.notice.hidden = false;
  els.notice.dataset.kind = kind || 'warn';
  els.noticeTitle.textContent = title || '';
  els.noticeText.textContent = text || '';
  els.noticeRetry.hidden = !options.retry;
  els.noticeRetry.onclick = options.retry
    ? () => {
        window.location.reload();
      }
    : null;
}

function hideNotice() {
  els.notice.hidden = true;
}

let toastTimer = 0;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 2200);
}

/* ============================================================
 * 主题
 * ============================================================ */

function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'dark' || value === 'light' ? value : '';
  } catch (error) {
    return '';
  }
}

function writeStoredTheme(value) {
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch (error) {
    /* 忽略隐私模式下的存储异常 */
  }
}

function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  if (els.btnTheme) {
    els.btnTheme.textContent = next === 'dark' ? '☀' : '☾';
    els.btnTheme.title = next === 'dark' ? '切换到浅色主题' : '切换到深色主题';
    els.btnTheme.setAttribute('aria-label', els.btnTheme.title);
  }
}

function initTheme() {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const stored = readStoredTheme();
  applyTheme(stored || (systemDark.matches ? 'dark' : 'light'));

  els.btnTheme.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    writeStoredTheme(next);
  });

  const handleSystemChange = (event) => {
    if (!readStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };
  if (typeof systemDark.addEventListener === 'function') {
    systemDark.addEventListener('change', handleSystemChange);
  } else if (typeof systemDark.addListener === 'function') {
    systemDark.addListener(handleSystemChange);
  }
}

/* ============================================================
 * 形象切换条
 * ============================================================ */

function buildCharacterStrip() {
  els.strip.textContent = '';

  if (!state.characters.length) {
    const placeholder = document.createElement('span');
    placeholder.className = 'strip-placeholder';
    placeholder.textContent = '暂无可用形象';
    els.strip.append(placeholder);
    return;
  }

  for (const character of state.characters) {
    const chip = document.createElement('div');
    chip.className = 'char-chip';
    chip.dataset.char = character.id;

    const main = document.createElement('button');
    main.type = 'button';
    main.className = 'chip-main';
    main.title = `切换动作库到「${character.name}」，并选中舞台上该形象的第一只`;
    main.setAttribute('aria-label', `切换到${character.name}`);

    const avatar = document.createElement('span');
    avatar.className = 'chip-avatar';

    if (character.avatar) {
      const image = new Image();
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => {
        image.hidden = true;
      });
      image.src = character.avatar;
      avatar.append(image);
    }

    const letter = document.createElement('span');
    letter.className = 'avatar-letter';
    letter.setAttribute('aria-hidden', 'true');
    letter.textContent = character.name.slice(0, 1);
    avatar.append(letter);

    const text = document.createElement('span');
    text.className = 'chip-text';
    const name = document.createElement('span');
    name.className = 'chip-name';
    name.textContent = character.name;
    const sub = document.createElement('span');
    sub.className = 'chip-sub';
    sub.textContent = `${character.storePack || 'pack'} · ${formatNumber(character.actions.length)} 动作`;
    text.append(name, sub);

    const count = document.createElement('span');
    count.className = 'chip-count';
    count.textContent = '×0';
    count.hidden = true;

    main.append(avatar, text, count);

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'chip-add';
    addButton.textContent = '＋';
    addButton.title = `再添加一只「${character.name}」`;
    addButton.setAttribute('aria-label', `添加一只${character.name}`);

    main.addEventListener('click', () => {
      setFocusCharacter(character.id, { selectFirstPet: true });
      main.blur();
    });
    addButton.addEventListener('click', (event) => {
      event.stopPropagation();
      addPetFor(character);
      addButton.blur();
    });

    chip.append(main, addButton);
    els.strip.append(chip);
  }

  updateChipCounts();
}

function updateChipCounts() {
  els.strip.querySelectorAll('.char-chip').forEach((chip) => {
    const charId = chip.dataset.char;
    const total = state.pets.filter((pet) => pet.char.id === charId).length;
    const count = chip.querySelector('.chip-count');
    if (count) {
      count.textContent = `×${total}`;
      count.hidden = total === 0;
    }
  });
}

/* ============================================================
 * 形象 / 选中
 * ============================================================ */

function getFocusCharacter() {
  return state.focusCharId ? state.charsById.get(state.focusCharId) || null : null;
}

function getSelectedPet() {
  if (state.selectedUid == null) return null;
  return state.pets.find((pet) => pet.uid === state.selectedUid) || null;
}

function setFocusCharacter(charId, options = {}) {
  if (!state.charsById.has(charId)) return;
  state.focusCharId = charId;
  els.strip.querySelectorAll('.char-chip').forEach((chip) => {
    chip.classList.toggle('is-active', chip.dataset.char === charId);
  });
  if (options.selectFirstPet) {
    const pet = state.pets.find((candidate) => candidate.char.id === charId);
    if (pet) selectPet(pet, { keepFocus: true });
  }
  buildActionPanel();
  updateSelectionChip();
  updateZoomReadout();
  refreshActiveActionRows();
}

function selectPet(pet, options = {}) {
  if (!pet) return;
  state.selectedUid = pet.uid;
  state.pets.forEach((candidate) => {
    candidate.el.classList.toggle('is-selected', candidate.uid === pet.uid);
  });
  if (!options.keepFocus) setFocusCharacter(pet.char.id);
  updateSelectionChip();
  updateZoomReadout();
  refreshActiveActionRows();
}

function deselectPet() {
  const hadSelection = state.selectedUid != null;
  state.selectedUid = null;
  state.pets.forEach((pet) => pet.el.classList.remove('is-selected'));
  updateSelectionChip();
  updateZoomReadout();
  refreshActiveActionRows();
  if (hadSelection) showToast('已取消选择');
}

function updateSelectionChip() {
  const selected = getSelectedPet();
  const focus = getFocusCharacter();
  if (selected) {
    const actionName = petActionName(selected);
    els.selectionChip.textContent = `${selected.char.name} · ${Math.round(selected.scale * 100)}% · ${actionName}`;
  } else if (focus) {
    els.selectionChip.textContent = `未选中形象 · 动作库：${focus.name}`;
  } else {
    els.selectionChip.textContent = '未选中形象';
  }
}

function petActionName(pet) {
  if (pet.pending) return `${pet.pending.action.name}（载入中）`;
  if (pet.current) return pet.current.action.name;
  return '载入中…';
}

function petActionId(pet) {
  if (pet.pending) return pet.pending.action.id;
  if (pet.current) return pet.current.action.id;
  return '';
}

/* ============================================================
 * 宠物创建 / 布局 / 交互
 * ============================================================ */

function stageRect() {
  const rect = els.stage.getBoundingClientRect();
  return {
    width: Math.max(320, rect.width),
    height: Math.max(360, rect.height),
  };
}

function defaultSlot(index, rect) {
  const slot = DEFAULT_SLOTS[index % DEFAULT_SLOTS.length];
  const scale = clamp(slot.scale, MIN_PET_SCALE, MAX_PET_SCALE);
  const halfW = (PET_W * scale) / 2;
  const halfH = (PET_H * scale) / 2;
  const x = clamp(rect.width * slot.x, halfW + 8, rect.width - halfW - 8);
  const y = clamp(rect.height * slot.y, halfH + 24, Math.max(halfH + 24, rect.height - halfH - 96));
  return { x, y, scale };
}

function findFreeSlot(rect) {
  const top = Math.min(rect.height - 140, Math.max(110, rect.height * 0.28));
  const bottom = Math.max(top + 40, rect.height - 130);
  const candidates = [];
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      candidates.push({
        x: rect.width * (0.1 + column * 0.2),
        y: top + ((bottom - top) * (0.15 + row * 0.35)),
      });
    }
  }

  let best = candidates[0];
  let bestScore = -Infinity;
  for (const candidate of candidates) {
    let nearest = state.pets.length ? Infinity : 1e9;
    for (const pet of state.pets) {
      nearest = Math.min(nearest, Math.hypot(candidate.x - pet.cx, candidate.y - pet.cy));
    }
    const score = nearest + Math.random() * 24;
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  const scale = clamp(0.96 + Math.random() * 0.1, MIN_PET_SCALE, MAX_PET_SCALE);
  const halfW = (PET_W * scale) / 2;
  const halfH = (PET_H * scale) / 2;
  return {
    x: clamp(best.x, halfW + 8, rect.width - halfW - 8),
    y: clamp(best.y, halfH + 24, Math.max(halfH + 24, rect.height - halfH - 96)),
    scale,
  };
}

function clampCenter(x, y, pet, rect) {
  const halfW = (PET_W * pet.scale) / 2;
  const halfH = (PET_H * pet.scale) / 2;
  const minX = halfW + 6;
  const maxX = rect.width - halfW - 6;
  const minY = halfH + 18;
  const maxY = rect.height - halfH - 28;
  return {
    x: minX <= maxX ? clamp(x, minX, maxX) : rect.width / 2,
    y: minY <= maxY ? clamp(y, minY, maxY) : rect.height / 2,
  };
}

function layoutPet(pet) {
  pet.el.style.transform = `translate3d(${pet.cx - PET_W / 2}px, ${pet.cy - PET_H / 2}px, 0) scale(${pet.scale})`;
}

function setPetScale(pet, scale) {
  pet.scale = clamp(scale, MIN_PET_SCALE, MAX_PET_SCALE);
  layoutPet(pet);
  updateZoomReadout();
  updateSelectionChip();
}

function spawnPet(character, options = {}) {
  if (!character) return null;
  if (state.pets.length >= MAX_PETS) {
    showToast(`最多同时展示 ${MAX_PETS} 只形象`);
    return null;
  }

  const rect = stageRect();
  const layout = options.defaultIndex != null ? defaultSlot(options.defaultIndex, rect) : findFreeSlot(rect);
  const scale = clamp(options.scale != null ? options.scale : layout.scale, MIN_PET_SCALE, MAX_PET_SCALE);

  const pet = {
    uid: state.nextUid,
    char: character,
    scale,
    cx: layout.x,
    cy: layout.y,
    el: null,
    canvas: null,
    ctx: null,
    nameEl: null,
    actionEl: null,
    requestToken: 0,
    pending: null,
    current: null,
    frameIndex: 0,
    error: null,
    autoReturnBlocked: false,
    lastRenderKey: '',
    drag: null,
  };
  state.nextUid += 1;

  const el = document.createElement('div');
  el.className = 'pet';
  el.dataset.uid = String(pet.uid);
  el.dataset.char = character.id;
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `${character.name}：点击播放动作，拖拽移动，滚轮缩放`);

  const shadow = document.createElement('div');
  shadow.className = 'pet-shadow';

  const canvas = document.createElement('canvas');
  canvas.className = 'pet-canvas';
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }

  const tag = document.createElement('div');
  tag.className = 'pet-tag';
  const nameEl = document.createElement('span');
  nameEl.className = 'pet-name';
  nameEl.textContent = character.name;
  const separator = document.createElement('span');
  separator.className = 'pet-tag-sep';
  separator.setAttribute('aria-hidden', 'true');
  separator.textContent = '·';
  const actionEl = document.createElement('span');
  actionEl.className = 'pet-action';
  actionEl.textContent = '载入中…';
  tag.append(nameEl, separator, actionEl);

  el.append(shadow, canvas, tag);

  pet.el = el;
  pet.canvas = canvas;
  pet.ctx = ctx;
  pet.nameEl = nameEl;
  pet.actionEl = actionEl;

  bindPetEvents(pet);
  els.stage.append(el);
  state.pets.push(pet);

  layoutPet(pet);
  updateChipCounts();
  updateAddButton();
  playAction(pet, character.idle, { oneShot: false });
  return pet;
}

function clearPets() {
  for (const pet of state.pets) {
    pet.requestToken += 1;
    pet.pending = null;
    pet.current = null;
    pet.el.remove();
  }
  state.pets = [];
  state.selectedUid = null;
  updateChipCounts();
  updateAddButton();
}

function bindPetEvents(pet) {
  const el = pet.el;
  const canvas = pet.canvas;

  el.addEventListener('pointerdown', (event) => {
    if (event.button != null && event.button !== 0) return;
    event.preventDefault();
    selectPet(pet);
    el.focus({ preventScroll: true });

    const rect = els.stage.getBoundingClientRect();
    pet.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startCx: pet.cx,
      startCy: pet.cy,
      rect,
      moved: false,
    };
    el.classList.add('is-dragging');
    try {
      el.setPointerCapture(event.pointerId);
    } catch (error) {
      /* 某些浏览器在特殊情况下不支持捕获，忽略 */
    }
  });

  el.addEventListener('pointermove', (event) => {
    const drag = pet.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 6) drag.moved = true;
    if (!drag.moved) return;
    const center = clampCenter(drag.startCx + dx, drag.startCy + dy, pet, drag.rect);
    pet.cx = center.x;
    pet.cy = center.y;
    layoutPet(pet);
  });

  const endDrag = (event) => {
    const drag = pet.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const wasMoved = drag.moved;
    pet.drag = null;
    el.classList.remove('is-dragging');
    try {
      el.releasePointerCapture(event.pointerId);
    } catch (error) {
      /* 忽略 */
    }
    if (!wasMoved) onPetClick(pet);
  };

  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', (event) => {
    if (!pet.drag) return;
    pet.drag = null;
    el.classList.remove('is-dragging');
    try {
      el.releasePointerCapture(event.pointerId);
    } catch (error) {
      /* 忽略 */
    }
  });

  el.addEventListener('wheel', (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    selectPet(pet);
    setPetScale(pet, pet.scale + direction * WHEEL_ZOOM_STEP);
  }, { passive: false });

  el.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onPetClick(pet);
    }
  });

  // 双击空白区域不需要特殊处理；canvas 本身不接收指针事件（由父级统一处理）。
  canvas.addEventListener('contextmenu', (event) => event.preventDefault());
}

function onPetClick(pet) {
  selectPet(pet);
  const action = pickClickAction(pet.char);
  if (!action) return;
  playAction(pet, action, { oneShot: true });
  pet.el.classList.remove('is-poked');
  // 触发一次轻微弹跳反馈
  void pet.el.offsetWidth;
  pet.el.classList.add('is-poked');
  window.setTimeout(() => pet.el.classList.remove('is-poked'), 380);
}

function pickClickAction(character) {
  const nonIdle = character.actions.filter((action) => action.id !== character.idle.id);
  const pool = nonIdle.length ? nonIdle : character.actions;
  if (character.clicks.length && Math.random() < 0.7) return randomOf(character.clicks);
  return randomOf(pool);
}

function getActionTargets() {
  const selected = getSelectedPet();
  if (selected) return [selected];
  const focus = getFocusCharacter();
  if (!focus) return [];
  return state.pets.filter((pet) => pet.char.id === focus.id);
}

function applyAction(action, options = {}) {
  if (!action) return;
  let targets = getActionTargets();
  if (!targets.length) {
    const focus = getFocusCharacter();
    if (!focus) {
      showToast('请先在顶部选择形象');
      return;
    }
    const pet = spawnPet(focus);
    if (pet) targets = [pet];
  }
  if (!targets.length) return;
  const oneShot = !!options.oneShot;
  targets.forEach((pet) => playAction(pet, action, { oneShot }));
}

/* ============================================================
 * 动画播放与绘制
 * ============================================================ */

function playAction(pet, action, options = {}) {
  if (!pet || !action) return;
  const oneShot = !!options.oneShot;
  const token = pet.requestToken + 1;
  pet.requestToken = token;
  pet.pending = { action, oneShot, token };
  pet.error = null;
  pet.autoReturnBlocked = false;
  pet.el.classList.add('is-loading');
  pet.el.classList.remove('has-error');
  updatePetTag(pet);
  refreshActiveActionRows();
  updateSelectionChip();

  getSheet(action)
    .then((sheet) => {
      if (pet.requestToken !== token) return; // 已被更新的请求取代
      pet.current = { action, sheet, time: 0, oneShot };
      pet.frameIndex = 0;
      pet.pending = null;
      pet.autoReturnBlocked = false;
      pet.lastRenderKey = '';
      pet.el.classList.remove('is-loading');
      pet.el.classList.remove('has-error');
      drawPet(pet, true);
      updatePetTag(pet);
      refreshActiveActionRows();
      updateSelectionChip();
    })
    .catch((error) => {
      if (pet.requestToken !== token) return;
      pet.pending = null;
      pet.error = error;
      pet.autoReturnBlocked = true;
      pet.el.classList.remove('is-loading');
      pet.el.classList.add('has-error');
      updatePetTag(pet);
      if (!pet.current) clearCanvas(pet);
      showToast(`「${pet.char.name}」的素材加载失败，可再点一次重试`);
      console.warn('[desktop-pet-preview] 精灵图加载失败', action.url, error);
    });
}

function updatePetTag(pet) {
  if (!pet.actionEl) return;
  let text = '载入中…';
  if (pet.pending) text = pet.pending.action.name;
  else if (pet.current) text = pet.current.action.name;
  if (pet.error) text = '素材加载失败';

  pet.actionEl.textContent = text;
  pet.el.classList.toggle('is-loading', !!pet.pending && !pet.error);
  pet.el.classList.toggle('has-error', !!pet.error);
  pet.el.title = `${pet.char.name} · ${pet.pending ? pet.pending.action.name : text}`;
}

function clearCanvas(pet) {
  if (!pet.ctx) return;
  pet.ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  pet.lastRenderKey = 'empty';
}

function advancePet(pet, dt) {
  const current = pet.current;
  if (!current) return;

  const action = current.action;
  const fps = action.fps > 0 ? action.fps : 12;
  current.time += dt;

  const duration = action.frameCount / fps;
  if (current.oneShot && current.time >= duration) {
    if (pet.pending) {
      // 已有新的动作请求在加载：停在最后一帧等待切换，避免把请求冲掉。
      current.time = Math.max(0, duration - 1 / fps);
      return;
    }
    if (pet.autoReturnBlocked) {
      current.time = Math.max(0, duration - 1 / fps);
      return;
    }
    playAction(pet, pet.char.idle, { oneShot: false });
    return;
  }

  const frameIndex = Math.floor(current.time * fps) % action.frameCount;
  if (frameIndex !== pet.frameIndex) {
    pet.frameIndex = frameIndex;
  }
}

function drawPet(pet, force) {
  const current = pet.current;
  if (!current || !current.sheet || !pet.ctx) return;

  const key = `${current.sheet.url}#${pet.frameIndex}`;
  if (!force && key === pet.lastRenderKey) return;

  const action = current.action;
  const sheet = current.sheet;
  const frameIndex = clamp(pet.frameIndex | 0, 0, Math.max(0, action.frameCount - 1));
  const column = frameIndex % action.columns;
  const row = Math.floor(frameIndex / action.columns);
  const sourceWidth = action.frameWidth * sheet.scale;
  const sourceHeight = action.frameHeight * sheet.scale;
  const sx = column * sourceWidth;
  const sy = row * sourceHeight;

  try {
    pet.ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    pet.ctx.drawImage(sheet.source, sx, sy, sourceWidth, sourceHeight, 0, 0, CANVAS_W, CANVAS_H);
    pet.lastRenderKey = key;
  } catch (error) {
    console.warn('[desktop-pet-preview] 绘制失败', action.url, error);
    pet.error = error;
    pet.el.classList.add('has-error');
    updatePetTag(pet);
  }
}

/* ============================================================
 * 动作库
 * ============================================================ */

function buildActionPanel() {
  if (!els.actionList) return;
  const focus = getFocusCharacter();
  els.actionList.textContent = '';

  if (!focus) {
    els.actionsSubtitle.textContent = '请选择顶部形象';
    els.actionsCount.textContent = '0';
    els.actionList.append(createEmptyNote('请先在顶部形象切换条中选择一个形象'));
    return;
  }

  els.actionsSubtitle.textContent = `${focus.name}${focus.storePack ? ` · ${focus.storePack}` : ''} · 共 ${formatNumber(focus.actions.length)} 个动作`;

  const query = state.searchQuery.trim().toLowerCase();
  let visible = 0;
  let isFirstGroup = true;

  for (const category of focus.categories) {
    const actions = query
      ? category.actions.filter((action) => `${action.name} ${action.id} ${action.category}`.toLowerCase().includes(query))
      : category.actions;
    if (!actions.length) continue;
    visible += actions.length;

    const details = document.createElement('details');
    details.className = 'action-group';
    if (query || isFirstGroup) details.open = true;
    isFirstGroup = false;

    const summary = document.createElement('summary');
    const categoryName = document.createElement('span');
    categoryName.className = 'cat-name';
    categoryName.textContent = category.id;
    const categoryCount = document.createElement('span');
    categoryCount.className = 'cat-count';
    categoryCount.textContent = `${actions.length}`;
    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.setAttribute('aria-hidden', 'true');
    summary.append(categoryName, categoryCount, chevron);

    const rows = document.createElement('div');
    rows.className = 'action-rows';

    for (const action of actions) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'action-row';
      row.dataset.actionId = action.id;
      row.title = `${action.name} · ${action.frameCount} 帧 @ ${action.fps}fps`;

      const actionName = document.createElement('span');
      actionName.className = 'action-name';
      actionName.textContent = action.name;
      const meta = document.createElement('span');
      meta.className = 'action-meta';
      meta.textContent = `${action.frameCount}帧`;
      row.append(actionName, meta);
      rows.append(row);
    }

    details.append(summary, rows);
    els.actionList.append(details);
  }

  els.actionsCount.textContent = query ? `${visible}/${focus.actions.length}` : String(focus.actions.length);
  if (!visible) els.actionList.append(createEmptyNote('没有匹配的动作，试试其它关键词'));
  refreshActiveActionRows();
}

function createEmptyNote(text) {
  const note = document.createElement('p');
  note.className = 'empty-note';
  note.textContent = text;
  return note;
}

function refreshActiveActionRows() {
  if (!els.actionList) return;
  const target = getSelectedPet() || getActionTargets()[0] || null;
  const activeId = target ? petActionId(target) : '';
  els.actionList.querySelectorAll('.action-row').forEach((row) => {
    row.classList.toggle('is-active', row.dataset.actionId === activeId);
  });
}

/* ============================================================
 * 缩放 / 暂停 / 添加 / 重置
 * ============================================================ */

function zoomTargets() {
  const selected = getSelectedPet();
  return selected ? [selected] : state.pets.slice();
}

function zoomBy(delta) {
  const targets = zoomTargets();
  if (!targets.length) {
    showToast('舞台上还没有形象');
    return;
  }
  for (const pet of targets) setPetScale(pet, pet.scale + delta);
  updateSelectionChip();
  updateZoomReadout();
}

function updateZoomReadout() {
  if (!els.zoomReadout) return;
  const selected = getSelectedPet();
  if (selected) {
    els.zoomReadout.textContent = `${Math.round(selected.scale * 100)}%`;
    els.zoomReadout.title = `已选中形象缩放：${Math.round(selected.scale * 100)}%`;
  } else if (state.pets.length) {
    const average = state.pets.reduce((sum, pet) => sum + pet.scale, 0) / state.pets.length;
    els.zoomReadout.textContent = `${Math.round(average * 100)}%`;
    els.zoomReadout.title = '全部形象平均缩放';
  } else {
    els.zoomReadout.textContent = '—';
    els.zoomReadout.title = '舞台上还没有形象';
  }
}

function setPaused(paused) {
  state.paused = !!paused;
  els.btnPlay.setAttribute('aria-pressed', String(state.paused));
  els.btnPlayIcon.textContent = state.paused ? '▶' : '⏸';
  els.btnPlayLabel.textContent = state.paused ? '播放' : '暂停';
  els.pausedChip.hidden = !state.paused;
}

function togglePause() {
  setPaused(!state.paused);
  showToast(state.paused ? '已暂停全部动画' : '已恢复播放');
}

function updateAddButton() {
  if (!els.btnAdd) return;
  const full = state.pets.length >= MAX_PETS;
  els.btnAdd.disabled = full;
  els.btnAdd.title = full ? `最多同时展示 ${MAX_PETS} 只形象` : '添加一只形象（最多同时 6 只）';
}

function addPetFor(character) {
  if (!character) return;
  if (state.pets.length >= MAX_PETS) {
    showToast(`最多同时展示 ${MAX_PETS} 只形象`);
    return;
  }
  const pet = spawnPet(character);
  if (!pet) return;
  selectPet(pet);
  showToast(`已添加「${character.name}」`);
}

function addNextPet() {
  if (!state.characters.length) {
    showToast('形象数据尚未加载完成');
    return;
  }
  if (state.pets.length >= MAX_PETS) {
    showToast(`最多同时展示 ${MAX_PETS} 只形象`);
    return;
  }
  const counts = new Map(
    state.characters.map((character) => [
      character.id,
      state.pets.filter((pet) => pet.char.id === character.id).length,
    ]),
  );
  const least = Math.min(...counts.values());
  const candidates = state.characters.filter((character) => counts.get(character.id) === least);
  addPetFor(randomOf(candidates));
}

function resetLayout() {
  if (!state.characters.length) return;
  clearPets();
  setPaused(false);
  state.focusCharId = null;
  const defaults = state.characters.slice(0, DEFAULT_PETS);
  defaults.forEach((character, index) => spawnPet(character, { defaultIndex: index }));
  const first = state.characters[0];
  if (first) setFocusCharacter(first.id);
  updateChipCounts();
  updateZoomReadout();
  updateSelectionChip();
  showToast(`已恢复默认 ${defaults.length} 只形象与初始布局`);
}

/* ============================================================
 * 主循环
 * ============================================================ */

let lastTimestamp = 0;
let fpsFrames = 0;
let fpsSince = 0;

function frameLoop(timestamp) {
  window.requestAnimationFrame(frameLoop);
  const now = typeof timestamp === 'number' ? timestamp : performance.now();
  if (!lastTimestamp) {
    lastTimestamp = now;
    fpsSince = now;
  }
  const dt = Math.min(0.1, Math.max(0, (now - lastTimestamp) / 1000));
  lastTimestamp = now;

  if (!state.paused) {
    for (const pet of state.pets) advancePet(pet, dt);
  }
  for (const pet of state.pets) drawPet(pet);

  fpsFrames += 1;
  if (now - fpsSince >= 500) {
    const fps = Math.round((fpsFrames * 1000) / (now - fpsSince));
    if (els.fpsPill) els.fpsPill.textContent = `${fps} FPS`;
    fpsFrames = 0;
    fpsSince = now;
  }
}

/* ============================================================
 * 事件绑定
 * ============================================================ */

function bindEvents() {
  // 主题切换按钮的事件已在 initTheme() 中绑定。

  els.btnAdd.addEventListener('click', addNextPet);
  els.btnPlay.addEventListener('click', togglePause);
  els.btnZoomIn.addEventListener('click', () => zoomBy(ZOOM_STEP));
  els.btnZoomOut.addEventListener('click', () => zoomBy(-ZOOM_STEP));
  els.btnReset.addEventListener('click', resetLayout);

  els.btnRandom.addEventListener('click', () => {
    const focus = getFocusCharacter();
    if (!focus) return;
    const pool = focus.actions.filter((action) => action.id !== focus.idle.id);
    applyAction(randomOf(pool.length ? pool : focus.actions));
  });

  els.btnIdle.addEventListener('click', () => {
    const focus = getFocusCharacter();
    if (!focus) return;
    applyAction(focus.idle);
  });

  els.noticeClose.addEventListener('click', hideNotice);
  els.noticeRetry.addEventListener('click', () => window.location.reload());

  let searchTimer = 0;
  els.actionSearch.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.searchQuery = els.actionSearch.value;
      buildActionPanel();
    }, 120);
  });

  els.actionList.addEventListener('click', (event) => {
    const row = event.target.closest('.action-row');
    if (!row) return;
    const focus = getFocusCharacter();
    if (!focus) return;
    const action = focus.actionById.get(row.dataset.actionId);
    if (action) applyAction(action);
  });

  // 点击舞台空白处取消选择
  els.stage.addEventListener('pointerdown', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.pet')) return;
    if (target.closest('.stage-toolbar')) return;
    deselectPet();
  });

  window.addEventListener('keydown', (event) => {
    if (isTypingTarget(event.target)) return;
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      togglePause();
    } else if (event.key === 'Escape') {
      deselectPet();
    } else if (event.key === 'r' || event.key === 'R') {
      resetLayout();
    }
  });

  let resizeTimer = 0;
  const scheduleClamp = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(clampAllPets, 120);
  };
  window.addEventListener('resize', scheduleClamp);
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(scheduleClamp);
    observer.observe(els.stage);
  }
}

function clampAllPets() {
  const rect = stageRect();
  for (const pet of state.pets) {
    const center = clampCenter(pet.cx, pet.cy, pet, rect);
    pet.cx = center.x;
    pet.cy = center.y;
    layoutPet(pet);
  }
}

/* ============================================================
 * 启动
 * ============================================================ */

function cacheDom() {
  els.stage = $('stage');
  els.strip = $('character-strip');
  els.notice = $('notice');
  els.noticeTitle = $('notice-title');
  els.noticeText = $('notice-text');
  els.noticeRetry = $('notice-retry');
  els.noticeClose = $('notice-close');
  els.manifestStatus = $('manifest-status');
  els.manifestStatusText = $('manifest-status-text');
  els.fpsPill = $('fps-pill');
  els.btnTheme = $('btn-theme');
  els.selectionChip = $('selection-chip');
  els.pausedChip = $('paused-chip');
  els.stageLoading = $('stage-loading');
  els.stageLoadingText = $('stage-loading-text');
  els.toast = $('toast');
  els.btnAdd = $('btn-add');
  els.btnPlay = $('btn-play');
  els.btnPlayIcon = $('btn-play-icon');
  els.btnPlayLabel = $('btn-play-label');
  els.btnZoomIn = $('btn-zoom-in');
  els.btnZoomOut = $('btn-zoom-out');
  els.btnReset = $('btn-reset');
  els.zoomReadout = $('zoom-readout');
  els.actionsSubtitle = $('actions-subtitle');
  els.actionsCount = $('actions-count');
  els.actionSearch = $('action-search');
  els.actionList = $('action-list');
  els.btnRandom = $('btn-random');
  els.btnIdle = $('btn-idle');
  els.footerManifestInfo = $('footer-manifest-info');
}

async function boot() {
  cacheDom();
  initTheme();
  bindEvents();
  setPaused(false);
  window.requestAnimationFrame(frameLoop);
  await loadManifest();
}

boot().catch((error) => {
  console.error('[desktop-pet-preview] 初始化失败', error);
  if (els.stageLoading && els.stageLoadingText) {
    els.stageLoading.hidden = false;
    els.stageLoadingText.textContent = `预览页初始化失败：${error && error.message ? error.message : error}`;
  }
});
