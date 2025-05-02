# Deploying Weather Dashboard with Vercel and Render

This guide provides specific instructions for deploying your weather application using Vercel (frontend) and Render (backend).

## Table of Contents

- [Frontend Deployment with Vercel](#frontend-deployment-with-vercel)
- [Backend Deployment with Render](#backend-deployment-with-render)
- [Connecting Frontend to Backend](#connecting-frontend-to-backend)
- [Environment Variables](#environment-variables)
- [CORS Configuration](#cors-configuration)
- [Troubleshooting](#troubleshooting)

## Frontend Deployment with Vercel

### Prerequisites

- GitHub account with your project repository
- Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)

### Deployment Steps

1. **Prepare Your Frontend Project**

   Ensure your Next.js project is ready for production:

   ```bash
   # Navigate to your Next.js project
   cd weatherapp

   # Install dependencies
   npm install

   # Test the build locally
   npm run build
   ```

2. **Create a Vercel Project**

   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository containing your Next.js project

3. **Configure Project Settings**

   - Framework Preset: Select "Next.js"
   - Build and Output Settings:
     - Build Command: `npm run build` (default)
     - Output Directory: `.next` (default)
     - Install Command: `npm install` (default)

4. **Configure Environment Variables**

   Add the following environment variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-render-backend-url.onrender.com/api` (you'll update this after deploying the backend)

5. **Deploy**

   - Click "Deploy"
   - Vercel will build and deploy your application
   - Once complete, you'll get a deployment URL (e.g., `https://your-project.vercel.app`)

6. **Custom Domain** (Optional)

   - Go to "Settings" → "Domains"
   - Add your custom domain and follow the verification steps

## Backend Deployment with Render

### Prerequisites

- GitHub account with your project repository
- Render account (sign up at [render.com](https://render.com))

### Deployment Steps

1. **Prepare Your Laravel Project**

   Ensure your Laravel project is ready for deployment:

   ```bash
   # Navigate to your Laravel project
   cd backend-weather-api

   # Install dependencies
   composer install --optimize-autoloader --no-dev

   # Generate application key
   php artisan key:generate

   # Clear caches
   php artisan config:clear
   php artisan route:clear
   php artisan cache:clear
   ```

2. **Create a `render.yaml` File**

   Create a `render.yaml` file in the root of your Laravel project:

   ```yaml
   services:
     - type: web
       name: weather-api
       env: php
       buildCommand: composer install --no-interaction --prefer-dist --optimize-autoloader
       startCommand: php artisan serve --host 0.0.0.0 --port $PORT
       envVars:
         - key: APP_ENV
           value: production
         - key: APP_DEBUG
           value: false
         - key: APP_KEY
           sync: false
         - key: OPENWEATHERMAP_API_KEY
           sync: false
   ```

3. **Create a Procfile**

   Create a `Procfile` in the root of your Laravel project:

   ```
   web: vendor/bin/heroku-php-apache2 public/
   ```

4. **Create a New Web Service on Render**

   - Log in to [dashboard.render.com](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your Laravel project

5. **Configure Web Service Settings**

   - Name: `weather-api` (or your preferred name)
   - Environment: `PHP`
   - Branch: `main` (or your deployment branch)
   - Build Command: `composer install --no-interaction --prefer-dist --optimize-autoloader`
   - Start Command: `heroku-php-apache2 public/`
   - Instance Type: Select Free or Standard tier

6. **Configure Environment Variables**

   Add the following environment variables:
   - `APP_ENV`: `production`
   - `APP_DEBUG`: `false`
   - `APP_KEY`: Run `php artisan key:generate --show` locally and copy the output
   - `OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key
   - `APP_URL`: The URL of your Render service (you'll get this after initial deployment)

7. **Deploy**

   - Click "Create Web Service"
   - Render will build and deploy your Laravel application
   - Once complete, you'll get a deployment URL (e.g., `https://weather-api.onrender.com`)

## Connecting Frontend to Backend

After deploying both services, you need to connect them:

1. **Update Frontend Environment Variable**

   - Go to your Vercel project dashboard
   - Navigate to "Settings" → "Environment Variables"
   - Update `NEXT_PUBLIC_API_URL` with your actual Render backend URL:
     ```
     NEXT_PUBLIC_API_URL=https://weather-api.onrender.com/api
     ```
   - Click "Save" and redeploy your frontend

2. **Test the Connection**

   - Visit your Vercel-deployed frontend
   - Try searching for a city to verify the API connection works

## Environment Variables

### Frontend (Vercel)

- `NEXT_PUBLIC_API_URL`: The URL of your Render backend API

### Backend (Render)

- `APP_ENV`: `production`
- `APP_DEBUG`: `false`
- `APP_KEY`: Your Laravel application key
- `APP_URL`: Your Render service URL
- `OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key

## CORS Configuration

To allow your Vercel frontend to communicate with your Render backend, update your CORS configuration in Laravel:

1. **Update `config/cors.php`**

   ```php
   return [
       'paths' => ['api/*'],
       'allowed_methods' => ['*'],
       'allowed_origins' => ['https://your-vercel-url.vercel.app', 'https://your-custom-domain.com'],
       'allowed_origins_patterns' => [],
       'allowed_headers' => ['*'],
       'exposed_headers' => [],
       'max_age' => 0,
       'supports_credentials' => false,
   ];
   ```

2. **Commit and Push Changes**

   ```bash
   git add config/cors.php
   git commit -m "Update CORS configuration for Vercel frontend"
   git push
   ```

3. **Redeploy Your Backend**

   - Go to your Render dashboard
   - Navigate to your web service
   - Click "Manual Deploy" → "Deploy latest commit"

## Troubleshooting

### Frontend Issues

- **API Connection Errors**:
  - Verify the `NEXT_PUBLIC_API_URL` is correct in Vercel
  - Check browser console for CORS errors
  - Ensure the API endpoint is correctly formatted (should end with `/api`)

- **Build Failures**:
  - Check Vercel build logs for errors
  - Verify your Next.js project builds locally with `npm run build`

### Backend Issues

- **500 Server Errors**:
  - Check Render logs for detailed error messages
  - Verify environment variables are correctly set
  - Check if your OpenWeatherMap API key is valid

- **CORS Errors**:
  - Verify your CORS configuration includes your Vercel domain
  - Check that the CORS middleware is enabled in Laravel

- **Deployment Failures**:
  - Ensure your Laravel project is compatible with PHP 8.x
  - Check Composer dependencies for any conflicts

---

By following this guide, you should have successfully deployed your weather application with Vercel (frontend) and Render (backend). If you encounter any issues, refer to the official documentation for [Vercel](https://vercel.com/docs) and [Render](https://render.com/docs).
