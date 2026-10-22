import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, cities } from '../assets/assets.js'

export default function HotelRegistration() {
  const { setShowHotelReg, setUser, user } = useAppContext()
  const [form, setForm] = useState({ name: '', address: '', contact: '', city: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.address || !form.city) return alert('Please fill all required fields')
    setUser({ ...user, role: 'hotelOwner' })
    setSubmitted(true)
    setTimeout(() => setShowHotelReg(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in">
        <button
          onClick={() => setShowHotelReg(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <img src={assets.closeIcon} alt="close" className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎊</div>
            <h2 className="text-2xl font-extrabold text-gray-900">Hotel Registered!</h2>
            <p className="text-gray-500 mt-2">You're now a hotel owner. Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-gray-900">Register Your Hotel</h2>
              <p className="text-gray-500 text-sm mt-1">List your property and start earning today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Hotel Name *', key: 'name', placeholder: 'e.g. Grand Palace Hotel' },
                { label: 'Address *', key: 'address', placeholder: 'e.g. 123 Main Street' },
                { label: 'Contact Number', key: 'contact', placeholder: 'e.g. +1 234 567 8900' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                <select
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-gray-50"
                >
                  <option value="">Select a city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-2"
              >
                Register Hotel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
