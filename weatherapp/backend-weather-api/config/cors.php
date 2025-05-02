<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',         // Local Next.js development
        'https://weather-app-nextjs.vercel.app', // Vercel default domain (update this with your actual domain)
        'https://your-custom-domain.com',  // Your custom domain (if you have one)
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
