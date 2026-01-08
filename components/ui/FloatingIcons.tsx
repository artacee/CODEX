import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingIconsProps {
    containerRef?: React.RefObject<HTMLElement>;
    count?: number;
    images?: string[];
}

export const FloatingIcons: React.FC<FloatingIconsProps> = ({
    containerRef,
    count = 6,
    images = ['/favicon1.png', '/asset.png']
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate random positions
    const items = Array.from({ length: count }).map((_, i) => ({
        id: i,
        src: images[i % images.length],
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
        scale: Math.random() * 0.5 + 0.5,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                        top: item.top,
                        left: item.left,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                    }}
                >
                    <img
                        src={item.src}
                        alt=""
                        className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-20 blur-[1px] hover:blur-0 hover:opacity-60 transition-all duration-500"
                        style={{ transform: `scale(${item.scale})` }}
                    />
                </motion.div>
            ))}
        </div>
    );
};
