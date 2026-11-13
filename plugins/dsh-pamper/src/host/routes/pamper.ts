/**
 * 宠爱页兼容路由：动作库目录、预览视频、基础形象包安装。
 * @module dsh-pet/src/host/routes/pamper
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PACKAGE_ROOT } from '../paths.ts';
import type { PetRouteDeps, RouteInput } from './types.ts';
import type { RouteResult } from '../http.ts';

const catalogFile = join(PACKAGE_ROOT, 'assets', 'action-store.json');
const webmDir = join(PACKAGE_ROOT, 'assets', 'webm');
const BASE_PACK_URL = 'https://github.com/Ai-nice/dsh-pamper/releases/download/v1.0.0/pets-base-v2.zip';

function pamperHome(): string {
  const home = process.env.DSH_HOME || join(process.env.USERPROFILE || process.env.HOME || '', '.dsh');
  return join(home, 'pamper');
}

let installPromise: Promise<number> | null = null;

function statusFile(): string {
  return join(pamperHome(), 'install-status.json');
}

function writeInstallStatus(value: Record<string, unknown>): void {
  try {
    mkdirSync(pamperHome(), { recursive: true });
    writeFileSync(statusFile(), JSON.stringify(value, null, 2) + '\n');
  } catch {}
}

function readInstallStatus(): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(statusFile(), 'utf8')) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function countPacks(): number {
  const dir = join(pamperHome(), 'pet');
  try {
    return readdirSync(dir).filter((name) => name.endsWith('-config.json')).length;
  } catch {
    return 0;
  }
}

async function installBasePack(): Promise<number> {
  if (countPacks() >= 2) return countPacks();
  const home = pamperHome();
  const zipPath = join(home, 'base-pack.zip');
  mkdirSync(home, { recursive: true });
  if (!existsSync(zipPath)) {
    const response = await fetch(BASE_PACK_URL, { signal: AbortSignal.timeout(600000) });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 1024 * 1024) throw new Error('base pack too small');
    writeFileSync(zipPath, buffer);
  }
  const temp = join(home, '.base-extract');
  rmSync(temp, { recursive: true, force: true });
  mkdirSync(temp, { recursive: true });
  const tar = spawnSync('tar', ['-xf', zipPath, '-C', temp], { windowsHide: true });
  if (tar.status !== 0) throw new Error('extract failed: ' + String(tar.stderr || ''));
  const source = join(temp, 'pets');
  if (!existsSync(source)) throw new Error('base pack missing pets/');
  const petDir = join(home, 'pet');
  mkdirSync(petDir, { recursive: true });
  for (const name of readdirSync(source)) {
    const from = join(source, name);
    if (name === 'main-config.json') {
      cpSync(from, join(home, 'main-config.jsonc'), { force: true });
      continue;
    }
    if (name === 'main-animation') {
      cpSync(from, join(home, 'main-animation'), { recursive: true, force: false, errorOnExist: false });
      continue;
    }
    if (name === 'main-avatar.png') {
      cpSync(from, join(home, 'main-avatar.png'), { force: true });
      continue;
    }
    cpSync(from, join(petDir, name), { recursive: true, force: false, errorOnExist: false });
    if (name.endsWith('-config.json')) {
      try {
        const target = join(petDir, name);
        const config = JSON.parse(readFileSync(target, 'utf8')) as { pets?: Array<Record<string, unknown>> };
        if (Array.isArray(config.pets)) {
          for (const pet of config.pets) pet.display = 'desktop';
          writeFileSync(target, JSON.stringify(config, null, 2) + '\n');
        }
      } catch {}
    }
  }
  rmSync(temp, { recursive: true, force: true });
  return countPacks();
}

function startBasePack(): void {
  if (installPromise) return;
  writeInstallStatus({ installing: true, startedAt: Date.now(), error: null });
  installPromise = installBasePack()
    .then((characters) => {
      writeInstallStatus({ installing: false, finishedAt: Date.now(), error: null, characters });
      return characters;
    })
    .catch((error: unknown) => {
      writeInstallStatus({
        installing: false,
        finishedAt: Date.now(),
        error: error instanceof Error ? error.message : String(error),
        characters: countPacks(),
      });
      throw error;
    })
    .finally(() => {
      installPromise = null;
    });
  void installPromise.catch(() => {});
}

function findAction(pack: string, name: string): { webm?: string } | undefined {
  try {
    const catalog = JSON.parse(readFileSync(catalogFile, 'utf8')) as {
      characters: Array<{ actions: Array<{ name?: string; pack?: string; webm?: string }> }>;
    };
    return catalog.characters
      .flatMap((character) => character.actions)
      .find((action) => action.name === name && action.pack === pack);
  } catch {
    return undefined;
  }
}

export async function handlePamperRoutes(
  _deps: PetRouteDeps,
  input: RouteInput,
): Promise<RouteResult | undefined> {
  const { rest, url, method } = input;

  if (rest === 'install-status' && method === 'GET') {
    return {
      kind: 'json',
      status: 200,
      obj: { ok: true, ...readInstallStatus(), installing: installPromise !== null, characters: countPacks() },
    };
  }

  if (rest === 'install-base' && method === 'POST') {
    startBasePack();
    return { kind: 'json', status: 200, obj: { ok: true, installing: true, characters: countPacks() } };
  }

  if (rest === 'catalog' && method === 'GET') {
    try {
      return { kind: 'json', status: 200, obj: JSON.parse(readFileSync(catalogFile, 'utf8')) };
    } catch {
      return { kind: 'json', status: 500, obj: { error: 'catalog missing' } };
    }
  }

  if (rest === 'load' && method === 'POST') {
    let payload: { character?: unknown; actionIds?: unknown } = {};
    try {
      payload = JSON.parse(input.body ?? '{}') as typeof payload;
    } catch {
      return { kind: 'json', status: 200, obj: { ok: false, error: 'invalid json' } };
    }
    const ids = Array.isArray(payload.actionIds) ? payload.actionIds : [];
    return { kind: 'json', status: 200, obj: { ok: true, converted: 0, failed: [], selected: ids.length } };
  }

  if (rest === 'thumb' && method === 'GET') {
    return { kind: 'json', status: 404, obj: { ok: false } };
  }

  if (rest === 'preview' && method === 'GET') {
    const pack = (url.searchParams.get('pack') ?? '').trim();
    const name = (url.searchParams.get('name') ?? '').trim();
    if (name === '' || name.includes('/') || name.includes('\\')) {
      return { kind: 'json', status: 400, obj: { ok: false } };
    }
    const action = findAction(pack, name);
    const candidates: string[] = [];
    if (action?.webm) candidates.push(join(pamperHome(), 'webm-store', action.webm));
    candidates.push(join(pamperHome(), 'webm-store', 'pets', pack, name + '.webm'));
    candidates.push(join(webmDir, name + '.webm'));
    const file = candidates.find((candidate) => existsSync(candidate));
    if (!file) return { kind: 'json', status: 404, obj: { ok: false } };
    return { kind: 'file', file, contentType: 'video/webm' };
  }

  return undefined;
}
