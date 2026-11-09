/**
 * 抓取商店目录（aboutme-pets）：
 *   catalog/pets.json                     商店宠物目录
 *   catalog/pets/<pack>/manifest.json     基础动作清单
 *   catalog/pets/<pack>/actions.json      动作列表（分类、精灵图规格）
 *   catalog/pets/<pack>/avatar.webp       角色封面
 *   catalog/pets/<pack>/NOTICE.txt        素材来源与许可
 *
 * 下载优先走 jsDelivr CDN，失败回退 raw.githubusercontent；已存在且非空的文件默认跳过（--force 重下）。
 * 用法：node scripts/fetch-catalog.mjs [--force]
 */
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DIRS, isMain, LOCAL_STORE_ROOT, STORE, storeUrl } from './lib/paths.mjs';

const force = process.argv.includes('--force');

async function existsFile(path) {
  try {
    const s = await stat(path);
    return s.isFile() && s.size > 0;
  } catch {
    return false;
  }
}

async function fetchBuffer(url, { retries = 3 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'desktop-pet-builder/1.0' },
        redirect: 'follow',
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < retries) await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
  throw lastError;
}

/** 先查用户本地下载的 aboutme-pets（D:\PC\DSH\桌面宠物源代码\pet素材），再走网络。
 *  本地存在时整条构建链完全离线；不存在才回退 CDN/raw。 */
async function readLocalStoreFile(relPath) {
  try {
    return await readFile(join(LOCAL_STORE_ROOT, relPath));
  } catch {
    return undefined;
  }
}

/** 先本地后 CDN、再 raw；返回 { buffer, url } */
export async function fetchStoreFile(relPath) {
  const local = await readLocalStoreFile(relPath);
  if (local !== undefined) return { buffer: local, url: `local:${join(LOCAL_STORE_ROOT, relPath)}` };
  const errors = [];
  for (const base of [STORE.cdn, STORE.raw]) {
    const url = storeUrl(relPath, base);
    try {
      return { buffer: await fetchBuffer(url), url };
    } catch (error) {
      errors.push(`${url} -> ${error.message}`);
    }
  }
  throw new Error(`下载失败：${relPath}\n  ${errors.join('\n  ')}`);
}

async function downloadTo(relPath, destPath, label) {
  if (!force && (await existsFile(destPath))) {
    console.log(`  = ${label}（已缓存）`);
    return;
  }
  const { buffer, url } = await fetchStoreFile(relPath);
  await mkdir(join(destPath, '..'), { recursive: true });
  await writeFile(destPath, buffer);
  console.log(`  + ${label}  ${(buffer.length / 1024).toFixed(1)} KiB  <- ${url.replace(STORE.cdn, '')}`);
}

export async function fetchCatalog({ verbose = true } = {}) {
  await mkdir(DIRS.catalog, { recursive: true });
  const petsJsonPath = join(DIRS.catalog, 'pets.json');
  await downloadTo('pets.json', petsJsonPath, 'pets.json');
  const catalog = JSON.parse(await readFile(petsJsonPath, 'utf8'));
  if (!Array.isArray(catalog.pets)) throw new Error('pets.json 缺少 pets 数组');

  const packs = [];
  for (const pet of catalog.pets) {
    const packDir = join(DIRS.catalog, 'pets', pet.id.replace(/-pet$/, ''));
    if (verbose) console.log(`[${pet.id}] ${pet.name}`);
    await downloadTo(pet.manifest, join(packDir, 'manifest.json'), `${pet.id}/manifest.json`);
    await downloadTo(pet.actions, join(packDir, 'actions.json'), `${pet.id}/actions.json`);
    if (pet.cover) await downloadTo(pet.cover, join(packDir, 'avatar.webp'), `${pet.id}/avatar.webp`);
    // NOTICE.txt 只有部分包提供，缺失时重试会白等：不作为必需文件（许可说明见 README 与各包仓库）
    const actions = JSON.parse(await readFile(join(packDir, 'actions.json'), 'utf8'));
    packs.push({
      id: pet.id,
      name: pet.name,
      description: pet.description,
      cover: pet.cover,
      dir: packDir,
      actions: Array.isArray(actions.animations) ? actions.animations : [],
    });
  }
  return { catalog, packs };
}

if (isMain(import.meta.url)) {
  const { packs } = await fetchCatalog();
  console.log('\n目录已就绪：');
  for (const pack of packs) {
    const categories = [...new Set(pack.actions.map((a) => a.category).filter(Boolean))];
    console.log(`  ${pack.id.padEnd(10)} ${pack.name}  动作 ${String(pack.actions.length).padStart(3)}  分类 ${categories.length}  (${categories.join('、')})`);
  }
  console.log(`\n缓存在：${DIRS.catalog}`);
}
