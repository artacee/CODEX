import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Magnetic } from './ui/Magnetic';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Update scrolled state
    setIsScrolled(latest > 50);

    // Determine visibility
    if (latest < 50) {
      setIsVisible(true);
    } else if (latest > previous && latest > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    open: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 pointer-events-none`}
      >
        <div className="container mx-auto px-6 pt-6 flex justify-center pointer-events-auto">
          <div className={`
            glass rounded-full px-6 py-3 flex items-center justify-between gap-8
            transition-all duration-500 ease-[0.22,1,0.36,1]
            ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-white/10' : 'bg-black/40 backdrop-blur-md border-white/5'}
            md:min-w-[500px] min-w-[90%]
          `}>

            {/* Logo area - simple text for now or could be the Logo component if integrated */}
            {/* Logo area */}
            <button
              onClick={() => currentPage === 'home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : onNavigate('home')}
              className="z-50 relative hover:opacity-80 transition-opacity"
              data-cursor="hover"
            >
              <img src="/mobile.png" alt="CODEX" className="h-8 w-auto" />
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Magnetic key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="relative group overflow-hidden"
                    data-cursor="hover"
                  >
                    <span className="text-sm font-medium text-muted transition-colors group-hover:text-white uppercase tracking-wide inline-block relative z-10">
                      {item.label}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                </Magnetic>
              ))}
              <Magnetic>
                <motion.button
                  onClick={() => onNavigate('register')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-black px-5 py-2 rounded-full font-bold text-xs uppercase hover:bg-white transition-colors"
                  data-cursor="hover"
                >
                  Register
                </motion.button>
              </Magnetic>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor="hover"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white origin-center transition-transform duration-300"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white transition-opacity duration-300"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white origin-center transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-black pointer-events-auto overflow-y-auto"
          >
            {/* Background Pattern/Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none fixed" />

            <div className="container mx-auto px-6 h-full min-h-[600px] flex flex-col pt-32 pb-12 relative z-10">
              <div className="flex flex-col items-center gap-6 flex-1 justify-center">
                {NAV_ITEMS.map((item, idx) => (
                  <div key={item.label} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary hover:opacity-80 transition-all cursor-pointer block py-2 text-center"
                      data-cursor="hover"
                    >
                      {item.label}
                    </motion.a>
                  </div>
                ))}

                <div className="overflow-hidden mt-8 w-full max-w-xs">
                  <motion.button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('register');
                    }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full bg-primary text-black px-8 py-4 rounded-full font-bold text-xl uppercase hover:bg-white transition-colors"
                    data-cursor="hover"
                  >
                    Register Now
                  </motion.button>
                </div>
              </div>

              {/* Footer Information in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-12"
              >
                <p className="text-muted text-sm uppercase tracking-widest mb-2">Code The Future</p>
                <div className="flex justify-center gap-4 text-white/50">
                  <span>VOL 2.0</span>
                  <span>•</span>
                  <span>2026</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};