# Deploying Laravel Weather API on Vercel

This guide provides step-by-step instructions for deploying your Laravel Weather API backend on Vercel.

## Prerequisites

- GitHub account with your repository
- Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)
- OpenWeatherMap API key

## Configuration Files

The following files have been added to your repository for Vercel deployment:

1. **vercel.json**: Configuration file for Vercel deployment
2. **api/index.php**: Entry point for Vercel serverless functions
3. **.vercelignore**: Specifies files to exclude from deployment

## Deployment Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin deploy-vercel
```

### 2. Deploy on Vercel

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with your GitHub account

2. **Import Your Repository**:
   - Click "Add New..." → "Project"
   - Select your repository containing the Laravel backend
   - Choose the `deploy-vercel` branch

3. **Configure Project Settings**:
   - Framework Preset: Select "Other"
   - Root Directory: Keep as default (or specify if your Laravel project is in a subdirectory)
   - Build and Output Settings: Use defaults (Vercel will use your vercel.json configuration)

4. **Configure Environment Variables**:
   Add the following environment variables:
   
   ```
   APP_KEY=your_laravel_app_key
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   ```
   
   Note: You can get your APP_KEY by running `php artisan key:generate --show` locally

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Once complete, you'll get a deployment URL (e.g., `https://weather-api.vercel.app`)

### 3. Update CORS Configuration

After deployment, update your CORS configuration to allow requests from your frontend domain:

```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'https://your-frontend-app.vercel.app', // Your frontend Vercel domain
        'https://your-custom-domain.com',       // Your custom domain (if any)
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

Commit and push these changes, then redeploy your backend.

## Frontend Configuration

After deploying your backend, update your Next.js frontend's environment variable:

```
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app/api
```

## Testing Your Deployment

1. **Test the Backend API**:
   - Visit `https://your-backend-app.vercel.app/api/ping`
   - You should receive a JSON response with a "pong" message

2. **Test the Frontend Integration**:
   - Deploy your Next.js frontend to Vercel
   - Ensure it can successfully fetch data from your backend API

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

## Advantages of Vercel Deployment

- **Unified Platform**: Manage both frontend and backend from a single dashboard
- **Improved Performance**: Both services on the same infrastructure reduces latency
- **Simplified Configuration**: Easier environment variable management
- **Free Tier Available**: Vercel offers a generous free tier for both services
- **Automatic HTTPS**: SSL certificates are automatically provisioned

## Limitations

- **Stateless Operation**: Vercel functions are stateless, so your Laravel app must be configured to work without local file storage
- **Cold Starts**: Serverless functions may experience cold starts
- **Execution Time Limits**: Vercel has a 10-second execution limit for serverless functions
- **Memory Limitations**: 1024MB RAM limit per function execution

For your weather app specifically, these limitations shouldn't be an issue since:
- You're using SQLite in-memory database (no persistent storage needed)
- Your API calls to OpenWeatherMap are likely quick
- Your backend is already configured to be stateless

## Resources

- [Vercel PHP Runtime Documentation](https://vercel.com/docs/functions/runtimes/php)
- [Laravel on Vercel Guide](https://vercel.com/guides/deploying-laravel-with-vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
