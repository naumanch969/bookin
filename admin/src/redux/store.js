import { configureStore, combineReducers } from '@reduxjs/toolkit'

import userReducer from './reducers/user'
import hotelReducer from './reducers/hotel'
import roomReducer from './reducers/room'

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
    hotel: hotelReducer
})

export const store = configureStore({
    reducer: rootReducer
})