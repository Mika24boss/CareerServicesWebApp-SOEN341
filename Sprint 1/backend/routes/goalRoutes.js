const express = require('express');
const router = express.Router();
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/jobControllers');
const { protect } = require("../middleware/authMiddleware");
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)
router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)


module.exports = router