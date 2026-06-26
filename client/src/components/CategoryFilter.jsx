import { motion } from 'framer-motion';
import {
  Code,
  Smartphone,
  BarChart3,
  Brain,
  Cloud,
  Palette,
  Shield,
  Container,
} from 'lucide-react';

const categoryIcons = {
  'Web Development': Code,
  'Mobile Development': Smartphone,
  'Data Science': BarChart3,
  'AI & Machine Learning': Brain,
  'Cloud Computing': Cloud,
  'UI/UX Design': Palette,
  'Cybersecurity': Shield,
  'DevOps': Container,
};

const categoryColors = {
  'Web Development': 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/20',
  'Mobile Development': 'from-green-500/20 to-green-600/10 text-green-400 border-green-500/20',
  'Data Science': 'from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/20',
  'AI & Machine Learning': 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20',
  'Cloud Computing': 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/20',
  'UI/UX Design': 'from-pink-500/20 to-pink-600/10 text-pink-400 border-pink-500/20',
  'Cybersecurity': 'from-red-500/20 to-red-600/10 text-red-400 border-red-500/20',
  'DevOps': 'from-orange-500/20 to-orange-600/10 text-orange-400 border-orange-500/20',
};

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
          !selected
            ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-600/25'
            : 'glass-light text-surface-200/70 hover:text-white hover:bg-white/10'
        }`}
      >
        All Courses
      </motion.button>
      {categories.map((cat, i) => {
        const Icon = categoryIcons[cat.name] || Code;
        const colorClasses = categoryColors[cat.name] || 'from-gray-500/20 to-gray-600/10 text-gray-400 border-gray-500/20';
        const isSelected = selected === cat.name;

        return (
          <motion.button
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(isSelected ? null : cat.name)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border ${
              isSelected
                ? `bg-gradient-to-r ${colorClasses} border-opacity-100`
                : 'border-transparent glass-light text-surface-200/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            {cat.name}
            {cat.count && (
              <span className="text-xs opacity-60">({cat.count})</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
