import type { ForecastDay } from "@/types/weather"
import { formatDay } from "@/utils/formatDate"
import { Cloud, CloudRain, Sun, CloudSun, CloudFog, CloudLightning, CloudSnow } from "lucide-react"

interface ForecastSectionProps {
  forecast: ForecastDay[]
  unit: "metric" | "imperial"
}

export default function ForecastSection({ forecast, unit }: ForecastSectionProps) {
  const getWeatherIcon = (condition: string, size = 36) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun size={size} className="text-yellow-500" />
      case "clouds":
        return <Cloud size={size} className="text-gray-500" />
      case "rain":
        return <CloudRain size={size} className="text-blue-500" />
      case "drizzle":
        return <CloudRain size={size} className="text-blue-400" />
      case "thunderstorm":
        return <CloudLightning size={size} className="text-purple-500" />
      case "snow":
        return <CloudSnow size={size} className="text-blue-200" />
      case "mist":
      case "fog":
        return <CloudFog size={size} className="text-gray-400" />
      default:
        return <CloudSun size={size} className="text-yellow-400" />
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">3-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">{formatDay(day.date)}</p>
            <div className="my-2">{getWeatherIcon(day.condition)}</div>
            <div className="text-sm">
              <span className="font-medium">{Math.round(day.maxTemp)}°</span> / {Math.round(day.minTemp)}°
              {unit === "metric" ? "C" : "F"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
