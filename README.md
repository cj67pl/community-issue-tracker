# Tugon: Institutional Issue Reporting and Management System

**Report. Respond. Resolve.**

Tugon is a web-based institutional issue reporting and management system developed as a portfolio project. It provides a centralized platform for reporting, tracking, managing, and resolving concerns within an institution.

The system supports different user roles, allowing reporters to submit and monitor their concerns, coordinators to manage reported issues, and administrators to manage users, categories, system activity, and analytics.

---

## Features

### Authentication & Authorization

* User login and authentication
* JWT-based authentication
* Role-based access control
* Protected API routes
* Session expiration handling
* Active and inactive account management

### Issue Management

* Create and submit institutional issue reports
* View and track reported issues
* Update issue status and priority
* Categorize issues
* View issue details
* Delete issues according to role and issue status permissions
* Filter issues using available categories, priorities, and statuses

### Comments

* Add comments to issues
* View issue comments
* Edit comments
* Delete comments
* Role-based comment permissions

### Notifications

* Receive notifications related to issue activity
* Mark individual notifications as read
* Mark all notifications as read

### Reporter Dashboard

* View personal issue statistics
* View recent reports
* Monitor pending, in-progress, and resolved reports
* View personal reported issues

### Coordinator Dashboard

* Monitor issue activity
* View issue statistics
* View issues by category and status
* View recent issues
* Monitor urgent issues

### Administrator Dashboard

* Monitor system and issue activity
* View user statistics
* View active issues
* Monitor high-priority issues
* View reports submitted within the current month
* View issues by category and status
* View recent issues

### Analytics

* Analytics KPI monitoring
* Issue trends
* Issue trends by status
* Issues by category
* Issues by priority
* Issues by location
* Resolution statistics
* Period comparison
* CSV report export

### User Management

* View users
* Create users
* Update user profiles
* Change user roles
* Activate and deactivate accounts
* Update passwords

### Category Management

* View categories
* Create categories
* Update categories
* Activate or deactivate categories

---

## User Roles

| Role              | Responsibilities                                                             |
| ----------------- | ---------------------------------------------------------------------------- |
| **Reporter**      | Submit issues, monitor their reports, add comments, and track issue progress |
| **Coordinator**   | Review, prioritize, update, and manage institutional issues                  |
| **Administrator** | Manage users and categories, monitor system activity, and access analytics   |

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript
* React Icons / Lucide Icons

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* dotenv
* CORS

### Testing

* Vitest
* Supertest

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* pgAdmin
* Figma
* Draw.io

---

## System Architecture

Tugon follows a separated frontend and backend architecture.

```text
                    ┌──────────────────────┐
                    │       Tugon UI       │
                    │   React + Vite       │
                    │     Tailwind CSS     │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │    Express Server    │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌────────────┐
       │ Middleware │   │ Controllers│   │   Routes   │
       │ Auth / Role│   │   Logic    │   │   API      │
       └────────────┘   └────────────┘   └────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │       Database       │
                    └──────────────────────┘
```

The frontend communicates with the Express backend through REST API endpoints. The backend handles authentication, authorization, validation, business logic, and database operations.

---

## Backend Structure

The backend follows a controller, route, middleware, and utility-based structure.

```text
server/
├── config/
│   └── db.js
├── controllers/
│   ├── analytics.controller.js
│   ├── analyticsexport.controller.js
│   ├── auth.controller.js
│   ├── categories.controller.js
│   ├── comments.controllers.js
│   ├── dashboard.controller.js
│   ├── filter.controller.js
│   ├── issues.controllers.js
│   ├── notifications.controller.js
│   └── users.controllers.js
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── role.middleware.js
├── routes/
│   ├── analytics.routes.js
│   ├── auth.routes.js
│   ├── categories.routes.js
│   ├── comments.rotues.js
│   ├── dashboard.routes.js
│   ├── issues.routes.js
│   ├── notifications.routes.js
│   └── users.routes.js
├── utils/
│   ├── dateRange.js
│   └── validation.js
├── app.js
├── server.js
├── .env
└── package.json
```

---

## Database

Tugon uses PostgreSQL for persistent data storage.

The system includes tables for:

* Users
* Roles
* Categories
* Issues
* Statuses
* Priority levels
* Comments
* Notifications

The database relationships support role-based access, issue tracking, categorization, prioritization, comments, and notifications.

---

## API

The backend provides REST API endpoints organized by feature.

```text
/api/auth
/api/users
/api/issues
/api/categories
/api/notifications
/api/dashboard
/api/analytics
```

Authentication is handled through JWT bearer tokens.

Protected endpoints require an authenticated user, while role-restricted endpoints additionally verify the user's role.

---

## Testing

The backend includes automated API tests using **Vitest** and **Supertest**.

The test suite covers:

* Authentication
* Users
* Issues
* Comments
* Categories
* Notifications
* Dashboard
* Analytics

Tests include scenarios such as:

* Missing authentication
* Invalid authentication tokens
* Role-based authorization
* Invalid IDs
* Missing required fields
* Invalid date ranges
* Resource-not-found responses
* Successful authenticated requests
* CSV export responses

Run the complete test suite with:

```bash
npm test
```

For development with the test watcher:

```bash
npm run test:watch
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install frontend dependencies

From the frontend directory:

```bash
npm install
```

### 3. Install backend dependencies

From the server directory:

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

### 5. Start the backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### 6. Start the frontend

From the frontend directory:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## Environment Variables

The backend uses environment variables for configuration.

| Variable      | Description                    |
| ------------- | ------------------------------ |
| `PORT`        | Backend server port            |
| `DB_HOST`     | PostgreSQL host                |
| `DB_PORT`     | PostgreSQL port                |
| `DB_NAME`     | PostgreSQL database name       |
| `DB_USER`     | PostgreSQL username            |
| `DB_PASSWORD` | PostgreSQL password            |
| `JWT_SECRET`  | Secret used to sign JWT tokens |

Never commit real credentials or secrets to the repository.

---

## Project Status

**Development completed for portfolio demonstration.**

The core frontend and backend functionality has been implemented, integrated, and tested. The project includes role-based authentication, issue management, dashboards, analytics, notifications, and automated backend API tests.

---

## Project Purpose

Tugon was developed as a portfolio project to demonstrate practical experience in:

* Frontend development with React
* REST API development with Express
* PostgreSQL database integration
* Authentication and authorization
* Role-based application design
* CRUD operations
* API validation and error handling
* Dashboard and analytics development
* Automated API testing
* Frontend-backend integration

---

## Author

**L CJ**


---

## License

This project is intended primarily for portfolio and educational purposes.
