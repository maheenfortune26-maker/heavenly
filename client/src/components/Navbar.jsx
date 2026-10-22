import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isOwner, setShowHotelReg } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`text-xl font-bold ${scrolled ? 'text-indigo-600' : 'text-white'}`}>Heavenly</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Rooms', 'About'].map(link => (
            <Link
              key={link}
              to={link === 'Home' ? '/' : link === 'Rooms' ? '/rooms' : '#'}
              className={`font-medium text-sm transition-colors hover:text-indigo-500 ${scrolled ? 'text-gray-700' : 'text-white/90'}`}
            >
              {link}
            </Link>
          ))}
          {isOwner && (
            <Link to="/owner" className={`font-medium text-sm transition-colors hover:text-indigo-500 ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!isOwner && (
            <button
              onClick={() => setShowHotelReg(true)}
              className="text-sm font-medium px-4 py-2 rounded-full border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
            >
              List Your Hotel
            </button>
          )}
          <Link
            to="/my-bookings"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
          >
            My Bookings
          </Link>
          {user && (
            <img
              src={user.image || assets.userIcon}
              alt={user.username || 'User'}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=6366f1&color=fff`
              }}
              className="w-9 h-9 rounded-full ring-2 ring-indigo-300 object-cover"
            />
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
          <img src={menuOpen ? assets.closeMenu : assets.menuIcon} alt="menu" className={`h-6 ${scrolled ? '' : 'invert'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-xl px-6 py-4 flex flex-col gap-4">
          {['Home', 'Rooms'].map(link => (
            <Link key={link} to={link === 'Home' ? '/' : '/rooms'} onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">
              {link}
            </Link>
          ))}
          {isOwner && <Link to="/owner" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Dashboard</Link>}
          <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="bg-indigo-600 text-white text-center py-2 rounded-full font-medium">
            My Bookings
          </Link>
        </div>
      )}
    </nav>
  )
}