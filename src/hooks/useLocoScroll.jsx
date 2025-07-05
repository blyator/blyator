// src/hooks/useLocoScroll.js
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";

export default function useLocoScroll(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollEl = containerRef.current;

    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      lerp: 0.045,
      multiplier: 0.9,
      class: "is-inview",
      getDirection: true,
      getSpeed: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
        breakpoint: 768,
      },
    });

    window.loco = locoScroll;

    return () => {
      locoScroll.destroy();
    };
  }, [containerRef]);
}
