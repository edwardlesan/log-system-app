# Log System Application

A modern, full-stack web application for managing system logs with a clean, responsive interface. Built with Next.js 15, React 19, Express.js, and PostgreSQL.

## 🚀 Features

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
- **Database**: PostgreSQL with pgAdmin for management
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

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **pgAdmin** (for database management)

## 🗄️ Database Setup

### 1. Install PostgreSQL
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
- During installation, note down the password for the `postgres` user

### 2. Create Database
```sql
-- Connect to PostgreSQL as postgres user
psql -U postgres

-- Create the database
CREATE DATABASE log_system;

-- Create the logs table
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    owner VARCHAR(100) NOT NULL,
    log_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function before every UPDATE
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create an index for better performance
CREATE INDEX idx_logs_created_at ON logs(created_at DESC);

-- Exit psql
\q
```

### 3. pgAdmin Setup
- Install pgAdmin from [pgadmin.org](https://www.pgadmin.org/download/)
- Add your PostgreSQL server connection
- Use the credentials from your PostgreSQL installation

## ⚙️ Environment Configuration

### Backend Environment Variables
Create a `.env` file in the `server/` directory:

```env
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=log_system
PG_PASSWORD=your_postgres_password
PG_PORT=5432
```

### Frontend Environment Variables
Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd log-system-app
```

### 2. Install Dependencies

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

### 3. Start the Backend Server
```bash
cd server
npm run dev
```

The backend will start on `http://localhost:4000` with nodemon for auto-reload during development

### 4. Start the Frontend Application
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

The application currently doesn't include test files, but you can add:
- **Frontend**: Jest + React Testing Library
- **Backend**: Jest + Supertest for API testing

## 🚀 Deployment

### Frontend Deployment

#### Option 1: Vercel (Recommended for Next.js)
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build the application**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   - Follow the prompts to connect your GitHub repository
   - Set environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_API_URL`: Your production backend URL

#### Option 2: Netlify
1. **Build the application**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `out/` folder to Netlify
   - Or connect your GitHub repository
   - Set environment variables in Netlify dashboard

#### Option 3: Traditional Hosting
1. **Build the application**:
   ```bash
   cd client
   npm run build
   ```

2. **Upload files**:
   - Upload the `out/` directory to your web server
   - Configure your web server to serve static files

### Backend Deployment

#### Option 1: Railway
1. **Connect your GitHub repository** to Railway
2. **Set environment variables**:
   - `PG_USER`, `PG_HOST`, `PG_DATABASE`, `PG_PASSWORD`, `PG_PORT`
   - Use Railway's PostgreSQL addon or external database
3. **Deploy automatically** on git push

#### Option 2: Render
1. **Connect your GitHub repository** to Render
2. **Set environment variables** in Render dashboard
3. **Configure build command**: `npm install`
4. **Configure start command**: `npm start`

#### Option 3: DigitalOcean App Platform
1. **Connect your GitHub repository**
2. **Set environment variables**
3. **Configure build and start commands**

#### Option 4: VPS/Cloud Server
1. **Set up your server** (Ubuntu/Debian recommended)
2. **Install Node.js and PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone and deploy**:
   ```bash
   git clone <your-repo>
   cd log-system-app/server
   npm install
   npm run build
   ```

4. **Start with PM2**:
   ```bash
   pm2 start src/index.js --name "log-system-api"
   pm2 startup
   pm2 save
   ```

5. **Set up Nginx reverse proxy** (optional but recommended):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Database Deployment

#### Option 1: Managed PostgreSQL Services
- **Supabase**: Free tier available, easy setup
- **Neon**: Serverless PostgreSQL, generous free tier
- **Railway**: PostgreSQL addon with your app
- **Render**: PostgreSQL addon

#### Option 2: Self-hosted PostgreSQL
1. **Install PostgreSQL** on your server
2. **Create database and user**:
   ```sql
   CREATE DATABASE log_system;
   CREATE USER log_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE log_system TO log_user;
   ```

3. **Create the logs table**:
   ```sql
   CREATE TABLE logs (
       id SERIAL PRIMARY KEY,
       owner VARCHAR(100) NOT NULL,
       log_text TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );
   
   -- Create a function to automatically update the updated_at column
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   
   -- Create a trigger that calls the function before every UPDATE
   CREATE TRIGGER set_updated_at
   BEFORE UPDATE ON logs
   FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();
   
   -- Create an index for better performance
   CREATE INDEX idx_logs_created_at ON logs(created_at DESC);
   ```

## 🌐 Complete Live Deployment Guide

### 🎯 Step-by-Step Deployment Process

This guide will walk you through deploying your log system app to make it work live perfectly. We'll use **Vercel for the frontend** and **Railway for the backend** as they offer the best free tiers and easiest setup.

#### Phase 1: Prepare Your Application for Production ✅

##### Step 1: Update Environment Configuration ✅
1. **Create production environment files**:
   ```bash
   # In client/ directory
   touch .env.production
   
   # In server/ directory  
   touch .env.production
   ```

2. **Update client/.env.production**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```

3. **Update server/.env.production**:
   ```env
   NODE_ENV=production
   PORT=4000
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

##### Step 2: Update CORS Configuration ✅
1. **Edit server/src/index.js** to handle production CORS:
   ```javascript
   const corsOptions = {
     origin: process.env.NODE_ENV === 'production' 
       ? process.env.CORS_ORIGIN 
       : 'http://localhost:3000',
     credentials: true
   };
   
   app.use(cors(corsOptions));
   ```

##### Step 3: Add Production Scripts ✅
1. **Update server/package.json**:
   ```json
   {
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js",
       "build": "echo 'No build step required for Node.js'",
       "postinstall": "echo 'Dependencies installed successfully'"
     }
   }
   ```

#### Phase 2: Deploy Backend to Railway

##### Step 1: Set Up Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Create a new project

##### Step 2: Connect Your Repository
1. Click "Deploy from GitHub repo"
2. Select your `log-system-app` repository
3. Choose the `server` directory as the source

##### Step 3: Configure Environment Variables
1. In Railway dashboard, go to "Variables" tab
2. Add the following environment variables:
   ```env
   NODE_ENV=production
   PORT=4000
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

