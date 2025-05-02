import type { WeatherData } from "@/types/weather"

export async function fetchWeatherData(city: string, unit: "metric" | "imperial"): Promise<WeatherData> {
  try {
    // In a real app, this would be an environment variable
    const apiUrl = `/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}
