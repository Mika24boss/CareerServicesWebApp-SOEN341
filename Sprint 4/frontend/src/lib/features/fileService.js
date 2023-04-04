import axios from 'axios'
import { env } from '$env/dynamic/public'

const API_URL = env.PUBLIC_API_URL

// Get file
const getProfilePictureURL = (/** @type {string} */ userID) => {
    return API_URL + '/ProfileFolder/' + userID + '.png';
}

const getResumeURL = (/** @type {string} */ userID) => {
    return API_URL + '/ResumeFolder/' + userID + '.pdf';
}

// Delete file
const deleteFile = async (/** @type {string} */ fileID, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + fileID, config)

    return response.data
}

export const fileService = {
    getProfilePictureURL,
    getResumeURL,
    deleteFile,
}

export default fileService