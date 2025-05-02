#!/bin/bash

# Install Composer dependencies
echo "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# Generate Laravel caches
echo "Generating Laravel caches..."
php artisan config:cache
php artisan route:cache

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p public/build

# Create a simple index.html in the public directory
echo "Creating placeholder index.html..."
echo "<html><body><h1>Laravel API on Vercel</h1><p>API is running. Access endpoints at /api/...</p></body></html>" > public/index.html

echo "Build completed successfully!"
