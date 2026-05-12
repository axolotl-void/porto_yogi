import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll } from "@react-three/drei";

// UI Components
import Navbar from "./components/Navbar.jsx";
import HudOverlay from "./components/HudOverlay.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import AnimatedSection from "./components/AnimatedSection.jsx";

// Three.js Scene
import SceneContent from "./three/SceneContent.jsx";

// Sections
import HeroSection from "./sections/HeroSection.jsx";
import AboutSection from "./sections/AboutSection.jsx";
import SkillsSection from "./sections/SkillsSection.jsx";
import MissionsSection from "./sections/MissionsSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";

/* ======================
   CUSTOM LOADER
====================== */
function CustomLoader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onFinished();
          }, 500);
          return 100;
        }
        return old + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinished]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.5s ease",
        opacity: progress >= 100 ? 0 : 1,
      }}
    >
      <h2
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: "#ffcc00",
          marginBottom: "10px",
        }}
      >
        INITIALIZING... {progress}%
      </h2>

      <div style={{ width: 300, height: 4, background: "#333" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#ffcc00",
          }}
        />
      </div>
    </div>
  );
}

/* ======================
   MAIN APP
====================== */
export default function App() {
  const [systemReady, setSystemReady] = useState(false);

  return (
    <>
      <CustomLoader onFinished={() => setSystemReady(true)} />

      {systemReady && (
        <>
          {/* UI Overlay */}
          <Navbar />
          <HudOverlay />

          {/* 3D CANVAS */}
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 10, 5]}
              angle={0.5}
              penumbra={1}
              intensity={1}
              color="#ffcc00"
            />
            <spotLight
              position={[-10, 0, 10]}
              angle={0.5}
              penumbra={1}
              intensity={1}
              color="#0088ff"
            />
            <Environment preset="city" />

            <Suspense fallback={null}>
              <ScrollControls pages={6} damping={0.3}>
                <ScrollProgress />
                <SceneContent />

                <Scroll html style={{ width: "100%" }}>
                  <AnimatedSection>
                    <HeroSection />
                  </AnimatedSection>

                  <AnimatedSection>
                    <AboutSection />
                  </AnimatedSection>

                  <AnimatedSection>
                    <SkillsSection />
                  </AnimatedSection>

                  <AnimatedSection>
                    <MissionsSection />
                  </AnimatedSection>

                  <AnimatedSection>
                    <ContactSection />
                  </AnimatedSection>
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
        </>
      )}
    </>
  );
}
