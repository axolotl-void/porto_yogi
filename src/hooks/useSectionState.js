import { useEffect, useState } from "react";

/**
 * SECTION STATES:
 * - idle      : section belum terlihat
 * - forming   : mulai masuk viewport (particle forming)
 * - active    : fully visible (holo stable + photo glitch verified)
 * - leaving   : keluar viewport (disperse)
 */
export default function useSectionState(ref, options = {}) {
  const {
    enterThreshold = 0.35,   // mulai forming
    activeThreshold = 0.6,   // fully active
    exitThreshold = 0.2      // mulai leaving
  } = options;

  const [state, setState] = useState("idle");

  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        if (ratio >= activeThreshold) {
          setState("active");
        } else if (ratio >= enterThreshold) {
          setState("forming");
        } else if (ratio > exitThreshold) {
          setState("leaving");
        } else {
          setState("idle");
        }
      },
      {
        threshold: [0, exitThreshold, enterThreshold, activeThreshold, 1]
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, enterThreshold, activeThreshold, exitThreshold]);

  return state;
}
