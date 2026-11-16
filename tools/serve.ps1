# Minimal static file server for previewing the site locally (no Python/Node needed).
# Usage: powershell -ExecutionPolicy Bypass -File tools\serve.ps1 [-Port 8080]
param([int]$Port = 8080)
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.json'='application/json'; '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.ico'='image/x-icon'; '.md'='text/plain; charset=utf-8' }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
      if ($rel -eq '') { $rel = 'index.html' }
      $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
      $res = $ctx.Response
      $res.Headers.Add('Cache-Control', 'no-store')
      if ($path.StartsWith($root) -and (Test-Path $path -PathType Leaf)) {
        [byte[]]$bytes = [IO.File]::ReadAllBytes($path)
        $ext = [IO.Path]::GetExtension($path).ToLower()
        $res.ContentType = $(if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' })
        $res.SendChunked = $true
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $res.StatusCode = 404
      }
      Write-Host "$($ctx.Request.HttpMethod) /$rel $($res.StatusCode)"
    } catch {
      Write-Host "Error serving $($ctx.Request.Url): $($_.Exception.Message)"
    } finally {
      try { $ctx.Response.Close() } catch {}
    }
  }
} finally { $listener.Stop() }
