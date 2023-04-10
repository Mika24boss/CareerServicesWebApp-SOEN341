const express = require('express')
const router = express.Router()
const { getAllJobs, getJobsID, setJobs, updateJobsID, updateJobsApplicant, deleteJobs, } = require('../controllers/jobControllers')
const { protect } = require('../middleware/authMiddleware')
const multer = require("multer");
const Image = require('../model/fileModel');
const Job = require('../model/jobModel');
router.route('/')
    .get(protect, getAllJobs)
    .post(protect, setJobs)
router.route('/:id')
    .get(protect, getJobsID)
    .delete(protect, deleteJobs)
    .put(protect, updateJobsID)
router.route('/jobsApplicant/:id')
    .put(protect, updateJobsApplicant)

const Storage = multer.diskStorage({
    destination: 'profileFolder',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage: Storage
}).single('logo')

router.patch('/uploadLogo', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: 'Error uploading file' });
        }
        try {
            const job = await Job.findById(req.body.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const image = new Image({
                name: "logo" + user.id,
                image: {
                    data: req.file.filename,
                    contentType: "image/png"
                }
            });
            image.save();
            job.logo = image;
            const updatedJob = await job.save();
            return res.json(updatedJob);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    })
});

module.exports = router