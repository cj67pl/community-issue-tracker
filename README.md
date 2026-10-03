# Tugon: Institutional Issue Reporting and Management System

**Report. Respond. Resolve.**

Tugon is a web-based institutional issue reporting and management system developed as a portfolio project. It provides a centralized platform for reporting, tracking, managing, and resolving concerns within an institution.

The system supports different user roles, allowing reporters to submit and monitor their concerns, coordinators to manage reported issues, and administrators to manage users, categories, system activity, and analytics.

Tugon is implemented as a full-stack web application with a React frontend, Express backend, and PostgreSQL database.

---

## Live Demo

**Live Application:** [YOUR VERCEL URL]

### Demo Accounts

| Role          | Email                         | Password                         |
| ------------- | ----------------------------- | -------------------------------- |
| Administrator | `testadmin@example.com`       | `1234password`                   |
| Coordinator   | `siba@email.com`              | `1234password`                   |
| Reporter      | `larose@email.com`            | `1234password`                   |

These accounts are provided for portfolio demonstration purposes only. The demo environment uses sample data and is not intended for real-world use or the storage of sensitive information.

> **Demo Mode:** Data-modifying actions are disabled in the public demonstration to protect the demo dataset.

Visitors can log in using the demo accounts and explore the different role-based interfaces, dashboards, issue management pages, analytics, users, categories, comments, and notifications.
**Demo Account Disclaimer**


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
* Filter issues using categories, priorities, and statuses

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

### Demo Mode

The public deployment uses a controlled **Demo Mode** to protect the demonstration dataset.

Visitors can:

* Log in using the available demo accounts
* View issues and issue details
* View dashboards and analytics
* View users and categories
* View comments and notifications

Data-modifying actions are disabled in the public demo, including:

* Creating, editing, and deleting issues
* Creating, editing, and deleting comments
* Creating and editing users
* Changing user passwords, roles, or account status
* Deactivating users
* Creating and editing categories
* Changing category status

Demo Mode is enforced by the backend through middleware, preventing restricted requests from modifying the deployed database.

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
* React Icons
* Lucide Icons

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

### Deployment

* Vercel
* Render
* Neon PostgreSQL

---

## System Architecture

Tugon follows a separated frontend and backend architecture.

```text
                         ┌──────────────────────┐
                         │       Vercel         │
                         │    Tugon Frontend    │
                         │    React + Vite      │
                         │     Tailwind CSS     │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS / REST API
                                    ▼
                         ┌──────────────────────┐
                         │       Render         │
                         │    Express Server    │
                         │       Node.js        │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │  Middleware  │  │ Controllers  │  │    Routes    │
          │              │  │              │  │              │
          │ Auth         │  │ Business     │  │ REST API     │
          │ Role         │  │ Logic        │  │ Endpoints    │
          │ Demo Mode    │  │              │  │              │
          └──────────────┘  └──────────────┘  └──────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Neon PostgreSQL    │
                         │       Database       │
                         └──────────────────────┘
```

The frontend communicates with the Express backend through REST API endpoints.

The backend handles:

* Authentication
* Authorization
* Demo Mode protection
* Request validation
* Business logic
* Database operations
* Error handling

---

## Backend Structure

The backend follows a controller, route, middleware, and utility-based structure.

```text
server/

├── config/
│   └── db.js
│
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
│
├── middleware/
│   ├── auth.middleware.js
│   ├── demoMode.js
│   ├── error.middleware.js
│   └── role.middleware.js
│
├── routes/
│   ├── analytics.routes.js
│   ├── auth.routes.js
│   ├── categories.routes.js
│   ├── comments.routes.js
│   ├── dashboard.routes.js
│   ├── issues.routes.js
│   ├── notifications.routes.js
│   └── users.routes.js
│
├── utils/
│   ├── dateRange.js
│   └── validation.js
│
├── app.js
├── server.js
├── .env
└── package.json
```

---

## Database

Tugon uses PostgreSQL for persistent data storage.

The database includes tables for:

* Users
* Roles
* Categories
* Issues
* Statuses
* Priority Levels
* Comments
* Notifications

The database relationships support:

* Role-based access control
* User management
* Issue tracking
* Issue categorization
* Issue prioritization
* Status management
* Comments
* Notifications
* Dashboard queries
* Analytics queries

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

In the deployed environment, data-modifying operations are additionally protected by Demo Mode middleware.

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

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

From the `server` directory:

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` directory.

For local PostgreSQL development:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret

DEMO_MODE=false
```

The frontend uses a root `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_DEMO_MODE=false
```

Do not commit `.env` files or real credentials to GitHub.

### 5. Start the Backend

From the `server` directory:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:3000
```

### 6. Start the Frontend

From the project root:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## Environment Variables

### Backend

| Variable       | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `PORT`         | Backend server port                                           |
| `DB_HOST`      | PostgreSQL host for local development                         |
| `DB_PORT`      | PostgreSQL port                                               |
| `DB_NAME`      | PostgreSQL database name                                      |
| `DB_USER`      | PostgreSQL username                                           |
| `DB_PASSWORD`  | PostgreSQL password                                           |
| `DATABASE_URL` | PostgreSQL connection string used by the deployed environment |
| `JWT_SECRET`   | Secret used to sign JWT tokens                                |
| `CLIENT_URL`   | Frontend origin allowed by the backend                        |
| `DEMO_MODE`    | Enables backend Demo Mode protection                          |

### Frontend

| Variable         | Description                    |
| ---------------- | ------------------------------ |
| `VITE_API_URL`   | Base URL of the backend API    |
| `VITE_DEMO_MODE` | Controls frontend Demo Mode UI |

`VITE_*` variables are exposed to the browser by Vite and should not contain secrets.

Never commit real credentials, database passwords, JWT secrets, or connection strings to the repository.

---

## Deployment

Tugon is deployed using separate services for the frontend, backend, and database.

```text
Vercel
React + Vite Frontend
        │
        │ HTTPS
        ▼
Render
Express + Node.js API
        │
        │ PostgreSQL
        ▼
Neon
PostgreSQL Database
```

### Frontend

The React/Vite frontend is deployed on Vercel.

The deployed frontend uses:

```env
VITE_API_URL=https://tugon-api.onrender.com/api
VITE_DEMO_MODE=true
```

### Backend

The Express API is deployed on Render.

The deployed backend uses environment variables for the database connection, JWT secret, frontend origin, and Demo Mode.

```env
NODE_ENV=production
DATABASE_URL=<Neon connection string>
JWT_SECRET=<secret>
CLIENT_URL=<Vercel frontend URL>
DEMO_MODE=true
```

### Database

The deployed application uses Neon PostgreSQL.

Database credentials and connection strings are stored as environment variables and are not included in the frontend or source code.

---

## Project Status

**Development completed for portfolio demonstration.**

The core frontend and backend functionality has been implemented, integrated, tested, and deployed.

The project includes:

* Role-based authentication
* Issue management
* Comments
* Notifications
* Reporter, coordinator, and administrator dashboards
* Analytics
* User and category management
* PostgreSQL database integration
* REST API
* Automated backend API tests
* Frontend-backend integration
* Production deployment
* Controlled Demo Mode for protecting the public demonstration dataset

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
* Full-stack application deployment

---

## Author

**L CJ**

---

## License

This project is intended primarily for portfolio and educational purposes.
