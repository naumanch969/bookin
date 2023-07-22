import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: null,
        loggedUser: null,
        users: []
    },
    reducers: {
        start: (state) => {
            state.isFetching = true
            state.error = null
        },
        end: (state) => {
            state.isFetching = false
            state.error = null
        },
        error: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        registerReducer: (state) => {
            return state
        }
    }
})

export const { start, end, error, registerReducer } = userSlice.actions
export default userSlice.reducer