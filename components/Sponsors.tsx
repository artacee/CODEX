import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { toast } from './ui/Toaster';
import { SPONSORS } from '../constants';
import { TextScramble } from './ui/TextScramble';
import { Magnetic } from './ui/Magnetic';

const COLLAB_EMAIL = 'collab@codextki.dev';

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(COLLAB_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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

      {/* Become a Sponsor CTA Card - Premium Design */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="container mx-auto px-6 mt-24 md:mt-40"
      >
        <div className="relative group">
          {/* Animated gradient background blur */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700" />

          {/* Main card */}
          <div className="relative rounded-[2rem] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border border-white/[0.12] backdrop-blur-xl p-10 md:p-16 overflow-hidden">
            {/* Animated gradient orbs */}
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
            />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left side - Icon and text */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                {/* Animated icon container */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-40" />
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                </motion.div>

                {/* Text content */}
                <div className="max-w-md">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-primary/80 font-mono text-xs tracking-[0.25em] uppercase mb-3 block"
                  >
                    Join Our Journey
                  </motion.span>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="font-display font-bold text-3xl md:text-4xl text-white mb-3 tracking-tight"
                  >
                    Become a{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
                      Sponsor
                    </span>
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-muted text-lg leading-relaxed"
                  >
                    Partner with us to nurture the next generation of tech innovators and visionaries.
                  </motion.p>
                </div>
              </div>

              {/* Right side - Premium button */}
              <Magnetic strength={0.3}>
                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="text"
                  data-cursor-text={copied ? "Copied!" : "Mail"}
                  className={`relative group/btn overflow-hidden px-10 py-5 rounded-full transition-all duration-500 ${copied
                      ? 'bg-gradient-to-r from-primary to-primary/90'
                      : 'bg-white/[0.03] hover:bg-white/[0.08]'
                    }`}
                >
                  {/* Button glow effect */}
                  <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${copied ? 'opacity-100' : 'opacity-0 group-hover/btn:opacity-100'
                    }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 blur-xl" />
                  </div>

                  {/* Button border */}
                  <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${copied
                      ? 'border-primary/50'
                      : 'border-white/10 group-hover/btn:border-primary/30'
                    }`} />

                  {/* Button content */}
                  <span className="relative z-10 flex items-center gap-4">
                    <span className={`font-bold text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${copied ? 'text-black' : 'text-white group-hover/btn:text-primary'
                      }`}>
                      {copied ? 'Copied!' : 'Mail Us'}
                    </span>
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Check className="w-5 h-5 text-black" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0, x: -10 }}
                          animate={{ scale: 1, x: 0 }}
                          exit={{ scale: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <Copy className="w-5 h-5 text-white/70 group-hover/btn:text-primary transition-colors duration-300" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
