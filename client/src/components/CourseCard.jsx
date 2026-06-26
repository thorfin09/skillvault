import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Clock } from 'lucide-react';

const CourseCard = ({ course, index = 0 }) => {
  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/courses/${course._id}`} className="group block">
        <div className="glass-light rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-600/10 hover:border-primary-500/30 hover:-translate-y-2">
          {/* Thumbnail */}
          <div className="relative overflow-hidden aspect-video">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {course.isBestseller && (
                <span className="px-2.5 py-1 text-xs font-semibold bg-warning/90 text-surface-900 rounded-lg">
                  Bestseller
                </span>
              )}
              <span className="px-2.5 py-1 text-xs font-medium glass rounded-lg text-white">
                {course.level}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-3 right-3">
              <div className="glass rounded-xl px-3 py-1.5 flex items-center gap-2">
                <span className="text-lg font-bold text-white">${course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-xs text-surface-200/50 line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <p className="text-xs font-medium text-primary-400 mb-2 uppercase tracking-wider">
              {course.category}
            </p>

            {/* Title */}
            <h3 className="text-base font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
              {course.title}
            </h3>

            {/* Instructor */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src={course.instructor?.avatar}
                alt={course.instructor?.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white/20"
              />
              <span className="text-xs text-surface-200/60">
                {course.instructor?.name}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span className="text-sm font-semibold text-white">
                  {course.rating}
                </span>
                <span className="text-xs text-surface-200/40">
                  ({course.totalRatings?.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-surface-200/50">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {course.studentsEnrolled?.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.totalDuration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
