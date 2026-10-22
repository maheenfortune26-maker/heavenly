import express from 'express'
import Hotel from '../models/Hotel.js'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Register hotel
router.post('/register', protect, async (req, res) => {
  try {
    const { name, address, contact, city } = req.body
    if (!name || !address || !city) return res.status(400).json({ message: 'Name, address and city required' })
    const hotel = await Hotel.create({ name, address, contact, city, owner: req.user._id })
    await User.findByIdAndUpdate(req.user._id, { role: 'hotelOwner' })
    res.status(201).json(hotel)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const { city } = req.query
    const filter = city ? { city: new RegExp(city, 'i') } : {}
    const hotels = await Hotel.find(filter).populate('owner', 'username email image')
    res.json(hotels)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get single hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('owner', 'username email image')
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' })
    res.json(hotel)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
