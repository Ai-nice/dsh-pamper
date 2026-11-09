/**
 * 选材逻辑：从 aboutme-pets 商店的动作清单里，为每个形象挑出
 * DSH-pet pet pack 需要的动画池。
 *
 * DSH-pet 对一个 pet pack 的硬性要求（见插件 src/host/config/validate.ts）：
 *   animations.idle / turn / drag / clicks 必须是数组（可为空）；
 *   animations.moves = { default, actions[] }；
 *   animations.categories 数组；
 *   animations.events 必须是对象，且 events.balance 非空；
 *   animationWeights = { idle, turn, move } 三个非负数。
 *
 * 本模块只做纯选择，不读盘、不下载；catalog 由调用方传入。
 */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DIRS } from './paths.mjs';

/** 分类名（可直接用作 dsh-pet 的 category id） */
const ROLE_CATEGORY = {
  idle: '待机',
  turn: '转向',
  drag: '拖拽',
  click: '点击回应',
  move: '移动',
  balance: '余额',
  work: '工作状态',
  whisper: '碎碎念'
};

/** 余额六档（按 DSH-pet 的档位顺序：0 未消耗 → 5 全部用完） */
const BALANCE_SLOTS = [
  ['钱袋满溢'],
  ['金袋叮当', '银袋叮当'],
  ['钱袋如常'],
  ['数金皱眉', '数钱皱眉'],
  ['袋空如洗'],
  ['分文不剩']
];

/** 工作状态六档：0 思考 / 1 忙碌 / 2 整理 / 3 等待 / 4 成功 / 5 出错 */
const WORK_SLOTS = [
  ['思考'],
  ['忙碌'],
  ['清点', '整理', '归档'],
  ['踱步', '等待', '张望'],
  ['雀跃', '庆祝', '成功', '完成'],
  ['垂头', '叹气', '冒汗', '出错']
];

/** 动画名转 Windows 合法文件名（DSH-pet 用文件名当动画名，配置里也写这个） */
export function safeActionName(name) {
  return name.replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').trim();
}

/** 读目录快照（catalog/pets.json + 各 pack 的 actions.json） */
export async function loadCatalog() {
  const petsJson = JSON.parse(await readFile(join(DIRS.catalog, 'pets.json'), 'utf8'));
  const packs = new Map();
  for (const pet of petsJson.pets ?? []) {
    const storeKey = pet.id.replace(/-pet$/, '');
    const dir = join(DIRS.catalog, 'pets', storeKey);
    const actions = JSON.parse(await readFile(join(dir, 'actions.json'), 'utf8')).animations ?? [];
    for (const action of actions) {
      action.id = safeActionName(action.id);
      action.category = (action.category || '').trim();
    }
    packs.set(storeKey, {
      id: pet.id,
      storeKey,
      name: pet.name,
      dir,
      actions,
      byId: new Map(actions.map((action) => [action.id, action]))
    });
  }
  return packs;
}

function findInCategory(actions, category) {
  return actions.filter((action) => action.category === category);
}

function matchByKeywords(actions, keywords, used) {
  for (const keyword of keywords) {
    const hit = actions.find((action) => !used.has(action.id) && action.id.includes(keyword));
    if (hit) return hit;
  }
  return undefined;
}

/** 按关键词把 6 个档位填满（缺档时用同分类里其它动作 / 相邻档兜底，保证 6 个非空名字） */
function fillSlots(categoryActions, slots, used) {
  const out = [];
  const remain = categoryActions.filter((action) => !used.has(action.id));
  for (const keywords of slots) {
    const hit = matchByKeywords(remain, keywords, used);
    if (hit) {
      used.add(hit.id);
      remain.splice(remain.indexOf(hit), 1);
      out.push(hit.id);
    } else {
      out.push(undefined);
    }
  }
  // 缺失档位：优先用同分类里剩下的动作，其次复用已选的第一档（保证非空）
  const fallbackPool = [...remain.map((action) => action.id), ...out.filter(Boolean)];
  const filled = out.map((id, index) => {
    if (id) return id;
    return fallbackPool[index % fallbackPool.length] ?? categoryActions[0]?.id;
  });
  if (filled.some((id) => !id)) throw new Error('事件动画池为空，无法填充档位');
  return filled;
}

