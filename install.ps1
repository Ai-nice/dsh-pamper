<#
.SYNOPSIS
    一键构建并安装 pamper 的 8 个 pet pack 到 dsh-pet 插件。

.DESCRIPTION
    pamper 把 aboutme-pets 商店的精灵图动画转换成透明 WebM，并把「小小桌宠」的
    现成透明 WebM 规范化，生成 8 个 dsh-pet pet pack（<前缀>-config.json +
    <前缀>-animation/*.webm，xiaoxiao 另带 <前缀>-avatar.png），安装到
    $DSH_HOME\dsh-pet\pet\ 后由 dsh-pet 自动扫描；启用后可多只形象同屏出现。

    素材优先读本地素材源（默认 D:\PC\DSH\桌面宠物源代码，可用环境变量
    DESKTOP_PET_SOURCE_ROOT 覆盖）；本地缺失的 aboutme 素材才联网下载，
    小小桌宠素材没有网络回退。

    默认流程（两步）：
      1. node scripts/build.mjs     5 步构建：商店目录 → 精灵图 → aboutme WebM →
                                    aboutme 配置 → 小小桌宠规范化 → 汇总 dist/manifest.json
      2. node scripts/install.mjs  把 dist/pet 下的 aboutme-* / xiaoxiao-*（8 个 pack）复制到
                                    $DSH_HOME\dsh-pet\pet\

    安装完成后刷新 DSH 页面。8 个 pack 默认 display=none（都不显示），因此默认只会看到
    dsh-pet 内置的蓝毛小女仆一只；到「设置 → 桌宠配置 → 种类」里把想看的形象「显示位置」
    改成 仅桌面/仅浏览器/两者 再保存即可。桌面模式建议在宠物上右键 →「重载配置」，
    必要时重启 DSH。

    可选：运行 node scripts/patch-dsh-pet.mjs 给 dsh-pet 加「退出回家」右键菜单
    （点击让这一只退出，其它不受影响；--check 检查、--revert 还原；dsh-pet 升级后需重跑）。

.PARAMETER SkipBuild
    跳过构建，直接用现有 dist/pet 产物安装（产物不存在时 install.mjs 会报错）。

.PARAMETER All
    全量转换：aboutme 不按 config/characters.mjs 的 random.max 截断，把来源动作库全部纳入
    （不影响小小桌宠的固定动作集）。体积与耗时都会明显变大，默认关闭。

.PARAMETER Force
    构建时强制重新下载 / 重新转码；安装时覆盖已存在的同名 pet pack。

.PARAMETER DryRun
    只打印将要复制的文件，不实际写入（传给 install.mjs 的 --dry-run）。

.PARAMETER Target
    自定义安装目录，默认 %DSH_HOME%\dsh-pet\pet。

.EXAMPLE
    .\install.ps1
    标准安装：构建全部 8 个形象后安装。

.EXAMPLE
    .\install.ps1 -SkipBuild -Force
    不做构建，直接用现有产物覆盖安装。

.EXAMPLE
    .\install.ps1 -All -Force
    全量重建（aboutme 动作不截断）并覆盖安装。

.NOTES
    兼容 Windows PowerShell 5.1 与 PowerShell 7+。
    需要 Node.js 22+；构建还需要 ffmpeg 在 PATH 中。
#>
[CmdletBinding()]
param(
    [switch]$SkipBuild,
    [switch]$All,
    [switch]$Force,
    [switch]$DryRun,
    [string]$Target
)

$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string]$Message)
    Write-Host ''
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Ok {
    param([string]$Message)
    Write-Host "    [OK] $Message" -ForegroundColor Green
}

function Write-Note {
    param([string]$Message)
    Write-Host "    [!] $Message" -ForegroundColor Yellow
}

function Fail {
    param([string]$Message, [string]$Hint)
    Write-Host ''
    Write-Host "错误：$Message" -ForegroundColor Red
    if ($Hint) { Write-Host "提示：$Hint" -ForegroundColor Yellow }
    exit 1
}

# ---------- 1. 定位项目根目录 ----------
$ProjectRoot = $PSScriptRoot
if (-not $ProjectRoot) {
    $ProjectRoot = (Get-Location).Path
}

$buildScript = Join-Path $ProjectRoot 'scripts\build.mjs'
$installScript = Join-Path $ProjectRoot 'scripts\install.mjs'

Write-Step 'pamper 安装脚本'
Write-Host "    项目根目录：$ProjectRoot"

if (-not (Test-Path -LiteralPath $buildScript -PathType Leaf)) {
    Fail "找不到构建脚本：$buildScript" "请确认 install.ps1 放在项目根目录（pamper\）下运行；scripts\build.mjs 是本项目的一部分，缺失说明目录不完整。"
}
if (-not (Test-Path -LiteralPath $installScript -PathType Leaf)) {
    Fail "找不到安装脚本：$installScript" "请确认 install.ps1 放在项目根目录（pamper\）下运行；scripts\install.mjs 是本项目的一部分，缺失说明目录不完整。"
}

# ---------- 2. 检查运行环境 ----------
Write-Step '检查运行环境'

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Fail '未找到 Node.js（node 不在 PATH 中）。' '请安装 Node.js 22 或更高版本：https://nodejs.org/ 。安装后重新打开终端，执行 node --version 确认。'
}

$nodeVersionRaw = & node --version 2>$null
if ($LASTEXITCODE -ne 0 -or -not $nodeVersionRaw) {
    Fail '执行 node --version 失败，Node.js 可能安装不完整。' '请重新安装 Node.js 22+：https://nodejs.org/ 。'
}
$nodeVersion = $nodeVersionRaw.Trim()
$nodeMajor = 0
$nodeMajorText = $nodeVersion.TrimStart('v').Split('.')[0]
if (-not [int]::TryParse($nodeMajorText, [ref]$nodeMajor)) { $nodeMajor = 0 }
if ($nodeMajor -lt 22) {
    Fail "Node.js 版本过低：当前 $nodeVersion，本项目需要 Node.js 22 或更高版本。" '升级 Node.js：https://nodejs.org/ 。'
}
Write-Ok "Node.js $nodeVersion（$($nodeCmd.Source)）"

if (-not $SkipBuild) {
    $ffmpegCmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if (-not $ffmpegCmd) {
        Fail '未找到 ffmpeg（ffmpeg 不在 PATH 中），无法把精灵图转换成透明 WebM。' '安装 ffmpeg 并加入 PATH：winget install Gyan.FFmpeg；或从 https://ffmpeg.org/download.html 下载后把 bin 目录加入 PATH。也可以先用 -SkipBuild 安装已有产物。'
    }
    Write-Ok "ffmpeg（$($ffmpegCmd.Source)）"
}

# ---------- 3. 解析 DSH_HOME 与安装目录 ----------
if ($env:DSH_HOME -and $env:DSH_HOME.Trim() -ne '') {
    $dshHome = $env:DSH_HOME.Trim()
} else {
    $dshHome = Join-Path $HOME '.dsh'
}
if ($Target) {
    $installTarget = $Target
} else {
    $installTarget = Join-Path $dshHome 'dsh-pet\pet'
}

Write-Host "    DSH_HOME：$dshHome"
Write-Host "    安装目录：$installTarget"

# dsh-pet 插件是否已装（不阻断：没装时 pet pack 会先落盘，装好插件后即可用）
$profilesDir = Join-Path $dshHome 'profiles'
$petPackageDirs = @()
if (Test-Path -LiteralPath $profilesDir -PathType Container) {
    $petPackageDirs = @(Get-ChildItem -LiteralPath $profilesDir -Directory -ErrorAction SilentlyContinue |
        ForEach-Object { Join-Path $_.FullName 'node_modules\dsh-pet' } |
        Where-Object { Test-Path -LiteralPath $_ -PathType Container })
}
if ($petPackageDirs.Count -eq 0) {
    Write-Note '未在 $DSH_HOME\profiles\*\node_modules\dsh-pet 找到已安装的 dsh-pet 插件。'
    Write-Note 'pet pack 仍会复制到安装目录；请先安装 dsh-pet（npm 包名 dsh-pet）后刷新 DSH。'
} else {
    Write-Ok "已检测到 dsh-pet 插件（$($petPackageDirs[0])）"
}

$buildArgs = @()
if ($All) { $buildArgs += '--all' }
if ($Force) { $buildArgs += '--force' }

# ---------- 4. 构建 ----------
if ($SkipBuild) {
    Write-Step '步骤 1/2：构建 pet pack（已用 -SkipBuild 跳过）'
    Write-Note '直接使用现有 dist\pet 产物，请确认它是最新的。'
} else {
    $buildText = 'node scripts/build.mjs'
    if ($All) { $buildText += ' --all' }
    if ($Force) { $buildText += ' --force' }
    Write-Step "步骤 1/2：构建 pet pack（$buildText）"
    Write-Host '    5 步构建：商店目录 → 精灵图 → aboutme 透明 WebM → aboutme 配置 → 小小桌宠规范化。'
    Write-Host '    素材优先读本地素材源（默认 D:\PC\DSH\桌面宠物源代码），本地缺失的 aboutme 素材才联网。'
    Write-Host '    首次运行需要转码 8 个形象，耗时取决于 CPU；小小桌宠素材必须本地存在。'

    $nodeBuildInvoke = @($buildScript) + $buildArgs
    & node @nodeBuildInvoke
    if ($LASTEXITCODE -ne 0) {
        Fail "构建失败：node scripts/build.mjs 退出码 $LASTEXITCODE。" '请查看上方日志。常见原因：网络下载失败（可重试或加 -Force）、ffmpeg 不可用、磁盘空间不足、config/characters.mjs 写法有误。'
    }
    Write-Ok '构建完成（dist\pet 已生成）'
}

# ---------- 5. 安装 ----------
$installArgs = @()
if ($DryRun) { $installArgs += '--dry-run' }
if ($Force) { $installArgs += '--force' }
if ($Target) { $installArgs += ('--target=' + $Target) }

$installText = 'node scripts/install.mjs'
if ($DryRun) { $installText += ' --dry-run' }
if ($Force) { $installText += ' --force' }
if ($Target) { $installText += (' --target=' + $Target) }
Write-Step "步骤 2/2：安装 pet pack（$installText）"

$nodeInstallInvoke = @($installScript) + $installArgs
& node @nodeInstallInvoke
if ($LASTEXITCODE -ne 0) {
    Fail "安装失败：node scripts/install.mjs 退出码 $LASTEXITCODE。" '请查看上方日志，确认 dist\pet 下存在 aboutme-*-config.json / xiaoxiao-*-config.json 与对应 -animation\，并检查安装目录的写入权限。'
}

# ---------- 6. 结果与后续操作 ----------
if ($DryRun) {
    Write-Step '预览完成（-DryRun，未写入任何文件）'
    Write-Host "    dist\pet 下的 aboutme-* / xiaoxiao-* 将复制到：$installTarget"
    Write-Host '    去掉 -DryRun 再运行一次即可真正安装。'
} else {
    Write-Step '安装完成'

    if (Test-Path -LiteralPath $installTarget -PathType Container) {
        $packs = @(Get-ChildItem -LiteralPath $installTarget -File -Filter '*-config.json' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(aboutme|xiaoxiao)-' })
        if ($packs.Count -gt 0) {
            Write-Ok "已安装 $($packs.Count) 个 pet pack："
            foreach ($pack in $packs) {
                $prefix = $pack.Name -replace '-config\.json$', ''
                $animDir = Join-Path $installTarget ($prefix + '-animation')
                $webmCount = 0
                if (Test-Path -LiteralPath $animDir -PathType Container) {
                    $webmCount = @(Get-ChildItem -LiteralPath $animDir -File -Filter '*.webm' -ErrorAction SilentlyContinue).Count
                }
                Write-Host ("      - {0}（{1} 个动画）" -f $pack.Name, $webmCount)
            }
        }
    }

    Write-Host ''
    Write-Host '下一步：' -ForegroundColor White
    Write-Host '  1. 刷新 DSH 页面（浏览器端）。8 个新 pack 默认 display=none，所以默认只会看到'
    Write-Host '     内置的蓝毛小女仆一只（本机 main 当前配置为仅桌面），这是预期行为。'
    Write-Host '  2. 启用想看的形象：设置 → 桌宠配置 → 种类，选中目标种类（aboutme-dragon /'
    Write-Host '     aboutme-claude / aboutme-gemini / xiaoxiao-ojousama / xiaoxiao-huangmao /'
    Write-Host '     xiaoxiao-bailong / xiaoxiao-heihu / xiaoxiao-naicha），把「显示位置」从'
    Write-Host '     「都不显示」改成 仅桌面/仅浏览器/两者，再点「保存」即可出现。'
    Write-Host '  3. 可选：运行 node scripts/patch-dsh-pet.mjs 给 dsh-pet 增加「退出回家」右键菜单'
    Write-Host '     （点击只让这一只退出；--check 检查、--revert 还原；dsh-pet 升级后需重跑）。'
    Write-Host '  4. 桌面模式如连内置小女仆都没出现：在宠物上右键 →「重载配置」，必要时完全退出并重启 DSH。'
}

Write-Host ''
Write-Host "     pet pack 目录：$installTarget" -ForegroundColor DarkGray
Write-Host "     插件日志：$dshHome\dsh-pet\logs.txt" -ForegroundColor DarkGray
