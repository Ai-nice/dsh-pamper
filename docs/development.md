# 开发与扩展指南

本文面向想改选材规则、加形象、调整小小桌宠角色或排查构建问题的开发者。安装/卸载请看 [INSTALL.md](../INSTALL.md)，pet pack 字段契约见 [pet-pack-format.md](pet-pack-format.md)。

---

## 1. 设计概览

本项目是一条**离线素材生产流水线**，把两个上游项目的素材转换成 dsh-pet 能直接加载的 pet pack：

- **aboutme-pets**：商店里的「WebP 精灵图」→ 逐帧裁切 → 透明 WebM（3 个形象）；
- **小小桌宠（xiaoxiao-zhuochong）**：现成的透明 VP9 WebM → 规范化（缩放/补边/重编码）+ 配置生成（5 个角色）。

```text
本地素材源（默认 D:\PC\DSH\桌面宠物源代码，可用 DESKTOP_PET_SOURCE_ROOT 覆盖）
├─ pet素材\（aboutme-pets 快照，约 1.4 GiB）
└─ xiaoxiao-zhuochong桌面源代码\（小小桌宠源码 + 成品 WebM + 头像）
        │
        ▼
① fetch-catalog → catalog/ 商店快照（本地优先，缺失才联网）
② fetch-assets  → assets/spritesheet-cache/（webp + json）
③ convert-spritesheets → dist/pet/aboutme-*-animation/*.webm（CRF 20）
④ build-configs → dist/pet/aboutme-*-config.json + preview/manifest.json
⑤ build-xiaoxiao-packs → dist/pet/xiaoxiao-*-animation/*.webm + *-config.json + *-avatar.png（CRF 28，640×360）
   汇总 dist/manifest.json
        │
        ▼
install → %DSH_HOME%/dsh-pet/pet/（8 个 pack；aboutme 3 + xiaoxiao 5）
```

关键设计：

- **零 npm 依赖**：只用 Node 内置模块（`fetch`、`fs/promises`、`child_process`、`http`）和本机 ffmpeg。
- **产物即配置**：`dist/pet/` 已经是完整 pet pack，安装只做校验 + 复制，便于离线分发。
- **本地优先**：构建期先读本地素材源，aboutme 缺失才联网；xiaoxiao 素材必须本地存在（无网络回退）。
- **只动 aboutme-\* / xiaoxiao-\***：安装/卸载都以这两个前缀为界，不可能误删 dsh-pet 自带 pack。
- **默认只开一只**：8 个 pack 分发时 `display=none`，安装/开机后只显示 dsh-pet 内置的 `main`；用户在设置页按需逐只开启（见 §7）。
- **运行期可选补丁**：`patch-dsh-pet.mjs` 给 dsh-pet 右键菜单加「退出回家」（改插件运行期文件、有 `.dshpet-backup` 备份、升级后需重跑）。
- **两套素材、一条安装链**：aboutme（精灵图 → WebM）与 xiaoxiao（WebM → 规范化 WebM）最终都产出同构 pet pack。

### 文件职责

