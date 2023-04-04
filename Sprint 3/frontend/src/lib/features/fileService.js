import axios from 'axios'
import { env } from '$env/dynamic/public'

const API_URL = env.PUBLIC_API_URL + '/api/files'

// Get file
const getFileByID = async (/** @type {string} */ fileID, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + fileID, config)

    return response.data
}

// Delete file
const deleteJob = async (/** @type {string} */ fileID, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + fileID, config)

    return response.data
}

export const fileService = {
    getFileByID,
    deleteJob,
}

export default fileService