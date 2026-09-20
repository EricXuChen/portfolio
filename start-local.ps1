# Start Eric's portfolio locally and open it in the default browser.
# Windows:  Right-click this file → Run with PowerShell
#           or in PowerShell:  .\start-local.ps1
# macOS (PowerShell 7):  pwsh ./start-local.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

$env:PATH = "$env:HOME/.local/node/bin;$env:USERPROFILE/.local/node/bin;" + $env:PATH

function Find-Command([string[]]$Names) {
  foreach ($Name in $Names) {
    $Cmd = Get-Command $Name -ErrorAction SilentlyContinue
    if ($Cmd) { return $Cmd.Source }
  }
  return $null
}

function Find-Python {
  # Prefer the real installer / py launcher over the Windows Store stub.
  $Candidates = @(
    "$env:LOCALAPPDATA\Programs\Python\Python313\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
    "${env:ProgramFiles}\Python313\python.exe",
    "${env:ProgramFiles}\Python312\python.exe"
  )
  foreach ($Candidate in $Candidates) {
    if (Test-Path $Candidate) { return $Candidate }
  }

  $PyLauncher = Find-Command @("py")
  if ($PyLauncher) {
    try {
      $Resolved = & $PyLauncher -3 -c "import sys; print(sys.executable)" 2>$null
      if ($Resolved -and (Test-Path $Resolved) -and ($Resolved -notmatch "WindowsApps")) {
        return $Resolved.Trim()
      }
    } catch {}
  }

  foreach ($Name in @("python3", "python")) {
    $Cmd = Get-Command $Name -ErrorAction SilentlyContinue
    if (-not $Cmd) { continue }
    if ($Cmd.Source -match "WindowsApps") { continue }
    return $Cmd.Source
  }
  return $null
}

$Python = Find-Python
if (-not $Python) {
  Write-Host "Python was not found. Install Python 3 from https://www.python.org/downloads/"
  exit 1
}

$Npm = Find-Command @("npm.cmd", "npm")
if (-not $Npm) {
  Write-Host "Node.js / npm was not found. Install Node.js LTS from https://nodejs.org/"
  exit 1
}

$OnWindows = ($env:OS -eq "Windows_NT")
$VenvDir = Join-Path $Root "backend/.venv"
$VenvPythonUnix = Join-Path $VenvDir "bin/python"
$VenvPythonWin = Join-Path $VenvDir "Scripts/python.exe"

# Prefer a Windows venv; recreate if only a Mac/Linux venv is present.
$VenvPython = $null
if ($OnWindows -and (Test-Path $VenvPythonWin)) {
  $VenvPython = $VenvPythonWin
} elseif (-not $OnWindows -and (Test-Path $VenvPythonUnix)) {
  $VenvPython = $VenvPythonUnix
} elseif (Test-Path $VenvDir) {
  Write-Host "Removing incompatible Python virtual environment..."
  Remove-Item -Recurse -Force $VenvDir
}

if (-not $VenvPython) {
  Write-Host "Creating Python virtual environment..."
  & $Python -m venv $VenvDir
  if (Test-Path $VenvPythonWin) {
    $VenvPython = $VenvPythonWin
  } elseif (Test-Path $VenvPythonUnix) {
    $VenvPython = $VenvPythonUnix
  } else {
    Write-Host "Failed to create a usable Python virtual environment."
    exit 1
  }
}

Write-Host "Installing Python packages..."
& $VenvPython -m pip install --upgrade pip | Out-Null
& $VenvPython -m pip install -r (Join-Path $Root "backend/requirements.txt")

Write-Host "Installing frontend packages..."
Push-Location (Join-Path $Root "frontend")
& $Npm install
Pop-Location

$Backend = Start-Process -FilePath $VenvPython -ArgumentList @("-m", "uvicorn", "app:app", "--reload", "--host", "127.0.0.1", "--port", "8000") -WorkingDirectory (Join-Path $Root "backend") -PassThru -NoNewWindow
$Frontend = Start-Process -FilePath $Npm -ArgumentList @("run", "dev") -WorkingDirectory (Join-Path $Root "frontend") -PassThru -NoNewWindow

$Url = "http://localhost:3000"
Write-Host "Waiting for $Url ..."

$Ready = $false
for ($i = 0; $i -lt 90; $i++) {
  try {
    $null = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    $Ready = $true
    break
  } catch {
    Start-Sleep -Seconds 1
  }
}

if (-not $Ready) {
  Write-Host "The site did not start in time. Check the terminal for errors."
  exit 1
}

Write-Host "Opening $Url in your browser..."
if ($env:OS -eq "Windows_NT") {
  Start-Process $Url
} elseif ($IsMacOS) {
  & open $Url
} elseif ($IsLinux) {
  & xdg-open $Url
} else {
  Start-Process $Url
}

Write-Host ""
Write-Host "Portfolio is running."
Write-Host "  Site:    $Url"
Write-Host "  API:     http://127.0.0.1:8000/api/profile"
Write-Host "Press Ctrl+C to stop, or close this window."
Write-Host ""

try {
  Wait-Process -Id $Frontend.Id
} finally {
  foreach ($Proc in @($Frontend, $Backend)) {
    if ($Proc -and -not $Proc.HasExited) {
      Stop-Process -Id $Proc.Id -Force -ErrorAction SilentlyContinue
    }
  }
}
