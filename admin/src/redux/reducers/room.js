import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
        currentRoom: null,
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false; },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },
        getRoomsReducer: (state, action) => {
            state.rooms = action.payload
        },
        getRoomReducer: (state, action) => {
            state.currentRoom = action.payload
        },
        createRoomReducer: (state, action) => {
            state.rooms = [...state.rooms, action.payload]
        },
        updateRoomReducer: (state, action) => {
            state.rooms = state.rooms.map(room => room = room._id == action.payload._id ? action.payload : room)
        },
        updateAvailabiltyReducer: (state, action) => {

        },
        deleteRoomReducer: (state, action) => {
            state.rooms = state.rooms.filter(room => room._id != action.payload._id)
        },
    }
})
export const {
    start,
    end,
    error,
    getRoomsReducer,
    getRoomReducer,
    createRoomReducer,
    updateRoomReducer,
    updateAvailabiltyReducer,
    deleteRoomReducer,
} = roomSlice.actions
export default roomSlice.reducer