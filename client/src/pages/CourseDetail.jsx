import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  Lock,
  ChevronDown,
  ChevronUp,
  Globe,
  BarChart3,
  Award,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { getCourse, enrollCourse } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await getCourse(id);
        setCourse(data.course);

        if (user) {
          const isEnrolled = user.enrolledCourses?.some(
            (ec) => (ec.course?._id || ec.course) === id
          );
          setEnrolled(isEnrolled);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    try {
      await enrollCourse(id);
      setEnrolled(true);
      // Update user context
      const updatedCourses = [
        ...(user.enrolledCourses || []),
        { course: id, progress: 0 },
      ];
      updateUser({ ...user, enrolledCourses: updatedCourses });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="skeleton h-8 w-32 mb-8" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-6 w-full" />
            <div className="skeleton h-6 w-2/3" />
            <div className="skeleton h-64 w-full rounded-2xl" />
          </div>
          <div className="skeleton h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <Link to="/courses" className="text-primary-400 hover:text-primary-300">
            Browse all courses →
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const visibleLessons = showAllLessons
    ? course.lessons
    : course.lessons?.slice(0, 5);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-surface-200/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.isBestseller && (
                  <span className="px-3 py-1 text-xs font-semibold bg-warning/90 text-surface-900 rounded-lg">
                    Bestseller
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-medium glass rounded-lg text-primary-300">
                  {course.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium glass rounded-lg text-surface-200/70">
                  {course.level}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-surface-200/60 mb-6">{course.subtitle}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span className="text-surface-200/40">
                    ({course.totalRatings?.toLocaleString()} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-surface-200/50">
                  <Users className="w-4 h-4" />
                  {course.studentsEnrolled?.toLocaleString()} students
                </div>
                <div className="flex items-center gap-1.5 text-surface-200/50">
                  <Globe className="w-4 h-4" />
                  {course.language}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden mb-10 aspect-video">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4">About This Course</h2>
                <p className="text-surface-200/60 leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              </div>

              {/* Course Content */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Course Content</h2>
                  <span className="text-sm text-surface-200/40">
                    {course.totalLessons} lessons · {course.totalDuration}
                  </span>
                </div>

                <div className="space-y-2">
                  {visibleLessons?.map((lesson, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-light rounded-xl px-5 py-4 flex items-center justify-between group hover:border-primary-500/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          lesson.isPreview
                            ? 'bg-primary-500/20 text-primary-400'
                            : 'bg-white/5 text-surface-200/40'
                        }`}>
                          {lesson.isPreview ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{lesson.title}</p>
                          {lesson.isPreview && (
                            <span className="text-xs text-primary-400">Preview available</span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-surface-200/40">{lesson.duration}</span>
                    </motion.div>
                  ))}
                </div>

                {course.lessons?.length > 5 && (
                  <button
                    onClick={() => setShowAllLessons(!showAllLessons)}
                    className="mt-4 w-full py-3 glass-light rounded-xl text-sm font-medium text-surface-200/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {showAllLessons ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Show All {course.lessons.length} Lessons <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                )}
              </div>

              {/* Instructor */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-6">Your Instructor</h2>
                <div className="glass-light rounded-2xl p-6 flex items-start gap-5">
                  <img
                    src={course.instructor?.avatar}
                    alt={course.instructor?.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{course.instructor?.name}</h3>
                    <p className="text-sm text-primary-400 mb-3">{course.instructor?.title}</p>
                    <p className="text-sm text-surface-200/50 leading-relaxed">{course.instructor?.bio}</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              {course.reviews?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Student Reviews</h2>
                  <div className="space-y-4">
                    {course.reviews.map((review, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-light rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                            {review.userName?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">{review.userName}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${
                                    s < review.rating
                                      ? 'text-warning fill-warning'
                                      : 'text-surface-200/20'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-surface-200/60 leading-relaxed">
                          {review.comment}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="glass-light rounded-2xl p-6 space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-bold text-white">${course.price}</span>
                    {course.originalPrice > course.price && (
                      <span className="text-lg text-surface-200/40 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <p className="text-sm text-green-400 font-medium">
                      {discountPercent}% off — Limited time offer
                    </p>
                  )}
                </div>

                {/* Enroll Button */}
                {enrolled ? (
                  <div className="w-full py-4 bg-green-500/20 text-green-400 font-semibold rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Enrolled
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/25 disabled:opacity-50 cursor-pointer"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </motion.button>
                )}

                <p className="text-center text-xs text-surface-200/40">
                  30-day money-back guarantee
                </p>

                {/* Course Info */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-surface-200/50">
                      <Clock className="w-4 h-4" /> Duration
                    </span>
                    <span className="text-white font-medium">{course.totalDuration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-surface-200/50">
                      <BookOpen className="w-4 h-4" /> Lessons
                    </span>
                    <span className="text-white font-medium">{course.totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-surface-200/50">
                      <BarChart3 className="w-4 h-4" /> Level
                    </span>
                    <span className="text-white font-medium">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-surface-200/50">
                      <Globe className="w-4 h-4" /> Language
                    </span>
                    <span className="text-white font-medium">{course.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-surface-200/50">
                      <Award className="w-4 h-4" /> Certificate
                    </span>
                    <span className="text-white font-medium">Yes</span>
                  </div>
                </div>

                {/* Tags */}
                {course.tags?.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-surface-200/40 mb-3">Topics covered</p>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs glass rounded-lg text-surface-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
