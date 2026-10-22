import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import hotelRouter from './routes/hotel.js'
import roomRouter from './routes/room.js'
import bookingRouter from './routes/booking.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

app.get('/', (req, res) => res.json({ message: 'Heavenly API Running ✅' }))

// DB + Server
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Heavenly')
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('DB connection failed:', err.message)
    app.listen(PORT, () => console.log(`🚀 Server running (no DB) on port ${PORT}`))
  })
