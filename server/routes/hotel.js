import express from 'express'
import { getHotel, getHotelRooms, getHotels, updateHotel, deleteHotel, createHotel, countHotelsByCityName, countHotelsByType, deleteCollection } from '../controllers/hotel.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/all', getHotels)//verifyToken,
router.get('/get/sinle/:hotelId', getHotel)
router.get('/count/city', countHotelsByCityName)
router.get('/count/type', countHotelsByType)
router.get('/room/:hotelId', getHotelRooms)

router.post('/create', createHotel)//verifyToken, verifyAdmin,
router.put('/update/:hotelId', updateHotel)//verifyToken, verifyUser,
router.delete('/delete/:hotelId', deleteHotel)//verifyToken, verifyUser,
router.delete('/delete-collection', deleteCollection)//verifyToken, verifyUser,

export default router