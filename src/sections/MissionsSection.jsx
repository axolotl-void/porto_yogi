import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // <--- 1. Import Jurus Teleport
import { motion, AnimatePresence } from "framer-motion";
import "../styles/projects-grid.css"; 

// === IMPORT GAMBAR ===
import lmsThumb from '../assets/projects/lms-thumbnail.jpg';
import lmsDash from '../assets/projects/lms-dashboard.jpg';
import lmsPi from '../assets/projects/lms-pi.jpg';
import lmsMonitor from '../assets/projects/lms-monitor.jpg';
import lmsFlow from '../assets/projects/lms-flow.jpg';

const projectsData = [
  {
    id: 1,
    title: "LAB MANAGEMENT SYSTEM",
    category: "IoT & FULLSTACK",
    status: "DEPLOYED v2.0",
    images: [lmsThumb, lmsDash, lmsFlow, lmsPi, lmsMonitor],
    desc: "Sistem manajemen Lab Komputer modern. Menggantikan kontrol manual dengan dashboard terpusat untuk efisiensi energi.",
    mechanism: "Agent PC (PowerShell) -> Server (Python) -> Web Dashboard (React). Admin dapat memantau status & mematikan PC secara remote.",
    tech: ["Raspberry Pi 4", "Python Server", "React JS", "MQTT", "PowerShell"],
    github: "https://github.com/axolotl-void/Lab-management-system"
  },
  {
    id: 2,
    title: "SMART GLOVE",
    category: "HARDWARE",
    status: "PROTOTYPE",
    images: ["https://picsum.photos/id/20/800/400", "https://picsum.photos/id/96/800/400"],
    desc: "Sarung tangan penerjemah bahasa isyarat menjadi suara secara real-time.",
    mechanism: "Flex Sensor -> Arduino Nano -> Processing -> Speaker Output.",
    tech: ["Arduino Nano", "Flex Sensor", "C++", "Speaker Module"],
    github: "https://github.com"
  },
  {
    id: 3,
    title: "SMART POT",
    category: "IoT",
    status: "COMPLETED",
    images: ["https://picsum.photos/id/106/800/400", "https://picsum.photos/id/152/800/400"],
    desc: "Penyiram tanaman otomatis berbasis kelembapan tanah dengan notifikasi Telegram.",
    mechanism: "Soil Sensor -> ESP8266 -> Relay Pompa -> Telegram Bot API.",
    tech: ["ESP8266", "Soil Sensor", "Telegram Bot", "C++"],
    github: "https://github.com"
  }
];

// === 2. KOMPONEN MODAL TERPISAH (Biar Rapi) ===
const ProjectModal = ({ project, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);

  // Fitur Tambahan: Kunci Scroll Body saat Modal Terbuka
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Kunci scroll
    return () => { document.body.style.overflow = "auto"; }; // Buka kunci saat tutup
  }, []);

  const nextSlide = () => setCurrentImg((prev) => (prev + 1) % project.images.length);
  const prevSlide = () => setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* --- KIRI: GAMBAR --- */}
        <div className="modal-visuals">
          <img src={project.images[currentImg]} alt="Project Slide" className="slider-img" />
          
          {project.images.length > 1 && (
            <>
              <button className="slider-btn prev-btn" onClick={prevSlide}>❮</button>
              <button className="slider-btn next-btn" onClick={nextSlide}>❯</button>
            </>
          )}
          <div className="slide-counter">
            CAM 0{currentImg + 1} / 0{project.images.length}
          </div>
        </div>

        {/* --- KANAN: DATA --- */}
        <div className="modal-data">
          <button className="close-btn" onClick={onClose}>X</button>
          
          <div className="detail-header">
            <h2 className="detail-title">{project.title}</h2>
            <span className="detail-badge">{project.status}</span>
          </div>

          <div className="data-section">
            <span className="label">OBJECTIVE</span>
            <p className="text-content">{project.desc}</p>
          </div>

          <div className="data-section">
            <span className="label">SYSTEM LOGIC</span>
            <div className="workflow-box">
              "{project.mechanism}"
            </div>
          </div>

          <div className="data-section">
            <span className="label">TECH ARSENAL</span>
            <div>
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

          <a href={project.github} target="_blank" rel="noreferrer" className="github-btn">
            [ OPEN SOURCE CODE ]
          </a>
        </div>
      </motion.div>
    </div>
  );
};

// === 3. KOMPONEN UTAMA ===
const MissionsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null); 

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.5rem", color: "white", fontFamily: "Courier New", margin: 0, fontWeight: "bold" }}>
             <span style={{ color: "#FFD700" }}>#</span> MISSION_ARCHIVE
          </h2>
          <p style={{ color: "#888", fontFamily: "Courier New", marginTop: "10px" }}>// CLICK_FILE_TO_INSPECT</p>
        </div>

        {/* GRID UTAMA */}
        <div className="archive-grid">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="project-tile"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -5, borderColor: "#FFD700" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={project.images[0]} alt={project.title} className="tile-image" />
              <div style={{ position: 'absolute', top: 10, right: 10, background: '#FFD700', color: 'black', fontSize: '10px', padding: '2px 5px', fontWeight: 'bold' }}>ACCESS</div>
              <div className="tile-overlay">
                <h3 className="tile-title">{project.title}</h3>
                <span style={{fontSize: '0.7rem', color: '#FFD700'}}>{project.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL POPUP (DENGAN PORTAL) */}
        {/* createPortal memindahkan Modal keluar dari Section ini, langsung ke Body */}
        {createPortal(
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
              />
            )}
          </AnimatePresence>,
          document.body // <-- INI KUNCINYA (Tempel di Body)
        )}

      </div>
    </section>
  );
};

export default MissionsSection;