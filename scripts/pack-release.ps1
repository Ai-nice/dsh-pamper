# 生成 GitHub 发布用的产物（Windows PowerShell 5.1+）
# 用法：powershell -NoProfile -ExecutionPolicy Bypass -File scripts/pack-release.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$release = Join-Path $root 'release'
$liteDir = Join-Path $release 'lite'
$liteZip = Join-Path $release 'desktop-pet-lite.zip'
$baseZip = Join-Path $release 'pets-base.zip'

Write-Host '[pack-release] 清理 release/'
if (Test-Path $release) { Remove-Item $release -Recurse -Force }
New-Item -ItemType Directory -Force -Path $liteDir | Out-Null

$excludeDirs = @('.git', 'node_modules', '.build-tmp', 'release', 'dist', 'webm-store', 'assets\pet-store', 'assets\spritesheet-cache')
$excludeArgs = @()
foreach ($d in $excludeDirs) {
  $excludeArgs += '/XD'
  $excludeArgs += (Join-Path $root $d)
}

Write-Host '[pack-release] 复制轻量仓库文件'
$roboArgs = @($root, $liteDir, '/E', '/R:1', '/W:1', '/NFL', '/NDL', '/NP', '/NJH') + $excludeArgs
$robo = Start-Process robocopy -ArgumentList $roboArgs -Wait -PassThru -NoNewWindow
if ($robo.ExitCode -ge 8) { throw "robocopy 失败，exit=$($robo.ExitCode)" }

Write-Host '[pack-release] 打包 desktop-pet-lite.zip'
Compress-Archive -Path (Join-Path $liteDir '*') -DestinationPath $liteZip -Force

if (Test-Path (Join-Path $root 'dist')) {
  Write-Host '[pack-release] 打包 pets-base.zip（8 个基础形象）'
  Push-Location $root
  Compress-Archive -Path 'dist' -DestinationPath $baseZip -Force
  Pop-Location
} else {
  Write-Warning 'dist/ 不存在，跳过 pets-base.zip（先运行 node scripts/build.mjs）'
}

$actionsZips = @()
$packRoot = Join-Path $root 'webm-store\pets'
if (Test-Path $packRoot) {
  Write-Host '[pack-release] 打包每个动作包的 WebM（GitHub Release 可选用）'
  foreach ($packDir in Get-ChildItem $packRoot -Directory) {
    $zip = Join-Path $release ("actions-webm-" + $packDir.Name + '.zip')
    Push-Location (Join-Path $root 'webm-store')
    Compress-Archive -Path (Join-Path 'pets' $packDir.Name) -DestinationPath $zip -Force
    Pop-Location
    $sizeMb = [math]::Round((Get-Item $zip).Length / 1MB, 1)
    $actionsZips += [ordered]@{ name = (Split-Path $zip -Leaf); sizeMiB = $sizeMb }
    Write-Host ("  - " + $packDir.Name + ': ' + $sizeMb + ' MiB')
  }
}

$baseSize = $null
if (Test-Path $baseZip) { $baseSize = [math]::Round((Get-Item $baseZip).Length / 1MB, 1) }
$manifest = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  liteSizeMiB = [math]::Round((Get-Item $liteZip).Length / 1MB, 1)
  basePackSizeMiB = $baseSize
  actionsZips = $actionsZips
}
$manifest | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $release 'manifest.json') -Encoding UTF8

Write-Host '[pack-release] 完成，产物在 release/：'
Get-ChildItem $release -File | Select-Object Name, @{ n = 'MiB'; e = { [math]::Round($_.Length / 1MB, 1) } } | Format-Table -AutoSize
