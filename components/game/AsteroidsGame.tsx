import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

export const AsteroidsGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const requestRef = useRef<number>();

    // Game State Refs
    const gameState = useRef({
        ship: { x: 0, y: 0, rot: 0, velX: 0, velY: 0, thrust: false, dead: false },
        asteroids: [] as { x: number; y: number; velX: number; velY: number; size: number; id: number }[],
        bullets: [] as { x: number; y: number; velX: number; velY: number; life: number }[],
        keys: { ArrowUp: false, ArrowLeft: false, ArrowRight: false, Space: false },
        active: true,
        lastShot: 0,
        resetKey: 0,
        score: 0
    });

    // Initialization Logic
    const initGame = useCallback(() => {
        gameState.current.score = 0;
        gameState.current.active = true;
        gameState.current.ship = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            rot: 0,
            velX: 0,
            velY: 0,
            thrust: false,
            dead: false
        };
        gameState.current.asteroids = [];
        gameState.current.bullets = [];

        // Spawn initial asteroids
        const spawnAsteroid = (x?: number, y?: number, size = 3) => {
            const side = Math.floor(Math.random() * 4);
            let startX = x, startY = y;

            if (startX === undefined || startY === undefined) {
                if (side === 0) { startX = Math.random() * window.innerWidth; startY = -50; }
                else if (side === 1) { startX = window.innerWidth + 50; startY = Math.random() * window.innerHeight; }
                else if (side === 2) { startX = Math.random() * window.innerWidth; startY = window.innerHeight + 50; }
                else { startX = -50; startY = Math.random() * window.innerHeight; }
            }

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 0.5;

            gameState.current.asteroids.push({
                x: startX!,
                y: startY!,
                velX: Math.cos(angle) * speed,
                velY: Math.sin(angle) * speed,
                size,
                id: Math.random()
            });
        };

        // Initial spawn
        for (let i = 0; i < 5; i++) spawnAsteroid();

        setScore(0);
        setGameOver(false);
    }, []);

    const [generation, setGeneration] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        initGame();

        // Helper: Spawn Asteroid (Need local reference for loop closure if we defined it locally, 
        // but better to just define it inside loop or use ref if it was needed outside.
        // Actually, duplicating simple logic or moving it to a ref function is fine.
        // Let's attach it to the ref to share it? No, just define helper inside effect or keep it dry.

        const spawnAsteroid = (x?: number, y?: number, size = 3) => {
            // ... (Same logic for gameplay loop spawns)
            const side = Math.floor(Math.random() * 4);
            let startX = x, startY = y;

            if (startX === undefined || startY === undefined) {
                if (side === 0) { startX = Math.random() * window.innerWidth; startY = -50; }
                else if (side === 1) { startX = window.innerWidth + 50; startY = Math.random() * window.innerHeight; }
                else if (side === 2) { startX = Math.random() * window.innerWidth; startY = window.innerHeight + 50; }
                else { startX = -50; startY = Math.random() * window.innerHeight; }
            }

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 0.5;

            gameState.current.asteroids.push({
                x: startX!,
                y: startY!,
                velX: Math.cos(angle) * speed,
                velY: Math.sin(angle) * speed,
                size,
                id: Math.random()
            });
        };


        const loop = () => {
            if (!gameState.current.active) return;

            // Handle Resize
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const width = canvas.width;
            const height = canvas.height;

            // Clear
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, width, height);

            // --- UPDATE ---
            const { ship, keys, asteroids, bullets } = gameState.current;

            if (!ship.dead) {
                // Rotation
                if (keys.ArrowLeft) ship.rot -= 0.1;
                if (keys.ArrowRight) ship.rot += 0.1;

                // Thrust
                if (keys.ArrowUp) {
                    ship.velX += Math.cos(ship.rot) * 0.15;
                    ship.velY += Math.sin(ship.rot) * 0.15;
                }

                // Friction
                ship.velX *= 0.98;
                ship.velY *= 0.98;

                // Move
                ship.x += ship.velX;
                ship.y += ship.velY;

                // Screen Wrap
                if (ship.x < 0) ship.x = width;
                if (ship.x > width) ship.x = 0;
                if (ship.y < 0) ship.y = height;
                if (ship.y > height) ship.y = 0;

                // Shoot
                if (keys.Space && Date.now() - gameState.current.lastShot > 250) {
                    bullets.push({
                        x: ship.x + Math.cos(ship.rot) * 20,
                        y: ship.y + Math.sin(ship.rot) * 20,
                        velX: Math.cos(ship.rot) * 12,
                        velY: Math.sin(ship.rot) * 12,
                        life: 70
                    });
                    gameState.current.lastShot = Date.now();
                }
            }

            // Bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                const b = bullets[i];
                b.x += b.velX;
                b.y += b.velY;
                b.life--;
                if (b.life <= 0) bullets.splice(i, 1);
            }

            // Asteroids
            for (let i = asteroids.length - 1; i >= 0; i--) {
                const a = asteroids[i];
                a.x += a.velX;
                a.y += a.velY;

                // Wrap
                if (a.x < -100) a.x = width + 100;
                if (a.x > width + 100) a.x = -100;
                if (a.y < -100) a.y = height + 100;
                if (a.y > height + 100) a.y = -100;

                // Collision: Bullet vs Asteroid
                const r = a.size * 15; // Radius
                for (let j = bullets.length - 1; j >= 0; j--) {
                    const b = bullets[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < r) {
                        // Hit!
                        bullets.splice(j, 1);
                        asteroids.splice(i, 1);
                        gameState.current.score += 100 * (4 - a.size);
                        setScore(gameState.current.score);

                        // Split
                        if (a.size > 1) {
                            spawnAsteroid(a.x, a.y, a.size - 1);
                            spawnAsteroid(a.x, a.y, a.size - 1);
                        }
                        break;
                    }
                }

                // Collision: Ship vs Asteroid
                if (!ship.dead) {
                    const dx = ship.x - a.x;
                    const dy = ship.y - a.y;
                    if (Math.sqrt(dx * dx + dy * dy) < r + 10) {
                        ship.dead = true;
                        setGameOver(true);
                        gameState.current.active = false;
                    }
                }
            }

            // Respawn Asteroids if cleared
            if (asteroids.length === 0) {
                for (let i = 0; i < 5; i++) spawnAsteroid();
            }

            // --- DRAW ---

            // Bullets
            ctx.fillStyle = '#00ff00';
            bullets.forEach(b => {
                ctx.beginPath();
                ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // Asteroids
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            asteroids.forEach(a => {
                ctx.beginPath();
                const r = a.size * 15;
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2;
                    const x = a.x + Math.cos(angle) * r;
                    const y = a.y + Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();

                // "Bug" text in center
                ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
                ctx.font = '10px monospace';
                ctx.fillText('BUG', a.x - 10, a.y + 3);
            });

            // Ship
            if (!ship.dead) {
                ctx.save();
                ctx.translate(ship.x, ship.y);
                ctx.rotate(ship.rot);
                ctx.beginPath();
                ctx.moveTo(15, 0);
                ctx.lineTo(-10, 10);
                ctx.lineTo(-5, 0);
                ctx.lineTo(-10, -10);
                ctx.closePath();
                ctx.strokeStyle = '#ffff00';
                ctx.stroke();
                if (keys.ArrowUp) { // Thruster flame
                    ctx.beginPath();
                    ctx.moveTo(-8, 0);
                    ctx.lineTo(-20, 0);
                    ctx.strokeStyle = '#ff0000';
                    ctx.stroke();
                }
                ctx.restore();
            }

            requestRef.current = requestAnimationFrame(loop);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState.current.keys.hasOwnProperty(e.code)) {
                gameState.current.keys[e.code as keyof typeof gameState.current.keys] = true;
                if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) e.preventDefault();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (gameState.current.keys.hasOwnProperty(e.code)) {
                gameState.current.keys[e.code as keyof typeof gameState.current.keys] = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        requestRef.current = requestAnimationFrame(loop);

        return () => {
            gameState.current.active = false;
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [initGame, generation]);

    const handleRestart = () => {
        setGeneration(g => g + 1);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 font-mono text-green-500">
            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* UI Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <h1 className="text-2xl font-bold mb-2">DEBUG DEFENDER</h1>
                <div className="flex items-center gap-2 text-xl">
                    <Trophy size={20} />
                    <span>{score}</span>
                </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-4">
                <div className="text-sm text-green-500/70 text-right mr-4 hidden md:block">
                    <p>MASK: Arrow Keys</p>
                    <p>SHOOT: Space</p>
                </div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors"
                >
                    EXIT CONSOLE
                </button>
            </div>

            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                    <h2 className="text-6xl font-bold text-red-500 mb-4">SYSTEM CRASHED</h2>
                    <p className="text-xl mb-8">BUGS WON. FINAL SCORE: {score}</p>
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold text-xl hover:bg-green-400"
                    >
                        <RotateCcw />
                        REBOOT SYSTEM
                    </button>
                </div>
            )}
        </div>
    );
};
