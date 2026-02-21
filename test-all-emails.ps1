Write-Host "========================================" -ForegroundColor Green
Write-Host "Testing All Email Templates" -ForegroundColor Green
Write-Host "Sending to: israelloko65@gmail.com" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$testEmail = "israelloko65@gmail.com"
$baseUrl = "http://localhost:5000"

# Test 1: Contact Form
Write-Host "1. Testing Contact Form Email..." -ForegroundColor Cyan
try {
    $body = @{
        name = "Israel Loko"
        email = $testEmail
        inquiryType = "general"
        message = "Testing the beautiful new email template for contact form submissions"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Contact Form Email Sent!" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Klin Request
Write-Host "2. Testing Klin Request Email..." -ForegroundColor Cyan
try {
    $body = @{
        name = "Israel Loko"
        email = $testEmail
        phone = "+254712345678"
        propertyType = "apartment"
        location = "Nairobi, Westlands"
        budget = "$800-$1200"
        moveInDate = "2024-04-01"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/klin/request" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Klin Request Email Sent!" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Klin Intelligence
Write-Host "3. Testing Klin Intelligence Email..." -ForegroundColor Cyan
try {
    $body = @{
        name = "Israel Loko"
        email = $testEmail
        phone = "+254723456789"
        propertyAddress = "123 Mombasa Road, Nairobi"
        checkType = "comprehensive"
        urgency = "normal"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/klin/intelligence" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Klin Intelligence Email Sent!" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Klin Partnership
Write-Host "4. Testing Klin Partnership Email..." -ForegroundColor Cyan
try {
    $body = @{
        companyName = "Test Properties Ltd"
        contactPerson = "Israel Loko"
        email = $testEmail
        phone = "+254734567890"
        partnershipType = "property-owner"
        description = "Testing the partnership email template with beautiful modern design"
        website = "https://www.testproperties.com"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/klin/partnership" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Klin Partnership Email Sent!" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Kaizen Project
Write-Host "5. Testing Kaizen Project Email..." -ForegroundColor Cyan
try {
    $body = @{
        name = "Israel Loko"
        email = $testEmail
        phone = "+254745678901"
        projectType = "residential"
        projectScope = "medium"
        budget = "$50,000-$100,000"
        timeline = "6-9 months"
        description = "Testing the Kaizen project email template with modern styling"
        location = "Karen, Nairobi"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/kaizen/project" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Kaizen Project Email Sent!" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: Build Planner
Write-Host "6. Testing Build Planner Email..." -ForegroundColor Cyan
try {
    $body = @{
        name = "Israel Loko"
        email = $testEmail
        phone = "+254756789012"
        projectType = "commercial"
        propertySize = "5000 sq ft"
        budget = "$200,000-$300,000"
        startDate = "2024-06-01"
        features = "Modern office space with open floor plan, conference rooms, kitchen area, parking"
        additionalNotes = "Testing the build planner email with dynamic project summary"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/kaizen/buildplanner" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Build Planner Email Sent!" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 7: Newsletter
Write-Host "7. Testing Newsletter Email..." -ForegroundColor Cyan
try {
    $body = @{
        email = $testEmail
        name = "Israel Loko"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/newsletter" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   ✅ Newsletter Email Sent!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "All Email Tests Complete!" -ForegroundColor Green
Write-Host "Check israelloko65@gmail.com inbox" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
