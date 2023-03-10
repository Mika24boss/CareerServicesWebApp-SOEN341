import axios from 'axios'
import {env} from '$env/dynamic/public'

const API_URL = env.PUBLIC_API_URL + '/api/jobs/'

// Create new job
const createJob = async (/** @type {any} */ jobData, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, jobData, config)

    return response.data
}

// Get user jobs
const getJobs = async (/** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Get job by ID
const getJobByID = async (/** @type {string} */ jobID, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + jobID, config)

    return response.data
}

// Delete job
const deleteJob = async (/** @type {string} */ jobID, /** @type {any} */ token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + jobID, config)

    return response.data
}

export const jobService = {
    createJob,
    getJobs,
    deleteJob,
    getJobByID,
}

export default jobService