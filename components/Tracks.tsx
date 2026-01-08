import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TRACKS } from '../constants';
import { KineticText } from './ui/KineticText';
import { TextScramble } from './ui/TextScramble';
import { Magnetic } from './ui/Magnetic';
import { ProblemStatementsModal } from './ProblemStatementsModal';
import { Track } from '../types';

// Track gradient colors for premium look
const TRACK_GRADIENTS: Record<string, { from: string; to: string; glow: string }> = {
  digital: { from: 'from-blue-500', to: 'to-cyan-400', glow: 'blue-500' },
  smart: { from: 'from-purple-500', to: 'to-pink-400', glow: 'purple-500' },
  open: { from: 'from-amber-400', to: 'to-orange-500', glow: 'amber-500' },
};

export const Tracks: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={containerRef}
      id="tracks"
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
        style={{ backgroundImage: 'url(/loader.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Large background number */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 -translate-y-1/2 -right-20 text-[30vw] font-display font-bold text-white/[0.02] leading-none pointer-events-none select-none"
      >
        03
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <span className="text-primary font-mono text-xs tracking-[0.3em] block mb-4">
                <TextScramble delay={100}>[ CHOOSE YOUR PATH ]</TextScramble>
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
                    <KineticText>HACKATHON</KineticText>
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary"
                  >
                    TRACKS
                  </motion.span>
                </span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-white">{TRACKS.length}</p>
                <p className="text-muted text-sm">Innovation Arenas</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] bg-gradient-to-r from-primary via-white/20 to-transparent mt-12 origin-left"
          />
        </div>

        {/* Premium Track Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {TRACKS.map((track, index) => {
            const gradient = TRACK_GRADIENTS[track.id] || TRACK_GRADIENTS.digital;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedTrack(track)}
                className="group relative cursor-pointer"
              >
                {/* Card glow effect */}
                <motion.div
                  animate={{ opacity: isHovered ? 0.6 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute -inset-1 bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-[2rem] blur-2xl`}
                />

                {/* Main card */}
                <div
                  className="relative h-full min-h-[500px] rounded-[2rem] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border border-white/[0.1] backdrop-blur-xl p-8 md:p-10 overflow-hidden flex flex-col transition-all duration-500 group-hover:border-white/20"
                  data-cursor="hover"
                >
                  {/* Animated gradient orb inside card */}
                  <motion.div
                    animate={{
                      x: isHovered ? [0, 20, 0] : 0,
                      y: isHovered ? [0, -10, 0] : 0,
                      scale: isHovered ? 1.2 : 1
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                  />

                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                      <motion.span
                        animate={{ opacity: isHovered ? 1 : 0.3 }}
                        className={`font-mono text-5xl font-bold bg-gradient-to-br ${gradient.from} ${gradient.to} bg-clip-text text-transparent`}
                      >
                        0{index + 1}
                      </motion.span>

                      {/* Icon container */}
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          rotate: isHovered ? 6 : 0
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient.from}/20 ${gradient.to}/10 border border-white/10 flex items-center justify-center backdrop-blur-sm`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                        <track.icon className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h3
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display font-bold text-3xl md:text-4xl text-white mb-4 leading-tight"
                    >
                      {track.title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-muted text-lg leading-relaxed mb-8 flex-1">
                      {track.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {track.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + tagIndex * 0.05 }}
                          className={`px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wide text-white/70 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Magnetic>
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${gradient.from}/10 ${gradient.to}/10 border border-white/10 group-hover:border-white/20 transition-all duration-300`}
                        >
                          <span className="text-sm font-bold uppercase tracking-wider text-white">
                            View Problems
                          </span>
                          <motion.div
                            animate={{ x: isHovered ? 5 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className={`w-4 h-4 text-white`} />
                          </motion.div>
                        </motion.div>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ProblemStatementsModal
        isOpen={!!selectedTrack}
        onClose={() => setSelectedTrack(null)}
        track={selectedTrack}
      />
    </section>
  );
};