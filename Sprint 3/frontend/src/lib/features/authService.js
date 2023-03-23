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
// Get all users
const getAllUsers = async (/** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete User
// Delete an user
const deleteUser = async (/** @type {any} */userData, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL, userData, config)

    return response.data
}

// Login user
const login = async (/** @type {any} */ userData) => {
    return await axios.post(API_URL + 'login/', userData).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    })
        .catch((reason) => {
            return null
        })
}

// Edit user
const edit = async (/** @type {any} */ userData, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.patch(API_URL, userData, config)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = async (/** @type {any} */userData, /** @type {any} */token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + '/logout', userData, config)
    localStorage.removeItem('user')

}

const getUser = () => {
    const userState = localStorage.getItem('user')
    if (userState === null)
        return null
    else
        return JSON.parse(userState)
}

export const authService = {
    register,
    logout,
    login,
    getUser,
    edit,
    getAllUsers,
    deleteUser
}

export default authService