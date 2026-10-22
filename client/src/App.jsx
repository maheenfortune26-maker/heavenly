import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelRegistration from './components/HotelRegistration'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddRoom from './pages/owner/AddRoom'
import ListRooms from './pages/owner/ListRooms'
import { useAppContext } from './context/AppContext'

export default function App() {
  const location = useLocation()
  const { showHotelReg } = useAppContext()
  const isOwnerRoute = location.pathname.startsWith('/owner')

  return (
    <div className="min-h-screen">
      {!isOwnerRoute && <Navbar />}
      {showHotelReg && <HotelRegistration />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-rooms" element={<ListRooms />} />
        </Route>
      </Routes>
    </div>
  )
}
