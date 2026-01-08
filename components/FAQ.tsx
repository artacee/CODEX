import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus, ArrowUpRight, MessageCircle, HelpCircle, Copy, Check } from 'lucide-react';
import { FAQS } from '../constants';
import { KineticText } from './ui/KineticText';
import { TextScramble } from './ui/TextScramble';
import { Counter } from './ui/Counter';
import { Magnetic } from './ui/Magnetic';

const EMAIL = 'support@codextki.dev';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      id="faq"
      className="py-32 relative bg-surface scroll-mt-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 -right-20 w-64 h-64 border border-primary/10 rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-40 -left-20 w-40 h-40 border border-secondary/10 rounded-full pointer-events-none"
      />

      {/* Large Background Number */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 -translate-y-1/2 -right-20 text-[30vw] font-display font-bold text-white/[0.02] leading-none pointer-events-none select-none"
      >
        ?
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                <TextScramble delay={100}>Got Questions?</TextScramble>
              </span>
              <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9]">
                <KineticText>FREQUENTLY</KineticText>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  <KineticText>ASKED</KineticText>
                </span>
              </h2>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-white">
                  <Counter value={FAQS.length} duration={1.5} />
                </div>
                <p className="text-muted text-sm">Common Questions</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Grid - Bento Style */}
        <div className="grid md:grid-cols-2 gap-6">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative rounded-3xl transition-all duration-500 ease-[0.22,1,0.36,1]
                  ${isOpen
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/30'
                    : 'bg-white/[0.02] hover:bg-white/[0.05]'
                  }
                  border border-white/10 hover:border-white/20
                  overflow-hidden
                `}
                data-cursor="hover"
              >
                {/* Hover Gradient Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                {/* Index Number */}
                <div className="absolute top-6 right-6 font-display font-bold text-6xl text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-8 relative z-10"
                >
                  {/* Question */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                          ${isOpen ? 'bg-primary text-black' : 'bg-white/10 text-white'}
                        `}>
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">
                          Question
                        </span>
                      </div>

                      <h3 className={`
                        font-display font-bold text-xl md:text-2xl leading-tight transition-colors duration-300
                        ${isOpen ? 'text-primary' : 'text-white group-hover:text-white'}
                      `}>
                        {faq.question}
                      </h3>
                    </div>

                    {/* Toggle Button */}
                    <motion.div
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                        ${isOpen
                          ? 'bg-primary text-black'
                          : 'bg-white/10 text-white group-hover:bg-white/20'
                        }
                      `}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/10">
                          <p className="text-muted text-lg leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA Card - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <div className="relative group">
            {/* Animated gradient background blur */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700" />

            {/* Main card */}
            <div className="relative rounded-[2rem] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border border-white/[0.12] backdrop-blur-xl p-10 md:p-16 overflow-hidden">
              {/* Animated gradient orbs */}
              <motion.div
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{
                  x: [0, -20, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
              />

              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

              {/* Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left side - Icon and text */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                  {/* Animated icon container */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-40" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                      <MessageCircle className="w-10 h-10 text-primary" />
                    </div>
                  </motion.div>

                  {/* Text content */}
                  <div className="max-w-md">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-primary/80 font-mono text-xs tracking-[0.25em] uppercase mb-3 block"
                    >
                      Get In Touch
                    </motion.span>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="font-display font-bold text-3xl md:text-4xl text-white mb-3 tracking-tight"
                    >
                      Still have{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
                        Questions?
                      </span>
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="text-muted text-lg leading-relaxed"
                    >
                      Can't find what you're looking for? We're here to help you out.
                    </motion.p>
                  </div>
                </div>

                {/* Right side - Premium button */}
                <Magnetic>
                  <motion.button
                    onClick={handleCopyEmail}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="text"
                    data-cursor-text={copied ? "Copied!" : "Mail"}
                    className={`relative group/btn overflow-hidden px-10 py-5 rounded-full transition-all duration-500 ${copied
                        ? 'bg-gradient-to-r from-primary to-primary/90'
                        : 'bg-white/[0.03] hover:bg-white/[0.08]'
                      }`}
                  >
                    {/* Button glow effect */}
                    <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${copied ? 'opacity-100' : 'opacity-0 group-hover/btn:opacity-100'
                      }`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 blur-xl" />
                    </div>

                    {/* Button border */}
                    <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${copied
                        ? 'border-primary/50'
                        : 'border-white/10 group-hover/btn:border-primary/30'
                      }`} />

                    {/* Button content */}
                    <span className="relative z-10 flex items-center gap-4">
                      <span className={`font-bold text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${copied ? 'text-black' : 'text-white group-hover/btn:text-primary'
                        }`}>
                        {copied ? 'Copied!' : 'Mail Us'}
                      </span>
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <Check className="w-5 h-5 text-black" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0, x: -10 }}
                            animate={{ scale: 1, x: 0 }}
                            exit={{ scale: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                          >
                            <Copy className="w-5 h-5 text-white/70 group-hover/btn:text-primary transition-colors duration-300" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.button>
                </Magnetic>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};