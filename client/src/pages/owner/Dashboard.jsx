import { useAppContext } from '../../context/AppContext'
import { assets, dashboardDummyData } from '../../assets/assets.js'

export default function Dashboard() {
  const { currency } = useAppContext()
  const { totalBookings, totalRevenue, bookings } = dashboardDummyData

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const statCards = [
    { label: 'Total Bookings', value: totalBookings, icon: assets.totalBookingIcon, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Total Revenue', value: `${currency}${totalRevenue}`, icon: assets.totalRevenueIcon, color: 'bg-green-50 text-green-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your hotel performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}>
              <img src={card.icon} alt="" className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="text-3xl font-extrabold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 text-lg">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Guest', 'Room', 'Dates', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map(b => (
                <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={b.user?.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-gray-900">{b.user?.username}</p>
                        <p className="text-xs text-gray-400">{b.guests} guest{b.guests > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700 font-medium">{b.room?.roomType}</td>
                  <td className="px-5 py-4 text-gray-500">
                    {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)}
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">{currency}{b.totalPrice}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      b.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {b.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