##### Step 4: Set Up PostgreSQL Database
1. Click "New" → "Database" → "PostgreSQL"
2. Railway will automatically create a PostgreSQL instance
3. Copy the connection details from the "Connect" tab
4. Add these to your environment variables:
   ```env
   PG_USER=postgres
   PG_HOST=containers-us-west-XX.railway.app
   PG_DATABASE=railway
   PG_PASSWORD=your_generated_password
   PG_PORT=XXXXX
   ```

##### Step 5: Deploy and Test
1. Railway will automatically deploy when you push to your main branch
2. Check the deployment logs for any errors
3. Test your API endpoint: `https://your-backend-url.railway.app/api/logs`

#### Phase 3: Deploy Frontend to Vercel

##### Step 1: Set Up Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Create a new project

##### Step 2: Connect Your Repository
1. Click "Import Git Repository"
2. Select your `log-system-app` repository
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

##### Step 3: Configure Environment Variables
1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```

##### Step 4: Deploy
1. Click "Deploy"
2. Vercel will build and deploy your application
3. You'll get a URL like: `https://your-app.vercel.app`

#### Phase 4: Database Setup and Migration

##### Step 1: Connect to Your Railway PostgreSQL
1. Use a database client like pgAdmin or DBeaver
2. Connect using the Railway connection details
3. Or use Railway's built-in database viewer

##### Step 2: Create the Database Schema
1. **Create the logs table**:
   ```sql
   CREATE TABLE logs (
       id SERIAL PRIMARY KEY,
       owner VARCHAR(100) NOT NULL,
       log_text TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Create the update trigger function**:
   ```sql
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **Create the trigger**:
   ```sql
   CREATE TRIGGER set_updated_at
   BEFORE UPDATE ON logs
   FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();
   ```

4. **Create performance index**:
   ```sql
   CREATE INDEX idx_logs_created_at ON logs(created_at DESC);
   ```

##### Step 3: Test Database Connection
1. Insert a test log:
   ```sql
   INSERT INTO logs (owner, log_text) 
   VALUES ('Test User', 'This is a test log entry');
   ```

2. Verify it appears in your application

#### Phase 5: Final Configuration and Testing

##### Step 1: Update Frontend API URL
1. Ensure your frontend is using the correct backend URL
2. Test the connection by trying to create a log

##### Step 2: Test All CRUD Operations
1. **Create**: Add a new log entry
2. **Read**: Verify logs display correctly
3. **Update**: Edit an existing log
4. **Delete**: Remove a log entry
5. **Pagination**: Test with multiple log entries

##### Step 3: Test Error Handling
1. Try to submit forms with invalid data
2. Verify error messages display correctly
3. Test network error scenarios

##### Step 4: Performance Testing
1. Add multiple log entries (20+)
2. Test pagination performance
3. Verify responsive design on mobile devices

#### Phase 6: Production Optimization

##### Step 1: Enable HTTPS
- Both Vercel and Railway provide HTTPS by default
- Verify your frontend and backend URLs use `https://`

##### Step 2: Set Up Monitoring
1. **Vercel Analytics**: Enable in your project settings
2. **Railway Metrics**: Monitor your backend performance
3. **Database Monitoring**: Check connection pool usage

