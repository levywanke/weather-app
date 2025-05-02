interface WindHumidityPanelProps {
  windSpeed: number
  windDirection: string
  humidity: number
}

export default function WindHumidityPanel({ windSpeed, windDirection, humidity }: WindHumidityPanelProps) {
  // Determine wind speed styling
  const getWindSpeedClass = () => {
    if (windSpeed > 30) return 'text-temp-hot';
    if (windSpeed > 15) return 'text-primary';
    return 'text-temp-cold';
  };
  
  // Determine humidity styling
  const getHumidityClass = () => {
    if (humidity > 80) return 'from-weather-rainy to-temp-cold';
    if (humidity > 50) return 'from-temp-cold to-primary';
    return 'from-primary to-temp-hot/70';
  };
  
  return (
    <>
      <div className="glass rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Wind Status</h3>
        <div className="flex flex-col items-center">
          <p className={`text-4xl font-bold ${getWindSpeedClass()} drop-shadow-md`}>{windSpeed} km/h</p>
          <div className="mt-4 flex items-center">
            <div className="mr-3 rounded-full bg-primary/20 p-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: `rotate(${
                    windDirection === "N"
                      ? 0
                      : windDirection === "NE"
                        ? 45
                        : windDirection === "E"
                          ? 90
                          : windDirection === "SE"
                            ? 135
                            : windDirection === "S"
                              ? 180
                              : windDirection === "SW"
                                ? 225
                                : windDirection === "W"
                                  ? 270
                                  : windDirection === "NW"
                                    ? 315
                                    : 0
                  }deg)`,
                }}
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </div>
            <span className="text-lg font-medium text-foreground">{windDirection}</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-primary drop-shadow-md">{humidity}%</p>
          <div className="mt-6 w-full">
            <div className="h-3 w-full rounded-full bg-secondary shadow-inner">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${getHumidityClass()} shadow-lg transition-all duration-500`}
                style={{ width: `${humidity}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
