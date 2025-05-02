<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherController;

// Simple test endpoint
Route::get('ping', function () {
    return response()->json(['message' => 'pong', 'status' => 'success', 'time' => now()]);
});

// Weather API endpoint
Route::get('weather', [WeatherController::class, 'getWeather']);