| 路径 | 职责 |
| --- | --- |
| `config/characters.mjs` | aboutme 形象清单：来源 pack、随机动作规则、尺寸/位置/人设/工作状态文案 |
| `config/xiaoxiao.mjs` | 小小桌宠 5 角色：`kind` / `source` / `name` / `size` / `display` / `position` / 四个功能开关 |
| `scripts/lib/paths.mjs` | 项目根、商店源、缓存/产物/安装目录、**本地素材源**（`LOCAL_SOURCE_ROOT` / `LOCAL_STORE_ROOT` / `XIAOXIAO_ROOT` / `XIAOXIAO_CHARACTERS_DIR` / `XIAOXIAO_ASSETS_DIR`）、`isMain` |
| `scripts/lib/select.mjs` | aboutme 选材：从商店动作清单挑选动画池、分配分类权重（含 `random.pick`） |
| `scripts/fetch-catalog.mjs` | 抓商店目录/各包清单（本地 `pet素材` 优先，缺失回退 CDN/raw） |
| `scripts/fetch-assets.mjs` | 只下载/复制「会被打包」的 aboutme 精灵图与同名 json；带并发池 |
| `scripts/convert-spritesheets.mjs` | aboutme 精灵图按 8 列网格裁切 → `libvpx-vp9` + `yuva420p` 透明 WebM |
| `scripts/build-configs.mjs` | 生成 aboutme pet pack 配置、`preview/manifest.json`（aboutme 4 形象） |
| `scripts/build-xiaoxiao-packs.mjs` | 小小桌宠 5 角色：规范化源 WebM → 640×360、生成配置、复制头像 |
| `scripts/build.mjs` | 组合 ①→⑤ + 汇总 `dist/manifest.json`，支持分段跳过 |
| `scripts/install.mjs` | 校验全部 8 个 pack（含 avatar）后复制到 pet 目录 |
| `scripts/uninstall.mjs` | 只删除 `aboutme-*` / `xiaoxiao-*` 的 config / animation / avatar |
| `scripts/patch-dsh-pet.mjs` | 给已安装的 dsh-pet 补「退出回家」右键菜单（桌面 + 网页；幂等，`.dshpet-backup` 备份） |
| `scripts/serve.mjs` | 零依赖静态服务器（两个预览页） |

---

## 2. 形象配置

### 2.1 aboutme 形象（config/characters.mjs）

`CHARACTERS` 的每一项 = 一个装机形象（pet pack）；`PREVIEW_ONLY_CHARACTERS` 只用于预览页（当前是 dsh-pet 自带的蓝毛小女仆，不安装）。

