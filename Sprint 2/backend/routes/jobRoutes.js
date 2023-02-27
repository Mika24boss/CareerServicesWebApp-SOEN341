const express = require('express')
const router = express.Router()
const { getAllJobs, getJobsID, setJobs, updateJobs, updateJobsApplicant, deleteJobs, } = require('../controllers/jobControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getAllJobs)
    .post(protect, setJobs)
    .delete(protect, deleteJobs)
    .put(protect, updateJobs)
router.route('/jobsID')
    .get(protect, getJobsID)
router.route('/jobsApplicant')
    .put(protect, updateJobsApplicant)
module.exports = router