param([string]$StatePath)
Add-Type -AssemblyName PresentationFramework, PresentationCore, WindowsBase
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class PamperWin {
  [DllImport("user32.dll")] public static extern int GetWindowLong(IntPtr h, int index);
  [DllImport("user32.dll")] public static extern int SetWindowLong(IntPtr h, int index, int value);
}
'@
$state = Get-Content -Raw -Encoding UTF8 -LiteralPath $StatePath | ConvertFrom-Json
$window = New-Object System.Windows.Window
$window.Title = 'pamper-desktop-helper'
$window.WindowStyle = 'None'
$window.AllowsTransparency = $true
$window.Background = 'Transparent'
$window.Topmost = $true
$window.ShowInTaskbar = $false
$window.ResizeMode = 'NoResize'
$screen = [System.Windows.SystemParameters]::WorkArea
$window.Left = $screen.Left
$window.Top = $screen.Top
$window.Width = $screen.Width
$window.Height = $screen.Height
$canvas = New-Object System.Windows.Controls.Canvas
$canvas.Background = 'Transparent'
$window.Content = $canvas
$frames = @{}
$timers = New-Object System.Collections.ArrayList

$window.Add_SourceInitialized({
  $dpi = [System.Windows.Media.VisualTreeHelper]::GetDpi($window)
  $window.Width = $window.Width / $dpi.DpiScaleX
  $window.Height = $window.Height / $dpi.DpiScaleY
  $window.Left = 0
  $window.Top = 0
  $helper = New-Object System.Windows.Interop.WindowInteropHelper($window)
  $handle = $helper.Handle
  $style = [PamperWin]::GetWindowLong($handle, -20)
  [PamperWin]::SetWindowLong($handle, -20, $style -bor 0x20 -bor 0x80000) | Out-Null
})

foreach ($pet in @($state.pets)) {
  $frameList = @($pet.frames)
  if ($frameList.Count -eq 0) { continue }
  $width = [Math]::Max(120, [Math]::Min([double]$pet.size, 900))
  $height = [Math]::Round($width * 9 / 16)
  $image = New-Object System.Windows.Controls.Image
  $image.Width = $width
  $image.Height = $height
  $image.Stretch = 'Uniform'
  [System.Windows.Automation.AutomationProperties]::SetName($image, 'pamper-pet-' + $pet.kind)
  if ($pet.corner -like '*left*') { [System.Windows.Controls.Canvas]::SetLeft($image, [double]$pet.marginX) }
  else { [System.Windows.Controls.Canvas]::SetRight($image, [double]$pet.marginX) }
  if ($pet.corner -like '*bottom*') { [System.Windows.Controls.Canvas]::SetBottom($image, [double]$pet.marginY) }
  else { [System.Windows.Controls.Canvas]::SetTop($image, [double]$pet.marginY) }
  $canvas.Children.Add($image) | Out-Null

  $frameState = @{ index = 0 }
  $loadFrame = {
    param($i)
    $bitmap = New-Object System.Windows.Media.Imaging.BitmapImage
    $bitmap.BeginInit()
    $bitmap.UriSource = [Uri]$frameList[$i]
    $bitmap.CacheOption = 'OnLoad'
    $bitmap.EndInit()
    $image.Source = $bitmap
    [System.Windows.Automation.AutomationProperties]::SetHelpText($image, [string]$i)
  }
  & $loadFrame 0
  $timer = New-Object System.Windows.Threading.DispatcherTimer
  $timer.Interval = [TimeSpan]::FromMilliseconds(83)
  $timer.Add_Tick({
    $frameState.index = ($frameState.index + 1) % $frameList.Count
    & $loadFrame $frameState.index
  }.GetNewClosure())
  $timer.Start()
  $timers.Add($timer) | Out-Null
}

$window.ShowDialog() | Out-Null
