# 安装与卸载（INSTALL）

本文是 **pamper** 的完整安装说明。只想尽快用起来的话，看 [README 快速开始](README.md#快速开始)即可；这里给出每一步的细节、验证方法与排障。

- 项目会把 **8 个新形象**安装进 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet) 插件：
  - aboutme 系列（精灵图转 WebM）：白龙娘 / 橙发书娘 / 紫发猫耳娘；
  - xiaoxiao 系列（现成 WebM 规范化）：橙毛大小姐 / 黄毛该溜子 / 白毛小龙娘 / 黑毛小狐狸 / 奶茶千金。
- **8 个新 pack 默认 `display=none`（都不显示）**：安装/开机后只会看到 dsh-pet 自带的蓝毛小女仆（`main`）一只；8 个种类都在「设置 → 桌宠配置 → 种类」里，需要时逐只把「显示位置」改掉再保存。
- 运行期补丁：`scripts/patch-dsh-pet.mjs` 给 dsh-pet 加主菜单「宠爱」（角色预览+开关 / 桌宠配置两页）、设置页型号分组（deepseek/GPT/Claude/Gemini/kimi/豆包/其他）、内置宠物改名「大肥鱼」、以及每只宠物右键「退出回家」，点一下只让这一只退出（display 置 none），可在设置页重新开启。
- 安装过程**只写** `%DSH_HOME%\dsh-pet\pet\` 下 `aboutme-*` / `xiaoxiao-*` 前缀的文件（config、animation、xiaoxiao 的 avatar），不修改 dsh-pet 的 `main-config.jsonc`，也不影响其它 pet pack；补丁只改 dsh-pet 插件自身的两个运行期文件（有备份，可 `--revert`）。

> **项目最终位置：`D:\PC\DSH\pamper`。** 下文的相对路径均以该项目根目录为基准。

---

## 1. 环境检查

在 PowerShell 中执行：

```powershell
node --version        # 需要 v22.x 或更高
ffmpeg -version       # 需要能找到 ffmpeg，且带 libvpx-vp9
echo $env:DSH_HOME    # 可选：没设置时默认 C:\Users\Ai-nice\.dsh
```

| 项目 | 要求 | 不满足时 |
| --- | --- | --- |
| Node.js | **≥ 22**（dsh-pet 要求 `>= 22.12.0`） | 到 <https://nodejs.org/> 安装 LTS，重开终端 |
| ffmpeg | 在 `PATH` 中，含 `libvpx-vp9` | `winget install Gyan.FFmpeg`，或下载 gyan.dev full build 后把 `bin` 加入 `PATH` |
| dsh-pet 插件 | 已安装且能正常显示内置桌宠 | 在 DSH 的插件管理/商城中安装 npm 包 `dsh-pet`，并确认宠物能出现 |
| 本地素材源（可选） | 默认 `D:\PC\DSH\桌面宠物源代码` | 其中 `pet素材\`（aboutme-pets 快照）与 `xiaoxiao-zhuochong桌面源代码\`（小小桌宠素材）。可用环境变量 `DESKTOP_PET_SOURCE_ROOT` 覆盖；本地齐全时可完全离线构建 |
| DSH_HOME | 默认 `%USERPROFILE%\.dsh`；机器若设置过 `DSH_HOME` 以它为准 | 安装脚本与 Node 脚本都优先读 `$env:DSH_HOME` |
| 磁盘空间 | 建议预留 ≥ 1 GB | 整个项目目录约 429 MiB（WebM 产物约 203 MiB + 精灵图缓存约 217 MiB）；本地素材源另需约 1.4 GiB |
| 网络（可选） | 本地素材缺失时需要 | aboutme 从 jsDelivr / raw.githubusercontent 下载；xiaoxiao 素材**没有网络回退**，必须本地存在 |

> 本项目**不需要** `npm install`、`pnpm install` 或任何第三方依赖；脚本只用 Node 内置模块 + 本机 ffmpeg。

---

## 2. 一键安装（推荐）

```powershell
cd "pamper"
.\install.ps1
```

若提示「禁止运行脚本」：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

`install.ps1` 会按顺序：

1. 用 `$PSScriptRoot` 定位项目根，确认 `scripts\build.mjs`、`scripts\install.mjs` 存在；
2. 检查 `node`（≥ 22）与 `ffmpeg`（构建时）是否可用，缺失时输出中文错误并以退出码 1 结束；
3. 解析 `DSH_HOME`（`$env:DSH_HOME` → 缺省 `$HOME\.dsh`），打印安装目录；检测 dsh-pet 插件是否已装（未装只警告，不阻断）；
4. 执行 `node scripts/build.mjs`：5 步构建（商店目录 → 精灵图 → aboutme 透明 WebM → aboutme 配置 → 小小桌宠规范化 → 汇总清单）；
5. 执行 `node scripts/install.mjs`：校验配置、动画文件与实例 id 后，把 8 个 pack（含 xiaoxiao 头像）复制到 `%DSH_HOME%\dsh-pet\pet\`；
6. 打印已安装的 pack、动画数量与后续操作。

安装完成后：

1. **刷新 DSH 页面**（浏览器端 Ctrl+F5）。由于 8 个 pack 默认 `display=none`，此时**只会看到内置的蓝毛小女仆一只**（本机 `main` 当前配置为仅桌面）。
2. **启用想看的形象**：**设置 → 桌宠配置 → 种类** 里选中目标种类 → 在「宠物配置」把 **显示位置** 从「都不显示」改成 仅桌面 / 仅浏览器 / 两者 → 点「保存」。桌面端保存后 Helper 会重载，宠物窗口出现；浏览器端刷新页面。
3. 桌面模式（Electron 透明窗）如果连内置小女仆都没出现：在宠物上**右键 →「重载配置」**；仍不显示就完全退出并重启 DSH。
4. 可选：运行 `node scripts/patch-dsh-pet.mjs` 给 dsh-pet 加「退出回家」右键菜单（见下一小节）。

### 可选：给 dsh-pet 打「退出回家」补丁

```powershell
# 应用补丁（幂等；已打过会跳过）
node scripts/patch-dsh-pet.mjs

