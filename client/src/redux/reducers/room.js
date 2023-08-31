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
        getRooms: (state, action) => {
            state.rooms = action.payload
        },
        getRoom: (state, action) => {
            state.currentRoom = action.payload
        },
        createRoom: (state, action) => {
            state.rooms = [...state.rooms, action.payload]
        },
        updateRoom: (state, action) => {
            state.rooms = state.rooms.map(room => room = room._id == action.payload._id ? action.payload : room)
        },
        updateAvailabilty: (state, action) => {

        },
        deleteRoom: (state, action) => {
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