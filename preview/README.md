# pamper · 多形象静态预览页

纯静态的多形象桌宠预览页：同屏展示 **蓝毛小女仆（dsh）**、**白龙娘（gpt+gpt1）**、
**橙发书娘（claude）**、**紫发猫耳娘（gemini）** 四只形象，用 aboutme-pets 素材商店的
WebP 精灵图逐帧播放动画。零依赖、无构建，只用原生 HTML / CSS / ES module，用于验证
精灵图素材与动作元数据是否可直接在浏览器中驱动。

> **新增：`all-characters.html`（全部形象预览）** —— 直接播放构建产物 `dist/pet/*-animation/*.webm`，
> 同屏展示 8 个新形象：白龙娘 / 橙发书娘 / 紫发猫耳娘（aboutme-pets）+ 橙毛大小姐 / 黄毛该溜子 /
> 白毛小龙娘 / 黑毛小狐狸 / 奶茶千金（小小桌宠）。每张卡片可「换动作 / 回到待机」，
> 数据来自 `../dist/manifest.json` 与各 pack 的 config，无需联网。
> 打开方式（项目根目录）：`node scripts/serve.mjs` → http://127.0.0.1:8899/preview/all-characters.html
> 截图：`all-characters-shot.png`。

## 文件清单

| 文件 | 说明 |
| --- | --- |
| `index.html` | 页面结构：顶栏、形象切换条、舞台、动作库、底部说明 |
| `styles.css` | 全部样式：舞台渐变场景、玻璃拟态面板、浅色/深色主题、响应式 |
| `app.js` | 全部逻辑：加载 manifest、单 rAF 循环驱动所有宠物、精灵图裁剪绘制、拖拽/缩放/暂停/动作库 |
| `manifest.json` | **由项目构建脚本生成**（不在本目录手写），包含 4 个形象与商店全量动作元数据；页面运行时读取 |
| `README.md` | 本文件 |

`manifest.json` 的契约（页面按此消费，缺字段时会尽量推导）：

```jsonc
{
  "generatedAt": "2026-11-08T17:31:30.089Z",
  "cdn": "https://cdn.jsdelivr.net/gh/hunmer/aboutme-pets@main/",
  "characters": [{
    "id": "aboutme-dragon",
    "name": "白龙娘",
    "storePack": "gpt",
    "avatar": "https://cdn.jsdelivr.net/gh/hunmer/aboutme-pets@main/pets/gpt/avatar.webp",
    "actions": [{
      "id": "待机呼吸起伏",
      "name": "待机呼吸起伏",
      "category": "待机",
      "url": "https://cdn.jsdelivr.net/gh/hunmer/aboutme-pets@main/pets/gpt/spritesheet/%E5%BE%85%E6%9C%BA...webp",
      "frameWidth": 640, "frameHeight": 360,
      "columns": 8, "rows": 23, "frameCount": 180, "fps": 12
    }],
    "defaults": {
      "idle": "待机呼吸起伏",
      "clicks": ["点击回应-元气挥手"],
      "categories": [{ "id": "待机", "actions": ["待机呼吸起伏"] }]
    }
  }]
}
```

- `url` / `avatar` 使用绝对 URL，路径段已 `encodeURIComponent`；相对路径会以 manifest 所在目录解析。
- `defaults` 可省略：`idle` 取第一个「待机」分类动作（否则第一个动作），`clicks` 取分类含「点击回应」的动作，`categories` 按动作 `category` 自动分组。
- `manifest.json` 缺失或损坏时，页面会在顶部给出**具体失败原因**（请求地址 / HTTP 状态 / file:// 提示），自动启用少量内置兜底数据（每形象 1 个待机动作），并提供「重试加载」。生成 manifest 后刷新或点重试即可。

## 如何打开

页面通过 HTTP 读取同目录 `manifest.json` 并直连 jsDelivr CDN，**不要直接双击以 `file://` 打开**
（浏览器会拦截本地 JSON 请求）。在 `pamper/` 项目根目录执行：

```bash
node scripts/serve.mjs          # 默认端口 8899，项目根即站点根
# 浏览器打开 http://127.0.0.1:8899/preview/
```

若当前目录就是 `preview/`，等价命令为 `node ../scripts/serve.mjs`。也可以使用任意静态服务器，
例如 `npx serve .`（项目根）或 `python -m http.server 8899`。端口可通过
`node scripts/serve.mjs --port=9000` 调整。

## 功能

- **多形象同屏**：默认按 manifest 顺序在舞台左右错落摆 4 只；「添加形象」每次添加当前舞台上
  数量最少的角色，最多 6 只，同一角色可重复；形象切换条每个头像旁的 `＋` 可添加指定角色。
- **独立精灵图播放**：每只宠物一个 640×360 逻辑画布（后备 1280×720），单一
  `requestAnimationFrame` 循环统一驱动；按 `frameIndex = ⌊elapsed × fps⌋ % frameCount`、
  `sx = (frameIndex % columns) × frameWidth`、`sy = ⌊frameIndex / columns⌋ × frameHeight`
  裁剪绘制。帧号不变时不重绘。
