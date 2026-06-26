import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Calendar, BookOpen, Award, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const enrolledCount = user.enrolledCourses?.length || 0;
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-light rounded-3xl p-8 sm:p-10 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-primary-600/20">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  getInitials(user.name)
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-surface-950" />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-surface-200/50 flex items-center gap-2 justify-center sm:justify-start mb-4">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              {user.bio && (
                <p className="text-sm text-surface-200/60 mb-4 max-w-md">{user.bio}</p>
              )}
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <span className="px-3 py-1 text-xs font-medium glass rounded-lg text-primary-300 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCount },
            { icon: Award, label: 'Certificates', value: 0 },
            { icon: Calendar, label: 'Member Since', value: joinDate },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-light rounded-2xl p-5 text-center"
            >
              <stat.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-surface-200/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/my-courses"
              className="glass-light rounded-2xl p-6 flex items-center gap-4 hover:border-primary-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">My Courses</h3>
                <p className="text-sm text-surface-200/40">Continue learning</p>
              </div>
            </Link>
            <Link
              to="/courses"
              className="glass-light rounded-2xl p-6 flex items-center gap-4 hover:border-primary-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                <Settings className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Browse Courses</h3>
                <p className="text-sm text-surface-200/40">Discover new skills</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