| 字段 | 说明 |
| --- | --- |
| `kind` | pet pack 前缀，也是安装后的文件名与素材根：`<kind>-config.json` + `<kind>-animation\`。 |
| `name` | 显示名（写进 `pets[0].name` 与预览页）。 |
| `coverStorePack` | 预览页头像用哪个商店包的 `avatar.webp`。 |
| `size` | 默认宽度 px（高度自动 9:16）。 |
| `display` | `none` / `web` / `desktop` / `both`；**本项目 3 个 aboutme 默认 `none`**（不显示，设置页开启）。 |
| `position` | `{ corner, marginX, marginY }`，决定默认出现位置。 |
| `balanceEnabled` / `whisperEnabled` / `workStatusEnabled` / `fixedEnabled` | 四个实例开关。aboutme 默认关闭余额与碎碎念、开启工作状态联动与固定。 |
| `whisperPrompt` | 条目级人设（碎碎念/对话 system 提示词）。 |
| `workStatusTexts` | 工作状态六档气泡文案（二维数组，顺序必须与 `events.workStatus` 档位一致）。 |
| `sources` | 素材来源：`{ pack, label, essential }`。按数组顺序查找；`essential: false` 的包只用于补充随机小动作。 |
| `random.max` | 随机小动作总数上限（默认 18，控制体积与转换时间）。 |
| `random.perCategory` | 每个分类最多挑几个（默认 2）。 |
| `random.categories` | 优先分类列表（写在前面的优先），未列出的分类按动作数量从多到少补充。 |
| `random.pick` | 点名的动作名数组：在分类抽样之后精确追加到随机小动作池（按动作原本分类归组）；不受 `random.max` 限制，已被必需池占用的动作会跳过；名字会做 Windows 文件名安全化。 |

#### 新增一个 aboutme 形象

1. 在 `CHARACTERS` 里加一项（`kind` 必须唯一）：

   ```js
   {
     kind: 'aboutme-neko',            // 必须唯一，且只用 [a-z0-9-]
     name: '新形象',
     coverStorePack: 'gpt',           // 商店里已有的包
     size: 420,
     display: 'none',                // 默认不显示；安装后到设置页启用
     position: { corner: 'top-right', marginX: 24, marginY: 100 },
     balanceEnabled: false,
     whisperEnabled: false,
     workStatusEnabled: true,
     fixedEnabled: true,
     whisperPrompt: '你是……',
     sources: [{ pack: 'claude', label: '来源', essential: true }],
     random: { max: 18, perCategory: 2, categories: ['玩耍', '吃喝'] }
   }
   ```

2. 确认来源商店包已在 `catalog/pets/` 下；没有就先跑 `node scripts/fetch-catalog.mjs`（本地 `pet素材` 缺失时会联网）。
3. `node scripts/build.mjs` → `node scripts/install.mjs`。
4. 刷新 DSH，「种类」条会出现 `aboutme-neko`。

删除一个形象：从 `CHARACTERS` 移除即可；随后跑 `node scripts/build.mjs --skip-fetch` 重新生成（旧的 `dist/pet` 产物可手动删除或用 `node scripts/uninstall.mjs --purge-dist`）。

### 2.2 小小桌宠角色（config/xiaoxiao.mjs）

`XIAOXIAO_CHARACTERS` 的每一项 = 一个 xiaoxiao pet pack：

| 字段 | 说明 |
| --- | --- |
| `kind` | pet pack 前缀（`xiaoxiao-ojousama` 等），决定安装后的文件名与素材根。 |
| `source` | 上游角色目录名：`characters\<source>\`（如 `ojousama`、`character3`…`character6`）。 |
| `name` | 显示名（写进 `pets[0].name` 与预览卡片）。 |
| `size` | 默认宽度 px（xiaoxiao 为 300–320，比 aboutme 的 420 小）。 |
| `display` | 默认 `none`：不显示，但与 aboutme 一起列在设置页「种类」里，按需开启。 |
| `position` | 默认四角分散摆放的角落与偏移。 |
| `balanceEnabled` / `whisperEnabled` / `workStatusEnabled` / `fixedEnabled` | 四个功能开关；xiaoxiao 默认全 `false`，以点击回应与随机小动作为主。 |

「小小桌宠」上游共 6 个角色（含与 dsh-pet 重复的蓝毛小女仆 `main`），本项目只取 5 个额外角色；`main` 不重复安装。

#### 新增 / 调整 xiaoxiao 角色

1. 在上游 `xiaoxiao-zhuochong桌面源代码\characters\` 下确认有 `config.json`、`animations\*.webm`、`人设.json`，以及 `android\assets\<source>\portrait.png`；
2. 在 `config/xiaoxiao.mjs` 里加一项（`source` 指向上游目录名）；
3. `node scripts/build-xiaoxiao-packs.mjs --force` → `node scripts/install.mjs --force`；
4. 刷新 DSH，新种类会出现在「桌宠配置 → 种类」里。

只想调尺寸/位置/显示方式时，改 `config/xiaoxiao.mjs` 后重新构建该步即可；只想改人设时，改上游 `人设.json` 或直接改 `dist\pet\xiaoxiao-*-config.json` 的 `whisperPrompt` 后重装（注意 `build-xiaoxiao-packs.mjs` 会重新覆盖配置）。

---

## 3. 选材算法（aboutme：scripts/lib/select.mjs）

`selectCharacter()` 对一个形象按以下顺序选动作（同一动作不会重复占用）：

1. **必需池**（按 `sources` 顺序、在指定分类里取，上限即括号内数字）：
   - `idle` ← 分类「待机」（最多 2）：优先「待机呼吸休闲 / 待机呼吸* / 待机*」，并跳过「小憩 / 沉眠 / 打瞌睡 / 睡觉」这类睡眠动作（睡觉交给 dsh-pet 的 sleep 功能，这些动作只会进随机小动作池）
   - `turn` ← 分类「转向」（最多 1）
   - `drag` ← 分类「拖拽」（最多 1）
   - `clicks` ← 分类「点击回应」（最多 4）
   - `moves` ← 分类「移动」（最多 2）
2. **余额事件**：找第一个含「余额」动作的来源，用关键词填满 6 档（钱袋满溢 / 金袋叮当 / 钱袋如常 / 数金皱眉 / 袋空如洗 / 分文不剩），缺档时用同分类其它动作或相邻档兜底，**保证 6 个非空名字**（dsh-pet 要求 `events.balance` 非空）。
3. **工作状态事件**：找第一个含「工作状态」动作的来源，按 6 档关键词（思考 / 忙碌 / 清点·整理·归档 / 踱步·等待·张望 / 雀跃·庆祝·成功·完成 / 垂头·叹气·冒汗·出错）填满。
4. **碎碎念**：分类「碎碎念」最多 3 个。
5. **随机小动作**：
   - 排除已作为专用池使用的分类（转向/拖拽/点击回应/余额/工作状态/碎碎念/移动）；
   - 分类顺序 = `random.categories` 中命中且存在的分类在前，其余按动作数量从多到少；
   - 每类最多 `perCategory` 个，总数不超过 `random.max`；
   - `--all` 时 `perCategory` 与 `max` 视为无限；
   - 最后追加 `random.pick` 点名的动作：按名字（安全化后）在各 `sources` 里查找，跳过已占用项，按动作原本分类归组；**不受 `random.max` 限制**。
6. **权重分配**：`idle = 10`；有转向则 `turn = 5`，有移动则 `move = 5`；剩余预算（100 − 三者）按各分类动作数分配整数权重，每类至少 5，保证总和正好 100。点名动作会改变其所属分类的动作数，从而影响该分类权重。
7. **去重**：同一来源的同一动作只保留一份文件，但配置里允许被多个池引用（例如同一个动作既在 `clicks` 又在分类池）。

想改变某个形象的风格，通常只需调 `random.categories` 的顺序与 `random.max`；要精确到某个动作名，直接用 `random.pick` 点名即可，无需改代码。

---

## 4. aboutme 转换规格（convert-spritesheets.mjs）

把 640×360、8 列网格的 WebP 精灵图按 `frameCount` / `fps` 逐帧裁出来，再编码成透明 WebM：

- 编码器：`libvpx-vp9`，`-pix_fmt yuva420p`，`-crf 20`（可调），`-b:v 0`，`-row-mt 1`；
- 帧率：源 json 里的 `SampleFps`（默认 12）；
- 裁切：`crop=640:360:x='mod(n,8)*640':y='floor(n/8)*360'`；
- 透明：`-auto-alt-ref 0` + `-alpha_mode 1`；旧版 ffmpeg 不认 `-alpha_mode` 时自动去掉重试一次；
- 已存在且非空的 WebM 默认复用（`--force` 重转）。

> 与 dsh-pet 自带素材一致：VP9-alpha，Chrome / Edge / Firefox / Electron 桌面模式可播；Safari 不支持 VP9 alpha。

性能建议：`--jobs=N`（默认 4）控制并发；`--crf=24~28` 可显著减小体积；重复构建用 `--force` 时已存在的精灵图缓存与 WebM 按需重做。

---

## 5. 小小桌宠构建（build-xiaoxiao-packs.mjs）

### 5.1 源结构

```text
<DESKTOP_PET_SOURCE_ROOT>\xiaoxiao-zhuochong桌面源代码\
├─ characters\<source>\
│  ├─ config.json     与 dsh-pet 同构的动画池（idle/turn/drag/clicks/moves/categories/events）
│  ├─ 人设.json       角色人设（取 whisperPrompt 首段）
│  └─ animations\*.webm   现成透明 VP9 WebM（1280×720 或 1280×960 混用）
└─ android\assets\<source>\portrait.png   角色头像
```

### 5.2 规范化规则（`normalizeAnimations`）

1. `idle` / `turn` / `drag` / `clicks` / `moves.actions` / `categories[].actions` / `events.*` 中凡是素材目录里没有同名 `.webm` 的项全部丢弃；
2. `idle` 为空时取素材里第一个动画；`moves.default` 缺失时用 `{minDist:60,maxDist:240,margin:20,leadSec:2,tailSec:2}`；
3. `events.balance` 缺失/为空时用 6 个 `idle[0]` 填满（dsh-pet 硬性要求非空），`events.workStatus`/`whisper` 有就保留；
4. `animationWeights` 固定 `{ idle:10, turn:5|0, move:5|0 }`；分类池按源权重比例把剩余预算分配成整数（每类至少 1）；
5. 不写 `sleep` / `baifan`：上游这些角色没有对应玩法，省略即合法。

### 5.3 视频规范化

`transcode()` 用 ffmpeg 把源 WebM 统一成 dsh-pet 播放器友好的规格：

- 解码：显式 `-c:v libvpx-vp9`（ffmpeg 原生 VP9 解码器默认不导出 alpha，直接解码会丢透明）；
- 滤镜：`scale=640:360:force_original_aspect_ratio=decrease:flags=lanczos` + `pad=640:360:...:color=#00000000` + `format=yuva420p`（保持比例、透明补边）；
- 编码：`libvpx-vp9`、`-auto-alt-ref 0`、`-crf 28`（默认，可用 `--crf` 覆盖）、`-alpha_mode 1`、`-metadata:s:v:0 alpha_mode=1`、`-an`（无音轨）；
- 已存在且非空的产物默认复用（`--force` 重转）。

