import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX intrinsic elements in some environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const Geometries = () => {
  const groupRef = useRef<THREE.Group>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  // Generate random floating particles
  const particles = useMemo(() => {
    const count = 30;
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    // Mouse Parallax - slight movement opposite to cursor
    // state.pointer.x is -1 to 1
    const parallaxX = state.pointer.x * 0.5;
    const parallaxY = state.pointer.y * 0.5;

    if (groupRef.current) {
        // Rotate entire group based on scroll
        groupRef.current.rotation.y = scrollY * 0.0002 + time * 0.05;
        // Float group slightly with mouse
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, parallaxX, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -parallaxY, 0.1);
    }

    if (icosahedronRef.current) {
        // Main core rotation
        icosahedronRef.current.rotation.x = time * 0.2;
        icosahedronRef.current.rotation.y = time * 0.3;
        // Pulse scale
        const scale = 1 + Math.sin(time * 2) * 0.05;
        icosahedronRef.current.scale.set(scale, scale, scale);
    }

    if (torusRef.current) {
         // Outer ring rotation (counter-rotate)
         torusRef.current.rotation.z = -time * 0.1;
         torusRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
        {/* Central Tech Core */}
        <group position={[0, 0, 0]}>
            {/* Inner Glowing Core */}
            <mesh ref={icosahedronRef}>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial 
                    color="#2EFF7B" 
                    wireframe 
                    transparent 
                    opacity={0.3} 
                    emissive="#2EFF7B"
                    emissiveIntensity={0.5}
                />
            </mesh>
            
            {/* Outer Ring */}
            <mesh ref={torusRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial 
                    color="#0088FF" 
                    emissive="#0088FF" 
                    emissiveIntensity={2} 
                    toneMapped={false}
                />
            </mesh>

            {/* Random Floating Data Chunks */}
            {particles.map((particle, i) => (
                <Float
                    key={i}
                    speed={particle.speed * 5} 
                    rotationIntensity={2} 
                    floatIntensity={2} 
                    position={[
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 10
                    ]}
                >
                    <mesh>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#2EFF7B" : "#0088FF"} transparent opacity={0.6} />
                    </mesh>
                </Float>
            ))}
        </group>
    </group>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2EFF7B" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#0088FF" />
        
        {/* Stars Background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Geometries />
        
        {/* Environment reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};