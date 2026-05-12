import { motion } from "framer-motion";

// ===== VARIANT ANIMASI PER BARIS =====
const lineVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: [0, 1, 0.85],
    x: 0,
    transition: {
      delay: 0.4 + i * 0.25,
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 4,
    },
  }),
};

export default function CoreParametersPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: "50%",
        bottom: "20%",
        transform: "translateX(-50%)",
        width: "320px",
        padding: "18px 20px",
        border: "1px solid rgba(0, 243, 255, 0.4)",
        borderRadius: "12px",
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 0 30px rgba(0,243,255,0.15)",
        fontFamily: "'Roboto Mono', monospace",
        fontSize: "0.85rem",
        color: "#ddd",
        overflow: "hidden",
      }}
    >
      {/* ===== SCANLINE EFFECT ===== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent, rgba(0,243,255,0.08), transparent)",
          animation: "scan 4s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* ===== TITLE ===== */}
      <div
        style={{
          color: "#00f3ff",
          letterSpacing: "2px",
          marginBottom: "6px",
          fontSize: "0.8rem",
        }}
      >
        CORE PARAMETERS
      </div>

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.2)",
          marginBottom: "10px",
        }}
      />

      {/* ===== PARAMETERS ===== */}
      <motion.div custom={0} variants={lineVariant} initial="hidden" animate="visible">
        <span style={{ color: "#ffcc00" }}>STACK&nbsp;&nbsp;&nbsp;&nbsp;:</span>{" "}
        <span>REACT | IOT</span>
      </motion.div>

      <motion.div custom={1} variants={lineVariant} initial="hidden" animate="visible">
        <span style={{ color: "#00f3ff" }}>MINDSET&nbsp;&nbsp;:</span>{" "}
        <span>PROBLEM SOLVER</span>
      </motion.div>

      <motion.div custom={2} variants={lineVariant} initial="hidden" animate="visible">
        <span style={{ color: "#ff0055" }}>WORKFLOW :</span>{" "}
        <span>SYSTEM-DRIVEN</span>
      </motion.div>

      <motion.div custom={3} variants={lineVariant} initial="hidden" animate="visible">
        <span style={{ color: "#25D366" }}>OUTPUT&nbsp;&nbsp;:</span>{" "}
        <span>REAL-WORLD SOLUTION</span>
      </motion.div>

      {/* ===== CSS INLINE KEYFRAME ===== */}
      <style>
        {`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}
      </style>
    </motion.div>
  );
}
