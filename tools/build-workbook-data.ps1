# Regenerates data/workbook.js from "Literacy Numeracy Progressions Alignment.xlsx".
# Run from the app folder:  powershell -ExecutionPolicy Bypass -File tools\build-workbook-data.ps1
# Works even while the workbook is open in Excel.
param(
  [string]$Workbook = (Join-Path $PSScriptRoot '..\..\Literacy Numeracy Progressions Alignment.xlsx'),
  [string]$Out = (Join-Path $PSScriptRoot '..\data\workbook.js')
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$fs = [IO.File]::Open((Resolve-Path $Workbook), 'Open', 'Read', 'ReadWrite')
$zip = New-Object IO.Compression.ZipArchive($fs, [IO.Compression.ZipArchiveMode]::Read)
function Entry($name) { $e = $zip.GetEntry($name); if (-not $e) { return $null }; $r = New-Object IO.StreamReader($e.Open()); $t = $r.ReadToEnd(); $r.Close(); $t }

$shared = @()
$sx = Entry 'xl/sharedStrings.xml'
if ($sx) { [xml]$sd = $sx; foreach ($si in $sd.sst.si) { $shared += $si.InnerText } }
[xml]$wb = Entry 'xl/workbook.xml'
[xml]$rels = Entry 'xl/_rels/workbook.xml.rels'

function Clean([string]$v) {
  if ($null -eq $v) { return '' }
  $v = $v -replace '--', [string][char]0x2014   # em dash (kept ASCII-only so PowerShell 5.1 reads this file correctly)
  return $v.Trim()
}

$sheets = [ordered]@{}
foreach ($s in $wb.workbook.sheets.sheet) {
  $rid = $s.GetAttribute('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
  $target = ($rels.Relationships.Relationship | Where-Object { $_.Id -eq $rid }).Target -replace '^/xl/', ''
  [xml]$sh = Entry ('xl/' + $target)
  $rows = @{}
  foreach ($row in $sh.worksheet.sheetData.row) {
    foreach ($c in $row.c) {
      $v = $c.v
      if ($c.t -eq 's') { $v = $shared[[int]$v] } elseif ($c.t -eq 'inlineStr') { $v = $c.is.InnerText }
      if ($v) {
        $m = [regex]::Match($c.r, '^([A-Z]+)(\d+)$')
        $rn = [int]$m.Groups[2].Value
        if (-not $rows.ContainsKey($rn)) { $rows[$rn] = @{} }
        $rows[$rn][$m.Groups[1].Value] = Clean $v
      }
    }
  }
  $sheets[$s.name] = $rows
}
$zip.Dispose(); $fs.Close()

$years = @('P','1','2','3','4','5','6','7','8','9','10')
$gridCols = @('E','F','G','H','I','J','K','L','M','N','O')
$subjCols = @('B','C','D','E','F','G','H','I','J','K','L')

$result = [ordered]@{ generated = (Get-Date -Format 'yyyy-MM-dd'); preface = @(); grids = [ordered]@{}; subjects = [ordered]@{} }

foreach ($k in ($sheets['Preface'].Keys | Sort-Object)) { if ($sheets['Preface'][$k]['A']) { $result.preface += $sheets['Preface'][$k]['A'] } }

foreach ($name in @('Literacy','Numeracy')) {
  $rows = $sheets[$name]; $list = @()
  foreach ($rn in ($rows.Keys | Where-Object { $_ -ge 6 } | Sort-Object)) {
    $r = $rows[$rn]; if (-not $r['B']) { continue }
    $y = [ordered]@{}; for ($i = 0; $i -lt 11; $i++) { $y[$years[$i]] = $r[$gridCols[$i]] }
    $list += [ordered]@{ element = $r['A']; sub = $r['B']; levels = $r['C']; constrained = ($r['D'] -eq 'Yes'); years = $y; notes = $r['P'] }
  }
  $result.grids[$name.ToLower()] = [ordered]@{ title = $rows[1]['A']; subtitle = $rows[2]['A']; rows = $list }
}

foreach ($name in $sheets.Keys) {
  if ($name -notmatch '^(.+) \((Literacy|Numeracy)\)$') { continue }
  $subject = $matches[1]; $kind = $matches[2].ToLower()
  $rows = $sheets[$name]; $list = @()
  foreach ($rn in ($rows.Keys | Where-Object { $_ -ge 6 } | Sort-Object)) {
    $r = $rows[$rn]; if (-not $r['A']) { continue }
    $y = [ordered]@{}; for ($i = 0; $i -lt 11; $i++) { $y[$years[$i]] = $r[$subjCols[$i]] }
    $list += [ordered]@{ domain = $r['A']; years = $y; notes = $r['M'] }
  }
  if (-not $result.subjects.Contains($subject)) { $result.subjects[$subject] = [ordered]@{} }
  $result.subjects[$subject][$kind] = [ordered]@{ title = $rows[1]['A']; rows = $list }
}

$json = $result | ConvertTo-Json -Depth 10 -Compress
$header = "// GENERATED from 'Literacy Numeracy Progressions Alignment.xlsx' by tools/build-workbook-data.ps1 - do not edit by hand.`n"
[IO.File]::WriteAllText((Join-Path (Resolve-Path (Split-Path $Out)) (Split-Path $Out -Leaf)), $header + "window.WORKBOOK = $json;`n", (New-Object Text.UTF8Encoding($false)))
"Wrote $Out : literacy rows $($result.grids.literacy.rows.Count), numeracy rows $($result.grids.numeracy.rows.Count), subjects $($result.subjects.Keys -join ', ')"
