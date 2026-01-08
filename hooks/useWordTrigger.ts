import { useState, useEffect } from 'react';

export const useWordTrigger = (targetWord: string) => {
    const [triggered, setTriggered] = useState(false);
    const [buffer, setBuffer] = useState('');

    useEffect(() => {
        // Desktop check
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Append key to buffer
            // We only care about single char keys
            if (e.key.length === 1) {
                setBuffer(prev => {
                    const newBuffer = (prev + e.key).slice(-targetWord.length);
                    if (newBuffer === targetWord) {
                        setTriggered(true);
                        return '';
                    }
                    return newBuffer;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [targetWord]);

    return { triggered, setTriggered };
};
