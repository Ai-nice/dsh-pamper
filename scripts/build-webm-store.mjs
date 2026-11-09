/**
 * 一次性地把完整动作库转成预转换 WebM（用于上传到自己的 GitHub 仓库/Release）。
 *
 * 输出：webm-store/pets/<pack>/<action>.webm（路径与 catalog 的 action.webm 一致）
 * 复用：dist/pet/<kind>-animation 中已存在的同名 WebM；以及 dsh-pet 包内置 assets/webm。
 *
 * 用法：node scripts/build-webm-store.mjs [--jobs=8] [--limit=N] [--force]
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const STORE_ROOT = 'D:/PC/DSH/桌面宠物源代码/pet素材';
const CATALOG = 'catalog/action-store.json';
const OUT_DIR = 'webm-store';
const DIST_DIR = 'dist/pet';
const DSH_PET_PKG = process.env.DSH_PROFILE_DIR ? join(process.env.DSH_PROFILE_DIR, 'node_modules', 'dsh-pet') : '';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const v = Number(hit.split('=')[1]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
};
const JOBS = opt('jobs', 8);
const LIMIT = opt('limit', 0);
const FORCE = args.includes('--force');

const KIND_OF_PACK = {
  gpt: 'aboutme-dragon',
  gpt1: 'aboutme-dragon',
  claude: 'aboutme-claude',
  gemini: 'aboutme-gemini'
};

const catalog = JSON.parse(await readFile(CATALOG, 'utf8'));
const jobs = [];
const seen = new Set();
for (const character of catalog.characters) {
  for (const action of character.actions) {
    if (seen.has(action.webm)) continue;
    seen.add(action.webm);
    jobs.push(action);
  }
}
const limited = LIMIT > 0 ? jobs.slice(0, LIMIT) : jobs;
console.log(`[webm-store] 任务 ${limited.length}/${jobs.length}，并发 ${JOBS}，输出 ${OUT_DIR}`);

const distCache = new Map();
if (existsSync(DIST_DIR)) {
  const { readdir } = await import('node:fs/promises');
  for (const entry of await readdir(DIST_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.endsWith('-animation')) continue;
    const kind = entry.name.slice(0, -'-animation'.length);
    for (const file of await readdir(join(DIST_DIR, entry.name))) {
      if (file.endsWith('.webm')) distCache.set(kind + '/' + file.slice(0, -5), join(DIST_DIR, entry.name, file));
    }
  }
}
const builtinCache = new Map();
if (DSH_PET_PKG) {
  const builtinDir = join(DSH_PET_PKG, 'assets', 'webm');
  if (existsSync(builtinDir)) {
    const { readdir } = await import('node:fs/promises');
    for (const file of await readdir(builtinDir)) {
      if (file.endsWith('.webm')) builtinCache.set(file.slice(0, -5), join(builtinDir, file));
    }
  }
}

function ffmpegArgs(webpPath, outPath, action) {
  const frameWidth = Math.max(1, Number(action.frameWidth) || 640);
  const frameHeight = Math.max(1, Number(action.frameHeight) || 360);
  const columns = Math.max(1, Number(action.columns) || 1);
  const frameCount = Math.max(1, Number(action.frameCount) || 1);
  const fps = Number(action.fps) || 12;
  const vf = `crop=${frameWidth}:${frameHeight}:x='mod(n\\,${columns})*${frameWidth}':y='floor(n/${columns})*${frameHeight}',format=yuva420p`;
  return ['-hide_banner', '-nostdin', '-y', '-v', 'error', '-loop', '1', '-framerate', String(fps), '-i', webpPath, '-frames:v', String(frameCount), '-vf', vf, '-fps_mode', 'passthrough', '-c:v', 'libvpx-vp9', '-auto-alt-ref', '0', '-pix_fmt', 'yuva420p', '-row-mt', '1', '-tile-columns', '2', '-cpu-used', '5', '-deadline', 'good', '-b:v', '0', '-crf', '26', '-metadata:s:v:0', 'alpha_mode=1', outPath];
}

async function runFfmpeg(cmdArgs) {
  return await new Promise((resolve) => {
    const child = spawn('ffmpeg', cmdArgs, { stdio: 'ignore', windowsHide: true });
    child.on('error', () => resolve(false));
    child.on('close', (code) => resolve(code === 0));
  });
}

let done = 0;
let converted = 0;
let copied = 0;
let skipped = 0;
const failures = [];
async function worker() {
  for (;;) {
    const action = limited.shift();
    if (!action) return;
    const outPath = join(OUT_DIR, action.webm);
    try {
      if (!FORCE && existsSync(outPath)) {
        skipped += 1;
      } else {
        await mkdir(dirname(outPath), { recursive: true });
        const kind = KIND_OF_PACK[action.pack];
        const candidate = kind ? distCache.get(kind + '/' + action.name) : undefined;
        const builtin = builtinCache.get(action.name);
        if (candidate) {
          await copyFile(candidate, outPath);
          copied += 1;
        } else if (builtin && (action.pack === 'dsh' || action.pack === 'dsh1')) {
          await copyFile(builtin, outPath);
          copied += 1;
        } else {
          const webpPath = join(STORE_ROOT, action.spritesheet);
          if (!existsSync(webpPath)) throw new Error('缺少精灵图：' + action.spritesheet);
          let ok = false;
          let lastError = null;
          for (let attempt = 1; attempt <= 5 && !ok; attempt += 1) {
            ok = await runFfmpeg(ffmpegArgs(webpPath, outPath, action));
            if (!ok) {
              lastError = 'ffmpeg 退出非 0（第 ' + attempt + '/5 次）';
              if (attempt < 5) await new Promise((r) => setTimeout(r, 1200 * attempt));
            }
          }
          if (!ok) throw new Error('重试 5 次仍失败：' + lastError);
          converted += 1;
        }
      }
    } catch (error) {
      const message = action.pack + '/' + action.name + '：' + error.message;
      failures.push(message);
      console.warn('[webm-store] 失败（已重试 5 次）：' + message);
      try {
        await writeFile(join(OUT_DIR, 'failures.json'), JSON.stringify({ generatedAt: new Date().toISOString(), failures }, null, 2));
      } catch {}
    }
    done += 1;
    if (done % 25 === 0 || done === limited.length) console.log(`[webm-store] ${done} 完成（新转 ${converted}，复用 ${copied}，跳过 ${skipped}，失败 ${failures.length}）`);
  }
}

await Promise.all(Array.from({ length: JOBS }, () => worker()));

// 写一个简单的发布清单
const manifest = { generatedAt: new Date().toISOString(), total: jobs.length, actions: [] };
for (const action of jobs) {
  const path = join(OUT_DIR, action.webm);
  try {
    const info = await stat(path);
    manifest.actions.push({ pack: action.pack, name: action.name, webm: action.webm, bytes: info.size });
  } catch {}
}
await mkdir(OUT_DIR, { recursive: true });
await writeFile(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
await writeFile(join(OUT_DIR, 'failures.json'), JSON.stringify({ generatedAt: new Date().toISOString(), failures }, null, 2));
const totalBytes = manifest.actions.reduce((s, a) => s + a.bytes, 0);
console.log(`[webm-store] 完成：${manifest.actions.length} 个，合计 ${(totalBytes / 1024 / 1024).toFixed(1)} MiB，新转 ${converted}，复用 ${copied}，失败 ${failures.length}`);
if (failures.length) {
  console.log('失败示例：');
  for (const f of failures.slice(0, 10)) console.log(' -', f);
  process.exitCode = 1;
}
