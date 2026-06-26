const User = require('../models/User');

// @desc    Get user's enrolled courses
// @route   GET /api/users/my-courses
exports.getMyCourses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'enrolledCourses.course'
    );

    res.status(200).json({
      success: true,
      enrolledCourses: user.enrolledCourses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
