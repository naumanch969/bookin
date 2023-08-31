import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        hotels: [],
        currentHotel: null,
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },
        getHotelsReducer: (state, action) => {
            state.hotels = action.payload
        },
        countHotelsByCityNameReducer: (state, action) => {

        },
        countHotelsByTypeReducer: (state, action) => {

        },
        getHotelReducer: (state, action) => {
            state.currentHotel = action.payload
        },
        getHotelRoomsReducer: (state, action) => {

        },
        createHotelReducer: (state, action) => {
            state.hotels = [...state.hotels, action.payload]
        },
        updateHotelReducer: (state, action) => {
            state.hotels = state.hotels.map(hotel => hotel = hotel._id == action.payload._id ? action.payload : hotel)
        },
        deleteHotelReducer: (state, action) => {
            state.hotels = state.hotels.filter(hotel => hotel._id != action.payload._id)
        },
    }
})

export const {
    start,
    end,
    error,
    getHotelsReducer,
    countHotelsByCityNameReducer,
    countHotelsByTypeReducer,
    getHotelReducer,
    getHotelRoomsReducer,
    createHotelReducer,
    updateHotelReducer,
    deleteHotelReducer,
} = hotelSlice.actions
export default hotelSlice.reducer