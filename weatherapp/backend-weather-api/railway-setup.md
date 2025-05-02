# Railway Deployment Configuration for Weather API

This document provides instructions for setting up your Laravel Weather API on Railway.

## Environment Variables

When deploying to Railway, you'll need to set the following environment variables in the Railway dashboard:

```
APP_NAME=WeatherAPI
APP_ENV=production
APP_KEY=your_laravel_app_key
APP_DEBUG=false
APP_URL=https://your-railway-app-url.railway.app

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=sqlite
DB_DATABASE=:memory:

SESSION_DRIVER=array
SESSION_LIFETIME=120
SESSION_ENCRYPT=false

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
CACHE_STORE=array

OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

## CORS Configuration

Your CORS configuration should be updated to allow requests from your Vercel frontend:

```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'https://your-vercel-app.vercel.app',
        'https://your-custom-domain.com',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

## Deployment Steps

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app) and create an account

2. **Install Railway CLI** (optional)
   ```bash
   npm i -g @railway/cli
   railway login
   ```

3. **Deploy via Railway Dashboard**
   - Go to [railway.app/dashboard](https://railway.app/dashboard)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository and the `deploy-backend` branch
   - Configure environment variables as listed above
   - Railway will automatically detect your Laravel application and deploy it

4. **Deploy via Railway CLI** (alternative)
   ```bash
   # Navigate to your Laravel project
   cd backend-weather-api
   
   # Initialize Railway project
   railway init
   
   # Link to existing project (if you created one in the dashboard)
   railway link
   
   # Add environment variables
   railway vars set APP_ENV=production APP_DEBUG=false ...
   
   # Deploy
   railway up
   ```

5. **Verify Deployment**
   - Once deployed, Railway will provide you with a URL
   - Test your API endpoint: `https://your-app.railway.app/api/ping`

## Post-Deployment

After successful deployment:

1. Update your Vercel frontend's environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-app.railway.app/api
   ```

2. Update your CORS configuration if needed with the actual Vercel domain.

## Monitoring and Logs

- Access logs via the Railway dashboard
- Monitor application performance in the "Metrics" tab
