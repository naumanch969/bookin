import {
    start,
    error,
    end,
    registerReducer,
    loginReducer,
    getUsersReducer,
    getUserReducer,
    getUserStatsReducer,
    updateUserReducer,
    deleteUserReducer
} from "../reducers/user";
import * as api from '../api/index'
import Cookie from 'js-cookie'

export const register = (userData, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        await api.register(userData)
        dispatch(registerReducer())
        navigate('/auth/login')
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}

export const login = (userData, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.login(userData)
        dispatch(loginReducer(data.result))
        Cookie.set('profile', JSON.stringify(action.payload))
        navigate('/')
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}




export const getUsers = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getUsers()
        dispatch(getUsersReducer(data.result))
    } catch (err) {
         dispatch(error(err.message))
    }
    dispatch(end())
}
export const getUser = (userId) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getUser(userId)
        dispatch(getUserReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getUserStats = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getUserStats()
        dispatch(getUserStatsReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateUser = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateUser()
        dispatch(updateUserReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const deleteUser = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteUser()
        dispatch(deleteUserReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}