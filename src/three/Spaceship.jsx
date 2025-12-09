import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Spaceship() {
  // Load model dari folder public/drone
  const { scene } = useGLTF("/drone/scene.gltf");
  const shipRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (shipRef.current) {
      // 1. Animasi Floating (Naik Turun beda ritme sama robot)
      shipRef.current.position.y = Math.sin(t * 0.8) * 0.2;
      
      // 2. Animasi Miring dikit (Banking) seolah melayang
      shipRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
      shipRef.current.rotation.x = Math.cos(t * 0.5) * 0.05;
    }
  });

  return (
    // Posisi awal kita atur nanti di App.jsx
    // Scale disesuaikan (biasanya model import kegedean/kekecilan)
    <group ref={shipRef} dispose={null}>
      <primitive object={scene} scale={0.5} /> 
    </group>
  );
}

// Preload biar gak loading lama
useGLTF.preload("/drone/scene.gltf");