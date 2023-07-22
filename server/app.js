import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"

import userRoutes from './routes/user.js'
import hotelRoutes from './routes/hotel.js'
import roomRoutes from './routes/room.js'

dotenv.config()
const app = express()
const CONNECTION_URL = process.env.ATLAS_URL
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/user', userRoutes)
app.use('/hotel', hotelRoutes)
app.use('/room', roomRoutes)

// error handler middleware
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'
    return res.status(500).json({ message, status, success: false, stack: err.stack })
})



mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('listening at port', PORT)))
    .catch((err) => console.log('error in connnecting with MongoDB = \n', err))