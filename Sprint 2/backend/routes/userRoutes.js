const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, deleteUser, updateUser } = require('../controllers/userController')
const { protect } = require("../middleware/authMiddleware")
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.patch(updateUser)
router.delete(deleteUser)

module.exports = router
