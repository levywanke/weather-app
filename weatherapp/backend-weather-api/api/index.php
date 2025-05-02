<?php
// Set up basic error handling for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'message' => 'Minimal PHP API is working!'
]);

// Parse the request path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

// Parse query parameters
$query = [];
if (isset($_SERVER['QUERY_STRING'])) {
    parse_str($_SERVER['QUERY_STRING'], $query);
}

// Simple router
if ($path === 'api/ping') {
    echo json_encode(['message' => 'pong', 'status' => 'success']);
    exit();
}

if ($path === 'api/weather' || $path === 'api/weather/') {
    // Check if city parameter is provided
    if (!isset($query['city']) || empty($query['city'])) {
        http_response_code(400);
        echo json_encode(['error' => 'City parameter is required']);
        exit();
    }
    
    $city = $query['city'];
    $unit = isset($query['unit']) ? $query['unit'] : 'metric';
    
    // OpenWeatherMap API key
    $apiKey = '4828654134111fbe21b9e606c229529f';
    
    // Fetch weather data from OpenWeatherMap API
    $weatherData = fetchWeatherData($city, $unit, $apiKey);
    
    echo json_encode($weatherData);
    exit();
}

// Default response for unknown routes
http_response_code(404);
echo json_encode(['error' => 'Not found', 'path' => $path]);
exit();

/**
 * Fetch weather data from OpenWeatherMap API
 */
function fetchWeatherData($city, $unit, $apiKey) {
    // Geocoding API to get coordinates
    $geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q={$city}&limit=1&appid={$apiKey}";
    
    $geocodingResponse = file_get_contents($geocodingUrl);
    $geocodingData = json_decode($geocodingResponse, true);
    
    if (empty($geocodingData)) {
        return ['error' => 'City not found'];
    }
    
    $lat = $geocodingData[0]['lat'];
    $lon = $geocodingData[0]['lon'];
    
    // Current weather API
    $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&units={$unit}&appid={$apiKey}";
    
    $weatherResponse = file_get_contents($weatherUrl);
    $weatherData = json_decode($weatherResponse, true);
    
    // Forecast API
    $forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={$lat}&lon={$lon}&units={$unit}&appid={$apiKey}";
    
    $forecastResponse = file_get_contents($forecastUrl);
    $forecastData = json_decode($forecastResponse, true);
    
    // Process forecast data to get 3-day forecast
    $forecast = [];
    $processedDays = [];
    
    if (isset($forecastData['list'])) {
        foreach ($forecastData['list'] as $item) {
            $date = date('Y-m-d', $item['dt']);
            
            // Skip if we already have this day or if we have 3 days
            if (in_array($date, $processedDays) || count($processedDays) >= 3) {
                continue;
            }
            
            $processedDays[] = $date;
            
            $forecast[] = [
                'date' => $date,
                'temp' => $item['main']['temp'],
                'weather' => $item['weather'][0]['main'],
                'description' => $item['weather'][0]['description'],
                'icon' => $item['weather'][0]['icon'],
            ];
        }
    }
    
    // Prepare the response
    $response = [
        'current' => $weatherData,
        'forecast' => $forecast,
        'city' => $city,
        'unit' => $unit
    ];
    
    return $response;
}
