import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Mail, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import { CodexLogo } from './ui/CodexLogo';
import { Magnetic } from './ui/Magnetic';
import { TextScramble } from './ui/TextScramble';

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://www.instagram.com/tki.codex?igsh=MTZ3dDNhNWR2Zzl6Mw==', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Magnetic>
    <a 
      href={href}
      data-cursor="text"
      data-cursor-text="Go"
      className="group inline-flex items-center gap-2 text-muted hover:text-white transition-colors duration-300"
    >
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
      </span>
      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
    </a>
  </Magnetic>
);

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  // Reveal animation - footer slides up as you scroll to it
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  
  // Parallax for background text
  const textX = useTransform(scrollYProgress, [0, 1], ['-10%', '0%']);

  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
    hour12: false
  });

  return (
    <footer 
      ref={containerRef}
      className="relative bg-[#030303] overflow-hidden"
    >
      {/* Large Background Text */}
      <motion.div 
        style={{ x: textX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0"
      >
        <span className="text-[20vw] font-display font-bold text-white/[0.02] leading-none">
          CODEX 2026
        </span>
      </motion.div>

      {/* Top Marquee */}
      <div className="border-b border-white/5 overflow-hidden py-4">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-sm font-mono text-white/20 uppercase tracking-widest flex items-center gap-8">
              <span>Available Jan 27-28</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>TKM Institute of Technology</span>
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>24HR Hackathon</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10"
      >
        {/* Big CTA Section */}
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-mono text-sm tracking-widest uppercase mb-6"
            >
              <TextScramble delay={200}>Ready to build the future?</TextScramble>
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tighter mb-8"
            >
              LET'S CREATE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                SOMETHING EPIC
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Magnetic>
                <button
                  onClick={() => onNavigate?.('register')}
                  data-cursor="text"
                  data-cursor-text="Join"
                  className="group inline-flex items-center gap-4 px-10 py-6 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-500"
                >
                  <span className="text-lg font-bold uppercase tracking-wider group-hover:text-black transition-colors">
                    Register Now
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 group-hover:text-black transition-colors" />
                  </div>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-16 border-t border-white/10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <CodexLogo className="h-12 w-auto mb-6" />
              <p className="text-muted text-sm leading-relaxed mb-6">
                A 24-hour Gen AI Hackathon where innovation meets execution.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <Magnetic key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-cursor="hover"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><FooterLink href="#about">About</FooterLink></li>
                <li><FooterLink href="#tracks">Tracks</FooterLink></li>
                <li><FooterLink href="#schedule">Schedule</FooterLink></li>
                <li><FooterLink href="#prizes">Prizes</FooterLink></li>
                <li><FooterLink href="#faq">FAQ</FooterLink></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:support@codextki.dev" 
                    data-cursor="hover"
                    className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>support@codextki.dev</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://maps.app.goo.gl/WgmxeVuQPEu4GKyv7"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex items-start gap-3 text-muted hover:text-white transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">TKM Institute of Technology,<br />Musaliar Hills, Kollam, Kerala</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Status */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Status</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted text-sm">Registrations Open</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">Local Time (IST)</p>
                  <p className="text-2xl font-mono text-white">{currentTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-xs">
              © {currentYear} CODEX. Crafted with passion by <span className="text-white">CSE Department, TKMIT</span>
            </p>
            <div className="flex items-center gap-6 text-xs text-muted">
              <span>Jan 27-28, 2026</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Kollam, Kerala</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-primary">v2.0</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};