### 5.4 头像

源 `android\assets\<source>\portrait.png` 复制为 `dist\pet\<kind>-avatar.png`（当前 320×240 PNG），安装时一起复制到 `%DSH_HOME%\dsh-pet\pet\<kind>-avatar.png`。dsh-pet 按 `<素材根>-avatar.<ext>` 识别自定义头像；aboutme 没有头像，回退插件包内 logo。

### 5.5 参数与重跑

| 参数 | 说明 |
| --- | --- |
| `--force` | 已存在的产物也重新转码 |
| `--crf=N` | VP9 质量（默认 28） |
| `--jobs=N` | 并发 ffmpeg 数（默认 6） |

只重建小小桌宠：`node scripts/build-xiaoxiao-packs.mjs [--force]` → `node scripts/install.mjs --force`。`build.mjs --skip-xiaoxiao` 则跳过这一步。

---

## 6. 头像机制

dsh-pet 支持 pet pack 自定义头像（对话面板/悬浮图）：

- 文件：`%DSH_HOME%\dsh-pet\pet\<前缀>-avatar.<ext>`，`<ext>` ∈ png/webp/jpg/jpeg/gif；按**素材根**归属，同一前缀的多只实例共用一张；
- `main` 条目永远用插件包内 logo，不允许自定义；aboutme 没有配置头像，也回退包内 logo；
- 本项目 xiaoxiao 5 个角色带头像；替换头像有两种方式：换上游 `portrait.png` 后重建，或直接替换 `dist\pet\<kind>-avatar.png` 后 `node scripts/install.mjs --force`。

