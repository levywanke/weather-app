<?php
// Set up basic error handling for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Ensure storage directory is writable
$storageDir = __DIR__ . '/../storage';
if (!is_dir($storageDir . '/logs')) {
    mkdir($storageDir . '/logs', 0777, true);
}
if (!is_dir($storageDir . '/framework/views')) {
    mkdir($storageDir . '/framework/views', 0777, true);
}

// Forward Vercel requests to normal index.php
require __DIR__ . '/../public/index.php';
