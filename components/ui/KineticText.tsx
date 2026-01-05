import React from 'react';
import { motion } from 'framer-motion';

interface KineticTextProps {
  children: string;
  className?: string;
  baseWeight?: string; // Tailwind class like 'font-light' or 'font-normal'
  hoverWeight?: string; // Tailwind class like 'font-bold'
}

export const KineticText: React.FC<KineticTextProps> = ({ 
  children, 
  className = "",
  baseWeight = "font-normal",
  hoverWeight = "font-bold"
}) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block whitespace-pre cursor-default transition-all duration-200 ${baseWeight}`}
          whileHover={{
            scale: 1.1,
            y: -2,
            fontWeight: 700, // Explicitly jump to bold
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};