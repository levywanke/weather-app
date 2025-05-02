# Weather Dashboard Application

![Weather Dashboard](https://img.shields.io/badge/Weather-Dashboard-3b82f6?style=for-the-badge&logo=react)

A modern, responsive weather application built with Next.js (frontend) and Laravel (backend) that provides current weather conditions, forecasts, and detailed meteorological data.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Frontend](#frontend)
- [Backend](#backend)
- [Data Flow](#data-flow)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [UI Components](#ui-components)

## 🌦️ Overview

This weather dashboard application provides users with real-time weather information and forecasts for any city worldwide. The application features a modern, responsive UI with glass morphism design elements and weather-responsive styling that adapts to current conditions.

## ✨ Features

- **City Search**: Search for weather information by city name
- **Current Weather**: Display current temperature, conditions, and description
- **3-Day Forecast**: View upcoming weather predictions
- **Wind & Humidity**: Monitor wind speed, direction, and humidity levels
- **Unit Toggle**: Switch between metric (°C) and imperial (°F) units
- **Weather-Responsive UI**: Interface adapts to current weather conditions
- **Responsive Design**: Optimized for all device sizes

## 🏗️ Architecture

The application follows a decoupled architecture with:

- **Frontend**: Next.js with TypeScript, hosted independently
- **Backend**: Laravel API-only application, serving as the data provider
- **External API**: OpenWeatherMap for weather data

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Next.js   │     │   Laravel   │     │OpenWeatherMap│
│  Frontend   │◄───►│   Backend   │◄───►│     API     │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 🎨 Frontend

### Technology Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS with RippleUI components
- **State Management**: React hooks for local state
- **API Communication**: Fetch API

### Key Components

- **SearchBar**: City input with suggestions and error handling
- **WeatherDisplay**: Main weather information display
- **ForecastCards**: 3-day weather forecast
- **WindHumidityPanel**: Detailed wind and humidity information
- **UnitToggle**: Switch between metric and imperial units

### Styling

The frontend uses a custom color scheme with:

- Weather-specific colors (hot/cold temperatures)
- Condition-specific styling (sunny, cloudy, rainy, snowy)
- Glass morphism effects for cards and panels
- Responsive animations and transitions

### Directory Structure

```
frontend/
├── app/             # Next.js app router
├── components/      # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── public/          # Static assets
├── services/        # API service functions
├── styles/          # Global CSS and Tailwind config
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## ⚙️ Backend

### Technology Stack

- **Framework**: Laravel 12
- **API**: RESTful endpoints
- **External Integration**: OpenWeatherMap API

### Key Features

- **City Geocoding**: Convert city names to coordinates
- **Current Weather**: Fetch current conditions
- **Forecast Data**: Retrieve 3-day forecasts
- **Wind Direction Conversion**: Convert degrees to cardinal directions
- **Unit Conversion**: Support for metric and imperial units

### API Endpoints

- **GET /api/ping**: Health check endpoint
- **GET /api/weather**: Weather data endpoint
  - Parameters:
    - `city`: City name (required)
    - `unit`: Unit system (metric/imperial, default: metric)

### Directory Structure

```
backend-weather-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── PingController.php
│   │   │       └── WeatherController.php
│   │   └── Middleware/
│   └── Providers/
│       └── RouteServiceProvider.php
├── config/
├── routes/
│   └── api.php
└── .env
```

## 🔄 Data Flow

1. **User Interaction**:
   - User enters a city name in the search bar
   - Frontend sends a request to the Laravel backend

2. **Backend Processing**:
   - Laravel receives the request and validates input
   - Makes a request to OpenWeatherMap API
   - Processes and transforms the data (unit conversion, formatting)
   - Returns formatted JSON response

3. **Frontend Rendering**:
   - Next.js receives the API response
   - Updates the UI components with weather data
   - Applies weather-specific styling based on conditions

4. **State Updates**:
   - Weather data is stored in component state
   - UI updates reactively to reflect new data
   - Background and styling adapt to weather conditions

## 🚀 Setup & Installation

### Frontend Setup

```bash
# Navigate to frontend directory
cd weatherapp

# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend-weather-api

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure your .env file with OpenWeatherMap API key
# OPENWEATHERMAP_API_KEY=your_api_key_here

# Start the Laravel server
php artisan serve
```

## 🔑 Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)

```
APP_NAME=WeatherAPI
APP_ENV=local
APP_KEY=base64:your_app_key
APP_DEBUG=true
APP_URL=http://localhost:8000

OPENWEATHERMAP_API_KEY=your_api_key_here
```

## 📚 API Documentation

### GET /api/weather

Fetches weather data for a specified city.

**Parameters**:
- `city` (required): Name of the city
- `unit` (optional): Unit system (metric/imperial), defaults to metric

**Response**:
```json
{
  "city": "London",
  "temperature": 15.5,
  "condition": "Clear",
  "description": "clear sky",
  "date": "2025-05-02T15:30:00Z",
  "windSpeed": 4.1,
  "windDirection": "NE",
  "humidity": 76,
  "forecast": [
    {
      "date": "2025-05-03T12:00:00Z",
      "minTemp": 12.3,
      "maxTemp": 18.7,
      "condition": "Clouds"
    },
    // Additional forecast days...
  ]
}
```

## 🧩 UI Components

### SearchBar
Allows users to search for cities with suggestions and error handling.

### WeatherDisplay
Shows current temperature, condition, and city information with weather-responsive styling.

### ForecastCards
Displays a 3-day forecast with temperature ranges and condition icons.

### WindHumidityPanel
Shows detailed wind and humidity information with visual indicators.

### UnitToggle
Allows switching between metric (°C) and imperial (°F) units.

---

## 🌐 Live Demo

[Weather Dashboard Demo](https://weather-dashboard-demo.example.com)

## 📝 License

MIT License

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [RippleUI](https://www.ripple-ui.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the frontend framework
- [Laravel](https://laravel.com/) for the backend framework