---

## 7. 默认 display=none 与「退出回家」补丁

### 7.1 display 默认 none

- 本项目分发的 8 个 pack 在配置里全部写 `display: none`（`config/characters.mjs` 与 `config/xiaoxiao.mjs` 的 `display` 字段）：pet pack 正常安装、种类与实例都在设置页列出，但**默认不显示**。首次安装/开机只会看到 dsh-pet 内置的 `main`（沿用用户 `main-config.jsonc`，本机为仅桌面）。
- 开启：设置页把某实例「显示位置」改为 `web` / `desktop` / `both` 并保存，写回该 pack 的 `<前缀>-config.json`，宿主重载后显示；改回 `none` 即隐藏。
- 永久改默认：改 `config/characters.mjs` / `config/xiaoxiao.mjs` 的 `display` 后重建安装。注意重新安装会覆盖安装目录里的配置，`display` 会回到新默认值。
- 合法值由 dsh-pet 的 `shared/config`（`PET_DISPLAYS`）决定：`none` / `web` / `desktop` / `both`；写非法值会被配置校验告警并回退。
- 为什么默认 `none`：避免安装后 8 个新形象 + `main` 同时涌上屏幕/桌面（遮挡、多个 Electron 窗口、资源占用）；改为用户按需逐只开启，默认「只开一只」。

### 7.2 「退出回家」补丁（scripts/patch-dsh-pet.mjs）

dsh-pet 原生右键菜单没有「退出这一只」的快捷项，项目附带运行期补丁：

