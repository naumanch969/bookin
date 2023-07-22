import {
    start,
    error,
    end,
    getHotelsReducer,
    getHotelsByCityNameReducer,
    getHotelsByTypeReducer,
    getHotelReducer,
    getHotelRoomsReducer,
    createHotelReducer,
    updateHotelReducer,
    deleteHotelReducer,
} from "../reducers/hotel";
import * as api from '../api/index'


export const getHotels = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getHotels()
        dispatch(getHotelsReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getHotelsByCityName = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getHotelsByCityName()
        dispatch(getHotelsByCityNameReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getHotelsByType = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getHotelsByType()
        dispatch(getHotelsByTypeReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getHotel = (hotelId) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getHotel(hotelId)
        dispatch(getHotelReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getHotelRooms = (hotelId) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getHotelRooms(hotelId)
        dispatch(getHotelRoomsReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const createHotel = (hotelData) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.createHotel(hotelData)
        dispatch(createHotelReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateHotel = (hotelId, hotelData) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateHotel(hotelId, hotelData)
        dispatch(updateHotelReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const deleteHotel = (hotelId) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteHotel(hotelId)
        dispatch(deleteHotelReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}