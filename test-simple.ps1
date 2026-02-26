# Test Newsletter (simplest endpoint)
Write-Host "Testing Newsletter Subscription..." -ForegroundColor Cyan
$body = @{
    email = "test123@example.com"
    name = "Test User"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/newsletter" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ FAILED" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
