const express = require('express');
const router = express.Router();
const { getMyCourses, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/my-courses', protect, getMyCourses);
router.put('/profile', protect, updateProfile);

module.exports = router;
