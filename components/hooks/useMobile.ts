import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user is on a mobile device
 * Uses both screen width and touch capability for accurate detection
 */
export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
            setIsMobile(isTouchDevice && isSmallScreen);
        };

        checkMobile();

        // Update on resize
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = () => checkMobile();

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isMobile;
};

/**
 * Non-reactive check for initial render optimization
 * Use this for conditional component rendering to avoid initial heavy load
 */
export const checkIsMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    return isTouchDevice && isSmallScreen;
};
