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


export const getHotels = (query) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getHotels(query)
        dispatch(getHotelsReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const countHotelsByCityName = (cities) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.countHotelsByCityName(cities)
        dispatch(countHotelsByCityNameReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const countHotelsByType = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.countHotelsByType()
        dispatch(countHotelsByTypeReducer(data.result))
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