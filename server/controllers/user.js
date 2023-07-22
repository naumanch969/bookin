import User from '../models/user.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { error } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body

        const isEmailExist = await User.findOne({ email })
        if (Boolean(isEmailExist)) return next(error(400, 'Email already registered'))

        const isValidEmail = validator.isEmail(email)
        if (!isValidEmail) return next(error(400, 'Invalid email'))

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ username, email, password: hashedPassword, isAdmin: email == process.env.ADMIN_EMAIL })
        res.status(200).json({ result, success: true, message: 'Registered successfully' })

    } catch (err) {
        next(error(500, `${err.message} - register `))
    }
}



export const login = async (req, res, next) => {
    try {

        const { email, password: input_password } = req.body

        const isValidEmail = validator.isEmail(email)
        if (!isValidEmail) return next(error(400, 'Invalid email'))

        const user = await User.findOne({ email })
        if (!user) return next(error(400, 'wrong email'))

        const isPasswordCorrect = bcrypt.compare(input_password, user.password)
        if (!isPasswordCorrect) return next(error(400, 'Invalid password'))

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' })

        const { password, ...result } = user._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ result: { ...result }, success: true, message: 'Logged In successfully' })

    } catch (err) {
        next(error(500, `${err.message} - login`))
    }
}



export const getUsers = async (req, res, next) => {
    try {
        const { new: new_users } = req.query

        const users = new_users
            ? await User.find().sort({ _id: -1 }).limit()
            : await User.find()
        res.status(200).json({ result: users, success: true, message: 'Users fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getUsers`))
    }
}

export const getUser = async (req, res, next) => {
    try {

        const { userId } = req.params

        const user = await User.findById(userId)
        if (!user) return next(error(400, 'user not exist'))

        const { password, ...result } = user._doc
        res.status(200).json({ result, success: true, message: 'User fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getUser`))
    }
}

export const getUserStats = async (req, res, next) => {
    try {
        const data = await User.aggregate([
            {
                $project: { month: { $month: '$createdAt' } }
            },
            {
                $group: { _id: '$month', total: { $sum: 1 } }
            }
        ])
        res.status(200).json({ result: data, success: true, message: 'Stats fetched successfully' })
    } catch (err) {
        next(error(500, `${err.message} - getUserStats`))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId)
        if (!user) return next(error(400, 'User not exist'))

        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
        const { password, ...result } = updatedUser._doc
        res.status(200).json({ result, success: true, message: 'User updated successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateUser`))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params

        await User.findByIdAndDelete(userId)
        res.status(200).json({ success: true, message: 'User deleted successfully' })

    } catch (err) {
        next(error(500, `${err.message} - deleteUser`))
    }
}