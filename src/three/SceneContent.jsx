import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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

export default function SceneContent({ sceneReady }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const robotGroup = useRef();
  const droneRef = useRef();
  const cameraStart = useRef(new THREE.Vector3(0, 0.35, 8));
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 5));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const introProgress = useRef(0);

  // hologram refs
  const holoOuterMat = useRef();
  const holoInnerMat = useRef();
  const holoFrameMat = useRef();
  const holoGroup = useRef();

  useEffect(() => {
    camera.position.copy(cameraStart.current);
    camera.lookAt(lookAtTarget.current);
  }, [camera]);

  useFrame((state, delta) => {
    const offset = scroll.offset;
    const t = state.clock.getElapsedTime();

    introProgress.current = THREE.MathUtils.damp(
      introProgress.current,
      sceneReady ? 1 : 0,
      2.5,
      delta
    );

    camera.position.lerpVectors(
      cameraStart.current,
      cameraTarget.current,
      introProgress.current
    );
    camera.lookAt(lookAtTarget.current);

    if (robotGroup.current) {
      robotGroup.current.position.x = 2.5 - offset * 5;
      robotGroup.current.position.z = -4 + offset * 4;
      robotGroup.current.rotation.y = -0.5 + offset;
      robotGroup.current.rotation.x = offset * 0.1;
    }

    if (droneRef.current) {
      droneRef.current.position.x = 1.5 + Math.cos(t * 1.2) * 0.8;
      droneRef.current.position.y = 0.6 + Math.sin(t * 1.2) * 0.4;
      droneRef.current.rotation.y += 0.02;
    }

    // ===== HOLOGRAM GLITCH =====
    const cycle = t % 5;
    const glitch =
      (cycle > 0.35 && cycle < 0.45) || (cycle > 0.75 && cycle < 0.85);

    if (holoOuterMat.current && holoInnerMat.current && holoFrameMat.current) {
      if (glitch) {
        holoOuterMat.current.opacity = 0.02;
        holoInnerMat.current.opacity = 0.03;
        holoFrameMat.current.opacity = 0.15;
        holoFrameMat.current.color.set("#003344");
      } else {
        holoOuterMat.current.opacity = 0.12;
        holoInnerMat.current.opacity = 0.35;
        holoFrameMat.current.opacity = 0.6;
        holoFrameMat.current.color.set("#00f3ff");
      }
    }

    if (holoGroup.current) {
      const baseY = -0.22;
      if (glitch) {
        holoGroup.current.rotation.y =
          baseY + (Math.sin(t * 40) * 3 * Math.PI) / 180;
      } else {
        holoGroup.current.rotation.y = THREE.MathUtils.lerp(
          holoGroup.current.rotation.y,
          baseY,
          0.08
        );
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />

      <Stars radius={100} depth={50} count={7000} factor={4} fade speed={0.5} />
      <Sparkles count={200} scale={[20, 20, 20]} size={4} opacity={0.5} />

      <Float speed={1}>
        <mesh position={[-6, 2, -15]} scale={4}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color="#110022" speed={1} distort={0.3} />
        </mesh>
      </Float>

      {/* ROBOT + HOLOGRAM */}
      <group ref={robotGroup} position={[2.5, -1.8, -4]} scale={1.6}>
        <Float speed={2}>
          <MechaRobot />
        </Float>

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
        />

        {/* ===== HOLOGRAM CORE PARAMETERS ===== */}
        <Float speed={2.1}>
          <group
            ref={holoGroup}
            position={[-2.1, 0.45, -0.1]}
            rotation={[0.02, -0.22, 0]}
          >
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[1.7, 0.95]} />
              <meshBasicMaterial
                ref={holoFrameMat}
                wireframe
                transparent
                opacity={0.6}
              />
            </mesh>

            <mesh>
              <planeGeometry args={[1.6, 0.9]} />
              <meshBasicMaterial
                ref={holoOuterMat}
                transparent
                opacity={0.12}
              />
            </mesh>

            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[1.5, 0.8]} />
              <meshBasicMaterial
                ref={holoInnerMat}
                transparent
                opacity={0.35}
              />
            </mesh>

            {/* ===== TEXT CORE PARAMETERS ===== */}
            <Text
              position={[-0.72, 0.32, 0.02]}
              fontSize={0.11}
              color="#00f3ff"
              anchorX="left"
              anchorY="top"
            >
              CORE PARAMETERS
            </Text>

            <Text
              position={[-0.72, 0.12, 0.02]}
              fontSize={0.085}
              color="#ffcc00"
              anchorX="left"
              anchorY="top"
            >
              STACK     : REACT | IOT
            </Text>

            <Text
              position={[-0.72, -0.02, 0.02]}
              fontSize={0.085}
              color="#00f3ff"
              anchorX="left"
              anchorY="top"
            >
              MINDSET   : PROBLEM SOLVER
            </Text>

            <Text
              position={[-0.72, -0.16, 0.02]}
              fontSize={0.085}
              color="#ff0055"
              anchorX="left"
              anchorY="top"
            >
              WORKFLOW  : SYSTEM-DRIVEN
            </Text>

            <Text
              position={[-0.72, -0.3, 0.02]}
              fontSize={0.085}
              color="#25D366"
              anchorX="left"
              anchorY="top"
            >
              OUTPUT    : REAL-WORLD SOLUTION
            </Text>
          </group>
        </Float>
      </group>

      {/* DRONE */}
      <Float speed={2}>
        <group ref={droneRef} position={[1.5, 0.6, -2]}>
          <mesh>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial emissive="#00f3ff" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
