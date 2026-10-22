import mongoose from 'mongoose'
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  guests: { type: Number, default: 1 },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, enum: ['Stripe', 'Pay At Hotel'], default: 'Pay At Hotel' },
  isPaid: { type: Boolean, default: false },
  stripeSessionId: { type: String },
}, { timestamps: true })
export default mongoose.model('Booking', bookingSchema)
