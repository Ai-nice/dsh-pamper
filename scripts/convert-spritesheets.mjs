/**
 * 精灵图 → 透明 WebM：把 assets/spritesheet-cache/ 里的
 * <动作>.webp + <动作>.json（640×360 网格拼贴）逐帧裁出来，
 * 用 ffmpeg/libvpx-vp9 重新编码成 DSH-pet 能播放的透明视频：
 *   dist/pet/<kind>-animation/<动作>.webm
 *
 * 编码参数与 aboutme-pets 仓库的 spritesheet_to_video_pet.py 一致
 * （yuva420p + alpha_mode=1，CRF 20，12fps 原样帧率），这样和
 * DSH-pet 自带素材的播放行为一致。
 *
 * 用法：node scripts/convert-spritesheets.mjs [--all] [--force] [--crf=20] [--jobs=4]
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CHARACTERS } from '../config/characters.mjs';
import { DIRS, isMain } from './lib/paths.mjs';
import { mapLimit, planDownloads } from './fetch-assets.mjs';

export function parseConvertArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    if (!hit) return fallback;
    const value = Number(hit.split('=')[1]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  return { all: has('--all'), force: has('--force'), crf: opt('crf', 20), jobs: opt('jobs', 4) };
}

export function findFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore', windowsHide: true });
  if (probe.error || probe.status !== 0) {
    throw new Error('找不到 ffmpeg：请先安装 ffmpeg 并加入 PATH（Windows: winget install Gyan.FFmpeg）');
  }
  return 'ffmpeg';
}

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

/** 跑一次 ffmpeg；返回 {ok, stderr}。stderr 写临时文件，避免管道（沙箱下子进程管道可能被拒）。 */
async function runFfmpeg(ffmpeg, args) {
  return await new Promise((resolve) => {
    const child = spawn(ffmpeg, args, { stdio: 'ignore', windowsHide: true });
    child.on('error', (error) => resolve({ ok: false, stderr: String(error) }));
    child.on('close', (code) => resolve({ ok: code === 0, code }));
  });
}

export function buildFfmpegArgs({ webpPath, outPath, meta, crf, withAlphaMode }) {
  const frameWidth = Number(meta.FrameWidth);
  const frameHeight = Number(meta.FrameHeight);
  const columns = Number(meta.Columns);
  const frameCount = Number(meta.FrameCount);
  const fps = Number(meta.SampleFps) || 12;
  if (!(frameWidth > 0 && frameHeight > 0 && columns > 0 && frameCount > 0)) {
    throw new Error(`精灵图元数据非法：${webpPath}`);
  }
  const vf = `crop=${frameWidth}:${frameHeight}:x='mod(n\\,${columns})*${frameWidth}':y='floor(n/${columns})*${frameHeight}',format=yuva420p`;
  const args = [
    '-hide_banner',
    '-nostdin',
    '-y',
    '-v',
    'error',
    '-loop',
    '1',
    '-framerate',
    String(fps),
    '-i',
    webpPath,
    '-frames:v',
    String(frameCount),
    '-vf',
    vf,
    '-fps_mode',
    'passthrough',
    '-c:v',
    'libvpx-vp9',
    '-auto-alt-ref',
    '0',
    '-pix_fmt',
    'yuva420p',
    '-row-mt',
    '1',
    '-b:v',
    '0',
    '-crf',
    String(crf)
  ];
  if (withAlphaMode) args.push('-alpha_mode', '1');
  args.push('-metadata:s:v:0', 'alpha_mode=1', outPath);
  return { args, meta: { frameWidth, frameHeight, columns, frameCount, fps } };
}

