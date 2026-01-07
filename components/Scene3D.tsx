import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Configuration - optimized for performance
const CONFIG = {
  particleCount: 120, // Reduced for better performance
  connectionDistance: 2.2,
  mouseInfluenceRadius: 5,
  mouseForce: 0.25, // Increased for snappier response
  returnForce: 0.04, // Increased for faster return
  damping: 0.92, // Lower damping = faster response
  lerpSpeed: 0.15, // Mouse position interpolation
  bounds: { x: 10, y: 7, z: 4 },
  particleSize: 0.1,
  lineOpacity: 0.2,
  colors: {
    primary: '#2EFF7B',
    secondary: '#0088FF',
    white: '#ffffff'
  }
};

// Shared mouse state - updated outside of React for performance
const mouseState = {
  target: new THREE.Vector3(0, 0, 0),
  current: new THREE.Vector3(0, 0, 0),
  isActive: false,
};

// Mouse/Touch handler component - runs at native event speed
const InputHandler: React.FC = () => {
  const { viewport, gl } = useThree();
  
  useEffect(() => {
    const canvas = gl.domElement;
    
    const updatePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseState.target.x = (x * viewport.width) / 2;
      mouseState.target.y = (y * viewport.height) / 2;
      mouseState.target.z = 0;
      mouseState.isActive = true;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleMouseLeave = () => {
      mouseState.isActive = false;
    };
    
    const handleTouchEnd = () => {
      mouseState.isActive = false;
    };
    
    // Use passive: false for touch to allow preventDefault
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl, viewport]);
  
  return null;
};