# 检查状态
node scripts/patch-dsh-pet.mjs --check

# 从 .dshpet-backup 还原
node scripts/patch-dsh-pet.mjs --revert
```

- 补丁给**桌面透明窗 + 网页 overlay** 的右键菜单都加上「退出回家」；点击 = 把**这一只**的 `display` 写成 `none`，只退出这一只，其它宠物不受影响，设置页可再开启。
- 改的是 `<dsh-pet>\runtime\electron-helper\sprite\menu.js` 与 `<dsh-pet>\lib\client.js`，首次修改前各生成一份 `.dshpet-backup`。
- **dsh-pet 插件升级/重装会覆盖补丁，需要重跑脚本**。
- 默认从 `$DSH_PROFILE_DIR\node_modules\dsh-pet` 找包；普通终端找不到时用 `--package="$env:DSH_HOME\profiles\<profile>\node_modules\dsh-pet"` 指定。
- 验证：打完补丁后重载 dsh-pet（桌面右键 →「重载配置」/浏览器刷新），右键宠物菜单里应出现 **「退出回家」**；点击后该宠物消失、其它宠物仍在，设置页把它的显示位置改回来即可恢复。

### install.ps1 参数

| 参数 | 作用 |
| --- | --- |
| `-SkipBuild` | 跳过构建，直接用现有 `dist\pet` 产物安装 |
| `-All` | 全量转换：aboutme 不做动作上限截断（下载/转码/体积明显变大） |
| `-Force` | 构建时强制重新下载/重转；安装时覆盖同名 pack |
| `-DryRun` | 只打印安装计划，不写入文件 |
| `-Target <dir>` | 安装到自定义目录（默认 `%DSH_HOME%\dsh-pet\pet`） |

示例：

```powershell
.\install.ps1 -SkipBuild                 # 已有产物，只安装
.\install.ps1 -All -Force                # 全量重建并覆盖安装
.\install.ps1 -DryRun                    # 安装前预览会复制哪些文件
.\install.ps1 -Target "D:\dsh-pet\pet"   # 装到自定义目录
```

> 只想跳过「小小桌宠」5 个角色时，用分步命令：`node scripts/build.mjs --skip-xiaoxiao`。

---

## 3. 分步安装（可控性更高）

```powershell
# 第 1 步：构建（5 步，aboutme + 小小桌宠 + 汇总）
node scripts/build.mjs