/** 给一个形象做完整选材 */
export function selectCharacter(character, catalog, { all = false } = {}) {
  const sources = (character.sources ?? []).map((source) => {
    const pack = catalog.get(source.pack);
    if (!pack) throw new Error(`商店里找不到动作包：${source.pack}（先跑 scripts/fetch-catalog.mjs）`);
    return { ...source, pack };
  });
  if (sources.length === 0) throw new Error(`${character.name} 没有配置素材来源`);

  const used = new Set();
  const picked = []; // { pack, storeKey, action, role }

  const take = (packInfo, action, role) => {
    if (!action || used.has(action.id)) return;
    used.add(action.id);
    picked.push({ pack: packInfo.storeKey, storeKey: packInfo.storeKey, action, role });
  };

  /** 在各来源里按分类取动作，essential 来源优先 */
  const takeAll = (role, categories, limit) => {
    const out = [];
    for (const source of sources) {
      for (const category of categories) {
        for (const action of findInCategory(source.pack.actions, category)) {
          if (out.length >= limit) return out;
          if (used.has(action.id)) continue;
          take(source.pack, action, role);
          out.push(action.id);
        }
      }
    }
    return out;
  };

  // 待机池：优先「待机呼吸休闲 / 待机呼吸*」，排除小憩/沉眠/打瞌睡这类睡觉动作
  // （睡觉交给 DSH-pet 的 sleep 功能；这些动作只能进随机小动作池）
  const idle = (() => {
    const candidates = [];
    sources.forEach((source, rank) => {
      for (const action of findInCategory(source.pack.actions, ROLE_CATEGORY.idle)) {
        const sleepLike = /小憩|沉眠|打瞌睡|睡觉/.test(action.id);
        const score = sleepLike ? 9 : action.id.includes('待机呼吸休闲') ? 0 : action.id.includes('待机呼吸') ? 1 : action.id.includes('待机') ? 2 : 3;
        candidates.push({ action, rank, score });
      }
    });
    const chosen = [];
    for (const item of candidates.sort((a, b) => a.score - b.score || a.rank - b.rank)) {
      if (chosen.length >= 2) break;
      if (item.score >= 9) break;
      if (used.has(item.action.id)) continue;
      take(sources[item.rank].pack, item.action, 'idle');
      chosen.push(item.action.id);
    }
    return chosen;
  })();
  const turn = takeAll('turn', [ROLE_CATEGORY.turn], 1);
  const drag = takeAll('drag', [ROLE_CATEGORY.drag], 1);
  const clicks = takeAll('click', [ROLE_CATEGORY.click], 4);
  const moveActions = takeAll('move', [ROLE_CATEGORY.move], 2);

  // ---- 事件池：余额 / 工作状态 / 碎碎念 ----
  const balanceSource = sources.find((source) => findInCategory(source.pack.actions, ROLE_CATEGORY.balance).length > 0);
  if (!balanceSource) throw new Error(`${character.name} 的来源里没有「余额」动作，DSH-pet 要求 events.balance 非空`);
  const balanceActions = findInCategory(balanceSource.pack.actions, ROLE_CATEGORY.balance);
  const balance = fillSlots(balanceActions, BALANCE_SLOTS, used);
  for (const id of balance) {
    const action = balanceSource.pack.byId.get(id);
    if (action && !picked.some((item) => item.role === 'balance' && item.action.id === id)) {
      picked.push({ pack: balanceSource.pack.storeKey, storeKey: balanceSource.pack.storeKey, action, role: 'balance' });
    }
  }

  const workSource = sources.find((source) => findInCategory(source.pack.actions, ROLE_CATEGORY.work).length > 0);
  let workStatus = [];
  if (workSource) {
    const workActions = findInCategory(workSource.pack.actions, ROLE_CATEGORY.work);
    workStatus = fillSlots(workActions, WORK_SLOTS, used);
    for (const id of workStatus) {
      const action = workSource.pack.byId.get(id);
      if (action && !picked.some((item) => item.role === 'workStatus' && item.action.id === id)) {
        picked.push({ pack: workSource.pack.storeKey, storeKey: workSource.pack.storeKey, action, role: 'workStatus' });
      }
    }
  }

  const whisper = takeAll('whisper', [ROLE_CATEGORY.whisper], 3);

  // ---- 随机小动作（分类池）----
  const excludeCategories = new Set([
    ROLE_CATEGORY.turn,
    ROLE_CATEGORY.drag,
    ROLE_CATEGORY.click,
    ROLE_CATEGORY.balance,
    ROLE_CATEGORY.work,
    ROLE_CATEGORY.whisper,
    ROLE_CATEGORY.move
  ]);
  const preferred = (character.random?.categories ?? []).filter((category) => !excludeCategories.has(category));
  // 每个分类下记录动作所属的来源（rank），否则跨来源同名分类会把 gpt 的动作错记到 gpt1 的文件名下
  const categoryStats = new Map(); // category -> { actions: [{ action, rank }] }
  sources.forEach((source, rank) => {
    for (const action of source.pack.actions) {
      if (excludeCategories.has(action.category)) continue;
      if (!categoryStats.has(action.category)) categoryStats.set(action.category, { actions: [] });
      categoryStats.get(action.category).actions.push({ action, rank });
    }
  });

  const categoryOrder = [
    ...preferred.filter((category) => categoryStats.has(category)),
    ...[...categoryStats.keys()]
      .filter((category) => !preferred.includes(category))
      .sort((a, b) => categoryStats.get(b).actions.length - categoryStats.get(a).actions.length)
  ];

  const perCategory = all ? Number.POSITIVE_INFINITY : Math.max(1, character.random?.perCategory ?? 2);
  const maxRandom = all ? Number.POSITIVE_INFINITY : Math.max(0, character.random?.max ?? 18);
  const randomPicked = [];
  for (const category of categoryOrder) {
    const stats = categoryStats.get(category);
    if (!stats) continue;
    let count = 0;
    for (const entry of stats.actions) {
      if (randomPicked.length >= maxRandom) break;
      if (count >= perCategory) break;
      const action = entry.action;
      if (used.has(action.id)) continue;
      take(sources[entry.rank].pack, action, 'random');
      randomPicked.push({ category, id: action.id, pack: sources[entry.rank].pack.storeKey });
      count += 1;
    }
    if (randomPicked.length >= maxRandom) break;
  }

  // 显式点名（random.pick）：不管分类顺序，直接追加到随机小动作池（按它自己的分类分组）
  for (const name of character.random?.pick ?? []) {
    const safe = safeActionName(name);
    for (const source of sources) {
      const action = source.pack.byId.get(safe);
      if (!action || used.has(action.id)) continue;
      take(source.pack, action, 'random');
      randomPicked.push({ category: action.category || '精选', id: action.id, pack: source.pack.storeKey });
      break;
    }
  }

  // ---- 按分类聚合 + 权重分配（总和 = 100 - idle - turn - move）----
  const idleWeight = 10;
  const turnWeight = turn.length > 0 ? 5 : 0;
  const moveWeight = moveActions.length > 0 ? 5 : 0;
  let budget = 100 - idleWeight - turnWeight - moveWeight;

  const grouped = new Map();
  for (const item of randomPicked) {
    if (!grouped.has(item.category)) grouped.set(item.category, []);
    grouped.get(item.category).push(item.id);
  }
  const categoryKeys = [...grouped.keys()];
  const weights = distributeWeights(budget, categoryKeys.map((key) => grouped.get(key).length));
  budget = weights.reduce((sum, n) => sum + n, 0); // 正常等于预算

  const animations = {
    idle,
    turn,
    drag,
    clicks,
    moves: {
      default: { minDist: 60, maxDist: 240, margin: 20, leadSec: 2, tailSec: 2 },
      actions: moveActions.map((name) => ({ name }))
    },
    categories: categoryKeys.map((key, index) => ({
      id: key,
      weight: weights[index],
      actions: grouped.get(key)
    })),
    events: {
      balance,
      ...(workStatus.length > 0 ? { workStatus } : {}),
      ...(whisper.length > 0 ? { whisper } : {})
    }
  };

  const animationWeights = { idle: idleWeight, turn: turnWeight, move: moveWeight };

  // 去重（同一动作可能被两个池引用；这里只保留一个文件，配置里允许重复引用）
  const files = [...new Map(picked.map((item) => [`${item.storeKey}/${item.action.id}`, item])).values()].map((item) => ({
    storeKey: item.storeKey ?? item.pack,
    id: item.action.id,
    role: item.role,
    category: item.action.category,
    spritesheet: item.action.spritesheet ?? null,
    sourceWebp: item.action.sources?.webp ?? null
  }));

  return {
    character,
    animations,
    animationWeights,
    files,
    stats: {
      total: files.length,
      idle: idle.length,
      turn: turn.length,
      drag: drag.length,
      clicks: clicks.length,
      moves: moveActions.length,
      random: randomPicked.length,
      categories: categoryKeys.length
    }
  };
}

