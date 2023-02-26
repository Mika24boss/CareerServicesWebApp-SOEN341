import axios from 'axios'
import { env } from '$env/dynamic/public'

const API_URL = env.PUBLIC_API_URL + '/api/users/'

// Register user
const register = async (/** @type {any} */ userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (/** @type {any} */ userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

export const authService = {
    register,
    logout,
    login,
}

export default authService