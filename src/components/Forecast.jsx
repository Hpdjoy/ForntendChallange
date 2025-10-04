import React from 'react'

function DayCard({ day, isToday }) {
  const date = new Date(day.date)
  const icon = `https:${day.day.condition.icon}`
  const text = day.day.condition.text
  const max = Math.round(day.day.maxtemp_c)
  const min = Math.round(day.day.mintemp_c)
  
  // Format date to show day name and short date
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  
  // Weather metrics
  const precip = day.day.daily_chance_of_rain
  const humidity = day.day.avghumidity
  const wind = day.day.maxwind_kph

  return (
    <div className={`
      group p-4 rounded-2xl backdrop-blur-sm border border-white/10 
      bg-gradient-to-br from-white/10 to-white/5
      hover:from-white/15 hover:to-white/10 hover:border-white/20
      transition-all duration-500 ease-out cursor-pointer
      hover:scale-105 hover:shadow-2xl
      ${isToday ? 'ring-2 ring-yellow-400/50 bg-gradient-to-br from-yellow-400/20 to-orange-400/10' : ''}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-sm font-semibold text-white/90">{dayName}</div>
            <div className="text-xs text-white/60">{monthDay}</div>
          </div>
          {isToday && (
            <span className="px-2 py-1 text-xs bg-yellow-400/20 text-yellow-300 rounded-full border border-yellow-400/30">
              Today
            </span>
          )}
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{max}°</span>
            <span className="text-sm text-white/60">{min}°</span>
          </div>
        </div>
      </div>

      {/* Weather Icon and Condition */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={icon} 
              alt={text} 
              className="w-12 h-12 drop-shadow-lg filter brightness-125"
            />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
          </div>
          <div className="text-sm text-white/80 font-medium capitalize max-w-[100px] leading-tight">
            {text}
          </div>
        </div>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm">
          <div className="text-white/60 mb-1">Rain</div>
          <div className="text-white font-semibold flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 13h2v7H8zm-4 0h2v7H4zm8 0h2v7h-2zm4 0h2v7h-2zm-4-8h2v4h-2zm4 0h2v4h-2zm-8 0h2v4H8zm-4 0h2v4H4z"/>
            </svg>
            {precip}%
          </div>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm">
          <div className="text-white/60 mb-1">Humid</div>
          <div className="text-white font-semibold flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
            </svg>
            {humidity}%
          </div>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm">
          <div className="text-white/60 mb-1">Wind</div>
          <div className="text-white font-semibold flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 10.5c-.5-2-2-3.5-4-3.5-1.1 0-2.1.5-2.8 1.2-.7-.7-1.7-1.2-2.8-1.2-2 0-3.5 1.5-4 3.5-.3 1.3-.1 2.6.6 3.7-.7 1.1-.9 2.4-.6 3.7.5 2 2 3.5 4 3.5 1.1 0 2.1-.5 2.8-1.2.7.7 1.7 1.2 2.8 1.2 2 0 3.5-1.5 4-3.5.3-1.3.1-2.6-.6-3.7.7-1.1.9-2.4.6-3.7zM15 19c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM9 16c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
            </svg>
            {wind}km/h
          </div>
        </div>
      </div>

      {/* Temperature Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>Min</span>
          <span>Max</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full transition-all duration-1000"
            style={{ 
              width: `${((max - min) / 30) * 100}%`,
              marginLeft: `${((min + 10) / 40) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function Forecast({ days, loading }) {
  if (loading) {
    return (
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          3-Day Forecast
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-white/10 rounded"></div>
                    <div className="h-3 w-16 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-white/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!days || days.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-white/60 mb-2">No forecast data available</div>
        <div className="text-sm text-white/40">Search for a city to see the forecast</div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="p-2">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        3-Day Forecast
      </h3>
      
      <div className="space-y-3">
        {days.map((day, index) => (
          <DayCard 
            key={day.date} 
            day={day} 
            isToday={day.date === today}
          />
        ))}
      </div>

      {/* Forecast Summary */}
      <div className="mt-6 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="text-sm text-white/80 mb-2">Forecast Summary</div>
        <div className="text-xs text-white/60 leading-relaxed">
          {days[0].day.condition.text} continuing through the week with temperatures ranging from {Math.round(days[0].day.mintemp_c)}° to {Math.round(days[0].day.maxtemp_c)}°.
        </div>
      </div>
    </div>
  )
}