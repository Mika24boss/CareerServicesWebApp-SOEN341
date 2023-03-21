const express = require('express')
const router = express.Router()
const { registerUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser, logout } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
    .get('/', protect, getAllUsers)
    .patch('/', protect, updateUser)
    .delete('/', protect, deleteUser)
router.get('/:id', protect, getUserById)
router.post('/login', loginUser)
router.post('/logout', protect, logout)


module.exports = router