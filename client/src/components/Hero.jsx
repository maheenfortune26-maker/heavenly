import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, cities } from '../assets/assets.js'
import heroImage from '../assets/heroImage.png'

export default function Hero() {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/rooms?city=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
  }

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center text-white overflow-hidden pt-28 md:pt-36 pb-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
          Find Your <span className="text-indigo-400">Dream</span><br />Hotel Today
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore thousands of handpicked luxury hotels, resorts, and boutique stays worldwide. Best prices guaranteed.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-3 text-gray-800 mx-auto max-w-4xl">
          {/* Destination */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-left">Destination</label>
            <div className="relative">
              <img src={assets.locationIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <select
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              >
                <option value="">Any City</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Check In */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-left">Check In</label>
            <div className="relative">
              <img src={assets.calenderIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-left">Check Out</label>
            <div className="relative">
              <img src={assets.calenderIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1 min-w-[110px]">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-left">Guests</label>
            <div className="relative">
              <img src={assets.guestsIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <input
                type="number"
                min="1" max="10"
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-300/50 md:self-end"
          >
            <img src={assets.searchIcon} alt="" className="w-4 h-4 invert" />
            Search
          </button>
        </form>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-10">
          {[['10K+', 'Hotels'], ['50+', 'Countries'], ['1M+', 'Happy Guests']].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{num}</p>
              <p className="text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}