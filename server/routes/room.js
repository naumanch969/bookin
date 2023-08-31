import express from 'express'
import { getRoom, getRooms, updateAvailabilty, updateRoom, deleteRoom, createRoom } from '../controllers/room.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/all', getRooms)
router.get('/get/:roomId', getRoom)
router.post('/create/:hotelId', createRoom)//verifyToken, verifyAdmin
router.put('/update/:roomId', updateRoom)//verifyToken, verifyAdmin
router.put('/availability/:roomId', updateAvailabilty)//verifyToken,
router.delete('/delete/:roomId/:hotelId', deleteRoom)//verifyToken, verifyAdmin

export default router