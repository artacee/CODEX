import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-0 top-0 bottom-0 w-1.5 z-50 hidden md:block">
      <div className="absolute inset-0 bg-white/5" />
      <motion.div 
        className="w-full bg-gradient-to-b from-primary via-white to-secondary origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
};