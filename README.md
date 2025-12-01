# Cruise Ship Management System

A comprehensive web application for managing cruise ship operations, built with HTML, CSS, JavaScript, and Appwrite. The system supports multiple user roles with specific functionalities for ordering, booking, and managing services on board.

## Features

### User Roles and Functionalities

#### Voyager
- Secure login with email and password
- Order catering items (snacks, food, beverages)
- Order stationery items (gift items, chocolates, books)
- Book Resort-Movie tickets with seat availability check
- Book Beauty Salon services
- Book Fitness Center sessions
- Book Party Hall events (birthday, wedding, business, etc.)

#### Admin
- Secure login with email and password
- Add, edit, and delete catering items
- Add, edit, and delete stationery items
- Maintain menu items for services
- Register new voyagers

#### Manager
- View booked Resort-Movie tickets
- View booked Beauty Salon appointments
- View booked Fitness Center sessions
- View booked Party Hall events

#### Head-Cook
- View ordered catering items
- Process orders for distribution to departments

#### Supervisor
- View ordered stationery items
- Issue delivery orders to departments

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Appwrite (Authentication, Database, Storage)
- **Deployment**: GitHub Pages
- **Version Control**: Git

## Project Structure

```
cruise-ship-management/
├── index.html              # Main login page
├── css/
│   └── styles.css          # Global styles
├── js/
│   ├── appwrite.js         # Appwrite client configuration
│   ├── auth.js             # Authentication functions
│   ├── database.js         # Database CRUD operations
│   ├── logger.js           # Logging utility
│   ├── main.js             # Main application logic
│   ├── voyager.js          # Voyager-specific functions
│   ├── admin.js            # Admin-specific functions
│   ├── manager.js          # Manager-specific functions
│   ├── headcook.js         # Head-Cook-specific functions
│   └── supervisor.js       # Supervisor-specific functions
├── pages/
│   ├── voyager.html        # Voyager dashboard
│   ├── admin.html          # Admin dashboard
│   ├── manager.html        # Manager dashboard
│   ├── headcook.html       # Head-Cook dashboard
│   └── supervisor.html     # Supervisor dashboard
├── assets/                 # Static assets
├── tests/                  # Unit tests
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
└── report.md               # Detailed project report
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Appwrite instance (cloud or self-hosted)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cruise-ship-management.git
   cd cruise-ship-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Appwrite**
   - Create a new project in your Appwrite console
   - Update `js/appwrite.js` with your project ID and endpoint
   - Create the following collections in your database:
     - `users` (email, role, name)
     - `catering_items` (name, description, price, category)
     - `stationery_items` (name, description, price, category)
     - `services` (type, name, description, availability, price)
     - `orders` (user_id, item_id, type, quantity, status)
     - `bookings` (user_id, service_id, type, date, time, status)

4. **Start the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:8080`

## Usage

### First-Time Setup
1. Register admin users through the Appwrite console or admin panel
2. Admin can register voyagers and add initial items/services

### User Workflow
1. **Login**: Users log in with email, password, and select their role
2. **Dashboard**: Redirected to role-specific dashboard
3. **Actions**: Perform role-specific actions (order, book, view, manage)
4. **Logout**: Secure logout from the system

### Voyager Workflow
1. Login as Voyager
2. Browse and order catering/stationery items
3. Check availability and book services
4. View order/booking history

### Admin Workflow
1. Login as Admin
2. Manage items (add/edit/delete)
3. Register new voyagers
4. Maintain service menus

### Staff Workflow (Manager/Head-Cook/Supervisor)
1. Login with respective role
2. View relevant orders/bookings
3. Process or monitor as needed

## Development

### Running Tests
```bash
npm test
```

### Code Quality
- Modular architecture for maintainability
- ES6+ features for modern JavaScript
- Consistent naming conventions
- Comprehensive error handling
- Logging for all actions

### Security Features
- Secure authentication via Appwrite
- Role-based access control
- Input validation
- Secure logout

## Deployment

The app is deployed on GitHub Pages for easy access:

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source
4. Access the app at `https://yourusername.github.io/cruise-ship-management`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue in the GitHub repository.

## Project Status

✅ Completed - All features implemented and tested
- Modular, testable, maintainable, and portable code
- Comprehensive logging for all actions
- Role-based access control
- Responsive web design
- Public GitHub repository
- Detailed documentation
