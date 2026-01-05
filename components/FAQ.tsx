import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS } from '../constants';
import { KineticText } from './ui/KineticText';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative bg-surface">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display font-bold text-5xl mb-6">
                <KineticText>FAQ</KineticText>
            </h2>
            <p className="text-muted text-lg mb-8">Everything you need to know about the event.</p>
            
            <div className="hidden md:block p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="font-bold text-white mb-2">Still have questions?</h4>
                <p className="text-muted text-sm mb-4">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                <a href="mailto:codex@tkmit.ac.in" data-cursor="hover" className="text-primary hover:underline text-sm font-medium">Get in touch</a>
            </div>
          </motion.div>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`group bg-background border rounded-2xl transition-all duration-500 ease-[0.22,1,0.36,1] ${isOpen ? 'border-primary/50' : 'border-white/5 hover:border-white/20'}`}
                  data-cursor="hover"
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between"
                  >
                    <span className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white'}`}>
                        {faq.question}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Plus className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted group-hover:text-white'}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-muted leading-relaxed border-t border-white/5 mt-2">
                            <div className="pt-4">
                                {faq.answer}
                            </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};