import axios from 'axios'
import {env} from '$env/dynamic/public'
import defaultProfilePic from '$lib/images/default.png'

const API_URL = env.PUBLIC_API_URL + '/'

// Get file
const getProfilePictureURL = async (/** @type {string} */ userID) => {
    return await axios.get(API_URL + 'ProfileFolder/' + userID + '.png').then(() => {
        return API_URL + 'ProfileFolder/' + userID + '.png';
    }).catch(() => {
        return defaultProfilePic;
    });
}

const getResumeURL = async (/** @type {string} */ userID) => {
    return await axios.get(API_URL + 'ResumeFolder/' + userID + '.pdf').then(() => {
        return API_URL + 'ResumeFolder/' + userID + '.pdf';
    }).catch(() => {
        return null;
    });
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