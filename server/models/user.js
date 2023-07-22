import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    country: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel