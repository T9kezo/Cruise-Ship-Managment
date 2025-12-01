# TODO List for Cruise Ship Management Web App

## Project Setup
- [x] Create project directory structure (css/, js/, pages/, assets/, tests/)
- [x] Create initial files (index.html, css/styles.css, js/main.js, etc.)
- [x] Initialize Git repository
- [x] Create public GitHub repository and push initial commit

## Appwrite Setup
- [x] Install Appwrite SDK via npm
- [x] Create Appwrite client configuration in js/appwrite.js
- [x] Set up database collections (users, catering_items, stationery_items, services, orders, bookings)
- [x] Configure authentication (email/password)

## Authentication
- [x] Implement login/signup forms in index.html
- [x] Create js/auth.js for authentication logic
- [x] Add role-based access control (Voyager, Admin, Manager, Head-Cook, Supervisor)

## Voyager Module
- [x] Create voyager.html dashboard
- [x] Implement ordering catering items (js/voyager.js)
- [x] Implement ordering stationery items
- [x] Implement booking Resort-Movie tickets
- [x] Implement booking Beauty Salon
- [x] Implement booking Fitness Center
- [x] Implement booking Party Hall

## Admin Module
- [x] Create admin.html dashboard
- [x] Implement add/edit/delete items (catering, stationery, services)
- [x] Implement maintain menu items
- [x] Implement voyager registration

## Manager Module
- [x] Create manager.html dashboard
- [x] Implement view booked Resort-Movie tickets
- [x] Implement view booked Beauty Salon
- [x] Implement view booked Fitness Center
- [x] Implement view booked Party Hall

## Head-Cook Module
- [x] Create headcook.html dashboard
- [x] Implement view ordered catering items

## Supervisor Module
- [x] Create supervisor.html dashboard
- [x] Implement view ordered stationery items

## Logging
- [x] Create js/logger.js for logging utility
- [x] Integrate logging into all actions (auth, orders, bookings, views)

## Testing
- [x] Write unit tests for JS modules (using Jest or simple tests)
- [x] Test authentication, CRUD operations, role access

## Optimization
- [ ] Optimize code (remove duplication, efficient queries)
- [ ] Optimize architecture (modular structure, separation of concerns)

## Documentation and Deployment
- [x] Write detailed README.md (overview, setup, workflow, execution)
- [ ] Create detailed project report (design, implementation, testing, deployment)
- [ ] Deploy to GitHub Pages
- [ ] Final push to GitHub repository
