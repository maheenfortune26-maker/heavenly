import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String, default: '' },
  role: { type: String, enum: ['user', 'hotelOwner', 'admin'], default: 'user' },
}, { timestamps: true })
export default mongoose.model('User', userSchema)
