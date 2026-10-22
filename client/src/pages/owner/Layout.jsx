import { assets } from '../../assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

export default function Layout({ children }) {
  const { user } = useAppContext()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-indigo-600">Heavenly</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { to: '/owner', icon: assets.dashboardIcon, label: 'Dashboard' },
            { to: '/owner/add-room', icon: assets.addIcon, label: 'Add Room' },
            { to: '/owner/list-rooms', icon: assets.listIcon, label: 'List Rooms' },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/owner'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <img src={icon} alt={label} className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="p-4 border-t border-gray-100 flex items-center gap-3">
            <img src={user.image} alt={user.username} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-500">Hotel Owner</p>
            </div>
          </div>
        )}
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}