import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

/**
 * HoloProjection
 * - Foto hologram cinematic
 * - Scanline
 * - Flicker tiap 2 detik
 * - Glitch keras saat VERIFIED & saat leaving
 */
export default function HoloProjection({ state, src }) {
  const controls = useAnimation();

  useEffect(() => {
    if (state === "active") {
      // BOOT + GLITCH VERIFIED
      (async () => {
        await controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        });

        // GLITCH 2x (VERIFIED)
        await controls.start({
          x: [0, -8, 8, -4, 4, 0],
          opacity: [1, 0.6, 1],
          transition: { duration: 0.25 },
        });

        await controls.start({
          x: [0, 6, -6, 0],
          opacity: [1, 0.7, 1],
          transition: { duration: 0.25 },
        });

        // IDLE FLICKER LOOP
        controls.start({
          opacity: [1, 0.85, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        });
      })();
    }

    if (state === "leaving") {
      // GLITCH + DISAPPEAR
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        opacity: [1, 0.4, 0],
        y: [0, 20],
        transition: { duration: 0.4 },
      });
    }

    if (state === "idle") {
      controls.set({ opacity: 0, y: 40 });
    }
  }, [state, controls]);

  if (state === "idle" || state === "forming") return null;

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, y: 40 }}
      style={{
        position: "absolute",
        bottom: 140,
        width: 260,
        zIndex: 4,
        filter: "drop-shadow(0 0 45px rgba(0,243,255,0.8))",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* IMAGE */}
        <img
          src={src}
          alt="Pilot"
          style={{
            width: "100%",
            display: "block",
            opacity: 0.95,
            filter: "contrast(1.1) saturate(1.05)",
          }}
        />

        {/* SCANLINE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(to bottom, rgba(0,243,255,0.2) 0, rgba(0,243,255,0.2) 1px, transparent 3px)",
            animation: "scan 3s linear infinite",
            mixBlendMode: "screen",
          }}
        />

        {/* NOISE / FLICKER */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,243,255,0.15)",
            animation: "flicker 2s infinite",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* VERIFIED LABEL */}
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          fontSize: "0.75rem",
          letterSpacing: "2px",
          color: "#00f3ff",
          textShadow: "0 0 10px rgba(0,243,255,0.8)",
        }}
      >
        STATUS : VERIFIED
      </div>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes flicker {
            0%,100% { opacity: 0.15; }
            50% { opacity: 0.35; }
          }
        `}
      </style>
    </motion.div>
  );
}
