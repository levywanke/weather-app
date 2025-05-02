interface WeatherIconProps {
  condition: string
  size?: "small" | "medium" | "large"
}

export default function WeatherIcon({ condition, size = "medium" }: WeatherIconProps) {
  const getIconClass = () => {
    switch (size) {
      case "small":
        return "text-4xl"
      case "medium":
        return "text-6xl"
      case "large":
        return "text-8xl"
      default:
        return "text-6xl"
    }
  }

  const getIcon = () => {
    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-sunny blur-sm opacity-70"></div>
          <div className="relative animate-pulse-slow">☀️</div>
        </div>
      )
    } else if (lowerCondition.includes("cloud")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-cloudy blur-sm opacity-70"></div>
          <div className="relative">☁️</div>
        </div>
      )
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-rainy blur-sm opacity-70"></div>
          <div className="relative">🌧️</div>
        </div>
      )
    } else if (lowerCondition.includes("snow")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-snowy blur-sm opacity-70"></div>
          <div className="relative">❄️</div>
        </div>
      )
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-rainy blur-sm opacity-70"></div>
          <div className="relative animate-pulse-fast">⛈️</div>
        </div>
      )
    } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-cloudy blur-sm opacity-90"></div>
          <div className="relative">🌫️</div>
        </div>
      )
    } else {
      return (
        <div className="relative">
          <div className="absolute inset-0 text-weather-sunny blur-sm opacity-50"></div>
          <div className="relative">🌤️</div>
        </div>
      )
    }
  }

  return <div className={`${getIconClass()} drop-shadow-lg`}>{getIcon()}</div>
}
