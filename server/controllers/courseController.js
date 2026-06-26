const Course = require('../models/Course');

// @desc    Get all courses (with optional filters)
// @route   GET /api/courses
exports.getCourses = async (req, res, next) => {
  try {
    const { category, level, search, sort, limit = 20, page = 1 } = req.query;

    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'popular') sortOption = { studentsEnrolled: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const courses = await Course.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured
exports.getFeaturedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isPublished: true, isBestseller: true })
      .sort({ rating: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all unique categories with course count
// @route   GET /api/courses/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Course.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      categories: categories.map((c) => ({
        name: c._id,
        count: c.count,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
exports.enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if already enrolled
    const isEnrolled = req.user.enrolledCourses.some(
      (ec) => ec.course.toString() === req.params.id
    );

    if (isEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course',
      });
    }

    // Add course to user's enrolled courses
    req.user.enrolledCourses.push({ course: course._id });
    await req.user.save();

    // Increment students enrolled count
    course.studentsEnrolled += 1;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in the course',
    });
  } catch (error) {
    next(error);
  }
};
