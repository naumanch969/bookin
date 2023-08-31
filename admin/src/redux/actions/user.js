import {
    start,
    error,
    end,
    registerReducer,
    loginReducer,
    logoutReducer,
    getUsersReducer,
    getUserReducer,
    getUserStatsReducer,
    updateUserReducer,
    deleteUserReducer
} from "../reducers/user";
import * as api from '../api/index'
import Cookie from 'js-cookie'

export const register = (userData, navigate, toUser) => async (dispatch) => {
    try {
        dispatch(start())
        await api.register(userData)
        dispatch(registerReducer())
        toUser ? navigate('/auth/login') : navigate('/users')
        dispatch(end())
    } catch (err) {
        console.log(err)
        dispatch(error(err.message))
    }
}

export const login = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        dispatch(loginReducer(data.result))
        navigate('/')
        Cookie.set('profile', JSON.stringify(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}

export const logout = (navigate) => async (dispatch) => {
    try {
        dispatch(start())
        Cookie.remove('profile')
        dispatch(logoutReducer())
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}




export const getUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUsers()
        console.log('data', data)
        dispatch(getUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUser(userId)
        dispatch(getUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUserStats = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUserStats()
        dispatch(getUserStatsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateUser = (userId, userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateUser(userId, userData)
        dispatch(updateUserReducer(data.result))
        navigate('/users')
        dispatch(end())
    } catch (err) {
        console.log(err)
        dispatch(error(err.message))
    }
}
export const deleteUser = (userId, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteUser(userId)
        dispatch(deleteUserReducer(data.result))
        navigate('/users')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}