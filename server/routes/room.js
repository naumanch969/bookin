import express from 'express'
import { getRoom, getRooms, updateAvailabilty,updateRoom, deleteRoom, createRoom } from '../controllers/room.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/all', getRooms)
router.get('/get/:roomId', getRoom)
router.post('/create/:hotelId', verifyToken, verifyAdmin, createRoom)
router.put('/update/:roomId', verifyToken, verifyAdmin, updateRoom)
router.put('/availability/:roomId', verifyToken, updateAvailabilty)
router.delete('/delete/:roomId/:hotelId', verifyToken, verifyAdmin, deleteRoom)

export default router