import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export const CreditsMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // Prevent scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const names = [
        "IRFAN IKKAAAAA",
        "APPUU",
        "DEEPUU",
        "SHANANU",
        "HANNAHACHI",
        "ACHUWATHY",
        "CHIKKU",
        "ALBIN #APPU2",
        "VICHUU",
        "BHAVYA",
        "DHANUSH",
        "AARON TOM TOM TOM",
        "DRIFT",
        "JYOTHIGAYY",
        "JIN",
        "BALUUU",
        "UNNI KUNNAN",
        "<-AJMAL->",
        "CODEX 2026",
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center overflow-hidden">
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
                <X size={24} />
            </button>

            {/* Kinetic Type Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center perspective-[1000px]">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {/* Render list twice for seamless loop if needed, or just huge scroll */}
                    {[...names, ...names].map((name, i) => (
                        <h1
                            key={i}
                            className={`
                                text-[8vw] leading-[0.9] font-black tracking-tighter
                                ${i % 2 === 0 ? 'text-white' : 'text-transparent'}
                            `}
                            style={{
                                WebkitTextStroke: i % 2 !== 0 ? '2px white' : 'unset',
                                opacity: 0.9
                            }}
                        >
                            {name}
                        </h1>
                    ))}
                </motion.div>

                {/* Overlay Gradient for depth */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            </div>
        </div>
    );
};
