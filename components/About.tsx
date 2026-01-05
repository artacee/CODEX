import React from 'react';
import { motion } from 'framer-motion';
import { KineticText } from './ui/KineticText';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-surface relative overflow-hidden">
        {/* Massive Drifting Watermark Text - Asymmetry & Overlap */}
        <motion.div 
            style={{ x: -50 }}
            animate={{ x: 50 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
            className="absolute top-20 -left-40 text-[15rem] md:text-[25rem] font-bold text-white/[0.02] pointer-events-none select-none font-display leading-none z-0"
        >
            01
        </motion.div>
        <motion.div 
            style={{ x: 50 }}
            animate={{ x: -50 }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
            className="absolute bottom-40 -right-40 text-[15rem] md:text-[25rem] font-bold text-white/[0.02] pointer-events-none select-none font-display leading-none z-0"
        >
            02
        </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           className="mb-32 md:w-1/2"
        >
             <h2 className="font-display font-bold text-6xl md:text-8xl text-white mb-6 leading-[0.85] tracking-tighter">
                <KineticText>ABOUT</KineticText> <br />
                <span className="text-primary ml-16 md:ml-32 block">CODEX</span>
             </h2>
             <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-2 bg-primary ml-16 md:ml-32" 
             />
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-0">
            {/* Department - Shifted Left, Top */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="md:w-3/5 relative md:pr-20 z-20"
            >
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
                <div className="relative border-l-2 border-white/10 pl-8 md:pl-16 py-2 backdrop-blur-sm">
                    <span className="text-primary font-mono text-xs tracking-[0.2em] mb-6 block">THE GENESIS</span>
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-white mb-8 uppercase leading-none">
                        Department of <br />
                        <span className="text-white/50">Computer Science</span>
                    </h3>
                    <p className="text-muted text-lg md:text-xl leading-relaxed max-w-xl">
                        Established in 2002, the Computer Science Department has steadily evolved to meet the demands of the rapidly changing technological landscape. With over <span className="text-white font-bold">2,400 students</span>, nearly 70% belong to the Computer Science discipline, reflecting our strong academic presence.
                    </p>
                </div>
            </motion.div>

             {/* Hackathon - Shifted Right, Overlapping vertical space but lower */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="md:w-3/5 md:self-end relative md:-mt-16 z-10"
            >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
                 <div className="relative border-r-2 border-white/10 pr-8 md:pr-16 py-2 text-right backdrop-blur-sm flex flex-col items-end">
                    <span className="text-secondary font-mono text-xs tracking-[0.2em] mb-6 block">THE EVENT</span>
                    <h3 className="font-display font-bold text-4xl md:text-5xl text-white mb-8 uppercase leading-none">
                        The <br />
                        <span className="text-white/50">Hackathon</span>
                    </h3>
                    <p className="text-muted text-lg md:text-xl leading-relaxed max-w-xl">
                        A <span className="text-white font-bold">24-hour</span> high-intensity innovation challenge. Participants ideate, design, and build practical solutions to real-world problems, focusing on emerging technologies, rapid prototyping, and creative problem-solving.
                    </p>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};