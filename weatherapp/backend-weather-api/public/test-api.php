<?php

// Simple test endpoint
header('Content-Type: application/json');
echo json_encode([
    'message' => 'API test successful',
    'timestamp' => time(),
    'status' => 'success'
]);
