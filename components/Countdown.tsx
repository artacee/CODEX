import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // Target: Jan 27, 2026 10:00:00 AM
    const targetDate = new Date('2026-01-27T10:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group hover:border-primary/30 transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  mass: 0.8 
                }}
                className="font-display font-bold text-3xl md:text-5xl text-white relative z-10"
              >
                {unit.value < 10 ? `0${unit.value}` : unit.value}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-3 text-xs md:text-sm font-medium text-muted tracking-widest uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};