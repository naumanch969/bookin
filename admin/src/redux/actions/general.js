import {
    start,
    error,
    end,
    uploadImageReducer,
    deleteImageReducer,

} from "../reducers/general";
import * as api from '../api/index'
import { baseURL } from "../../constant";


export const uploadImage = (formData, isMultiple) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.uploadImage(formData)
        dispatch(uploadImageReducer({ result: data.result, isMultiple }))
        dispatch(end())
    } catch (err) {
        console.log(err)
        dispatch(error(err.message))
    }
}


export const deleteImage = (filename, isMultiple) => async (dispatch) => {
    try {
        dispatch(start())
        const { } = await api.deleteImage(filename)
        dispatch(deleteImageReducer({ isMultiple, filename }))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}