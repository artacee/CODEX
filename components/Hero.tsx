import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { Countdown } from './Countdown';
import { Typewriter } from './ui/Typewriter';
import { StaggeredText } from './ui/StaggeredText';

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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">

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
          className="mb-8 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tighter leading-[0.9] text-center mb-2">
            TKM INSTITUTE OF <span className="text-white/40">TECHNOLOGY</span>
          </h2>
          <div className="flex items-center gap-4 text-white/60 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-white/20"></span>
            <span className="font-display font-bold text-base md:text-xl tracking-wide uppercase">
              Department of Computer Science & Engineering
            </span>
            <span className="h-[1px] w-8 md:w-12 bg-white/20"></span>
          </div>

          <p className="text-primary font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase pl-2">
            Presents
          </p>
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
            className="w-auto h-20 md:h-32 lg:h-40 object-contain will-change-transform"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: cinemticEase }}
          className="mb-8"
        >
          <div className="text-lg md:text-3xl font-bold uppercase tracking-widest text-white mb-2">
            <StaggeredText
              delay={0.5}
              highlightWords={['Gen', 'AI']}
              highlightClassName="text-primary"
            >
              24 Hour Gen AI Hackathon
            </StaggeredText>
          </div>
          <p className="text-muted text-base md:text-lg font-light tracking-wide">
            <Typewriter
              text='"Where Innovation Meets Execution"'
              delay={2500}
              speed={40}
            />
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: cinemticEase }}
          className="mb-8"
        >
          <Countdown />
        </motion.div>

        {/* Event Details Pills - Now Clickable Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: cinemticEase }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="text"
            data-cursor-text="Add"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-gray-200 font-medium group-hover:text-white transition-colors">January 27 & 28, 2026</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="text"
            data-cursor-text="View"
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