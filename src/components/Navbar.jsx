import "../styles/navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // detect section aktif
  useEffect(() => {

    const handleScroll = () => {

      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "contact"
      ];

      let current = "home";

      sections.forEach((id) => {

        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop - 200;
        const bottom = top + el.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ){
          current = id;
        }

      });

      setActive(current);

    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);


  // scroll function
  const goTo = (id) => {

    const el = document.getElementById(
      id.replace("#","")
    );

    if(el){
      el.scrollIntoView({
        behavior: "smooth"
      });
    }

    setOpen(false);

  };

  return (

    <nav className="navbar">

      {/* LOGO */}
      <button
        className="nav-logo"
        onClick={() => goTo("#home")}
      >
        YOGI<span>.DEV</span>
      </button>


      {/* DESKTOP */}
      <div className="nav-menu">

        <button
          className={
            active === "home"
            ? "nav-link nav-active"
            : "nav-link"
          }
          onClick={() => goTo("#home")}
        >
          HOME
        </button>


        <button
          className={
            active === "skills"
            ? "nav-link nav-active"
            : "nav-link"
          }
          onClick={() => goTo("#skills")}
        >
          SKILLS
        </button>


        <button
          className={
            active === "projects"
            ? "nav-link nav-active"
            : "nav-link"
          }
          onClick={() => goTo("#projects")}
        >
          PROJECTS
        </button>


        <button
          className={
            active === "contact"
            ? "nav-btn nav-active-btn"
            : "nav-btn"
          }
          onClick={() => goTo("#contact")}
        >
          CONTACT
        </button>

      </div>


      {/* MOBILE BUTTON */}
      <button
        className={
          open
          ? "nav-toggle nav-toggle-open"
          : "nav-toggle"
        }
        onClick={() => setOpen(!open)}
      >

        <span className="nav-toggle-line"/>
        <span className="nav-toggle-line"/>
        <span className="nav-toggle-line"/>

      </button>


      {/* MOBILE MENU */}
      {
        open && (

          <div className="nav-menu-mobile">

            <button
              className="nav-mobile-link"
              onClick={() => goTo("#home")}
            >
              HOME
            </button>


            <button
              className="nav-mobile-link"
              onClick={() => goTo("#skills")}
            >
              SKILLS
            </button>


            <button
              className="nav-mobile-link"
              onClick={() => goTo("#projects")}
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

        )
      }

    </nav>

  );

}