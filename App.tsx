import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tracks } from './components/Tracks';
import { Prizes } from './components/Prizes';
import { IdeaGenerator } from './components/IdeaGenerator';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { SPONSORS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from './components/Loader';
import { Cursor } from './components/ui/Cursor';
import { Marquee } from './components/ui/Marquee';
import { Scene3D } from './components/Scene3D';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      smoothTouch: false,
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
      // Stop lenis while loading
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      // Clear overflow style to return to CSS defaults
      document.body.style.overflow = ''; 
      // Resume lenis and force resize calculation
      if (lenisRef.current) {
        lenisRef.current.start();
        // Give the DOM a moment to paint the new content before resizing Lenis
        setTimeout(() => {
             lenisRef.current?.resize();
        }, 100);
      }
    }
  }, [isLoading]);

  const sponsorContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const sponsorItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const
        }
    }
  };

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-black relative">
      <div className="film-grain"></div>
      <Cursor />
      
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          {/* 3D Scene Background - Loaded after preloader */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2 }}
             className="fixed inset-0 z-0 pointer-events-none"
          >
             <Scene3D />
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative z-10"
          >
            <Navbar />
            
            <Hero />

            <Marquee />

            <About />
            
            <Tracks />
            
            <IdeaGenerator />
            
            <Prizes />

            {/* Sponsors Section */}
            <section id="sponsors" className="py-24 border-t border-white/5 bg-background/50 backdrop-blur-sm">
              <div className="container mx-auto px-6 text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                  className="font-display font-bold text-3xl mb-12 text-muted uppercase tracking-widest"
                >
                  Backed By Industry Leaders
                </motion.h2>
                
                <motion.div 
                  variants={sponsorContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
                >
                  {SPONSORS.map((sponsor) => (
                    <motion.div 
                      key={sponsor.name}
                      variants={sponsorItem}
                      whileHover={{ 
                          scale: 1.1, 
                          filter: "grayscale(0%)", 
                          opacity: 1,
                          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } 
                      }}
                      className="flex items-center justify-center p-4 opacity-50 grayscale transition-all duration-500"
                    >
                      <img src={sponsor.logo} alt={sponsor.name} className="h-8 md:h-10 object-contain invert" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            <FAQ />

            <Footer />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default App;