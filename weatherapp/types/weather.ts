export interface WeatherData {
  city: string
  date: string
  temperature: number
  condition: string
  description: string
  windSpeed: number
  windDirection: string
  humidity: number
  forecast: ForecastDay[]
}

export interface ForecastDay {
  date: string
  condition: string
  maxTemp: number
  minTemp: number
}
