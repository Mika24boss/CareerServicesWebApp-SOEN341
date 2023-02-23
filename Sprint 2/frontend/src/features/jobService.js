import axios from 'axios'

const API_URL = '/api/jobs/'

// Create new job
const createJob = async (jobData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, jobData, config)

    return response.data
}

// Get user jobs
const getJobs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete job
const deleteJob = async (jobID, token) => {
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