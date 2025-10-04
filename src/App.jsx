import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import Forecast from './components/Forecast'

const API_KEY = '6fc74cf82bc44773a8a171855241407'

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [background, setBackground] = useState('bg-gradient-to-br from-blue-400 to-purple-600')

  // Update background based on time and weather
  const updateBackground = (currentData) => {
    if (!currentData) return
    
    const hour = new Date().getHours()
    const isDay = hour >= 6 && hour < 18
    const condition = currentData.condition.toLowerCase()
    
    let newBackground = ''
    
    if (isDay) {
      if (condition.includes('sunny') || condition.includes('clear')) {
        newBackground = 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500'
      } else if (condition.includes('cloud')) {
        newBackground = 'bg-gradient-to-br from-blue-300 via-purple-300 to-gray-400'
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
        newBackground = 'bg-gradient-to-br from-gray-500 via-blue-400 to-purple-600'
      } else {
        newBackground = 'bg-gradient-to-br from-blue-400 to-purple-600'
      }
    } else {
      if (condition.includes('clear')) {
        newBackground = 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900'
      } else {
        newBackground = 'bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900'
      }
    }
    
    setBackground(newBackground)
  }

  // Load last searched city from localStorage
  useEffect(() => {
    const last = localStorage.getItem('lastCity')
    if (last) {
      setQuery(last)
      fetchWeather(last)
    }
  }, [])

  async function fetchWeather(location) {
    if (!location) return
    setLoading(true)
    setError('')
    setCurrent(null)
    setForecast(null)

    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=no&alerts=no`
      const res = await fetch(url)
      if (!res.ok) {
        if (res.status === 400 || res.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.')
        }
        throw new Error(`Unable to fetch weather data: ${res.status}`)
      }
      const json = await res.json()

      const loc = json.location
      const cur = json.current
      const fc = json.forecast

      const currentData = {
        location: loc.name + (loc.region ? `, ${loc.region}` : ''),
        country: loc.country,
        time: loc.localtime.split(' ')[1] ?? '',
        date: loc.localtime.split(' ')[0] ?? '',
        temp_c: cur.temp_c,
        condition: cur.condition.text,
        icon: `https:${cur.condition.icon}`,
        precip_mm: cur.precip_mm,
        humidity: cur.humidity,
        wind_kph: cur.wind_kph,
        feelslike_c: cur.feelslike_c,
        uv: cur.uv,
        vis_km: cur.vis_km,
        pressure_mb: cur.pressure_mb,
        is_day: cur.is_day
      }

      setCurrent(currentData)
      updateBackground(currentData)
      setForecast(fc.forecastday || null)

      localStorage.setItem('lastCity', location)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(text) {
    setQuery(text)
    fetchWeather(text)
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${background}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                WeatherFlow
              </h1>
              <p className="text-blue-100 text-lg font-light">
                Premium Weather Experience
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <SearchBar 
                value={query} 
                onChange={setQuery} 
                onSearch={() => handleSearch(query)} 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Main Weather Card */}
            <section className="xl:col-span-2">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 lg:p-8 hover:bg-white/15 transition-all duration-500">
                <WeatherDisplay 
                  loading={loading} 
                  error={error} 
                  data={current} 
                />
              </div>
            </section>

            {/* Forecast Sidebar */}
            <aside className="xl:col-span-1">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 lg:p-8 hover:bg-white/15 transition-all duration-500">
                <Forecast 
                  days={forecast} 
                  loading={loading}
                />
              </div>
            </aside>
          </div>

          {/* Quick Actions */}
          {!loading && current && (
            <div className="mt-6 flex justify-center">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4">
                <div className="flex gap-4 text-sm text-white/80">
                  <button 
                    onClick={() => navigator.share?.({
                      title: `Weather in ${current.location}`,
                      text: `It's ${current.temp_c}°C and ${current.condition} in ${current.location}`,
                      url: window.location.href
                    })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    Share
                  </button>
                  
                  <button 
                    onClick={() => fetchWeather(current.location)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative text-center py-6 text-white/60 text-sm">
        <p>Powered by WeatherAPI • Built with React & Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App