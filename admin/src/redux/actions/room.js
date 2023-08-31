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
    try {
        dispatch(start())
        const { data } = await api.getRooms()
        dispatch(getRoomsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getRoom = (roomId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getRoom(roomId)
        dispatch(getRoomReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createRoom = (hotelId, roomData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createRoom(hotelId, roomData)
        dispatch(createRoomReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateRoom = (roomId, roomData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateRoom(roomId, roomData)
        dispatch(updateRoomReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateAvailabilty = (roomId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateAvailabilty(roomId)
        dispatch(updateAvailabiltyReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteRoom = () => async (roomId, hotelId) => {
    try {
        dispatch(start())
        const { data } = await api.deleteRoom(roomId, hotelId)
        dispatch(deleteRoomReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}