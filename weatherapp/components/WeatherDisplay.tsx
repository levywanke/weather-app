import { formatDate } from "@/utils/formatDate"
import WeatherIcon from "./WeatherIcon"

interface WeatherDisplayProps {
  temperature: number
  condition: string
  description: string
  date: string
  city: string
  unit: "metric" | "imperial"
}

export default function WeatherDisplay({ temperature, condition, description, date, city, unit }: WeatherDisplayProps) {
  // Determine temperature styling based on value
  const tempClass = temperature > 20 ? 'text-temp-hot' : 'text-temp-cold';
  
  // Determine background gradient based on weather condition
  const getWeatherGradient = () => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return 'bg-gradient-sunny';
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return 'bg-gradient-cloudy';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
      return 'bg-gradient-rainy';
    } else if (conditionLower.includes('snow') || conditionLower.includes('ice') || conditionLower.includes('frost')) {
      return 'bg-gradient-snowy';
    }
    return 'bg-gradient-cloudy'; // Default
  };
  
  return (
    <div className="glass rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
          <div className="mb-4 md:mb-0 transform transition-transform hover:scale-110">
            <WeatherIcon condition={condition} size="large" />
          </div>
          <div className="text-center md:text-left">
            <h1 className={`text-6xl font-bold ${tempClass} drop-shadow-lg`}>
              {Math.round(temperature)}°{unit === "metric" ? "C" : "F"}
            </h1>
            <p className="mt-2 text-xl capitalize text-foreground/90 font-medium">{description}</p>
          </div>
        </div>

        <div className="mt-4 text-center md:mt-0 md:text-right">
          <p className="text-lg font-medium text-foreground/80">{formatDate(date)}</p>
          <p className="text-3xl font-semibold text-foreground drop-shadow-md">{city}</p>
        </div>
      </div>
    </div>
  )
}
