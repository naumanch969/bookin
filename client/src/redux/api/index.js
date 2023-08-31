import axios from 'axios'
import { baseURL } from '../../constant.js'
import Cookie from 'js-cookie'

const API = axios.create({ baseURL })

API.defaults.withCredentials = true;
API.interceptors.request.use((req) => {
    const profile = Cookie.get('profile')
    if (profile) {
        const user = JSON.parse(profile)
        req.headers.authtoken = user.token
    }
    return req
})

export const register = (userData) => API.post('/user/register', userData)
export const login = (userData) => API.post('/user/login', userData)
export const getUsers = () => API.get(`/user/get-all`)
export const getUser = (userId) => API.get(`/user/get-one/${userId}`)
export const getUserStats = () => API.get(`/user/get/stats`)
export const updateUser = (userId, userData) => API.put(`/user/update/${userId}`, userData)
export const deleteUser = (userId) => API.delete(`/user/delete/${userId}`)

export const getHotels = (query) => API.get(`/hotel/all?${query}`)
export const countHotelsByCityName = (cities) => API.get(`/hotel/count/city?cities=${cities}`)
export const countHotelsByType = () => API.get(`/hotel/count/type`)
export const getHotel = (hotelId) => API.get(`/hotel/get/${hotelId}`)
export const getHotelRooms = (hotelId) => API.get(`/hotel/room/${hotelId}`)
export const createHotel = (hotelData) => API.post(`/hotel/create`, hotelData)
export const updateHotel = (hotelId, hotelData) => API.put(`/hotel/update/${hotelId}`, hotelData)
export const deleteHotel = (hotelId) => API.delete(`/hotel/delete/${hotelId}`)

export const getRooms = () => API.get(`/room/get/all`)
export const getRoom = (roomId) => API.get(`/room/get/${roomId}`)
export const createRoom = (hotelId, roomData) => API.post(`/room/create/${hotelId}`, roomData)
export const updateRoom = (roomId, roomData) => API.put(`/room/update/${roomId}`, roomData)
export const updateAvailabilty = (roomId) => API.put(`/room/availability/${roomId}`)
export const deleteRoom = (roomId, hotelId) => API.delete(`/room/delete/${roomId}/${hotelId}`)