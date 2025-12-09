// src/sections/MissionsSection.jsx

const baseRight = {
  height: "100vh",
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  padding: "0 10%",
  pointerEvents: "none",
};

const inner = {
  width: "50%",
  pointerEvents: "auto",
};

export default function MissionsSection() {
  return (
    <>
      {/* MISSIONS 1/2 */}
      <section id="missions" style={baseRight}>
        <div style={inner}>
          <h2 className="section-title" style={{ color: "#ffcc00" }}>
            MISSIONS (1/2)
          </h2>

          {/* Subtitle kecil */}
          <p
            style={{
              color: "#aaa",
              fontSize: "0.95rem",
              marginBottom: "1.5rem",
            }}
          >
            Beberapa project utama yang aku kerjain seputar{" "}
            <span style={{ color: "#00f3ff" }}>lab komputer</span>,{" "}
            <span style={{ color: "#ffcc00" }}>otomasi</span>, dan{" "}
            <span style={{ color: "#00f3ff" }}>IoT</span>.
          </p>

          {/* LAB MANAGEMENT SYSTEM */}
          <div className="project-card">
            <h3>LAB MANAGEMENT SYSTEM</h3>
            <p style={{ marginBottom: "8px" }}>
              Sistem monitoring dan kendali perangkat Lab Komputer berbasis IoT
              dengan dashboard web real-time.
            </p>

            {/* Meta info */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "6px",
                fontSize: "0.8rem",
                color: "#bbb",
                marginBottom: "8px",
              }}
            >
              <div>
                <span style={{ color: "#666" }}>ROLE:</span>{" "}
                Lead Developer &amp; System Designer
              </div>
              <div>
                <span style={{ color: "#666" }}>TAHUN:</span> 2024–2025
              </div>
            </div>

            {/* Tags */}
            <div className="tags">
              <span className="tag">Raspberry Pi</span>
              <span className="tag">Node / Python</span>
              <span className="tag">Dashboard Web</span>
              <span className="tag">IoT</span>
            </div>
          </div>

          {/* SMART GLOVE */}
          <div className="project-card" style={{ marginTop: "20px" }}>
            <h3>SMART GLOVE</h3>
            <p style={{ marginBottom: "8px" }}>
              Sarung tangan yang membaca gerakan jari dan menerjemahkannya
              menjadi suara menggunakan sensor fleksibel.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "6px",
                fontSize: "0.8rem",
                color: "#bbb",
                marginBottom: "8px",
              }}
            >
              <div>
                <span style={{ color: "#666" }}>ROLE:</span> Hardware &amp;
                Firmware
              </div>
              <div>
                <span style={{ color: "#666" }}>TAHUN:</span> 2024
              </div>
            </div>

            <div className="tags">
              <span className="tag">Arduino</span>
              <span className="tag">Flex Sensor</span>
              <span className="tag">C++</span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSIONS 2/2 */}
      <section style={baseRight}>
        <div style={inner}>
          <h2 className="section-title" style={{ color: "#ffcc00" }}>
            MISSIONS (2/2)
          </h2>

          {/* SMART POT */}
          <div className="project-card">
            <h3>SMART POT AUTOMATION</h3>
            <p style={{ marginBottom: "8px" }}>
              Pot pintar yang bisa memantau kelembapan tanah dan menyiram
              tanaman secara otomatis ketika media terlalu kering.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "6px",
                fontSize: "0.8rem",
                color: "#bbb",
                marginBottom: "8px",
              }}
            >
              <div>
                <span style={{ color: "#666" }}>ROLE:</span> IoT Developer
              </div>
              <div>
                <span style={{ color: "#666" }}>TAHUN:</span> 2023–2024
              </div>
            </div>

            <div className="tags">
              <span className="tag">Automation</span>
              <span className="tag">Soil Sensor</span>
              <span className="tag">ESP8266</span>
            </div>
          </div>

          {/* ACHIEVEMENT CARD */}
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              border: "1px solid #ffcc00",
              borderRadius: "10px",
              background: "rgba(255, 204, 0, 0.1)",
            }}
          >
            <h3 style={{ color: "#ffcc00", margin: 0 }}>🏆 ACHIEVEMENT</h3>
            <p
              style={{
                color: "white",
                margin: "5px 0",
                fontWeight: "bold",
              }}
            >
              Finalis PESTA DATA NASIONAL APTIKOM (PEDAS)
            </p>
            <p
              style={{
                color: "#ccc",
                fontSize: "0.85rem",
                marginTop: "4px",
              }}
            >
              Berfokus pada pengembangan sistem pengelolaan data dan
              visualisasi untuk kebutuhan pendidikan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