- 生效位置：**桌面透明窗** 与 **网页 overlay** 的右键菜单（分别修改 `<dsh-pet>\runtime\electron-helper\sprite\menu.js` 与 `<dsh-pet>\lib\client.js`；首次修改前各生成 `.dshpet-backup`）。
- 行为：点击「退出回家」= 复用 dsh-pet 自带的 `set-display` 通道（`POST /pet-display`，`display: 'none'`）→ 只让该实例退出，其它宠物不受影响；设置页可把显示位置改回来。
- 命令：
  - `node scripts/patch-dsh-pet.mjs` 应用（幂等，已打过跳过）
  - `--check` 只报告状态
  - `--revert` 从 `.dshpet-backup` 还原
  - `--package=<dir>` 指定 dsh-pet 包目录（默认 `$DSH_PROFILE_DIR\node_modules\dsh-pet`；普通终端找不到时显式指定 `<DSH_HOME>\profiles\<profile>\node_modules\dsh-pet`）
- 生效：重载 dsh-pet（桌面右键宠物 →「重载配置」）或刷新 DSH 页面。
- **dsh-pet 升级/重装会覆盖这两个文件，补丁丢失，需要重跑脚本**；脚本按锚点插入，若上游结构变化会报 `anchor-missing`，需要人工适配。
- 补丁修改的是 dsh-pet 插件运行期文件，不属于 pet pack 格式；卸载本项目 pet pack 不会自动还原补丁（用 `--revert`）。

---

## 8. 产物说明

### 8.1 dist/pet/

```text
dist/pet/
├─ aboutme-dragon-config.json        aboutme-dragon-animation/    （41 个 WebM）
├─ aboutme-claude-config.json        aboutme-claude-animation/    （38）
├─ aboutme-gemini-config.json        aboutme-gemini-animation/    （41）
├─ xiaoxiao-ojousama-config.json     xiaoxiao-ojousama-animation/   xiaoxiao-ojousama-avatar.png （19）
├─ xiaoxiao-huangmao-config.json     xiaoxiao-huangmao-animation/   xiaoxiao-huangmao-avatar.png （12）
├─ xiaoxiao-bailong-config.json      xiaoxiao-bailong-animation/    xiaoxiao-bailong-avatar.png （12）
├─ xiaoxiao-heihu-config.json        xiaoxiao-heihu-animation/      xiaoxiao-heihu-avatar.png （8）
└─ xiaoxiao-naicha-config.json       xiaoxiao-naicha-animation/     xiaoxiao-naicha-avatar.png （10）
```

当前一次完整构建的实测数据（aboutme CRF 20 / xiaoxiao CRF 28，640×360）：

| 种类 | 动画数 | WebM 体积 |
| --- | --- | --- |
| `aboutme-dragon` | 41 | 58.3 MiB |
| `aboutme-claude` | 38 | 47.9 MiB |
| `aboutme-gemini` | 41 | 52.5 MiB |
| `xiaoxiao-ojousama` | 19 | 18.2 MiB |
| `xiaoxiao-huangmao` | 12 | 9.0 MiB |
| `xiaoxiao-bailong` | 12 | 8.8 MiB |
| `xiaoxiao-heihu` | 8 | 3.7 MiB |
| `xiaoxiao-naicha` | 10 | 4.1 MiB |
| **合计** | **181** | **202.6 MiB** |

配套占用：`assets/spritesheet-cache/` 约 217.1 MiB（240 个文件）、`.build-tmp/` 约 7.3 MiB；整个项目目录约 **429 MiB**。想减小产物体积可提高 `--crf`（aboutme 24~28），或在 `config/characters.mjs` 里降低 `random.max`。

### 8.2 dist/manifest.json（新格式）

`build.mjs` 的最后一步扫描 `dist/pet` 汇总（`aboutme-*` / `xiaoxiao-*`）：

```jsonc
{
  "generatedAt": "2026-11-09T06:33:05.610Z",
  "store": { /* aboutme-pets 商店源 */ },
  "totals": { "packs": 8, "animations": 181, "bytes": 212442137 },
  "packs": [
    {
      "kind": "aboutme-dragon",
      "name": "白龙娘",
      "petId": "aboutme-dragon-1",
      "size": 420,
      "display": "none",
      "position": { "corner": "top-left", "marginX": 24, "marginY": 100 },
      "animations": 41,
      "bytes": 61161757,
      "avatar": "xiaoxiao-bailong-avatar.png",   // 仅 xiaoxiao 有
      "configPath": "...",
      "animationDir": "..."
    }
  ]
}
```

