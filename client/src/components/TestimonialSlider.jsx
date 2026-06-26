import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Rivera',
    role: 'Frontend Developer at Stripe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    quote: 'SkillVault completely transformed my career. I went from a junior developer to landing a role at a top tech company in just 8 months.',
    course: 'The Complete React & Next.js Masterclass',
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist at Google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    quote: 'The data science bootcamp on SkillVault is the best investment I ever made. The instructors are world-class and the projects are incredibly practical.',
    course: 'Python for Data Science & ML Bootcamp',
  },
  {
    name: 'Marcus Johnson',
    role: 'iOS Developer, Freelancer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    quote: 'I published my first app on the App Store after taking the iOS course. The step-by-step approach made complex concepts feel approachable.',
    course: 'iOS & SwiftUI — Build 20 Real-World Apps',
  },
  {
    name: 'Sophie Chen',
    role: 'UX Designer at Figma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    quote: 'The design course helped me build a portfolio that stood out. Within weeks of completing it, I had multiple job offers from top companies.',
    course: 'UI/UX Design — From Figma to Full Product',
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) =>
      dir === 1
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="glass-light rounded-3xl p-8 sm:p-12 min-h-[280px] flex flex-col items-center justify-center">
        <Quote className="w-10 h-10 text-primary-500/30 mb-6" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center"
          >
            <p className="text-lg sm:text-xl text-surface-200/80 leading-relaxed mb-8 italic">
              "{t.quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/30"
              />
              <div className="text-left">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-surface-200/50">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-surface-200/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-surface-200/20 hover:bg-surface-200/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-surface-200/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
