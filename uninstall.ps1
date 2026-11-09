<#
.SYNOPSIS
    卸载 pamper 安装到 dsh-pet 的 pet pack（aboutme-* 与 xiaoxiao-*）。

.DESCRIPTION
    只删除 $DSH_HOME\dsh-pet\pet\ 下由本项目安装的 8 个 pack（3 个 aboutme-* + 5 个 xiaoxiao-*）：
      · aboutme-*-config.json / xiaoxiao-*-config.json
      · aboutme-*-animation\ / xiaoxiao-*-animation\（目录）
      · aboutme-*-avatar.* / xiaoxiao-*-avatar.*（本项目实际只有 xiaoxiao 5 个角色带头像）
    绝不触碰 dsh-pet 自带的 pet pack（例如 main-config.jsonc 与其它 <名>-config.json）。

    本脚本只卸载 pet pack，不会还原给 dsh-pet 打的「退出回家」补丁；
    需要恢复原生右键菜单时单独运行 node scripts/patch-dsh-pet.mjs --revert。

    默认先打印将要删除的绝对路径；加 -WhatIf 只预览不删除（PowerShell 标准行为）。
    支持 -Confirm 逐个确认。建议先退出 DSH / 关掉桌宠窗口，避免 WebM 文件被占用。

.PARAMETER WhatIf
    只显示会删除哪些文件与目录，不实际删除。

.PARAMETER PurgeDist
    同时清空项目 dist\pet\ 下由本项目生成的 aboutme-* / xiaoxiao-* 产物（可选，默认保留）。

.PARAMETER Target
    自定义安装目录，默认 %DSH_HOME%\dsh-pet\pet。仅在用 install.ps1 -Target 装到别处时需要。

.EXAMPLE
    .\uninstall.ps1 -WhatIf
    预览将删除的 pet pack。

.EXAMPLE
    .\uninstall.ps1
    删除本项目安装的全部 aboutme-* / xiaoxiao-* pet pack。

.EXAMPLE
    .\uninstall.ps1 -PurgeDist
    卸载 pet pack，并清空 dist\pet 中的生成产物（下次安装需要重新构建）。

