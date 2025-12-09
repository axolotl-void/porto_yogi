const base = {
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

export default function AboutSection() {
  return (
    <section id="about" style={base}>
      <div style={inner}>
        <h2 className="section-title" style={{ color: "#00f3ff" }}>
          PILOT PROFILE
        </h2>

        <div
          style={{
            background: "rgba(0, 243, 255, 0.06)",
            border: "1px solid rgba(0,243,255,0.3)",
            borderRadius: "18px",
            padding: "24px 26px",
            marginTop: "18px",
            boxShadow: "0 0 25px rgba(0,243,255,0.1)",
            backdropFilter: "blur(5px)",
            fontFamily: "'Roboto Mono'",
          }}
        >
          <p
            style={{
              color: "#ffcc00",
              fontWeight: "bold",
              marginBottom: "10px",
              letterSpacing: "2px",
              fontSize: "0.8rem",
            }}
          >
            // SYSTEM_LOG: IDENTITY_VERIFIED
          </p>

          <p
            style={{
              color: "#eee",
              lineHeight: "1.8",
              fontSize: "1rem",
              marginBottom: "20px",
            }}
          >
           "Saya Yogi, mahasiswa Ilmu Komputer yang fokus pada Web Development dan IoT. 
Saya suka membangun sistem yang benar-benar dipakai orang—mulai dari 
dashboard lab, otomasi perangkat, sampai prototipe interaktif di kampus."

          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              fontSize: "0.9rem",
              marginBottom: "18px",
              borderTop: "1px solid rgba(0,243,255,0.3)",
              paddingTop: "15px",
            }}
          >
            <div>
              <span style={{ color: "#555" }}>STATUS:</span>{" "}
              <span style={{ color: "white" }}>Mahasiswa Aktif – Ilmu Komputer UBBG</span>
            </div>
            <div>
              <span style={{ color: "#555" }}>FOCUS:</span>{" "}
              <span style={{ color: "white" }}>Web Development &amp; IoT Systems</span>
            </div>
            <div>
              <span style={{ color: "#555" }}>ROLE:</span>{" "}
              <span style={{ color: "white" }}>
                Wakil HIMASTER &amp; Ketua UKM Jaringan &amp; IoT
              </span>
            </div>
            <div>
              <span style={{ color: "#555" }}>EXP:</span>{" "}
              <span style={{ color: "white" }}>Full Stack Dev, IoT Prototyping</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "10px",
              fontSize: "0.85rem",
              color: "#bbb",
            }}
          >
            <div>• Nyaman kerja dalam tim &amp; ngurus event.</div>
            <div>• Sering jadi jembatan antara hardware &amp; software.</div>
            <div>• Suka bikin dokumentasi &amp; dashboard yang enak dipakai orang lain.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
