import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Not authorized' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'User not found' })
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const ownerOnly = (req, res, next) => {
  if (req.user?.role !== 'hotelOwner') return res.status(403).json({ message: 'Owner access only' })
  next()
}
