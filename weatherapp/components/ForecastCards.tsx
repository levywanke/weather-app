import { formatDay } from "@/utils/formatDate"
import WeatherIcon from "./WeatherIcon"
import type { ForecastDay } from "@/types/weather"

interface ForecastCardsProps {
  forecast: ForecastDay[]
  unit: "metric" | "imperial"
}

export default function ForecastCards({ forecast, unit }: ForecastCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {forecast.map((day, index) => {
        // Determine temperature styling based on value
        const maxTempClass = day.maxTemp > 20 ? 'text-temp-hot' : 'text-temp-cold';
        const minTempClass = day.minTemp > 15 ? 'text-temp-hot/80' : 'text-temp-cold/80';
        
        return (
          <div
            key={index}
            className="glass rounded-lg p-4 text-center shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <h3 className="mb-2 font-medium text-foreground">{formatDay(day.date)}</h3>
            <div className="flex justify-center">
              <WeatherIcon condition={day.condition} size="small" />
            </div>
            <div className="mt-2">
              <span className={`font-bold ${maxTempClass}`}>{Math.round(day.maxTemp)}°</span> /
              <span className={`${minTempClass}`}>{Math.round(day.minTemp)}°</span>
              <span className="ml-1 text-foreground/80">{unit === "metric" ? "C" : "F"}</span>
            </div>
          </div>
        );
      })}
    </div>
  )
}