# 第 2 步：安装（会先校验配置必填段、每个动画文件与实例 id）
node scripts/install.mjs
```

也可以按阶段单独执行：

```powershell
node scripts/fetch-catalog.mjs             # 抓商店目录（优先本地 pet素材）
node scripts/fetch-assets.mjs              # 下载/复制精灵图 → assets\spritesheet-cache\
node scripts/convert-spritesheets.mjs      # aboutme 精灵图 → WebM → dist\pet\<kind>-animation\
node scripts/build-configs.mjs             # aboutme 配置 → dist\pet\<kind>-config.json + preview\manifest.json
node scripts/build-xiaoxiao-packs.mjs      # 小小桌宠 5 角色规范化 → dist\pet\xiaoxiao-*-animation\ + config + avatar
node scripts/install.mjs                   # 复制全部 8 个 pack 到 %DSH_HOME%\dsh-pet\pet\
node scripts/patch-dsh-pet.mjs             # 可选：给 dsh-pet 加「退出回家」右键菜单（--check / --revert）
```

常用参数：

| 参数 | 用于 | 说明 |
| --- | --- | --- |
| `--all` | build / fetch-assets / convert / build-configs | aboutme 不按 `random.max` 截断，全量纳入来源动作 |
| `--force` | build / fetch-assets / convert / build-xiaoxiao-packs / install | 已缓存/已生成/已安装的也重做或覆盖 |
| `--crf=N` | build / convert / build-xiaoxiao-packs | VP9 质量：aboutme 默认 20，xiaoxiao 默认 28；越大体积越小 |
| `--jobs=N` | build / fetch-assets / convert / build-xiaoxiao-packs | 并发数：aboutme 默认 4，xiaoxiao 默认 6 |
| `--skip-fetch` / `--skip-convert` / `--skip-config` / `--skip-xiaoxiao` | build | 跳过对应阶段 |
| `--dry-run` | install / uninstall | 只打印计划，不写/不删 |
| `--target=<dir>` | install / uninstall | 指定 pet 目录 |
| `--purge-dist` | uninstall | 同时删除项目 `dist\pet` 下本项目生成的产物 |
| `--check` / `--revert` / `--package=<dir>` | patch-dsh-pet | 检查补丁状态 / 从备份还原 / 指定 dsh-pet 包目录 |

各脚本均支持 `--help`（`node scripts\build.mjs --help` 等；`fetch-catalog.mjs` 除外，它只有 `--force`）。项目还提供 npm 别名（`npm run build` / `build:all` / `install:packs` / `uninstall:packs` / `preview` / `fetch`），只是命令简写，**无需** `npm install`。

### 安装校验做了什么

`install.mjs` 在复制前会逐份检查：

- `pets` 数组非空，且实例 id 不与目标目录里已有的其它 pet pack 冲突；
- `animations` 的 `idle` / `turn` / `drag` / `clicks` / `categories` 为数组，`moves.actions` 为数组；
- `animations.events` 为对象且 `events.balance` **非空**（dsh-pet 的硬性要求）；
- `animationWeights` 的 `idle` / `turn` / `move` 为非负数；
- 配置里引用的每个动画名都有对应的 `<动作>.webm` 文件。

校验失败会列出具体问题并终止，不会留下半套 pack。校验通过后复制 `aboutme-*` / `xiaoxiao-*` 的 `-config.json`、`-animation\` 目录，以及存在的 `<kind>-avatar.png`（xiaoxiao 5 个角色都有）。详细契约见 [docs/pet-pack-format.md](docs/pet-pack-format.md)。

---

## 4. 安装后验证

```powershell
# 1) 文件是否到位（应看到 8 个 config、8 个 animation 目录，xiaoxiao 另有 5 个 avatar）
dir "$env:DSH_HOME\dsh-pet\pet"

# 2) 查看构建清单（8 个 pack 的动画数/字节数/尺寸/display/位置）
notepad "dist\manifest.json"

# 3) 安装前预览（不写文件），确认目标目录与 pack 列表
node scripts\install.mjs --dry-run

# 4) 两个预览页（需先构建；通过本地 HTTP 打开）
node scripts/serve.mjs
# aboutme 4 形象精灵图舞台：http://127.0.0.1:8899/preview/
# 8 个新形象本地 WebM 卡片：http://127.0.0.1:8899/preview/all-characters.html

