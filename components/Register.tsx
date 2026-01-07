import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { KineticText } from './ui/KineticText';

interface RegisterProps {
  onBack: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const handleGoogleFormClick = () => {
    // Replace this URL with your actual Google Form URL
    window.open('https://forms.gle/CaAX6U2F28cVdFUd7', '_blank');
  };

  return (
    <section className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 group"
          data-cursor="hover"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono uppercase tracking-wider">Back to Home</span>
        </button>

        <div className="mb-12">
          <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 leading-none">
            <KineticText>JOIN THE</KineticText> <br />
            <span className="text-primary">REVOLUTION</span>
          </h1>
          <p className="text-xl text-muted">
            Secure your spot at CODEX 2026. Limited seats available.
          </p>
        </div>

        <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="text-center py-12 relative z-10">
            <h3 className="font-display text-3xl font-bold mb-6">Complete Your Registration</h3>
            <p className="text-muted mb-8 text-lg">
              Click the button below to fill out our Google Form and secure your spot at CODEX 2026.
            </p>
            
            <Button 
              onClick={handleGoogleFormClick}
              className="w-full max-w-md mx-auto"
            >
              Open Registration Form
            </Button>
            
            <div className="flex items-start gap-3 mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20 max-w-md mx-auto">
              <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
              <p className="text-xs text-secondary/80 leading-relaxed text-left">
                By registering, you agree to the Code of Conduct and allow us to share your information with event sponsors for recruiting purposes.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};