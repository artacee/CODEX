import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  const content = "BUILD • DEPLOY • INNOVATE • CODEX 2026 • AI REVOLUTION • ";
  // Repeat content enough times to fill typical screens width plus buffer
  const repeatedContent = new Array(4).fill(content).join("");

  return (
    <div className="relative flex overflow-hidden py-4 bg-primary border-y border-black/10 select-none z-20 transform -skew-y-1">
      {/* Gradient masks to soften edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 hidden" />

      <motion.div
        className="flex whitespace-nowrap font-display font-bold text-4xl text-black !text-black uppercase tracking-tighter will-change-transform"
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20
        }}
      >
        <span className="mr-4">{repeatedContent}</span>
        <span className="mr-4">{repeatedContent}</span>
      </motion.div>
    </div>
  );
};