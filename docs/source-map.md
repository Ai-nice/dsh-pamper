# 独立宠爱页 0.6.0 — 源码复用地图（Phase 1）

> 本文只做源码审计与实施映射，不改功能代码。
> 目标：独立插件页面与旧「宠爱」页一致，但运行时不依赖 dsh-pet。

## 1. 结论

1. **旧宠爱页没有独立源码文件**。页面壳（标题、角色卡、筛选弹窗、详情、发现）以字符串形式注入在：
   - `D:\PC\DSH\pamper\scripts\patch-dsh-pet.mjs`
2. **桌宠配置页不是自己写的**。旧页在 `LovePanel` 中直接渲染 dsh-pet 源码的 `PetConfigSection`：
   - `D:\PC\DSH\桌面宠物源代码\dsh-pet插件源代码\dsh-pet\src\client\settings.ts`
   - `...\src\client\settings\*.ts`
3. 因此 0.6.0 不重新设计页面：
   - 页面壳：从 patch 脚本提取成独立源码；
   - 桌宠配置：直接搬 dsh-pet 的 MIT settings 源码并适配桥接；
   - 数据/素材：复用 pamper 自己的 dist、catalog、assets。
4. 运行时不得 import/读取 dsh-pet 的代码或配置；dsh-pet 源码只作为**构建期复制来源**。

## 2. 源码清单

### 2.1 旧宠爱页（页面壳）
| 文件 | 用途 |
|---|---|
| `D:\PC\DSH\pamper\scripts\patch-dsh-pet.mjs` | `LOVE_ENTRY`、`LovePanel`、筛选、详情、发现页、右键菜单 |
| `D:\PC\DSH\pamper\plugins\dsh-pamper\client.js` | 当前独立版简化页面（将被 0.6.0 替换） |

### 2.2 dsh-pet 配置页（可直接复用，MIT）
根目录：`D:\PC\DSH\桌面宠物源代码\dsh-pet插件源代码\dsh-pet`

| 文件/目录 | 用途 |
|---|---|
| `src/client/settings.ts` | `makePetConfigSection` 装配根 |
| `src/client/settings/pet-card.ts` | 宠物配置表单（名字/大小/位置/人设） |
| `src/client/settings/pet-card-parts.ts` | 表单小部件 |
| `src/client/settings/kind-tabs.ts` | 种类 tab（deepseek/GPT/Claude/…） |
| `src/client/settings/pet-tabs.ts` | 宠物列表 chips、添加宠物 |
| `src/client/settings/pet-draft.ts` | 添加宠物草稿 |
| `src/client/settings/dialog.ts` | 保存/删除确认 |
| `src/client/settings/css.ts` | 配置页样式 |
| `src/client/settings/ui.ts` | 基础控件 |
| `src/client/settings/actions.ts` | 保存/同步/删除动作 |
| `src/client/settings/config/*` | `GET/PUT/POST /config` 读写、校验、写盘 |
| `src/client/settings/locales/*` | 配置页文案 |
| `src/client/settings/use-pet-list.ts` | 宠物列表状态 |
| `src/client/settings/use-remote-data.ts` | 模型/声音等远端数据 |
| `src/client/settings/avatar-upload.ts` | 头像上传 |
| `src/client/settings/paths-cards.ts`、`global-card.ts`、`voice-card.ts`、`font-card.ts`、`model-card.ts`、`physics-card.ts`、`motion-card.ts`、`mobile-card.ts`、`shortcuts-card.ts` | 配置页其余卡片（是否保留按旧页实际显示范围决定） |
| `src/shared/constants.ts` | `ROUTE_PATH` 等 |
| `src/shared/avatar.ts` | 头像 URL |
| `src/shared/types.ts` | `Pet` / `Config` 类型 |
| `src/shared/weights.ts`、`physics.ts`、`fonts.ts` | 默认值 |

许可证：`D:\PC\DSH\桌面宠物源代码\dsh-pet插件源代码\dsh-pet\LICENSE`（MIT，Copyright (c) 2026 PC2005-cloud）。

