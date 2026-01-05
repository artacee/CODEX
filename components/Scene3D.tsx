import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX intrinsic elements in some environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const Particles = () => {
  const count = 100; // Restored high particle count
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
        factor: 0.5 + Math.random(),
        speed: 0.1 + Math.random() * 0.3,
        rotationSpeed: (Math.random() - 0.5) * 2,
        color: i % 2 === 0 ? "#2EFF7B" : "#0088FF"
      });
    }
    return temp;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    particles.forEach((p, i) => {
      color.set(p.color);
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      const { x, y, z, factor, speed, rotationSpeed } = p;
      
      const floatY = Math.sin(time * speed + x) * factor * 0.5;
      const floatX = Math.cos(time * speed * 0.5 + y) * factor * 0.2;
      
      dummy.position.set(x + floatX, y + floatY, z);
      
      const rot = time * rotationSpeed;
      dummy.rotation.set(rot, rot, rot);
      dummy.scale.set(1, 1, 1);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.15, 0.15, 0.15]} /> 
      <meshBasicMaterial transparent opacity={0.6} toneMapped={false} />
    </instancedMesh>
  );
};

const Geometries = () => {
  const groupRef = useRef<THREE.Group>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    // Mouse Parallax
    const parallaxX = state.pointer.x * 0.5;
    const parallaxY = state.pointer.y * 0.5;

    if (groupRef.current) {
        groupRef.current.rotation.y = scrollY * 0.0002 + time * 0.05;
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, parallaxX, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -parallaxY, 0.1);
    }

    if (icosahedronRef.current) {
        icosahedronRef.current.rotation.x = time * 0.2;
        icosahedronRef.current.rotation.y = time * 0.3;
        const scale = 1 + Math.sin(time * 2) * 0.05;
        icosahedronRef.current.scale.set(scale, scale, scale);
    }

    if (torusRef.current) {
         torusRef.current.rotation.z = -time * 0.1;
         torusRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
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
            
            {/* Outer Ring - High Fidelity (16 segments, 100 radial) */}
            <mesh ref={torusRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial 
                    color="#0088FF" 
                    emissive="#0088FF" 
                    emissiveIntensity={2} 
                    toneMapped={false}
                />
            </mesh>

            {/* Particles */}
            <Particles />
        </group>
    </group>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        gl={{ antialias: true, alpha: true }} 
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        <ambientLight intensity={0.5} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2EFF7B" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#0088FF" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Geometries />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};