/**
 * Appwrite Setup Script
 * This script helps set up Appwrite collections for the Cruise Ship Management System
 * 
 * Prerequisites:
 * 1. Have Appwrite CLI installed: npm install -g appwrite-cli
 * 2. Have an Appwrite instance running (cloud or self-hosted)
 * 3. Be logged in: appwrite login
 * 
 * Usage:
 * Run the commands manually or use this as a reference guide
 */

console.log(`
╔══════════════════════════════════════════════════════════════╗
║     Appwrite Setup Guide for Cruise Ship Management         ║
╚══════════════════════════════════════════════════════════════╝

STEP 1: Login to Appwrite
---------------------------
Run: appwrite login

STEP 2: Initialize Project
---------------------------
Run: appwrite init project
- Choose "Create a new project" or select existing
- Enter project name: "Cruise Ship Management"
- Note the Project ID that gets generated

STEP 3: Set Client Configuration
----------------------------------
Run: appwrite client --endpoint <YOUR_ENDPOINT> --project-id <YOUR_PROJECT_ID>
Example: appwrite client --endpoint https://cloud.appwrite.io/v1 --project-id YOUR_PROJECT_ID

STEP 4: Create Database
------------------------
Run: appwrite databases create --databaseId cruiseshipdb --name "Cruise Ship DB"

STEP 5: Create Collections
---------------------------
Run the following commands to create all collections:

1. Users Collection:
   appwrite databases createCollection --databaseId cruiseshipdb --collectionId users --name "Users" --permissions "read(\"any\")" "write(\"users\")"

2. Catering Items Collection:
   appwrite databases createCollection --databaseId cruiseshipdb --collectionId catering_items --name "Catering Items" --permissions "read(\"any\")" "write(\"users\")"

3. Stationery Items Collection:
   appwrite databases createCollection --databaseId cruiseshipdb --collectionId stationery_items --name "Stationery Items" --permissions "read(\"any\")" "write(\"users\")"

4. Services Collection:
   appwrite databases createCollection --databaseId cruiseshipdb --collectionId services --name "Services" --permissions "read(\"any\")" "write(\"users\")"

5. Orders Collection:
   appwrite databases createCollection --databaseId cruiseshipdb --collectionId orders --name "Orders" --permissions "read(\"any\")" "write(\"users\")"

6. Bookings Collection:
   appwrite databases createCollection --databaseId cruiseshipdb --collectionId bookings --name "Bookings" --permissions "read(\"any\")" "write(\"users\")"

STEP 6: Create Attributes
--------------------------
See the detailed attribute creation commands in the setup-collections.sh file
or use the Appwrite Console web interface.

STEP 7: Update js/appwrite.js
------------------------------
Update the endpoint and project ID in js/appwrite.js with your values.

For detailed collection schemas, see SETUP.md
`);

