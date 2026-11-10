/**
 * dsh-pamper 0.4.0：完全独立的宠爱插件。
 * 不读取/修改 dsh-pet 运行文件；首次启动只读复制 dsh-pet 的角色配置到自己的数据目录。
 */
import { copyFile, cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import fs from 'node:fs';
import { homedir } from 'node:os';
import { spawn, spawnSync } from 'node:child_process';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

export const name = 'dsh-pamper';
export const inject = ['webServer'];

const ROUTE = '/dsh-pamper-7470';
const CATALOG_PATH = fileURLToPath(new URL('./catalog/action-store.json', import.meta.url));
const ASSET_BASE = 'https://cdn.jsdelivr.net/gh/Ai-nice/pamper-assets@main';
const HELPER_DIR = fileURLToPath(new URL('./helper/', import.meta.url));
const ELECTRON_VERSION = '44.7.0';
const ELECTRON_MIRROR = 'https://npmmirror.com/mirrors/electron/';
const BASE_PACK_URL = 'https://github.com/Ai-nice/dsh-pamper/releases/download/v1.0.0/pets-base-v2.zip';
const GROUP_OF = (kind) => {
  if (kind === 'main') return 'deepseek';
  if (kind.startsWith('aboutme-dragon')) return 'GPT';
  if (kind.startsWith('aboutme-claude')) return 'Claude';
  if (kind.startsWith('aboutme-gemini')) return 'Gemini';
  if (kind.startsWith('xiaoxiao-bailong')) return '白龙';
  return '其他';
};

const home = () => process.env.DSH_HOME || join(homedir(), '.dsh');
const ownRoot = () => join(home(), 'pamper');
const petsDir = () => join(ownRoot(), 'pets');
const statePath = () => join(ownRoot(), 'state.json');

const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
};
const sendText = (res, status, text) => {
  res.statusCode = status;
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end(text);
};
const isFile = async (path) => {
  try { return (await stat(path)).isFile(); } catch { return false; }
};
const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
};
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const writeJson = async (path, value) => writeFile(path, JSON.stringify(value, null, 2) + '\n');

async function ensureFrames(ctx, kind, action) {
  const safe = action.replace(/[\\/:*?"<>|]/g, '_');
  const dir = join(ownRoot(), 'desktop-frames-v2', kind, safe);
  const existing = (await readdir(dir).catch(() => [])).filter((name) => name.endsWith('.png')).sort();
  if (existing.length > 0) return existing.map((name) => join(dir, name));
  const webm = join(petsDir(), kind + '-animation', action + '.webm');
  if (!existsSync(webm)) throw new Error('动画文件不存在：' + webm);
  await mkdir(dir, { recursive: true });
  let ffmpeg = process.env.PAMPER_FFMPEG || '';
  if (!ffmpeg) { try { ffmpeg = createRequire(import.meta.url)('@ffmpeg-installer/ffmpeg').path; } catch {} }
  if (!ffmpeg) ffmpeg = 'ffmpeg';
  const result = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-c:v', 'libvpx-vp9', '-i', webm, '-vf', 'fps=12,scale=360:-1:flags=lanczos', '-pix_fmt', 'rgba', join(dir, 'frame-%04d.png')], { windowsHide: true });
  if (result.status !== 0) throw new Error('ffmpeg 转换失败，请安装 ffmpeg 或设置 PAMPER_FFMPEG');
  const after = (await readdir(dir)).filter((name) => name.endsWith('.png')).sort();
  return after.map((name) => join(dir, name));
}

async function ensureElectron(ctx) {
  const targetDir = join(ownRoot(), 'electron');
  const exe = join(targetDir, process.platform === 'win32' ? 'electron.exe' : 'electron');
  if (await isFile(exe)) return exe;
  await mkdir(targetDir, { recursive: true });
  const zipPath = join(ownRoot(), 'electron.zip');
  const platform = process.platform === 'win32' ? 'win32' : process.platform === 'darwin' ? 'darwin' : 'linux';
  const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
  const url = ELECTRON_MIRROR + ELECTRON_VERSION + '/electron-v' + ELECTRON_VERSION + '-' + platform + '-' + arch + '.zip';
  ctx.logger?.info?.('[dsh-pamper] 正在下载桌面运行时 Electron（首次约 158MB）…');
  let lastError = null;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(600000) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      await writeFile(zipPath, Buffer.from(await response.arrayBuffer()));
      const result = spawnSync('tar', ['-xf', zipPath, '-C', targetDir], { windowsHide: true });
      if (result.status !== 0) throw new Error('解压失败');
      const findExe = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = join(dir, entry.name);
          if (entry.isDirectory()) { const found = findExe(full); if (found) return found; }
          else if (entry.name === (process.platform === 'win32' ? 'electron.exe' : 'electron')) return full;
        }
        return '';
      };
      const found = findExe(targetDir);
      if (found) {
        if (found !== exe) await copyFile(found, exe);
        await rm(zipPath, { force: true });
        return exe;
      }
      throw new Error('解压后找不到 electron 可执行文件');
    } catch (error) {
      lastError = error;
      if (attempt < 5) await new Promise((resolveDelay) => setTimeout(resolveDelay, 800 * attempt));
    }
  }
  throw new Error('Electron 下载失败：' + (lastError?.message || url));
}

