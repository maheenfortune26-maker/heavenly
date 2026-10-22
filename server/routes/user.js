import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' })

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })
    res.status(201).json({ token: signToken(user._id), user: { ...user._doc, password: undefined } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(400).json({ message: 'Invalid credentials' })
    res.json({ token: signToken(user._id), user: { ...user._doc, password: undefined } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get profile
router.get('/me', protect, (req, res) => res.json(req.user))

// Update role to hotelOwner
router.patch('/become-owner', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { role: 'hotelOwner' }, { new: true })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
