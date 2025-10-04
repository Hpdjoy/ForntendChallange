import React, { useState, useRef, useEffect } from 'react';

let recentSearchedCities = [];

export default function SearchBar({ value = '', onChange, onSearch }) {
      const [input, setInput] = useState(value || '')
      const [isFocused, setIsFocused] = useState(false)
      const [showSuggestions, setShowSuggestions] = useState(false)
      const inputRef = useRef(null)
      const containerRef = useRef(null)



      // Keep internal input in sync when parent value changes
      useEffect(() => {
            setInput(value || '')
      }, [value])

      const handleFocus = () => {
            setIsFocused(true)
            setShowSuggestions(true)
      }

      const handleBlur = () => {
            setIsFocused(false)
            // Delay hiding suggestions to allow clicking on them
      }

      const clearInput = () => {
            setShowSuggestions(true)
            setInput('')
            onChange?.('')
            inputRef.current?.focus()
      }

      const performSearch = (term) => {
            onChange?.(term)
            onSearch?.(term)
            setShowSuggestions(false)
      }

      const handleSubmit = (e) => {
            e.preventDefault()
            performSearch(input)
            recentSearchedCities.push(input)
      }

      const handleSuggestionClick = (city) => {
            setInput(city)
            handleSubmit(city)
            inputRef.current?.blur()
      }
      const handleClearRecentSearches = () => {
            recentSearchedCities = [];
      }
      return (
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" autoComplete="off">
                  <div
                        ref={containerRef}
                        className={`
          relative flex w-full transform transition-all duration-700
          ${isFocused ? 'scale-105' : 'scale-100'}
        `}
                  >
                        {/* Animated Background Glow */}
                        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
          blur-xl transition-all duration-1000
          ${isFocused ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
        `}></div>

                        {/* Main Container */}
                        <div className={`
          relative flex w-full rounded-2xl overflow-hidden
          backdrop-blur-xl border transition-all duration-500
          ${isFocused
                                    ? 'bg-white/20 border-white/30 shadow-2xl'
                                    : 'bg-white/10 border-white/15 shadow-xl hover:bg-white/15 hover:border-white/20'
                              }
        `}>
                              {/* Search Icon */}
                              <div className="flex items-center pl-4 md:pl-6 pr-2 md:pr-4">
                                    <svg
                                          className={`w-5 h-5 transition-all duration-500 ${isFocused ? 'text-blue-400 scale-110' : 'text-white/60'
                                                }`}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                          />
                                    </svg>
                              </div>

                              {/* Input Field */}
                              <input
                                    ref={inputRef}
                                    id="searchinput"
                                    name="q"
                                    type="text"
                                    placeholder=""
                                    value={input}
                                    onChange={(e) => {
                                          setInput(e.target.value);
                                          onChange?.(e.target.value)
                                    }}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className="h-14 md:h-16 flex-1 bg-transparent text-white placeholder-white/60 
                     border-none outline-none text-base md:text-lg font-light pr-3 md:pr-4
                     transition-all duration-500 min-w-0
                     w-65"
                              />

                              {/* Clear Button */}
                              {input.length > 0 && (
                                    <button
                                          type="button"
                                          onClick={clearInput}
                                          className="flex items-center px-2 md:px-3 text-white/40 hover:text-white/80 
                       transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
                                          aria-label="Clear search"
                                    >
                                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                    </button>
                              )}

                              {/* Divider */}
                              <div className={`
            w-px bg-white/20 transition-all duration-500 shrink-0
            ${isFocused ? 'h-6 md:h-8 my-auto' : 'h-5 md:h-6 my-auto'}
          `}></div>

                              {/* Search Button */}
                              <button
                                    id="searchbtn"
                                    type="submit"
                                    aria-label="Search"
                                    className={`
              relative h-14 md:h-16 px-4 md:px-6 lg:px-8 text-white font-medium text-base md:text-lg 
              transition-all duration-500 overflow-hidden group flex items-center gap-2 md:gap-3 shrink-0
              ${isFocused
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                                : 'bg-gradient-to-r from-blue-500/80 to-purple-500/80'
                                          }
            `}
                              >
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] 
                          transition-transform duration-1000"></div>

                                    {/* Button Content */}
                                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 hidden sm:inline">
                                          Search
                                    </span>
                                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 sm:hidden">
                                          Go
                                    </span>

                                    {/* Animated Arrow */}
                                    <svg
                                          className={`w-4 h-4 relative z-10 transition-all duration-500 ${isFocused ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                                                } group-hover:translate-x-1 hidden sm:block`}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                    >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                              </button>
                        </div>

                        {/* Floating Label Animation */}
                        <label
                              htmlFor="searchinput"
                              className={`
            absolute left-12 md:left-14 text-white/60 font-light transition-all duration-500 cursor-text
            pointer-events-none
            ${isFocused || input.length > 0
                                          ? 'top-1 text-xs opacity-70 translate-y-0'
                                          : 'top-1/2 text-base md:text-lg opacity-100 -translate-y-1/2'
                                    }
          `}
                        >
                              {isFocused || input.length > 0 ? 'Search destination...' : 'Discover your next destination...'}
                        </label>

                        {/* Animated Border */}
                        <div className={`
          absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-700
          ${isFocused
                                    ? 'border-white/40 scale-105'
                                    : 'border-transparent scale-100'
                              }
        `}></div>
                  </div>

                  {/* Suggestions Dropdown */}
                  {showSuggestions && recentSearchedCities.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 rounded-2xl backdrop-blur-xl bg-white/10 
                      border border-white/20 shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                              <div className="flex items-center justify-between p-3 border-b border-white/10">
                                    <div className="flex text-white/60 text-sm font-medium px-2"> Recent Searched Cities</div>
                                    <button onClick={handleClearRecentSearches} className="text-white/60 text-sm">Clear all</button>
                              </div>
                              {recentSearchedCities.map((city) => (
                                    <button
                                          key={city}
                                          type="button"
                                          onClick={() => handleSuggestionClick(city)}
                                          className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 
                       transition-colors duration-200 border-b border-white/5 last:border-b-0
                       flex items-center gap-3"
                                    >
                                          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                          {city}
                                    </button>
                              ))}
                        </div>
                  )}
            </form>
      );
}