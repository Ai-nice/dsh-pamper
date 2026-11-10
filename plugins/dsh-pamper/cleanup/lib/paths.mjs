/**
 * 路径与常量：项目根、商店源、下载缓存、产物与安装目录。
 * 所有脚本共用这一份，避免路径在各脚本里重复硬编码。
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

/** 是否被直接执行（而不是被 import）；兼容 `node -e`（argv[1] 为空） */
export const isMain = (metaUrl) => Boolean(process.argv[1]) && metaUrl === pathToFileURL(process.argv[1]).href;

/** 项目根目录（pamper/） */
export const PROJECT_ROOT = join(here, '..', '..');

/** 商店源（aboutme-pets），固定 main 分支；优先 jsDelivr（CORS/CDN 稳定），失败回退 raw.githubusercontent */
export const STORE = {
  id: 'aboutme-pets',
  name: 'aboutme-pets',
  repo: 'hunmer/aboutme-pets',
  ref: 'main',
  cdn: 'https://cdn.jsdelivr.net/gh/hunmer/aboutme-pets@main',
  raw: 'https://raw.githubusercontent.com/hunmer/aboutme-pets/main',
  page: 'https://hunmer.github.io/aboutme-pets/',
  repoUrl: 'https://github.com/hunmer/aboutme-pets',
};

/** 本地目录 */
export const DIRS = {
  catalog: join(PROJECT_ROOT, 'catalog'),
  spritesheetCache: join(PROJECT_ROOT, 'assets', 'spritesheet-cache'),
  dist: join(PROJECT_ROOT, 'dist'),
  distPets: join(PROJECT_ROOT, 'dist', 'pet'),
  buildTemp: join(PROJECT_ROOT, '.build-tmp'),
};

/** dsh-pet 用户数据根（pet pack 安装位置） */
export const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
export const DSH_PET_DIR = join(DSH_HOME, 'dsh-pet');
export const DSH_PET_PACK_DIR = join(DSH_PET_DIR, 'pet');

/** 用户把两个上游项目下载到了这个目录（可用环境变量 DESKTOP_PET_SOURCE_ROOT 覆盖）：
 *   pet素材/                     = aboutme-pets 仓库（商店目录 + 全部 WebP 精灵图，约 1.4 GiB）
 *   xiaoxiao-zhuochong桌面源代码/ = 小小桌宠（基于 dsh-pet 改造，含 5 个额外角色 + 成品透明 WebM） */
export const LOCAL_SOURCE_ROOT = process.env.DESKTOP_PET_SOURCE_ROOT || 'D:\\PC\\DSH\\桌面宠物源代码';
export const LOCAL_STORE_ROOT = join(LOCAL_SOURCE_ROOT, 'pet素材');
export const XIAOXIAO_ROOT = join(LOCAL_SOURCE_ROOT, 'xiaoxiao-zhuochong桌面源代码');
export const XIAOXIAO_CHARACTERS_DIR = join(XIAOXIAO_ROOT, 'characters');
export const XIAOXIAO_ASSETS_DIR = join(XIAOXIAO_ROOT, 'android', 'assets');

/** 由 pets.json 里的商店包 id 找到商店目录 */
export const storePackDir = (storePackId) => join(DIRS.catalog, 'pets', storePackId.replace(/-pet$/, ''));

/** 商店资源 URL（相对路径 → CDN 绝对地址） */
export const storeUrl = (relPath, base = STORE.cdn) => `${base}/${relPath.split('/').map(encodeURIComponent).join('/')}`;

/** 安全文件名/目录名：保留中文，去掉 Windows 非法字符 */
export const safeName = (name) => name.replace(/[\\/:*?"<>|\x00-\x1f]/g, '_');
