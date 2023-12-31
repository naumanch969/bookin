import jwt, { decode } from 'jsonwebtoken'
import { error } from '../utils/error.js'

export const verifyToken = async (req, res, next) => {
    try {
        console.log(req)
        const cookies = req.cookies
        console.log('cookies', cookies)
        const token = cookies.access_token
        console.log(token)
        if (!token) return error(403, 'Token is required')

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedData
        next()

    } catch (err) {
        next(error(err.status, `${err.message} - token verification failed `))
    }
}

export const verifyUser = async (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user?._id == req.params.userId || req.user?.isAdmin) {    // req.user._id comes from verifyToken, req.params.id comes from route
                next()
            }
            else {
                next(error(403, 'You can change only your profile - change the token'))
            }
        })
    } catch (err) {
        next(error(err.status, `${err.message} - user verification failed `))
    }
}

export const verifyAdmin = async (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user?.isAdmin) {
                next()
            }
            else {
                next(error(403, 'Only admin can access this route'))
            }
        })
    } catch (err) {
        next(error(err.status, `${err.message} - admin verification failed `))
    }
}