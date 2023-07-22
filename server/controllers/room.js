import Room from '../models/room.js'
import Hotel from '../models/hotel.js'
import { error } from '../utils/error.js'

export const getRooms = async (req, res, next) => {
    try {

        const rooms = await Room.find()
        res.status(200).json({ result: rooms, success: true, message: 'Rooms fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getRooms`))
    }
}

export const getRoom = async (req, res, next) => {
    try {

        const { roomId } = req.params

        const room = await Room.findById(roomId)
        if (!room) return next(error(400, 'room not exist'))

        const { password, ...result } = room._doc
        res.status(200).json({ result, success: true, message: 'Room fetched successfully' })


    } catch (err) {
        next(error(err))
    }
}


export const createRoom = async (req, res, next) => {
    try {

        const { hotelId } = req.params

        const room = await Room.create(req.body)
        // updating the hotel as well
        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } }, { new: true })

        res.status(200).json({ result: room, success: true, message: 'Room created successfully' })

    } catch (err) {
        next(error(err))
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const { roomId } = req.params

        const room = await Room.findById(roomId)
        if (!room) return next(error(400, 'room not exist'))

        const result = await Room.findByIdAndUpdate(roomId, { $set: req.body }, { new: true })
        res.status(200).json({ result, success: true, message: 'Room updated successfully' })

    } catch (err) {
        next(error(err))
    }
}

export const updateAvailabilty = async (req, res, next) => {
    try {

        await Room.updateOne({ 'roomNumber._id': req.params.roomId }, {
            $push: {
                'roomNumbers.$.unavailableDates': req.body.dates
            }
        })

        res.status(200).json({ success: false, message: 'availability set successfully' })

    } catch (err) {
        next(error(err))
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        const { roomId, hotelId } = req.params

        const room = await Room.findByIdAndDelete(roomId)
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } }, { new: true })
        res.status(200).json({ success: true, message: 'Room deleted successfully' })

    } catch (err) {
        next(error(err))
    }
}