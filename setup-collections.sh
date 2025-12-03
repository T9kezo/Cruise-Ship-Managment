#!/bin/bash

# Appwrite Collection Setup Script
# This script creates all necessary collections and attributes for the Cruise Ship Management System
# Make sure you're logged in and have set your project ID first

DATABASE_ID="cruiseshipdb"

echo "Creating collections..."

# 1. Users Collection
echo "Creating Users collection..."
appwrite databases createCollection \
  --databaseId "$DATABASE_ID" \
  --collectionId "users" \
  --name "Users" \
  --permissions "read(\"users\")" "create(\"users\")" "update(\"users\")" "delete(\"users\")"

# Add attributes
appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "users" \
  --key "email" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "users" \
  --key "name" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "users" \
  --key "role" \
  --size 50 \
  --required true

# 2. Catering Items Collection
echo "Creating Catering Items collection..."
appwrite databases createCollection \
  --databaseId "$DATABASE_ID" \
  --collectionId "catering_items" \
  --name "Catering Items" \
  --permissions "read(\"users\")" "create(\"users\")" "update(\"users\")" "delete(\"users\")"

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "catering_items" \
  --key "name" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "catering_items" \
  --key "description" \
  --size 1000 \
  --required true

appwrite databases createFloatAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "catering_items" \
  --key "price" \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "catering_items" \
  --key "category" \
  --size 50 \
  --required true

# 3. Stationery Items Collection
echo "Creating Stationery Items collection..."
appwrite databases createCollection \
  --databaseId "$DATABASE_ID" \
  --collectionId "stationery_items" \
  --name "Stationery Items" \
  --permissions "read(\"users\")" "create(\"users\")" "update(\"users\")" "delete(\"users\")"

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "stationery_items" \
  --key "name" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "stationery_items" \
  --key "description" \
  --size 1000 \
  --required true

appwrite databases createFloatAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "stationery_items" \
  --key "price" \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "stationery_items" \
  --key "category" \
  --size 50 \
  --required true

# 4. Services Collection
echo "Creating Services collection..."
appwrite databases createCollection \
  --databaseId "$DATABASE_ID" \
  --collectionId "services" \
  --name "Services" \
  --permissions "read(\"users\")" "create(\"users\")" "update(\"users\")" "delete(\"users\")"

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "services" \
  --key "type" \
  --size 50 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "services" \
  --key "name" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "services" \
  --key "description" \
  --size 1000 \
  --required true

appwrite databases createFloatAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "services" \
  --key "price" \
  --required true

appwrite databases createIntegerAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "services" \
  --key "availability" \
  --required true

# 5. Orders Collection
echo "Creating Orders collection..."
appwrite databases createCollection \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --name "Orders" \
  --permissions "read(\"users\")" "create(\"users\")" "update(\"users\")" "delete(\"users\")"

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "user_id" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "item_id" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "item_name" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "type" \
  --size 50 \
  --required true

appwrite databases createIntegerAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "quantity" \
  --required true

appwrite databases createFloatAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "price" \
  --required true

appwrite databases createFloatAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "total" \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "status" \
  --size 50 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "orders" \
  --key "created_at" \
  --size 255 \
  --required true

# 6. Bookings Collection
echo "Creating Bookings collection..."
appwrite databases createCollection \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --name "Bookings" \
  --permissions "read(\"users\")" "create(\"users\")" "update(\"users\")" "delete(\"users\")"

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "user_id" \
  --size 255 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "type" \
  --size 50 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "date" \
  --size 50 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "time" \
  --size 50 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "status" \
  --size 50 \
  --required true

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "created_at" \
  --size 255 \
  --required true

# Optional attributes for different booking types
appwrite databases createIntegerAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "seats" \
  --required false

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "service" \
  --size 100 \
  --required false

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "session" \
  --size 100 \
  --required false

appwrite databases createStringAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "event_type" \
  --size 100 \
  --required false

appwrite databases createIntegerAttribute \
  --databaseId "$DATABASE_ID" \
  --collectionId "bookings" \
  --key "guests" \
  --required false

echo "Setup complete! All collections and attributes have been created."

