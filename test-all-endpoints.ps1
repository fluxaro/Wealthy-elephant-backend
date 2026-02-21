Write-Host "Testing Wealthy Elephant Backend API" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
    Write-Host "✅ Health Check: PASSED" -ForegroundColor Green
    Write-Host "   Message: $($health.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Health Check: FAILED" -ForegroundColor Red
}
Write-Host ""

# Test 2: Contact Form
Write-Host "2. Testing Contact Form..." -ForegroundColor Cyan
try {
    $contactBody = @{
        name = "Test User"
        email = "test@example.com"
        inquiryType = "general"
        message = "This is a test message for the contact form"
    } | ConvertTo-Json
    
    $contact = Invoke-RestMethod -Uri "http://localhost:5000/api/contact" -Method Post -Body $contactBody -ContentType "application/json"
    Write-Host "✅ Contact Form: PASSED" -ForegroundColor Green
    Write-Host "   ID: $($contact.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Contact Form: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Klin Request
Write-Host "3. Testing Klin Request..." -ForegroundColor Cyan
try {
    $klinBody = @{
        name = "Jane Smith"
        email = "jane@example.com"
        phone = "+254712345678"
        propertyType = "apartment"
        location = "Nairobi, Westlands"
        budget = "$800-$1200"
        moveInDate = "2024-04-01"
    } | ConvertTo-Json
    
    $klin = Invoke-RestMethod -Uri "http://localhost:5000/api/klin/request" -Method Post -Body $klinBody -ContentType "application/json"
    Write-Host "✅ Klin Request: PASSED" -ForegroundColor Green
    Write-Host "   ID: $($klin.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Klin Request: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Klin Intelligence
Write-Host "4. Testing Klin Intelligence..." -ForegroundColor Cyan
try {
    $intelligenceBody = @{
        name = "Michael Johnson"
        email = "michael@example.com"
        phone = "+254723456789"
        propertyAddress = "123 Mombasa Road, Nairobi"
        checkType = "comprehensive"
        urgency = "normal"
    } | ConvertTo-Json
    
    $intelligence = Invoke-RestMethod -Uri "http://localhost:5000/api/klin/intelligence" -Method Post -Body $intelligenceBody -ContentType "application/json"
    Write-Host "✅ Klin Intelligence: PASSED" -ForegroundColor Green
    Write-Host "   ID: $($intelligence.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Klin Intelligence: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Klin Partnership
Write-Host "5. Testing Klin Partnership..." -ForegroundColor Cyan
try {
    $partnershipBody = @{
        companyName = "Prime Properties Ltd"
        contactPerson = "Sarah Williams"
        email = "sarah@primeproperties.com"
        phone = "+254734567890"
        partnershipType = "property-owner"
        description = "We own multiple residential properties and would like to partner with Klin"
        website = "https://www.primeproperties.com"
    } | ConvertTo-Json
    
    $partnership = Invoke-RestMethod -Uri "http://localhost:5000/api/klin/partnership" -Method Post -Body $partnershipBody -ContentType "application/json"
    Write-Host "✅ Klin Partnership: PASSED" -ForegroundColor Green
    Write-Host "   ID: $($partnership.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Klin Partnership: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: Kaizen Project
Write-Host "6. Testing Kaizen Project..." -ForegroundColor Cyan
try {
    $projectBody = @{
        name = "David Brown"
        email = "david@example.com"
        phone = "+254745678901"
        projectType = "residential"
        projectScope = "medium"
        budget = "$50,000-$100,000"
        timeline = "6-9 months"
        description = "Planning to build a modern 3-bedroom house with contemporary design"
        location = "Karen, Nairobi"
    } | ConvertTo-Json
    
    $project = Invoke-RestMethod -Uri "http://localhost:5000/api/kaizen/project" -Method Post -Body $projectBody -ContentType "application/json"
    Write-Host "✅ Kaizen Project: PASSED" -ForegroundColor Green
    Write-Host "   ID: $($project.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Kaizen Project: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 7: Build Planner
Write-Host "7. Testing Build Planner..." -ForegroundColor Cyan
try {
    $buildBody = @{
        name = "Emily Davis"
        email = "emily@example.com"
        phone = "+254756789012"
        projectType = "commercial"
        propertySize = "5000 sq ft"
        budget = "$200,000-$300,000"
        startDate = "2024-06-01"
        features = "Modern office space with open floor plan, conference rooms, kitchen area"
    } | ConvertTo-Json
    
    $build = Invoke-RestMethod -Uri "http://localhost:5000/api/kaizen/buildplanner" -Method Post -Body $buildBody -ContentType "application/json"
    Write-Host "✅ Build Planner: PASSED" -ForegroundColor Green
    Write-Host "   ID: $($build.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Build Planner: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 8: Newsletter
Write-Host "8. Testing Newsletter..." -ForegroundColor Cyan
try {
    $newsletterBody = @{
        email = "subscriber@example.com"
        name = "Newsletter Subscriber"
    } | ConvertTo-Json
    
    $newsletter = Invoke-RestMethod -Uri "http://localhost:5000/api/newsletter" -Method Post -Body $newsletterBody -ContentType "application/json"
    Write-Host "✅ Newsletter: PASSED" -ForegroundColor Green
    Write-Host "   Message: $($newsletter.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Newsletter: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "All Tests Completed!" -ForegroundColor Green
