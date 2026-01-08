import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { X } from 'lucide-react';

export const GravityPlayground: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            Events = Matter.Events,
            Vector = Matter.Vector,
            Body = Matter.Body;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Boundaries
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions);
        const ceiling = Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions);
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions);
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions);

        Composite.add(world, [ground, ceiling, leftWall, rightWall]);

        // Bodies
        const icons = ['/favicon1.png', '/asset.png'];
        const bodyList: Matter.Body[] = [];

        for (let i = 0; i < 20; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2) - 200;
            const size = 40 + Math.random() * 40;
            const icon = icons[i % icons.length];

            const body = Bodies.circle(x, y, size / 2, {
                restitution: 0.8,
                render: {
                    sprite: {
                        texture: icon,
                        xScale: size / 100,
                        yScale: size / 100
                    }
                }
            });
            bodyList.push(body);
        }

        Composite.add(world, bodyList);

        // Mouse Setup (for position tracking only)
        const mouse = Mouse.create(render.canvas);
        mouse.pixelRatio = window.devicePixelRatio;
        render.mouse = mouse;

        // Repulsion Logic
        Events.on(engine, 'beforeUpdate', () => {
            const mousePosition = mouse.position;
            const repulsionRange = 300; // Increased range
            const repulsionStrength = 0.05; // 50x Stronger

            bodyList.forEach(body => {
                const dx = body.position.x - mousePosition.x;
                const dy = body.position.y - mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < repulsionRange && distance > 0) {
                    // Calculate normalized vector
                    const force = Vector.create(dx / distance, dy / distance);
                    // Inverse linear strength (stronger when closer)
                    const strength = repulsionStrength * (1 - distance / repulsionRange) * body.mass;

                    Body.applyForce(body, body.position, Vector.mult(force, strength));
                }
            });
        });

        // Run
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // CSS Fix
        render.canvas.style.width = '100%';
        render.canvas.style.height = '100%';

        // Resize
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
            Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(world, false);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
            <div ref={sceneRef} className="absolute inset-0" />

            <div className="absolute top-8 left-0 right-0 pointer-events-none flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">ZERO-G PLAYGROUND</h1>
                <p className="text-white/60">Move your mouse to repel the elements! 🧲</p>
            </div>

            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            >
                <X size={24} />
            </button>
        </div>
    );
};
