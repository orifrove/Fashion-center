'use client'

import { useEffect, useState } from 'react'
import { Cloud, Wind, Droplets, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface WeatherData {
  temperature: number
  feelsLike: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  city: string
  icon: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('London')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ?? ''}&units=metric`
          )
          if (res.ok) {
            const data = await res.json()
            setCity(data.name)
          }
          fetchWeather(city)
        },
        () => fetchWeather(city)
      )
    } else {
      fetchWeather(city)
    }
  }, [])

  async function fetchWeather(c: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/weather?city=${c}`)
      if (res.ok) setWeather(await res.json())
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex h-24 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{weather.city}</p>
            <p className="text-3xl font-bold">{weather.temperature}°C</p>
            <p className="text-sm capitalize text-muted-foreground">{weather.description}</p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
            width={64}
            height={64}
          />
        </div>
        <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            {weather.humidity}%
          </span>
          <span className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            {weather.windSpeed} m/s
          </span>
          <span className="flex items-center gap-1">
            <Cloud className="h-3 w-3" />
            Feels {weather.feelsLike}°C
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
