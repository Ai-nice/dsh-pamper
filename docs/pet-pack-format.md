# dsh-pet pet pack 格式与校验

本文说明 **dsh-pet 如何发现并读取 pet pack**、配置里哪些字段是硬性要求、以及本项目生成的 pack 长什么样。内容依据 dsh-pet **0.4.7** 的 `src/host/config/read.ts`、`src/host/config/validate.ts`、`src/host/routes/assets.ts` 与内置 `assets/config.jsonc` 整理；其它版本可能有差异。

---

## 1. 目录布局与扫描规则

dsh-pet 的用户数据根是 `%DSH_HOME%\dsh-pet\`（`DSH_HOME` 缺省 `%USERPROFILE%\.dsh`）。pet pack 放在其下的 `pet\` 子目录：

```text
%DSH_HOME%\dsh-pet\
├─ main-config.jsonc                用户主配置（main 条目实例；JSONC，可带注释）
├─ pet\
│  ├─ <前缀>-config.json            ← 一个文件 = 一个「种类」（条目）
│  ├─ <前缀>-animation\              ← 该种类的专属动画素材
│  │  ├─ <动作名>.webm
│  │  └─ ...
│  └─ ...
└─ logs.txt                         插件日志
```

规则（0.4.7）：

1. 扫描 `pet\` 下**直接位于该目录**、文件名匹配 `^.+?-config\.(json|jsonc)$` 的文件；`<前缀>` = 去掉 `-config.json(c)` 后的部分，**它同时是条目 key、素材根（assetRoot）**。
2. 每个文件独立成为一个「种类」。设置页「种类」条里的名字就是该前缀；同一前缀下的多只实例共享这一份配置。
3. 动画文件从 `pet\<前缀>-animation\<动作名>.webm` 读取。**只要 `<前缀>-animation\` 目录存在，dsh-pet 就只查这个目录、绝不回落到插件自带素材**；缺哪个文件，哪个动作就 404。
4. 目录名/文件名允许中文，但非法字符（`\ / : * ? " < > |` 与控制字符）会破坏路径；本项目在选材时用 `safeActionName()` 把动作名里的 Windows 非法字符替换为 `_`，配置里写的名字与文件名因此始终一致。
5. 前端通过 `/thumb/<素材根>/<动作名>.webm` 请求素材；素材根同样要过标识符校验（非空、≤64 字符、不含分隔符/保留字符、不能是 `.` 或 `..`）。

