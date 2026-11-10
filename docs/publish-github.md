# 发布到 GitHub（轻量版）

目标：主仓库只放代码（约 10–15 MB），大素材拆成两类：

1. **基础形象包**（8 个 pack 的 WebM，约 203 MB）→ GitHub Release 附件 `pets-base.zip`
2. **完整动作库**（819 个预转换 WebM）→ 单独一个 assets 仓库，插件按需从 CDN 下载

## 一、准备主仓库（桌面宠物）

```powershell
cd "D:\PC\DSH\pamper"
git init
# .gitignore 已排除：assets/pet-store、assets/spritesheet-cache、dist、webm-store、release、.build-tmp
git add .
git commit -m "pamper: DSH 宠爱页 / 动作按需加载插件"
git remote add origin https://github.com/Ai-nice/dsh-pamper.git
git push -u origin main
```

> 主仓库不要提交 `webm-store/`（约 0.9 GB）和 `dist/`（203 MB）；它们走下一步的 assets 仓库 / Release。

## 二、准备动作库仓库（webm-store）

```powershell
cd "D:\PC\DSH\pamper\webm-store"
# 建议先放一份 README / NOTICE（素材来源与许可）
git init
git add .
git commit -m "pamper action assets (prebuilt alpha WebM)"
git remote add origin https://Ai-nice/pamper-assets.git
git push -u origin main
```

上传后得到两种可用根地址（建议 jsDelivr，国内更快）：

- jsDelivr：`https://cdn.jsdelivr.net/gh/Ai-nice/pamper-assets@main`
- GitHub raw：`https://raw.githubusercontent.com/Ai-nice/pamper-assets/main`

用浏览器打开 `https://cdn.jsdelivr.net/gh/Ai-nice/pamper-assets@main/pets/dsh/待机呼吸休闲.webm` 验证 200 即可。

## 三、打开发布产物

```powershell
cd "D:\PC\DSH\pamper"
node scripts/pack-release.mjs
```

产物在 `release/`：

- `pamper-lite.zip` —— 轻量仓库快照
- `pets-base.zip` —— 8 个基础形象（上传到 Release）
- `actions-webm-<pack>.zip` —— 各动作包（可选，手动下载用）

在 GitHub 仓库 **Releases → Draft a new release**：上传 `pets-base.zip`（可再上传各 actions zip），发布后拿到下载直链。

## 四、填写两个地址（发布者一次性）

1. `release-config.json`：
   ```json
   { "basePackUrl": "<pets-base.zip 的 Release 下载直链>", "assetsBaseUrl": "https://cdn.jsdelivr.net/gh/Ai-nice/pamper-assets@main" }
   ```
2. `plugin/dsh-pamper/cordis.patch.yml`：
   ```yaml
   assetBaseUrl: 'https://cdn.jsdelivr.net/gh/Ai-nice/pamper-assets@main'
   ```
3. 重新打轻量包（`pack-release.mjs`）并提交主仓库。

## 五、用户安装（轻量版）

```powershell
# 1. 拿轻量仓库（clone 或下载 pamper-lite.zip）
git clone https://github.com/Ai-nice/dsh-pamper.git
cd pamper
# 2. 下载 8 个基础形象并安装（自动读 release-config.json 的 basePackUrl）
node scripts/install-lite.mjs
# 3. 安装插件（DSH Host 侧，一次）
#    在 DSH 里用 plugin_manager install_bundle，target 选本目录 plugin/dsh-pamper
# 4. 打开 DSH → 宠爱 → 发现；点动作「加载」时插件自动从 assetsBaseUrl 下载对应 WebM 并缓存
```

没有 ffmpeg 也能用（预转换 WebM 模式）；只有回退到本地精灵图转换时才需要 ffmpeg。

## 目录约定（插件下载使用）

动作库仓库里的路径必须与 `catalog/action-store.json` 的 `action.webm` 一致：

```
pets/<pack>/<action>.webm
```

例如：`pets/dsh/待机呼吸休闲.webm`、`pets/claude/OK手势.webm`。

修改动作库后，重新运行 `node scripts/build-webm-store.mjs` 再推送即可；`catalog` 里的动作名不变就不用改插件。