# 5) 可选：检查「退出回家」补丁状态
node scripts\patch-dsh-pet.mjs --check
```

预期数字（与 `dist/manifest.json` 一致）：

| 种类 | 动画数 | 体积 |
| --- | --- | --- |
| aboutme-dragon 白龙娘 | 41 | 58.3 MiB |
| aboutme-claude 橙发书娘 | 38 | 47.9 MiB |
| aboutme-gemini 紫发猫耳娘 | 41 | 52.5 MiB |
| xiaoxiao-ojousama 橙毛大小姐 | 19 | 18.2 MiB |
| xiaoxiao-huangmao 黄毛该溜子 | 12 | 9.0 MiB |
| xiaoxiao-bailong 白毛小龙娘 | 12 | 8.8 MiB |
| xiaoxiao-heihu 黑毛小狐狸 | 8 | 3.7 MiB |
| xiaoxiao-naicha 奶茶千金 | 10 | 4.1 MiB |
| **合计** | **181** | **202.6 MiB** |

在 DSH 中验证（默认只开一只）：

1. **设置 → 桌宠配置**，确认「种类」条里有 8 个 `aboutme-*` / `xiaoxiao-*` 种类；宠物列表里各有 1 只实例，`dist\manifest.json` 里它们的 `display` 都是 `none`。
2. **默认只会看到内置的蓝毛小女仆一只**（本机 `main` 当前配置为仅桌面）；这是预期行为，不是安装失败。
3. **启用一只试试**：选中 `aboutme-dragon`，把「显示位置」改为「仅桌面」并保存，桌面应出现白龙娘；改回「都不显示」保存则退出。浏览器端（「仅浏览器 / 两者」）同理，保存后刷新页面。
4. 若已打补丁：右键宠物菜单里应有 **「退出回家」**；点击后该只退出、其它仍在，设置页可恢复。
5. 点一只宠物应播放「点击回应」；拖动/抛掷正常；aboutme 开启工作状态联动后，DSH 干活时对应形象会切动画。

如果失败，看日志：`%DSH_HOME%\dsh-pet\logs.txt`，再对照 [README 故障排查](README.md#故障排查)。

---

## 5. 多形象 / 多实例

8 个 pack 各带 1 只默认实例，但**默认 `display=none`**，安装后只会看到内置小女仆一只。要显示它们：先在「设置 → 桌宠配置 → 种类」里选中目标种类，把「显示位置」改成 仅桌面/仅浏览器/两者 并保存（详见 README「启用形象」）。

想同屏更多实例：

1. **设置 → 桌宠配置** → 「种类」条点选目标种类（如 `aboutme-dragon` 或 `xiaoxiao-bailong`）；
2. 宠物列表下方点 **「添加宠物」**（`+`）；
3. 设置名字、大小（宽度 px）、显示位置（仅浏览器/仅桌面/两者/都不显示）、四角位置与偏移；
4. 按需切换余额 / 碎碎念 / 工作状态 / 宠物固定开关；
5. 点 **「保存」**，即时生效（桌面端会重载宠物窗口）。

`aboutme-*` / `xiaoxiao-*` 的实例配置会写回各自的 `pet\<前缀>-config.json`，不会混进 `main-config.jsonc`。

### 显示位置（display）

| 值 | 含义 |
| --- | --- |
| `none` | 都不显示（**本项目 8 个 pack 的默认值**；种类/实例保留，随时可开启） |
| `web` | 仅浏览器页面内（overlay） |
| `desktop` | 仅桌面模式（Electron 透明窗） |
| `both` | 两者都显示（dsh-pet 内置 `main` 的默认值） |

想永久修改某形象的默认显示方式（而不是每次在设置页点）：编辑 `config/xiaoxiao.mjs`（xiaoxiao）或 `config/characters.mjs`（aboutme）里对应角色的 `display`，然后重新构建并 `node scripts/install.mjs --force`。注意重新安装会覆盖安装目录里的配置，日常开关建议直接用设置页。

桌面模式会为每只 `display` 含 desktop 的宠物各开一个 Electron 透明窗，窗口多时占用明显；只想在页面里看就选 `web`/`both`。

---

## 6. 卸载

### 方式一：PowerShell 脚本（推荐，带预览）

```powershell
# 先预览将删除的绝对路径
.\uninstall.ps1 -WhatIf

# 确认后执行
.\uninstall.ps1

