import express from 'express'
import { register, login, getUser, getUsers, updateUser, deleteUser, getUserStats } from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.put('/login', login)

router.get('/get-all', verifyToken, verifyAdmin, getUsers)
router.get('/get-one/:userId', verifyToken, getUser)
router.get('/get/stats', verifyToken, verifyAdmin, getUserStats)
router.put('/update/:userId', verifyToken, verifyUser, updateUser)
router.delete('/delete/:userId', verifyToken, verifyUser, deleteUser)

export default router