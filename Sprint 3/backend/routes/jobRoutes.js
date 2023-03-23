const express = require('express')
const router = express.Router()
const { getAllJobs, getJobsID, setJobs, updateJobsID, updateJobsApplicant, deleteJobs, } = require('../controllers/jobControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getAllJobs)
    .post(protect, setJobs)
router.route('/:id')
    .get(protect, getJobsID)
    .delete(protect, deleteJobs)
    .put(protect, updateJobsID)
router.route('/jobsApplicant/:id')
    .put(protect, updateJobsApplicant)
module.exports = router