##### Step 3: Set Up Alerts
1. Configure Railway alerts for high resource usage
2. Set up Vercel notifications for deployment status

#### Phase 7: Maintenance and Updates

##### Step 1: Automated Deployments
1. **Backend**: Railway automatically deploys on git push to main branch
2. **Frontend**: Vercel automatically deploys on git push to main branch

##### Step 2: Database Backups
1. Railway provides automatic PostgreSQL backups
2. Consider setting up additional backup strategies

##### Step 3: Regular Updates
1. Keep dependencies updated
2. Monitor for security vulnerabilities
3. Test updates in development before deploying

### 🚨 Troubleshooting Common Deployment Issues

#### Backend Connection Issues
1. **Check environment variables** in Railway dashboard
2. **Verify CORS configuration** matches your frontend URL
3. **Check database connection** details
4. **Review Railway deployment logs**

#### Frontend Build Issues
1. **Check Node.js version** compatibility
2. **Verify all dependencies** are in package.json
3. **Check for TypeScript errors** before deploying
4. **Review Vercel build logs**

#### Database Issues
1. **Verify connection string** format
2. **Check if database exists** and is accessible
3. **Verify table schema** matches your application
4. **Check Railway database status**

### 🎉 Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend API responds correctly
- [ ] Database connection works
- [ ] All CRUD operations function
- [ ] Pagination works correctly
- [ ] Error handling displays properly
- [ ] Responsive design works on mobile
- [ ] HTTPS is enabled and working
- [ ] Environment variables are set correctly
- [ ] Monitoring is configured
- [ ] Backup strategy is in place

### 🔄 Continuous Deployment Setup

1. **Enable automatic deployments** in both Vercel and Railway
2. **Set up branch protection** in GitHub
3. **Configure deployment notifications**
4. **Test deployment pipeline** with feature branches

Your log system app is now ready for production use! The combination of Vercel (frontend) and Railway (backend) provides a robust, scalable, and cost-effective hosting solution with excellent developer experience.

## 🚀 Post-Deployment Steps

### 1. Update Environment Variables
After successful deployment, update your environment variables:

#### Frontend
- Update `NEXT_PUBLIC_API_URL` to point to your production backend
- Example: `https://your-api-domain.com/api`

#### Backend
- Update database connection details for production
- Ensure CORS is configured for your frontend domain

### 2. Test Your Application
1. **Test all CRUD operations**:
   - Create a new log entry
   - Edit an existing log entry
   - Delete a log entry
   - Verify pagination works

2. **Check error handling**:
   - Test with invalid data
   - Verify error messages display correctly

3. **Test responsive design**:
   - Check on mobile devices
   - Verify table layout on different screen sizes

### 3. Set Up Monitoring
1. **Backend monitoring**:
   - Set up PM2 monitoring: `pm2 monit`
   - Configure log rotation
   - Set up health check endpoints

2. **Database monitoring**:
   - Monitor connection pool usage
   - Set up slow query logging
   - Configure backup schedules

### 4. Security Considerations
1. **Environment variables**:
   - Never commit `.env` files to git
   - Use strong, unique passwords
   - Rotate database credentials regularly

2. **CORS configuration**:
   - Restrict to your frontend domain only
   - Remove development origins

3. **Database security**:
   - Use SSL connections
   - Restrict database access to application server only
   - Regular security updates

### 5. Performance Optimization
1. **Frontend**:
   - Enable Next.js production optimizations
   - Configure CDN for static assets
   - Implement lazy loading for components

2. **Backend**:
   - Enable compression middleware
   - Implement request rate limiting
   - Add response caching headers

### 6. Backup Strategy
1. **Database backups**:
   - Set up automated daily backups
   - Test restore procedures
   - Store backups in multiple locations

2. **Application backups**:
   - Version control for code
   - Document deployment procedures
   - Keep deployment scripts updated

### 7. Documentation Updates
1. **Update README** with production URLs
2. **Document deployment procedures**
3. **Create runbooks** for common issues
4. **Update environment variable examples**

### 8. Team Access
1. **Grant access** to team members
2. **Set up monitoring alerts**
3. **Create incident response procedures**
4. **Document escalation paths**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Error
- Verify PostgreSQL is running
- Check environment variables in `.env`
- Ensure database and table exist

#### Frontend API Errors
- Verify backend server is running on port 4000
- Check `NEXT_PUBLIC_API_URL` environment variable
- Ensure CORS is properly configured

#### Port Already in Use
- Change the port in `server/src/index.js` (line 8)
- Update the frontend environment variable accordingly

### Getting Help
If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that PostgreSQL is running and accessible


