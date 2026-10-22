import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

export default function MyBookings() {
  const { bookings, setBookings, currency } = useAppContext()
  const navigate = useNavigate()

  const handlePay = (id) => {
    setBookings(prev =>
      prev.map(b => b._id === id ? { ...b, isPaid: true, paymentMethod: 'Stripe' } : b)
    )
  }

  const handleCancel = (id) => {
    setBookings(prev => prev.filter(b => b._id !== id))
  }

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

  const nights = (b) => {
    if (!b.checkInDate || !b.checkOutDate) return 1
    return Math.max(1, Math.ceil((new Date(b.checkOutDate) - new Date(b.checkInDate)) / 86400000))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-1">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <p className="text-4xl mb-4">🏨</p>
            <p className="text-xl font-bold text-gray-900 mb-2">No bookings yet</p>
            <p className="text-gray-500 mb-6">Start exploring and book your dream stay</p>
            <button onClick={() => navigate('/rooms')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Browse Rooms
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b._id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Room Image */}
                  <div className="md:w-52 md:shrink-0 h-44 md:h-auto overflow-hidden">
                    <img
                      src={b.room?.images?.[0]}
                      alt={b.room?.roomType}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                            {b.room?.roomType}
                          </span>
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            b.isPaid
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {b.isPaid ? '✓ Paid' : 'Unpaid'}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-gray-900 text-lg">{b.hotel?.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <img src={assets.locationIcon} alt="" className="w-3.5 h-3.5 opacity-40" />
                          <span className="text-xs text-gray-500">{b.hotel?.city}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-extrabold text-indigo-600">{currency}{b.totalPrice}</p>
                        <p className="text-xs text-gray-400">{nights(b)} night{nights(b) > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <img src={assets.calenderIcon} alt="" className="w-4 h-4 opacity-50" />
                        <span>Check-in: <strong>{formatDate(b.checkInDate)}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img src={assets.calenderIcon} alt="" className="w-4 h-4 opacity-50" />
                        <span>Check-out: <strong>{formatDate(b.checkOutDate)}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img src={assets.guestsIcon} alt="" className="w-4 h-4 opacity-50" />
                        <span>{b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        Via: {b.paymentMethod} · Booked {formatDate(b.createdAt)}
                      </span>
                      <div className="flex gap-2">
                        {!b.isPaid && (
                          <button
                            onClick={() => handlePay(b._id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                          >
                            Pay Now
                          </button>
                        )}
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
