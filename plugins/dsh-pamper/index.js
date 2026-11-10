/**
 * dsh-action-store：桌面宠物动作库（按需加载）。
 *
 * 负责三件事：
 *  1. 读取项目里的完整动作目录（catalog/action-store.json）与精灵图，给「宠爱 → 发现」页用；
 *  2. 按需把精灵图转成 dsh-pet 可播放的透明 WebM，并合并进对应形象的 config；
 *  3. 卸载动作（移除配置引用 + 删除 WebM），最后通知 dsh-pet 重载配置。
 */
import { spawn } from 'node:child_process';
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const ROUTE_SEGMENT = '/dsh-action-store-7462';
const DSH_PET_ROUTE = '/dsh-pet-7340';

const TARGETS = {
  maid: { kind: 'main', name: '大肥鱼', storePack: 'dsh' },
  gpt: { kind: 'aboutme-dragon', name: '白龙娘' },
  claude: { kind: 'aboutme-claude', name: '橙发书娘' },
  gemini: { kind: 'aboutme-gemini', name: '紫发猫耳娘' }
};

export const name = 'dsh-pamper';
export const inject = ['webServer'];

const DEFAULT_ASSET_BASE_URL = '';

function resolveDshPetRoot() {
  const home = process.env.DSH_HOME || join(homedir(), '.dsh');
  return join(home, 'dsh-pet');
}

function sendJson(res, status, body) {
  const text = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(text);
}

function sendText(res, status, text, contentType = 'text/plain; charset=utf-8') {
  res.statusCode = status;
  res.setHeader('content-type', contentType);
  res.setHeader('cache-control', 'no-store');
  res.end(text);
}

async function readBody(req, limit = 2 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error('body-too-large');
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
}

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile();
  } catch {
    return false;
  }
}

function ffmpegArgs({ webpPath, outPath, action, withAlphaMode }) {
  const frameWidth = Number(action.frameWidth);
  const frameHeight = Number(action.frameHeight);
  const columns = Number(action.columns);
  const frameCount = Number(action.frameCount);
  const fps = Number(action.fps) || 12;
  if (!(frameWidth > 0 && frameHeight > 0 && columns > 0 && frameCount > 0)) {
    throw new Error('精灵图元数据非法：' + action.name);
  }
  const vf = `crop=${frameWidth}:${frameHeight}:x='mod(n\\,${columns})*${frameWidth}':y='floor(n/${columns})*${frameHeight}',format=yuva420p`;
  const args = [
    '-hide_banner', '-nostdin', '-y', '-v', 'error',
    '-loop', '1', '-framerate', String(fps), '-i', webpPath,
    '-frames:v', String(frameCount), '-vf', vf, '-fps_mode', 'passthrough',
    '-c:v', 'libvpx-vp9', '-auto-alt-ref', '0', '-pix_fmt', 'yuva420p', '-row-mt', '1',
    '-b:v', '0', '-crf', '20'
  ];
  if (withAlphaMode) args.push('-alpha_mode', '1');
  args.push('-metadata:s:v:0', 'alpha_mode=1', outPath);
  return args;
}

async function runFfmpeg(args) {
  return await new Promise((resolvePromise) => {
    const child = spawn('ffmpeg', args, { stdio: 'ignore', windowsHide: true });
    child.on('error', (error) => resolvePromise({ ok: false, error: String(error) }));
    child.on('close', (code) => resolvePromise({ ok: code === 0, code }));
  });
}

async function convertAction({ storeRoot, action, animationDir }) {
  const webpPath = join(storeRoot, action.spritesheet);
  if (!(await isFile(webpPath))) throw new Error('缺少精灵图：' + action.spritesheet);
  const outPath = join(animationDir, action.name + '.webm');
  if (await isFile(outPath)) return { ok: true, skipped: true, outPath };
  await mkdir(animationDir, { recursive: true });
  let result = await runFfmpeg(ffmpegArgs({ webpPath, outPath, action, withAlphaMode: true }));
  if (!result.ok) result = await runFfmpeg(ffmpegArgs({ webpPath, outPath, action, withAlphaMode: false }));
  if (!result.ok) throw new Error('ffmpeg 转换失败：' + action.name);
  if (!(await isFile(outPath))) throw new Error('ffmpeg 没有产出文件：' + action.name);
  return { ok: true, outPath };
}

