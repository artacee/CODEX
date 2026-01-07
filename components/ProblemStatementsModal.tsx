import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, AlertCircle, Lightbulb, Target, CheckCircle2 } from 'lucide-react';
import { ProblemStatement, Track } from '../types';
import { PROBLEM_STATEMENTS } from '../constants';
import { KineticText } from './ui/KineticText';

interface ProblemStatementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track | null;
}

export const ProblemStatementsModal: React.FC<ProblemStatementsModalProps> = ({ isOpen, onClose, track }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Filter statements based on the selected track ID
  const statements = track 
    ? PROBLEM_STATEMENTS.filter(ps => ps.trackId === track.id)
    : [];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Scroll to expanded card within the modal's scroll container
  useEffect(() => {
    if (expandedId && cardRefs.current[expandedId] && scrollContainerRef.current) {
      setTimeout(() => {
        const card = cardRefs.current[expandedId];
        const container = scrollContainerRef.current;
        
        if (card && container) {
          const cardTop = card.offsetTop;
          const containerScrollTop = container.scrollTop;
          const containerHeight = container.clientHeight;
          const cardHeight = card.offsetHeight;
          
          // Check if card is already visible
          const isVisible = 
            cardTop >= containerScrollTop && 
            cardTop + cardHeight <= containerScrollTop + containerHeight;
          
          if (!isVisible) {
            // Scroll to position the card at the top with some padding
            container.scrollTo({
              top: cardTop - 20,
              behavior: 'smooth'
            });
          }
        }
      }, 350); // Delay to allow expansion animation to start
    }
  }, [expandedId]);

  return createPortal(
    <AnimatePresence>
      {isOpen && track && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop with blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-surface/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className={`p-8 border-b border-white/10 flex justify-between items-start bg-gradient-to-r ${track.color.replace('bg-', 'from-').replace('500', '900/40')} to-transparent`}>
              <div>
                <span className="text-sm font-mono text-white/60 uppercase tracking-widest mb-2 block">Track: {track.title}</span>
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white">Problem Statements</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
                data-cursor="hover"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="grid gap-6">
                {statements.length > 0 ? (
                  statements.map((ps, index) => (
                    <motion.div
                      key={ps.id}
                      ref={(el) => { cardRefs.current[ps.id] = el; }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        bg-black/40 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300
                        ${expandedId === ps.id ? 'border-primary/30 bg-black/60 ring-1 ring-primary/20' : 'hover:border-white/20'}
                      `}
                    >
                      {/* Card Header (Always Visible) */}
                      <div 
                        onClick={() => toggleExpand(ps.id)}
                        className="p-6 cursor-pointer flex flex-col md:flex-row gap-6 md:items-center justify-between"
                        data-cursor="hover"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-wider text-primary border border-white/5">
                              {ps.id}
                            </span>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-wider text-muted border border-white/5">
                              {ps.theme.split(',')[0]}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight">
                            {ps.title}
                          </h3>
                        </div>
                        
                        <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors ${expandedId === ps.id ? 'bg-primary text-black border-primary' : 'bg-white/5 text-white'}`}>
                          {expandedId === ps.id ? <ChevronUp /> : <ChevronDown />}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedId === ps.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-8 pt-2 border-t border-white/5 grid md:grid-cols-2 gap-8">
                              
                              {/* Left Column */}
                              <div className="space-y-6">
                                {ps.sections.background && (
                                  <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-widest mb-3">
                                      <AlertCircle className="w-4 h-4 text-orange-400" /> Background
                                    </h4>
                                    <p className="text-muted text-sm leading-relaxed">{ps.sections.background}</p>
                                  </div>
                                )}
                                
                                {ps.sections.description && (
                                  <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-widest mb-3">
                                      <Target className="w-4 h-4 text-blue-400" /> Description
                                    </h4>
                                    <p className="text-muted text-sm leading-relaxed">{ps.sections.description}</p>
                                  </div>
                                )}

                                {ps.sections.challenge && (
                                  <div>
                                     <h4 className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-widest mb-3">
                                      <AlertCircle className="w-4 h-4 text-red-400" /> The Challenge
                                    </h4>
                                    <p className="text-muted text-sm leading-relaxed">{ps.sections.challenge}</p>
                                  </div>
                                )}
                              </div>

                              {/* Right Column */}
                              <div className="space-y-6">
                                {ps.sections.ask && (
                                  <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-widest mb-3">
                                      <Lightbulb className="w-4 h-4 text-yellow-400" /> The Ask
                                    </h4>
                                    <p className="text-gray-300 text-sm leading-relaxed font-medium">{ps.sections.ask}</p>
                                  </div>
                                )}

                                {ps.sections.expected_solution && (
                                  <div className="bg-green-500/5 p-5 rounded-xl border border-green-500/10">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-green-400 uppercase tracking-widest mb-3">
                                      <CheckCircle2 className="w-4 h-4" /> Expected Solution
                                    </h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">{ps.sections.expected_solution}</p>
                                  </div>
                                )}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                   <div className="text-center py-20">
                     <p className="text-muted">No problem statements listed for this track yet.</p>
                   </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-black/40 text-center">
              <p className="text-xs text-muted font-mono">Select a problem statement to see details</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};