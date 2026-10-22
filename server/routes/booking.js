import express from 'express'
import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import { protect } from '../middleware/auth.js'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

const sendConfirmationEmail = async (booking, user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    await transporter.sendMail({
      from: `"Heavenly" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: '✅ Booking Confirmed — Heavenly',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#f9fafb;padding:32px;border-radius:16px">
          <h2 style="color:#4F46E5;margin-bottom:8px">Booking Confirmed! 🎉</h2>
          <p style="color:#6b7280">Hi ${user.username}, your booking is confirmed.</p>
          <div style="background:#fff;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #e5e7eb">
            <p><strong>Room:</strong> ${booking.room?.roomType}</p>
            <p><strong>Check-in:</strong> ${new Date(booking.checkInDate).toDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(booking.checkOutDate).toDateString()}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Total:</strong> $${booking.totalPrice}</p>
          </div>
          <p style="color:#9ca3af;font-size:12px">Thank you for choosing Heavenly!</p>
        </div>`,
    })
  } catch (e) {
    console.log('Email error (non-fatal):', e.message)
  }
}

// Check availability
router.post('/check-availability', async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body
    const conflicts = await Booking.find({
      room: roomId,
      status: { $ne: 'cancelled' },
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } }
      ]
    })
    res.json({ available: conflicts.length === 0 })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create booking
router.post('/', protect, async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests, paymentMethod } = req.body
    const room = await Room.findById(roomId).populate('hotel')
    if (!room) return res.status(404).json({ message: 'Room not found' })

    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / 86400000)
    if (nights < 1) return res.status(400).json({ message: 'Invalid dates' })

    const totalPrice = nights * room.pricePerNight
    const booking = await Booking.create({
      user: req.user._id,
      room: roomId,
      hotel: room.hotel._id,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      paymentMethod: paymentMethod || 'Pay At Hotel',
    })

    await sendConfirmationEmail(
      { ...booking._doc, room },
      req.user
    )

    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get user bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({ path: 'room', populate: { path: 'hotel' } })
      .populate('hotel')
      .sort('-createdAt')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get owner bookings (dashboard)
router.get('/owner', protect, async (req, res) => {
  try {
    const Hotel = (await import('../models/Hotel.js')).default
    const hotel = await Hotel.findOne({ owner: req.user._id })
    if (!hotel) return res.json([])
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate('user', 'username email image')
      .populate('room', 'roomType pricePerNight images')
      .sort('-createdAt')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create Stripe session
router.post('/stripe-session', protect, async (req, res) => {
  try {
    const { bookingId } = req.body
    const booking = await Booking.findById(bookingId).populate('room').populate('hotel')
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${booking.room.roomType} — ${booking.hotel.name}` },
          unit_amount: Math.round(booking.totalPrice * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/my-bookings?success=1`,
      cancel_url: `${process.env.CLIENT_URL}/my-bookings?cancelled=1`,
      metadata: { bookingId: bookingId.toString() },
    })

    await Booking.findByIdAndUpdate(bookingId, { stripeSessionId: session.id })
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return res.status(400).send('Webhook Error')
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    await Booking.findOneAndUpdate(
      { stripeSessionId: session.id },
      { isPaid: true, paymentMethod: 'Stripe', status: 'confirmed' }
    )
  }
  res.json({ received: true })
})

// Cancel booking
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'cancelled' },
      { new: true }
    )
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
