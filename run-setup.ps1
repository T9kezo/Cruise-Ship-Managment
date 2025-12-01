# Appwrite Setup Script for Cruise Ship Management
# Run this script step by step or execute all at once

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     Appwrite Setup for Cruise Ship Management              " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Initialize Project
Write-Host "STEP 1: Initialize Appwrite Project" -ForegroundColor Yellow
Write-Host "Run this command and follow the prompts:" -ForegroundColor White
Write-Host "  appwrite init project --project-name `"Cruise Ship Management`"" -ForegroundColor Green
Write-Host ""
Write-Host "When prompted:" -ForegroundColor White
Write-Host "  - Select your organization (usually 'Personal projects')" -ForegroundColor Gray
Write-Host "  - Choose 'Create a new project'" -ForegroundColor Gray
Write-Host "  - Copy the Project ID that gets displayed" -ForegroundColor Gray
Write-Host ""
$continue = Read-Host "Press Enter after you've completed Step 1 and copied your Project ID"

# Step 2: Get Project ID and configure client
Write-Host ""
Write-Host "STEP 2: Configure Appwrite Client" -ForegroundColor Yellow
$projectId = Read-Host "Enter your Project ID"
$endpoint = Read-Host "Enter your Appwrite endpoint (default: https://cloud.appwrite.io/v1)" 
if ([string]::IsNullOrWhiteSpace($endpoint)) {
    $endpoint = "https://cloud.appwrite.io/v1"
}

Write-Host "Configuring client..." -ForegroundColor White
appwrite client --endpoint $endpoint --project-id $projectId

# Step 3: Create Database
Write-Host ""
Write-Host "STEP 3: Creating Database" -ForegroundColor Yellow
Write-Host "Creating database 'cruiseshipdb'..." -ForegroundColor White
appwrite databases create --databaseId cruiseshipdb --name "Cruise Ship DB"

# Step 4: Update appwrite.js
Write-Host ""
Write-Host "STEP 4: Updating appwrite.js configuration" -ForegroundColor Yellow
$appwriteJsPath = "js\appwrite.js"
if (Test-Path $appwriteJsPath) {
    $content = Get-Content $appwriteJsPath -Raw
    $content = $content -replace "YOUR_PROJECT_ID", $projectId
    $content = $content -replace "https://cloud.appwrite.io/v1", $endpoint
    Set-Content -Path $appwriteJsPath -Value $content
    Write-Host "Updated js/appwrite.js with your Project ID and Endpoint" -ForegroundColor Green
} else {
    Write-Host "Warning: js/appwrite.js not found" -ForegroundColor Red
}

# Step 5: Create Collections
Write-Host ""
Write-Host "STEP 5: Creating Collections" -ForegroundColor Yellow
Write-Host "This will create all necessary collections and attributes..." -ForegroundColor White
Write-Host ""
$runCollections = Read-Host "Do you want to run the collection setup script now? (Y/n)"
if ($runCollections -eq "" -or $runCollections -eq "Y" -or $runCollections -eq "y") {
    Write-Host "Running collection setup..." -ForegroundColor White
    & .\setup-collections.ps1
} else {
    Write-Host "You can run the collection setup later with: .\setup-collections.ps1" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "     Setup Complete!                                         " -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Verify collections were created: appwrite databases listCollections --databaseId cruiseshipdb" -ForegroundColor White
Write-Host "  2. Start the app: npm start" -ForegroundColor White
Write-Host "  3. Create test users through Appwrite Console" -ForegroundColor White
Write-Host ""

