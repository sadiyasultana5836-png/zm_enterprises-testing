$port = 8080
$path = if ($PSScriptRoot) { $PSScriptRoot } else { "C:\Users\sadiy\Desktop\ZM Enterprises Tailoring App" }
$dataPath = Join-Path $path "data"
if (-not (Test-Path $dataPath)) { New-Item -ItemType Directory -Path $dataPath -Force | Out-Null }
$ordersDbPath = Join-Path $dataPath "orders.json"
if (-not (Test-Path $ordersDbPath)) { Set-Content -Path $ordersDbPath -Value "[]" -Encoding UTF8 }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "ZM Enterprises Server running on http://localhost:$port/"
Write-Output "API endpoints active: http://localhost:$port/api/orders and /api/notify"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-pin")
        
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        
        # --- Handle /api/orders ---
        if ($urlPath -eq "api/orders" -or $urlPath -eq "api/orders.js") {
            $response.ContentType = "application/json; charset=utf-8"
            
            if ($request.HttpMethod -eq "POST") {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $bodyText = $reader.ReadToEnd()
                $orderObj = $bodyText | ConvertFrom-Json
                
                $ordersJson = Get-Content $ordersDbPath -Raw -Encoding UTF8
                $ordersList = [System.Collections.ArrayList]@()
                if ($ordersJson) {
                    $existing = $ordersJson | ConvertFrom-Json
                    if ($existing) {
                        foreach ($o in $existing) { [void]$ordersList.Add($o) }
                    }
                }
                
                [void]$ordersList.Insert(0, $orderObj)
                $updatedJson = $ordersList | ConvertTo-Json -Depth 10
                Set-Content -Path $ordersDbPath -Value $updatedJson -Encoding UTF8
                
                $resObj = @{
                    success = $true
                    orderId = $orderObj.id
                    totalAmount = $orderObj.totalAmount
                    paymentStatus = "Pending Verification"
                    orderStatus = "Pending Confirmation"
                    message = "Order recorded in persistent local database (data/orders.json)."
                }
                $resBuf = [System.Text.Encoding]::UTF8.GetBytes(($resObj | ConvertTo-Json))
                $response.OutputStream.Write($resBuf, 0, $resBuf.Length)
            }
            elseif ($request.HttpMethod -eq "GET") {
                $lookupId = $request.QueryString["lookupId"]
                $lookupPhone = $request.QueryString["lookupPhone"]
                $ordersJson = Get-Content $ordersDbPath -Raw -Encoding UTF8
                $existing = if ($ordersJson) { $ordersJson | ConvertFrom-Json } else { @() }

                if ($lookupId -and $lookupPhone) {
                    $found = $null
                    foreach ($o in $existing) {
                        if ($o.id -eq $lookupId) { $found = $o; break }
                    }
                    if ($found) {
                        $resBuf = [System.Text.Encoding]::UTF8.GetBytes((@{ found = $true; order = $found } | ConvertTo-Json -Depth 5))
                    } else {
                        $response.StatusCode = 404
                        $resBuf = [System.Text.Encoding]::UTF8.GetBytes((@{ found = $false; error = "Order not found" } | ConvertTo-Json))
                    }
                } else {
                    $resBuf = [System.Text.Encoding]::UTF8.GetBytes((@{ success = $true; orders = $existing; count = $existing.Count } | ConvertTo-Json -Depth 10))
                }
                $response.OutputStream.Write($resBuf, 0, $resBuf.Length)
            }
            elseif ($request.HttpMethod -eq "PATCH") {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $bodyText = $reader.ReadToEnd()
                $patchObj = $bodyText | ConvertFrom-Json
                
                $ordersJson = Get-Content $ordersDbPath -Raw -Encoding UTF8
                $existing = if ($ordersJson) { $ordersJson | ConvertFrom-Json } else { @() }
                $orderId = if ($patchObj.orderId) { $patchObj.orderId } else { $patchObj.id }
                
                foreach ($o in $existing) {
                    if ($o.id -eq $orderId) {
                        if ($patchObj.orderStatus) { $o.orderStatus = $patchObj.orderStatus }
                        if ($patchObj.paymentStatus) { $o.paymentStatus = $patchObj.paymentStatus }
                        if ($patchObj.notes) { $o.notes = $patchObj.notes }
                        if ($patchObj.expectedDeliveryDate) { $o.expectedDeliveryDate = $patchObj.expectedDeliveryDate }
                        break
                    }
                }
                Set-Content -Path $ordersDbPath -Value ($existing | ConvertTo-Json -Depth 10) -Encoding UTF8
                $resBuf = [System.Text.Encoding]::UTF8.GetBytes((@{ success = $true; message = "Order updated successfully." } | ConvertTo-Json))
                $response.OutputStream.Write($resBuf, 0, $resBuf.Length)
            }
            $response.OutputStream.Close()
            continue
        }
        
        # --- Handle /api/notify ---
        if ($urlPath -eq "api/notify" -or $urlPath -eq "api/notify.js") {
            $response.ContentType = "application/json; charset=utf-8"
            $resObj = @{
                success = $true
                configured = $true
                message = "Local testing mode: Order notification simulated successfully."
                recipient = "sadiyasultana5836@gmail.com"
            }
            $resBuf = [System.Text.Encoding]::UTF8.GetBytes(($resObj | ConvertTo-Json))
            $response.OutputStream.Write($resBuf, 0, $resBuf.Length)
            $response.OutputStream.Close()
            continue
        }

        # --- Handle Static Files ---
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
            elseif ($fullPath.EndsWith(".mp4")) { $response.ContentType = "video/mp4" }
            elseif ($fullPath.EndsWith(".webm")) { $response.ContentType = "video/webm" }
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