# 顺带清掉项目 dist\pet 下本项目生成的产物
.\uninstall.ps1 -PurgeDist
```

`uninstall.ps1` 只匹配并删除：

- `%DSH_HOME%\dsh-pet\pet\aboutme-*-config.json` 与 `xiaoxiao-*-config.json`
- `%DSH_HOME%\dsh-pet\pet\aboutme-*-animation\` 与 `xiaoxiao-*-animation\`
- `%DSH_HOME%\dsh-pet\pet\aboutme-*-avatar.*` 与 `xiaoxiao-*-avatar.*`（本项目实际只有 xiaoxiao 带头像）

**不会**动 `main-config.jsonc`、dsh-pet 自带的素材或其它 `<名>-config.json`。删除前会打印每个绝对路径；支持 PowerShell 标准 `-WhatIf` / `-Confirm`。建议先退出 DSH、关掉桌宠窗口，避免 WebM 文件被占用导致删除失败。

### 方式二：Node 脚本（等价）

```powershell
node scripts/uninstall.mjs --dry-run
node scripts/uninstall.mjs
node scripts/uninstall.mjs --purge-dist
```

### 方式三：手动删除

关闭 DSH 后，删除 `%DSH_HOME%\dsh-pet\pet\` 下所有 `aboutme-*` / `xiaoxiao-*` 的 config、`-animation\` 目录与 `-avatar.*` 头像即可。

卸载后刷新 DSH 页面（或重启 DSH），这些形象会从「种类」条中消失。

> 如果你之前用 `-Target` / `--target` 装到了自定义目录，卸载时也要传同一个目录：
> `.\uninstall.ps1 -Target "D:\dsh-pet\pet"` 或 `node scripts/uninstall.mjs --target="D:\dsh-pet\pet"`。

> 卸载 dsh-pet 插件本体是另一件事：在 DSH 插件管理里卸载（设置页「卸载与存储」提示命令为 `dsh plugin --profile <profile> remove dsh-pet`）。删除 `%DSH_HOME%\dsh-pet\` 用户数据会同时丢失 `main-config.jsonc` 与对话记忆，请先备份。

> 本脚本/`uninstall.mjs` 只卸载 pet pack，**不会还原**给 dsh-pet 打的「退出回家」补丁；需要恢复原生菜单时单独执行 `node scripts/patch-dsh-pet.mjs --revert`。

---

## 7. 升级 / 重装

1. 拉取/更新本项目代码；
2. 重新构建：`node scripts/build.mjs --force`（或只 `--skip-fetch` 复用精灵图缓存）；
3. 重新安装：

```powershell
node scripts/install.mjs --force
```

`--force` 会先删除目标里同名的 `aboutme-*-animation\` / `xiaoxiao-*-animation\` 再复制，能清掉旧版本遗留的动作文件；不加 `--force` 时只覆盖同名文件、动画目录按合并方式复制。也可以先卸载再安装（结果等价，且更干净）：

```powershell
node scripts/uninstall.mjs
node scripts/install.mjs
```

> 只改了小小桌宠的角色定义时，最小重装命令是：
> `node scripts/build-xiaoxiao-packs.mjs --force` → `node scripts/install.mjs --force`。

> 升级/重装 dsh-pet 插件本身后，`patch-dsh-pet.mjs` 的「退出回家」补丁会被覆盖：重新运行 `node scripts/patch-dsh-pet.mjs`（`--check` 确认）即可；不需要重装 pet pack。

---

## 8. 常见问题

| 现象 | 处理 |
| --- | --- |
| PowerShell 阻止脚本运行 | `powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1` |
| `install.ps1` 报 Node.js 未找到/版本过低 | 安装 Node ≥ 22，重开终端；`node --version` 验证 |
| `install.ps1` 报 ffmpeg 未找到 | `winget install Gyan.FFmpeg`；或下载 gyan.dev full build 加入 PATH；只安装已有产物时可用 `-SkipBuild` |
| 构建时提示找不到小小桌宠素材 | 本地素材源缺失或结构不符：确认 `D:\PC\DSH\桌面宠物源代码\xiaoxiao-zhuochong桌面源代码\characters\<角色>\animations\` 与 `android\assets\<角色>\portrait.png` 存在，或设置 `DESKTOP_PET_SOURCE_ROOT`；只构建 aboutme 可用 `--skip-xiaoxiao` |
| aboutme 下载失败/超时 | 本地 `pet素材\` 缺文件且网络不可用；补全本地素材或检查网络/代理后重试（已下载会复用） |
| `dist\pet` 不存在 / 安装报「构建产物不存在」 | 先跑 `node scripts/build.mjs` |
| 安装报「配置/素材不完整」 | 按报错列出的动画名补跑对应脚本（aboutme：`convert-spritesheets.mjs`；xiaoxiao：`build-xiaoxiao-packs.mjs`），或整套 `node scripts/build.mjs --force` |
| 安装报实例 id 冲突 | 目标目录里**其它** pet pack（非本项目）已占用同名实例 id；改对应 `kind` 后重建，或暂时移除冲突的 pack |
| 装完看不到新形象 / 只看到小女仆 | **预期**：8 个 pack 默认 `display=none`；到「设置 → 桌宠配置 → 种类」把想看的形象「显示位置」改成 仅桌面/仅浏览器/两者并保存 |
| 设置页改了显示位置仍不出现 | 桌面端保存后等待 Helper 重载；仍不行右键「重载配置」/重启 DSH；核对 `DSH_HOME` 是否与 DSH 进程一致；看 `logs.txt` |
| 右键没有「退出回家」 | 补丁未打或被 dsh-pet 升级覆盖：重新运行 `node scripts/patch-dsh-pet.mjs`，`--check` 确认后重载配置/刷新页面；找不到包用 `--package=` 指定 |
| 预览页打不开/卡片全黑 | 先构建；必须用 `node scripts/serve.mjs` 以 HTTP 打开，`file://` 不行；端口被占用用 `--port=9000` |
| 端口 8899 被占用（预览） | `node scripts/serve.mjs --port=9000` |
| 卸载提示文件被占用 | 完全退出 DSH（含桌面宠物窗口）后重试 |

