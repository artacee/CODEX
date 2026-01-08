import { useState, useCallback, useEffect } from 'react';

export const useGravityTrigger = () => {
    const [clickCount, setClickCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (clickCount === 0) return;

        // Reset count if idle for 1 second
        const timer = setTimeout(() => {
            setClickCount(0);
        }, 1000);

        if (clickCount >= 5) {
            // Desktop check
            if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                setIsActive(true);
            }
            setClickCount(0);
        }

        return () => clearTimeout(timer);
    }, [clickCount]);

    const trigger = useCallback(() => {
        setClickCount(prev => prev + 1);
    }, []);

    return { isActive, setIsActive, trigger };
};
