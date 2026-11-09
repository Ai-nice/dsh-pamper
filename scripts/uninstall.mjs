/**
 * 卸载本项目安装的 pet pack：
 *   $DSH_HOME/dsh-pet/pet/aboutme-*-config.json
 *   $DSH_HOME/dsh-pet/pet/aboutme-*-animation/
 *
 * 只删除 aboutme-* 前缀，绝不碰 DSH-pet 自带 main 或用户其它宠物。
 * 用法：node scripts/uninstall.mjs [--dry-run] [--target=<dir>] [--purge-dist]
 */
import { readdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { DIRS, DSH_PET_PACK_DIR, isMain } from './lib/paths.mjs';

export function parseUninstallArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : fallback;
  };
  return {
    dryRun: has('--dry-run'),
    purgeDist: has('--purge-dist'),
    target: resolve(opt('target', DSH_PET_PACK_DIR)),
    help: has('--help')
  };
}

export async function uninstallPacks({ dryRun = false, purgeDist = false, target = DSH_PET_PACK_DIR } = {}) {
  const removed = [];
  let entries = [];
  try {
    entries = await readdir(target, { withFileTypes: true });
  } catch {
    console.log(`[uninstall] 目标目录不存在：${target}（无需卸载）`);
  }

  for (const entry of entries) {
    const matched =
      (entry.isFile() && /^(aboutme|xiaoxiao)-.+-config\.json$/.test(entry.name)) ||
      (entry.isDirectory() && /^(aboutme|xiaoxiao)-.+-animation$/.test(entry.name)) ||
      (entry.isFile() && /^(aboutme|xiaoxiao)-.+-avatar\.(png|webp|jpg|jpeg|gif)$/.test(entry.name));
    if (!matched) continue;
    const fullPath = join(target, entry.name);
    removed.push(fullPath);
    if (!dryRun) await rm(fullPath, { recursive: true, force: true });
  }

  const distRemoved = [];
  if (purgeDist) {
    let distEntries = [];
    try {
      distEntries = await readdir(DIRS.distPets, { withFileTypes: true });
    } catch {
      // dist 不存在
    }
    for (const entry of distEntries) {
      if (!/^(aboutme|xiaoxiao)-/.test(entry.name)) continue;
      const fullPath = join(DIRS.distPets, entry.name);
      distRemoved.push(fullPath);
      if (!dryRun) await rm(fullPath, { recursive: true, force: true });
    }
  }

  return { target, removed, distRemoved, dryRun };
}

if (isMain(import.meta.url)) {
  const options = parseUninstallArgs();
  if (options.help) {
    console.log(`用法：node scripts/uninstall.mjs [--dry-run] [--target=<dir>] [--purge-dist]

  只删除 $DSH_HOME/dsh-pet/pet/ 下本项目的 aboutme-*-config.json
  与 aboutme-*-animation/，不影响 main 与其它 pet pack。

  --dry-run     只打印将删除的路径
  --target=<dir> 指定 DSH-pet 的 pet 目录（默认 $DSH_HOME/dsh-pet/pet）
  --purge-dist  同时删除项目 dist/pet 下已生成的 aboutme-* 产物`);
    process.exit(0);
  }
  console.log(`[uninstall] 目标目录：${options.target}${options.dryRun ? '（dry-run）' : ''}`);
  const result = await uninstallPacks(options);
  if (result.removed.length === 0) {
    console.log('  没有找到本项目的 pet pack。');
  } else {
    for (const path of result.removed) console.log(`  ${options.dryRun ? '·' : '✓ 已删除'} ${path}`);
  }
  for (const path of result.distRemoved) console.log(`  ${options.dryRun ? '·' : '✓ 已删除'} ${path}`);
  if (options.dryRun) console.log('\n[dry-run] 未删除任何文件。');
  else console.log('\n卸载完成。刷新 DSH 页面（或重启 DSH）后生效。');
}
