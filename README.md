# Log System Application

A modern, full-stack web application for managing system logs with a clean, responsive interface. Built with Next.js 15, React 19, Express.js, and PostgreSQL.

## 🚀 Live Demo

- **Frontend:** https://logs-system-app.vercel.app/
- **Backend API:** https://log-system-app-production.up.railway.app/api/logs
- **Status:** ✅ Production Ready

## ✨ Features

- **CRUD Operations**: Create, read, update, and delete logs
- **Real-time Updates**: Instant UI updates when logs are modified
- **Pagination**: Efficient data handling with paginated results
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Form Validation**: Robust form handling with React Hook Form and Zod schemas
- **Error Handling**: Comprehensive error handling and user feedback
- **TypeScript**: Full type safety across the application

## 🏗️ Architecture

The application follows a clean architecture pattern with:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Express.js REST API with Node.js
- **Database**: PostgreSQL with automatic triggers and indexing
- **State Management**: React hooks and server actions
- **Styling**: Tailwind CSS with custom components

## 📁 Project Structure

```
log-system-app/
├── client/                 # Next.js frontend application
│   ├── app/               # App router components
│   │   ├── _actions/      # Server actions for API calls
│   │   ├── _components/   # Reusable UI components
│   │   ├── _models/       # TypeScript type definitions
│   │   └── _utils/        # Utility functions and hooks
│   ├── components/ui/     # Base UI components
│   └── lib/               # Utility libraries
├── server/                # Express.js backend API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API route definitions
│   │   └── db.js         # Database connection
└── README.md
```

## 🛠️ Prerequisites

Before running this application locally, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd log-system-app
```

### 2. Set Up Database

#### Install PostgreSQL
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
- During installation, note down the password for the `postgres` user

#### Create Database and Tables
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE log_system;

# Connect to the database
\c log_system

# Create the logs table
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    owner VARCHAR(100) NOT NULL,
    log_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

# Create the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

# Create the trigger
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

# Create performance index
CREATE INDEX idx_logs_created_at ON logs(created_at DESC);

# Exit psql
\q
```

### 3. Set Up Environment Variables

#### Backend Environment
Create a `.env` file in the `server/` directory:

```env
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=log_system
PG_PASSWORD=your_postgres_password
PG_PORT=5432
```

#### Frontend Environment
Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 4. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

### 5. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

The backend will start on `http://localhost:4000` with nodemon for auto-reload during development.

#### Start Frontend Application
```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📱 Usage

### Adding a Log
1. Click the "Add Log" button in the top-right corner
2. Fill in the log text and owner information
3. Click "Save" to create the log entry

### Editing a Log
1. Click the edit icon (pencil) next to any log entry
2. Modify the log text or owner
3. Click "Save" to update the entry

### Deleting a Log
1. Click the delete icon (trash) next to any log entry
2. Confirm the deletion in the dialog

### Navigation
- Use the pagination controls at the bottom to navigate through logs
- The table displays 10 logs per page by default

## 🔧 Development

### Available Scripts

#### Frontend (client/)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

#### Backend (server/)
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Adding New Features
1. **Backend**: Add new routes in `server/src/routes/`, controllers in `server/src/controllers/`, and services in `server/src/services/`
2. **Frontend**: Create new components in `client/app/_components/` and add corresponding actions in `client/app/_actions/`

## 🧪 Testing

### API Testing with Postman
Test your backend API endpoints:

- **GET** `/api/logs` - Retrieve all logs
- **POST** `/api/logs` - Create a new log
- **PUT** `/api/logs/:id` - Update an existing log
- **DELETE** `/api/logs/:id` - Delete a log

### Frontend Testing
- Test all CRUD operations in the browser
- Verify responsive design on different screen sizes
- Test error handling with invalid data

## 🗄️ Database Schema

### Logs Table
```sql
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    owner VARCHAR(100) NOT NULL,
    log_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Automatic Updates
- `created_at` is set automatically when a log is created
- `updated_at` is updated automatically when a log is modified
- Performance index on `created_at` for efficient sorting

## 🔒 Environment Variables

### Required Variables
- **Backend**: Database connection details
- **Frontend**: API endpoint URL

## 🚀 Production Deployment

This application is configured for production deployment on:
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Railway PostgreSQL

For production deployment instructions, refer to the deployment guide in the project documentation.

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Error
- Verify PostgreSQL is running
- Check environment variables in `.env`
- Ensure database and table exist
- Verify connection credentials

#### Frontend API Errors
- Verify backend server is running on port 4000
- Check `NEXT_PUBLIC_API_URL` environment variable
- Ensure CORS is properly configured

#### Port Already in Use
- Change the port in `server/src/index.js`
- Update the frontend environment variable accordingly

#### Environment Variables Not Loading
- Restart your development server after changing `.env` files
- Verify file names are correct (`.env` for backend, `.env.local` for frontend)
- Check that variables are properly formatted





