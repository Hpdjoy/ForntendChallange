import React from 'react'

export default function WeatherDisplay({ loading, error, data }) {
  if (loading) {
    return (
      <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm animate-pulse">
              <div className="h-4 w-16 bg-white/20 rounded mb-2"></div>
              <div className="h-6 w-12 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 rounded-3xl backdrop-blur-xl bg-red-500/20 border border-red-400/30 shadow-2xl">
        <div className="flex items-center gap-4 text-red-100">
          <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="text-xl font-semibold">Unable to Load Weather</div>
            <div className="text-red-200/80 mt-1">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-12 text-center rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-white mb-2">Discover Your Weather</div>
        <div className="text-white/60">Search for any city to see detailed weather information</div>
      </div>
    )
  }

  // Calculate feels like difference
  const feelsLikeDiff = data.feelslike_c - data.temp_c
  const feelsLikeDescription = feelsLikeDiff > 2 ? "Feels warmer" : feelsLikeDiff < -2 ? "Feels cooler" : "Feels similar"

  return (
    <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 group">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={data.icon} 
              alt={data.condition} 
              className="w-24 h-24 drop-shadow-2xl filter brightness-125 group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl -z-10"></div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">{data.temp_c}°</div>
            <div className="text-white/80 text-lg capitalize">{data.condition}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-white mb-1">{data.location}</div>
          <div className="text-white/60 flex items-center justify-end gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.country}
          </div>
          <div className="text-white/60 text-sm flex items-center justify-end gap-2 mt-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {data.date} • {data.time}
          </div>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group/metric">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <div className="text-white/60 text-sm">Humidity</div>
              <div className="text-white font-semibold text-lg">{data.humidity}%</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group/metric">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-white/60 text-sm">Feels Like</div>
              <div className="text-white font-semibold text-lg">{data.feelslike_c}°</div>
              <div className="text-xs text-white/40">{feelsLikeDescription}</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group/metric">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
              </svg>
            </div>
            <div>
              <div className="text-white/60 text-sm">Wind</div>
              <div className="text-white font-semibold text-lg">{data.wind_kph} km/h</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group/metric">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <div className="text-white/60 text-sm">Precipitation</div>
              <div className="text-white font-semibold text-lg">{data.precip_mm}mm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-white/10">
        <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="text-white/60 text-sm mb-1">UV Index</div>
          <div className="text-white font-semibold">{data.uv}</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="text-white/60 text-sm mb-1">Visibility</div>
          <div className="text-white font-semibold">{data.vis_km} km</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="text-white/60 text-sm mb-1">Pressure</div>
          <div className="text-white font-semibold">{data.pressure_mb} mb</div>
        </div>
      </div>
    </div>
  )
}