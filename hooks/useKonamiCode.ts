import { useEffect, useState } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

export const useKonamiCode = () => {
    const [triggered, setTriggered] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Desktop check
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        const onKeyDown = (e: KeyboardEvent) => {
            const { key } = e;
            console.log(`[Konami] Key: ${key}, Expected: ${KONAMI_CODE[index]}`);

            if (key.toLowerCase() === KONAMI_CODE[index].toLowerCase()) {
                const nextIndex = index + 1;
                if (nextIndex === KONAMI_CODE.length) {
                    console.log('[Konami] TRIGGERED!');
                    setTriggered(true);
                    setIndex(0);
                } else {
                    setIndex(nextIndex);
                }
            } else {
                setIndex(key === KONAMI_CODE[0] ? 1 : 0);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [index]);

    return { triggered, setTriggered };
};
