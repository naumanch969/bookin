import {
    start,
    error,
    end,
    getRoomsReducer,
    getRoomReducer,
    createRoomReducer,
    updateRoomReducer,
    updateAvailabiltyReducer,
    deleteRoomReducer,
} from "../reducers/room";
import * as api from '../api/index'

export const getRooms = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getRooms()
        dispatch(getRoomsReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getRoom = (roomId) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getRoom(roomId)
        dispatch(getRoomReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const createRoom = (hotelId,roomData) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.createRoom(hotelId,roomData)
        dispatch(createRoomReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateRoom = (roomId, roomData) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateRoom(roomId, roomData)
        dispatch(updateRoomReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateAvailabilty = (roomId) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateAvailabilty(roomId)
        dispatch(updateAvailabiltyReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const deleteRoom = () => async (roomId,hotelId) => {
    dispatch(start())
    try {
        const { data } = await api.deleteRoom(roomId, hotelId)
        dispatch(deleteRoomReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}