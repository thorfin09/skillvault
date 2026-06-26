import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BookOpen, Award } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CourseCard from '../components/CourseCard';
import StatsSection from '../components/StatsSection';
import CategoryFilter from '../components/CategoryFilter';
import TestimonialSlider from '../components/TestimonialSlider';
import { getFeaturedCourses, getCategories } from '../services/api';

const features = [
  {
    icon: Zap,
    title: 'Learn at Your Pace',
    description: 'Access courses anytime, anywhere. Pause, rewind, and revisit lessons as many times as you need.',
    color: 'from-yellow-500/20 to-yellow-600/5 text-yellow-400',
  },
  {
    icon: BookOpen,
    title: 'Expert-Led Content',
    description: 'Courses taught by professionals from Google, Meta, Netflix, and more top tech companies.',
    color: 'from-blue-500/20 to-blue-600/5 text-blue-400',
  },
  {
    icon: Award,
    title: 'Earn Certificates',
    description: 'Get recognized credentials that prove your skills to employers worldwide.',
    color: 'from-green-500/20 to-green-600/5 text-green-400',
  },
];

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, catsRes] = await Promise.all([
          getFeaturedCourses(),
          getCategories(),
        ]);
        setFeaturedCourses(coursesRes.data.courses);
        setCategories(catsRes.data.categories);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <StatsSection />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">SkillVault</span>?
          </h2>
          <p className="text-surface-200/50 max-w-xl mx-auto">
            Everything you need to accelerate your learning journey and advance your career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-light rounded-2xl p-8 group hover:border-primary-500/20 transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-surface-200/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Featured <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-surface-200/50">
              Handpicked bestsellers loved by thousands of students
            </p>
          </div>
          <Link
            to="/courses"
            className="group flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium mt-4 sm:mt-0 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton aspect-video" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-5 w-full" />
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-32 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, i) => (
              <CourseCard key={course._id} course={course} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-surface-200/50">
            Find the perfect course in your area of interest
          </p>
        </motion.div>
        <CategoryFilter
          categories={categories}
          selected={null}
          onSelect={(cat) => {
            if (cat) {
              window.location.href = `/courses?category=${encodeURIComponent(cat)}`;
            }
          }}
        />
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by <span className="gradient-text">Learners</span>
          </h2>
          <p className="text-surface-200/50">
            See what our students have to say about their experience
          </p>
        </motion.div>
        <TestimonialSlider />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Join 325,000+ learners already building their future. Get unlimited access to our top-rated courses.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-surface-900 font-semibold rounded-2xl hover:bg-surface-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
            >
              Get Started for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
