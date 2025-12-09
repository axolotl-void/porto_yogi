// src/three/MechaRobot.jsx
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// ====== KUKU ROBOT ======
const RobotClaw = ({ material }) => (
  <group position={[0, -0.35, 0]}>
    <mesh position={[-0.08, -0.1, 0]} rotation={[0, 0, 0.5]}>
      <boxGeometry args={[0.05, 0.2, 0.05]} />
      {material}
    </mesh>
    <mesh position={[0.08, -0.1, 0]} rotation={[0, 0, -0.5]}>
      <boxGeometry args={[0.05, 0.2, 0.05]} />
      {material}
    </mesh>
    <mesh position={[0, -0.1, -0.08]} rotation={[0.5, 0, 0]}>
      <boxGeometry args={[0.05, 0.2, 0.05]} />
      {material}
    </mesh>
  </group>
);

export default function MechaRobot() {
  const headRef = useRef();
  const bodyRef = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const mouthRef = useRef();

  // material yang bakal di-glow
  const leftEyeMat = useRef();
  const rightEyeMat = useRef();
  const chestMat = useRef();
  const mouthMat = useRef();

  const [expression, setExpression] = useState("neutral");
  const [blink, setBlink] = useState(false);

  const handleRobotClick = () => {
    setExpression("angry");
    setTimeout(() => setExpression("neutral"), 2000);
  };

  // ====== BLINK LOOP ======
  useEffect(() => {
    const blinkLoop = setInterval(() => {
      if (expression !== "angry") {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
      }
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkLoop);
  }, [expression]);

  // ====== ANIMASI FRAME-BY-FRAME ======
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = THREE.MathUtils.clamp(state.pointer.x, -0.5, 0.5);
    const mouseY = THREE.MathUtils.clamp(state.pointer.y, -0.5, 0.5);

    // gerak naik-turun halus
    if (headRef.current && bodyRef.current) {
      headRef.current.position.y = 0.7 + Math.sin(t * 1.5) * 0.02;
      bodyRef.current.position.y = Math.sin(t * 1.5) * 0.02;

      // ikutin mouse
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.5,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseY * 0.5,
        0.1
      );
    }

    // lambaian tangan dikit
    if (leftArm.current && rightArm.current) {
      leftArm.current.position.y = Math.sin(t * 2) * 0.05;
      rightArm.current.position.y = Math.cos(t * 2) * 0.05;
    }

    // mata: blink + ekspresi
    if (leftEyeRef.current && rightEyeRef.current) {
      const scaleY = blink ? 0.1 : 1;

      if (expression === "angry") {
        leftEyeRef.current.rotation.z = -0.4;
        rightEyeRef.current.rotation.z = 0.4;
        leftEyeRef.current.scale.y = 1;
        rightEyeRef.current.scale.y = 1;
      } else if (expression === "happy") {
        leftEyeRef.current.rotation.z = 0;
        rightEyeRef.current.rotation.z = 0;
        leftEyeRef.current.scale.y = 0.5;
        rightEyeRef.current.scale.y = 0.5;
      } else {
        leftEyeRef.current.rotation.z = 0;
        rightEyeRef.current.rotation.z = 0;
        leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
          leftEyeRef.current.scale.y,
          scaleY,
          0.4
        );
        rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
          rightEyeRef.current.scale.y,
          scaleY,
          0.4
        );
      }
    }

    // mulut "ngomong" pelan
    if (mouthRef.current && expression !== "happy") {
      const talk = 1 + Math.sin(t * 15) * 0.2;
      mouthRef.current.scale.x = THREE.MathUtils.lerp(
        mouthRef.current.scale.x,
        talk,
        0.2
      );
    }

    // ====== GLOW PULSE UPGRADE ======
    const baseColor = expression === "angry" ? "#ff0000" : "#ffcc00";

    const pulseGlow = (matRef, offset = 0) => {
      if (!matRef.current) return;
      const tt = t + offset;

      const energy = 0.5 + 0.5 * Math.sin(tt * 3); // 0–1
      const c = new THREE.Color(baseColor);
      const hsl = {};
      c.getHSL(hsl);
      // terang-gelap berkala
      c.setHSL(
        hsl.h,
        hsl.s,
        THREE.MathUtils.lerp(0.35, 0.9, energy) // lightness berubah
      );
      matRef.current.color.copy(c);
    };

    pulseGlow(leftEyeMat, 0.0);
    pulseGlow(rightEyeMat, 0.3);
    pulseGlow(chestMat, 0.6);
    pulseGlow(mouthMat, 0.9);
  });

  // ====== MATERIAL DASAR ======
  const whiteSkin = (
    <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.5} />
  );
  const blackMetal = (
    <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
  );
  const blackGlass = (
    <meshStandardMaterial color="black" roughness={0.1} metalness={0.8} />
  );

  const eyeBaseColor = expression === "angry" ? "#ff0000" : "#ffcc00";

  return (
    <group
      onClick={handleRobotClick}
      onPointerOver={() => setExpression("happy")}
      onPointerOut={() => setExpression("neutral")}
    >
      {/* ===== KEPALA ===== */}
      <group ref={headRef} position={[0, 0.7, 0]}>
        {/* bentuk kepala */}
        <RoundedBox args={[1, 0.9, 0.8]} radius={0.15} smoothness={2}>
          {whiteSkin}
        </RoundedBox>
        {/* kaca depan */}
        <RoundedBox args={[0.85, 0.7, 0.82]} radius={0.05} smoothness={2}>
          {blackGlass}
        </RoundedBox>

        {/* MATA */}
        <group position={[0, 0.1, 0.43]}>
          <mesh ref={leftEyeRef} position={[-0.2, 0, 0]}>
            <circleGeometry args={[0.12, 32]} />
            <meshBasicMaterial
              ref={leftEyeMat}
              color={eyeBaseColor}
              toneMapped={false}
            />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.2, 0, 0]}>
            <circleGeometry args={[0.12, 32]} />
            <meshBasicMaterial
              ref={rightEyeMat}
              color={eyeBaseColor}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* MULUT */}
        <group position={[0, -0.15, 0.43]}>
          {expression === "happy" ? (
            <mesh rotation={[0, 0, Math.PI]} position={[0, 0.05, 0]}>
              <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
              <meshBasicMaterial
                ref={mouthMat}
                color={eyeBaseColor}
                toneMapped={false}
              />
            </mesh>
          ) : (
            <mesh ref={mouthRef}>
              <planeGeometry args={[0.3, 0.05]} />
              <meshBasicMaterial
                ref={mouthMat}
                color={eyeBaseColor}
                toneMapped={false}
              />
            </mesh>
          )}
        </group>

        {/* ANTENA & SIDE LIGHT */}
        <group>
          {/* kanan */}
          <mesh position={[0.55, 0, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.4]} />
            {blackMetal}
          </mesh>
          <mesh position={[0.55, 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            {blackMetal}
          </mesh>
          <mesh position={[0.55, 0.45, 0]}>
            <sphereGeometry args={[0.05]} />
            <meshBasicMaterial color={eyeBaseColor} toneMapped={false} />
          </mesh>

          {/* kiri */}
          <mesh position={[-0.55, 0, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.4]} />
            {blackMetal}
          </mesh>
          <mesh position={[-0.55, 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            {blackMetal}
          </mesh>
          <mesh position={[-0.55, 0.45, 0]}>
            <sphereGeometry args={[0.05]} />
            <meshBasicMaterial color={eyeBaseColor} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* ===== BADAN ===== */}
      <group ref={bodyRef}>
        <RoundedBox args={[0.65, 0.6, 0.5]} radius={0.1} position={[0, -0.1, 0]}>
          {whiteSkin}
        </RoundedBox>

        {/* panel depan */}
        <mesh position={[0, -0.2, 0.26]}>
          <planeGeometry args={[0.4, 0.2]} />
          {blackMetal}
        </mesh>

        {/* lampu dada */}
        <mesh position={[0, 0, 0.26]}>
          <circleGeometry args={[0.08]} />
          <meshBasicMaterial
            ref={chestMat}
            color={eyeBaseColor}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ===== TANGAN KIRI ===== */}
      <group ref={leftArm} position={[-0.7, -0.1, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          {blackMetal}
        </mesh>
        <RoundedBox args={[0.25, 0.5, 0.25]} radius={0.05} smoothness={2}>
          {whiteSkin}
        </RoundedBox>
        <RobotClaw material={whiteSkin} />
      </group>

      {/* ===== TANGAN KANAN ===== */}
      <group ref={rightArm} position={[0.7, -0.1, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          {blackMetal}
        </mesh>
        <RoundedBox args={[0.25, 0.5, 0.25]} radius={0.05} smoothness={2}>
          {whiteSkin}
        </RoundedBox>
        <RobotClaw material={whiteSkin} />
      </group>
    </group>
  );
}
