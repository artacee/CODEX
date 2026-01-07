import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface CounterProps {
  value: number;
  direction?: 'up' | 'down';
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  direction = 'up',
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const spring = useSpring(direction === 'up' ? 0 : value, {
    mass: 1,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) => {
    return current.toFixed(decimals);
  });

  const [displayValue, setDisplayValue] = useState(direction === 'up' ? '0' : String(value));

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(direction === 'up' ? value : 0);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, spring, value, direction, delay]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <motion.span
      ref={ref}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
};

// Formatted counter for currency (₹50,000 style)
interface CurrencyCounterProps {
  value: number;
  currency?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const CurrencyCounter: React.FC<CurrencyCounterProps> = ({
  value,
  currency = '₹',
  duration = 2,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 15,
    duration: duration * 1000,
  });

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, spring, value, delay]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      // Format with commas (Indian numbering)
      const formatted = Math.round(latest).toLocaleString('en-IN');
      setDisplayValue(formatted);
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <motion.span
      ref={ref}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
    >
      {currency}{displayValue}
    </motion.span>
  );
};

// Slot machine style counter
interface SlotCounterProps {
  value: string | number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const SlotCounter: React.FC<SlotCounterProps> = ({
  value,
  duration = 2,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const chars = String(value).split('');

  return (
    <div ref={ref} className={`inline-flex overflow-hidden ${className}`}>
      {chars.map((char, index) => {
        const isNumber = /\d/.test(char);
        
        if (!isNumber) {
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: delay + index * 0.05 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        }

        return (
          <motion.div
            key={index}
            className="relative h-[1.2em] overflow-hidden"
            initial={{ width: 0 }}
            animate={isInView ? { width: 'auto' } : {}}
            transition={{ delay: delay + index * 0.05, duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col"
              initial={{ y: '-100%' }}
              animate={isInView ? { y: `${-parseInt(char) * 10}%` } : {}}
              transition={{
                delay: delay + index * 0.1,
                duration: duration,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <span key={num} className="h-[1.2em] flex items-center justify-center">
                  {num}
                </span>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
