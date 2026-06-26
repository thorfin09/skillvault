import { Link } from 'react-router-dom';
import { GraduationCap, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const links = {
    Platform: [
      { name: 'Browse Courses', path: '/courses' },
      { name: 'Pricing', path: '/courses' },
      { name: 'For Teams', path: '/courses' },
      { name: 'Careers', path: '/' },
    ],
    Resources: [
      { name: 'Blog', path: '/' },
      { name: 'Help Center', path: '/' },
      { name: 'Community', path: '/' },
      { name: 'Become an Instructor', path: '/' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/' },
      { name: 'Terms of Service', path: '/' },
      { name: 'Cookie Policy', path: '/' },
    ],
  };

  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Skill<span className="gradient-text">Vault</span>
              </span>
            </Link>
            <p className="text-sm text-surface-200/50 mb-6 leading-relaxed">
              Premium courses from industry experts. Learn at your own pace and
              build the skills that matter.
            </p>
            <div className="flex items-center gap-3">
              {['GitHub', 'Twitter', 'LinkedIn'].map((name, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl glass-light flex items-center justify-center text-surface-200/50 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-sm text-surface-200/50 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-200/40">
            © {new Date().getFullYear()} SkillVault. All rights reserved.
          </p>
          <p className="text-sm text-surface-200/40 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for learners everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
