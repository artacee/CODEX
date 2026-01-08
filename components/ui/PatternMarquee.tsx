import React from 'react';
import { motion } from 'framer-motion';

interface PatternMarqueeProps {
    direction?: 'left' | 'right';
    className?: string;
}

export const PatternMarquee: React.FC<PatternMarqueeProps> = ({
    direction = 'left',
    className = ''
}) => {
    return (
        <div className={`relative flex overflow-hidden py-2 select-none z-0 ${className}`}>
            <motion.div
                className="flex whitespace-nowrap will-change-transform"
                initial={{ x: direction === 'left' ? "0%" : "-50%" }}
                animate={{ x: direction === 'left' ? "-50%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40, // Slower for smoothness
                }}
            >
                {/* Render enough copies to cover large screens seamlessly */}
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 opacity-40 px-4">
                        <img
                            src="/pattern.png"
                            alt=""
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
