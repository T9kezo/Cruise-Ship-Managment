# Appwrite CLI Setup Guide

## Quick Setup Steps

### Step 1: Login to Appwrite
```bash
appwrite login
```
This will open your browser to authenticate with Appwrite.

### Step 2: Initialize Project
```bash
appwrite init project
```
- Choose "Create a new project"
- Enter project name: `Cruise Ship Management`
- Copy the Project ID that gets displayed

### Step 3: Configure Client
After getting your Project ID, run:
```bash
appwrite client --endpoint https://cloud.appwrite.io/v1 --project-id YOUR_PROJECT_ID
```
Replace `YOUR_PROJECT_ID` with the ID from Step 2.

### Step 4: Create Database
```bash
appwrite databases create --databaseId cruiseshipdb --name "Cruise Ship DB"
```

### Step 5: Run Collection Setup Script
For Windows PowerShell:
```powershell
.\setup-collections.ps1
```

For Linux/Mac:
```bash
chmod +x setup-collections.sh
./setup-collections.sh
```

### Step 6: Update appwrite.js
Update `js/appwrite.js` with your Project ID:
```javascript
.setProject('YOUR_PROJECT_ID') // Replace with your actual Project ID
```

## Alternative: Manual Setup via Console

If you prefer using the web console:
1. Go to https://cloud.appwrite.io (or your self-hosted instance)
2. Create a new project
3. Go to Databases → Create Database → Name: "Cruise Ship DB"
4. Create collections manually using the schemas in SETUP.md

## Verification

After setup, verify your collections:
```bash
appwrite databases listCollections --databaseId cruiseshipdb
```

