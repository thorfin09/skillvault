import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, BarChart3 } from 'lucide-react';
import { getMyCourses } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyCourses = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      const fetchMyCourses = async () => {
        try {
          const { data } = await getMyCourses();
          setEnrolledCourses(data.enrolledCourses || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchMyCourses();
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            My <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-surface-200/50 mb-10">
            Continue where you left off
          </p>
        </motion.div>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">
              No courses yet
            </h2>
            <p className="text-surface-200/50 mb-8 max-w-md mx-auto">
              Start your learning journey by enrolling in a course. We have
              hundreds of expert-led courses waiting for you.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-600/25 transition-all"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment, i) => {
              const course = enrollment.course;
              if (!course) return null;

              return (
                <motion.div
                  key={course._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/courses/${course._id}`} className="group block">
                    <div className="glass-light rounded-2xl overflow-hidden hover:border-primary-500/20 transition-all duration-500 hover:-translate-y-1">
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
                      </div>

                      <div className="p-5">
                        <p className="text-xs font-medium text-primary-400 mb-2 uppercase tracking-wider">
                          {course.category}
                        </p>
                        <h3 className="text-base font-semibold text-white mb-4 line-clamp-2 group-hover:text-primary-300 transition-colors">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-surface-200/50">Progress</span>
                            <span className="text-primary-400 font-medium">
                              {enrollment.progress || 0}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${enrollment.progress || 0}%` }}
                              transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-surface-200/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {course.totalDuration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-3.5 h-3.5" />
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
