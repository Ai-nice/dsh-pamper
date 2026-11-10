param([string]$StatePath)
Add-Type -AssemblyName PresentationFramework, PresentationCore, WindowsBase, System.Windows.Forms
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class PamperTop {
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
'@

$state = Get-Content -Raw -Encoding UTF8 -LiteralPath $StatePath | ConvertFrom-Json
$app = New-Object System.Windows.Application
$app.ShutdownMode = 'OnExplicitShutdown'
$windows = New-Object System.Collections.ArrayList
$timers = New-Object System.Collections.ArrayList
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea

function Set-PetDisplay($id, $display) {
  if (-not $apiBase -or -not $id) { return }
  try {
    Invoke-RestMethod -Method Post -Uri ($apiBase + '/dsh-pamper-7470/pet-display') -ContentType 'application/json' -Body (@{ id = $id; display = $display } | ConvertTo-Json) | Out-Null
  } catch {}
}

function Play-PetAction($kind, $action, $frameState) {
  if (-not $apiBase -or -not $kind -or -not $action) { return }
  try {
    $result = Invoke-RestMethod -Method Get -Uri ($apiBase + '/dsh-pamper-7470/frames?kind=' + [Uri]::EscapeDataString($kind) + '&action=' + [Uri]::EscapeDataString($action))
    $frames = @($result.frames)
    if ($result.ok -and $frames.Count -gt 0) {
      $frameState.mode = 'action'
      $frameState.frames = $frames
      $frameState.index = 0
    }
  } catch {}
}

function Invoke-PetMenuAction($node, $pet, $window, $frameState) {
  $action = [string]$node.action
  if ($action -eq 'hide') {
    Hide-Pet $pet.id
    $window.Close()
    return
  }
  if ($action -eq 'set-display') {
    Set-PetDisplay $pet.id ([string]$node.display)
    if ($node.display -ne 'desktop' -and $node.display -ne 'both') { $window.Close() }
    return
  }
  if ($action -eq 'home') {
    return
  }
  if ($action -eq 'anim') {
    Play-PetAction $pet.kind ([string]$node.anim) $frameState
    return
  }
  return
}

function Add-PetMenuNodes($collection, $nodes, $pet, $window, $frameState) {
  foreach ($node in @($nodes)) {
    if ($null -eq $node) { continue }
    $item = New-Object System.Windows.Controls.MenuItem
    $item.Header = [string]$node.label
    $children = @($node.children)
    if ($children.Count -gt 0) {
      Add-PetMenuNodes $item.Items $children $pet $window $frameState
    } else {
      $item.Add_Click({ Invoke-PetMenuAction $node $pet $window $frameState }.GetNewClosure())
    }
    $collection.Add($item) | Out-Null
  }
}

function Hide-Pet($id) {
  if (-not $apiBase -or -not $id) { return }
  try {
    Invoke-RestMethod -Method Post -Uri ($apiBase + '/dsh-pamper-7470/pet-display') -ContentType 'application/json' -Body (@{ id = $id; display = 'none' } | ConvertTo-Json) | Out-Null
  } catch {}
}

function Reload-Desktop {
  if (-not $apiBase) { return }
  try {
    Invoke-RestMethod -Method Post -Uri ($apiBase + '/dsh-pamper-7470/desktop/start') | Out-Null
  } catch {}
}


function Place-Window($window, $pet, $aspect) {
  $dpi = [System.Windows.Media.VisualTreeHelper]::GetDpi($window)
  $scaleX = if ($dpi.DpiScaleX -gt 0) { $dpi.DpiScaleX } else { 1.0 }
  $scaleY = if ($dpi.DpiScaleY -gt 0) { $dpi.DpiScaleY } else { 1.0 }
  $widthPx = [Math]::Max(120, [Math]::Min([double]$pet.size, 900))
  $heightPx = [Math]::Round($widthPx * $aspect)
  $marginX = [double]$pet.marginX
  $marginY = [double]$pet.marginY
  $window.Width = $widthPx / $scaleX
  $window.Height = $heightPx / $scaleY
  $physLeft = $screen.Left / $scaleX
  $physTop = $screen.Top / $scaleY
  $physRight = $screen.Right / $scaleX
  $physBottom = $screen.Bottom / $scaleY
  if ($pet.corner -like '*left*') { $leftPx = $physLeft + $marginX } else { $leftPx = $physRight - $marginX - $widthPx }
  if ($pet.corner -like '*bottom*') { $topPx = $physBottom - $marginY - $heightPx } else { $topPx = $physTop + $marginY }
  $window.Left = $leftPx / $scaleX
  $window.Top = $topPx / $scaleY
  try { Add-Content -LiteralPath (Join-Path $env:DSH_HOME 'pamper/desktop-placement.log') -Value ((Get-Date).ToString('o') + ' ' + $pet.kind + ' screen=' + $screen.Left + ',' + $screen.Top + ',' + $screen.Width + ',' + $screen.Height + ' dpi=' + $dpi.DpiScaleX + ',' + $dpi.DpiScaleY + ' size=' + $widthPx + 'x' + $heightPx + ' margin=' + $marginX + ',' + $marginY + ' leftPx=' + $leftPx + ' topPx=' + $topPx + ' win=' + $window.Left + ',' + $window.Top + ',' + $window.Width + ',' + $window.Height) -Encoding UTF8 } catch {}
}

foreach ($pet in @($state.pets)) {
  $frameList = @($pet.frames)
  if ($frameList.Count -eq 0) { continue }
  $window = New-Object System.Windows.Window
  $window.Title = 'pamper-desktop-helper'
  $window.WindowStyle = 'None'
  $window.AllowsTransparency = $true
  $window.Background = 'Transparent'
  $window.Topmost = $true
  $window.ShowInTaskbar = $false
  $window.ResizeMode = 'NoResize'
  $window.Focusable = $true
  $canvas = New-Object System.Windows.Controls.Canvas
  $canvas.Background = 'Transparent'
  $window.Content = $canvas
  $image = New-Object System.Windows.Controls.Image
  $image.Stretch = 'Uniform'
  $image.HorizontalAlignment = 'Stretch'
  $image.VerticalAlignment = 'Stretch'
  [System.Windows.Automation.AutomationProperties]::SetName($image, 'pamper-pet-' + $pet.kind)
  $canvas.Children.Add($image) | Out-Null

  $clickFrames = @($pet.clicks)
  $dragFrames = @($pet.drag)
  $frameState = @{ index = 0; mode = 'idle'; frames = $frameList; idleFrames = $frameList; clickFrames = $clickFrames; dragFrames = $dragFrames }
  $loadFrame = {
    param($i)
    $bitmap = New-Object System.Windows.Media.Imaging.BitmapImage
    $bitmap.BeginInit()
    $bitmap.UriSource = [Uri]$frameState.frames[$i]
    $bitmap.CacheOption = 'OnLoad'
    $bitmap.EndInit()
    $image.Source = $bitmap
    [System.Windows.Automation.AutomationProperties]::SetHelpText($image, [string]$i)
  }
  & $loadFrame 0
  $aspect = 1.0
  if ($image.Source -and $image.Source.PixelWidth -gt 0) {
    $aspect = [double]$image.Source.PixelHeight / [double]$image.Source.PixelWidth
  }
  $timer = New-Object System.Windows.Threading.DispatcherTimer
  $timer.Interval = [TimeSpan]::FromMilliseconds(83)
  $timer.Add_Tick({
    if ($frameState.frames.Count -gt 0) {
      $frameState.index = ($frameState.index + 1) % $frameState.frames.Count
      & $loadFrame $frameState.index
    }
    if ($frameState.mode -ne 'idle' -and $frameState.index -eq 0) {
      $frameState.mode = 'idle'
      $frameState.frames = $frameState.idleFrames
      & $loadFrame 0
    }
  }.GetNewClosure())
  $timer.Start()
  $timers.Add($timer) | Out-Null

  $menu = New-Object System.Windows.Controls.ContextMenu
  Add-PetMenuNodes $menu.Items @($pet.menu) $pet $window $frameState
  $window.ContextMenu = $menu
  $canvas.ContextMenu = $menu
  $image.ContextMenu = $menu
  $window.Add_MouseRightButtonUp({
    param($sender, $event)
    $menu.IsOpen = $true
    $event.Handled = $true
  }.GetNewClosure())
  $drag = @{ active = $false; moved = $false; start = $null; left = 0; top = 0 }
  $window.Add_MouseLeftButtonDown({
    param($sender, $event)
    $drag.active = $true
    $drag.moved = $false
    $drag.start = [System.Windows.Input.Mouse]::GetPosition($window)
    $drag.left = $window.Left
    $drag.top = $window.Top
    $window.CaptureMouse() | Out-Null
    $event.Handled = $true
  }.GetNewClosure())
  $window.Add_MouseMove({
    param($sender, $event)
    if (-not $drag.active) { return }
    if ([System.Windows.Input.Mouse]::LeftButton -ne [System.Windows.Input.MouseButtonState]::Pressed) { return }
    $current = [System.Windows.Input.Mouse]::GetPosition($window)
    $dx = [Math]::Abs($current.X - $drag.start.X)
    $dy = [Math]::Abs($current.Y - $drag.start.Y)
    if ($dx -gt 4 -or $dy -gt 4) {
      if (-not $drag.moved -and $frameState.dragFrames.Count -gt 0) {
        $frameState.mode = 'drag'
        $frameState.frames = $frameState.dragFrames
        $frameState.index = 0
      }
      $drag.moved = $true
      $window.Left = $drag.left + ($current.X - $drag.start.X)
      $window.Top = $drag.top + ($current.Y - $drag.start.Y)
    }
  }.GetNewClosure())
  $window.Add_MouseLeftButtonUp({
    param($sender, $event)
    $drag.active = $false
    $window.ReleaseMouseCapture()
    if (-not $drag.moved) {
      if ($frameState.clickFrames.Count -gt 0) {
        $frameState.mode = 'click'
        $frameState.frames = $frameState.clickFrames
        $frameState.index = 0
      }
    } else {
      $frameState.mode = 'idle'
      $frameState.frames = $frameState.idleFrames
      $frameState.index = 0
    }
    $event.Handled = $true
  }.GetNewClosure())

  $windows.Add($window) | Out-Null
  $window.Show() | Out-Null
  Place-Window $window $pet $aspect
  $image.Width = $window.Width
  $image.Height = $window.Height
  $image.Stretch = 'Uniform'
  $window.Topmost = $false
  $window.Topmost = $true
  try { $window.Activate() | Out-Null } catch {}
  $interop = New-Object System.Windows.Interop.WindowInteropHelper($window)
  $handle = $interop.Handle
  try { [PamperTop]::SetForegroundWindow($handle) | Out-Null } catch {}
  $topCtx = @{ handle = $handle; window = $window }
  $topTimer = New-Object System.Windows.Threading.DispatcherTimer
  $topTimer.Interval = [TimeSpan]::FromMilliseconds(200)
  $topTimer.Add_Tick({ [PamperTop]::SetWindowPos([IntPtr]$topCtx.handle, [IntPtr](-1), 0, 0, 0, 0, 0x0013) | Out-Null; $topCtx.window.Topmost = $true }.GetNewClosure())
  $topTimer.Start()
  $timers.Add($topTimer) | Out-Null
}

[System.Windows.Threading.Dispatcher]::Run() | Out-Null







