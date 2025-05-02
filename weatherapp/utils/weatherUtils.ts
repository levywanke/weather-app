export function getWeatherBackground(condition: string): string {
  const lowerCondition = condition.toLowerCase()

  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return "bg-gradient-to-br from-blue-400 to-blue-600"
  } else if (lowerCondition.includes("cloud")) {
    return "bg-gradient-to-br from-gray-400 to-blue-500"
  } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
    return "bg-gradient-to-br from-gray-600 to-blue-700"
  } else if (lowerCondition.includes("snow")) {
    return "bg-gradient-to-br from-blue-100 to-blue-300"
  } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return "bg-gradient-to-br from-gray-700 to-purple-900"
  } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
    return "bg-gradient-to-br from-gray-300 to-gray-500"
  } else {
    return "bg-gradient-to-br from-blue-400 to-blue-600"
  }
}
