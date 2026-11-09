/**
 * 生成 GitHub 发布产物：轻量仓库 zip、pets-base.zip、各动作包 WebM zip。
 * 用法：node scripts/pack-release.mjs
 */
import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';

const root = process.cwd();
const release = join(root, 'release');
const liteDir = join(release, 'lite');
const liteZip = join(release, 'desktop-pet-lite.zip');
const baseZip = join(release, 'pets-base.zip');
const skipRoots = new Set(['.git', 'node_modules', '.build-tmp', 'release', 'dist', 'webm-store']);
const skipPaths = new Set(['assets/pet-store', 'assets/spritesheet-cache']);

async function zip(out, cwd, entries) {
  await mkdir(dirname(out), { recursive: true });
  const result = spawnSync('tar', ['-a', '-c', '-f', out, '-C', cwd, ...entries], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('tar 打包失败：' + out);
}

async function copyTree(src, dest, relBase) {
  const rel = relative(relBase, src);
  if (rel) {
    const parts = rel.split(sep);
    if (skipRoots.has(parts[0])) return;
    if (skipPaths.has(parts.slice(0, 2).join('/'))) return;
  }
  const info = await stat(src);
  if (info.isDirectory()) {
    await mkdir(dest, { recursive: true });
    for (const entry of await readdir(src)) {
      await copyTree(join(src, entry), join(dest, entry), relBase);
    }
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(src, dest);
}

await rm(release, { recursive: true, force: true });
await mkdir(liteDir, { recursive: true });
console.log('[pack-release] 复制轻量仓库…');
for (const entry of await readdir(root)) {
  await copyTree(join(root, entry), join(liteDir, entry), root);
}

console.log('[pack-release] 打包 desktop-pet-lite.zip…');
await zip(liteZip, liteDir, ['.']);

if (await stat(join(root, 'dist')).then(() => true).catch(() => false)) {
  console.log('[pack-release] 打包 pets-base.zip…');
  await zip(baseZip, root, ['dist']);
} else {
  console.warn('[pack-release] 没有 dist/，跳过 pets-base.zip');
}

const actionsZips = [];
const packsDir = join(root, 'webm-store', 'pets');
if (await stat(packsDir).then(() => true).catch(() => false)) {
  console.log('[pack-release] 打包动作包 WebM（可选）…');
  for (const entry of await readdir(packsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const out = join(release, 'actions-webm-' + entry.name + '.zip');
    await zip(out, join(root, 'webm-store'), [join('pets', entry.name)]);
    const info = await stat(out);
    actionsZips.push({ name: 'actions-webm-' + entry.name + '.zip', sizeMiB: Math.round(info.size / 1024 / 1024 * 10) / 10 });
    console.log('  -', entry.name, actionsZips[actionsZips.length - 1].sizeMiB, 'MiB');
  }
}

const liteInfo = await stat(liteZip);
let baseSizeMiB = null;
try {
  baseSizeMiB = Math.round((await stat(baseZip)).size / 1024 / 1024 * 10) / 10;
} catch {}
const manifest = {
  generatedAt: new Date().toISOString(),
  liteSizeMiB: Math.round(liteInfo.size / 1024 / 1024 * 10) / 10,
  basePackSizeMiB: baseSizeMiB,
  actionsZips
};
await writeFile(join(release, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('[pack-release] 完成：', JSON.stringify(manifest, null, 2));
