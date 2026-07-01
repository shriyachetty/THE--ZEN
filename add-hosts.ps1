# Run as Administrator to add the-zen domain
Add-Content -Path "C:\Windows\System32\drivers\etc\hosts" -Value "`n127.0.0.1       the-zen" -Encoding ASCII
Write-Host "the-zen domain added to hosts file!"
ipconfig /flushdns
Write-Host "DNS cache flushed!"