.NOTES
    兼容 Windows PowerShell 5.1 与 PowerShell 7+。
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param(
    [switch]$PurgeDist,
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

function Resolve-DshHome {
    if ($env:DSH_HOME -and $env:DSH_HOME.Trim() -ne '') {
        return $env:DSH_HOME.Trim()
    }
    return (Join-Path $HOME '.dsh')
}

$ProjectRoot = $PSScriptRoot
if (-not $ProjectRoot) {
    $ProjectRoot = (Get-Location).Path
}

$dshHome = Resolve-DshHome
if ($Target) {
    $petDir = $Target
} else {
    $petDir = Join-Path $dshHome 'dsh-pet\pet'
}

Write-Step 'pamper 卸载脚本'
Write-Host "    DSH_HOME：$dshHome"
Write-Host "    pet 目录：$petDir"
Write-Host '    删除范围：仅 aboutme-*/xiaoxiao-* 的 -config.json、-animation\ 目录与 -avatar.* 头像（3 + 5 个 pack），不碰其它 pet pack。'

# ---------- 1. 收集目标 ----------
$configs = @()
$animationDirs = @()
$avatarFiles = @()
if (Test-Path -LiteralPath $petDir -PathType Container) {
    $configs = @(Get-ChildItem -LiteralPath $petDir -File -Filter '*-config.json' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(aboutme|xiaoxiao)-' } | Sort-Object Name)
    $animationDirs = @(Get-ChildItem -LiteralPath $petDir -Directory -Filter '*-animation' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(aboutme|xiaoxiao)-' } | Sort-Object Name)
    $avatarFiles = @(Get-ChildItem -LiteralPath $petDir -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -match '^(aboutme|xiaoxiao)-.+-avatar\.(png|webp|jpg|jpeg|gif)$' } | Sort-Object Name)
}

$otherPacks = @()
if (Test-Path -LiteralPath $petDir -PathType Container) {
    $otherPacks = @(Get-ChildItem -LiteralPath $petDir -File -Filter '*-config.json' -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notmatch '^(aboutme|xiaoxiao)-' })
}

if ($configs.Count -eq 0 -and $animationDirs.Count -eq 0 -and $avatarFiles.Count -eq 0) {
    Write-Host ''
    Write-Host '没有找到需要卸载的 pamper pet pack（aboutme-* / xiaoxiao-*）。' -ForegroundColor Yellow
    if ($otherPacks.Count -gt 0) {
        Write-Note "该目录下其它 pet pack 保持原样，共 $($otherPacks.Count) 个：$((($otherPacks | ForEach-Object { $_.Name }) -join '、'))"
    }
    Write-Host "如需卸载 dsh-pet 插件本体，请执行：dsh plugin --profile <你的 profile> remove dsh-pet" -ForegroundColor DarkGray
    exit 0
}

Write-Host ''
Write-Host '将删除以下文件/目录（绝对路径）：' -ForegroundColor White
foreach ($config in $configs) {
    Write-Host "    - $($config.FullName)" -ForegroundColor Yellow
}
foreach ($dir in $animationDirs) {
    Write-Host "    - $($dir.FullName)" -ForegroundColor Yellow
}
foreach ($avatar in $avatarFiles) {
    Write-Host "    - $($avatar.FullName)" -ForegroundColor Yellow
}
if ($otherPacks.Count -gt 0) {
    Write-Host ''
    Write-Note "保留其它 pet pack $($otherPacks.Count) 个：$((($otherPacks | ForEach-Object { $_.Name }) -join '、'))"
}

# ---------- 2. 删除（支持 -WhatIf / -Confirm） ----------
$failures = @()

Write-Step '删除 pet pack'
foreach ($config in $configs) {
    if ($PSCmdlet.ShouldProcess($config.FullName, '删除配置文件')) {
        try {
            Remove-Item -LiteralPath $config.FullName -Force -ErrorAction Stop
            Write-Ok "已删除 $($config.FullName)"
        } catch {
            $failures += $config.FullName
            Write-Note "删除失败：$($config.FullName)（$($_.Exception.Message)）"
        }
    }
}
foreach ($dir in $animationDirs) {
    if ($PSCmdlet.ShouldProcess($dir.FullName, '删除动画目录')) {
        try {
            Remove-Item -LiteralPath $dir.FullName -Recurse -Force -ErrorAction Stop
            Write-Ok "已删除 $($dir.FullName)"
        } catch {
            $failures += $dir.FullName
            Write-Note "删除失败：$($dir.FullName)（$($_.Exception.Message)）"
        }
    }
}
foreach ($avatar in $avatarFiles) {
    if ($PSCmdlet.ShouldProcess($avatar.FullName, '删除角色头像')) {
        try {
            Remove-Item -LiteralPath $avatar.FullName -Force -ErrorAction Stop
            Write-Ok "已删除 $($avatar.FullName)"
        } catch {
            $failures += $avatar.FullName
            Write-Note "删除失败：$($avatar.FullName)（$($_.Exception.Message)）"
        }
    }
}

# ---------- 3. 可选：清理项目 dist 产物 ----------
if ($PurgeDist) {
    $distPetDir = Join-Path $ProjectRoot 'dist\pet'
    $distConfigs = @()
    $distDirs = @()
    if (Test-Path -LiteralPath $distPetDir -PathType Container) {
        $distConfigs = @(Get-ChildItem -LiteralPath $distPetDir -File -Filter '*-config.json' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(aboutme|xiaoxiao)-' })
        $distDirs = @(Get-ChildItem -LiteralPath $distPetDir -Directory -Filter '*-animation' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^(aboutme|xiaoxiao)-' })
    }

    Write-Step '清理项目生成产物（-PurgeDist）'
    if ($distConfigs.Count -eq 0 -and $distDirs.Count -eq 0) {
        Write-Note "dist\pet 下没有 aboutme-*/xiaoxiao-* 产物：$distPetDir"
    } else {
        foreach ($file in $distConfigs) {
            if ($PSCmdlet.ShouldProcess($file.FullName, '删除 dist 产物（配置）')) {
                try {
                    Remove-Item -LiteralPath $file.FullName -Force -ErrorAction Stop
                    Write-Ok "已删除 $($file.FullName)"
                } catch {
                    $failures += $file.FullName
                    Write-Note "删除失败：$($file.FullName)（$($_.Exception.Message)）"
                }
            }
        }
        foreach ($dir in $distDirs) {
            if ($PSCmdlet.ShouldProcess($dir.FullName, '删除 dist 产物（动画目录）')) {
                try {
                    Remove-Item -LiteralPath $dir.FullName -Recurse -Force -ErrorAction Stop
                    Write-Ok "已删除 $($dir.FullName)"
                } catch {
                    $failures += $dir.FullName
                    Write-Note "删除失败：$($dir.FullName)（$($_.Exception.Message)）"
                }
            }
        }
    }
}

# ---------- 4. 结果 ----------
Write-Step '完成'
if ($failures.Count -gt 0) {
    Write-Host "有 $($failures.Count) 项删除失败（文件可能被 DSH / 桌宠窗口占用）：" -ForegroundColor Red
    foreach ($item in $failures) { Write-Host "    - $item" -ForegroundColor Red }
    Write-Host '请完全退出 DSH 后重新运行本脚本。' -ForegroundColor Yellow
    exit 1
}

if ($WhatIfPreference) {
    Write-Note '以上为 -WhatIf 预览，未删除任何文件。去掉 -WhatIf 再运行一次即可真正卸载。'
} else {
    Write-Ok 'pamper 的 pet pack 已卸载。'
    Write-Host ''
    Write-Host '刷新 DSH 页面后，这些形象会从「桌宠配置 → 种类」条中消失。' -ForegroundColor White
    Write-Host '设置页里残留的实例配置不影响使用；如需彻底清理，可在设置页删除对应实例后保存。' -ForegroundColor DarkGray
}
