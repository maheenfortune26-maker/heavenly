import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets.js'

const destinations = [
  { city: 'Dubai', country: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', hotels: 240 },
  { city: 'Singapore', country: 'Singapore', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600', hotels: 180 },
  { city: 'New York', country: 'USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', hotels: 320 },
  { city: 'London', country: 'UK', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600', hotels: 290 },
]

export default function FeaturedDestinations() {
  const navigate = useNavigate()
  const { setSearchedCity } = useAppContext()

  const handleClick = (city) => {
    setSearchedCity(city)
    navigate(`/rooms?city=${city}`)
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">Explore The World</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Featured Destinations</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Handpicked destinations with world-class hotels and unforgettable experiences</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <button
              key={dest.city}
              onClick={() => handleClick(dest.city)}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={dest.img}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <p className="text-white font-bold text-xl leading-none">{dest.city}</p>
                <p className="text-white/70 text-sm mt-1">{dest.hotels} Hotels</p>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                {dest.country}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
