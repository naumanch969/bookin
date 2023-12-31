import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    country: { type: String },
    city: { type: String },
    phone: { type: Number },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel