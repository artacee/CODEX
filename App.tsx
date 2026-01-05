import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from './components/Loader';
import { Cursor } from './components/ui/Cursor';
import { Scene3D } from './components/Scene3D';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Momentum Scrolling (Lenis)
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smoothing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = ''; 
      if (lenisRef.current) {
        lenisRef.current.start();
        setTimeout(() => {
             lenisRef.current?.resize();
        }, 100);
      }
    }
  }, [isLoading]);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;
    
    // Smooth scroll to top before transition
    lenisRef.current?.scrollTo(0, { immediate: false, duration: 0.5 });
    
    // Slight delay to allow scroll to start
    setTimeout(() => {
       setCurrentPage(page);
    }, 100);
  };

  // Reset scroll on page change
  useEffect(() => {
    if(!isLoading) {
        lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [currentPage, isLoading]);

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-black relative">
      <div className="film-grain"></div>
      <Cursor />
      
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          {/* 3D Scene Background - Persistent across pages */}
          {/* Removed pointer-events-none to allow rotation interaction */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2 }}
             className="fixed inset-0 z-0"
          >
             <Scene3D />
          </motion.div>

          {/* Navigation - Persistent */}
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

          {/* Main Content Area with Page Transitions */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between pointer-events-none">
            {/* Wrap inner content in pointer-events-auto so it remains clickable */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-grow pointer-events-auto"
              >
                {currentPage === 'home' ? (
                  <Home />
                ) : (
                  <Register onBack={() => handleNavigate('home')} />
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="pointer-events-auto">
                <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;