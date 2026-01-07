import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { CodexLogo } from './ui/CodexLogo';
import { Magnetic } from './ui/Magnetic';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Determine scroll direction and visibility
      if (currentScrollY < 50) {
        // Always show navbar at top of page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      // Wait for navigation then scroll
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('home');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className={`glass rounded-full px-6 py-3 flex items-center justify-center transition-all duration-500 ease-[0.22,1,0.36,1] ${isScrolled ? 'bg-black/80' : 'bg-black/40'}`}>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Magnetic key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    data-cursor="hover"
                    className="text-sm font-medium text-muted hover:text-white transition-colors uppercase tracking-wide inline-block"
                  >
                    {item.label}
                  </a>
                </Magnetic>
              ))}
              <Magnetic>
                <motion.button
                  onClick={() => onNavigate('register')}
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
                  onClick={(e) => handleNavClick(item.href, e)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl font-bold text-white hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('register');
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4 bg-primary text-black px-8 py-4 rounded-full font-bold text-xl uppercase"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};