<?php

// Enhanced Weather API Script
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Enable CORS for development
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get API key from .env file
$envFile = dirname(__DIR__) . '/.env';
$apiKey = '';

if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, 'OPENWEATHER_API_KEY=') === 0) {
            $apiKey = trim(substr($line, strlen('OPENWEATHER_API_KEY=')));
            break;
        }
    }
}

// Get parameters from request
$city = isset($_GET['city']) ? $_GET['city'] : 'London';
$unit = isset($_GET['unit']) ? $_GET['unit'] : 'metric';

// Validate parameters
if (empty($city)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'error' => 'City parameter is required'
    ]);
    exit;
}

if (empty($apiKey)) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'error' => 'API key is not configured'
    ]);
    exit;
}

// Response array
$response = [
    'status' => 'processing',
    'city' => $city,
    'unit' => $unit,
    'timestamp' => time()
];

try {
    // Step 1: Get coordinates using Geocoding API
    $geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q={$city}&limit=1&appid={$apiKey}";
    $geoResponse = file_get_contents($geoUrl);
    $geoData = json_decode($geoResponse, true);
    
    if (empty($geoData)) {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'error' => 'City not found'
        ]);
        exit;
    }
    
    $lat = $geoData[0]['lat'];
    $lon = $geoData[0]['lon'];
    $cityName = $geoData[0]['name'];
    
    // Step 2: Get current weather data
    $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&units={$unit}&appid={$apiKey}";
    $weatherResponse = file_get_contents($weatherUrl);
    $weatherData = json_decode($weatherResponse, true);
    
    // Step 3: Get forecast data
    $forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={$lat}&lon={$lon}&units={$unit}&appid={$apiKey}";
    $forecastResponse = file_get_contents($forecastUrl);
    $forecastData = json_decode($forecastResponse, true);
    
    // Format the response to match the expected frontend format
    $response = [
        'city' => $cityName,
        'date' => date('Y-m-d'),
        'temperature' => $weatherData['main']['temp'],
        'condition' => $weatherData['weather'][0]['main'],
        'description' => $weatherData['weather'][0]['description'],
        'windSpeed' => $weatherData['wind']['speed'],
        'windDirection' => getWindDirection($weatherData['wind']['deg']),
        'humidity' => $weatherData['main']['humidity'],
        'forecast' => processForecastData($forecastData)
    ];
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'error' => $e->getMessage()
    ]);
    exit;
}

echo json_encode($response, JSON_PRETTY_PRINT);

// Helper function to get wind direction
function getWindDirection($degrees) {
    $directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    return $directions[round($degrees / 45)];
}

// Process forecast data to get next 3 days
function processForecastData($forecastData) {
    $dailyForecasts = [];
    $processedDays = [];
    
    // Group by day and get min/max temperatures
    foreach ($forecastData['list'] as $forecast) {
        $date = date('Y-m-d', $forecast['dt']);
        
        // Skip today
        if ($date === date('Y-m-d')) {
            continue;
        }
        
        if (!isset($processedDays[$date])) {
            $processedDays[$date] = [
                'date' => $date,
                'condition' => $forecast['weather'][0]['main'],
                'maxTemp' => $forecast['main']['temp_max'],
                'minTemp' => $forecast['main']['temp_min']
            ];
        } else {
            $processedDays[$date]['maxTemp'] = max($processedDays[$date]['maxTemp'], $forecast['main']['temp_max']);
            $processedDays[$date]['minTemp'] = min($processedDays[$date]['minTemp'], $forecast['main']['temp_min']);
            
            // Use noon condition if available
            $forecastTime = date('H', $forecast['dt']);
            if ($forecastTime >= 11 && $forecastTime <= 13) {
                $processedDays[$date]['condition'] = $forecast['weather'][0]['main'];
            }
        }
    }
    
    // Take only the next 3 days
    $dailyForecasts = array_values($processedDays);
    return array_slice($dailyForecasts, 0, 3);
}
