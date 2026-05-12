import { Canvas, useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function ParticleField({ active }) {
  const ref = useRef();

  const particles = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = active ? Math.random() * 1.2 : Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = active ? Math.random() * 0.4 : (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }

    return positions;
  }, [active]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.002;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00f3ff"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </Points>
  );
}

export default function HoloParticleBase({ active }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField active={active} />
    </Canvas>
  );
}
