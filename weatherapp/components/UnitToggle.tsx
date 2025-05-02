"use client"

interface UnitToggleProps {
  unit: "metric" | "imperial"
  onToggle: () => void
}

export default function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <div className="glass rounded-full px-2 py-1 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center">
        <button
          onClick={unit === "metric" ? undefined : onToggle}
          className={`px-3 py-1 rounded-full transition-all duration-300 font-medium text-sm ${unit === "metric" ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'}`}
        >
          °C
        </button>
        
        <div className="mx-1 text-foreground/30">|</div>
        
        <button
          onClick={unit === "imperial" ? undefined : onToggle}
          className={`px-3 py-1 rounded-full transition-all duration-300 font-medium text-sm ${unit === "imperial" ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'}`}
        >
          °F
        </button>
      </div>
    </div>
  )
}
