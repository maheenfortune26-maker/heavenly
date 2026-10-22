import express from 'express'
import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { protect, ownerOnly } from '../middleware/auth.js'

const router = express.Router()

// Add room
router.post('/', protect, ownerOnly, async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities, images } = req.body
    const hotel = await Hotel.findOne({ owner: req.user._id })
    if (!hotel) return res.status(404).json({ message: 'Register a hotel first' })
    const room = await Room.create({ hotel: hotel._id, roomType, pricePerNight, amenities, images })
    res.status(201).json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const { city, type, maxPrice } = req.query
    let rooms = await Room.find().populate({ path: 'hotel', populate: { path: 'owner', select: 'username email image' } })
    if (city) rooms = rooms.filter(r => r.hotel?.city?.toLowerCase().includes(city.toLowerCase()))
    if (type) rooms = rooms.filter(r => r.roomType === type)
    if (maxPrice) rooms = rooms.filter(r => r.pricePerNight <= Number(maxPrice))
    res.json(rooms)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get single room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate({ path: 'hotel', populate: { path: 'owner', select: 'username email image' } })
    if (!room) return res.status(404).json({ message: 'Room not found' })
    res.json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Toggle availability
router.patch('/:id/availability', protect, ownerOnly, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) return res.status(404).json({ message: 'Room not found' })
    room.isAvailable = !room.isAvailable
    await room.save()
    res.json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete room
router.delete('/:id', protect, ownerOnly, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id)
    res.json({ message: 'Room deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
