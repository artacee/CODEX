import React, { useEffect } from 'react';
import { useKonamiCode } from '../hooks/useKonamiCode';
import { AsteroidsGame } from './game/AsteroidsGame';
import { AnimatePresence } from 'framer-motion';

export const HackerMode: React.FC = () => {
    const { triggered, setTriggered } = useKonamiCode();

    useEffect(() => {
        // Desktop check for cleanup
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            if (triggered) setTriggered(false);
            return;
        }

        if (triggered) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [triggered]);

    return (
        <div className="hidden lg:block">
            <AnimatePresence>
                {triggered && (
                    <AsteroidsGame onClose={() => setTriggered(false)} />
                )}
            </AnimatePresence>
        </div>
    );
};
