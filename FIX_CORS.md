# Fix CORS Error

## Problem
The Appwrite server is configured to allow `http://localhost:8082` but you're accessing from `http://127.0.0.1:8082`. These are considered different origins by browsers.

## Solution Options

### Option 1: Use localhost instead of 127.0.0.1 (Easiest)
Simply access your app using:
```
http://localhost:8082
```
instead of:
```
http://127.0.0.1:8082
```

### Option 2: Update Appwrite CORS Settings

1. Go to your Appwrite Console: https://fra.cloud.appwrite.io
2. Navigate to your project: "Cruise Ship Management" (Project ID: 692c5bd464546cfce50f)
3. Go to **Settings** → **Platforms** (or **Web**)
4. Add a new platform or edit existing one
5. Add both origins:
   - `http://localhost:8082`
   - `http://127.0.0.1:8082`
6. Save the changes

### Option 3: Update via Appwrite CLI

Run this command to add the origin:
```bash
appwrite projects update-platform --project-id 692c5bd464546cfce50f --platform web --hostname 127.0.0.1 --port 8082
```

Or use the web interface which is easier.

## Quick Fix (Recommended)
Just use `http://localhost:8082` in your browser instead of `127.0.0.1:8082`