更完整的运行时排障（动画 404、头像、WebM 透明、配置校验等）见 [README 故障排查](README.md#故障排查) 与 [docs/pet-pack-format.md](docs/pet-pack-format.md)。

---

## 9. 安装位置速查

| 内容 | 路径 |
| --- | --- |
| 项目最终位置 | `D:\PC\DSH\pamper` |
| 项目根 | `pamper\`（含 `install.ps1` 的目录） |
| 本地素材源（外部只读） | `D:\PC\DSH\桌面宠物源代码\`（可用 `DESKTOP_PET_SOURCE_ROOT` 覆盖；`pet素材\` + `xiaoxiao-zhuochong桌面源代码\`） |
| 商店缓存 | `pamper\catalog\` |
| 精灵图缓存 | `pamper\assets\spritesheet-cache\` |
| 构建产物 | `pamper\dist\pet\`（8 个 pack） |
| 构建清单 | `pamper\dist\manifest.json`（packs / totals） |
| 预览数据 | `pamper\preview\manifest.json` 与 `dist\manifest.json`（all-characters 页） |
| pet pack 安装目录 | `%DSH_HOME%\dsh-pet\pet\`（默认 `C:\Users\Ai-nice\.dsh\dsh-pet\pet\`） |
| dsh-pet 用户配置 | `%DSH_HOME%\dsh-pet\main-config.jsonc` |
| dsh-pet 日志 | `%DSH_HOME%\dsh-pet\logs.txt` |
| dsh-pet 插件本体 | `%DSH_HOME%\profiles\<profile>\node_modules\dsh-pet\` |
| 「退出回家」补丁文件 | `<dsh-pet>\runtime\electron-helper\sprite\menu.js` 与 `<dsh-pet>\lib\client.js`（首次打补丁前的原件保存在同目录 `*.dshpet-backup`） |

---

## 10. 许可提醒

安装与使用即表示你同意遵守各素材许可：

- **dsh-pet** 代码 MIT；素材 CC BY-NC-SA 4.0（署名—非商业性使用—相同方式共享），公开二创须署名 <https://github.com/PC2005-cloud/dsh-pet>；
- **aboutme-pets** 素材禁止商用，来源 <https://github.com/hunmer/aboutme-pets>；
- **小小桌宠（xiaoxiao-zhuochong）** 素材以 MIT 发布（其 LICENSE 保留 dsh-pet 原 MIT 声明；新增角色/动画/图标由小小桌宠作者创作），公开使用/再分发请署名 <https://github.com/yshuang722-spec/xiaoxiao-zhuochong> 与 <https://github.com/PC2005-cloud/dsh-pet>。

完整说明见 [README 许可与署名](README.md#许可与署名)。


---

## 运行期补丁验证清单（2026-11 新增）

运行 `node scripts/patch-dsh-pet.mjs` 后：

1. 左侧主菜单出现「宠爱」，点开是「角色 / 桌宠配置」两页：角色页有预览卡片与显示开关，桌宠配置页与设置里的配置页一致。
2. 设置 → 桌宠配置 的「种类」条显示 deepseek / GPT / Claude / Gemini / kimi / 豆包 / 其他 七个分组（豆包暂为 0）。
3. deepseek 分组内宠物名称为「大肥鱼」；GPT 分组含白龙娘 + 白毛小龙娘；Claude 分组含橙发书娘 + 橙毛大小姐；其他分组含黑毛小狐狸 + 奶茶千金。
4. 每只宠物右键菜单最下方有「退出回家」。
