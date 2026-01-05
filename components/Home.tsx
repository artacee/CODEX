import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero } from './Hero';
import { Marquee } from './ui/Marquee';
import { About } from './About';
import { Tracks } from './Tracks';
import { IdeaGenerator } from './IdeaGenerator';
import { Prizes } from './Prizes';
import { FAQ } from './FAQ';
import { SPONSORS } from '../constants';
import { ScrollProgress } from './ui/ScrollProgress';

export const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Scrollytelling Background Transition
  // Uses semi-transparent colors to let the Scene3D stars show through
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      "rgba(5, 5, 5, 0.0)",   // Hero: Transparent (shows app bg)
      "rgba(5, 20, 10, 0.8)",  // About: Dark Green Tint
      "rgba(5, 10, 30, 0.9)",  // Tracks: Dark Blue Tint
      "rgba(20, 10, 5, 0.8)",  // Prizes: Dark Orange/Red Tint
      "rgba(5, 5, 5, 0.9)"     // Footer: Back to Dark
    ]
  );

  // Quadruple the sponsors to ensure seamless loop animation
  // We animate x to -50% (half width), so we need 2 full visual sets. 
  // 4 repeats ensures we have plenty of content width.
  const marqueeSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <motion.div style={{ backgroundColor }} className="relative transition-colors duration-500">
      <ScrollProgress />
      
      <Hero />

      <Marquee />

      <About />
      
      <Tracks />
      
      <IdeaGenerator />
      
      <Prizes />

      {/* Sponsors Section - Scrolling Marquee */}
      <section id="sponsors" className="py-32 border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display font-bold text-3xl text-white/40 uppercase tracking-[0.2em]"
          >
            Backed By Industry Leaders
          </motion.h2>
        </div>
        
        <div className="relative w-full flex">
            {/* Gradient Masks for fade effect at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <motion.div 
                className="flex items-center gap-16 md:gap-32 min-w-max px-16"
                animate={{ x: "-50%" }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 40 // Slow, smooth scroll speed
                }}
            >
                {marqueeSponsors.map((sponsor, index) => (
                    <div 
                        key={`${sponsor.name}-${index}`} 
                        className="group relative flex flex-col items-center justify-center cursor-pointer"
                        data-cursor="hover"
                    >
                        <div className="relative h-12 md:h-16 w-32 md:w-48 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 transform group-hover:scale-110">
                             <img 
                                src={sponsor.logo} 
                                alt={sponsor.name} 
                                className="max-h-full max-w-full object-contain invert"
                                draggable={false}
                             />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      <FAQ />
    </motion.div>
  );
};