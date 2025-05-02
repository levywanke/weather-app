import { ArrowUp } from "lucide-react"

interface WeatherDetailsProps {
  windSpeed: number
  windDirection: string
  humidity: number
}

export default function WeatherDetails({ windSpeed, windDirection, humidity }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Wind Status</h3>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold mb-2">{windSpeed} km/h</p>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-1 mr-2">
              <ArrowUp
                size={16}
                className="transform"
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
              />
            </div>
            <span>{windDirection}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold mb-2">{humidity}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${humidity}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
