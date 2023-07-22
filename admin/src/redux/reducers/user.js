import { createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loggedUser: Cookie.get('profile') ? JSON.parse(Cookie.get('profile')) : null,
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false; },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },

        registerReducer: (state) => {
            return state
        },
        loginReducer: (state, action) => {
            state.loggedUser = action.payload
        },
        getUsersReducer: (state, action) => {

        },
        getUserReducer: (state, action) => {

        },
        getUserStatsReducer: (state, action) => {

        },
        updateUserReducer: (state, action) => {

        },
        deleteUserReducer: (state, action) => {

        },
    }
})

export const {
    start,
    end,
    error,
    registerReducer,
    loginReducer,
    getUsersReducer,
    getUserReducer,
    getUserStatsReducer,
    updateUserReducer,
    deleteUserReducer,
} = userSlice.actions
export default userSlice.reducer