import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { Countdown } from './Countdown';
import { Typewriter } from './ui/Typewriter';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Transforms
  const yGlow1 = useTransform(scrollY, [0, 500], [0, 200]);
  const yGlow2 = useTransform(scrollY, [0, 500], [0, -150]);
  const yGrid = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityGrid = useTransform(scrollY, [0, 500], [1, 0.5]);
  const yContent = useTransform(scrollY, [0, 500], [0, 50]);
  
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

      {/* Main Content with subtle parallax */}
      <motion.div 
        style={{ y: yContent }}
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

        {/* Main Title - CODEX Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: cinemticEase }}
          className="flex items-center justify-center mb-6"
        >
          <img 
            src="/logo.png" 
            alt="CODEX Logo" 
            loading="eager"
            className="w-auto h-32 md:h-48 lg:h-64 object-contain will-change-transform"
          />
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
          <p className="text-muted text-lg md:text-xl font-light tracking-wide">
            <Typewriter 
              text='"Where Innovation Meets Execution"' 
              delay={1500} 
              speed={40}
            />
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
          <Button 
            icon={<ArrowRight className="w-4 h-4" />} 
            className="w-full md:w-auto h-14 text-base"
            onClick={() => onNavigate?.('register')}
          >
            Register Now
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