import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increments for a more organic "loading" feel
        const increment = Math.floor(Math.random() * 5) + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay at 100% before triggering the exit
      const timeout = setTimeout(() => {
        onLoadingComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white overflow-hidden"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] // Custom ease curve for a sleek "curtain lift" effect
        } 
      }}
    >
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">
            <div className="flex items-start mb-8 relative">
                <span className="font-display font-bold text-7xl md:text-9xl tracking-tighter leading-none">
                    {progress}
                </span>
                <span className="text-2xl md:text-4xl font-bold text-primary mt-2 ml-1">%</span>
                
                {/* Decorative brackets */}
                <span className="absolute -left-8 top-0 text-4xl font-light text-white/20 hidden md:block">[</span>
                <span className="absolute -right-8 bottom-0 text-4xl font-light text-white/20 hidden md:block">]</span>
            </div>
            
            <div className="w-full flex flex-col gap-2">
                <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
                
                <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-muted uppercase tracking-widest">
                    <span className="animate-pulse">
                        {progress < 100 ? 'Initializing Core Systems...' : 'Access Granted'}
                    </span>
                    <span>
                        {progress.toString().padStart(3, '0')}/100
                    </span>
                </div>
            </div>
        </div>
        
        {/* Tech Decor */}
        <div className="absolute bottom-8 left-8 text-[10px] font-mono text-white/20 hidden md:block">
            SYSTEM: CODEX_HACKATHON_V2
            <br />
            STATUS: ONLINE
        </div>
        
        <div className="absolute bottom-8 right-8 text-[10px] font-mono text-white/20 hidden md:block text-right">
            LOC: TKM_INSTITUTE
            <br />
            DATE: JAN_27_2026
        </div>
    </motion.div>
  );
};