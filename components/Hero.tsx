import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Calendar, MousePointer2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Countdown } from './Countdown';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Transforms
  const yGlow1 = useTransform(scrollY, [0, 500], [0, 200]);
  const yGlow2 = useTransform(scrollY, [0, 500], [0, -150]);
  const yGrid = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityGrid = useTransform(scrollY, [0, 500], [1, 0.5]);
  const yContent = useTransform(scrollY, [0, 500], [0, 50]);
  const opacityContent = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Rotation for the circular text based on scroll
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const cinemticEase = [0.22, 1, 0.36, 1] as const;

  // Google Calendar URL (Jan 27 10:00 AM IST to Jan 28 10:00 AM IST -> 04:30 UTC)
  const googleCalendarUrl = encodeURI(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=CODEX 2026 - Gen AI Hackathon&dates=20260127T043000Z/20260128T043000Z&details=Join the revolution at CODEX 2026! A 24-hour Gen AI Hackathon at TKM Institute of Technology.&location=TKM Institute of Technology, Karuvelil, Kerala"
  );
  
  const mapsUrl = "https://maps.app.goo.gl/WgmxeVuQPEu4GKyv7";

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      
      {/* Primary Green Glow - Moves Down */}
      <motion.div 
        style={{ y: yGlow1 }}
        className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" 
      />
      {/* Secondary Blue Glow - Moves Up */}
      <motion.div 
        style={{ y: yGlow2 }}
        className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" 
      />

      {/* Parallax Grid - Scaled up to cover movement */}
      <motion.div 
        style={{ y: yGrid, opacity: opacityGrid }}
        className="absolute -inset-[10%] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_70%,transparent_100%)] z-0"
      />
      
      {/* Spinning Text Badge - Fixed position relative to Hero but rotates on scroll */}
      <motion.div 
        style={{ rotate }}
        className="absolute bottom-20 right-[10%] w-32 h-32 md:w-40 md:h-40 hidden lg:flex items-center justify-center z-20 pointer-events-none opacity-50"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="font-mono text-[10px] font-bold fill-white uppercase tracking-[0.15em]">
                <textPath href="#circlePath">
                    • Scroll to Explore • Codex 2026 
                </textPath>
            </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
        </div>
      </motion.div>

      {/* Main Content with subtle parallax fade */}
      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        {/* Presented By */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinemticEase }}
          className="mb-8"
        >
          <div className="inline-block border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl">
            <h3 className="text-white font-bold tracking-widest uppercase text-sm md:text-base mb-1">
              TKM Institute of Technology
            </h3>
            <p className="text-muted text-xs md:text-sm uppercase tracking-wider">
              Department of Computer Science & Engineering Presents
            </p>
          </div>
        </motion.div>

        {/* Main Title - CODEX Constructed Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: cinemticEase }}
          className="flex items-center justify-center mb-6"
        >
          <div className="font-display font-bold text-7xl md:text-9xl lg:text-[12rem] tracking-tighter leading-none flex items-center select-none group">
            <span className="text-primary transition-transform duration-300 group-hover:-translate-x-4">C</span>
            <div className="relative mx-[0.05em] flex items-center justify-center">
              <span className="text-primary group-hover:scale-110 transition-transform duration-300">O</span>
              <MousePointer2 
                className="absolute top-[25%] left-[25%] w-[60%] h-[60%] text-white fill-white stroke-none drop-shadow-xl transform -rotate-12 group-hover:rotate-12 transition-transform duration-300" 
                strokeWidth={0}
              />
            </div>
            <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">D</span>
            <span className="text-primary transition-transform duration-300 group-hover:translate-x-4">E</span>
            <span className="text-secondary transition-transform duration-300 group-hover:translate-x-8 group-hover:rotate-12">X</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: cinemticEase }}
          className="mb-10"
        >
          <div className="text-xl md:text-4xl font-bold uppercase tracking-widest text-white mb-4">
            24 Hour <span className="text-primary">Gen AI</span> Hackathon
          </div>
          <p className="text-muted text-lg md:text-xl font-light italic tracking-wide">
            "Where Innovation Meets Execution"
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: cinemticEase }}
        >
          <Countdown />
        </motion.div>

        {/* Event Details Pills - Now Clickable Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: cinemticEase }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a 
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-gray-200 font-medium group-hover:text-white transition-colors">January 27 & 28, 2026</span>
          </a>

          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-secondary/50 transition-all cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
            <span className="text-gray-200 font-medium group-hover:text-white transition-colors">TKM Institute of Technology</span>
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: cinemticEase }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Button icon={<ArrowRight className="w-4 h-4" />} className="w-full md:w-auto h-14 text-base">
            Register Now
          </Button>
          <Button variant="outline" className="w-full md:w-auto h-14 text-base">
            Download Brochure
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
};