import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll } from "@react-three/drei";

// Components (UI) – TANPA assets
import Navbar from "./components/Navbar.jsx";
import HudOverlay from "./components/HudOverlay.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";

// Three.js scene
import SceneContent from "./three/SceneContent.jsx";

// HTML sections
import HeroSection from "./sections/HeroSection.jsx";
import AboutSection from "./sections/AboutSection.jsx";
import SkillsSection from "./sections/SkillsSection.jsx";
import MissionsSection from "./sections/MissionsSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";

// =======================
// Custom Loader
// =======================
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
            if (onFinished) onFinished();
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
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#050505",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.5s ease-out",
        opacity: progress >= 100 ? 0 : 1,
      }}
    >
      <h2
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: "#ffcc00",
          fontSize: "1.5rem",
          marginBottom: "10px",
        }}
      >
        INITIALIZING... {progress}%
      </h2>
      <div
        style={{
          width: "300px",
          height: "4px",
          background: "#333",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
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

// =======================
// APP UTAMA
// =======================
function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loader di awal */}
      <CustomLoader onFinished={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* Navbar & HUD overlay 2D */}
          <Navbar />
          <HudOverlay />

          {/* Canvas 3D */}
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
                {/* Scroll progress bar (kanan) */}
                <ScrollProgress />

                {/* Scene 3D (planet + robot) */}
                <SceneContent />

                {/* Konten HTML yang ikut scroll */}
                <Scroll html style={{ width: "100%" }}>
                  <HeroSection />
                  <AboutSection />
                  <SkillsSection />
                  <MissionsSection />
                  <ContactSection />
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
        </>
      )}
    </>
  );
}

export default App;