async function downloadBasePack(ctx) {
  const zipPath = join(ownRoot(), 'base-pack.zip');
  try {
    if (!(await isFile(zipPath))) {
      ctx.logger?.info?.('[dsh-pamper] 正在下载基础形象包（首次约 345MB）…');
      let lastError = null;
      for (let attempt = 1; attempt <= 5; attempt += 1) {
        try {
          const response = await fetch(BASE_PACK_URL, { signal: AbortSignal.timeout(600000) });
          if (!response.ok) throw new Error('HTTP ' + response.status);
          const buffer = Buffer.from(await response.arrayBuffer());
          if (buffer.length < 1024 * 1024) throw new Error('下载文件过小');
          await writeFile(zipPath, buffer);
          break;
        } catch (error) {
          lastError = error;
          await rm(zipPath, { force: true });
          if (attempt < 5) await new Promise((resolveDelay) => setTimeout(resolveDelay, 1000 * attempt));
        }
      }
      if (!(await isFile(zipPath))) throw new Error('基础包下载失败：' + (lastError?.message || ''));
    }
    const temp = join(ownRoot(), '.extract');
    await rm(temp, { recursive: true, force: true });
    await mkdir(temp, { recursive: true });
    const result = spawnSync('tar', ['-xf', zipPath, '-C', temp], { windowsHide: true });
    if (result.status !== 0) throw new Error('解压失败：' + String(result.stderr || ''));
    const candidates = [join(temp, 'pet'), join(temp, 'pets'), join(temp, 'dist', 'pet'), join(temp, 'dist', 'pets')];
    let source = '';
    for (const candidate of candidates) if (existsSync(candidate)) { source = candidate; break; }
    if (!source) throw new Error('基础包结构不识别（找不到 pet/pets 目录）');
    await cp(source, petsDir(), { recursive: true, force: false, errorOnExist: false });
    await rm(temp, { recursive: true, force: true });
    ctx.logger?.info?.('[dsh-pamper] 基础形象包安装完成');
  } catch (error) {
    ctx.logger?.warn?.('[dsh-pamper] 基础形象包安装失败：' + (error instanceof Error ? error.message : String(error)));
  }
}

async function ensureBaseInstalled(ctx) {
  if (baseInstallPromise) return baseInstallPromise;
  baseInstallPromise = downloadBasePack(ctx).finally(() => { baseInstallPromise = null; });
  return baseInstallPromise;
}

