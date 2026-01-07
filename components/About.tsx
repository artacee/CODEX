import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { KineticText } from './ui/KineticText';
import { TextScramble } from './ui/TextScramble';
import { Counter } from './ui/Counter';

// Animated line that draws on scroll
const AnimatedLine: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`origin-left ${className}`}
  />
);

// Text reveal component with stagger
const RevealText: React.FC<{ children: string; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const words = children.split(' ');
  
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ 
              duration: 0.5, 
              delay: delay + i * 0.03,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative bg-surface overflow-hidden"
    >
      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Massive floating numbers - parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-20 -left-20 text-[20rem] md:text-[35rem] font-bold text-white/[0.015] pointer-events-none select-none font-display leading-none z-0"
      >
        01
      </motion.div>
      <motion.div 
        style={{ y: y2, rotate }}
        className="absolute top-1/2 -right-32 text-[15rem] md:text-[25rem] font-bold text-primary/[0.03] pointer-events-none select-none font-display leading-none z-0"
      >
        ©
      </motion.div>

      {/* Hero section with large typography */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left column - Section label */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-32">
                <span className="text-primary font-mono text-xs tracking-[0.3em] block mb-4">
                  <TextScramble>[ 01 ]</TextScramble>
                </span>
                <span className="text-muted text-sm uppercase tracking-[0.2em] block writing-mode-vertical md:writing-mode-horizontal">
                  ABOUT US
                </span>
                <AnimatedLine className="w-12 h-[1px] bg-white/20 mt-4" delay={0.3} />
              </div>
            </motion.div>

            {/* Center column - Main content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9] tracking-tighter">
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: '100%' }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      <KineticText>WHERE</KineticText>
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
                      INNOVATION
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: '100%' }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="block text-white/50"
                    >
                      BEGINS
                    </motion.span>
                  </span>
                </h2>
              </motion.div>

              {/* Description with reveal animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-2xl"
              >
                <p className="text-xl md:text-2xl text-muted leading-relaxed mb-8">
                  <RevealText delay={0.5}>
                    The Department of Computer Science at TKM Institute of Technology has been a cornerstone of technological education since 2002, nurturing the next generation of innovators and tech leaders.
                  </RevealText>
                </p>
                
                <AnimatedLine className="w-24 h-[2px] bg-gradient-to-r from-primary to-secondary mb-8" delay={0.6} />
                
                <p className="text-lg text-muted/80 leading-relaxed">
                  <RevealText delay={0.7}>
                    CODEX is our flagship 24-hour hackathon where creativity meets code. Teams collaborate intensively to build solutions for real-world challenges, pushing the boundaries of what's possible.
                  </RevealText>
                </p>
              </motion.div>
            </div>

            {/* Right column - Visual element */}
            <motion.div 
              style={{ y: y3 }}
              className="lg:col-span-3 relative hidden lg:block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="sticky top-32"
              >
                {/* Decorative shape */}
                <div className="relative w-48 h-48 ml-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-primary/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-secondary/20 rounded-full"
                  />
                  <div className="absolute inset-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-white/20">CX</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom content - Bento-style cards */}
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1 - The Genesis */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-primary/20 transition-colors duration-500"
              data-cursor="hover"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <span className="inline-block text-primary font-mono text-xs tracking-[0.2em] mb-6 px-3 py-1 border border-primary/30 rounded-full">
                  <TextScramble delay={200}>THE GENESIS</TextScramble>
                </span>
                
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                  Department of<br />
                  <span className="text-white/40">Computer Science</span>
                </h3>
                
                <p className="text-muted text-lg leading-relaxed mb-8">
                  Established in <span className="text-white font-semibold">2002</span>, our department is the largest at TKM College of Engineering. With over <span className="text-white font-semibold"><Counter value={2400} suffix="+" duration={2} /></span> students across the college, nearly <span className="text-white font-semibold"><Counter value={70} suffix="%" duration={1.5} /></span> belong to Computer Science — a testament to our excellence in tech education.
                </p>
                
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-primary">
                      <Counter value={22} suffix="+" duration={1.5} />
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider">Years</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-white">
                      <Counter value={840} suffix="+" duration={2} />
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider">CS Students</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-white">
                      <Counter value={70} suffix="%" duration={1.5} />
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider">Of College</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - The Event */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-secondary/20 transition-colors duration-500"
              data-cursor="hover"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <span className="inline-block text-secondary font-mono text-xs tracking-[0.2em] mb-6 px-3 py-1 border border-secondary/30 rounded-full">
                  <TextScramble delay={400}>THE EVENT</TextScramble>
                </span>
                
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                  <span className="text-secondary"><Counter value={24} duration={1.5} /></span> Hours of<br />
                  <span className="text-white/40">Pure Innovation</span>
                </h3>
                
                <p className="text-muted text-lg leading-relaxed mb-8">
                  A high-intensity hackathon where teams ideate, design, and build practical solutions to real-world problems. <span className="text-white font-semibold"><Counter value={100} suffix="+" duration={1.5} /></span> teams compete across <span className="text-white font-semibold"><Counter value={5} duration={1} /></span> specialized tracks.
                </p>
                
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-secondary">
                      <Counter value={100} suffix="+" duration={1.5} />
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider">Teams</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-white">
                      <Counter value={5} duration={1} />
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider">Tracks</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-white">
                      <Counter value={20} suffix="+" duration={1.5} />
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider">Mentors</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16 md:mt-24"
          >
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
              Join us in shaping the future of technology.{' '}
              <span className="text-primary">Be part of the revolution.</span>
            </p>
            <button
            type="button"
            aria-label="Email collab at codextki.dev to become a sponsor"
            onClick={() => {
                window.location.href = 'mailto:collab@codextki.dev?subject=Become%20a%20Sponsor%20-%20CODEX%20Hackathon';
            }}
            className="inline-block mt-8 px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:bg-secondary transition-colors duration-300 cursor-pointer"
            >
            Become a Sponsor
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};