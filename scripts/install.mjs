/**
 * 把构建产物安装成 DSH-pet 的 pet pack：
 *   dist/pet/<形象>-config.json          → $DSH_HOME/dsh-pet/pet/<形象>-config.json
 *   dist/pet/<形象>-animation/*.webm     → $DSH_HOME/dsh-pet/pet/<形象>-animation/*.webm
 *
 * 只复制 aboutme-* 前缀的产物，绝不改其它 pet pack / main-config。
 * 用法：node scripts/install.mjs [--dry-run] [--force] [--target=<dir>]
 */
import { cp, mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { collectAnimationNames } from './build-configs.mjs';
import { DIRS, DSH_PET_PACK_DIR, isMain } from './lib/paths.mjs';

export function parseInstallArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : fallback;
  };
  return {
    dryRun: has('--dry-run'),
    force: has('--force'),
    target: resolve(opt('target', DSH_PET_PACK_DIR)),
    help: has('--help')
  };
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

/** 校验一份 pet pack 配置 + 动画文件，返回问题列表 */
export async function validatePackConfig(config, animationDir) {
  const problems = [];
  if (!config || typeof config !== 'object') return ['配置不是对象'];
  if (!Array.isArray(config.pets) || config.pets.length === 0) problems.push('缺少 pets 数组');
  const animations = config.animations;
  if (!animations || typeof animations !== 'object') {
    problems.push('缺少 animations');
    return problems;
  }
  for (const key of ['idle', 'turn', 'drag', 'clicks', 'categories']) {
    if (!Array.isArray(animations[key])) problems.push(`animations.${key} 不是数组`);
  }
  if (!animations.moves || !Array.isArray(animations.moves.actions)) problems.push('animations.moves.actions 不是数组');
  if (!animations.events || typeof animations.events !== 'object') {
    problems.push('缺少 animations.events');
  } else if (!Array.isArray(animations.events.balance) || animations.events.balance.length === 0) {
    problems.push('animations.events.balance 为空（DSH-pet 要求非空）');
  }
  const weights = config.animationWeights;
  if (!weights || typeof weights !== 'object') {
    problems.push('缺少 animationWeights');
  } else {
    for (const key of ['idle', 'turn', 'move']) {
      if (!Number.isFinite(Number(weights[key])) || Number(weights[key]) < 0) problems.push(`animationWeights.${key} 非法`);
    }
  }
  if (problems.length > 0) return problems;
  for (const name of collectAnimationNames(animations)) {
    if (!(await isFile(join(animationDir, `${name}.webm`)))) problems.push(`缺少动画文件：${name}.webm`);
  }
  return problems;
}

/** 检查目标目录里已有 pet 实例 id，避免与将要安装的 id 冲突。
 *  skipNames：本次会被覆盖的同前缀配置文件（重复安装/升级时不能把自己的旧实例算成冲突）。 */
async function existingPetIds(target, skipNames = new Set()) {
  const ids = new Set();
  let entries = [];
  try {
    entries = await readdir(target, { withFileTypes: true });
  } catch {
    return ids;
  }
  for (const entry of entries) {
    if (!entry.isFile() || !/-config\.(json|jsonc)$/.test(entry.name)) continue;
    if (skipNames.has(entry.name)) continue;
    try {
      const config = JSON.parse(await readFile(join(target, entry.name), 'utf8'));
      for (const pet of config.pets ?? []) if (pet?.id) ids.add(String(pet.id));
    } catch {
      // 忽略其它插件的非法配置文件
    }
  }
  return ids;
}

