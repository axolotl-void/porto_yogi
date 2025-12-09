// src/components/Navbar.jsx
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // ==== SCROLL LISTENER UNTUK ACTIVE MENU ====
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "arsenal", "missions", "contact"];

      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop - 200;
        const bottom = top + el.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <a href="#home" className="nav-logo">
        YOGI<span>.DEV</span>
      </a>

      {/* DESKTOP MENU */}
      <div className="nav-menu">
        <button
          className={active === "home" ? "nav-link nav-active" : "nav-link"}
          onClick={() => goTo("#home")}
        >
          HOME
        </button>
        <button
          className={active === "arsenal" ? "nav-link nav-active" : "nav-link"}
          onClick={() => goTo("#arsenal")}
        >
          SKILLS
        </button>
        <button
          className={active === "missions" ? "nav-link nav-active" : "nav-link"}
          onClick={() => goTo("#missions")}
        >
          PROJECTS
        </button>
        <button
          className={active === "contact" ? "nav-btn nav-active-btn" : "nav-btn"}
          onClick={() => goTo("#contact")}
        >
          CONTACT
        </button>
      </div>

      {/* ===== HAMBURGER ===== */}
      <button
        className={`nav-toggle ${open ? "nav-toggle-open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className="nav-toggle-line" />
        <span className="nav-toggle-line" />
        <span className="nav-toggle-line" />
      </button>

      {/* ===== MOBILE MENU ===== */}
      {open && (
        <div className="nav-menu-mobile">
          <button
            className="nav-mobile-link"
            onClick={() => goTo("#home")}
          >
            HOME
          </button>
          <button
            className="nav-mobile-link"
            onClick={() => goTo("#arsenal")}
          >
            SKILLS
          </button>
          <button
            className="nav-mobile-link"
            onClick={() => goTo("#missions")}
          >
            PROJECTS
          </button>
          <button
            className="nav-mobile-link"
            onClick={() => goTo("#contact")}
          >
            CONTACT
          </button>
        </div>
      )}
    </nav>
  );
}
