// src/sections/ContactSection.jsx

const base = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
};

const inner = {
  textAlign: "center",
  pointerEvents: "auto",
  marginLeft: "30%",
};

export default function ContactSection() {
  return (
    <section id="contact" style={base}>
      <div style={inner}>
        {/* TITLE */}
        <h1 style={{ fontSize: "3rem", color: "white", marginBottom: "0.5rem" }}>
          JOIN THE <br /> ALLIANCE
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            color: "#aaa",
            fontSize: "0.95rem",
            marginBottom: "1.5rem",
            maxWidth: "360px",
            marginInline: "auto",
          }}
        >
          Terbuka untuk kolaborasi{" "}
          <span style={{ color: "#ffcc00" }}>project web</span>,{" "}
          <span style={{ color: "#00f3ff" }}>IoT</span>, riset kampus, atau
          sekadar diskusi teknis santai.
        </p>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="mailto:yogiprasetya907@gmail.com"
            className="cyber-btn float-anim"
            style={{
              background: "#ffcc00",
              color: "black",
              animationDelay: "0s",
            }}
          >
            EMAIL
          </a>

          <a
            href="https://github.com/axolotl-void"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn float-anim"
            style={{
              background: "transparent",
              border: "1px solid white",
              color: "white",
              animationDelay: "0.2s",
            }}
          >
            GITHUB
          </a>

          <a
            href="https://instagram.com/yogigik144"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn float-anim"
            style={{
              background: "transparent",
              border: "1px solid #ff0055",
              color: "#ff0055",
              animationDelay: "0.4s",
            }}
          >
            INSTAGRAM
          </a>

          <a
            href="https://wa.me/6281260312799"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn float-anim"
            style={{
              background: "transparent",
              border: "1px solid #25D366",
              color: "#25D366",
              animationDelay: "0.6s",
            }}
          >
            WHATSAPP
          </a>
        </div>

        {/* AVAILABILITY / STATUS */}
        <p
          style={{
            color: "#888",
            marginTop: "2.5rem",
            fontSize: "0.8rem",
            letterSpacing: "1px",
          }}
        >
          // CURRENT STATUS: AVAILABLE FOR COLLAB &amp; SIDE PROJECT
        </p>

        {/* FOOTER */}
        <p
          style={{
            color: "#555",
            marginTop: "1rem",
            fontSize: "0.8rem",
          }}
        >
          © 2025 Yogi Prasetya. System Online.
        </p>
      </div>
    </section>
  );
}