function dedupe(list) {
  const seen = new Set();
  return list.filter((name) => {
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}

function appendActions(config, actions) {
  config.animations = config.animations || {};
  if (!Array.isArray(config.animations.categories)) config.animations.categories = [];
  for (const action of actions) {
    let category = config.animations.categories.find((item) => item.id === action.category);
    if (!category) {
      category = { id: action.category || '其他', weight: 9, actions: [] };
      config.animations.categories.push(category);
    }
    if (!Array.isArray(category.actions)) category.actions = [];
    if (!category.actions.includes(action.name)) category.actions.push(action.name);
  }
}

function removeActions(config, names) {
  const drop = new Set(names);
  const strip = (list) => Array.isArray(list) ? list.filter((name) => !drop.has(name)) : list;
  const animations = config.animations || {};
  for (const key of ['idle', 'turn', 'drag', 'clicks']) animations[key] = strip(animations[key]);
  if (animations.moves?.actions) animations.moves.actions = animations.moves.actions.filter((item) => !drop.has(item?.name));
  for (const category of Array.isArray(animations.categories) ? animations.categories : []) category.actions = strip(category.actions);
  for (const key of Object.keys(animations.events || {})) animations.events[key] = strip(animations.events[key]);
}

function minimalMaidConfig(baseAction) {
  return {
    whisperPrompt: '你是主人桌面上的Q版蓝发小女仆，温柔乖巧带点俏皮。每次只说短短一句（20字以内），说话自然随意，不要解释你自己，不要提你是AI。',
    workStatusTexts: [
      ['正在想呢……', '让女仆理一下思路'],
      ['在动手了哦', '这一步交给我吧'],
      ['这一步处理好了'],
      ['需要你看一下呢', '等你确认一下~'],
      ['这轮完成啦'],
      ['好像卡住了，再试一次']
    ],
    memes: {},
    pets: [{
      id: 'aboutme-maid-1',
      name: '蓝毛小女仆',
      size: 420,
      balanceEnabled: false,
      whisperEnabled: true,
      workStatusEnabled: true,
      fixedEnabled: true,
      display: 'none',
      position: { corner: 'bottom-left', marginX: 24, marginY: 100 }
    }],
    animations: {
      idle: [baseAction],
      turn: [],
      drag: [],
      clicks: [],
      moves: { default: { minDist: 60, maxDist: 240, margin: 20, leadSec: 2, tailSec: 2 }, actions: [] },
      categories: [],
      events: { balance: [baseAction], workStatus: [baseAction], whisper: [baseAction] }
    },
    animationWeights: { idle: 10, turn: 5, move: 5 }
  };
}

export function apply(ctx, config = {}) {
  const storeRoot = config.storeRoot || 'D:/PC/DSH/pamper/assets/pet-store';
  const catalogPath = config.catalogPath || 'D:/PC/DSH/pamper/catalog/action-store.json';
  const assetBaseUrl = String(config.assetBaseUrl || DEFAULT_ASSET_BASE_URL).replace(/\/+$/, '');
  const cacheRoot = String(config.cacheRoot || '').trim() || join(resolveDshPetRoot(), 'action-cache');
  const dshPetRoot = resolveDshPetRoot();
  const statePath = join(dshPetRoot, 'action-store-state.json');

  const loadCatalog = async () => JSON.parse(await readFile(catalogPath, 'utf8'));

  const readState = async () => {
    try {
      return JSON.parse(await readFile(statePath, 'utf8'));
    } catch {
      return {};
    }
  };
  const writeState = async (state) => {
    await mkdir(dshPetRoot, { recursive: true });
    await writeFile(statePath, JSON.stringify(state, null, 2));
  };

  const assetsDir = process.env.DSH_PROFILE_DIR
    ? join(process.env.DSH_PROFILE_DIR, 'node_modules', 'dsh-pet', 'assets')
    : join(homedir(), '.dsh', 'profiles', process.env.DSH_PROFILE || 'desktop', 'node_modules', 'dsh-pet', 'assets');

  const stripJsonComments = (text) => {
    let out = '';
    let inString = false;
    let escaped = false;
    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      const next = text[i + 1];
      if (inString) {
        out += ch;
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') { inString = true; out += ch; continue; }
      if (ch === '/' && next === '/') {
        while (i < text.length && text[i] !== '\n') i += 1;
        out += '\n';
        continue;
      }
      if (ch === '/' && next === '*') {
        i += 2;
        while (i < text.length - 1 && !(text[i] === '*' && text[i + 1] === '/')) i += 1;
        i += 1;
        continue;
      }
      out += ch;
    }
    return out;
  };

  const readBaseMainConfig = async () => JSON.parse(stripJsonComments(await readFile(join(assetsDir, 'config.jsonc'), 'utf8')));

  const configPathOf = (kind) => kind === 'main' ? join(dshPetRoot, 'main-config.jsonc') : join(dshPetRoot, 'pet', kind + '-config.json');
  const animationDirOf = (kind) => kind === 'main' ? join(dshPetRoot, 'main-animation') : join(dshPetRoot, 'pet', kind + '-animation');

  const readPackConfig = async (kind) => {
    if (kind === 'main') {
      const base = await readBaseMainConfig();
      const userPath = configPathOf('main');
      const user = (await isFile(userPath)) ? JSON.parse(await readFile(userPath, 'utf8')) : {};
      const merged = { ...base, ...user };
      if (!merged.animations) merged.animations = base.animations;
      return merged;
    }
    const path = configPathOf(kind);
    if (!(await isFile(path))) return null;
    return JSON.parse(await readFile(path, 'utf8'));
  };
  const writePackConfig = async (kind, packConfig) => {
    if (kind === 'main') {
      const userPath = configPathOf('main');
      const user = (await isFile(userPath)) ? JSON.parse(await readFile(userPath, 'utf8')) : {};
      user.animations = packConfig.animations;
      await writeFile(userPath, JSON.stringify(user, null, 2) + '\n');
      return;
    }
    await mkdir(join(dshPetRoot, 'pet'), { recursive: true });
    await writeFile(configPathOf(kind), JSON.stringify(packConfig, null, 2) + '\n');
  };

  const installWebmFromRemote = async (action, animationDir) => {
    if (!assetBaseUrl || !action.webm) return false;
    const cachePath = join(cacheRoot, 'webm', action.pack, action.name + '.webm');
    const targetPath = join(animationDir, action.name + '.webm');
    if (!(await isFile(cachePath))) {
      const url = assetBaseUrl + '/' + String(action.webm).split('/').map(encodeURIComponent).join('/');
      let lastError = null;
      for (let attempt = 1; attempt <= 5; attempt += 1) {
        try {
          const response = await fetch(url, { signal: AbortSignal.timeout(90000) });
          if (!response.ok) throw new Error('HTTP ' + response.status);
          const buffer = Buffer.from(await response.arrayBuffer());
          if (buffer.length < 1024) throw new Error('下载内容过小');
          const { mkdir, writeFile } = await import('node:fs/promises');
          await mkdir(join(cacheRoot, 'webm', action.pack), { recursive: true });
          await writeFile(cachePath, buffer);
          lastError = null;
          break;
        } catch (error) {
          lastError = error;
          ctx.logger?.warn?.('[dsh-pamper] 下载失败（第 ' + attempt + '/5 次）：' + (error instanceof Error ? error.message : String(error)));
          if (attempt < 5) await new Promise((r) => setTimeout(r, 800 * attempt));
        }
      }
      if (lastError) throw new Error('远程动作下载失败：' + lastError.message + '（' + url + '）');
    }
    await mkdir(animationDir, { recursive: true });
    await copyFile(cachePath, targetPath);
    return true;
  };

  const ensureMaidPack = async (catalog) => {
    const target = TARGETS.maid;
    if (await isFile(configPathOf(target.kind))) return;
    const character = catalog.characters.find((item) => item.key === 'maid');
    const actions = character?.actions || [];
    const base = actions.find((action) => action.category === '待机') || actions[0];
    if (!base) throw new Error('动作库里没有小女仆的基础待机动作');
    await convertAction({ storeRoot, action: base, animationDir: animationDirOf(target.kind) });
    await writePackConfig(target.kind, minimalMaidConfig(base.name));
    const avatar = join(storeRoot, 'pets', target.storePack, 'avatar.webp');
    if (await isFile(avatar)) await copyFile(avatar, join(dshPetRoot, 'pet', target.kind + '-avatar.webp'));
    ctx.logger?.info?.(`[dsh-pamper] 已创建形象包 ${target.kind}`);
  };

  const reloadPet = async () => {
    try {
      const port = typeof ctx.webServer?.port === 'number' ? ctx.webServer.port : 0;
      const origin = ctx.webServer?.getOrigin?.() || `http://127.0.0.1:${port}`;
      await fetch(origin + DSH_PET_ROUTE + '/reload', { method: 'POST' });
      return true;
    } catch (error) {
      ctx.logger?.warn?.(`[dsh-pamper] 通知 dsh-pet 重载失败：${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  const resolveActions = (catalog, characterKey, body) => {
    const character = catalog.characters.find((item) => item.key === characterKey);
    if (!character) throw new Error('未知角色：' + characterKey);
    if (Array.isArray(body.actionIds) && body.actionIds.length > 0) {
      const set = new Set(body.actionIds);
      return character.actions.filter((action) => set.has(action.name) || set.has(action.id));
    }
    if (typeof body.category === 'string' && body.category) {
      return character.actions.filter((action) => action.category === body.category);
    }
    if (body.all === true) return character.actions.slice();
    throw new Error('缺少 actionIds / category / all');
  };

  const handle = async (req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const path = decodeURIComponent(url.pathname.slice(ROUTE_SEGMENT.length)).replace(/^\/+/, '');
    try {
      if (req.method === 'GET' && path === 'catalog') {
        const catalog = await loadCatalog();
        const packsOnDisk = new Set();
        for (const target of Object.values(TARGETS)) {
          if (await isFile(configPathOf(target.kind))) packsOnDisk.add(target.kind);
        }
        return sendJson(res, 200, { ...catalog, installedPacks: [...packsOnDisk] });
      }
      if (req.method === 'GET' && path === 'status') {
        const state = await readState();
        const catalog = await loadCatalog();
        const characters = {};
        for (const character of catalog.characters) {
          const target = TARGETS[character.key];
          const loaded = Array.isArray(state[character.key]?.loaded) ? state[character.key].loaded : [];
          characters[character.key] = {
            kind: target?.kind,
            installed: target ? await isFile(configPathOf(target.kind)) : false,
            loaded,
            loadedCount: loaded.length,
            total: character.actionCount
          };
        }
        return sendJson(res, 200, { characters });
      }
      if (req.method === 'GET' && path === 'thumb') {
        const pack = url.searchParams.get('pack') || '';
        const actionName = url.searchParams.get('name') || '';
        if (!/^[a-z0-9_-]+$/i.test(pack) || !actionName || actionName.includes('..') || /[\\/]/.test(actionName)) {
          return sendText(res, 400, 'bad request');
        }
        const file = join(storeRoot, 'pets', pack, 'spritesheet', actionName + '.webp');
        if (!(await isFile(file))) return sendText(res, 404, 'not found');
        res.statusCode = 200;
        res.setHeader('content-type', 'image/webp');
        res.setHeader('cache-control', 'public, max-age=86400');
        return res.end(await readFile(file));
      }
      if (req.method === 'POST' && path === 'load') {
        const body = await readBody(req);
        const characterKey = String(body.character || '');
        const target = TARGETS[characterKey];
        if (!target) return sendJson(res, 400, { ok: false, error: '未知角色：' + characterKey });
        const catalog = await loadCatalog();
        const packConfig = await readPackConfig(target.kind);
        if (!packConfig) return sendJson(res, 400, { ok: false, error: '形象包未安装：' + target.kind });
        const actions = resolveActions(catalog, characterKey, body);
        const converted = [];
        const failed = [];
        let remoteCount = 0;
        for (const action of actions) {
          try {
            let installed = false;
            try {
              installed = await installWebmFromRemote(action, animationDirOf(target.kind));
            } catch (error) {
              ctx.logger?.warn?.('[dsh-pamper] ' + (error instanceof Error ? error.message : String(error)));
            }
            if (!installed) await convertAction({ storeRoot, action, animationDir: animationDirOf(target.kind) });
            else remoteCount += 1;
            converted.push(action);
          } catch (error) {
            failed.push(action.name + '：' + (error instanceof Error ? error.message : String(error)));
          }
        }
        appendActions(packConfig, converted);
        await writePackConfig(target.kind, packConfig);
        const state = await readState();
        state[characterKey] = state[characterKey] || {};
        state[characterKey].loaded = dedupe([...(state[characterKey].loaded || []), ...converted.map((action) => action.name)]);
        await writeState(state);
        const reloaded = await reloadPet();
        return sendJson(res, 200, {
          ok: true,
          character: characterKey,
          kind: target.kind,
          converted: converted.length,
          remote: remoteCount,
          failed,
          reloaded,
          loadedCount: state[characterKey].loaded.length
        });
      }
      if (req.method === 'POST' && path === 'unload') {
        const body = await readBody(req);
        const characterKey = String(body.character || '');
        const target = TARGETS[characterKey];
        if (!target) return sendJson(res, 400, { ok: false, error: '未知角色：' + characterKey });
        const catalog = await loadCatalog();
        const actions = resolveActions(catalog, characterKey, body);
        const packConfig = await readPackConfig(target.kind);
        const names = actions.map((action) => action.name);
        if (packConfig) {
          removeActions(packConfig, names);
          await writePackConfig(target.kind, packConfig);
        }
        for (const actionName of names) {
          await rm(join(animationDirOf(target.kind), actionName + '.webm'), { force: true });
        }
        const state = await readState();
        const keep = new Set((state[characterKey]?.loaded || []).filter((name) => !names.includes(name)));
        state[characterKey] = { ...(state[characterKey] || {}), loaded: [...keep] };
        await writeState(state);
        const reloaded = await reloadPet();
        return sendJson(res, 200, { ok: true, character: characterKey, removed: names.length, reloaded, loadedCount: keep.size });
      }
      return sendText(res, 404, 'not found');
    } catch (error) {
      ctx.logger?.warn?.(`[dsh-pamper] route failed: ${error instanceof Error ? error.message : String(error)}`);
      return sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  };

  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: ROUTE_SEGMENT,
    handler: (req, res) => void handle(req, res)
  }));
}
