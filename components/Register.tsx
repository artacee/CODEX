import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { KineticText } from './ui/KineticText';

interface RegisterProps {
  onBack: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 2000);
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

          {status === 'success' ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-12"
             >
               <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Check className="w-10 h-10" />
               </div>
               <h3 className="font-display text-3xl font-bold mb-4">Registration Confirmed!</h3>
               <p className="text-muted mb-8">Check your email for the hacker guide and next steps.</p>
               <Button onClick={onBack} variant="secondary">Return Home</Button>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted">First Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted">Last Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-muted">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="jane@university.edu"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-muted">College / University</label>
                <input 
                  required 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="Institute of Technology..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted">GitHub URL</label>
                    <input 
                      type="url" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="github.com/jane"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted">Discord Handle</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="jane#1234"
                    />
                 </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Processing...' : 'Complete Registration'}
                </Button>
              </div>
              
              <div className="flex items-start gap-3 mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                <p className="text-xs text-secondary/80 leading-relaxed">
                  By registering, you agree to the Code of Conduct and allow us to share your information with event sponsors for recruiting purposes.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};