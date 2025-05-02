<?php
/**
 * Vercel Deployment Helper Script
 * This script helps prepare the Laravel application for Vercel deployment
 */

// Create necessary directories
$directories = [
    'storage/app',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
    'bootstrap/cache',
];

foreach ($directories as $directory) {
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
}

// Create a .htaccess file for API routing
$htaccess = <<<EOT
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOT;

file_put_contents('public/.htaccess', $htaccess);

// Create a simple index.html in the public directory
$html = <<<EOT
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weather API - Laravel on Vercel</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            width: 100%;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
        }
        body {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            padding: 40px;
            max-width: 600px;
            text-align: center;
        }
        h1 {
            margin-top: 0;
            color: #6e8efb;
        }
        .endpoints {
            background: #f5f5f5;
            border-radius: 4px;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
        }
        code {
            background: #e0e0e0;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Weather API</h1>
        <p>Your Laravel Weather API is running successfully on Vercel!</p>
        
        <div class="endpoints">
            <h3>Available Endpoints:</h3>
            <p><code>GET /api/weather?city={city}&unit={unit}</code> - Get current weather for a city</p>
            <p><code>GET /api/ping</code> - Check if the API is running</p>
        </div>
        
        <p>For more information, check the documentation or repository.</p>
    </div>
</body>
</html>
EOT;

file_put_contents('public/index.html', $html);

echo "Vercel deployment preparation completed successfully!\n";
