import { useEffect, useMemo, useRef } from "react";

/**
 * HoloParticleField
 * - Partikel berasal dari luar viewport
 * - Menyatu membentuk ring holo
 * - Orbit saat active
 * - Pecah saat leaving
 */
export default function HoloParticleField({
  state = "idle", // idle | forming | active | leaving
  size = 260,
  particles = 120,
}) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  const radius = size / 2 - 18;
  const center = size / 2;

  // ======================
  // INIT PARTICLES
  // ======================
  const initialParticles = useMemo(() => {
    return Array.from({ length: particles }).map(() => {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;

      // spawn dari luar area
      if (side === 0) { x = -100; y = Math.random() * size; }
      if (side === 1) { x = size + 100; y = Math.random() * size; }
      if (side === 2) { x = Math.random() * size; y = -100; }
      if (side === 3) { x = Math.random() * size; y = size + 100; }

      const angle = Math.random() * Math.PI * 2;

      return {
        x,
        y,
        angle,
        speed: 0.002 + Math.random() * 0.004,
        el: null,
      };
    });
  }, [particles, size]);

  // ======================
  // ANIMATION LOOP
  // ======================
  useEffect(() => {
    particlesRef.current = initialParticles;

    let raf;
    const animate = () => {
      particlesRef.current.forEach((p, i) => {
        if (!p.el) return;

        if (state === "forming") {
          // converge ke ring
          const tx = center + Math.cos(p.angle) * radius;
          const ty = center + Math.sin(p.angle) * radius;
          p.x += (tx - p.x) * 0.08;
          p.y += (ty - p.y) * 0.08;
        }

        if (state === "active") {
          // orbit
          p.angle += p.speed;
          p.x = center + Math.cos(p.angle) * radius;
          p.y = center + Math.sin(p.angle) * radius;
        }

        if (state === "leaving") {
          // disperse keluar
          p.x += Math.cos(p.angle) * 12;
          p.y += Math.sin(p.angle) * 12;
        }

        if (state === "idle") {
          // drifting halus di luar
          p.x += Math.cos(p.angle) * 0.4;
          p.y += Math.sin(p.angle) * 0.4;
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
        p.el.style.opacity =
          state === "active" ? 0.9 :
          state === "forming" ? 0.6 :
          0.25;
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [state, center, radius, initialParticles]);

  // ======================
  // RENDER
  // ======================
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        pointerEvents: "none",
        filter: "drop-shadow(0 0 35px rgba(0,243,255,0.6))",
      }}
    >
      {initialParticles.map((_, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i].el = el)}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#00f3ff",
            boxShadow: "0 0 8px rgba(0,243,255,0.9)",
            transform: "translate(-999px,-999px)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
