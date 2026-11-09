/**
 * 把「小小桌宠」（xiaoxiao-zhuochong）里的额外角色装成 dsh-pet pet pack。
 *
 * 来源角色目录（config/xiaoxiao.mjs 的 source 字段）：
 *   ...\xiaoxiao-zhuochong桌面源代码\characters\<source>\
 *     config.json       与 dsh-pet 同构的动画池/权重
 *     animations\*.webm  现成的透明 VP9 WebM（尺寸 640×360 / 1280×720 / 1280×960 混用）
 *     人设.json          角色人设（取 whisperPrompt 首段）
 *   头像：...\android\assets\<source>\portrait.png
 *
 * 产出的动画统一规范化为 640×360（保持比例、透明补边、CRF 28），与 dsh-pet 播放器
 * 以及本项目其它形象一致；源视频已带 alpha（ALPHA_MODE=1），直接重编码保留透明。
 *
 * 用法：node scripts/build-xiaoxiao-packs.mjs [--force] [--crf=28] [--jobs=6]
 */
import { spawn } from 'node:child_process';
import { cp, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { XIAOXIAO_ASSETS_DIR, XIAOXIAO_CHARACTERS_DIR, DIRS, isMain } from './lib/paths.mjs';
import { XIAOXIAO_CHARACTERS } from '../config/xiaoxiao.mjs';
import { mapLimit } from './fetch-assets.mjs';
import { findFfmpeg } from './convert-spritesheets.mjs';

export function parseXiaoxiaoArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    if (!hit) return fallback;
    const value = Number(hit.split('=')[1]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  return { force: has('--force'), crf: opt('crf', 28), jobs: opt('jobs', 6) };
}

/** 把一个源动画重编码为 640×360 透明 WebM */
async function transcode(ffmpeg, src, out, crf) {
  await mkdir(join(out, '..'), { recursive: true });
  const vf =
    'scale=640:360:force_original_aspect_ratio=decrease:flags=lanczos,' +
    'pad=640:360:(ow-iw)/2:(oh-ih)/2:color=#00000000,format=yuva420p';
  const args = [
    '-hide_banner',
    '-nostdin',
    '-y',
    '-v',
    'error',
    // 必须显式用 libvpx-vp9 解码：ffmpeg 原生 VP9 解码器默认不导出 alpha，透明会被丢掉
    '-c:v',
    'libvpx-vp9',
    '-i',
    src,
    '-vf',
    vf,
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
    String(crf),
    '-alpha_mode',
    '1',
    '-metadata:s:v:0',
    'alpha_mode=1',
    '-an',
    out
  ];
  return await new Promise((resolve) => {
    const child = spawn(ffmpeg, args, { stdio: 'ignore', windowsHide: true });
    child.on('error', (error) => resolve({ ok: false, message: String(error) }));
    child.on('close', (code) => resolve({ ok: code === 0, message: `ffmpeg exit ${code}` }));
  });
}

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

/** 从 人设.json 取第一段作为 whisperPrompt */
async function readPersona(sourceDir) {
  for (const name of ['人设.json', 'persona.json']) {
    try {
      const data = JSON.parse(await readFile(join(sourceDir, name), 'utf8'));
      const text = typeof data.whisperPrompt === 'string' ? data.whisperPrompt.trim() : '';
      if (text) return text.split(/\n\s*\n/)[0].trim();
    } catch {
      // 没有/格式不同就跳过
    }
  }
  return undefined;
}

/** 只留素材里真实存在的动画名；空池按 dsh-pet 校验兜底 */
function normalizeAnimations(source, available) {
  const keep = (list) => (Array.isArray(list) ? list.filter((name) => available.has(name)) : []);
  const first = [...available][0];
  const idle = keep(source?.idle);
  if (idle.length === 0 && first) idle.push(first);
  const turn = keep(source?.turn);
  const drag = keep(source?.drag);
  const clicks = keep(source?.clicks);

  const moveActions = [];
  for (const action of source?.moves?.actions ?? []) {
    if (available.has(action?.name)) moveActions.push(action);
  }
  const moves = {
    default: source?.moves?.default ?? { minDist: 60, maxDist: 240, margin: 20, leadSec: 2, tailSec: 2 },
    actions: moveActions
  };

  const categories = [];
  for (const category of source?.categories ?? []) {
    const actions = keep(category?.actions);
    if (actions.length === 0) continue;
    categories.push({ id: category.id || '小动作', weight: Number(category.weight) || 10, actions, ...(category.noMirror ? { noMirror: true } : {}) });
  }

  const events = {};
  for (const [name, pool] of Object.entries(source?.events ?? {})) {
    const names = keep(pool);
    if (names.length > 0) events[name] = names;
  }
  if (!Array.isArray(events.balance) || events.balance.length === 0) {
    events.balance = Array.from({ length: 6 }, () => idle[0] ?? first);
  }

  // 权重：分类池把 100 - idle - turn - move 按原权重比例分配成整数
  const idleWeight = categories.length > 0 ? 10 : 100;
  const turnWeight = turn.length > 0 ? 5 : 0;
  const moveWeight = moveActions.length > 0 ? 5 : 0;
  let budget = 100 - idleWeight - turnWeight - moveWeight;
  if (categories.length > 0) {
    const total = categories.reduce((sum, category) => sum + Math.max(1, category.weight), 0);
    let assigned = 0;
    for (let index = 0; index < categories.length; index += 1) {
      const last = index === categories.length - 1;
      const weight = last ? budget - assigned : Math.max(1, Math.round((Math.max(1, categories[index].weight) / total) * budget));
      categories[index].weight = weight;
      assigned += weight;
    }
    if (budget !== assigned) budget = assigned;
  }

  return {
    animations: { idle, turn, drag, clicks, moves, categories, events },
    weights: { idle: idleWeight, turn: turnWeight, move: moveWeight }
  };
}

/** 构建全部小小桌宠角色 pack */
export async function buildXiaoxiaoPacks({ force = false, crf = 28, jobs = 6 } = {}) {
  const ffmpeg = findFfmpeg();
  await mkdir(DIRS.distPets, { recursive: true });
  const built = [];
  const failures = [];
  const tasks = [];

  for (const character of XIAOXIAO_CHARACTERS) {
    const sourceDir = join(XIAOXIAO_CHARACTERS_DIR, character.source);
    const animationsDir = join(sourceDir, 'animations');
    let files = [];
    try {
      files = (await readdir(animationsDir)).filter((name) => name.toLowerCase().endsWith('.webm'));
    } catch {
      failures.push(`${character.kind}: 找不到素材目录 ${animationsDir}`);
      continue;
    }
    const available = new Set(files.map((name) => name.slice(0, -'.webm'.length)));

    let sourceConfig;
    try {
      sourceConfig = JSON.parse(await readFile(join(sourceDir, 'config.json'), 'utf8'));
    } catch (error) {
      failures.push(`${character.kind}: 读取 config.json 失败：${error.message}`);
      continue;
    }
    const { animations, weights } = normalizeAnimations(sourceConfig.animations, available);
    const outDir = join(DIRS.distPets, `${character.kind}-animation`);
    await mkdir(outDir, { recursive: true });

    const referenced = new Set();
    for (const value of [animations.idle, animations.turn, animations.drag, animations.clicks]) value.forEach((n) => referenced.add(n));
    animations.moves.actions.forEach((action) => referenced.add(action.name));
    animations.categories.forEach((category) => category.actions.forEach((n) => referenced.add(n)));
    Object.values(animations.events).forEach((pool) => pool.forEach((n) => referenced.add(n)));

    for (const name of referenced) {
      tasks.push({ character, sourceDir, animationsDir, outDir, name, sourceFile: join(animationsDir, `${name}.webm`) });
    }

    const avatarSrc = join(XIAOXIAO_ASSETS_DIR, character.source, 'portrait.png');
    const avatarOut = join(DIRS.distPets, `${character.kind}-avatar.png`);
    if (await isFile(avatarSrc)) await cp(avatarSrc, avatarOut, { force: true });

    const persona = await readPersona(sourceDir);
    const config = {
      whisperPrompt: persona,
      memes: {},
      pets: [
        {
          id: `${character.kind}-1`,
          name: character.name,
          size: character.size,
          balanceEnabled: character.balanceEnabled ?? false,
          whisperEnabled: character.whisperEnabled ?? false,
          workStatusEnabled: character.workStatusEnabled ?? false,
          fixedEnabled: character.fixedEnabled ?? false,
          display: character.display ?? 'web',
          position: character.position
        }
      ],
      animations,
      animationWeights: weights
    };
    await writeFile(join(DIRS.distPets, `${character.kind}-config.json`), `${JSON.stringify(config, null, 2)}\n`, 'utf8');
    built.push({ kind: character.kind, name: character.name, config, animations: [...referenced].length });
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let done = 0;
  await mapLimit(tasks, jobs, async (task) => {
    done += 1;
    const outPath = join(task.outDir, `${task.name}.webm`);
    if (!force && (await isFile(outPath))) {
      skipped += 1;
      return;
    }
    const result = await transcode(ffmpeg, task.sourceFile, outPath, crf);
    if (result.ok) converted += 1;
    else {
      failed += 1;
      failures.push(`${task.character.kind}/${task.name}: ${result.message}`);
    }
    if (done % 10 === 0 || done === tasks.length) {
      process.stdout.write(`  小小桌宠素材规范化 ${done}/${tasks.length}（新转 ${converted}，复用 ${skipped}，失败 ${failed}）\n`);
    }
  });

  if (failures.length > 0) {
    throw new Error(`小小桌宠角色构建失败：\n  ${failures.slice(0, 20).join('\n  ')}`);
  }
  return { built, converted, skipped };
}

if (isMain(import.meta.url)) {
  const options = parseXiaoxiaoArgs();
  if (process.argv.slice(2).includes('--help')) {
    console.log(`用法：node scripts/build-xiaoxiao-packs.mjs [--force] [--crf=28] [--jobs=6]

  把「小小桌宠」项目的 5 个额外角色装成 dsh-pet pet pack：
  ...\\xiaoxiao-zhuochong桌面源代码\\characters\\<角色>\\animations\\*.webm
  → dist/pet/<kind>-animation/*.webm（统一 640×360 透明 WebM）

  --force     已存在的产物也重新转码
  --crf=N     VP9 质量（默认 28；源素材 1080p/720p，重编码到 640×360 后体积更小）
  --jobs=N    并发 ffmpeg 数（默认 6）`);
    process.exit(0);
  }
  console.log(`[xiaoxiao] 并发 ${options.jobs}，CRF ${options.crf}，--force=${options.force}`);
  const result = await buildXiaoxiaoPacks(options);
  for (const item of result.built) console.log(`  ${item.kind.padEnd(20)} ${item.name}  ${item.animations} 个动画`);
  console.log(`[xiaoxiao] 完成：新转 ${result.converted}，复用 ${result.skipped}`);
}
