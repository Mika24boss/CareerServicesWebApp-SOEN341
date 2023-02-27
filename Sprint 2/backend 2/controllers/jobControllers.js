const asyncHandler = require('express-async-handler');

const Job = require('../model/jobModel')
const User = require("../model/userModel")
// @desc Get goals
// @route Get /api/goals
// @access Private
const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ user: req.user.id });
    res.status(200).json(jobs)
})

// @desc Seet goals
// @route Post /api/goals
// @access Private
const setJobs = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const job = await Job.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(job)
})

// @desc Update goals
// @route Put /api/goals
// @access Private
const updateJobs = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id)

    if (!job) {
        res.status(400)
        throw new Error('Goal not found')
    }
    // Check for users
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedJobs = await Job.findByIdAndUpdate(req.params.id, res.body, {
        new: true,
    })
    res.status(200).json(updatedJobs)
})

// @desc Delete goals
// @route Delete /api/goals
// @access Private
const deleteJobs = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id)

    if (!job) {
        res.status(400)
        throw new Error('Goal not found')
    }
    // Check for users
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getJobs,
    setJobs,
    updateJobs,
    deleteJobs,
}