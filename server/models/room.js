import { Schema, model } from "mongoose";


const roomSchema = Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    capacity: { type: Number },
    roomNumbers: { type: [{ number: Number, unavailableDates: [Date] }] },
}, { timestamps: true })

const roomModel = model('Room', roomSchema)
export default roomModel