import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const stats = [
    { label: 'Active Learners', value: 325000, suffix: '+', icon: '👨‍🎓' },
    { label: 'Expert Courses', value: 1200, suffix: '+', icon: '📚' },
    { label: 'Top Instructors', value: 480, suffix: '+', icon: '👩‍🏫' },
    { label: 'Satisfaction Rate', value: 97, suffix: '%', icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-light rounded-2xl p-6 text-center group hover:border-primary-500/30 transition-all duration-500"
        >
          <div className="text-3xl mb-3">{stat.icon}</div>
          <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </div>
          <p className="text-sm text-surface-200/50">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