`dist/manifest.json` 是**数字的唯一事实来源**：预览页、INSTALL 文档、验收都按它核对。

### 8.3 preview/manifest.json 与预览页

- `preview/manifest.json`：aboutme 预览页数据（`generatedAt` / `cdn` / `store` / 4 个角色：内置 `aboutme-main` + 3 个 aboutme 新形象，含远程精灵图 URL 与网格参数），由 `build-configs.mjs` 生成。
- `preview/`（index.html + app.js + styles.css）：aboutme 4 形象精灵图舞台，CDN 加载。
- `preview/all-characters.html`：读取 `dist/manifest.json` 与 `dist/pet/*-config.json`，直接播放**本地** `dist/pet/*-animation/*.webm`，8 个新 pack 各一张卡片（头像/动画数/尺寸/display/角落 + 换动作/回到待机）。必须通过 HTTP 打开且需要先构建。

> 8 个 pack 配置里的 `display` 均为 `none`；上面的 dist 产物、数字与体积不受影响，只是默认不在 DSH 里显示（见 §7.1）。

---

## 9. 缓存与清理

| 路径 | 内容 | 清理 |
| --- | --- | --- |
| `catalog/` | 商店快照（pets.json、actions.json、封面） | 可删；重新 `fetch-catalog` |
| `assets/spritesheet-cache/<pack>/` | aboutme 精灵图 webp + json（约 217 MiB） | 可删；重新构建会下载/复制 |
| `dist/pet/` | 8 个 pack 的 WebM、配置、头像（约 203 MiB） | `node scripts/uninstall.mjs --purge-dist` 或手动删 |
| `.build-tmp/` | 构建临时文件 | 可删 |
| `%DSH_HOME%/dsh-pet/pet/aboutme-*`、`xiaoxiao-*` | 安装后的 pet pack | `.\uninstall.ps1` 或 `node scripts/uninstall.mjs` |
| 本地素材源（默认 `D:\PC\DSH\桌面宠物源代码`） | 外部只读引用，不属于本项目产物 | **不要删**（构建要用） |

> 注意：`catalog/` 里的 NOTICE 与素材许可信息请勿删除后再分发；本仓库本身不包含素材本体。

---

## 10. 本地预览与验收

```powershell
node scripts/serve.mjs
# aboutme 4 形象精灵图舞台：http://127.0.0.1:8899/preview/
# 8 个新形象本地 WebM 卡片：http://127.0.0.1:8899/preview/all-characters.html
```

构建/脚本自检：

```powershell
# 语法检查（Node 22+ 支持对 .mjs 做 --check）
node --check scripts\build.mjs
node --check scripts\build-xiaoxiao-packs.mjs
node --check scripts\lib\select.mjs
node --check config\characters.mjs
node --check config\xiaoxiao.mjs

# 各脚本帮助
node scripts\build.mjs --help
node scripts\build-xiaoxiao-packs.mjs --help
node scripts\fetch-assets.mjs --help
node scripts\convert-spritesheets.mjs --help
node scripts\build-configs.mjs --help
node scripts\install.mjs --help
node scripts\uninstall.mjs --help
node scripts\serve.mjs --help

# 安装计划预览（需要先有 dist/pet 产物；应列出 8 个 pack）
node scripts\install.mjs --dry-run

# 卸载预览
node scripts\uninstall.mjs --dry-run
.\uninstall.ps1 -WhatIf
```

完整验收：构建 → 安装 → 刷新 DSH → 设置页出现 8 个种类（`display=none`，桌面只显示内置 `main` 一只）→ 在设置页启用其中一只并保存，宠物出现 → 点击/拖拽/工作状态动画正常 → `logs.txt` 无配置告警 → `preview/all-characters.html` 8 张卡片都能播放 →（可选）`node scripts/patch-dsh-pet.mjs --check` 两个文件为 patched/already、右键菜单出现「退出回家」。

---

## 11. 许可与提交注意