### 2.3 素材/数据（已有，不重复造）
- `D:\PC\DSH\pamper\dist\`：角色包（配置、头像、动画）
- `D:\PC\DSH\pamper\catalog\action-store.json`：动作目录
- `D:\PC\DSH\pamper\assets\`、`webm-store\`：素材与 WebM
- `D:\PC\DSH\pamper\plugins\dsh-pamper\index.js`：自有 Host（已支持基础包、动作、桌面 helper）

## 3. 功能 → 源码映射

| 旧页功能 | 来源 | 0.6.0 处理 |
|---|---|---|
| 宠爱标题/副标题/添加角色 | patch `LOVE_ENTRY`/`LovePanel` | 提取为 `client-src/love/*` |
| 角色 / 桌宠配置 / 发现 tabs | patch | 提取 |
| 统计栏、刷新列表、全部开启/隐藏 | patch | 提取 |
| 按种类筛选弹窗（多选+数量） | patch | 提取 |
| 角色卡、已隐藏、详情、开关 | patch | 提取 |
| 详情弹窗 | patch | 提取 |
| 发现：角色已加载数/总数、分类计数、预览、加载 | patch | 提取 |
| 桌宠配置：种类 tabs、宠物列表、添加宠物、表单、保存/删除 | dsh-pet `settings.ts` + `settings/*` | 原样搬源码，改桥接 |
| 桌面透明窗 | pamper 现有 WPF helper | 0.6.0 改逐宠物窗口 |

## 4. 页面壳提取计划

从 `patch-dsh-pet.mjs` 中提取：

1. `LOVE_ENTRY` 内的 React/DOM 组件：
   - `LovePanel`
   - `LoveIcon`
   - `LOVE_GROUP_ORDER` / `LOVE_GROUP_COLOR`
   - 筛选弹窗、详情弹窗、发现页
2. 转成独立文件（建议）：
   ```text
   plugins/dsh-pamper/client-src/love/LovePanel.tsx
   plugins/dsh-pamper/client-src/love/LoveFilter.tsx
   plugins/dsh-pamper/client-src/love/LoveDetails.tsx
   plugins/dsh-pamper/client-src/love/Discovery.tsx
   plugins/dsh-pamper/client-src/love/styles.ts
   ```
3. 数据调用改为我们自己的 Host API，不调用 `/dsh-pet-7340/*`。

## 5. 桌宠配置源码复用计划

1. 复制到构建期 vendor 目录：
   ```text
   plugins/dsh-pamper/client-src/vendor/dsh-pet-settings/
   ```
2. 保留 `LICENSE` 与版权头。
3. 只替换以下边界：
   - `ROUTE_PATH` → `/dsh-pamper-7470`
   - `settings/config/http.ts` 里的接口 → 我们的 Host API
   - `petBridge` / 容器提供的 `current/reload/template` → 我们的角色数据
   - 模型/声音/字体等 dsh-pet 宿主能力 → 按 A2 方案接 DSH 服务，或 ui 暂时禁用（以旧页实际显示为准）
4. 用 `ts-morph`/esbuild metafile 解析依赖，只搬实际引用到的文件，不整目录盲目复制。

## 6. Host API 适配表（待实现）

| dsh-pet 旧接口 | 0.6.0 自有接口（草案） |
|---|---|
| `GET /config` | `GET /dsh-pamper-7470/config` |
| `GET /config/meta` | `GET /dsh-pamper-7470/config/meta` |
| `PUT /config` | `PUT /dsh-pamper-7470/config` |
| `POST /config`（sync） | `POST /dsh-pamper-7470/config/sync` |
| `POST /pet-config` | `POST /dsh-pamper-7470/pet-config` |
| `GET /models` | 由 A2 方案接 DSH 模型服务 |
| 头像/动画静态资源 | `GET /avatar`、`/animation`（已有） |
| 动作目录/加载/卸载 | `/catalog`、`/load`、`/unload`（已有，需对齐字段） |

## 7. 截图基准（回答“什么叫以截图基准”）

旧页视觉验收以仓库中已有旧页截图为基准：

```text
D:\PC\DSH\pamper\preview\love-panel-shot.png     角色页
D:\PC\DSH\pamper\preview\love-filter-shot.png    筛选弹窗
D:\PC\DSH\pamper\preview\love-config-shot.png    桌宠配置
D:\PC\DSH\pamper\preview\discovery-shot.png      发现页
D:\PC\DSH\pamper\preview\legacy-love-restored.png 恢复后的旧页
```

“以现有截图为基准”的意思：

- 验收时把 0.6.0 新页面与这些旧页截图**并排对比**；
- 对照布局、文案、按钮位置、卡片样式、交互；
- 不要求逐像素一致（DPI/字体可能不同），但结构和功能必须一致；
- 如果你有更新版设计截图/源文件，以你的新图为准，把上面路径替换掉即可。

## 8. 阶段与验收

| 阶段 | 产出 | 验收 |
|---|---|---|
| Phase 1 | 本文件 + 文件复制清单 | 你确认映射 |
| Phase 2 | 页面壳 + 配置页复用，能编译运行 | 三 tab 与旧页并排截图一致 |
| Phase 3 | A2：余额/碎碎念/工作状态独立实现 | 每个功能有触发场景截图/日志 |
| Phase 4 | B2：逐宠物透明窗、点击/拖拽/右键 | 交互逐项测试 |
| Phase 5 | 0.6.0 预览、干净安装回归 | 你确认后才 npm 发布 |

## 9. 风险

- `settings.ts` 依赖多，桥接适配是主要工作量；
- A2 的余额/模型/工作状态依赖 DSH 暴露的服务，需要先探测；
- B2 需要从全屏穿透改为逐宠物窗口，WPF 命中测试/拖拽要重写；
- 旧页代码在 patch 字符串里，提取时要防止转义/编码损坏。

## 10. 已确认决策（2026-11-10）

1. 桌宠配置页：dsh-pet 的设置卡片**全部保留**（模型/声音/字体/物理/快捷键/移动端等）。
2. A2：余额/碎碎念/工作状态**沿用 dsh-pet 的数据源与行为**，但在本插件内独立实现，不运行时依赖 dsh-pet。
3. B2：右键菜单**全部保留**：退出回家、隐藏、重载配置等。
4. 旧 dsh-pet 补丁暂不清理，保留用于视觉/行为对比。
5. 为支持全部设置卡片，已把 dsh-pet `src/client/**`（排除测试）与 `src/shared/**` vendor 到：
   `plugins/dsh-pamper/client-src/vendor/dsh-pet/`（MIT，附带 LICENSE）。
6. 构建验证：用 esbuild 单独打包 vendored `settings.ts` 成功（419 KB，react external），说明设置页源码可作为 0.6.0 的基础。

## 11. 未决问题

1. 桌宠配置里 dsh-pet 专属卡片（模型/声音/字体/物理/快捷键/移动端）是否都要显示，还是只显示旧页实际出现的宠物配置卡片？
2. A2：
   - 余额读取用 DSH 账户服务还是直接调余额 API？
   - 碎碎念使用 DSH 当前会话模型，还是指定模型？
   - 工作状态从 Agent 事件订阅，确认可用事件名。
3. B2 右键菜单除「退出回家」外，是否还要「隐藏 / 重载配置」？
