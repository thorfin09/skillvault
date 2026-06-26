const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // e.g., "12:30"
    required: true,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    subtitle: {
      type: String,
      default: '',
      maxlength: [200, 'Subtitle cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Course price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    instructor: {
      name: { type: String, required: true },
      avatar: { type: String, default: '' },
      title: { type: String, default: '' },
      bio: { type: String, default: '' },
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'AI & Machine Learning',
        'Cloud Computing',
        'UI/UX Design',
        'Cybersecurity',
        'DevOps',
      ],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    language: {
      type: String,
      default: 'English',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: String, // e.g., "24h 30m"
      default: '',
    },
    totalLessons: {
      type: Number,
      default: 0,
    },
    lessons: [lessonSchema],
    reviews: [reviewSchema],
    tags: [String],
    isPublished: {
      type: Boolean,
      default: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
