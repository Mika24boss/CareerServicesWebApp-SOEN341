const express = require('express')
const router = express.Router()
const { registerUser, getAllUsers, getUserById, setInterview, deleteInterview, updateUser, deleteUser, loginUser, logout } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const multer = require("multer");
const User = require('../model/userModel');
const Image = require('../model/fileModel');

router.route('/')
    .post(registerUser)
    .get(protect, getAllUsers)
    .put(protect, updateUser)
    .delete(protect, deleteUser)
router.route('/:id')
    .get(protect, getUserById)
router.route('/:id/interview')
    .patch(protect, setInterview)
    .delete(protect, deleteInterview)
router.post('/login', loginUser)
router.post('/logout', protect, logout)

const Storage = multer.diskStorage({
    destination: 'ProfileFolder',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage: Storage
}).single('profileImage')

const Storage1 = multer.diskStorage({
    destination: 'ResumeFolder',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload1 = multer({
    storage: Storage1
}).single('resume')

router.patch('/uploadProfileImage', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: 'Error uploading file' });
        }
        try {
            const user = await User.findById(req.body.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const image = new Image({
                name: user.id,
                image: {
                    data: req.file.filename,
                    contentType: "image/png"
                }
            });
            image.save();
            user.profilePicture = image;
            const updatedUser = await user.save();
            return res.json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    })
});


router.patch('/uploadResume', async (req, res) => {
    upload1(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: 'Error uploading file' });
        }
        try {
            const user = await User.findById(req.body.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const image = new Image({
                name: user.id,
                image: {
                    data: req.file.filename,
                    contentType: "application/pdf"
                }
            });
            image.save();
            user.resume = image;
            const updatedUser = await user.save();
            return res.json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    })
});

const fs = require('fs');
router.delete('/deleteFiles', async (req, res) => {
    fs.unlink("ProfileFolder/" + req.body.id + ".png", (err) => {
        if (err) {
            console.log("Profile picture doesn't exist or something went wrong.");
            return;
        }
        console.log("Deleted profile picture successfully.");
    });
    fs.unlink("ProfileFolder/logo-" + req.body.id + ".png", (err) => {
        if (err) {
            console.log("Logo picture doesn't exist or something went wrong.");
            return;
        }
        console.log("Deleted logo picture successfully.");
    });
    fs.unlink("ResumeFolder/" + req.body.id + ".pdf", (err) => {
        if (err) {
            console.log("CV doesn't exist or something went wrong.");
            return;
        }
        console.log("Deleted CV successfully.");
    });
    return res.status(200).json({ message: 'Files deleted' });
});

module.exports = router