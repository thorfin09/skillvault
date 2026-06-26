const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  getFeaturedCourses,
  getCategories,
  enrollCourse,
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.get('/featured', getFeaturedCourses);
router.get('/categories', getCategories);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', protect, enrollCourse);

module.exports = router;
