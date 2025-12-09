import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Scroll, useScroll } from "@react-three/drei";

export default function ScrollProgress() {
  const scroll = useScroll();
  const barRef = useRef(null);

  useFrame(() => {
    if (barRef.current) {
      barRef.current.style.height = `${scroll.offset * 100}%`;
    }
  });

  return (
    <Scroll html>
      <div className="scroll-track">
        <div ref={barRef} className="scroll-thumb" style={{ height: "0%" }} />
      </div>
    </Scroll>
  );
}
