/**
 * 轻量安装：从 GitHub Release 下载 pets-base.zip（8 个基础形象），解压到 dist 后调用 install.mjs。
 *
 * 用法：node scripts/install-lite.mjs
 * 发布者需要在 release-config.json 里填好 basePackUrl。
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const configPath = 'release-config.json';
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf8')) : {};
const basePackUrl = String(config.basePackUrl || '').trim();

async function download(url, dest) {
  console.log('[install-lite] 下载基础形象包：', url);
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error('下载失败 HTTP ' + response.status);
  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(join(dest, '..'), { recursive: true });
  await writeFile(dest, buffer);
  console.log('[install-lite] 已下载', (buffer.length / 1024 / 1024).toFixed(1), 'MiB');
}

async function expand(zipPath, outDir) {
  await mkdir(outDir, { recursive: true });
  const result = spawnSync('powershell.exe', ['-NoProfile', '-Command', `Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${outDir}' -Force`], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('解压失败：请手动解压 pets-base.zip 到项目根目录（得到 dist/）');
}

if (!existsSync('dist/pet')) {
  if (!basePackUrl) {
    console.error('[install-lite] 没有 dist/pet，且 release-config.json 的 basePackUrl 为空。');
    console.error('  发布者请先上传 pets-base.zip 到 GitHub Release，并把下载直链填入 release-config.json；');
    console.error('  或手动下载 pets-base.zip 解压到项目根目录（得到 dist/）后重跑。');
    process.exit(1);
  }
  await download(basePackUrl, '.tmp-pets-base.zip');
  await expand('.tmp-pets-base.zip', '.');
  await rm('.tmp-pets-base.zip', { force: true });
}

console.log('[install-lite] 安装基础形象到 DSH-pet …');
const result = spawnSync(process.execPath, ['scripts/install.mjs'], { stdio: 'inherit' });
process.exit(result.status ?? 1);
