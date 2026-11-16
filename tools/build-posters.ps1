# Renders every poster in the app to an A4 PDF using Microsoft Edge (headless).
# Run from the app folder:  powershell -ExecutionPolicy Bypass -File tools\build-posters.ps1
# Output: posters\classroom\<id>.pdf and posters\staff\<area>-<stage>-<domain>.pdf
param([string]$Edge = '')
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
if (-not $Edge) {
  $Edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $Edge) { throw 'Microsoft Edge was not found. Pass -Edge "path\to\msedge.exe".' }

$index = 'file:///' + ((Join-Path $root 'index.html') -replace '\\', '/' -replace ' ', '%20')
$profile = Join-Path $env:TEMP ('tgs-poster-render-' + [guid]::NewGuid().ToString('N'))
$jobs = @()

$posters = Get-Content (Join-Path $root 'data\posters.js') -Raw
foreach ($m in [regex]::Matches($posters, '\{\s*id:\s*"([^"]+)",\s*routine:')) {
  $id = $m.Groups[1].Value
  $jobs += @{ url = "$index#/poster/classroom/$id"; out = Join-Path $root "posters\classroom\$id.pdf" }
}
$domains = @{ literacy = @('sl', 'reading', 'writing'); numeracy = @('na', 'mg', 'sp') }
foreach ($a in @('literacy', 'numeracy')) {
  foreach ($s in @('foundational', 'developing', 'consolidating', 'extending')) {
    foreach ($d in $domains[$a]) {
      $jobs += @{ url = "$index#/poster/staff/$a/$s/$d"; out = Join-Path $root "posters\staff\$a-$s-$d.pdf" }
    }
  }
}

New-Item -ItemType Directory -Force (Join-Path $root 'posters\classroom'), (Join-Path $root 'posters\staff') | Out-Null
$ok = 0; $failed = @()
foreach ($j in $jobs) {
  if (Test-Path $j.out) { Remove-Item $j.out -Force }
  $edgeArgs = '--headless=new --disable-gpu --no-first-run --no-pdf-header-footer --allow-file-access-from-files ' +
              '--virtual-time-budget=4000 "--user-data-dir=' + $profile + '" "--print-to-pdf=' + $j.out + '" "' + $j.url + '"'
  $p = Start-Process -FilePath $Edge -ArgumentList $edgeArgs -Wait -PassThru -WindowStyle Hidden
  if ((Test-Path $j.out) -and (Get-Item $j.out).Length -gt 5000) { $ok++ } else { $failed += $j.out }
}
try { Remove-Item $profile -Recurse -Force -ErrorAction Stop } catch {}
"Rendered $ok of $($jobs.Count) posters."
if ($failed.Count) { "Failed:"; $failed }
