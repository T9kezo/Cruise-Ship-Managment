# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Appwrite**
   - Sign up for a free account at [Appwrite Cloud](https://cloud.appwrite.io) or set up a self-hosted instance
   - Create a new project in your Appwrite console
   - Copy your Project ID and Endpoint URL
   - Update `js/appwrite.js` with your credentials:
     ```javascript
     .setEndpoint('https://cloud.appwrite.io/v1') // Your endpoint
     .setProject('YOUR_PROJECT_ID') // Your project ID
     ```

3. **Set Up Database Collections**
   
   Create the following collections in your Appwrite database:
   
   ### Collection: `users`
   - `email` (string, required)
   - `name` (string, required)
   - `role` (string, required) - values: voyager, admin, manager, headcook, supervisor
   
   ### Collection: `catering_items`
   - `name` (string, required)
   - `description` (string, required)
   - `price` (double, required)
   - `category` (string, required) - values: snacks, food, beverages
   
   ### Collection: `stationery_items`
   - `name` (string, required)
   - `description` (string, required)
   - `price` (double, required)
   - `category` (string, required) - values: gifts, chocolates, books
   
   ### Collection: `services`
   - `type` (string, required) - values: movie, beauty, fitness, party
   - `name` (string, required)
   - `description` (string, required)
   - `price` (double, required)
   - `availability` (integer, required)
   
   ### Collection: `orders`
   - `user_id` (string, required)
   - `item_id` (string, required)
   - `item_name` (string, required)
   - `type` (string, required) - values: catering, stationery
   - `quantity` (integer, required)
   - `price` (double, required)
   - `total` (double, required)
   - `status` (string, required) - values: pending, processing, completed
   - `created_at` (string, required)
   
   ### Collection: `bookings`
   - `user_id` (string, required)
   - `type` (string, required) - values: movie, beauty, fitness, party
   - `date` (string, required)
   - `time` (string, required)
   - `status` (string, required) - values: pending, confirmed, cancelled
   - `created_at` (string, required)
   - Additional fields based on booking type (seats, service, session, event_type, guests)

4. **Configure Permissions**
   
   For each collection, set up appropriate permissions:
   - **Read**: All authenticated users
   - **Create**: Authenticated users (for orders/bookings), Admin only (for items/services)
   - **Update**: Admin only (for items), Head-Cook/Supervisor (for orders)
   - **Delete**: Admin only

5. **Start the Development Server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:8080`

## Creating Test Users

1. **Admin User**: Create through Appwrite Console or use the signup function
2. **Other Users**: Admin can register voyagers through the admin dashboard
3. **Staff Users**: Create through Appwrite Console with appropriate roles

## Testing

Run the test suite:
```bash
npm test
```

## Troubleshooting

- **CORS Errors**: Make sure your Appwrite project allows your domain in CORS settings
- **Authentication Errors**: Verify your Appwrite endpoint and project ID are correct
- **Database Errors**: Ensure all collections are created with the correct attributes
- **Module Errors**: Make sure you're serving the app through a web server (not file://)

