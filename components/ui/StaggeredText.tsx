import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  highlightWords = [],
  highlightClassName = 'text-primary'
}) => {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay * 3,
        delayChildren: delay,
      },
    }),
  };

  const wordAnimation = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const letterAnimation = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1000 }}
    >
      {words.map((word, wordIndex) => {
        const isHighlighted = highlightWords.includes(word);
        
        return (
          <motion.span
            key={wordIndex}
            className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
            variants={wordAnimation}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={letterAnimation}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
