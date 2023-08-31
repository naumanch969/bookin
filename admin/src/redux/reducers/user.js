import { createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loggedUser: Cookie.get('profile') ? JSON.parse(Cookie.get('profile')) : null,
        currentUser: null,
        isFetching: false,
        stats: [],
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false; state.error = null },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },

        registerReducer: (state) => {
            return state
        },
        loginReducer: (state, action) => {
            state.loggedUser = action.payload
        },
        logoutReducer: (state, action) => {
            state.loggedUser = null
        },
        getUsersReducer: (state, action) => {
            state.users = action.payload
        },
        getUserReducer: (state, action) => {
            console.log(action.payload)
            state.currentUser = action.payload
        },
        getUserStatsReducer: (state, action) => {
            state.stats = action.payload
        },
        updateUserReducer: (state, action) => {
            state.users = state.users.map(u => u = u._id == action.payload._id ? action.payload : u)
        },
        deleteUserReducer: (state, action) => {
            state.users = state.users.filter(u => u._id != action.payload._id)

        },
    }
})

export const {
    start,
    end,
    error,
    registerReducer,
    loginReducer,
    logoutReducer,
    getUsersReducer,
    getUserReducer,
    getUserStatsReducer,
    updateUserReducer,
    deleteUserReducer,
} = userSlice.actions
export default userSlice.reducer