import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TRACKS } from '../constants';
import { KineticText } from './ui/KineticText';
import { ProblemStatementsModal } from './ProblemStatementsModal';
import { Track } from '../types';

export const Tracks: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <section id="tracks" className="py-32 bg-background relative overflow-hidden">
      {/* Abstract overlapping shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface/50 -skew-x-12 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
             <h2 className="font-display font-bold text-5xl md:text-8xl text-white leading-[0.8] tracking-tighter">
                <KineticText>HACKATHON</KineticText> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">TRACKS</span>
             </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-muted max-w-xs text-right font-mono text-sm uppercase tracking-wider"
          >
            Choose your arena. <br />
            Defy the ordinary.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 max-w-6xl mx-auto">
          {TRACKS.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              // Staggered layout: Shift even items down on desktop
              className={`${index % 2 === 1 ? 'md:mt-32' : 'md:mt-0'} group relative cursor-pointer`}
              onClick={() => setSelectedTrack(track)}
            >
              <div 
                className="relative p-10 rounded-[2rem] bg-surface border border-white/5 overflow-hidden min-h-[450px] flex flex-col justify-between hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
                data-cursor="hover"
              >
                {/* Asymmetric blob background */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 ${track.color} opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity duration-500 rounded-full`} />
                
                <div>
                  <div className="flex justify-between items-start mb-12">
                     <span className="font-mono text-white/20 text-xl">0{index + 1}</span>
                     <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20">
                        <track.icon className="w-8 h-8 text-white" />
                     </div>
                  </div>
                  
                  <h3 className="font-display font-bold text-4xl mb-4 leading-tight group-hover:text-primary transition-colors">{track.title}</h3>
                  <p className="text-muted text-lg leading-relaxed mb-6">{track.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {track.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wide text-white/70 group-hover:bg-white/10 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <div className="h-px w-full bg-white/10 group-hover:bg-white/30 transition-colors mr-6" />
                  <motion.div 
                     whileHover={{ x: 5 }}
                     className="text-sm font-bold uppercase tracking-wider text-primary"
                  >
                    View Problem Statements
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
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