async function ensureMigrated(ctx) {
  await mkdir(petsDir(), { recursive: true });
  const entries = await readdir(petsDir()).catch(() => []);
  if (!entries.some((name) => name.endsWith('-config.json'))) {
    const source = join(home(), 'dsh-pet', 'pet');
    if (existsSync(source)) {
      try {
        await cp(source, petsDir(), { recursive: true, force: false, errorOnExist: false });
        ctx.logger?.info?.('[dsh-pamper] 已把 dsh-pet 角色配置只读复制到 ' + petsDir());
      } catch (error) {
        ctx.logger?.warn?.('[dsh-pamper] 迁移 dsh-pet 角色失败：' + (error instanceof Error ? error.message : String(error)));
      }
    }
  }
  await migrateMainPack(ctx);
  const after = await readdir(petsDir()).catch(() => []);
  if (!after.some((name) => name.endsWith('-config.json'))) await ensureBaseInstalled(ctx);
}


function parseJsonc(text) {
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
    if (ch === '/' && next === '/') { while (i < text.length && text[i] !== '\n') i += 1; out += '\n'; continue; }
    if (ch === '/' && next === '*') { i += 2; while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i += 1; i += 1; continue; }
    out += ch;
  }
  return JSON.parse(out.replace(/,\s*([}\]])/g, '$1'));
}

async function findDshPetPackageDir() {
  const profilesRoot = join(home(), 'profiles');
  let entries = [];
  try { entries = await readdir(profilesRoot, { withFileTypes: true }); } catch { return ''; }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const candidate = join(profilesRoot, entry.name, 'node_modules', 'dsh-pet');
    if (existsSync(candidate)) return candidate;
  }
  return '';
}

async function migrateMainPack(ctx) {
  const mainConfigPath = join(petsDir(), 'main-config.json');
  if (existsSync(mainConfigPath)) return;
  const dshPet = await findDshPetPackageDir();
  if (!dshPet) return;
  try {
    const assetsDir = join(dshPet, 'assets');
    const assetsConfig = parseJsonc(await readFile(join(assetsDir, 'config.jsonc'), 'utf8'));
    let mainPet = { id: 'main', name: '大肥鱼', size: 420, display: 'desktop', position: { corner: 'top-right', marginX: 24, marginY: 100 } };
    try {
      const runtimeConfig = parseJsonc(await readFile(join(home(), 'dsh-pet', 'main-config.jsonc'), 'utf8'));
      if (Array.isArray(runtimeConfig.pets) && runtimeConfig.pets[0]) mainPet = runtimeConfig.pets[0];
    } catch {}
    const config = {
      pets: [mainPet],
      animations: assetsConfig.animations || {},
      animationWeights: assetsConfig.animationWeights || {}
    };
    await writeJson(mainConfigPath, config);
    const avatarSource = join(assetsDir, 'main-character.png');
    if (await isFile(avatarSource)) await copyFile(avatarSource, join(petsDir(), 'main-avatar.png'));
    const webmDir = join(assetsDir, 'webm');
    const animationTarget = join(petsDir(), 'main-animation');
    await mkdir(animationTarget, { recursive: true });
    for (const entry of await readdir(webmDir, { withFileTypes: true }).catch(() => [])) {
      if (entry.isFile() && entry.name.endsWith('.webm')) {
        await copyFile(join(webmDir, entry.name), join(animationTarget, entry.name));
      }
    }
    ctx.logger?.info?.('[dsh-pamper] 已迁移内置主形象（大肥鱼）');
  } catch (error) {
    ctx.logger?.warn?.('[dsh-pamper] 迁移主形象失败：' + (error instanceof Error ? error.message : String(error)));
  }
}

