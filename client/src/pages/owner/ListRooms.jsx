import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets.js'

export default function ListRooms() {
  const { rooms, setRooms, currency } = useAppContext()

  const toggleAvailability = (id) => {
    setRooms(prev =>
      prev.map(r => r._id === id ? { ...r, isAvailable: !r.isAvailable } : r)
    )
  }

  const deleteRoom = (id) => {
    if (confirm('Delete this room?')) setRooms(prev => prev.filter(r => r._id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Listed Rooms</h1>
          <p className="text-gray-500 mt-1">{rooms.length} rooms total</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {['Room', 'Type', 'Price', 'Amenities', 'Available', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rooms.map(room => (
                <tr key={room._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={room.images?.[0]}
                        alt=""
                        className="w-16 h-12 rounded-xl object-cover shrink-0"
                      />
                      <p className="font-semibold text-gray-900 max-w-[140px] truncate">
                        {room.hotel?.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {room.roomType}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">{currency}{room.pricePerNight}/night</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {room.amenities?.slice(0, 2).map(a => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                      ))}
                      {room.amenities?.length > 2 && (
                        <span className="text-xs text-gray-400">+{room.amenities.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleAvailability(room._id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${room.isAvailable ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${room.isAvailable ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rooms.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl font-medium">No rooms listed yet</p>
            <p className="text-sm mt-1">Go to Add Room to list your first room</p>
          </div>
        )}
      </div>
    </div>
  )
}
