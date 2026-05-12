import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ======================
   TYPEWRITER COMPONENT
====================== */
function Typewriter({
  strings,
  typeSpeed = 100,
  backSpeed = 50,
  pause = 2000,
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % strings.length;
      const fullText = strings[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? backSpeed : typeSpeed);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(pause);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, strings, typingSpeed, backSpeed, pause, typeSpeed]);

  return <span>{text}</span>;
}

/* ======================
   HERO STYLES
====================== */
const base = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "0 10%",
  pointerEvents: "none",
  position: "relative",
};

const inner = {
  width: "50%",
  pointerEvents: "auto",
};

/* ======================
   HERO SECTION
====================== */
export default function HeroSection() {
  const handleScrollNext = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" style={base}>
      <div style={inner}>
        {/* HELLO */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "4rem",
            margin: 0,
            textShadow: "0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          HELLO,
        </motion.h1>
        {/* NAME / ROLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "3.5rem",
            margin: 0,
            color: "#ffcc00",
            textShadow: "0 0 20px rgba(255,204,0,0.3)",
          }}
        >
          <Typewriter
            strings={["I AM YOGI", "IOT ENGINEER", "WEB DEVELOPER"]}
          />
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "10px",
            borderLeft: "4px solid #ffcc00",
            backdropFilter: "blur(5px)",
            marginTop: "20px",
          }}
        >
          <p style={{ color: "#eee", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Ngoprek{" "}
            <span style={{ color: "#ffcc00" }}>Perangkat Keras</span> dan
            membangunnya dengan{" "}
            <span style={{ color: "#00f3ff" }}>Kecerdasan Buatan</span>.
          </p>
        </motion.div>

        {/* PILOT */}
        <p
          style={{
            color: "#aaa",
            marginTop: "1rem",
            letterSpacing: "2px",
            fontSize: "0.9rem",
          }}
        >
          // PILOT: YOGI PRASETYA
        </p>

        {/* SCROLL BUTTON */}
        <button
          type="button"
          className="scroll-hint"
          onClick={handleScrollNext}
        >
          <span className="scroll-hint-dot" />
          <span className="scroll-hint-text">SCROLL TO EXPLORE</span>
        </button>
      </div>
    </section>
  );
}
