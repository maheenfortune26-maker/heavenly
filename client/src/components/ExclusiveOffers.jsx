import { exclusiveOffers } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

export default function ExclusiveOffers() {
  const navigate = useNavigate()

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">Limited Time</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Exclusive Offers</h2>
            <p className="text-gray-500 mt-2">Grab our best deals before they expire</p>
          </div>
          <button onClick={() => navigate('/rooms')} className="text-indigo-600 font-semibold hover:underline text-sm flex items-center gap-1 self-start md:self-auto">
            View All Offers →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exclusiveOffers.map((offer) => (
            <div
              key={offer._id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Discount badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                {offer.priceOff}% OFF
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-bold text-lg text-gray-900">{offer.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{offer.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-red-500 font-medium bg-red-50 px-2.5 py-1 rounded-full">
                    Expires: {offer.expiryDate}
                  </span>
                  <button
                    onClick={() => navigate('/rooms')}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
