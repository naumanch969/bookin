import express from 'express'
import { register, login, getUser, getUsers, updateUser, deleteUser, getUserStats } from '../controllers/user.js'
import { verifyUser } from '../middleware/auth.js'//verifyToken,//verifyAdmin,

const router = express.Router()

router.post('/register', register)
router.put('/login', login)

router.get('/get/all', getUsers)//verifyToken,//verifyAdmin,
router.get('/get/single/:userId', getUser)//verifyToken,
router.get('/get/stats', getUserStats)//verifyToken,//verifyAdmin,
router.put('/update/:userId', updateUser)//verifyToken,//verifyUser,
router.delete('/delete/:userId', deleteUser)//verifyToken,//verifyUser,

export default router