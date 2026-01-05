import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Magnetic } from './Magnetic';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-black hover:bg-white",
    secondary: "bg-surface border border-white/10 text-white hover:border-primary hover:text-primary",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black"
  };

  return (
    <Magnetic>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        data-cursor="hover"
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
        </span>
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        )}
      </motion.button>
    </Magnetic>
  );
};