import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor: React.FC = () => {
    const mouse = {
        x: useMotionValue(-100),
        y: useMotionValue(-100)
    }
    
    // Smooth spring physics for the cursor delay
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    };

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouse.x.set(clientX - 10); // Offset to center the 20px cursor
            mouse.y.set(clientY - 10);
        }

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the hovered element or its parents have the data-cursor attribute
            if(target.closest('[data-cursor="hover"]')){
                setIsHovered(true);
            }
        }

        const manageMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if(target.closest('[data-cursor="hover"]')){
                setIsHovered(false);
            }
        }

        window.addEventListener("mousemove", manageMouseMove);
        window.addEventListener("mouseover", manageMouseOver);
        window.addEventListener("mouseout", manageMouseLeave);
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("mouseover", manageMouseOver);
            window.removeEventListener("mouseout", manageMouseLeave);
        }
    }, [])

    return (
        <motion.div 
            style={{
                left: smoothMouse.x, 
                top: smoothMouse.y,
            }} 
            animate={{
                width: isHovered ? 60 : 20,
                height: isHovered ? 60 : 20,
                x: isHovered ? -20 : 0, // Adjust position when scaling up to keep centered
                y: isHovered ? -20 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        />
    )
}