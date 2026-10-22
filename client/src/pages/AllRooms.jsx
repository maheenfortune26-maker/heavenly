import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets, facilityIcons } from '../assets/assets.js'

const ROOM_TYPES = ['All', 'Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite']

export default function AllRooms() {
  const { rooms, currency } = useAppContext()
  const [searchParams] = useSearchParams()
  const cityParam = searchParams.get('city') || ''

  const [selectedType, setSelectedType] = useState('All')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = rooms.filter(r => {
      const matchCity = !cityParam || r.hotel?.city?.toLowerCase().includes(cityParam.toLowerCase())
      const matchType = selectedType === 'All' || r.roomType === selectedType
      const matchPrice = r.pricePerNight <= maxPrice
      return matchCity && matchType && matchPrice
    })
    if (sortBy === 'low') result = [...result].sort((a, b) => a.pricePerNight - b.pricePerNight)
    if (sortBy === 'high') result = [...result].sort((a, b) => b.pricePerNight - a.pricePerNight)
    return result
  }, [rooms, cityParam, selectedType, maxPrice, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {cityParam ? `Hotels in ${cityParam}` : 'All Available Rooms'}
            </h1>
            <p className="text-gray-500 mt-1">{filtered.length} rooms found</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
            >
              Filters {showFilters ? '▲' : '▼'}
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            >
              <option value="default">Sort: Recommended</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-5">Filters</h3>

              {/* Room Type */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Room Type</p>
                <div className="space-y-2">
                  {ROOM_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                        selectedType === type
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Max Price: <span className="text-indigo-600">${maxPrice}/night</span>
                </p>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$50</span><span>$1000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Room Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl font-medium">No rooms found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(room => (
                  <Link
                    to={`/rooms/${room._id}`}
                    key={room._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={room.images?.[0]}
                        alt={room.roomType}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {room.roomType}
                      </div>
                      {room.isAvailable && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Available
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-base">{room.hotel?.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <img src={assets.locationIcon} alt="" className="w-3.5 h-3.5 opacity-50" />
                        <span className="text-xs text-gray-500">{room.hotel?.city}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {room.amenities?.slice(0, 3).map(a => (
                          <span key={a} className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                            {facilityIcons[a] && <img src={facilityIcons[a]} alt="" className="w-3 h-3" />}
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-2xl font-extrabold text-gray-900">{currency}{room.pricePerNight}</span>
                          <span className="text-xs text-gray-400">/night</span>
                        </div>
                        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