async function listPacks() {
  const entries = await readdir(petsDir()).catch(() => []);
  const packs = [];
  for (const entry of entries) {
    if (!entry.endsWith('-config.json')) continue;
    const kind = entry.slice(0, -'-config.json'.length);
    try {
      const config = await readJson(join(petsDir(), entry));
      const pet = Array.isArray(config.pets) ? config.pets[0] : null;
      const avatarBase = join(petsDir(), kind + '-avatar');
      let avatar = '';
      for (const ext of ['.webp', '.png', '.jpg', '.jpeg']) {
        if (await isFile(avatarBase + ext)) { avatar = kind + '-avatar' + ext; break; }
      }
      const actions = new Set();
      const animations = config.animations || {};
      for (const key of ['idle', 'turn', 'drag', 'clicks']) {
        for (const name of Array.isArray(animations[key]) ? animations[key] : []) actions.add(name);
      }
      for (const category of Array.isArray(animations.categories) ? animations.categories : []) {
        for (const name of Array.isArray(category.actions) ? category.actions : []) actions.add(name);
      }
      for (const event of Object.values(animations.events || {})) {
        for (const name of Array.isArray(event) ? event : []) actions.add(name);
      }
      packs.push({
        kind,
        id: pet?.id,
        name: pet?.name || kind,
        group: GROUP_OF(kind),
        avatar,
        display: pet?.display !== 'none',
        size: Number(pet?.size) || 420,
        corner: pet?.position?.corner || 'top-right',
        marginX: Number(pet?.position?.marginX) || 24,
        marginY: Number(pet?.position?.marginY) || 100,
        actionCount: actions.size,
        loadedActions: [...actions],
        idle: Array.isArray(animations.idle) ? animations.idle[0] : null
      });
    } catch (error) {
      ctx.logger?.warn?.('[dsh-pamper] 读取角色配置失败 ' + entry + '：' + (error instanceof Error ? error.message : String(error)));
    }
  }
  return packs.sort((a, b) => a.kind.localeCompare(b.kind));
}

async function loadConfig(kind) {
  return await readJson(join(petsDir(), kind + '-config.json'));
}
async function saveConfig(kind, config) {
  await writeJson(join(petsDir(), kind + '-config.json'), config);
}
function addActionToConfig(config, action) {
  const animations = config.animations || (config.animations = {});
  const name = action.name;
  const category = action.category || '其他';
  if (category === '待机') {
    animations.idle = Array.isArray(animations.idle) ? animations.idle : [];
    if (!animations.idle.includes(name)) animations.idle.push(name);
  }
  const categories = Array.isArray(animations.categories) ? animations.categories : (animations.categories = []);
  let bucket = categories.find((item) => item.id === category);
  if (!bucket) {
    bucket = { id: category, weight: 8, actions: [] };
    categories.push(bucket);
  }
  if (!bucket.actions.includes(name)) bucket.actions.push(name);
}

async function downloadAction(ctx, action) {
  if (!action?.webm) throw new Error('动作缺少 webm 路径');
  const key = action.pack === 'dsh' || action.pack === 'dsh1' ? 'main' : action.pack === 'gpt1' ? 'aboutme-dragon' : action.pack === 'gpt' ? 'aboutme-dragon' : action.pack === 'claude' ? 'aboutme-claude' : action.pack === 'gemini' ? 'aboutme-gemini' : action.pack;
  const animationDir = join(petsDir(), key + '-animation');
  const file = join(animationDir, action.name + '.webm');
  if (await isFile(file)) return file;
  await mkdir(animationDir, { recursive: true });
  const url = ASSET_BASE + '/' + String(action.webm).split('/').map(encodeURIComponent).join('/');
  let lastError = null;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 1024) throw new Error('文件过小');
      await writeFile(file, buffer);
      return file;
    } catch (error) {
      lastError = error;
      if (attempt < 5) await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
    }
  }
  throw new Error('下载失败：' + (lastError?.message || url));
}

