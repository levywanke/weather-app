"use client"

import { useState, useEffect } from "react"
import SearchBar from "@/components/SearchBar"
import UnitToggle from "@/components/UnitToggle"
import WeatherDisplay from "@/components/WeatherDisplay"
import ForecastCards from "@/components/ForecastCards"
import WindHumidityPanel from "@/components/WindHumidityPanel"
import type { WeatherData } from "@/types/weather"
import { getWeatherBackground } from "@/utils/weatherUtils"

export default function Home() {
  const [city, setCity] = useState<string>("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")

  const handleSearch = async (searchCity: string) => {
    if (!searchCity.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:8000/api/weather?city=${encodeURIComponent(searchCity)}&unit=${unit}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setWeatherData(data)
      setCity(searchCity)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnitToggle = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"))
  }

  // Refetch data when unit changes
  useEffect(() => {
    if (city) {
      handleSearch(city)
    }
  }, [unit])

  // Get background style based on weather condition
  const backgroundStyle = weatherData
    ? getWeatherBackground(weatherData.condition)
    : "bg-gradient-to-br from-sky-400 to-blue-600"

  return (
    <main className={`min-h-screen p-4 transition-all duration-1000 ${backgroundStyle}`}>
      {/* Decorative weather elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          {weatherData?.condition?.toLowerCase().includes('cloud') && (
            <div className="absolute top-[10%] left-[5%] text-8xl animate-float-slow opacity-20">☁️</div>
          )}
          {weatherData?.condition?.toLowerCase().includes('sun') && (
            <div className="absolute top-[5%] right-[10%] text-8xl animate-pulse-slow opacity-30">☀️</div>
          )}
          {weatherData?.condition?.toLowerCase().includes('rain') && (
            <div className="absolute top-[5%] left-[30%] text-6xl animate-float-medium opacity-20">🌧️</div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header section with logo and title */}
        <header className="mb-8 flex flex-col items-center justify-center space-y-2 pt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">🌦️</div>
            <h1 className="text-4xl font-bold text-foreground drop-shadow-lg">Weather Dashboard</h1>
          </div>
          
          {/* Search section with enhanced styling */}
          <div className="w-full max-w-xl mx-auto mt-6 mb-4">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          {/* Error message with improved styling */}
          {error && (
            <div className="glass rounded-lg p-4 w-full max-w-xl mx-auto border-l-4 border-temp-hot animate-fadeIn flex items-center gap-3">
              <div className="text-temp-hot text-xl">⚠️</div>
              <span className="text-foreground">{error}</span>
            </div>
          )}
        </header>

        {/* Loading state */}
        {isLoading && !weatherData && (
          <div className="flex flex-col h-64 items-center justify-center gap-4">
            <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <p className="text-foreground/70 animate-pulse">Fetching weather data...</p>
          </div>
        )}

        {/* Weather data display */}
        {weatherData && (
          <div className="space-y-8 animate-fadeIn">
            {/* Unit toggle positioned more prominently */}
            <div className="flex justify-end -mt-4">
              <UnitToggle unit={unit} onToggle={handleUnitToggle} />
            </div>

            {/* Main weather display with enhanced styling */}
            <WeatherDisplay
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              description={weatherData.description}
              date={weatherData.date}
              city={weatherData.city}
              unit={unit}
            />

            {/* Forecast section */}
            <div className="glass rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="mb-6 text-xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-primary">📅</span> 3-Day Forecast
              </h2>
              <ForecastCards forecast={weatherData.forecast} unit={unit} />
            </div>

            {/* Wind and humidity panels */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <WindHumidityPanel
                windSpeed={weatherData.windSpeed}
                windDirection={weatherData.windDirection}
                humidity={weatherData.humidity}
              />
            </div>
            
            {/* Footer with attribution */}
            <footer className="text-center text-sm text-foreground/60 pt-4 pb-8">
              <p>Data provided by OpenWeather API • Updated at {new Date().toLocaleTimeString()}</p>
            </footer>
          </div>
        )}
      </div>
    </main>
  )
}
