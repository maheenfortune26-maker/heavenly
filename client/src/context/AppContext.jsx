import { createContext, useContext, useState } from 'react'
import { roomsDummyData, userDummyData, userBookingsDummyData, dashboardDummyData } from '../assets/assets.js'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(userDummyData)
  const [rooms, setRooms] = useState(roomsDummyData)
  const [bookings, setBookings] = useState(userBookingsDummyData)
  const [currency] = useState('$')
  const [searchedCity, setSearchedCity] = useState('')
  const [showHotelReg, setShowHotelReg] = useState(false)

  const isOwner = user?.role === 'hotelOwner'
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  return (
    <AppContext.Provider value={{
      user, setUser, rooms, setRooms, bookings, setBookings,
      currency, searchedCity, setSearchedCity,
      showHotelReg, setShowHotelReg, isOwner, backendUrl
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
