# Vercel Deployment Guide for Weather Dashboard Application

This guide provides step-by-step instructions for deploying both the frontend (Next.js) and backend (Laravel) components of your weather dashboard application on Vercel.

## Table of Contents

- [Overview](#overview)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Environment Configuration](#environment-configuration)
- [CORS Configuration](#cors-configuration)
- [Domain Setup](#domain-setup)
- [Deployment Checklist](#deployment-checklist)

## Overview

Vercel offers a unified platform to deploy both your Next.js frontend and Laravel backend. This approach provides several benefits:

- **Unified Management**: Manage both services from a single dashboard
- **Improved Performance**: Reduced latency between frontend and backend
- **Simplified Configuration**: Easier environment variable management
- **Automatic HTTPS**: SSL certificates are automatically provisioned
- **Free Tier Available**: Generous free tier for both services

## Frontend Deployment

Vercel is the recommended platform for Next.js applications, offering the simplest deployment experience.

1. **Create a Vercel Account**
   - Sign up at [vercel.com](https://vercel.com) (you can use your GitHub account)

2. **Configure Environment Variables**
   - Create a `.env.production` file with your production backend URL:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app/api
     ```

3. **Deploy via GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Select the repository containing your Next.js project
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`
   - Add environment variables in the Vercel dashboard
   - Click Deploy

4. **Deploy via Vercel CLI** (alternative)
   ```bash
   # Navigate to your Next.js project directory
   cd weatherapp
   
   # Login to Vercel
   vercel login
   
   # Deploy to production
   vercel --prod
   ```

## Backend Deployment

Deploying your Laravel backend on Vercel requires some specific configuration.

1. **Prepare Your Laravel Project**
   - Ensure you have the following files in your repository:
     - `vercel.json`: Configuration file for Vercel
     - `api/index.php`: Entry point for Vercel serverless functions
     - `.vercelignore`: Files to exclude from deployment

2. **Vercel Configuration Files**
   - `vercel.json`:
     ```json
     {
       "version": 2,
       "framework": null,
       "functions": {
         "api/index.php": {
           "runtime": "vercel-php@0.6.0"
         }
       },
       "routes": [
         {
           "src": "/(css|js|favicon|build)/(.*)",
           "dest": "/public/$1/$2"
         },
         {
           "src": "/(.*)",
           "dest": "/api/index.php"
         }
       ],
       "env": {
         "APP_ENV": "production",
         "APP_DEBUG": "false",
         "APP_CONFIG_CACHE": "/tmp/config.php",
         "APP_EVENTS_CACHE": "/tmp/events.php",
         "APP_PACKAGES_CACHE": "/tmp/packages.php",
         "APP_ROUTES_CACHE": "/tmp/routes.php",
         "APP_SERVICES_CACHE": "/tmp/services.php",
         "VIEW_COMPILED_PATH": "/tmp",
         "CACHE_DRIVER": "array",
         "LOG_CHANNEL": "stderr",
         "SESSION_DRIVER": "array",
         "DB_CONNECTION": "sqlite",
         "DB_DATABASE": ":memory:"
       }
     }
     ```

   - `api/index.php`:
     ```php
     <?php
     // Forward Vercel requests to normal index.php
     require __DIR__ . '/../public/index.php';
     ```

   - `.vercelignore`:
     ```
     /vendor
     /.git
     /node_modules
     /storage/*.key
     /.env
     /.env.*
     !/.env.example
     /.phpunit.cache
     /docker
     ```

3. **Deploy via GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Select the repository containing your Laravel project
   - Configure build settings:
     - Framework Preset: Other
     - Build Command: (leave default)
     - Output Directory: (leave default)
     - Install Command: (leave default)
   - Add environment variables in the Vercel dashboard:
     ```
     APP_KEY=base64:iaeLMBTF7U5OTDtpIzBM4tTtYJjVxjeJJhef8CVYEvc=
     OPENWEATHERMAP_API_KEY=4828654134111fbe21b9e606c229529f
     ```
   - Click Deploy

4. **Verify Deployment**
   - Once deployed, test your API endpoint:
     ```
     https://your-backend-api.vercel.app/api/ping
     ```

## Environment Configuration

### Frontend Environment Variables

For production, update your environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app/api
```

### Backend Environment Variables

Add these environment variables in the Vercel dashboard for your Laravel backend:

```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:iaeLMBTF7U5OTDtpIzBM4tTtYJjVxjeJJhef8CVYEvc=
APP_URL=https://your-backend-api.vercel.app

OPENWEATHERMAP_API_KEY=4828654134111fbe21b9e606c229529f

DB_CONNECTION=sqlite
DB_DATABASE=:memory:
```

## CORS Configuration

To allow your frontend to communicate with your backend API, configure CORS in Laravel:

1. **Update CORS Configuration**
   
   Edit `config/cors.php`:
   ```php
   return [
       'paths' => ['api/*'],
       'allowed_methods' => ['*'],
       'allowed_origins' => [
           'http://localhost:3000',
           'https://your-frontend-app.vercel.app',
           'https://your-custom-domain.com', // If you have a custom domain
       ],
       'allowed_headers' => ['*'],
       'exposed_headers' => [],
       'max_age' => 0,
       'supports_credentials' => false,
   ];
   ```

## Domain Setup

1. **Custom Domains on Vercel**
   - In your Vercel project dashboard, go to "Settings" → "Domains"
   - Add your custom domain (e.g., `weather-app.com` for frontend, `api.weather-app.com` for backend)
   - Follow Vercel's instructions to verify domain ownership
   - Update DNS records at your domain registrar as instructed by Vercel

2. **SSL Certificates**
   - Vercel automatically provisions SSL certificates for all domains
   - No additional configuration required

## Deployment Checklist

Before finalizing deployment, verify:

- [ ] Frontend environment variables are correctly set in Vercel dashboard
- [ ] Backend environment variables are correctly set in Vercel dashboard
- [ ] CORS is properly configured to allow your frontend domain
- [ ] API endpoints are working correctly
- [ ] Frontend can communicate with backend
- [ ] OpenWeatherMap API key is valid
- [ ] Custom domains are properly configured (if using)

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**:
   - Check Vercel logs for detailed error messages
   - Verify environment variables are correctly set
   - Ensure your OpenWeatherMap API key is valid

2. **CORS Errors**:
   - Verify your CORS configuration includes your frontend domain
   - Check browser console for specific CORS error messages

3. **Deployment Failures**:
   - Check Vercel build logs for errors
   - Ensure your Laravel project is compatible with Vercel's PHP runtime

### Vercel Logs

To view logs for debugging:
1. Go to your Vercel dashboard
2. Select your project
3. Navigate to "Deployments" → select the latest deployment
4. Click "Functions" to see function logs

---

By following this guide, you should have successfully deployed both the frontend and backend components of your weather dashboard application on Vercel. The unified platform approach simplifies management and improves performance between your Next.js frontend and Laravel backend.
