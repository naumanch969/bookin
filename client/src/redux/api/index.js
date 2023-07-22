import Cookie from 'js-cookie'
import axios from 'axios'


const API = axios.create({ baseURL })
API.interceptors.request.use((req) => {
    const profile = Cookie.get('profile')
    if (profile) {
        const { token } = JSON.parse(profile)
        req.headers.authtoken = token
        return req
    }
})

// user
export const register = (userData) => API.post('/user/register', userData)