// Optimized Particle system
const ParticleNetwork: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Pre-compute colors once
  const primaryColor = useMemo(() => new THREE.Color(CONFIG.colors.primary), []);
  const secondaryColor = useMemo(() => new THREE.Color(CONFIG.colors.secondary), []);
  const mixedColor = useMemo(() => primaryColor.clone().lerp(secondaryColor, 0.5), [primaryColor, secondaryColor]);

  // Initialize particle data
  const particleData = useMemo(() => {
    const count = CONFIG.particleCount;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count); // Pre-computed phases for floating animation
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * CONFIG.bounds.x * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * CONFIG.bounds.y * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * CONFIG.bounds.z * 2;
      
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
      
      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
      
      phases[i] = Math.random() * Math.PI * 2;
      
      const mixRatio = Math.random();
      const color = primaryColor.clone().lerp(secondaryColor, mixRatio);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, velocities, originalPositions, colors, phases };
  }, [primaryColor, secondaryColor]);

  // Pre-allocate line buffers
  const maxConnections = Math.floor(CONFIG.particleCount * 20); // Limit max connections
  const linePositions = useMemo(() => new Float32Array(maxConnections * 6), []);
  const lineColors = useMemo(() => new Float32Array(maxConnections * 6), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    // Clamp delta to prevent huge jumps
    const dt = Math.min(delta, 0.05);
    const time = state.clock.getElapsedTime();
    
    // Smooth mouse interpolation - this is key for responsive feel
    mouseState.current.lerp(mouseState.target, CONFIG.lerpSpeed + dt * 5);
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const { velocities, originalPositions, phases } = particleData;
    
    const mouseX = mouseState.current.x;
    const mouseY = mouseState.current.y;
    const mouseZ = mouseState.current.z;
    const isActive = mouseState.isActive;
    
    // Batch particle updates
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      
      const px = positions[i3];
      const py = positions[i3 + 1];
      const pz = positions[i3 + 2];
      
      // Floating animation with pre-computed phase
      const floatX = Math.sin(time * 0.4 + phase) * 0.25;
      const floatY = Math.cos(time * 0.3 + phase * 1.3) * 0.25;
      
      const ox = originalPositions[i3] + floatX;
      const oy = originalPositions[i3 + 1] + floatY;
      const oz = originalPositions[i3 + 2];
      
      // Mouse interaction - only when active
      if (isActive) {
        const dx = mouseX - px;
        const dy = mouseY - py;
        const dz = mouseZ - pz;
        const distSq = dx * dx + dy * dy + dz * dz;
        const radiusSq = CONFIG.mouseInfluenceRadius * CONFIG.mouseInfluenceRadius;
        
        if (distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseForce;
          const invDist = 1 / dist;
          
          velocities[i3] += dx * invDist * force;
          velocities[i3 + 1] += dy * invDist * force;
          velocities[i3 + 2] += dz * invDist * force * 0.2;
        }
      }
      
      // Spring force to original position
      velocities[i3] += (ox - px) * CONFIG.returnForce;
      velocities[i3 + 1] += (oy - py) * CONFIG.returnForce;
      velocities[i3 + 2] += (oz - pz) * CONFIG.returnForce;
      
      // Apply damping
      velocities[i3] *= CONFIG.damping;
      velocities[i3 + 1] *= CONFIG.damping;
      velocities[i3 + 2] *= CONFIG.damping;
      
      // Update positions with delta time
      positions[i3] += velocities[i3] * (1 + dt * 10);
      positions[i3 + 1] += velocities[i3 + 1] * (1 + dt * 10);
      positions[i3 + 2] += velocities[i3 + 2] * (1 + dt * 10);
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Optimized connection calculation - use distance squared to avoid sqrt
    let lineIndex = 0;
    const connectionDistSq = CONFIG.connectionDistance * CONFIG.connectionDistance;
    const mr = mixedColor.r;
    const mg = mixedColor.g;
    const mb = mixedColor.b;
    
    for (let i = 0; i < CONFIG.particleCount && lineIndex < maxConnections; i++) {
      const i3 = i * 3;
      const px1 = positions[i3];
      const py1 = positions[i3 + 1];
      const pz1 = positions[i3 + 2];
      
      for (let j = i + 1; j < CONFIG.particleCount && lineIndex < maxConnections; j++) {
        const j3 = j * 3;
        
        const dx = px1 - positions[j3];
        const dy = py1 - positions[j3 + 1];
        const dz = pz1 - positions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < connectionDistSq) {
          const li = lineIndex * 6;
          
          linePositions[li] = px1;
          linePositions[li + 1] = py1;
          linePositions[li + 2] = pz1;
          linePositions[li + 3] = positions[j3];
          linePositions[li + 4] = positions[j3 + 1];
          linePositions[li + 5] = positions[j3 + 2];
          
          // Fast opacity calculation
          const opacity = 1 - Math.sqrt(distSq) / CONFIG.connectionDistance;
          const colorVal = opacity;
          
          lineColors[li] = mr * colorVal;
          lineColors[li + 1] = mg * colorVal;
          lineColors[li + 2] = mb * colorVal;
          lineColors[li + 3] = mr * colorVal;
          lineColors[li + 4] = mg * colorVal;
          lineColors[li + 5] = mb * colorVal;
          
          lineIndex++;
        }
      }
    }
    
    const lineGeometry = linesRef.current.geometry;
    lineGeometry.setDrawRange(0, lineIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={CONFIG.particleCount}
            array={particleData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={CONFIG.particleCount}
            array={particleData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={CONFIG.particleSize}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxConnections * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxConnections * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={CONFIG.lineOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
};

// Floating geometric accent - uses smoothed mouse state
const FloatingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const dodecahedronRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Smooth rotation state
  const smoothRotation = useRef({ x: 0, y: 0 });
  
  const { viewport } = useThree();
  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);
    
    // Use smoothed mouse position for parallax - normalize to -1 to 1 range
    const mouseX = mouseState.current.x / (viewport.width / 2);
    const mouseY = mouseState.current.y / (viewport.height / 2);
    
    // Smooth rotation interpolation
    smoothRotation.current.x += (mouseY * 0.2 - smoothRotation.current.x) * (0.08 + dt * 2);
    smoothRotation.current.y += (mouseX * 0.3 - smoothRotation.current.y) * (0.08 + dt * 2);
    
    // Mouse parallax for the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y = smoothRotation.current.y;
      groupRef.current.rotation.x = -smoothRotation.current.x;
    }
    
    // Central icosahedron - pulsing and rotating
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
      const pulse = 1 + Math.sin(time * 1.5) * 0.08;
      meshRef.current.scale.setScalar(pulse);
    }
    
    // Main ring - slow rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.1;
    }
    
    // Second ring - counter rotation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.1;
      ring2Ref.current.rotation.y = time * 0.08;
    }
    
    // Third ring - perpendicular
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.12;
      ring3Ref.current.rotation.z = Math.cos(time * 0.4) * 0.3;
    }
    
    // Orbiting dodecahedron
    if (dodecahedronRef.current) {
      const orbitRadius = 3.5;
      dodecahedronRef.current.position.x = Math.cos(time * 0.4) * orbitRadius;
      dodecahedronRef.current.position.z = Math.sin(time * 0.4) * orbitRadius;
      dodecahedronRef.current.position.y = Math.sin(time * 0.8) * 0.5;
      dodecahedronRef.current.rotation.x = time * 0.5;
      dodecahedronRef.current.rotation.y = time * 0.7;
    }
    
    // Orbiting octahedron - opposite direction
    if (octahedronRef.current) {
      const orbitRadius = 4;
      octahedronRef.current.position.x = Math.cos(-time * 0.3 + Math.PI) * orbitRadius;
      octahedronRef.current.position.z = Math.sin(-time * 0.3 + Math.PI) * orbitRadius;
      octahedronRef.current.position.y = Math.cos(time * 0.6) * 0.8;
      octahedronRef.current.rotation.x = -time * 0.4;
      octahedronRef.current.rotation.z = time * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Central icosahedron - main focal point */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#2EFF7B"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#2EFF7B"
          transparent
          opacity={0.05}
        />
      </mesh>
      
      {/* Primary ring - horizontal */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.015, 16, 128]} />
        <meshBasicMaterial
          color="#0088FF"
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Secondary ring - tilted */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.01, 16, 128]} />
        <meshBasicMaterial
          color="#2EFF7B"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Tertiary ring - perpendicular */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <torusGeometry args={[2.5, 0.008, 16, 128]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Orbiting dodecahedron */}
      <mesh ref={dodecahedronRef}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial
          color="#0088FF"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Orbiting octahedron */}
      <mesh ref={octahedronRef}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshBasicMaterial
          color="#2EFF7B"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Scattered small cubes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4.5 + Math.random() * 0.5;
        const y = (Math.random() - 0.5) * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#2EFF7B" : "#0088FF"}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Gradient background plane
const GradientBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#050505') },
        uColor2: { value: new THREE.Color('#0a1a0f') },
        uColor3: { value: new THREE.Color('#050510') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        
        void main() {
          float noise = sin(vUv.x * 3.0 + uTime * 0.1) * cos(vUv.y * 3.0 + uTime * 0.15) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, vUv.y + noise * 0.1);
          color = mix(color, uColor3, vUv.x * 0.3);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    gradientMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <primitive object={gradientMaterial} attach="material" />
    </mesh>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 touch-none">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Slightly lower max DPR for performance
        frameloop="always"
        performance={{ min: 0.5 }}
        style={{ touchAction: 'none' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        
        <ambientLight intensity={0.3} />
        
        <InputHandler />
        <GradientBackground />
        <ParticleNetwork />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
};