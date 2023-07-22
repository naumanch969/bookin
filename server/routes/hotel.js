import express from 'express'
import { getHotel,getHotelRooms, getHotels, updateHotel, deleteHotel, createHotel, getHotelsByCityName, getHotelsByType } from '../controllers/hotel.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.get('/all', getHotels)
router.get('/count/city', getHotelsByCityName)
router.get('/count/type', getHotelsByType)
router.get('/get/:hotelId', getHotel)
router.get('/room/:hotelId', getHotelRooms)

router.post('/create', verifyToken, verifyAdmin, createHotel)
router.put('/update/:hotelId', verifyToken, verifyUser, updateHotel)
router.delete('/delete/:hotelId', verifyToken, verifyUser, deleteHotel)

export default router