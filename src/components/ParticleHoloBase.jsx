export default function ParticleHoloBase({ size = 220, particles = 48 }) {
  const radius = size / 2 - 12;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
      }}
    >
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2;
        const x = Math.cos(angle) * radius + size / 2;
        const y = Math.sin(angle) * radius + size / 2;

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#00f3ff",
              opacity: 0.6,
              transform: "translate(-50%, -50%)",
              animation: `pulse 2.5s ease-in-out ${i * 0.05}s infinite`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 30,
          borderRadius: "50%",
          border: "1px solid rgba(0,243,255,0.4)",
          animation: "rotate 10s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0%,100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
