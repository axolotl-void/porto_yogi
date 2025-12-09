// src/sections/SkillsSection.jsx

const base = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "0 10%",
  pointerEvents: "none",
};

const inner = {
  width: "50%",
  pointerEvents: "auto",
};

export default function SkillsSection() {
  return (
    <section id="arsenal" style={base}>
      <div style={inner}>
        <h2 className="section-title" style={{ color: "#ffcc00" }}>
          MY ARSENAL
        </h2>

        {/* SUBTITLE KECIL */}
        <p
          className="subtitle"
          style={{
            marginBottom: "1.5rem",
            color: "#aaa",
            fontSize: "0.95rem",
          }}
        >
          Stack yang paling sering aku pakai buat bangun{" "}
          <span style={{ color: "#ffcc00" }}>web app</span> dan{" "}
          <span style={{ color: "#00f3ff" }}>prototipe IoT</span>.
        </p>

        <div className="skill-grid">
          {/* LANGUAGES */}
          <div className="skill-card">
            <h4 style={{ color: "#aaa", margin: 0 }}>LANGUAGES</h4>
            <span style={{ color: "white", fontSize: "0.95rem" }}>
              Python, JavaScript, PHP, SQL, C++
            </span>
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.8rem",
                color: "#999",
              }}
            >
              Logic, API, dan data processing.
            </p>
          </div>

          {/* WEB TECH */}
          <div className="skill-card">
            <h4 style={{ color: "#aaa", margin: 0 }}>WEB TECH</h4>
            <span style={{ color: "white", fontSize: "0.95rem" }}>
              React, Laravel, Node.js, REST API
            </span>
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.8rem",
                color: "#999",
              }}
            >
              Bangun dashboard, panel admin, dan landing page interaktif.
            </p>
          </div>

          {/* HARDWARE / IOT */}
          <div className="skill-card">
            <h4 style={{ color: "#aaa", margin: 0 }}>HARDWARE &amp; IoT</h4>
            <span style={{ color: "white", fontSize: "0.95rem" }}>
              Raspberry Pi, ESP32, Arduino, Sensor
            </span>
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.8rem",
                color: "#999",
              }}
            >
              Prototyping alat, monitoring, dan otomasi perangkat.
            </p>
          </div>

          {/* TOOLS */}
          <div className="skill-card">
            <h4 style={{ color: "#aaa", margin: 0 }}>TOOLS &amp; WORKFLOW</h4>
            <span style={{ color: "white", fontSize: "0.95rem" }}>
              Git, Linux, VS Code, Figma
            </span>
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.8rem",
                color: "#999",
              }}
            >
              Version control, environment dev, dan desain antarmuka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