> 命名约定：本项目使用 `aboutme-<角色>-config.json` + `aboutme-<角色>-animation\`（白龙娘 / 橙发书娘 / 紫发猫耳娘）与 `xiaoxiao-<角色>-config.json` + `xiaoxiao-<角色>-animation\` + `xiaoxiao-<角色>-avatar.png`（小小桌宠 5 角色）。不要用 `main` 作为前缀（那是内置条目的保留名）。

### 1.1 本地素材源（构建期，不是运行时）

本项目在**构建阶段**优先读取用户本地的两个上游素材目录，而不是插件运行时：

```text
%DESKTOP_PET_SOURCE_ROOT%\             默认 D:\PC\DSH\桌面宠物源代码
├─ pet素材\                            aboutme-pets 仓库快照（约 1.4 GiB）：pets.json + pets/<pack>/spritesheet/*.webp + 同名 json
└─ xiaoxiao-zhuochong桌面源代码\        小小桌宠源码：
   ├─ characters\<角色>\config.json      与 dsh-pet 同构的动画池/权重
   ├─ characters\<角色>\animations\*.webm 现成透明 VP9 WebM（1280×720 / 1280×960）
   ├─ characters\<角色>\人设.json        角色人设（取首段作为 whisperPrompt）
   └─ android\assets\<角色>\portrait.png 角色头像
```

- 环境变量 `DESKTOP_PET_SOURCE_ROOT` 可覆盖默认根目录；两个子目录名保持不变。
- aboutme 素材先查本地、缺失才回退 jsDelivr → raw.githubusercontent；**小小桌宠素材没有网络回退**，必须本地存在。
- 本地素材不会被安装进 DSH；只有构建产物（pet pack）会进 `%DSH_HOME%\dsh-pet\pet\`。

---

## 2. 配置文件结构

pet pack 配置是一份 JSON（本项目生成 `.json`，无注释；dsh-pet 也接受 `.jsonc`）。顶层字段大部分与 dsh-pet 内置 `assets/config.jsonc` 相同，按**条目级**合并：`pet\<前缀>-config.json` 里写了的字段覆盖默认，没写的字段取 dsh-pet 内置默认。

### 2.1 顶层字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `pets` | 是 | 实例数组；每项是设置页里的一只宠物。至少一项。 |
| `animations` | 是 | 动画池；dsh-pet 有硬性结构校验（见 §2.2）。 |
| `animationWeights` | 是 | `{ idle, turn, move }`，三个非负数；控制随机动画链各档概率。 |
| `whisperPrompt` | 建议 | 该种类的人设（碎碎念/对话的 system 提示词）。 |
| `workStatusTexts` | 可选 | 工作状态六档气泡文案，二维数组，顺序与 `events.workStatus` 档位一一对应。 |
| `memes` | 可选 | 表情包名 → 描述映射；本项目生成空对象 `{}`。 |
| `eventsRefreshSec` | 可选 | 事件周期（`balance` / `whisper` / `sleepTalk`），整段替换；不写则用内置默认。 |
| `physics` / `font` / `confineToScreen` / `chatMemoryRounds` / `whisperModel` / `chatModel` 等 | 可选 | 全局默认字段；用户层（`main-config.jsonc`）写一次对所有条目生效，pet pack 顶层写了则只覆盖自己。 |

> dsh-pet 的内置默认值在 `<插件包>\assets\config.jsonc`，注释非常完整，改配置前建议先读它。

### 2.2 `animations`（硬性校验的核心）

dsh-pet 对 `animations` 的校验规则（`validate.ts` 的 `animationsValid`）：

| 字段 | 要求 |
| --- | --- |
| `idle` | **必须是数组**（可为空数组） |
| `turn` | **必须是数组**；每项应是「播完会翻转朝向」的动画 |
| `drag` | **必须是数组**；每项应是「被无形抓起悬空」的姿势 |
| `clicks` | **必须是数组**；点按宠物时随机抽 1 个播放 |
| `moves` | **必须是对象**：`{ default: {...}, actions: [...] }`；`actions` 里每项可覆盖 `default` 的 `minDist` / `maxDist` / `margin` / `leadSec` / `tailSec` |
| `categories` | **必须是数组**；随机小动作按分类池，每项 `{ id, weight, actions: [...] }`，可带 `noMirror: true`（镜像会颠倒文字的动画） |
| `events` | **必须是对象**，且每个事件池都是**非空数组**；且 `events.balance` 必须存在且非空 |
| `sleep` | 可选；写了必须是「套数组」，每套含非空 `start` / `loop` / `end` 字符串数组 |
| `baifan` | 可选；写了必须**恰好 5 个**非空动画名（内置玩法「吃白饭」的槽位） |

`events` 里本项目用到的三个事件：

- `events.balance`：余额展示，**6 档**，索引 = `p === 100 ? 5 : Math.floor(p / 20)`，对应 `[0,20) [20,40) [40,60) [60,80) [80,100) 与 100`。
- `events.workStatus`：工作状态联动，**6 档**，顺序固定：`0 thinking / 1 working / 2 result / 3 waiting / 4 success / 5 error`。新档只能追加到末尾。
- `events.whisper`：碎碎念动画，触发时随机抽 1 个。

> 每个事件档位的值可以是单个动画名，也可以是候选数组（档内随机抽 1）。空字符串、空数组、成员为空串都非法。

### 2.3 `animationWeights` 与分类权重

- `animationWeights` = `{ idle, turn, move }`，每个 ≥ 0。
- 设置页「动作频率」按 `idle + turn + move + 随机动作 = 100` 展示，随机动作占比 = `100 − idle − turn − move`。
- `categories[].weight` 是各随机分类的权重；**所有分类权重之和应与随机动作占比相等**（dsh-pet 内置默认是 10 + 5 + 5 + 80 = 100）。本项目生成时按分类动作数分配整数权重，保证总和 = 100（每类至少 5）。
- `fixedEnabled: true` 的宠物不会自己转向/走开，`turn`/`move` 两档权重按 0 参与随机链。

### 2.4 `pets[]` 实例字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 实例唯一标识，跨全部条目不可重复（程序定位、接口参数、对话记忆都按它）。非法字符/超长会被拒。 |
| `name` | 建议 | 显示名（悬浮提示、AI 人设追加「你的名字是 X」）；可重复，留空按 id 处理。 |
| `size` | 是 | 宽度 px，高度自动 = `size × 9 / 16`。 |
| `balanceEnabled` | 是 | 是否启用余额动画/余额气泡。 |
| `whisperEnabled` | 是 | 是否按周期生成碎碎念（会调用模型）。 |
| `workStatusEnabled` | 是 | 是否跟随 DSH 工作状态切动画并弹气泡（只监听，不调用模型）。 |
| `fixedEnabled` | 建议 | 固定不自己转向/走开；只影响随机链。 |
| `display` | 是 | `none` / `web` / `desktop` / `both`。**本项目 8 个 pack 全部分发 `none`**（都不显示；种类与实例仍列出，设置页可随时开启）。 |
| `position` | 是 | `{ corner: 'top-left'|'top-right'|'bottom-left'|'bottom-right', marginX, marginY }`。 |
| `whisperPrompt` | 可选 | 实例级人设，写了取代条目顶层那份。 |

### 2.5 本项目实际生成的配置（节选）

`node scripts/build-configs.mjs` 生成的内容形如（为篇幅删减了部分分类与动作）：

```jsonc
{
  "whisperPrompt": "你是主人桌面上的Q版白龙娘，白色长发、龙角与龙尾，安静又有点慢热。……",
  "workStatusTexts": [
    ["正在慢慢想呢……", "让龙龙整理一下思路"],
    ["在动手了哦", "这一步交给我吧"],
    ["这一步处理好了，接着来"],
    ["需要你看一下呢", "等你确认一下~"],
    ["这轮完成啦，尾巴摇摇"],
    ["好像卡住了，再试一次"]
  ],
  "memes": {},
  "pets": [
    {
      "id": "aboutme-dragon-1",
      "name": "白龙娘",
      "size": 420,
      "balanceEnabled": false,
      "whisperEnabled": false,
      "workStatusEnabled": true,
      "fixedEnabled": true,
      "display": "none",
      "position": { "corner": "top-left", "marginX": 24, "marginY": 100 }
    }
  ],
  "animations": {
    "idle": ["待机呼吸休闲", "待机呼吸起伏"],
    "turn": ["原地左转奔跑"],
    "drag": ["被鼠标拖拽悬空反馈"],
    "clicks": ["傲娇生气", "元气挥手", "害羞惊讶", "开心跃动"],
    "moves": {
      "default": { "minDist": 60, "maxDist": 240, "margin": 20, "leadSec": 2, "tailSec": 2 },
      "actions": [{ "name": "原地漂浮踏步" }]
    },
    "categories": [
      { "id": "情绪反应", "weight": 9, "actions": ["被吓一跳", "低头害羞"] },
      { "id": "龙族特性", "weight": 9, "actions": ["用龙尾拍打地面", "白龙现世"] }
    ],
    "events": {
      "balance": ["钱袋满溢", "银袋叮当", "钱袋如常", "数钱皱眉", "袋空如洗", "分文不剩"],
      "workStatus": ["思考冒泡", "忙碌点按", "原地踱步张望", "原地踱步张望", "雀跃庆祝", "垂头叹气冒汗"],
      "whisper": ["发呆碎碎念", "对屏碎碎念", "深度思考碎碎念"]
    }
  },
  "animationWeights": { "idle": 10, "turn": 5, "move": 5 }
}
```

对应素材目录：

```text
%DSH_HOME%\dsh-pet\pet\
├─ aboutme-dragon-config.json
└─ aboutme-dragon-animation\
   ├─ 待机呼吸休闲.webm
   ├─ 待机呼吸起伏.webm
   ├─ ...
```

> 生成器不会写 `sleep` 与 `baifan`：aboutme-pets 没有对应的睡觉/吃白饭动作，不写这两项即该形象没有这两个玩法，属合法配置。橙发书娘的来源动作库没有「转向」分类，因此它的 `turn` 为空数组、`animationWeights.turn = 0`，同样合法。

### 2.6 角色头像（可选）

dsh-pet 支持为 pet pack 配置自定义头像，用于对话面板里的宠物头像（`GET /dsh-pet-7340/logo?root=<素材根>` 与 `/pet-avatar?root=<素材根>`）：

- 文件名：`%DSH_HOME%\dsh-pet\pet\<前缀>-avatar.<ext>`，`<ext>` 支持 `png` / `webp` / `jpg` / `jpeg` / `gif`；`<前缀>` 必须是该 pack 的素材根。
- 归属：头像按**素材根**保存，同一素材根的多只实例共用一张；`main` 条目不允许自定义（永远用插件包内 logo）。
- 本项目：xiaoxiao 5 个角色从上游 `android\assets\<角色>\portrait.png` 复制为 `dist\pet\<kind>-avatar.png`，安装时一起复制到 pet 目录（当前为 320×240 PNG）；aboutme 3 个形象没有配置头像，回退 dsh-pet 包内 logo。
- 设置页的「上传头像」写的就是这个文件；改了当前 pack 的头像后无需重装，刷新页面即可。

---

## 3. 小小桌宠（xiaoxiao）的规范化

「小小桌宠」（xiaoxiao-zhuochong）的角色本身就是 dsh-pet 同构的 `config.json` + 现成透明 WebM，`scripts/build-xiaoxiao-packs.mjs` 只做**规范化**，不重新做精灵图转换：

1. **源**：`characters\<source>\config.json`（动画池/权重/分类/事件）与 `characters\<source>\animations\*.webm`。
2. **只保留真实存在的动画名**：`idle` / `turn` / `drag` / `clicks` / `moves.actions` / `categories[].actions` / `events.*` 中凡是素材目录里没有同名 `.webm` 的项都会被丢弃。
3. **空池兜底**：`idle` 为空时取素材里第一个动画；`events.balance` 缺失/为空时用 6 个 `idle[0]` 填满（dsh-pet 硬性要求 `events.balance` 非空）；`moves.default` 缺失时用 `{minDist:60,maxDist:240,margin:20,leadSec:2,tailSec:2}`。
4. **权重重算**：`animationWeights` 固定为 `{ idle:10, turn:5|0, move:5|0 }`；分类池把 `100 − idle − turn − move` 的预算按源权重比例分配成整数（每类至少 1）。
5. **素材规范化**：把源 WebM（1280×720 或 1280×960，带 alpha）用 ffmpeg 缩放并透明补边成 **640×360**，`libvpx-vp9` + `yuva420p` + `--alpha_mode 1`，**CRF 28**；解码时显式指定 `libvpx-vp9`（ffmpeg 原生 VP9 解码器默认不导出 alpha，会丢透明）。
6. **配置生成**：顶层只写 `whisperPrompt`（来自 `人设.json` 首段）、`memes: {}`、`pets[]`（id=`<kind>-1`、名字/尺寸/位置/`display` 取自 `config/xiaoxiao.mjs`）、`animations`、`animationWeights`；**不写 `sleep` / `baifan`**（上游这些角色没有对应玩法，属合法省略）。
7. **头像**：复制 `android\assets\<角色>\portrait.png` 为 `dist\pet\<kind>-avatar.png`。

> `display` 默认 `none`（与本项目其它 7 个 pack 一致）：安装/开机后不显示，只在设置页列出；想显示时在设置页把「显示位置」改成 `web` / `desktop` / `both` 并保存。这样默认只保留 dsh-pet 内置的 `main` 一只，不会一次弹出满屏宠物/多个 Electron 窗口。

项目当前 5 个 xiaoxiao pack 的动画数（规范化后）：橙毛大小姐 19、黄毛该溜子 12、白毛小龙娘 12、黑毛小狐狸 8、奶茶千金 10；连同 aboutme 3 个 pack（41/38/41）合计 8 个 pack、181 个动画、约 202.6 MiB WebM（以 `dist/manifest.json` 为准）。

---

## 4. 默认 display=none 与「退出回家」补丁

### 4.1 display=none 的语义

- 本项目分发的 8 个 pet pack 里，`pets[].display` 全部是 **`none`**：pack 正常被扫描、种类与实例都出现在「设置 → 桌宠配置」，但**不会**在浏览器 overlay 或桌面模式显示。
- 首次安装、以及每次开机/刷新后，默认只显示 dsh-pet 内置的 `main`（沿用用户 `main-config.jsonc` 里的设置；本机当前为仅桌面）。
- 开启方式：设置页把该实例的「显示位置」改为 `web` / `desktop` / `both` 并保存 → 写回该 pack 的 `<前缀>-config.json` → 宿主重载后显示；`none` 随时可改回。
- `display` 的合法值由 dsh-pet 的 `shared/config`（`PET_DISPLAYS`）决定；写非法值会配置校验告警并回退。
- 为什么默认 `none`：避免一次安装后 8 个新形象 + `main` 全部涌到屏幕/桌面，造成遮挡与资源占用；由用户按需开启。
- 注意：重新执行 `install.mjs` 会覆盖安装目录里的 pack 配置，`display` 会回到默认 `none`；日常开关用设置页即可。

### 4.2 「退出回家」补丁（scripts/patch-dsh-pet.mjs）

dsh-pet 原生右键菜单只有「回到初始位置」等操作，没有「让这一只退出」。项目附带 `scripts/patch-dsh-pet.mjs` 给**已安装的 dsh-pet** 补一个「退出回家」菜单项：

- 生效位置：**桌面透明窗** 与 **网页 overlay** 的右键菜单（分别修改 `<dsh-pet>\runtime\electron-helper\sprite\menu.js` 与 `<dsh-pet>\lib\client.js`）。
- 行为：点击 = 通过 dsh-pet 自带的 `set-display` 通道把该宠物的 `display` 写成 `none`（等价于「显示位置 → 都不显示」），**只退出这一只**，其它宠物不受影响；之后可在设置页把显示位置改回来。
- 幂等：已打过会跳过；首次修改前每个文件旁生成 `.dshpet-backup` 备份；`--check` 只报告状态、`--revert` 从备份还原。
- 包定位：默认取 `$DSH_PROFILE_DIR\node_modules\dsh-pet`；普通终端找不到时用 `--package=<DSH_HOME>\profiles\<profile>\node_modules\dsh-pet` 指定。
- **dsh-pet 升级/重装会覆盖这两个文件，补丁丢失，需要重新运行脚本**（脚本会检查锚点，`anchor-missing` 表示版本不兼容需人工处理）。
- 生效：打完补丁后重载 dsh-pet（桌面右键宠物 →「重载配置」）或刷新 DSH 页面。

> 该补丁修改的是 dsh-pet 插件的运行期文件，不属于 pet pack 格式的一部分；卸载本项目 pet pack 不会自动还原补丁。

---

## 5. 合并与读取口径

- **用户层优先级**：`pet\<前缀>-config.json` 覆盖内置默认；`main-config.jsonc` 里的全局默认字段（physics/font/eventsRefreshSec/chatMemoryRounds/模型等）对**所有条目**生效，pet pack 顶层可再覆盖自己那一份。
- 所有对象字段都是**整段替换**：写了就整段用自己的，缺的子键不会从内置默认补回来（消费端各自兜底）。例如 `physics` 只写一半会被判非法并回退默认。
- 每次请求/重载都会重新读盘，改配置后刷新页面或「重载配置」即可生效。
- 实例 id 冲突：合并时 dsh-pet 会记录已出现的 id；重复 id 可能导致条目被跳过并告警。安装脚本也会在复制前检查目标目录中的 id 冲突。

---

## 6. 常见故障与定位

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 设置页「种类」里没有新种类 | `pet\` 下没有匹配 `*-config.json/.jsonc` 的文件；DSH_HOME 不一致；JSON 解析失败 | 检查文件位置与 `$env:DSH_HOME`；`logs.txt` 搜「解析失败」「已跳过」 |
| 装了但看不到形象 | **预期**：本项目 pack 默认 `display=none` | 设置页把「显示位置」改为 `web`/`desktop`/`both` 并保存；桌面端重载 Helper |
| 宠物不出现/不播放 | 配置缺 `events.balance`、`animations` 结构不对、`animationWeights` 非法 → dsh-pet 告警后回退内置默认 | 看 `logs.txt` 告警；用 `node scripts/install.mjs --force` 重新安装（安装前会校验） |
| 某个动作 404 | 配置写了动画名，但 `<前缀>-animation\` 下没有同名 `.webm`；或多了子目录 | 对照 `dist\manifest.json` 与目录核对；aboutme 重跑 `convert-spritesheets.mjs`、xiaoxiao 重跑 `build-xiaoxiao-packs.mjs`，再重装 |
| 全部动作 404 | `<前缀>-animation\` 目录名与配置前缀不一致（例如 `aboutme-dragon_config.json` 配 `aboutme-dragon_animation\`） | 前缀必须严格是 `<名>`，目录名是 `<名>-animation` |
| 头像不显示/仍是默认图 | pet 目录缺 `<前缀>-avatar.<ext>`；文件扩展名不被支持；`main` 条目本来就不支持自定义头像 | xiaoxiao 重新安装（`install.mjs --force`）；aboutme 没有配置头像，回退包内 logo |
| 透明背景变黑底 | Safari/部分 WebView 不支持 VP9-alpha | 换 Chrome/Edge/Firefox 或使用桌面模式 |
| 右键没有「退出回家」 | 补丁未打，或被 dsh-pet 升级/重装覆盖 | 重新运行 `node scripts/patch-dsh-pet.mjs`；`--check` 确认后重载配置/刷新页面；找不到包用 `--package=` |
| 手改配置后保存被覆盖 | 设置页保存会按白名单重写该条目文件、注释会丢失 | 改 `config/characters.mjs`（aboutme）或 `config/xiaoxiao.mjs`（xiaoxiao）后重新生成，而不是手改安装目录里的配置 |

---

## 7. 参考

- dsh-pet 仓库与文档：<https://github.com/PC2005-cloud/dsh-pet>
- dsh-pet 内置默认配置（字段与注释最全）：`%DSH_HOME%\profiles\<profile>\node_modules\dsh-pet\assets\config.jsonc`
- 本项目 aboutme 选材规则与生成逻辑：`config\characters.mjs`、`scripts\lib\select.mjs`、`scripts\build-configs.mjs`
- 本项目 xiaoxiao 规范化逻辑：`config\xiaoxiao.mjs`、`scripts\build-xiaoxiao-packs.mjs`
- 本项目「退出回家」补丁：`scripts\patch-dsh-pet.mjs`（`--check` / `--revert` / `--package`；改 dsh-pet 的 `runtime\electron-helper\sprite\menu.js` 与 `lib\client.js`，有 `.dshpet-backup`）
- 本地素材源与输出：`scripts\lib\paths.mjs`（`LOCAL_SOURCE_ROOT` / `XIAOXIAO_ROOT`）、`assets\spritesheet-cache\`、`dist\pet\`
- 许可提醒：dsh-pet 素材 CC BY-NC-SA 4.0，公开二创须署名；aboutme-pets 素材禁止商用；xiaoxiao-zhuochong 素材 MIT（需署名）。详见 [README 许可与署名](../README.md#许可与署名)
