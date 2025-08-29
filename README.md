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


