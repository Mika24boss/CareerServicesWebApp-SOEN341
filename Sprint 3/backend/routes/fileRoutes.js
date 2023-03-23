const express = require('express')
const router = express.Router()
const { getFileID, deleteFile } = require('../controllers/fileControllers')

router.get('/:id', getFileID)
router.delete('/:id', deleteFile)

module.exports = router