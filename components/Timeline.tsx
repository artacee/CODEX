import React from 'react';
import { motion } from 'framer-motion';
import { KineticText } from './ui/KineticText';
import { Clock, Zap, Code, Coffee, Award, Play, StopCircle, Gamepad2, Sun } from 'lucide-react';

const SCHEDULE = [
  {
    day: "DAY 01",
    date: "January 27",
    items: [
      { time: "08:00 AM", title: "Check-in", icon: Clock, description: "Registration & Swag Collection." },
      { time: "09:00 AM", title: "Opening Ceremony", icon: Play, description: "Keynote, Theme Reveal & Guest Speakers." },
      { time: "10:00 AM", title: "Hack Begins", icon: Zap, description: "The 24-hour timer starts! Get coding." },
      { time: "01:00 PM", title: "Lunch Break", icon: Coffee, description: "Fuel up for the marathon ahead." },
      { time: "04:00 PM", title: "Micro Event", icon: Gamepad2, description: "Fun engagement activity & games." },
      { time: "05:00 PM", title: "Mentorship Round 1", icon: Code, description: "Expert validation and guidance for teams." },
      { time: "08:00 PM", title: "Dinner", icon: Coffee, description: "Evening refuel." },
      { time: "10:00 PM", title: "Micro Event", icon: Gamepad2, description: "Late night activity to keep the energy high." }
    ]
  },
  {
    day: "DAY 02",
    date: "January 28",
    items: [
      { time: "12:00 AM", title: "Micro Event", icon: Zap, description: "Midnight surprise & energy boosters." },
      { time: "03:00 AM", title: "Micro Event", icon: Gamepad2, description: "Early morning gaming session." },
      { time: "06:00 AM", title: "Breakfast & Sunrise", icon: Sun, description: "Morning kickstart with a view." },
      { time: "09:00 AM", title: "Final Polish", icon: Code, description: "Last minute bug fixes and deployment." },
      { time: "10:30 AM", title: "Hack Ends", icon: StopCircle, description: "Submissions close. No more commits." },
      { time: "11:00 AM", title: "Judging Round", icon: Code, description: "Evaluators visit team tables." },
      { time: "12:00 PM", title: "Final Pitching", icon: Play, description: "Top teams present solutions to the jury." },
      { time: "02:30 PM", title: "Awards Ceremony", icon: Award, description: "Winners announcement & Prize distribution." }
    ]
  }
];

export const Timeline: React.FC = () => {
  return (
    <section id="schedule" className="py-32 bg-surface relative overflow-hidden border-y border-white/5">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-20 text-center"
            >
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">The Plan</span>
                <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
                    <KineticText>EVENT SCHEDULE</KineticText>
                </h2>
                <p className="text-muted text-lg max-w-2xl mx-auto">
                    24 hours of non-stop innovation. Here is how it unfolds.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 max-w-6xl mx-auto">
                {SCHEDULE.map((day, dayIndex) => (
                    <motion.div 
                        key={day.day} 
                        className="relative"
                        initial={{ opacity: 0, x: dayIndex === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Day Header */}
                        <div className="mb-12 flex items-end gap-4 border-b border-white/10 pb-4">
                            <h3 className="text-4xl font-display font-bold text-white">{day.day}</h3>
                            <span className="text-primary font-mono text-sm uppercase tracking-wider mb-2">{day.date}</span>
                        </div>

                        {/* Timeline Items */}
                        <div className="space-y-8 border-l border-white/10 pl-8 ml-3 relative">
                            {day.items.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + (index * 0.1), duration: 0.5 }}
                                    className="relative group"
                                >
                                    {/* Dot */}
                                    <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-surface border border-white/20 group-hover:border-primary group-hover:scale-110 transition-all duration-300 flex items-center justify-center z-10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-primary transition-colors" />
                                    </div>
                                    {/* Line Glow */}
                                    <div className="absolute -left-[35px] top-6 bottom-0 w-[1px] bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                                        <span className="font-mono text-sm text-primary/80 min-w-[80px] pt-1">{item.time}</span>
                                        <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <item.icon className="w-4 h-4 text-white" />
                                                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                            </div>
                                            <p className="text-sm text-muted">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};