- 本项目代码 MIT；**第三方素材许可各不相同**：
  - dsh-pet 素材 CC BY-NC-SA 4.0（署名—非商业性使用—相同方式共享），公开二创须署名 <https://github.com/PC2005-cloud/dsh-pet>；
  - aboutme-pets 素材禁止商用；来源 <https://github.com/hunmer/aboutme-pets>；
  - 小小桌宠（xiaoxiao-zhuochong）素材 MIT（其 LICENSE 保留 dsh-pet 原 MIT 声明；新增角色/动画/图标由小小桌宠作者创作），公开使用/再分发请署名 <https://github.com/yshuang722-spec/xiaoxiao-zhuochong> 与 <https://github.com/PC2005-cloud/dsh-pet>。
- 建议 `.gitignore` 排除 `catalog/`、`assets/`、`dist/`、`.build-tmp/`（生成物/第三方素材缓存，体积大）。发布产物前请附带许可与署名说明。
- 本地素材源（约 1.4 GiB）不要提交进仓库。

---

## 12. 已知限制

- `install.mjs` / `uninstall.mjs` 的 `--help` 文案目前仍按 aboutme 描述；实际行为已覆盖 `aboutme-*` 与 `xiaoxiao-*`（含 avatar），以本文件与 README 为准。
- 小小桌宠只做**规范化**，不新增动画；上游没有的动作不会出现在 pack 里。`sleep` / `baifan` 不写入配置，因此这些角色没有睡觉/吃白饭玩法。
- `preview/` 精灵图舞台只展示 aboutme 4 形象；xiaoxiao 5 角色请看 `preview/all-characters.html` 或安装后的 DSH 页面。
- `preview/all-characters.html` 依赖构建产物并通过 HTTP 打开；`file://` 无法加载 manifest/WebM。
- 8 个 pack 默认 `display=none`：安装后只显示内置 `main` 一只，需要在设置页逐只开启（见 §7.1）；重新安装会让 display 回到 none。
- 「退出回家」补丁改的是 dsh-pet 插件运行期文件：dsh-pet 升级/重装后需重跑 `patch-dsh-pet.mjs`，上游菜单结构变化时脚本会报 `anchor-missing` 需要人工适配。


---

## 13. 运行期补丁（2026-11 追加）

`scripts/patch-dsh-pet.mjs` 在已安装 dsh-pet 上叠加四类改动：

- `lib/client.js`：`sidebar.panellist` id=`pet-love`（label 宠爱）+ `main` key=`pet-love` 面板（复用 `PetConfigSection`）；`usePetList` 的 `petKinds`/`visiblePets`/`selectKind`/`add`/`replace` 改为按型号分组；`KindTabs` 显示分组标签。
- `runtime/electron-helper/sprite/menu.js`：右键菜单追加「退出回家」（action `set-display` + `display: none`）。
- `%DSH_HOME%/dsh-pet/main-config.jsonc`：main 显示名改「大肥鱼」，display 设为 desktop；包内 `assets/config.jsonc` 同步默认名。
- 补丁幂等、带 `*.dshpet-backup`；`--check` / `--revert` / `--package=`。dsh-pet 升级后 anchor 可能变化，脚本会报 `anchor-missing`。

- 宠爱主面板为两页：`角色`（原生 DOM 渲染的卡片网格，显示图片/动作数/已隐藏角标/开关，开关写 `/pet-display`）与 `桌宠配置`（挂载 `PetConfigSection`，与设置页同一组件）。

- 角色页二次美化：header 圆形刷新+深色添加角色；胶囊 tabs；statsBar 一行 + 白底悬停变黑的三个操作按钮；开关 52×30；卡片右上「详情」文字点击 -> 切配置页并按 group/name 自动点选对应种类与宠物。

- 发现页：client 补丁新增第三个 tab（catalog 内嵌 240×135 首帧缩略图 data URL，避免浏览器解码超大精灵图）；加载走后端插件 /dsh-action-store-7462/load（ffmpeg 精灵图→VP9 alpha WebM，按 action/category/all，合并 config 后 POST /dsh-pet-7340/reload）；action-store-state.json 记录已加载；小女仆首次加载自动建 aboutme-maid 包。
