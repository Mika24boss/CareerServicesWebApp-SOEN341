import axios from 'axios'

const API_URL = '/api/jobs/'

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

const jobService = {
    createJob,
    getJobs,
    deleteJob,
}

export default jobService