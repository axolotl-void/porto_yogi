import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import HackerText from "../components/HackerText";
import pilotImg from "../assets/pilot-profile.jpeg";
import "../styles/hologram.css";

const AboutSection = () => {
  // --- SETUP EFEK 3D TILT KARTU FOTO ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        
        {/* === BAGIAN 1: KARTU IDENTITAS 3D === */}
        <div className="card-wrapper">
          <motion.div
            className="holo-card"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-content">
              {/* Box Foto */}
              <div className="img-box">
                <img src={pilotImg} alt="Yogi Prasetya Sadewa" className="pilot-img" />
                <div className="scan-line"></div>
                <div className="vignette-overlay"></div>
              </div>
              
              {/* Dekorasi Teks di Bawah Foto */}
              <div className="card-overlay">
                <div className="corner t-l"></div>
                <div className="corner b-r"></div>
                <h3 className="card-name">YOGI</h3>
                <p className="card-rank">FULLSTACK DEV</p>
              </div>
            </div>
            
            {/* Bayangan Kartu */}
            <div className="card-shadow"></div>
          </motion.div>
        </div>

        {/* === BAGIAN 2: CONNECTOR LINE (DATA TRANSFER) === */}
        <div className="connector-line">
            <div className="moving-dot"></div>
        </div>

        {/* === BAGIAN 3: DATA & STATS (PANEL KACA) === */}
        <div className="intel-container">
          
          {/* Header */}
          <div className="header-box">
            <h2 className="section-title">
              <span className="hash"></span> <HackerText text="ABOUT ME" />
            </h2>
          </div>

          {/* Biografi */}
          <div className="bio-text">
            <p>
              Halo, saya <span className="gold">Yogi Prasetya Sadewa</span>. Mahasiswa Ilmu Komputer (Sem. 6) di 
              Universitas Bina Bangsa Getsempena.
            </p>
            <p>
              Saya bukan sekadar menulis kode, saya <span className="gold">merancang solusi</span>. 
              Dengan spesialisasi di jembatan antara <strong>Software & Hardware (IoT)</strong>, 
              saya membangun sistem yang tidak hanya berjalan di layar, tapi juga berinteraksi dengan dunia nyata.
            </p>
          </div>

          {/* Progress Bars (Memory Blocks Style) */}
          <div className="stats-bars">
            <div className="bar-group">
              <div className="bar-label">
                <span>WEB DEV (Laravel/React)</span>
                <span>90%</span>
              </div>
              <div className="progress-bg">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: "90%" }} 
                  transition={{ duration: 1.5, ease: "easeOut" }} 
                  className="progress-fill"
                ></motion.div>
              </div>
            </div>

            <div className="bar-group">
              <div className="bar-label">
                <span>IoT & NETWORK</span>
                <span>85%</span>
              </div>
              <div className="progress-bg">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: "85%" }} 
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} 
                  className="progress-fill"
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Kotak Objective */}
          <div className="objective-terminal">
            <span className="prompt">{">"} CURRENT_OBJECTIVE:</span>
            <p className="obj-text">
               Menjadi Developer Profesional di Top Tier Tech Company (Google/Tesla) & Mengembangkan Ekosistem IoT Indonesia.
            </p>
          </div>

          {/* Tombol Download (Glitch Effect) */}
          <div className="btn-group">
             <button className="cy-btn">DOWNLOAD CV</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;