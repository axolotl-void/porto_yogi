// src/three/SceneContent.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Sparkles,
  Stars,
  MeshDistortMaterial,
  useScroll,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import MechaRobot from "./MechaRobot.jsx";

export default function SceneContent() {
  const scroll = useScroll();
  const robotGroup = useRef();
  const droneRef = useRef();

  // refs hologram
  const holoOuterMat = useRef();
  const holoInnerMat = useRef();
  const holoFrameMat = useRef();
  const holoGroup = useRef();

  useFrame((state) => {
    const offset = scroll.offset;
    const t = state.clock.getElapsedTime();

    // Gerakan robot saat scroll
    if (robotGroup.current) {
      robotGroup.current.position.x = 2.5 - offset * 5;
      robotGroup.current.position.z = -4 + offset * 4;
      robotGroup.current.rotation.y = -0.5 + offset;
      robotGroup.current.rotation.x = offset * 0.1;
    }

    // Gerakan mini-drone / satelit
    if (droneRef.current) {
      droneRef.current.position.x = 1.5 + Math.cos(t * 1.2) * 0.8;
      droneRef.current.position.y = 0.6 + Math.sin(t * 1.2) * 0.4;
      droneRef.current.rotation.y += 0.02;
    }

    // ===== ANIMASI HOLOGRAM: TV RUSAK (ilang-muncul) =====
    const cycle = t % 5; // 0 - 5

    // dua glitch window: 0.35–0.45 dan 0.75–0.85
    const glitch =
      (cycle > 0.35 && cycle < 0.45) || (cycle > 0.75 && cycle < 0.85);

    const baseOuter = 0.12;
    const baseInner = 0.35;
    const baseFrame = 0.6;

    if (holoOuterMat.current && holoInnerMat.current && holoFrameMat.current) {
      if (glitch) {
        // layarnya "mati" → hampir transparan
        holoOuterMat.current.opacity = 0.02;
        holoInnerMat.current.opacity = 0.03;
        holoFrameMat.current.opacity = 0.15;
        holoFrameMat.current.color.set("#003344");
      } else {
        // normal
        holoOuterMat.current.opacity = baseOuter;
        holoInnerMat.current.opacity = baseInner;
        holoFrameMat.current.opacity = baseFrame;
        holoFrameMat.current.color.set("#00f3ff");
      }
    }

    // sedikit jitter rotasi saat glitch biar berasa rusak
    if (holoGroup.current) {
      const baseRotY = -0.22;
      const baseRotZ = 0;

      if (glitch) {
        holoGroup.current.rotation.y =
          baseRotY + (Math.sin(t * 40) * 3 * Math.PI) / 180;
        holoGroup.current.rotation.z =
          baseRotZ + (Math.cos(t * 35) * 2 * Math.PI) / 180;
      } else {
        // balik pelan ke posisi normal
        holoGroup.current.rotation.y = THREE.MathUtils.lerp(
          holoGroup.current.rotation.y,
          baseRotY,
          0.08
        );
        holoGroup.current.rotation.z = THREE.MathUtils.lerp(
          holoGroup.current.rotation.z,
          baseRotZ,
          0.08
        );
      }
    }
  });

  return (
    <>
      {/* Background & efek bintang */}
      <color attach="background" args={["#050505"]} />

      <Stars
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <Sparkles
        count={200}
        scale={[20, 20, 20]}
        size={4}
        speed={0.2}
        opacity={0.5}
        color="#ffffff"
      />

      {/* Planet besar di belakang */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.2}>
        <mesh position={[-6, 2, -15]} scale={4}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color="#110022" speed={1} distort={0.3} />
        </mesh>
      </Float>

      {/* Robot + bayangan + hologram panel */}
      <group ref={robotGroup} position={[2.5, -1.8, -4]} scale={1.6}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <MechaRobot />
        </Float>

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={2}
          resolution={256}
          color="black"
        />

        {/* HOLOGRAM PANEL di samping robot */}
        <Float speed={2.1} rotationIntensity={0.18} floatIntensity={0.3}>
          <group
            ref={holoGroup}
            // geser lebih kiri & agak mundur biar gak nabrak card HTML
            position={[-2.1, 0.45, -0.1]}
            rotation={[0.02, -0.22, 0]}
          >
            {/* FRAME TIPIS (wireframe) */}
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[1.7, 0.95]} />
              <meshBasicMaterial
                ref={holoFrameMat}
                color="#00f3ff"
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
                wireframe
              />
            </mesh>

            {/* layer luar tipis */}
            <mesh>
              <planeGeometry args={[1.6, 0.9]} />
              <meshBasicMaterial
                ref={holoOuterMat}
                color="#00f3ff"
                transparent
                opacity={0.12}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* layer dalam lebih solid */}
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[1.5, 0.8]} />
              <meshBasicMaterial
                ref={holoInnerMat}
                color="#00f3ff"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* garis dekorasi kanan atas */}
            <mesh position={[0.55, 0.3, 0.02]}>
              <planeGeometry args={[0.32, 0.02]} />
              <meshBasicMaterial
                color="#ffcc00"
                transparent
                opacity={0.85}
              />
            </mesh>
            <mesh position={[0.55, 0.22, 0.02]}>
              <planeGeometry args={[0.2, 0.02]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.5}
              />
            </mesh>

            {/* Teks di hologram (font diperkecil & lineHeight dirapiin) */}
            <Text
              position={[-0.72, 0.28, 0.02]}
              fontSize={0.11}
              color="#ffffff"
              anchorX="left"
              anchorY="top"
              maxWidth={1.35}
              lineHeight={1.2}
            >
              LAB MANAGEMENT SYSTEM
            </Text>

            <Text
              position={[-0.72, 0.03, 0.02]}
              fontSize={0.09}
              color="#bffcff"
              anchorX="left"
              anchorY="top"
              maxWidth={1.35}
              lineHeight={1.3}
            >
              IoT • Web Dashboard • Lab Monitor
            </Text>

            <Text
              position={[-0.72, -0.22, 0.02]}
              fontSize={0.08}
              color="#00f3ff"
              anchorX="left"
              anchorY="top"
              maxWidth={1.35}
              lineHeight={1.3}
            >
              RPi • Sensors • Realtime Usage
            </Text>

            <Text
              position={[-0.72, -0.36, 0.02]}
              fontSize={0.078}
              color="#ffcc00"
              anchorX="left"
              anchorY="top"
            >
              STATUS: ONLINE
            </Text>
          </group>
        </Float>
      </group>

      {/* Mini drone / satelit depan robot */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.6}>
        <group ref={droneRef} position={[1.5, 0.6, -2]}>
          <mesh>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          <mesh scale={[0.35, 0.35, 0.35]}>
            <torusGeometry args={[0.8, 0.07, 16, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}
