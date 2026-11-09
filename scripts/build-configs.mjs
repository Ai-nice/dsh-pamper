/**
 * 生成 pet pack 配置 + 预览页数据：
 *   dist/pet/<形象>-config.json       DSH-pet 直接读取的 pet pack 配置
 *   dist/pet/<形象>-animation/*.webm  动画素材（由 convert-spritesheets.mjs 产出）
 *   preview/manifest.json             预览页数据（含 DSH-pet 自带小女仆）
 *   dist/manifest.json                构建清单（给安装脚本与文档用）
 *
 * 用法：node scripts/build-configs.mjs [--all]
 */
import { cp, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CHARACTERS, PREVIEW_ONLY_CHARACTERS } from '../config/characters.mjs';
import { DIRS, isMain, PROJECT_ROOT, STORE } from './lib/paths.mjs';
import { loadCatalog, selectAll } from './lib/select.mjs';

const CDN_BASE = `${STORE.cdn}/`;

/** 路径每一段单独 URL 编码（中文动作名必须编码） */
function encodePath(relPath) {
  return relPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function remoteAsset(storeKey, relPath) {
  return `${CDN_BASE}${encodePath(`pets/${storeKey}/${relPath}`)}`;
}

/** 收集配置里引用的所有动画名（用于校验素材是否齐） */
export function collectAnimationNames(animations) {
  const names = new Set();
  const add = (name) => {
    if (typeof name === 'string' && name.length > 0) names.add(name);
    else if (Array.isArray(name)) name.forEach(add);
  };
  for (const key of ['idle', 'turn', 'drag', 'clicks']) add(animations[key]);
  for (const action of animations.moves?.actions ?? []) add(action.name);
  for (const category of animations.categories ?? []) add(category.actions);
  for (const pool of Object.values(animations.events ?? {})) add(pool);
  for (const set of animations.sleep ?? []) {
    add(set.start);
    add(set.loop);
    add(set.end);
  }
  add(animations.baifan);
  return [...names];
}

/** 生成一个 pet pack 的配置对象 */
export function makePackConfig(result) {
  const character = result.character;
  const petId = `${character.kind}-1`;
  return {
    // 由 projects/scripts/build-configs.mjs 生成；改配置请改 config/characters.mjs 后重新生成
    whisperPrompt: character.whisperPrompt,
    workStatusTexts: character.workStatusTexts,
    memes: {},
    pets: [
      {
        id: petId,
        name: character.name,
        size: character.size ?? 420,
        balanceEnabled: character.balanceEnabled ?? false,
        whisperEnabled: character.whisperEnabled ?? false,
        workStatusEnabled: character.workStatusEnabled ?? true,
        fixedEnabled: character.fixedEnabled ?? true,
        display: character.display ?? 'both',
        position: character.position ?? { corner: 'top-right', marginX: 24, marginY: 100 }
      }
    ],
    animations: result.animations,
    animationWeights: result.animationWeights
  };
}

/** 预览页用的单个形象数据：给「商店全量动作」而不是只给安装子集，方便逐条浏览 */
function makePreviewCharacter(result, catalog, { previewOnly = false } = {}) {
  const character = result.character;
  const sourceKeys = (character.sources ?? []).map((source) => catalog.get(source.pack)?.storeKey ?? source.pack);
  const coverStorePack = character.coverStorePack ?? sourceKeys[0];
  const seen = new Set();
  const actions = [];
  const categoryOrder = [];
  const grouped = new Map();
  for (const storeKey of sourceKeys) {
    const pack = catalog.get(storeKey);
    if (!pack) continue;
    for (const action of pack.actions) {
      if (seen.has(action.id)) continue;
      seen.add(action.id);
      const webpRel = action.sources?.webp ?? `spritesheet/${action.id}.webp`;
      const spec = action.spritesheet ?? {};
      actions.push({
        id: action.id,
        name: action.name ?? action.id,
        category: action.category ?? '',
        url: remoteAsset(storeKey, webpRel),
        frameWidth: spec.frameWidth ?? 640,
        frameHeight: spec.frameHeight ?? 360,
        columns: spec.columns ?? 8,
        rows: spec.rows ?? 15,
        frameCount: spec.frameCount ?? 120,
        fps: spec.fps ?? 12
      });
      if (!grouped.has(action.category)) {
        grouped.set(action.category, []);
        categoryOrder.push(action.category);
      }
      grouped.get(action.category).push(action.id);
    }
  }
  return {
    id: previewOnly ? 'aboutme-main' : character.kind,
    name: character.name,
    previewOnly,
    storePack: coverStorePack,
    avatar: remoteAsset(coverStorePack, 'avatar.webp'),
    size: character.size ?? 420,
    defaults: {
      idle: result.animations.idle[0] ?? actions[0]?.id ?? '',
      clicks: result.animations.clicks.length > 0 ? result.animations.clicks : [...(grouped.get('点击回应') ?? [])],
      favorite: result.animations.idle.slice(1),
      categories: categoryOrder.map((category) => ({ id: category, actions: grouped.get(category) }))
    },
    actions
  };
}

export async function buildConfigs({ all = false, checkFiles = true } = {}) {
  const catalog = await loadCatalog();
  const selected = selectAll({ characters: CHARACTERS, previewOnly: PREVIEW_ONLY_CHARACTERS }, catalog, { all });
  await mkdir(DIRS.distPets, { recursive: true });

  const built = [];
  const problems = [];
  for (const result of selected.characters) {
    const config = makePackConfig(result);
    const configPath = join(DIRS.distPets, `${result.character.kind}-config.json`);
    await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');

    // 角色头像：dsh-pet 按 pet/<素材根>-avatar.<ext> 自动识别；aboutme 用商店封面图
    const coverStorePack = result.character.coverStorePack ?? result.files[0]?.storeKey;
    const avatarSource = coverStorePack ? join(DIRS.catalog, 'pets', coverStorePack, 'avatar.webp') : undefined;
    if (avatarSource) {
      try {
        const info = await stat(avatarSource);
        if (info.isFile() && info.size > 0) {
          await cp(avatarSource, join(DIRS.distPets, `${result.character.kind}-avatar.webp`), { force: true });
        }
      } catch {
        // 没有封面图就沿用 dsh-pet 默认 logo
      }
    }

    const animationDir = join(DIRS.distPets, `${result.character.kind}-animation`);
    await mkdir(animationDir, { recursive: true });
    const names = collectAnimationNames(config.animations);
    for (const name of names) {
      let ok = true;
      if (checkFiles) {
        try {
          const info = await stat(join(animationDir, `${name}.webm`));
          ok = info.size > 0;
        } catch {
          ok = false;
        }
      }
      if (!ok) problems.push(`${result.character.kind}: ${name}.webm`);
    }
    built.push({
      kind: result.character.kind,
      name: result.character.name,
      petId: config.pets[0].id,
      storePacks: [...new Set(result.files.map((file) => file.storeKey))],
      size: config.pets[0].size,
      display: config.pets[0].display,
      position: config.pets[0].position,
      stats: result.stats,
      configPath,
      animationDir,
      animationCount: names.length
    });
  }

  // 预览页数据：已安装形象 + 仅预览（DSH-pet 自带蓝毛小女仆）
  const previewCharacters = [
    ...selected.previewOnly.map((result) => makePreviewCharacter(result, catalog, { previewOnly: true })),
    ...selected.characters.map((result) => makePreviewCharacter(result, catalog))
  ];
  const previewDir = join(PROJECT_ROOT, 'preview');
  await mkdir(previewDir, { recursive: true });
  await writeFile(
    join(previewDir, 'manifest.json'),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        cdn: CDN_BASE,
        store: STORE,
        characters: previewCharacters
      },
      null,
      2
    )}\n`,
    'utf8'
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    store: STORE,
    characters: built,
    previewManifest: join(previewDir, 'manifest.json')
  };
  await writeFile(join(DIRS.dist, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  if (problems.length > 0) {
    throw new Error(
      `以下动画缺少 WebM 文件（先跑 node scripts/convert-spritesheets.mjs）：\n  ${problems.join('\n  ')}`
    );
  }
  return { built, previewCharacters };
}

if (isMain(import.meta.url)) {
  const argv = process.argv.slice(2);
  if (argv.includes('--help')) {
    console.log(`用法：node scripts/build-configs.mjs [--all]

  按 config/characters.mjs 的选材规则生成：
    dist/pet/<形象>-config.json
    preview/manifest.json
    dist/manifest.json
  （不会生成 webm；素材由 convert-spritesheets.mjs 生成）`);
    process.exit(0);
  }
  const all = argv.includes('--all');
  const { built } = await buildConfigs({ all });
  console.log('[build-configs] 生成完成：');
  for (const item of built) {
    console.log(
      `  ${item.kind.padEnd(16)} ${item.name}  ${item.animationCount} 个动画  ${item.size}px  ${item.position.corner}  ${item.configPath.replace(PROJECT_ROOT, '.')}`
    );
  }
}