/** 把 budget 按各分类动作数分配成整数权重，每类至少 5；保证总和正好 = budget */
function distributeWeights(budget, counts) {
  if (counts.length === 0) return [];
  if (counts.length === 1) return [budget];
  const total = counts.reduce((sum, n) => sum + n, 0);
  const raw = counts.map((count) => (count / total) * budget);
  const base = raw.map((value) => Math.max(5, Math.floor(value)));
  let diff = budget - base.reduce((sum, n) => sum + n, 0);
  // 多退少补：从最大项慢慢挪，保证每项 >= 5
  let guard = 0;
  while (diff !== 0 && guard < 10_000) {
    guard += 1;
    const order =
      diff > 0
        ? [...base.keys()].sort((a, b) => raw[b] - base[b] - (raw[a] - base[a]) || base[b] - base[a])
        : [...base.keys()].sort((a, b) => base[b] - base[a]);
    const index = order[0];
    if (diff > 0) {
      base[index] += 1;
      diff -= 1;
    } else if (base[index] > 5) {
      base[index] -= 1;
      diff += 1;
    } else {
      break;
    }
  }
  return base;
}

/** 为所有要安装的形象 + 预览专用形象做选材 */
export function selectAll({ characters, previewOnly = [] }, catalog, options) {
  return {
    characters: characters.map((character) => selectCharacter(character, catalog, options)),
    previewOnly: previewOnly.map((character) => selectCharacter(character, catalog, options))
  };
}

/** 稳定短 id（预留：需要给动作生成 hash 名时用） */
export function shortHash(text) {
  return createHash('sha1').update(text).digest('hex').slice(0, 8);
}
