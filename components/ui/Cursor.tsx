import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Faster spring for more responsive feel
    const springConfig = { damping: 20, stiffness: 300, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovered, setIsHovered] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const [cursorVariant, setCursorVariant] = useState<'default' | 'text' | 'hidden'>('default');
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Use refs to avoid re-renders
    const rafRef = useRef<number>();
    const mousePos = useRef({ x: -100, y: -100 });

    // Detect touch device on mount
    useEffect(() => {
        const checkTouchDevice = () => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            );
        };
        checkTouchDevice();
        window.addEventListener('resize', checkTouchDevice);
        return () => window.removeEventListener('resize', checkTouchDevice);
    }, []);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    useEffect(() => {
        // Use RAF for smoother updates
        const updateCursor = () => {
            cursorX.set(mousePos.current.x);
            cursorY.set(mousePos.current.y);
        };

        const manageMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            // Cancel previous frame and schedule new one
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateCursor);
        };

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hoverElement = target.closest('[data-cursor]');

            if (hoverElement) {
                const cursorType = hoverElement.getAttribute('data-cursor');
                const text = hoverElement.getAttribute('data-cursor-text');

                if (cursorType === 'hover') {
                    setIsHovered(true);
                    setCursorVariant('default');
                }

                if (cursorType === 'text' && text) {
                    setCursorText(text);
                    setCursorVariant('text');
                    setIsHovered(true);
                }

                if (cursorType === 'hidden') {
                    setCursorVariant('hidden');
                }
            }
        };

        const manageMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-cursor]')) {
                setIsHovered(false);
                setCursorText('');
                setCursorVariant('default');
            }
        };

        // Use passive listeners for better scroll/touch performance
        window.addEventListener("mousemove", manageMouseMove, { passive: true });
        window.addEventListener("mouseover", manageMouseOver, { passive: true });
        window.addEventListener("mouseout", manageMouseLeave, { passive: true });

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("mouseover", manageMouseOver);
            window.removeEventListener("mouseout", manageMouseLeave);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main cursor dot - instant response */}
            <motion.div
                style={{
                    left: cursorX,
                    top: cursorY,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    scale: cursorVariant === 'hidden' ? 0 : (isHovered ? 0.5 : 1),
                    opacity: cursorVariant === 'hidden' ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28
                }}
                className="fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
            />

            {/* Large blend-mode circle - smooth trailing effect */}
            <motion.div
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    width: isHovered ? (cursorVariant === 'text' ? 120 : 80) : 40,
                    height: isHovered ? (cursorVariant === 'text' ? 120 : 80) : 40,
                    opacity: cursorVariant === 'hidden' ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                }}
                className="fixed rounded-full pointer-events-none z-[9998] hidden md:flex items-center justify-center bg-white mix-blend-difference"
            >
                {/* Cursor text label */}
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: cursorVariant === 'text' ? 1 : 0,
                        scale: cursorVariant === 'text' ? 1 : 0.5,
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-black mix-blend-difference"
                >
                    {cursorText}
                </motion.span>
            </motion.div>
        </>
    );
}