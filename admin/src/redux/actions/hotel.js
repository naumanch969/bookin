import {
    start,
    error,
    end,
    getHotelsReducer,
    countHotelsByCityNameReducer,
    countHotelsByTypeReducer,
    getHotelReducer,
    getHotelRoomsReducer,
    createHotelReducer,
    updateHotelReducer,
    deleteHotelReducer,
} from "../reducers/hotel";
import * as api from '../api/index'


export const getHotels = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getHotels()
        dispatch(getHotelsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const countHotelsByCityName = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.countHotelsByCityName()
        dispatch(countHotelsByCityNameReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const countHotelsByType = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.countHotelsByType()
        dispatch(countHotelsByTypeReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getHotel = (hotelId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getHotel(hotelId)
        dispatch(getHotelReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getHotelRooms = (hotelId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getHotelRooms(hotelId)
        dispatch(getHotelRoomsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createHotel = (hotelData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createHotel(hotelData)
        dispatch(createHotelReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateHotel = (hotelId, hotelData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateHotel(hotelId, hotelData)
        dispatch(updateHotelReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteHotel = (hotelId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteHotel(hotelId)
        dispatch(deleteHotelReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}