import axios from 'axios'
import {env} from '$env/dynamic/public'

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
    const req = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: userData,
        }
    }
    const response = await axios.delete(API_URL, req).catch((reason) => {
        console.log(reason)
        return reason;
    })
    return {data: response.data, error: response.response?.status};
}

// Login user
const login = async (/** @type {any} */ userData) => {
    return await axios.post(API_URL + 'login/', userData)
        .then((response) => {
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
    const response = await axios.put(API_URL, userData, config)

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
    localStorage.removeItem('user')
    const response = await axios.post(API_URL + 'logout', userData, config)
}

// Get user
const getUser = () => {
    const userState = localStorage.getItem('user')
    if (userState === null)
        return null
    else
        return JSON.parse(userState)
}

// Get user by ID
const getUserByID = async (/** @type {string} */ userID, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + userID, config).catch(() => {
        return null
    })

    return response?.data
}

const addInterview = async (/** @type {string} */ applicantID, /** @type {any} */ jobID, /** @type {any} */ date, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.patch(API_URL + applicantID + '/interview', {
        jobID: jobID,
        date: date
    }, config).catch((reason) => {
        return reason;
    })

    return {data: response.data, error: response.response?.status};
}

const deleteInterview = async (/** @type {string} */ applicantID, /** @type {any} */ jobID, /** @type {any} */ token) => {
    const req = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            jobID: jobID
        }
    }

    const response = await axios.delete(API_URL + applicantID + '/interview', req).catch((reason) => {
        console.log(reason)
        return reason;
    })

    return {data: response.data, error: response.response?.status};
}

const uploadProfileImage = async (/** @type {string} */ userData, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.patch(API_URL + '/uploadProfileImage', userData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Server error');
    }
}

const uploadCV = async (/** @type {string} */ userData, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.patch(API_URL + '/uploadResume', userData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Server error');
    }
}


export const authService = {
    register,
    logout,
    login,
    getUser,
    edit,
    getAllUsers,
    deleteUser,
    getUserByID,
    uploadProfileImage,
    uploadCV,
    addInterview,
    deleteInterview
}

export default authService