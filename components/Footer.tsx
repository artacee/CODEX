import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { CodexLogo } from './ui/CodexLogo';
import { Magnetic } from './ui/Magnetic';
import { TextScramble } from './ui/TextScramble';

// Custom Discord Icon component
const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

// Custom WhatsApp Icon component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://www.instagram.com/tki.codex?igsh=MTZ3dDNhNWR2Zzl6Mw==', label: 'Instagram' },
  { icon: DiscordIcon, href: 'https://discord.gg/GKANkrtaY4', label: 'Discord' },
  { icon: WhatsAppIcon, href: 'https://whatsapp.com/channel/0029Vb827u2HwXbJalP6jI3i', label: 'WhatsApp' },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pt-16 border-t border-white/10">
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

            {/* Coordinators */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Coordinators</h4>
              <div className="space-y-6">
                {/* Faculty */}
                <div className="space-y-2">
                  <p className="text-xs text-primary font-mono uppercase tracking-wider">Faculty In Charge</p>
                  <ul className="space-y-2">
                    <li>
                      <div className="text-muted text-sm leading-tight">Asst. Prof. Jomi George</div>
                      <a href="tel:+919447996192" className="text-xs text-white/50 hover:text-primary transition-colors">+91 94479 96192</a>
                    </li>
                    <li>
                      <div className="text-muted text-sm leading-tight">Asst. Prof. Syamraj B S</div>
                      <a href="tel:+919400623692" className="text-xs text-white/50 hover:text-primary transition-colors">+91 94006 23692</a>
                    </li>
                  </ul>
                </div>
                {/* Students */}
                <div className="space-y-2">
                  <p className="text-xs text-primary font-mono uppercase tracking-wider">Student Coordinators</p>
                  <ul className="space-y-2">
                    <li>
                      <div className="text-muted text-sm leading-tight">Irfan Jazeer</div>
                      <a href="tel:+918078939321" className="text-xs text-white/50 hover:text-primary transition-colors">+91 80789 39321</a>
                    </li>
                    <li>
                      <div className="text-muted text-sm leading-tight">Aadith P Soman</div>
                      <a href="tel:+919400789095" className="text-xs text-white/50 hover:text-primary transition-colors">+91 94007 89095</a>
                    </li>
                    <li>
                      <div className="text-muted text-sm leading-tight">Ajmal Mohammed</div>
                      <a href="tel:+919946372408" className="text-xs text-white/50 hover:text-primary transition-colors">+91 99463 72408</a>
                    </li>
                  </ul>
                </div>
              </div>
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