let baseInstallPromise = null;
export function apply(ctx) {
  let desktopChild = null;
  const stopDesktop = () => {
    if (desktopChild && desktopChild.exitCode === null) {
      if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(desktopChild.pid), '/T', '/F'], { windowsHide: true });
      else desktopChild.kill();
    }
    desktopChild = null;
  };
  ctx.effect(() => () => stopDesktop());
  let catalogPromise = null;
  const loadCatalog = async () => {
    if (!catalogPromise) catalogPromise = readFile(CATALOG_PATH, 'utf8').then(JSON.parse);
    return await catalogPromise;
  };
  void ensureMigrated(ctx);

  const readConfigMap = async () => {
    const entries = await readdir(petsDir()).catch(() => []);
    const merged = {};
    for (const entry of entries) {
      if (!entry.endsWith('-config.json')) continue;
      const kind = entry.slice(0, -'-config.json'.length);
      try { merged[kind] = await loadConfig(kind); } catch {}
    }
    return merged;
  };
  const writeConfigMap = async (merged) => {
    for (const [kind, config] of Object.entries(merged)) {
      if (/^[a-z0-9_-]+$/i.test(kind)) await saveConfig(kind, config);
    }
  };
  const buildDesktopState = async () => {
    const pets = (await listPacks()).filter((item) => item.display && item.idle);
    const state = { pets: [] };
    for (const item of pets) {
      try {
        const frames = await ensureFrames(ctx, item.kind, item.idle);
        state.pets.push({ id: item.id, kind: item.kind, name: item.name, idle: item.idle, size: item.size, corner: item.corner, marginX: item.marginX, marginY: item.marginY, frames });
      } catch (error) {
        ctx.logger?.warn?.('[dsh-pamper] 桌面模式准备失败 ' + item.kind + '：' + (error instanceof Error ? error.message : String(error)));
      }
    }
    return state;
  };
  const launchDesktop = async (apiBase = '') => {
    stopDesktop();
    const state = await buildDesktopState();
    if (apiBase) state.apiBase = apiBase;
    if (state.pets.length === 0) return state;
    const stateFile = join(ownRoot(), 'desktop-state.json');
    await writeJson(stateFile, state);
    const script = join(HELPER_DIR, 'desktop.ps1');
    desktopChild = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-StatePath', stateFile], { cwd: ownRoot(), windowsHide: false, stdio: ['ignore', 'ignore', 'pipe'] });
    desktopChild.stderr?.on('data', (chunk) => { try { fs.appendFileSync(join(ownRoot(), 'desktop-helper.log'), String(chunk)); } catch {} });
    desktopChild.once('exit', () => { desktopChild = null; });
    return state;
  };
  const refreshDesktopIfRunning = async () => {
    if (!desktopChild || desktopChild.exitCode !== null) return;
    try { await launchDesktop(); } catch (error) { ctx.logger?.warn?.('[dsh-pamper] 桌面模式刷新失败：' + (error instanceof Error ? error.message : String(error))); }
  };

  const handle = async (req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const path = decodeURIComponent(url.pathname.slice(ROUTE.length)).replace(/^\/+/, '');
    try {
      if (req.method === 'GET' && path === 'catalog') return sendJson(res, 200, await loadCatalog());
      if (req.method === 'GET' && path === 'install-status') {
        const entries = await readdir(petsDir()).catch(() => []);
        return sendJson(res, 200, { ok: true, installing: Boolean(baseInstallPromise), characters: entries.filter((name) => name.endsWith('-config.json')).length });
      }
      if (req.method === 'POST' && path === 'install-base') {
        await ensureBaseInstalled(ctx);
        const entries = await readdir(petsDir()).catch(() => []);
        return sendJson(res, 200, { ok: true, characters: entries.filter((name) => name.endsWith('-config.json')).length });
      }
      if (req.method === 'GET' && path === 'preview') {
        const pack = url.searchParams.get('pack') || '';
        const name = url.searchParams.get('name') || '';
        const catalog = await loadCatalog();
        const action = catalog.characters.flatMap((character) => character.actions).find((item) => item.pack === pack && item.name === name);
        if (!action) return sendText(res, 404, 'not found');
        try {
          const file = await downloadAction(ctx, action);
          res.statusCode = 200;
          res.setHeader('content-type', 'video/webm');
          res.setHeader('cache-control', 'public, max-age=3600');
          return res.end(await readFile(file));
        } catch (error) {
          return sendText(res, 500, error instanceof Error ? error.message : String(error));
        }
      }
      if (req.method === 'GET' && path === 'thumb') {
        const pack = url.searchParams.get('pack') || '';
        const name = url.searchParams.get('name') || '';
        const catalog = await loadCatalog();
        const action = catalog.characters.flatMap((character) => character.actions).find((item) => item.pack === pack && item.name === name);
        if (!action || typeof action.thumb !== 'string') return sendText(res, 404, 'not found');
        const match = action.thumb.match(/^data:image\/([a-z]+);base64,(.*)$/);
        if (!match) return sendText(res, 404, 'not found');
        const buffer = Buffer.from(match[2], 'base64');
        res.statusCode = 200;
        res.setHeader('content-type', 'image/' + match[1]);
        res.setHeader('cache-control', 'public, max-age=3600');
        return res.end(buffer);
      }
      if (req.method === 'GET' && path === 'config') return sendJson(res, 200, await readConfigMap());
      if (req.method === 'GET' && path === 'config/meta') {
        return sendJson(res, 200, { user: statePath(), default: '', animations: petsDir(), storage: [] });
      }
      if (req.method === 'GET' && path === 'models') return sendJson(res, 200, { providers: [] });
      if (req.method === 'POST' && path === 'config') return sendJson(res, 200, await readConfigMap());
      if (req.method === 'PUT' && path === 'config') {
        const body = await readBody(req);
        const merged = await readConfigMap();
        if (!merged.main) return sendJson(res, 200, { ok: false, reason: 'bad-request', message: 'main missing' });
        if (Array.isArray(body.pets)) merged.main.pets = body.pets;
        for (const [key, value] of Object.entries(body)) {
          if (key === 'pets') continue;
          if (value !== undefined && value !== null) merged.main[key] = value;
        }
        await writeConfigMap({ main: merged.main });
        await refreshDesktopIfRunning();
        return sendJson(res, 200, await readConfigMap());
      }
      if (req.method === 'POST' && path === 'pet-config') {
        const body = await readBody(req);
        const entry = String(body.entry || '');
        if (!/^[a-z0-9_-]+$/i.test(entry)) return sendJson(res, 200, { ok: false, reason: 'bad-request', message: 'bad entry' });
        const merged = await readConfigMap();
        if (!merged[entry]) return sendJson(res, 200, { ok: false, reason: 'unknown-entry', message: 'unknown entry' });
        if (Array.isArray(body.pets)) merged[entry].pets = body.pets;
        await saveConfig(entry, merged[entry]);
        await refreshDesktopIfRunning();
        return sendJson(res, 200, await readConfigMap());
      }
      if (req.method === 'POST' && path === 'pet-position') {
        const body = await readBody(req);
        const id = String(body.id || '');
        const merged = await readConfigMap();
        let changed = false;
        for (const config of Object.values(merged)) {
          for (const pet of Array.isArray(config.pets) ? config.pets : []) {
            if (pet.id !== id) continue;
            pet.position = pet.position || {};
            if (typeof body.corner === 'string') pet.position.corner = body.corner;
            if (Number.isFinite(Number(body.marginX))) pet.position.marginX = Number(body.marginX);
            if (Number.isFinite(Number(body.marginY))) pet.position.marginY = Number(body.marginY);
            changed = true;
          }
        }
        if (changed) await writeConfigMap(merged);
        return sendJson(res, 200, { ok: true });
      }
      if (req.method === 'POST' && path === 'pet-display') {
        const body = await readBody(req);
        const id = String(body.id || '');
        const display = body.display === 'none' ? 'none' : 'desktop';
        const merged = await readConfigMap();
        let changed = false;
        for (const config of Object.values(merged)) {
          for (const pet of Array.isArray(config.pets) ? config.pets : []) {
            if (pet.id === id) { pet.display = display; changed = true; }
          }
        }
        if (changed) await writeConfigMap(merged);
        try {
          if (display === 'desktop' && (!desktopChild || desktopChild.exitCode !== null)) await launchDesktop('http://' + (req.headers.host || '127.0.0.1'));
          else await refreshDesktopIfRunning();
        } catch (error) {
          ctx.logger?.warn?.('[dsh-pamper] 桌面模式启动失败：' + (error instanceof Error ? error.message : String(error)));
        }
        return sendJson(res, 200, { ok: true, display });
      }
      if (req.method === 'GET' && path === 'logo') {
        const kind = url.searchParams.get('root') || '';
        const entries = await readdir(petsDir()).catch(() => []);
        const avatar = entries.find((name) => name.startsWith(kind + '-avatar.'));
        if (!avatar) return sendText(res, 404, 'not found');
        const ext = extname(avatar).toLowerCase();
        res.statusCode = 200;
        res.setHeader('content-type', ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp');
        return res.end(await readFile(join(petsDir(), avatar)));
      }
      if (req.method === 'GET' && path === 'characters') return sendJson(res, 200, { characters: await listPacks(), dataRoot: ownRoot() });
      if (req.method === 'GET' && path === 'avatar') {
        const kind = url.searchParams.get('kind') || '';
        const entries = await readdir(petsDir()).catch(() => []);
        const avatar = entries.find((name) => name.startsWith(kind + '-avatar.'));
        if (!avatar) return sendText(res, 404, 'not found');
        const ext = extname(avatar).toLowerCase();
        res.statusCode = 200;
        res.setHeader('content-type', ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp');
        return res.end(await readFile(join(petsDir(), avatar)));
      }
      if (req.method === 'GET' && path === 'animation') {
        const kind = url.searchParams.get('kind') || '';
        const actionName = url.searchParams.get('name') || '';
        if (!kind || !actionName || actionName.includes('..') || /[\\/]/.test(actionName)) return sendText(res, 400, 'bad request');
        const file = join(petsDir(), kind + '-animation', actionName + '.webm');
        if (!(await isFile(file))) return sendText(res, 404, 'not found');
        res.statusCode = 200;
        res.setHeader('content-type', 'video/webm');
        res.setHeader('cache-control', 'public, max-age=3600');
        return res.end(await readFile(file));
      }
      if (req.method === 'POST' && path === 'toggleAll') {
        const body = await readBody(req);
        const visible = Boolean(body.visible);
        const entries = await readdir(petsDir()).catch(() => []);
        const results = [];
        for (const entry of entries) {
          if (!entry.endsWith('-config.json')) continue;
          const kind = entry.slice(0, -'-config.json'.length);
          try {
            const config = await loadConfig(kind);
            const pet = config.pets?.[0];
            if (!pet) continue;
            pet.display = visible ? 'desktop' : 'none';
            await saveConfig(kind, config);
            results.push(kind);
          } catch {}
        }
        await refreshDesktopIfRunning();
        return sendJson(res, 200, { ok: true, visible, count: results.length });
      }
      if (req.method === 'POST' && path === 'toggle') {
        const body = await readBody(req);
        const kind = String(body.kind || '');
        if (!/^[a-z0-9_-]+$/i.test(kind)) return sendJson(res, 400, { ok: false, error: 'bad kind' });
        const config = await loadConfig(kind);
        const pet = config.pets?.[0];
        if (!pet) return sendJson(res, 400, { ok: false, error: '缺少 pets[0]' });
        pet.display = body.visible ? 'desktop' : 'none';
        await saveConfig(kind, config);
        await refreshDesktopIfRunning();
        return sendJson(res, 200, { ok: true, display: pet.display });
      }
      if (req.method === 'POST' && path === 'character-config') {
        const body = await readBody(req);
        const kind = String(body.kind || '');
        if (!/^[a-z0-9_-]+$/i.test(kind)) return sendJson(res, 400, { ok: false, error: 'bad kind' });
        const config = await loadConfig(kind);
        const pet = config.pets?.[0];
        if (!pet) return sendJson(res, 400, { ok: false, error: '缺少 pets[0]' });
        if (typeof body.name === 'string' && body.name.trim()) pet.name = body.name.trim().slice(0, 40);
        if (Number.isFinite(Number(body.size))) pet.size = Math.max(80, Math.min(900, Number(body.size)));
        if (typeof body.corner === 'string') pet.position = { ...(pet.position || {}), corner: body.corner };
        if (Number.isFinite(Number(body.marginX))) pet.position = { ...(pet.position || {}), marginX: Number(body.marginX) };
        if (Number.isFinite(Number(body.marginY))) pet.position = { ...(pet.position || {}), marginY: Number(body.marginY) };
        await saveConfig(kind, config);
        await refreshDesktopIfRunning();
        return sendJson(res, 200, { ok: true });
      }
      if (req.method === 'POST' && path === 'load') {
        const body = await readBody(req);
        if (body.character && Array.isArray(body.actionIds)) {
          const map = { maid: 'main', gpt: 'aboutme-dragon', claude: 'aboutme-claude', gemini: 'aboutme-gemini' };
          body.kind = map[body.character] || body.kind;
          body.actions = body.actionIds;
        }
        const kind = String(body.kind || '');
        const names = Array.isArray(body.actions) ? body.actions : [];
        const catalog = await loadCatalog();
        const config = await loadConfig(kind);
        const done = [];
        const failed = [];
        for (const name of names) {
          const action = catalog.characters.flatMap((character) => character.actions).find((item) => item.name === name);
          if (!action) { failed.push(name + '：目录中不存在'); continue; }
          try {
            await downloadAction(ctx, action);
            addActionToConfig(config, action);
            done.push(name);
          } catch (error) {
            failed.push(name + '：' + (error instanceof Error ? error.message : String(error)));
          }
        }
        await saveConfig(kind, config);
        return sendJson(res, 200, { ok: true, loaded: done, converted: done.length, remote: 0, failed, reloaded: true });
      }
      if (req.method === 'POST' && path === 'unload') {
        const body = await readBody(req);
        const kind = String(body.kind || '');
        const names = Array.isArray(body.actions) ? body.actions : [];
        if (!/^[a-z0-9_-]+$/i.test(kind)) return sendJson(res, 400, { ok: false, error: 'bad kind' });
        const config = await loadConfig(kind);
        const animations = config.animations || {};
        const removeFrom = (list) => Array.isArray(list) ? list.filter((name) => !names.includes(name)) : list;
        for (const key of ['idle', 'turn', 'drag', 'clicks']) animations[key] = removeFrom(animations[key]);
        for (const category of Array.isArray(animations.categories) ? animations.categories : []) category.actions = removeFrom(category.actions) || [];
        for (const key of Object.keys(animations.events || {})) animations.events[key] = removeFrom(animations.events[key]);
        if (animations.moves && Array.isArray(animations.moves.actions)) animations.moves.actions = animations.moves.actions.filter((action) => action && !names.includes(action.name));
        await saveConfig(kind, config);
        return sendJson(res, 200, { ok: true, removed: names.length });
      }
      if (req.method === 'GET' && path === 'desktop/status') {
        return sendJson(res, 200, { ok: true, running: Boolean(desktopChild && desktopChild.exitCode === null), pid: desktopChild?.pid || null, mode: 'wpf-frames' });
      }
      if (req.method === 'POST' && path === 'desktop/stop') {
        stopDesktop();
        return sendJson(res, 200, { ok: true, running: false });
      }
      if (req.method === 'POST' && path === 'desktop/start') {
        const state = await launchDesktop('http://' + (req.headers.host || '127.0.0.1'));
        if (state.pets.length === 0) return sendJson(res, 500, { ok: false, error: '没有可转换的桌面动画（需要 ffmpeg）' });
        return sendJson(res, 200, { ok: true, running: true, pid: desktopChild?.pid || null, count: state.pets.length });
      }
      return sendText(res, 404, 'not found');
    } catch (error) {
      ctx.logger?.warn?.('[dsh-pamper] route failed: ' + (error instanceof Error ? error.message : String(error)));
      return sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  };

  ctx.effect(() => ctx.webServer.register({ kind: 'prefix', path: ROUTE, handler: (req, res) => void handle(req, res) }));
}
