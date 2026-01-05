import React from 'react';
import { motion } from 'framer-motion';
import { PRIZES } from '../constants';
import { Trophy } from 'lucide-react';
import { KineticText } from './ui/KineticText';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.9, 
      ease: [0.22, 1, 0.36, 1] as const
    } 
  }
};

export const Prizes: React.FC = () => {
  return (
    <section id="prizes" className="py-32 relative overflow-hidden">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col items-center justify-center gap-2 mb-4"
          >
             <h2 className="font-display font-bold text-5xl md:text-9xl text-white leading-none">
                <KineticText>EPIC</KineticText>
             </h2>
             <h2 className="font-display font-bold text-5xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 leading-none">
                <KineticText>PRIZES</KineticText>
             </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-muted font-mono uppercase tracking-[0.3em] text-sm mt-8"
          >
              Compete for glory and gear.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center md:items-end justify-center max-w-6xl mx-auto min-h-[500px]"
        >
          {/* 
             Array is reordered to: [1st Place Obj, 2nd Place Obj, 3rd Place Obj]
             This allows us to map them, but visual order on Desktop will be controlled by CSS 'order' property.
             
             Visual Desired Order (Left to Right): 2nd, 1st, 3rd
             Vertical Height: 1st (Highest), 2nd (Middle), 3rd (Lowest)
          */}
          {[PRIZES[1], PRIZES[0], PRIZES[2]].map((prize, index) => {
            const isFirst = index === 0;  // 1st Place Data
            const isSecond = index === 1; // 2nd Place Data
            const isThird = index === 2;  // 3rd Place Data

            return (
              <motion.div
                key={prize.place}
                variants={item}
                className={`
                    relative w-full md:w-[32%] 
                    mb-8 md:mb-0 transition-all duration-500
                    ${isFirst ? 'md:order-2 z-30 md:mb-24' : ''}
                    ${isSecond ? 'md:order-1 z-20 md:mb-12 md:-mr-4' : ''} 
                    ${isThird ? 'md:order-3 z-10 md:mb-0 md:-ml-4' : ''}
                `}
                data-cursor="hover"
              >
                <div 
                    className={`
                        relative p-1 rounded-[2.5rem] bg-gradient-to-b ${prize.color} 
                        ${isFirst ? 'shadow-[0_0_80px_rgba(255,215,0,0.15)] md:scale-105' : 'md:scale-95 opacity-90 hover:opacity-100 hover:scale-100'}
                        transition-all duration-500
                    `}
                >
                    <div className="bg-[#0A0A0A] rounded-[2.3rem] p-8 md:p-10 h-full flex flex-col items-center text-center relative overflow-hidden group">
                        {/* Glow effect */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b ${prize.color} opacity-10 blur-[60px] group-hover:opacity-30 transition-opacity duration-500`} />
                        
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index }}
                        >
                            <Trophy className={`w-16 h-16 mb-8 ${isFirst ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : isSecond ? 'text-gray-300' : 'text-orange-400'}`} />
                        </motion.div>
                        
                        <h3 className="font-display font-bold text-2xl uppercase tracking-wider mb-2">{prize.place}</h3>
                        <div className={`text-4xl md:text-5xl font-bold mb-10 ${isFirst ? 'text-white' : 'text-white/80'}`}>{prize.amount}</div>
                        
                        <ul className="space-y-4 w-full">
                            {prize.perks.map((perk, i) => (
                            <li key={i} className="text-sm md:text-base text-gray-400 border-b border-white/5 pb-3 last:border-0 font-medium">
                                {perk}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};