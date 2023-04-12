import axios from 'axios'
import {env} from '$env/dynamic/public'
import defaultProfilePic from '$lib/images/default.png'
import defaultLogo from '$lib/images/logo-default.png'

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

const getLogoURL = async (/** @type {string} */ userID) => {
    return await axios.get(API_URL + 'ProfileFolder/logo-' + userID + '.png').then(() => {
        return API_URL + 'ProfileFolder/logo-' + userID + '.png';
    }).catch(() => {
        return defaultLogo;
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
    getLogoURL,
    deleteFile,
}

export default fileService