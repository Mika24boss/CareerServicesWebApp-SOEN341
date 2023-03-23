const asyncHandler = require('express-async-handler');

const File = require('../model/fileModel')
const User = require("../model/userModel")

// @desc Get fileById
// @route Get /api/files
// @access Private
const getFileID = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);
    res.status(200).json(file)
})

// @desc Delete file
// @route Delete /api/file
// @access Private
const deleteFile = asyncHandler(async (req, res) => {
    const fileID = req.params.id
    const file = await File.findOne({ fileID });

    if (!file) {
        res.status(400)
        throw new Error('File not found')
    }
    // Check for users
    if (!req.file) {
        res.status(401)
        throw new Error('File not found')
    }

    await file.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getFileID,
    deleteFile,
}