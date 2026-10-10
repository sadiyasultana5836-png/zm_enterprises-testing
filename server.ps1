$port = 8080
$path = "C:\Users\sadiy\Desktop\ZM Enterprises Tailoring App"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "Server running on http://localhost:$port/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath)) { $urlPath = "index.html" }
        
        $fullPath = Join-Path $path $urlPath
        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($fullPath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($fullPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($fullPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($fullPath.EndsWith(".json")) { $response.ContentType = "application/json" }
            elseif ($fullPath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            elseif ($fullPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($fullPath.EndsWith(".jpg") -or $fullPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($fullPath.EndsWith(".webp")) { $response.ContentType = "image/webp" }
            elseif ($fullPath.EndsWith(".ico")) { $response.ContentType = "image/x-icon" }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
            $response.OutputStream.Write($buf, 0, $buf.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # ignore client disconnect
    }
}
