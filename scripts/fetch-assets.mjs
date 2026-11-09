/**
 * 下载被选中的精灵图（webp + 同名 json 元数据）到本地缓存：
 *   assets/spritesheet-cache/<商店包>/<动作>.webp
 *   assets/spritesheet-cache/<商店包>/<动作>.json
 *
 * 只下载「会被打包进 pet pack 的动作」，不会把整个商店搬下来。
 * 用法：node scripts/fetch-assets.mjs [--all] [--force] [--jobs=4]
 */
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CHARACTERS, PREVIEW_ONLY_CHARACTERS } from '../config/characters.mjs';
import { fetchStoreFile } from './fetch-catalog.mjs';
import { DIRS, isMain } from './lib/paths.mjs';
import { loadCatalog, selectAll } from './lib/select.mjs';

const args = process.argv.slice(2);
const hasFlag = (name) => args.includes(name);
const getOption = (name, fallback) => {
  const hit = args.find((arg) => arg.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const value = Number(hit.split('=')[1]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export function parseFetchArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    if (!hit) return fallback;
    const value = Number(hit.split('=')[1]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  return { all: has('--all'), force: has('--force'), jobs: opt('jobs', 4) };
}

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

/** 简单并发池：runner 返回 Promise；results 保序 */
export async function mapLimit(items, limit, runner) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await runner(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

/** 去重后的下载清单 */
export async function planDownloads({ all = false } = {}) {
  const catalog = await loadCatalog();
  // 预览页要展示 DSH-pet 自带的小女仆，但它的精灵图只在浏览器里远程加载，不需要下载
  const selected = selectAll({ characters: CHARACTERS, previewOnly: [] }, catalog, { all });
  const items = [];
  const seen = new Set();
  for (const result of selected.characters) {
    for (const file of result.files) {
      const key = `${file.storeKey}/${file.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const storeKey = file.storeKey;
      const webpRel = file.sourceWebp ?? `spritesheet/${file.id}.webp`;
      const jsonRel = webpRel.replace(/\.webp$/i, '.json');
      const cacheDir = join(DIRS.spritesheetCache, storeKey);
      items.push({
        kind: result.character.kind,
        storeKey,
        id: file.id,
        category: file.category,
        role: file.role,
        spritesheet: file.spritesheet,
        webp: { rel: `pets/${storeKey}/${webpRel}`, cache: join(cacheDir, `${file.id}.webp`) },
        json: { rel: `pets/${storeKey}/${jsonRel}`, cache: join(cacheDir, `${file.id}.json`) }
      });
    }
  }
  return { catalog, selected, items };
}

export async function downloadAssets({ all = false, force = false, jobs = 4 } = {}) {
  const { items } = await planDownloads({ all });
  await mkdir(DIRS.spritesheetCache, { recursive: true });
  let done = 0;
  let downloaded = 0;
  let skipped = 0;
  const failures = [];
  await mapLimit(items, jobs, async (item) => {
    for (const [label, file] of [
      ['webp', item.webp],
      ['json', item.json]
    ]) {
      try {
        if (!force && (await isFile(file.cache))) {
          skipped += 1;
          continue;
        }
        await mkdir(join(file.cache, '..'), { recursive: true });
        const { buffer } = await fetchStoreFile(file.rel);
        await writeFile(file.cache, buffer);
        downloaded += 1;
      } catch (error) {
        failures.push({ id: item.id, storeKey: item.storeKey, label, message: error.message });
      }
    }
    done += 1;
    if (done % 10 === 0 || done === items.length) {
      process.stdout.write(`  下载进度 ${done}/${items.length}（新下载 ${downloaded} 文件，复用 ${skipped}）\n`);
    }
  });
  if (failures.length > 0) {
    console.error(`\n${failures.length} 个文件下载失败：`);
    for (const failure of failures.slice(0, 20)) console.error(`  - ${failure.storeKey}/${failure.id} (${failure.label}) ${failure.message.split('\n')[0]}`);
    throw new Error('精灵图下载未完成，请重试（已下载的文件会复用）');
  }
  return { items, downloaded, skipped };
}

if (isMain(import.meta.url)) {
  const options = parseFetchArgs();
  if (args.includes('--help')) {
    console.log(`用法：node scripts/fetch-assets.mjs [--all] [--force] [--jobs=4]

  下载 pet pack 用到的 aboutme-pets 精灵图（webp + json）到
  assets/spritesheet-cache/<商店包>/，已存在的文件会跳过。
  --all        不按每个形象的动作上限截断（体积/耗时更大）
  --force      已缓存的文件也重新下载
  --jobs=N     并发下载数（默认 4）`);
    process.exit(0);
  }
  console.log(`[fetch-assets] 并发 ${options.jobs}，--all=${options.all}，--force=${options.force}`);
  const startedAt = Date.now();
  const result = await downloadAssets(options);
  console.log(
    `[fetch-assets] 完成：${result.items.length} 个动作，新下载 ${result.downloaded} 文件，复用 ${result.skipped}，耗时 ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  );
}
