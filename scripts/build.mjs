/**
 * 一键构建：商店目录 → 下载/复制精灵图 → 转透明 WebM → 生成 aboutme pet pack
 *           → 规范化「小小桌宠」额外角色 → 汇总清单。
 *
 * 产出（可直接用 install.mjs 安装）：
 *   dist/pet/aboutme-dragon-config.json + aboutme-dragon-animation/*.webm
 *   dist/pet/aboutme-claude-config.json + aboutme-claude-animation/*.webm
 *   dist/pet/aboutme-gemini-config.json + aboutme-gemini-animation/*.webm
 *   dist/pet/xiaoxiao-*-config.json + xiaoxiao-*-animation/*.webm + xiaoxiao-*-avatar.png
 *   preview/manifest.json（预览页数据，aboutme 4 形象）
 *   dist/manifest.json（全部形象汇总）
 *
 * 素材优先读本地：D:\PC\DSH\桌面宠物源代码\pet素材（aboutme-pets 完整仓库）。
 *
 * 用法：node scripts/build.mjs [--all] [--force] [--crf=20] [--jobs=4]
 *                             [--skip-fetch] [--skip-convert] [--skip-config] [--skip-xiaoxiao]
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isMain, DIRS, STORE } from './lib/paths.mjs';
import { buildConfigs, collectAnimationNames } from './build-configs.mjs';
import { buildXiaoxiaoPacks } from './build-xiaoxiao-packs.mjs';
import { convertSpritesheets } from './convert-spritesheets.mjs';
import { fetchCatalog } from './fetch-catalog.mjs';
import { downloadAssets, parseFetchArgs } from './fetch-assets.mjs';

export function parseBuildArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    if (!hit) return fallback;
    const value = Number(hit.split('=')[1]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  return {
    all: has('--all'),
    force: has('--force'),
    crf: opt('crf', 20),
    jobs: opt('jobs', 4),
    skipFetch: has('--skip-fetch'),
    skipConvert: has('--skip-convert'),
    skipConfig: has('--skip-config'),
    skipXiaoxiao: has('--skip-xiaoxiao'),
    help: has('--help')
  };
}

const HELP = `pamper 构建脚本
用法：node scripts/build.mjs [选项]

流程（默认全跑）：
  1. fetch-catalog           抓取 aboutme-pets 商店目录（优先读本地 pet素材，缺失才联网）
  2. fetch-assets            下载/复制被选中的动作精灵图（webp + json）
  3. convert-spritesheets    精灵图 → 透明 WebM（ffmpeg / libvpx-vp9）
  4. build-configs           生成 aboutme pet pack 配置 + 预览页数据
  5. build-xiaoxiao-packs    把「小小桌宠」5 个额外角色的 WebM 规范化为 pet pack
  6. 汇总 dist/manifest.json

选项：
  --all              不按每个形象的动作上限截断（会转换来源包的全部动作，体积/耗时大）
  --force            已缓存的精灵图/已转换的 WebM 全部重做
  --crf=N            aboutme 精灵图→WebM 质量（默认 20）
  --jobs=N           下载/转换并发数（默认 4；小小桌宠步骤默认 6）
  --skip-fetch       跳过商店目录与精灵图下载
  --skip-convert     跳过 aboutme WebM 转换（复用 dist/pet 下已有文件）
  --skip-config      跳过 aboutme 配置生成
  --skip-xiaoxiao    跳过「小小桌宠」角色
  --help             显示本帮助

产物：dist/pet/<形象>-config.json 与 <形象>-animation/*.webm；预览数据在 preview/manifest.json。
安装：node scripts/install.mjs`;

function logStep(index, title) {
  console.log(`\n========== [${index}/5] ${title} ==========`);
}

/** 汇总 dist/pet 下全部 pet pack（aboutme + xiaoxiao）写 dist/manifest.json */
export async function writeDistManifest() {
  const entries = [];
  let entriesDir = [];
  try {
    entriesDir = await readdir(DIRS.distPets, { withFileTypes: true });
  } catch {
    return undefined;
  }
  const configFiles = entriesDir
    .filter((entry) => entry.isFile() && /-config\.json$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  let totalAnimations = 0;
  let totalBytes = 0;
  for (const file of configFiles) {
    const kind = file.replace(/-config\.json$/, '');
    const config = JSON.parse(await readFile(join(DIRS.distPets, file), 'utf8'));
    const names = [...collectAnimationNames(config.animations)];
    let bytes = 0;
    for (const name of names) {
      try {
        bytes += (await stat(join(DIRS.distPets, `${kind}-animation`, `${name}.webm`))).size;
      } catch {
        // 缺文件由 install.mjs 的校验负责
      }
    }
    const hasAvatar = (await readdir(DIRS.distPets)).includes(`${kind}-avatar.png`);
    totalAnimations += names.length;
    totalBytes += bytes;
    entries.push({
      kind,
      name: config.pets?.[0]?.name ?? kind,
      petId: config.pets?.[0]?.id,
      size: config.pets?.[0]?.size,
      display: config.pets?.[0]?.display,
      position: config.pets?.[0]?.position,
      animations: names.length,
      bytes,
      avatar: hasAvatar ? `${kind}-avatar.png` : undefined,
      configPath: join(DIRS.distPets, file),
      animationDir: join(DIRS.distPets, `${kind}-animation`)
    });
  }
  const manifest = {
    generatedAt: new Date().toISOString(),
    store: STORE,
    totals: { packs: entries.length, animations: totalAnimations, bytes: totalBytes },
    packs: entries
  };
  await writeFile(join(DIRS.dist, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

export async function build(options) {
  const startedAt = Date.now();
  const results = {};

  if (!options.skipFetch) {
    logStep(1, '抓取商店目录');
    const { packs } = await fetchCatalog();
    console.log(`  商店内 ${packs.length} 个动作包：${packs.map((pack) => `${pack.id}(${pack.actions.length})`).join('、')}`);

    logStep(2, '下载/复制精灵图');
    results.download = await downloadAssets({ all: options.all, force: options.force, jobs: options.jobs });
  } else {
    console.log('\n[skip] 跳过目录抓取与精灵图下载');
  }

  if (!options.skipConvert) {
    logStep(3, '精灵图 → 透明 WebM（aboutme）');
    results.convert = await convertSpritesheets({ all: options.all, force: options.force, crf: options.crf, jobs: options.jobs });
  } else {
    console.log('\n[skip] 跳过 aboutme WebM 转换');
  }

  if (!options.skipConfig) {
    logStep(4, '生成 aboutme pet pack 配置');
    results.config = await buildConfigs({ all: options.all });
  } else {
    console.log('\n[skip] 跳过 aboutme 配置生成');
  }

  if (!options.skipXiaoxiao) {
    logStep(5, '规范化「小小桌宠」额外角色');
    results.xiaoxiao = await buildXiaoxiaoPacks({ force: options.force, crf: options.crf === 20 ? 28 : options.crf, jobs: 6 });
  } else {
    console.log('\n[skip] 跳过小小桌宠角色');
  }

  results.manifest = await writeDistManifest();

  const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`\n✓ 构建完成，用时 ${seconds}s`);
  if (results.manifest) {
    for (const pack of results.manifest.packs) {
      console.log(`  · ${pack.name.padEnd(8)} ${String(pack.animations).padStart(3)} 个动画  ${pack.kind}`);
    }
    console.log(`  · 合计 ${results.manifest.totals.packs} 个形象 / ${results.manifest.totals.animations} 个动画 / ${(results.manifest.totals.bytes / 1024 / 1024).toFixed(1)} MiB`);
  }
  console.log('\n下一步：node scripts/install.mjs');
  return results;
}

if (isMain(import.meta.url)) {
  const options = parseBuildArgs();
  if (options.help) {
    console.log(HELP);
    process.exit(0);
  }
  const fetchOptions = parseFetchArgs(process.argv.slice(2));
  console.log(
    `[build] --all=${options.all} --force=${options.force} --crf=${options.crf} --jobs=${options.jobs}（下载并发 ${fetchOptions.jobs}）`
  );
  await build(options);
}
