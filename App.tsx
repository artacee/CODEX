import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from './components/Loader';
import { Cursor } from './components/ui/Cursor';
import { Scene3D } from './components/Scene3D';
import { HackerMode } from './components/HackerMode';
import { GravityPlayground } from './components/game/GravityPlayground';
import { CreditsMode } from './components/CreditsMode';
import { SpotlightReveal } from './components/SpotlightReveal';
import { useGravityTrigger } from './hooks/useGravityTrigger';
import { useWordTrigger } from './hooks/useWordTrigger';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDeadlinePopup, setShowDeadlinePopup] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const lenisRef = useRef<Lenis | null>(null);

  const { isActive: isGravityActive, setIsActive: setIsGravityActive, trigger: triggerGravity } = useGravityTrigger();
  const { triggered: isCreditsTriggered, setTriggered: setCreditsTriggered } = useWordTrigger('CREDITS.');

  // Show deadline popup after loading completes
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowDeadlinePopup(true);
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading]);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;

    // Smooth scroll to top using Lenis if available, otherwise fallback
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Slight delay to allow scroll to start
    setTimeout(() => {
      setCurrentPage(page);
    }, 100);
  };

  // Reset scroll on page change
  useEffect(() => {
    if (!isLoading) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [currentPage, isLoading]);

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-black relative">
      <div className="film-grain"></div>
      <Cursor />
      <HackerMode />

      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* 3D Scene Background - Persistent across pages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-0 pointer-events-none"
          >
            <Scene3D />
          </motion.div>

          {/* Gravity Mode */}
          <AnimatePresence>
            {isGravityActive && <GravityPlayground onClose={() => setIsGravityActive(false)} />}
          </AnimatePresence>

          {/* Credits Mode */}
          <AnimatePresence>
            {isCreditsTriggered && <CreditsMode onClose={() => setCreditsTriggered(false)} />}
          </AnimatePresence>

          {/* Deadline Spotlight Reveal Popup */}
          {showDeadlinePopup && (
            <SpotlightReveal
              onComplete={() => setShowDeadlinePopup(false)}
              duration={15000}
            />
          )}

          {/* Navigation - Persistent */}
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} onLogoClick={triggerGravity} />

          {/* Main Content Area with Page Transitions */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-grow"
              >
                {currentPage === 'home' ? (
                  <Home onNavigate={handleNavigate} />
                ) : (
                  <Register onBack={() => handleNavigate('home')} />
                )}
              </motion.div>
            </AnimatePresence>

            <Footer onNavigate={handleNavigate} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;