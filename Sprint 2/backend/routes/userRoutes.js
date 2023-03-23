const express = require('express')
const router = express.Router()
const { registerUser, getUserById, updateUser, deleteUser, loginUser, logout } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
    .get('/', protect, getUserById)
    .put('/', protect, updateUser)
    .delete('/', protect, deleteUser)
router.post('/login', loginUser)
router.post('/logout', protect, logout)


module.exports = router