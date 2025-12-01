# Appwrite Collection Setup Script for PowerShell
# This script creates all necessary collections and attributes for the Cruise Ship Management System
# Make sure you're logged in and have set your project ID first

$DATABASE_ID = "cruiseshipdb"

Write-Host "Creating collections..." -ForegroundColor Green

# 1. Users Collection
Write-Host "Creating Users collection..." -ForegroundColor Yellow
appwrite databases create-collection `
  --database-id "$DATABASE_ID" `
  --collection-id "users" `
  --name "Users" `
  --permissions "read(`"any`")" "write(`"users`")"

# Add attributes
appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "users" `
  --key "email" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "users" `
  --key "name" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "users" `
  --key "role" `
  --size 50 `
  --required true

# 2. Catering Items Collection
Write-Host "Creating Catering Items collection..." -ForegroundColor Yellow
appwrite databases create-collection `
  --database-id "$DATABASE_ID" `
  --collection-id "catering_items" `
  --name "Catering Items" `
  --permissions "read(`"any`")" "write(`"users`")"

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "catering_items" `
  --key "name" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "catering_items" `
  --key "description" `
  --size 1000 `
  --required true

appwrite databases create-float-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "catering_items" `
  --key "price" `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "catering_items" `
  --key "category" `
  --size 50 `
  --required true

# 3. Stationery Items Collection
Write-Host "Creating Stationery Items collection..." -ForegroundColor Yellow
appwrite databases create-collection `
  --database-id "$DATABASE_ID" `
  --collection-id "stationery_items" `
  --name "Stationery Items" `
  --permissions "read(`"any`")" "write(`"users`")"

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "stationery_items" `
  --key "name" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "stationery_items" `
  --key "description" `
  --size 1000 `
  --required true

appwrite databases create-float-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "stationery_items" `
  --key "price" `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "stationery_items" `
  --key "category" `
  --size 50 `
  --required true

# 4. Services Collection
Write-Host "Creating Services collection..." -ForegroundColor Yellow
appwrite databases create-collection `
  --database-id "$DATABASE_ID" `
  --collection-id "services" `
  --name "Services" `
  --permissions "read(`"any`")" "write(`"users`")"

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "services" `
  --key "type" `
  --size 50 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "services" `
  --key "name" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "services" `
  --key "description" `
  --size 1000 `
  --required true

appwrite databases create-float-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "services" `
  --key "price" `
  --required true

appwrite databases create-integer-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "services" `
  --key "availability" `
  --required true

# 5. Orders Collection
Write-Host "Creating Orders collection..." -ForegroundColor Yellow
appwrite databases create-collection `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --name "Orders" `
  --permissions "read(`"any`")" "write(`"users`")"

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "user_id" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "item_id" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "item_name" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "type" `
  --size 50 `
  --required true

appwrite databases create-integer-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "quantity" `
  --required true

appwrite databases create-float-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "price" `
  --required true

appwrite databases create-float-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "total" `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "status" `
  --size 50 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "orders" `
  --key "created_at" `
  --size 255 `
  --required true

# 6. Bookings Collection
Write-Host "Creating Bookings collection..." -ForegroundColor Yellow
appwrite databases create-collection `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --name "Bookings" `
  --permissions "read(`"any`")" "write(`"users`")"

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "user_id" `
  --size 255 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "type" `
  --size 50 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "date" `
  --size 50 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "time" `
  --size 50 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "status" `
  --size 50 `
  --required true

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "created_at" `
  --size 255 `
  --required true

# Optional attributes for different booking types
appwrite databases create-integer-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "seats" `
  --required false

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "service" `
  --size 100 `
  --required false

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "session" `
  --size 100 `
  --required false

appwrite databases create-string-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "event_type" `
  --size 100 `
  --required false

appwrite databases create-integer-attribute `
  --database-id "$DATABASE_ID" `
  --collection-id "bookings" `
  --key "guests" `
  --required false

Write-Host "Setup complete! All collections and attributes have been created." -ForegroundColor Green

