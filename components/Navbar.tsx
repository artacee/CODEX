import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { CodexLogo } from './ui/CodexLogo';
import { Magnetic } from './ui/Magnetic';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ease-[0.22,1,0.36,1] ${isScrolled ? 'bg-black/80' : 'bg-black/40'}`}>
            <a href="#" className="flex items-center gap-2" data-cursor="hover">
              <CodexLogo className="text-2xl md:text-3xl" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Magnetic key={item.label}>
                  <a
                    href={item.href}
                    data-cursor="hover"
                    className="text-sm font-medium text-muted hover:text-white transition-colors uppercase tracking-wide inline-block"
                  >
                    {item.label}
                  </a>
                </Magnetic>
              ))}
              <Magnetic>
                <motion.button
                  data-cursor="hover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-primary text-black px-5 py-2 rounded-full font-bold text-xs uppercase hover:bg-white transition-colors"
                >
                  Register Now
                </motion.button>
              </Magnetic>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
              data-cursor="hover"
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              data-cursor="hover"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-4xl font-bold text-white hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};