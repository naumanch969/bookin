import Hotel from '../models/hotel.js'
import Room from '../models/room.js'
import { error } from '../utils/error.js'

export const getHotels = async (req, res, next) => {
    try {
        const { min, max, limit, ...others } = req.query

        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max | 9999999 } }).limit(limit)

        res.status(200).json({ result: hotels, success: true, message: 'Hotels fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getHotels`))
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const { hotelId } = req.params

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) return next(error(400, 'Hotel not exist'))

        const result = await Promise.all(hotel.rooms.map(roomId => {
            return Room.findById(roomId)
        }))

        res.status(200).json({ result, success: true, message: 'Hotels fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getHotelRooms`))
    }
}
export const countHotelsByCityName = async (req, res, next) => {
    try {
        const cities = req.query.cities.split(',');

        const result = await Promise.all(cities.map(async city => {
            const count = await Hotel.countDocuments({ city });
            return { city, count };
        }));

        res.status(200).json({ result, success: true, message: 'Hotels fetched successfully' });

    } catch (err) {
        next(error(500, `${err.message} - countHotelsByCityName`));
    }
};


export const countHotelsByType = async (req, res, next) => {
    try {
        const hotels = await Hotel.countDocuments({ type: 'hotel' })
        const apartments = await Hotel.countDocuments({ type: 'apartment' })
        const resorts = await Hotel.countDocuments({ type: 'resort' })
        const villas = await Hotel.countDocuments({ type: 'villa' })
        const cabins = await Hotel.countDocuments({ type: 'cabin' })

        const result = [
            { type: "hotels", count: hotels },
            { type: "apartments", count: apartments },
            { type: "resorts", count: resorts },
            { type: "villas", count: villas },
            { type: "cabins", count: cabins }
        ]

        res.status(200).json({ result, success: true, message: 'Hotels fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getHotels`))
    }
}

export const getHotel = async (req, res, next) => {
    try {

        const { hotelId } = req.params

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) return next(error(400, 'hotel not exist'))

        const { password, ...result } = hotel._doc
        res.status(200).json({ result, success: true, message: 'Hotel fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getHotel`))
    }
}


export const createHotel = async (req, res, next) => {
    try {

        const result = await Hotel.create(req.body)
        res.status(200).json({ result, success: true, message: 'Hotel created successfully' })

    } catch (err) {
        next(error(500, `${err.message} - createHotel`))
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const { hotelId } = req.params

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) return next(error(400, 'hotel not exist'))

        const result = await Hotel.findByIdAndUpdate(hotelId, { $set: req.body }, { new: true })
        res.status(200).json({ result, success: true, message: 'Hotel updated successfully' })

    } catch (err) {
        next(error(500, `${err.message} - upodateHotel`))
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const { hotelId } = req.params

        const result = await Hotel.findByIdAndDelete(hotelId)
        res.status(200).json({ result, success: true, message: 'Hotel deleted successfully' })

    } catch (err) {
        next(error(500, `${err.message} - deleteHotel`))
    }
}

export const deleteCollection = async (req, res, next) => {
    try {

        const result = await Hotel.deleteMany()
        res.status(200).json({ result, success: true, message: 'Hotel collection deleted successfully' })

    } catch (err) {
        next(error(500, `${err.message} - deleteHotel`))
    }
}