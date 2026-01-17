import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpotlightRevealProps {
    onComplete: () => void;
    duration?: number;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
    onComplete,
    duration = 15000
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [countdown, setCountdown] = useState(Math.floor(duration / 1000));
    const [glitchActive, setGlitchActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate days remaining until Jan 20, 2026
    const deadline = new Date('2026-01-20T23:59:59');
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

    // Auto-dismiss after duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    // Countdown timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Glitch effect trigger
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 3000);

        return () => clearInterval(glitchInterval);
    }, []);

    // Spotlight mouse/touch follow effect
    const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const updateSpotlightPos = (clientX: number, clientY: number) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((clientX - rect.left) / rect.width) * 100;
                const y = ((clientY - rect.top) / rect.height) * 100;
                setSpotlightPos({ x, y });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            updateSpotlightPos(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updateSpotlightPos(touch.clientX, touch.clientY);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updateSpotlightPos(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    const typewriterText = "REGISTRATION CLOSES";
    const [displayedText, setDisplayedText] = useState('');
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index <= typewriterText.length) {
                setDisplayedText(typewriterText.slice(0, index));
                index++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => setShowDate(true), 300);
            }
        }, 80);

        return () => clearInterval(typeInterval);
    }, []);

    const handleSkip = () => {
        setIsVisible(false);
        setTimeout(onComplete, 800);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div
                    ref={containerRef}
                    className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
                    style={{
                        background: '#050505',
                        animation: 'fadeIn 0.8s ease-out',
                    }}
                >
                    {/* Animated grid background */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(46, 255, 123, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(46, 255, 123, 0.1) 1px, transparent 1px)
              `,
                            backgroundSize: '50px 50px',
                            animation: 'gridMove 20s linear infinite',
                        }}
                    />

                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 rounded-full particle-float"
                                style={{
                                    background: i % 2 === 0 ? '#2EFF7B' : '#0088FF',
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    boxShadow: i % 2 === 0
                                        ? '0 0 10px #2EFF7B, 0 0 20px #2EFF7B'
                                        : '0 0 10px #0088FF, 0 0 20px #0088FF',
                                    animationDelay: `${Math.random() * 4}s`,
                                    animationDuration: `${4 + Math.random() * 4}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Spotlight beam effect */}
                    <div
                        className="absolute pointer-events-none spotlight-pulse"
                        style={{
                            width: '600px',
                            height: '600px',
                            left: `${spotlightPos.x}%`,
                            top: `${spotlightPos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle, rgba(46, 255, 123, 0.25) 0%, rgba(0, 136, 255, 0.1) 40%, transparent 70%)',
                            filter: 'blur(40px)',
                        }}
                    />

                    {/* Main content */}
                    <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl">
                        {/* Glitch container */}
                        <div className={`relative ${glitchActive ? 'animate-pulse' : ''}`}>
                            {/* Top label */}
                            <div
                                className="mb-4 animate-slideDown"
                                style={{ animationDelay: '0.3s' }}
                            >
                                <span
                                    className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(46, 255, 123, 0.2), rgba(0, 136, 255, 0.2))',
                                        border: '1px solid rgba(46, 255, 123, 0.3)',
                                        borderRadius: '4px',
                                        color: '#2EFF7B',
                                    }}
                                >
                                    ⚡ URGENT NOTICE
                                </span>
                            </div>

                            {/* Typewriter headline */}
                            <h1
                                className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 relative"
                                style={{
                                    color: 'transparent',
                                    backgroundImage: 'linear-gradient(135deg, #F0F0F0 0%, #888888 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                }}
                            >
                                {displayedText}
                                <span className="cursor-blink" style={{ color: '#2EFF7B' }}>|</span>

                                {/* Glitch layers */}
                                {glitchActive && (
                                    <>
                                        <span
                                            className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold"
                                            style={{
                                                color: '#2EFF7B',
                                                clipPath: 'inset(10% 0 60% 0)',
                                                transform: 'translate(-3px, 0)',
                                                opacity: 0.8,
                                            }}
                                        >
                                            {displayedText}
                                        </span>
                                        <span
                                            className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold"
                                            style={{
                                                color: '#0088FF',
                                                clipPath: 'inset(40% 0 30% 0)',
                                                transform: 'translate(3px, 0)',
                                                opacity: 0.8,
                                            }}
                                        >
                                            {displayedText}
                                        </span>
                                    </>
                                )}
                            </h1>

                            {/* Date reveal with stagger */}
                            {showDate && (
                                <div className="animate-scaleIn">
                                    <h2
                                        className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-8"
                                        style={{
                                            color: '#2EFF7B',
                                            textShadow: '0 0 40px rgba(46, 255, 123, 0.6), 0 0 80px rgba(46, 255, 123, 0.4), 0 0 120px rgba(46, 255, 123, 0.2)',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        JANUARY 20, 2026
                                    </h2>

                                    {/* Decorative line */}
                                    <div
                                        className="mx-auto h-[2px] w-3/4 animate-expandLine"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, #2EFF7B, transparent)',
                                        }}
                                    />
                                </div>
                            )}

                            {/* Days remaining counter */}
                            <div
                                className="mt-6 sm:mt-10 flex items-center justify-center gap-4 animate-slideUp"
                                style={{ animationDelay: '1.8s' }}
                            >
                                <div
                                    className="glass px-5 py-4 sm:px-8 sm:py-6 rounded-xl"
                                    style={{
                                        background: 'rgba(46, 255, 123, 0.05)',
                                        border: '1px solid rgba(46, 255, 123, 0.2)',
                                    }}
                                >
                                    <span
                                        className="block text-4xl sm:text-5xl md:text-6xl font-display font-bold pulsate"
                                        style={{ color: '#2EFF7B' }}
                                    >
                                        {daysRemaining}
                                    </span>
                                    <span className="text-sm uppercase tracking-widest text-muted">
                                        Days Left
                                    </span>
                                </div>
                            </div>

                            {/* CTA hint */}
                            <p
                                className="mt-8 text-muted text-sm tracking-wider animate-fadeIn"
                                style={{ animationDelay: '2.2s' }}
                            >
                                Don't miss your chance to be part of CODEX 2026
                            </p>
                        </div>
                    </div>

                    {/* Skip button */}
                    <button
                        onClick={handleSkip}
                        className="absolute bottom-8 right-8 group flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-primary transition-colors animate-fadeIn"
                        style={{ animationDelay: '2s' }}
                    >
                        <span className="opacity-60">Skip</span>
                        <span className="text-xs opacity-40">({countdown}s)</span>
                        <span className="text-primary arrow-bounce">→</span>
                    </button>

                    {/* Progress bar */}
                    <div
                        className="absolute bottom-0 left-0 h-1 progress-shrink"
                        style={{
                            background: 'linear-gradient(90deg, #2EFF7B, #0088FF)',
                            boxShadow: '0 0 20px rgba(46, 255, 123, 0.5)',
                            animationDuration: `${duration}ms`,
                        }}
                    />

                    {/* Corner decorations */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
                    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />

                    {/* Scan lines effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                        }}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

// Add keyframes to document
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes expandLine {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    
    @keyframes pulsate {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes particle-float {
      0%, 100% { transform: translateY(0); opacity: 0; }
      50% { transform: translateY(-100px); opacity: 1; }
    }
    
    @keyframes spotlight-pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    @keyframes arrow-bounce {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(5px); }
    }
    
    @keyframes progress-shrink {
      from { width: 100%; }
      to { width: 0%; }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.6s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slideDown {
      animation: slideDown 0.6s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slideUp {
      animation: slideUp 0.6s ease-out forwards;
      opacity: 0;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    
    .animate-expandLine {
      animation: expandLine 0.8s ease-out 0.3s forwards;
      transform: scaleX(0);
    }
    
    .pulsate {
      animation: pulsate 2s ease-in-out infinite;
    }
    
    .particle-float {
      animation: particle-float 4s ease-in-out infinite;
    }
    
    .spotlight-pulse {
      animation: spotlight-pulse 3s ease-in-out infinite;
    }
    
    .cursor-blink {
      animation: cursor-blink 0.5s step-end infinite;
    }
    
    .arrow-bounce {
      animation: arrow-bounce 1.5s ease-in-out infinite;
    }
    
    .progress-shrink {
      animation: progress-shrink linear forwards;
    }
  `;
    document.head.appendChild(style);
}
