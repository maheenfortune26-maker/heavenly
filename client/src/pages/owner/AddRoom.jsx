import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets.js'

const AMENITIES = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access']
const ROOM_TYPES = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite']

export default function AddRoom() {
  const { setRooms, rooms, user } = useAppContext()
  const [form, setForm] = useState({
    roomType: 'Double Bed',
    pricePerNight: '',
    amenities: [],
    images: [],
    isAvailable: true,
  })
  const [previews, setPreviews] = useState([])
  const [saved, setSaved] = useState(false)

  const toggleAmenity = (a) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }))
  }

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setPreviews(files.map(f => URL.createObjectURL(f)))
    setForm(f => ({ ...f, images: files }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.pricePerNight) return alert('Please enter a price')
    const newRoom = {
      _id: Date.now().toString(),
      roomType: form.roomType,
      pricePerNight: Number(form.pricePerNight),
      amenities: form.amenities,
      images: previews.length ? previews : [
        assets.roomImg1 || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'
      ],
      isAvailable: form.isAvailable,
      hotel: { name: 'My Hotel', city: 'New York', owner: user },
      createdAt: new Date().toISOString(),
    }
    setRooms([newRoom, ...rooms])
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setForm({ roomType: 'Double Bed', pricePerNight: '', amenities: [], images: [], isAvailable: true })
      setPreviews([])
    }, 2000)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Add New Room</h1>
        <p className="text-gray-500 mt-1">List a new room to start taking bookings</p>
      </div>

      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl font-medium flex items-center gap-2">
          <span>✓</span> Room added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-sm p-7">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Room Images (up to 4)</label>
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors bg-indigo-50/50">
              {previews.length > 0 ? (
                <div className="flex gap-3 flex-wrap justify-center">
                  {previews.map((p, i) => (
                    <img key={i} src={p} alt="" className="w-20 h-16 object-cover rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <img src={assets.uploadArea} alt="" className="w-12 h-12 opacity-40" />
                  <p className="text-sm text-gray-500">Click to upload room images</p>
                </div>
              )}
            </div>
            <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
          </label>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type</label>
          <select
            value={form.roomType}
            onChange={e => setForm(f => ({ ...f, roomType: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
          >
            {ROOM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price Per Night ($)</label>
          <input
            type="number"
            min="1"
            value={form.pricePerNight}
            onChange={e => setForm(f => ({ ...f, pricePerNight: e.target.value }))}
            placeholder="e.g. 299"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => toggleAmenity(a)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                  form.amenities.includes(a)
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Available for Booking</p>
            <p className="text-xs text-gray-500 mt-0.5">Toggle to enable/disable this room</p>
          </div>
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, isAvailable: !f.isAvailable }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${form.isAvailable ? 'bg-indigo-600' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isAvailable ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg"
        >
          Add Room
        </button>
      </form>
    </div>
  )
}
