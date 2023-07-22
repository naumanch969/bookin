import { start, end, error, registerReducer } from '../reducers/user'
import * as api from '../api/index'

export const register = () => async (dispatch) => {
    try {
        dispatch(start())

        const { data } = api.register(userData)
        dispatch(registerReducer(data.result))

        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}