- **点击互动**：点击宠物会选中它，并以 70% 概率播放该形象的「点击回应」动作，否则播放随机
  分类动作；一次性动作播完自动回到待机。点击舞台空白取消选择。
- **拖拽**：指针按住拖动（超过 6px 判定为拖拽，不触发点击），位置限制在舞台内。
- **缩放**：滚轮悬停在宠物上缩放单只（50%–200%）；工具栏 `－/＋` 在未选中时缩放全部。
- **暂停 / 播放**：暂停所有动画（空格快捷键）。
- **重置布局**：恢复默认 4 只形象、初始站位与缩放，并清除暂停状态。
- **动作库**：按分类折叠展示当前形象的全部动作（支持搜索、帧数提示、当前动作高亮）；
  选中宠物时动作只作用于它，未选中时作用于该形象的全部实例。另有「随机动作」「回到待机」。
- **主题**：跟随系统深浅色，可手动切换（记忆在 localStorage）。
- **可访问性**：按钮带中文 aria-label / title，宠物可 Tab 聚焦、回车触发动作。

## 实现要点与取舍

- **内存控制**：单张精灵图是 8 列 × 若干行、约 5120×8280 的拼图（≈42MP，解码后约 170MB）。
  页面在解码时用 `createImageBitmap(..., { resizeWidth/Height })` 将整图缩放到约 **0.65 倍**
  （≈18MP / 70MB 一张），再按缩放后的坐标裁剪；不支持该 API 的浏览器自动退化为原图绘制。
- **加载调度**：同时最多解码 2 张精灵图；点播新动作时旧画面继续播放，加载完成后无缝切换；
  解码位图带 LRU 缓存（预算 500MB，只淘汰未被当前宠物引用的条目），避免反复请求 CDN。
  一次性动作播放期间若已请求新动作，会停在最后一帧等待，不会被“回到待机”冲掉。
- **网络回退**：图片先尝试 `crossOrigin="anonymous"`（jsDelivr 支持 CORS），失败时退回普通
  加载（canvas 会 tainted，但本页不读取像素，不影响显示）。
- **性能**：6 只宠物共享一个 rAF；12fps 动画只在帧号变化时重绘；`will-change: transform`
  用于拖拽；CSS 装饰动画在 `prefers-reduced-motion` 下关闭。

## 自检结果

- `node --check app.js` 通过（单文件、无 import/export，同时以 `<script type="module">` 加载）。
- HTML 标签闭合检查通过；`app.js` 引用的 31 个 DOM id 与 `index.html` 完全对应；无重复 id。
- CSS 花括号平衡、50 个自定义属性全部有定义；页面不加载任何外部 JS（仅同目录 `app.js`）。
- 使用 Node DOM 仿真对 `app.js` 做了运行时冒烟：正常 manifest、manifest 加载失败（兜底数据）、
  精灵图加载失败三种场景均无未捕获异常；验证了 4 只默认形象、加到 6 只的上限、重置、点击回应、
  滚轮缩放、拖拽、暂停、动作库点击/搜索、主题切换、空白取消选择等交互。
- 页面视觉（布局/配色/动画）请在浏览器中打开确认；本仓库的自动化环境无浏览器，未做截图比对。

## 已知限制

- 首次播放某个动作需要从 jsDelivr 下载对应精灵图（1–2.5MB），网络慢时点击后会有短暂“载入中”；
  之后再播同一动作走缓存，基本无延迟。
- 为控制内存做了 0.65 倍解码，因此在浏览器里把宠物放大到 200% 且屏幕为高 DPI 时，画面会略软。
- 依赖浏览器对 WebP 与 `canvas` 的支持（现代 Chrome / Edge / Firefox / Safari 均可）；老浏览器会
  出现素材加载失败提示。
- 远程素材可用性取决于 jsDelivr / aboutme-pets 仓库；离线打开首页时 manifest 本地可读、图片则
  会加载失败，页面会逐只提示并支持重试。
- 页面只读取素材，不写入、不修改任何文件；预览页自身不会调用 DSH 或桌宠插件接口。

## 调整入口

`app.js` 顶部常量即可调整：`MAX_PETS`（同屏上限）、`PET_W`（默认显示宽度）、
`MIN_PET_SCALE` / `MAX_PET_SCALE`（缩放范围）、`BITMAP_SCALE`（解码缩放）、
`IMAGE_LOAD_CONCURRENCY` / `IMAGE_CACHE_BUDGET`（加载与缓存预算）、`DEFAULT_SLOTS`（默认站位）。

## 素材许可

- aboutme-pets 商店素材：**禁止商用**；页面仅通过公开 CDN 引用。
- 蓝毛小女仆素材来自 dsh-pet：CC BY-NC-SA 4.0，此处仅作预览演示。
- 本预览页代码：MIT。
