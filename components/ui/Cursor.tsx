import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const Cursor: React.FC = () => {
    const mouse = {
        x: useMotionValue(-100),
        y: useMotionValue(-100)
    }
    
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            // Direct update without spring interpolation for instant response
            mouse.x.set(clientX - 10); 
            mouse.y.set(clientY - 10);
        }

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
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
                left: mouse.x, 
                top: mouse.y,
            }} 
            animate={{
                width: isHovered ? 60 : 20,
                height: isHovered ? 60 : 20,
                x: isHovered ? -20 : 0,
                y: isHovered ? -20 : 0,
                opacity: isHovered ? 0.5 : 1
            }}
            transition={{ 
                // Keep spring only for the shape/size transition
                type: "spring", 
                stiffness: 300, 
                damping: 25 
            }}
            className="fixed w-5 h-5 border-2 border-primary rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_20px_rgba(0,255,157,0.5)]"
        />
    )
}