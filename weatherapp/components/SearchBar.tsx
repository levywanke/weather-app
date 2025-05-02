"use client"

import { useState, type FormEvent } from "react"
import { Search, MapPin, Compass } from "lucide-react"

interface SearchBarProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass rounded-xl p-1 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70">
              <MapPin size={18} />
            </div>
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full rounded-lg bg-transparent py-3 pl-10 pr-4 text-foreground placeholder-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
            {searchTerm && (
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                onClick={() => setSearchTerm('')}
                disabled={isLoading}
              >
                ×
              </button>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary py-2 px-4 text-primary-foreground font-medium transition-all duration-300 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading || !searchTerm.trim()}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Quick suggestions */}
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {["London", "Tokyo", "New York", "Paris", "Sydney"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setSearchTerm(city);
              onSearch(city);
            }}
            disabled={isLoading}
            className="text-xs py-1 px-3 rounded-full bg-primary/10 text-foreground/80 hover:bg-primary/20 transition-colors flex items-center gap-1"
          >
            <Compass size={12} />
            {city}
          </button>
        ))}
      </div>
    </form>
  )
}
