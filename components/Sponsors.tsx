import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from './ui/Button';
import { toast } from './ui/Toaster';
import { SPONSORS } from '../constants';
import { TextScramble } from './ui/TextScramble';

// Single marquee row component
const MarqueeRow: React.FC<{
  sponsors: typeof SPONSORS;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}> = ({ sponsors, direction = 'left', speed = 30, className = '' }) => {
  const items = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div
        className="flex items-center gap-12 md:gap-20"
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {items.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="group relative flex-shrink-0"
            data-cursor="hover"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />

            <div className="relative px-8 py-6 bg-white/[0.03] border border-white/5 rounded-2xl 
                          hover:bg-white/[0.08] hover:border-primary/20 
                          transition-all duration-500 transform hover:scale-105">
              <div className="h-10 md:h-14 w-28 md:w-40 flex items-center justify-center 
                            grayscale hover:grayscale-0 opacity-60 hover:opacity-100 
                            transition-all duration-500">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Animated text reveal
const AnimatedHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const Sponsors: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Split sponsors into rows if we have enough
  const row1 = SPONSORS;
  const row2 = [...SPONSORS].reverse();

  return (
    <section
      ref={containerRef}
      id="sponsors"
      className="relative py-32 md:py-48 bg-surface overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Floating decorative shapes */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 -left-20 w-64 h-64 border border-primary/10 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 -right-32 w-96 h-96 border border-secondary/10 rounded-full"
      />

      {/* Large background text */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[15rem] md:text-[25rem] font-display font-bold text-white/[0.01] 
                   pointer-events-none select-none whitespace-nowrap"
      >
        PARTNERS
      </motion.div>

      {/* Header section */}
      <div className="container mx-auto px-6 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <AnimatedHeading>
            <span className="text-primary font-mono text-xs tracking-[0.3em] block mb-4">
              <TextScramble>[ BACKED BY THE BEST ]</TextScramble>
            </span>
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  OUR
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-primary"
                >
                  PARTNERS
                </motion.span>
              </span>
            </h2>
          </AnimatedHeading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted text-lg md:text-xl max-w-md"
          >
            Powered by organizations who believe in nurturing the next generation of innovators.
          </motion.p>
        </div>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] bg-gradient-to-r from-primary via-white/20 to-transparent mt-12 origin-left"
        />
      </div>

      {/* Marquee rows */}
      <div className="relative space-y-6 md:space-y-8">
        {/* Edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Normal speed, left direction */}
        <MarqueeRow sponsors={row1} direction="left" speed={35} />

        {/* Row 2 - Different speed, right direction for visual interest */}
        <MarqueeRow sponsors={row2} direction="right" speed={40} />
      </div>
    </section>
  );
};
