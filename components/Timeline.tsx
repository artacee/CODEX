import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KineticText } from './ui/KineticText';
import { TextScramble } from './ui/TextScramble';
import { Clock, Zap, Code, Coffee, Award, Play, StopCircle, Gamepad2, Sun } from 'lucide-react';

// Flatten schedule for horizontal scroll
const ALL_EVENTS = [
  { time: "08:00 AM", title: "Check-in", icon: Clock, description: "Registration & Swag Collection.", day: 1 },
  { time: "09:00 AM", title: "Opening Ceremony", icon: Play, description: "Keynote, Theme Reveal & Guest Speakers.", day: 1 },
  { time: "10:00 AM", title: "Hack Begins", icon: Zap, description: "The 24-hour timer starts! Get coding.", day: 1, highlight: true },
  { time: "01:00 PM", title: "Lunch Break", icon: Coffee, description: "Fuel up for the marathon ahead.", day: 1 },
  { time: "04:00 PM", title: "Micro Event", icon: Gamepad2, description: "Fun engagement activity & games.", day: 1 },
  { time: "05:00 PM", title: "Mentorship Round 1", icon: Code, description: "Expert validation and guidance for teams.", day: 1 },
  { time: "08:00 PM", title: "Dinner", icon: Coffee, description: "Evening refuel.", day: 1 },
  { time: "10:00 PM", title: "Micro Event", icon: Gamepad2, description: "Late night activity to keep the energy high.", day: 1 },
  { time: "12:00 AM", title: "Midnight Surge", icon: Zap, description: "Midnight surprise & energy boosters.", day: 2 },
  { time: "03:00 AM", title: "Micro Event", icon: Gamepad2, description: "Early morning gaming session.", day: 2 },
  { time: "06:00 AM", title: "Breakfast & Sunrise", icon: Sun, description: "Morning kickstart with a view.", day: 2 },
  { time: "09:00 AM", title: "Final Polish", icon: Code, description: "Last minute bug fixes and deployment.", day: 2 },
  { time: "10:30 AM", title: "Hack Ends", icon: StopCircle, description: "Submissions close. No more commits.", day: 2, highlight: true },
  { time: "11:00 AM", title: "Judging Round", icon: Code, description: "Evaluators visit team tables.", day: 2 },
  { time: "12:00 PM", title: "Final Pitching", icon: Play, description: "Top teams present solutions to the jury.", day: 2 },
  { time: "02:30 PM", title: "Awards Ceremony", icon: Award, description: "Winners announcement & Prize distribution.", day: 2, highlight: true }
];

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Progress line width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="schedule" ref={containerRef} className="relative bg-surface border-y border-white/5" style={{ height: '400vh' }}>
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background Image Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
              style={{ backgroundImage: 'url(/favicon.png)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface pointer-events-none" />
            
            {/* Background Grids */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            {/* Header - Fixed at top */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-24 pb-8 bg-gradient-to-b from-surface via-surface to-transparent">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                    >
                        <div>
                            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">
                                <TextScramble delay={100}>The Plan</TextScramble>
                            </span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl text-white">
                                <KineticText>EVENT SCHEDULE</KineticText>
                            </h2>
                        </div>
                        <p className="text-muted text-base md:text-lg max-w-md">
                            24 hours of non-stop innovation. Scroll to explore the timeline.
                        </p>
                    </motion.div>
                    
                    {/* Progress Bar */}
                    <div className="mt-8 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-primary via-white to-secondary"
                            style={{ width: progressWidth }}
                        />
                    </div>
                    
                    {/* Day Markers */}
                    <div className="flex justify-between mt-2 text-xs font-mono text-muted">
                        <span>DAY 01 — JAN 27</span>
                        <span>DAY 02 — JAN 28</span>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <motion.div 
                className="absolute top-1/2 -translate-y-1/4 left-0 flex gap-8 px-12 md:px-24"
                style={{ x }}
            >
                {ALL_EVENTS.map((event, index) => {
                    const Icon = event.icon;
                    const isNewDay = index === 0 || ALL_EVENTS[index - 1].day !== event.day;
                    
                    return (
                        <React.Fragment key={index}>
                            {/* Day Divider */}
                            {isNewDay && index !== 0 && (
                                <div className="flex items-center justify-center min-w-[100px]">
                                    <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary to-transparent" />
                                </div>
                            )}
                            
                            {/* Event Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20%" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                data-cursor="hover"
                                className={`
                                    relative min-w-[280px] md:min-w-[320px] p-6 rounded-2xl border backdrop-blur-sm
                                    transition-all duration-500 group cursor-pointer
                                    ${event.highlight 
                                        ? 'bg-primary/10 border-primary/30 hover:border-primary hover:bg-primary/20' 
                                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                                    }
                                `}
                            >
                                {/* Day Badge */}
                                <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider
                                    ${event.day === 1 ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}
                                `}>
                                    Day {event.day}
                                </div>
                                
                                {/* Time */}
                                <div className="flex items-center gap-3 mb-4 mt-2">
                                    <div className={`
                                        w-10 h-10 rounded-xl flex items-center justify-center
                                        ${event.highlight ? 'bg-primary/20' : 'bg-white/10'}
                                        group-hover:scale-110 transition-transform duration-300
                                    `}>
                                        <Icon className={`w-5 h-5 ${event.highlight ? 'text-primary' : 'text-white'}`} />
                                    </div>
                                    <span className="font-mono text-sm text-primary">{event.time}</span>
                                </div>
                                
                                {/* Title */}
                                <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 leading-tight">
                                    {event.title}
                                </h4>
                                
                                {/* Description */}
                                <p className="text-sm text-muted leading-relaxed">
                                    {event.description}
                                </p>
                                
                                {/* Decorative corner */}
                                <div className={`
                                    absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl rounded-br-2xl
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                    ${event.highlight ? 'bg-primary/10' : 'bg-white/5'}
                                `} />
                                
                                {/* Index Number */}
                                <div className="absolute bottom-4 right-4 font-display font-bold text-4xl text-white/5 group-hover:text-white/10 transition-colors">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </motion.div>
                        </React.Fragment>
                    );
                })}
                
                {/* End Card */}
                <motion.div 
                    className="min-w-[280px] md:min-w-[320px] p-8 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Award className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted text-sm">End of the journey.</p>
                    <p className="text-white font-bold mt-1">See you at CODEX 2026!</p>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
                <motion.div 
                    className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div 
                        className="w-1 h-2 bg-primary rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    </section>
  );
};