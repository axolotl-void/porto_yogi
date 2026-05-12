import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

/**
 * GlitchText
 * - Glitch keras saat trigger = true
 * - Setelah itu stabil
 * - Bisa dipakai ulang di mana saja
 */
export default function GlitchText({
  text = "STATUS : VERIFIED",
  trigger = false,
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      (async () => {
        // GLITCH BURST
        await controls.start({
          x: [0, -6, 6, -3, 3, 0],
          opacity: [1, 0.4, 1],
          transition: { duration: 0.25 },
        });

        await controls.start({
          x: [0, 4, -4, 0],
          opacity: [1, 0.6, 1],
          transition: { duration: 0.25 },
        });

        // STABILIZE
        controls.start({
          opacity: 1,
          x: 0,
        });
      })();
    }
  }, [trigger, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      style={{
        fontSize: "0.75rem",
        letterSpacing: "2px",
        color: "#00f3ff",
        textShadow: `
          0 0 8px rgba(0,243,255,0.8),
          0 0 16px rgba(0,243,255,0.6)
        `,
        fontFamily: "'Roboto Mono', monospace",
        textAlign: "center",
        marginTop: 8,
        userSelect: "none",
      }}
    >
      {text}
    </motion.div>
  );
}
