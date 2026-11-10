/**
 * dsh-pamper：完全独立的桌宠插件。
 *
 * 不读取、不修改 dsh-pet 的任何文件；自己的数据放在 %DSH_HOME%/pamper。
 * 基础动作从 jsDelivr 按需下载（预转换透明 WebM），无需 ffmpeg。
 */
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROUTE = '/dsh-pamper-7463';
const CATALOG_PATH = fileURLToPath(new URL('./catalog/action-store.json', import.meta.url));
const CHARACTERS = [
  { key: 'maid', name: '大肥鱼' },
  { key: 'gpt', name: '白龙娘' },
  { key: 'claude', name: '橙发书娘' },
  { key: 'gemini', name: '紫发猫耳娘' }
];
const ASSET_BASE = 'https://cdn.jsdelivr.net/gh/Ai-nice/pamper-assets@main';
const PACKS_OF = { maid: ['dsh', 'dsh1'], gpt: ['gpt', 'gpt1'], claude: ['claude'], gemini: ['gemini'] };
const characterKeyOfPack = (pack) => Object.entries(PACKS_OF).find(([, packs]) => packs.includes(pack))?.[0] || pack;

export const name = 'dsh-pamper';
export const inject = ['webServer'];

const dshHome = () => process.env.DSH_HOME || join(homedir(), '.dsh');
const dataRoot = () => join(dshHome(), 'pamper');
const statePath = () => join(dataRoot(), 'state.json');

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}
function sendText(res, status, text) {
  res.statusCode = status;
  res.setHeader('content-type', 'text/plain; charset=utf-8');
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
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
function defaultState() {
  const characters = {};
  for (const character of CHARACTERS) characters[character.key] = { visible: character.key === 'maid', loaded: [] };
  return { schemaVersion: 1, characters };
}

  // 独立版：只清理旧版本（<=0.1.1）给 dsh-pet 打过的补丁，恢复 dsh-pet 原状；不再修改它。
  const cleanupLegacyDshPetPatch = (ctx) => {
    try {
      const profileDir = process.env.DSH_PROFILE_DIR || '';
      const dshPetDir = profileDir ? join(profileDir, 'node_modules', 'dsh-pet') : '';
      if (!dshPetDir) return;
      const clientFile = join(dshPetDir, 'lib', 'client.js');
      if (!existsSync(clientFile)) return;
      const source = readFileSync(clientFile, 'utf8');
      if (!source.includes('pet-love')) return;
      const script = fileURLToPath(new URL('./cleanup/patch-dsh-pet.mjs', import.meta.url));
      const result = spawnSync(process.execPath, [script, '--package=' + dshPetDir, '--revert'], { stdio: 'ignore', windowsHide: true });
      ctx.logger?.info?.('[dsh-pamper] 已清理旧版 dsh-pet 补丁：' + (result.status === 0 ? '成功（刷新页面后旧宠爱菜单消失）' : '失败'));
    } catch (error) {
      ctx.logger?.warn?.('[dsh-pamper] 清理旧 dsh-pet 补丁失败：' + (error instanceof Error ? error.message : String(error)));
    }
  };

export function apply(ctx) {
  // 独立版与旧版宠爱页面共存：不再自动回滚 dsh-pet 补丁。
  let catalogPromise = null;
  const loadCatalog = async () => {
    if (!catalogPromise) catalogPromise = readFile(CATALOG_PATH, 'utf8').then(JSON.parse);
    return await catalogPromise;
  };
  const characterOf = (catalog, key) => catalog.characters.find((item) => item.key === key);
  const packDir = (key) => join(dataRoot(), 'packs', key);
  const webmPath = (key, actionName) => join(packDir(key), actionName + '.webm');

  const loadState = async () => {
    try {
      const state = JSON.parse(await readFile(statePath(), 'utf8'));
      state.characters = state.characters || {};
      for (const character of CHARACTERS) {
        if (!state.characters[character.key]) state.characters[character.key] = { visible: character.key === 'maid', loaded: [] };
        if (!Array.isArray(state.characters[character.key].loaded)) state.characters[character.key].loaded = [];
      }
      return state;
    } catch {
      return defaultState();
    }
  };
  const saveState = async (state) => {
    await mkdir(dataRoot(), { recursive: true });
    await writeFile(statePath(), JSON.stringify(state, null, 2) + '\n');
  };

  const findAction = (catalog, characterKey, actionName) => {
    const character = characterOf(catalog, characterKey);
    return character?.actions.find((action) => action.name === actionName);
  };
  const pickBaseAction = (catalog, characterKey) => {
    const character = characterOf(catalog, characterKey);
    if (!character || character.actions.length === 0) return null;
    return character.actions.find((action) => action.category === '待机') || character.actions[0];
  };

  const downloadAction = async (action) => {
    if (!action?.webm) throw new Error('动作缺少 webm 路径');
    const target = webmPath(characterKeyOfPack(action.pack), action.name);
    if (await isFile(target)) return target;
    const url = ASSET_BASE + '/' + String(action.webm).split('/').map(encodeURIComponent).join('/');
    let lastError = null;
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.length < 1024) throw new Error('文件过小');
        await mkdir(join(target, '..'), { recursive: true });
        await writeFile(target, buffer);
        return target;
      } catch (error) {
        lastError = error;
        if (attempt < 5) await new Promise((resolveDelay) => setTimeout(resolveDelay, 500 * attempt));
      }
    }
    throw new Error('下载失败：' + (lastError?.message || url));
  };

  const ensureBaseAction = async (catalog, characterKey) => {
    const base = pickBaseAction(catalog, characterKey);
    if (!base) return null;
    await downloadAction({ ...base, pack: base.pack });
    return base.name;
  };

  const handle = async (req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const path = decodeURIComponent(url.pathname.slice(ROUTE.length)).replace(/^\/+/, '');
    try {
      if (req.method === 'GET' && path === 'catalog') {
        const catalog = await loadCatalog();
        return sendJson(res, 200, catalog);
      }
      if (req.method === 'GET' && path === 'characters') {
        const catalog = await loadCatalog();
        const state = await loadState();
        const list = [];
        for (const character of CHARACTERS) {
          const conf = characterOf(catalog, character.key);
          const own = state.characters[character.key];
          if (own.visible && own.loaded.length === 0) {
            try {
              const base = await ensureBaseAction(catalog, character.key);
              if (base) own.loaded.push(base);
            } catch (error) {
              ctx.logger?.warn?.('[dsh-pamper] 基础动作下载失败：' + (error instanceof Error ? error.message : String(error)));
            }
          }
          const loaded = own.loaded.slice();
          list.push({
            key: character.key,
            name: character.name,
            actionCount: conf?.actions.length || 0,
            visible: Boolean(own.visible),
            loaded,
            idle: loaded[0] || null,
            thumb: conf?.actions?.[0]?.thumb || ''
          });
        }
        await saveState(state);
        return sendJson(res, 200, { characters: list, dataRoot: dataRoot() });
      }
      if (req.method === 'GET' && path === 'asset') {
        const kind = url.searchParams.get('kind') || '';
        const actionName = url.searchParams.get('action') || '';
        const catalog = await loadCatalog();
        const allowed = PACKS_OF[kind] || [kind];
        const action = catalog.characters.flatMap((character) => character.actions).find((item) => item.name === actionName && allowed.includes(item.pack));
        if (!action) return sendText(res, 404, 'action not found');
        const file = await downloadAction(action);
        const buffer = await readFile(file);
        res.statusCode = 200;
        res.setHeader('content-type', 'video/webm');
        res.setHeader('cache-control', 'public, max-age=3600');
        return res.end(buffer);
      }
      if (req.method === 'POST' && path === 'toggle') {
        const body = await readBody(req);
        const key = String(body.key || '');
        if (!CHARACTERS.some((item) => item.key === key)) return sendJson(res, 400, { ok: false, error: '未知角色' });
        const catalog = await loadCatalog();
        const state = await loadState();
        const own = state.characters[key];
        own.visible = Boolean(body.visible);
        if (own.visible && own.loaded.length === 0) {
          const base = await ensureBaseAction(catalog, key);
          if (base) own.loaded.push(base);
        }
        await saveState(state);
        return sendJson(res, 200, { ok: true, visible: own.visible, loaded: own.loaded });
      }
      if (req.method === 'POST' && path === 'load') {
        const body = await readBody(req);
        const key = String(body.key || '');
        const names = Array.isArray(body.actions) ? body.actions : [];
        const catalog = await loadCatalog();
        const state = await loadState();
        const own = state.characters[key];
        if (!own) return sendJson(res, 400, { ok: false, error: '未知角色' });
        const done = [];
        const failed = [];
        for (const name of names) {
          const action = findAction(catalog, key, name);
          if (!action) {
            failed.push(name + '：动作不存在');
            continue;
          }
          try {
            await downloadAction(action);
            if (!own.loaded.includes(name)) own.loaded.push(name);
            done.push(name);
          } catch (error) {
            failed.push(name + '：' + (error instanceof Error ? error.message : String(error)));
          }
        }
        await saveState(state);
        return sendJson(res, 200, { ok: true, loaded: done, failed });
      }
      return sendText(res, 404, 'not found');
    } catch (error) {
      ctx.logger?.warn?.('[dsh-pamper] route failed: ' + (error instanceof Error ? error.message : String(error)));
      return sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  };

  ctx.effect(() => ctx.webServer.register({ kind: 'prefix', path: ROUTE, handler: (req, res) => void handle(req, res) }));
}
