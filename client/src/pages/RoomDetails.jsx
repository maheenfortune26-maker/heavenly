import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets, facilityIcons, roomCommonData } from '../assets/assets.js'
import Footer from '../components/Footer'

export default function RoomDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { rooms, currency, user, setBookings, bookings } = useAppContext()
  const room = rooms.find(r => r._id === id)

  const [mainImg, setMainImg] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [booked, setBooked] = useState(false)

  if (!room) return (
    <div className="min-h-screen flex items-center justify-center pt-24 text-gray-500">
      <div className="text-center">
        <p className="text-2xl font-bold mb-2">Room not found</p>
        <button onClick={() => navigate('/rooms')} className="text-indigo-600 hover:underline">Browse all rooms</button>
      </div>
    </div>
  )

  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 0
  const total = nights * room.pricePerNight

  const handleBook = () => {
    if (!checkIn || !checkOut || nights < 1) return alert('Please select valid dates')
    const newBooking = {
      _id: Date.now().toString(),
      user, room, hotel: room.hotel,
      checkInDate: checkIn, checkOutDate: checkOut,
      totalPrice: total, guests,
      status: 'pending', paymentMethod: 'Pay At Hotel', isPaid: false,
      createdAt: new Date().toISOString()
    }
    setBookings([newBooking, ...bookings])
    setBooked(true)
    setTimeout(() => navigate('/my-bookings'), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/rooms')} className="hover:text-indigo-600">Rooms</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{room.roomType}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={room.images[mainImg]}
                  alt={room.roomType}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <div className="p-4 flex gap-3 overflow-x-auto">
                {room.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImg(i)}
                    className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === mainImg ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wide">
                    {room.roomType}
                  </span>
                  <h1 className="text-3xl font-extrabold text-gray-900 mt-3">{room.hotel?.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <img src={assets.locationFilledIcon} alt="" className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-500 text-sm">{room.hotel?.address}, {room.hotel?.city}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-extrabold text-indigo-600">{currency}{room.pricePerNight}</p>
                  <p className="text-gray-400 text-sm">/night</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map(a => (
                    <span key={a} className="flex items-center gap-1.5 text-sm bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl">
                      {facilityIcons[a] && <img src={facilityIcons[a]} alt="" className="w-4 h-4" />}
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Why You'll Love It</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomCommonData.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 bg-indigo-50 rounded-xl">
                    <img src={item.icon} alt="" className="w-6 h-6 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Hosted by</h3>
              <div className="flex items-center gap-4">
                <img
                  src={room.hotel?.owner?.image || assets.userIcon}
                  alt={room.hotel?.owner?.username}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-200"
                />
                <div>
                  <p className="font-bold text-gray-900">{room.hotel?.owner?.username}</p>
                  <p className="text-sm text-gray-500">{room.hotel?.owner?.email}</p>
                  <p className="text-xs text-indigo-600 font-medium mt-1">{room.hotel?.contact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-extrabold text-gray-900 mb-5">Reserve This Room</h2>

              {booked ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">🎉</div>
                  <p className="text-green-600 font-bold text-lg">Booking Confirmed!</p>
                  <p className="text-gray-500 text-sm mt-1">Redirecting to My Bookings...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Check In</label>
                      <input
                        type="date"
                        value={checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setCheckIn(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Check Out</label>
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Guests</label>
                      <input
                        type="number"
                        min="1" max="10"
                        value={guests}
                        onChange={e => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  {nights > 0 && (
                    <div className="mt-5 p-4 bg-indigo-50 rounded-xl space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>{currency}{room.pricePerNight} × {nights} nights</span>
                        <span>{currency}{total}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Taxes & fees</span>
                        <span>{currency}{Math.round(total * 0.1)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-indigo-200">
                        <span>Total</span>
                        <span className="text-indigo-600">{currency}{total + Math.round(total * 0.1)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleBook}
                    className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-300/50 text-sm"
                  >
                    Book Now
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-3">Free cancellation · No hidden fees</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
