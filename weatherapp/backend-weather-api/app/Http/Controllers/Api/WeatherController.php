<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.openweather.api_key');
        \Log::info('API Key loaded', ['key_exists' => !empty($this->apiKey)]);
    }

    public function getWeather(Request $request)
    {
        \Log::info('Weather request received', [
            'city' => $request->query('city'),
            'unit' => $request->query('unit'),
            'api_key_set' => !empty($this->apiKey)
        ]);

        $city = $request->query('city');
        $unit = $request->query('unit', 'metric');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        try {
            // Step 1: Get coordinates using Geocoding API
            \Log::info('Making geocoding request');
            $geoResponse = Http::get("http://api.openweathermap.org/geo/1.0/direct", [
                'q' => $city,
                'limit' => 1,
                'appid' => $this->apiKey
            ]);

            $geoData = $geoResponse->json();

            \Log::info('Geocoding response', ['data' => $geoData]);
            if (empty($geoData)) {
                return response()->json(['error' => 'City not found'], 404);
            }

            $lat = $geoData[0]['lat'];
            $lon = $geoData[0]['lon'];
            $cityName = $geoData[0]['name'];

            // Step 2: Get current weather data
            $weatherResponse = Http::get("https://api.openweathermap.org/data/2.5/weather", [
                'lat' => $lat,
                'lon' => $lon,
                'units' => $unit,
                'appid' => $this->apiKey
            ]);

            // Step 3: Get forecast data
            $forecastResponse = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
                'lat' => $lat,
                'lon' => $lon,
                'units' => $unit,
                'appid' => $this->apiKey
            ]);

            $weatherData = $weatherResponse->json();
            $forecastData = $forecastResponse->json();

            // Process forecast data to get next 3 days
            $processedForecast = $this->processForecastData($forecastData);

            // Get wind direction as a string
            $windDirection = $this->getWindDirection($weatherData['wind']['deg']);

            // Format the response
            $response = [
                'city' => $cityName,
                'date' => date('Y-m-d'),
                'temperature' => $weatherData['main']['temp'],
                'condition' => $weatherData['weather'][0]['main'],
                'description' => $weatherData['weather'][0]['description'],
                'windSpeed' => $weatherData['wind']['speed'],
                'windDirection' => $windDirection,
                'humidity' => $weatherData['main']['humidity'],
                'forecast' => $processedForecast
            ];

            return response()->json($response);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function processForecastData($forecastData)
    {
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

    private function getWindDirection($degrees)
    {
        $directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        return $directions[round($degrees / 45)];
    }
}
