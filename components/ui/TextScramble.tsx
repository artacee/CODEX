import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextScrambleProps {
  children: string;
  className?: string;
  speed?: number; // ms per character
  scrambleSpeed?: number; // ms between scramble updates
  delay?: number; // initial delay before starting
  trigger?: 'mount' | 'inView' | 'hover';
  characters?: string;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  children,
  className = '',
  speed = 50,
  scrambleSpeed = 30,
  delay = 0,
  trigger = 'inView',
  characters = '!<>-_\\/[]{}—=+*^?#@$%&01',
}) => {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    if (hasAnimated && trigger !== 'hover') return;

    setIsScrambling(true);
    setHasAnimated(true);

    const originalText = children;
    const length = originalText.length;
    let iteration = 0;

    // Clear any existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            // Keep spaces as spaces
            if (char === ' ') return ' ';

            // Characters before the current iteration are revealed
            if (index < iteration) {
              return originalText[index];
            }

            // Characters at or after iteration get scrambled
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      // Increment based on speed - faster speed = more characters per tick
      iteration += 1 / (speed / scrambleSpeed);

      if (iteration >= length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (trigger === 'mount') {
      timeoutRef.current = setTimeout(scramble, delay);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger === 'inView' && isInView && !hasAnimated) {
      timeoutRef.current = setTimeout(scramble, delay);
    }
  }, [isInView]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble();
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: trigger === 'inView' ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={`inline-block ${isScrambling && char !== children[i] && char !== ' '
              ? 'text-primary'
              : ''
            }`}
          style={{
            transition: 'color 0.1s ease',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </motion.span>
  );
};

// Alternative: Decode effect that reveals from encrypted state
interface DecodeTextProps {
  children: string;
  className?: string;
  interval?: number;
  delay?: number;
}

export const DecodeText: React.FC<DecodeTextProps> = ({
  children,
  className = '',
  interval = 100,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const chars = '▓▒░█▄▀■□●○◆◇';

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      if (currentIndex <= children.length) {
        const revealed = children.slice(0, currentIndex);
        const encrypted = children
          .slice(currentIndex)
          .split('')
          .map((char) =>
            char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('');

        setDisplayText(revealed + encrypted);
        setCurrentIndex((prev) => prev + 1);
      }
    }, currentIndex === 0 ? delay : interval);

    return () => clearTimeout(timeout);
  }, [isInView, currentIndex, children, interval, delay]);

  useEffect(() => {
    if (isInView && displayText === '') {
      // Initialize with encrypted text
      setDisplayText(
        children
          .split('')
          .map((char) =>
            char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('')
      );
    }
  }, [isInView]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={`inline-block ${i >= currentIndex - 1 && char !== ' ' ? 'text-primary' : ''
            }`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
