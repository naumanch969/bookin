import { Schema, model } from "mongoose";


const hotelSchema = Schema({
    name: { type: String, required: true },
    rooms: { type: [String], default: [] },
    city: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    distance: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    cheapestPrice: { type: String },
    featured: { type: Boolean, default: false },
    images: { type: [String] },
}, { timestamps: true })


const hotelModel = model('Hotel', hotelSchema)
export default hotelModel