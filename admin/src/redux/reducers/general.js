import { createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../constant";

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        url: null,
        urls: [],
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },

        uploadImageReducer: (state, action) => {
            const { result, isMultiple } = action.payload
            console.log(`${baseURL}${result}`, isMultiple)
            isMultiple
                ?
                state.urls = [`${baseURL}${result}`, ...state.urls]
                :
                state.url = `${baseURL}${result}`
            console.log(state.url)
        },
        deleteImageReducer: (state) => {
            const { filename, isMultiple } = action.payload
            isMultiple
                ?
                state.urls = state.urls.filter(url => url !== `${baseURL}/uploads/${filename}`)
                :
                state.url = null
        },
    }
})

export const {
    start,
    end,
    error,
    uploadImageReducer,
    deleteImageReducer,

} = generalSlice.actions
export default generalSlice.reducer