export async function installPacks({ dryRun = false, force = false, target = DSH_PET_PACK_DIR } = {}) {
  const distPets = DIRS.distPets;
  let entries = [];
  try {
    entries = await readdir(distPets, { withFileTypes: true });
  } catch {
    throw new Error(`构建产物不存在：${distPets}（先跑 node scripts/build.mjs）`);
  }
  const packFiles = entries
    .filter((entry) => entry.isFile() && /^(aboutme|xiaoxiao)-.+-config\.json$/.test(entry.name))
    .map((entry) => join(distPets, entry.name))
    .sort();
  if (packFiles.length === 0) throw new Error(`dist/pet 下没有 aboutme-*-config.json / xiaoxiao-*-config.json（先跑 node scripts/build.mjs）`);

  const installed = [];
  const ourConfigNames = new Set(packFiles.map((configPath) => configPath.split(/[\\/]/).pop()));
  const existingIds = await existingPetIds(target, ourConfigNames);
  const ourIds = new Set();
  for (const configPath of packFiles) {
    const fileBase = configPath.split(/[\\/]/).pop();
    const kind = fileBase.replace(/-config\.json$/, '');
    const config = JSON.parse(await readFile(configPath, 'utf8'));
    const animationDir = join(distPets, `${kind}-animation`);
    const problems = await validatePackConfig(config, animationDir);
    if (problems.length > 0) {
      throw new Error(`${kind} 配置/素材不完整：\n  ${problems.join('\n  ')}`);
    }
    for (const pet of config.pets) {
      if (ourIds.has(pet.id) || existingIds.has(pet.id)) {
        throw new Error(`宠物实例 id 冲突：${pet.id}（已存在于目标目录的其它 pet pack，请改名后重试）`);
      }
      ourIds.add(pet.id);
    }

    const targetConfig = join(target, `${kind}-config.json`);
    const targetAnimation = join(target, `${kind}-animation`);
    installed.push({ kind, config, targetConfig, targetAnimation });
    if (dryRun) continue;

    await mkdir(target, { recursive: true });
    if (force && (await exists(targetAnimation))) await rm(targetAnimation, { recursive: true, force: true });
    await cp(animationDir, targetAnimation, { recursive: true, force: true });
    await cp(configPath, targetConfig, { force: true });
    // 角色自定义头像（dsh-pet 按 pet/<素材根>-avatar.<ext> 自动识别；可选）
    for (const avatar of await readdir(distPets)) {
      if (avatar === `${kind}-avatar.png` || avatar === `${kind}-avatar.webp` || avatar === `${kind}-avatar.jpg`) {
        await cp(join(distPets, avatar), join(target, avatar), { force: true });
      }
    }
  }

  return { installed, target, dryRun };
}

if (isMain(import.meta.url)) {
  const options = parseInstallArgs();
  if (options.help) {
    console.log(`用法：node scripts/install.mjs [--dry-run] [--force] [--target=<dir>]

  把 dist/pet/aboutme-*-config.json 与 aboutme-*-animation/ 安装到
  $DSH_HOME/dsh-pet/pet/（DSH_HOME 缺省：Windows 为 %USERPROFILE%\\.dsh）。

  --dry-run       只打印计划，不写文件
  --force         覆盖目标里已存在的同名 aboutme-* 包
  --target=<dir>  指定安装目录（默认 $DSH_HOME/dsh-pet/pet）`);
    process.exit(0);
  }
  console.log(`[install] 目标目录：${options.target}${options.dryRun ? '（dry-run）' : ''}`);
  const result = await installPacks(options);
  for (const item of result.installed) {
    console.log(`  ${options.dryRun ? '·' : '✓'} ${item.kind}  →  ${item.targetConfig}`);
    console.log(`    动画目录：${item.targetAnimation}`);
  }
  if (options.dryRun) {
    console.log('\n[dry-run] 未写入任何文件。');
  } else {
    console.log(`\n[install] 已安装 ${result.installed.length} 个形象到：${result.target}`);
    console.log('  默认不会自动出现新形象（display=none）：到 DSH「设置 → 桌宠配置」选种类，把「显示位置」');
    console.log('  从「都不显示」改成 仅桌面/仅浏览器/两者 并保存，该形象才会启动；设置页可再关掉。');
    console.log('  想一键让某只退出：宠物右键菜单「退出回家」（需运行过 scripts/patch-dsh-pet.mjs）。');
    console.log('  多开同一形象：设置页对应种类下点「+」。');
  }
}
