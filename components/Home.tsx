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
    <motion.div style={{ backgroundColor }} className="relative transition-colors duration-500">
      <ScrollProgress />
      
      <Hero />

      <Marquee />

      <About />
      
      <Tracks />
      
      <IdeaGenerator />
      
      <Prizes />

      {/* Sponsors Section */}
      <section id="sponsors" className="py-24 border-t border-white/5 bg-black/40 backdrop-blur-sm">
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
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-8 md:h-10 object-contain invert"
                  loading="lazy" 
                  decoding="async"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FAQ />
    </motion.div>
  );
};