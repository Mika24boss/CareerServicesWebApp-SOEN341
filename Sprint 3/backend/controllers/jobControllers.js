const asyncHandler = require('express-async-handler');

const Job = require('../model/jobModel')
const User = require("../model/userModel")
// @desc Get jobs
// @route Get /api/jobs/jobsID
// @access Private
const getJobsID = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ jobID: { $eq: parseInt(req.params.id) } });
    res.status(200).json(jobs)
})

// @desc Get jobs
// @route Get /api/jobs
// @access Private
const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json(jobs)
})

// @desc Set jobs
// @route Post /api/jobs
// @access Private
const setJobs = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400)
        throw new Error('Please add title and description fields')
    }
    if (req.user.role === 'Student') {
        res.status(400)
        throw new Error('Student cannot create jobs')
    }
    const job = await Job.create({
        title: req.body.title,
        companyName: req.body.companyName,
        description: req.body.description,
        location: req.body.location,
        isActive: req.body.isActive,
        user: req.user.id,
        interviewDate: req.body.interviewDate,
    })
    res.status(200).json(job)
})

// @desc Update jobs
// @route Put /api/jobs
// @access Private
const updateJobsID = asyncHandler(async (req, res) => {
    const jobID = req.params.id
    const job = await Job.findOne({ jobID: { $eq: parseInt(jobID) } });

    if (!job) {
        res.status(400)
        throw new Error('Job not found')
    }
    // Check for users
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the job user
    if (req.user.role !== 'Admin') {
        if (job.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }
    }

    const updatedJobsID = await Job.findOneAndUpdate(
        { jobID },
        req.body, {
        new: true,
    })
    console.log(req.body);
    res.status(200).json(updatedJobsID)
})

// @desc Update Applicant
// @route Put /api/jobs/jobsApplicant
// @access Private
const updateJobsApplicant = asyncHandler(async (req, res) => {
    const jobID = req.params.id
    const job = await Job.findOne({ jobID: { $eq: parseInt(jobID) } });
    if (!job) {
        res.status(400)
        throw new Error('Job not found')
    }

    const updatedJobs = await Job.findOneAndUpdate(
        { jobID },
        { $addToSet: { 'applicants': req.user.id } }, {
        new: true,
    })
    res.status(200).json(updatedJobs)
})


// @desc Delete jobs
// @route Delete /api/jobs
// @access Private
const deleteJobs = asyncHandler(async (req, res) => {
    const jobID = req.params.id
    const job = await Job.findOne({ jobID });

    if (!job) {
        res.status(400)
        throw new Error('Job not found')
    }
    // Check for users
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the job user
    if (job.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await job.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getAllJobs,
    getJobsID,
    setJobs,
    updateJobsID,
    updateJobsApplicant,
    deleteJobs,
}