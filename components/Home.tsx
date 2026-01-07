import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero } from './Hero';
import { Marquee } from './ui/Marquee';
import { About } from './About';
import { Tracks } from './Tracks';
import { Timeline } from './Timeline';
import { Prizes } from './Prizes';
import { FAQ } from './FAQ';
import { Sponsors } from './Sponsors';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
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

  return (
    <motion.div style={{ backgroundColor }} className="relative transition-colors duration-500">
      <Hero onNavigate={onNavigate} />

      <Marquee />

      <About />
      
      <Tracks />
      
      <Timeline />
      
      <Prizes />

      <Sponsors />

      <FAQ />
    </motion.div>
  );
};