/** 生成转换任务清单 */
export async function planConversions({ all = false } = {}) {
  const { items } = await planDownloads({ all });
  const tasks = [];
  const seen = new Set();
  for (const item of items) {
    const outDir = join(DIRS.distPets, `${item.kind}-animation`);
    const key = `${item.kind}/${item.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    tasks.push({
      ...item,
      outDir,
      outPath: join(outDir, `${item.id}.webm`),
      metaPath: item.json.cache
    });
  }
  return { tasks };
}

export async function convertSpritesheets({ all = false, force = false, crf = 20, jobs = 4 } = {}) {
  const ffmpeg = findFfmpeg();
  const { tasks } = await planConversions({ all });
  await mkdir(DIRS.distPets, { recursive: true });
  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let done = 0;
  const failures = [];
  const totalBytes = { webm: 0 };

  await mapLimit(tasks, jobs, async (task) => {
    done += 1;
    if ((await isFile(task.outPath)) && !force) {
      skipped += 1;
      return;
    }
    if (!(await isFile(task.metaPath))) {
      failed += 1;
      failures.push(`${task.storeKey}/${task.id}：缺少精灵图元数据（先跑 node scripts/fetch-assets.mjs）`);
      return;
    }
    try {
      const meta = JSON.parse(await readFile(task.metaPath, 'utf8'));
      await mkdir(task.outDir, { recursive: true });
      let attempt = buildFfmpegArgs({ webpPath: task.webp.cache, outPath: task.outPath, meta, crf, withAlphaMode: true });
      let result = await runFfmpeg(ffmpeg, attempt.args);
      if (!result.ok) {
        // 旧版 ffmpeg 不认输出参数 -alpha_mode：去掉后重试（靠 metadata 标签 + pix_fmt）
        attempt = buildFfmpegArgs({ webpPath: task.webp.cache, outPath: task.outPath, meta, crf, withAlphaMode: false });
        result = await runFfmpeg(ffmpeg, attempt.args);
      }
      if (!result.ok) throw new Error(`ffmpeg 退出码 ${result.code}`);
      if (!(await isFile(task.outPath))) throw new Error('ffmpeg 没有产出文件');
      const info = await stat(task.outPath);
      totalBytes.webm += info.size;
      converted += 1;
    } catch (error) {
      failed += 1;
      failures.push(`${task.storeKey}/${task.id}：${error.message}`);
      await rm(task.outPath, { force: true });
    } finally {
      if (done % 5 === 0 || done === tasks.length) {
        process.stdout.write(`  转换进度 ${done}/${tasks.length}（新转 ${converted}，复用 ${skipped}，失败 ${failed}）\n`);
      }
    }
  });

  if (failed > 0) {
    console.error(`\n${failed} 个动作转换失败：`);
    for (const failure of failures.slice(0, 20)) console.error(`  - ${failure}`);
    throw new Error('WebM 转换未完成，修正后重跑（已成功的会复用）');
  }
  return { tasks, converted, skipped, bytes: totalBytes.webm };
}

if (isMain(import.meta.url)) {
  const options = parseConvertArgs();
  if (process.argv.slice(2).includes('--help')) {
    console.log(`用法：node scripts/convert-spritesheets.mjs [--all] [--force] [--crf=20] [--jobs=4]

  把已下载的精灵图转成 DSH-pet 用的透明 WebM：
  dist/pet/<形象>-animation/<动作>.webm

  --all      不按动作上限（与 build.mjs --all 一致）
  --force    已存在的 WebM 也重新转换
  --crf=N    VP9 质量（默认 20，越小越清晰、文件越大）
  --jobs=N   并发 ffmpeg 数（默认 4）`);
    process.exit(0);
  }
  console.log(`[convert] 并发 ${options.jobs}，CRF ${options.crf}，--force=${options.force}`);
  const startedAt = Date.now();
  const result = await convertSpritesheets(options);
  console.log(
    `[convert] 完成：${result.tasks.length} 个动作，新转 ${result.converted}，复用 ${result.skipped}，WebM 合计 ${(result.bytes / 1024 / 1024).toFixed(1)} MiB，耗时 ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  );
}
