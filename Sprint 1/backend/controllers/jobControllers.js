const asyncHandler = require('express-async-handler');

const Job = require('../model/jobModel')
const User = require("../model/userModel")
// @desc Get jobs
// @route Get /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
    //Get all jobs from MongoDB
    const job = await Job.find().lean()

    if (!job?.length) {
        return res.status(400).json({ message: 'No jobs found' })
    }

    const jobWithUser = await Promise.all(job.map(async (job) => {
        const user = await User.findById(job.user).lean().exec()
        return { ...job, username: user.username }
    }))
    res.json(jobWithUser)
})

// @desc Set jobs
// @route Post /api/jobs
// @access Private
const setJobs = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body
    if (!user || !title || !text) {
        res.status(400)
        throw new Error('Please add all the fields')
    }
    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }
    const job = await Job.create({
        user,
        title,
        text
    })
    if (job) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }
})

// @desc Update jobs
// @route Put /api/jobs
// @access Private
const updateJobs = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const job = await Job.findById(id).exec()

    if (!job) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Job.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate job title' })
    }

    job.user = user
    job.title = title
    job.text = text
    job.completed = completed

    const updatedJob = await job.save()

    res.json(`'${updatedJob.title}' updated`)
    // const job = await Job.findById(req.params.id)


    // if (!job) {
    //     res.status(400)
    //     throw new Error('Job not found')
    // }
    // // Check for users
    // if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // // make sure the logged in user matches the job user
    // if (job.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    // const updatedJob = await Job.findByIdAndUpdate(req.params.id, res.body, {
    //     new: true,
    // })
    // res.status(200).json(updatedJob)
})

// @desc Delete jobs
// @route Delete /api/jobs
// @access Private
const deleteJobs = asyncHandler(async (req, res) => {

    const { id } = req.body
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Job ID required' })
    }

    // Confirm note exists to delete 
    const job = await Job.findById(id).exec()

    if (!job) {
        return res.status(400).json({ message: 'Job not found' })
    }

    const result = await job.deleteOne()

    const reply = `Job '${result.title}' with ID ${result._id} deleted`

    res.json(reply)

    //Confirm data

    // const job = await Job.findById(req.params.id)

    // if (!job) {
    //     res.status(400)
    //     throw new Error('Job not found')
    // }
    // // Check for users
    // if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // // make sure the logged in user matches the job user
    // if (job.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    // await job.remove()
    // res.status(200).json({ id: req.params.id })
})

module.exports = {
    getJobs,
    setJobs,
    updateJobs,
    deleteJobs,
}