import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Detect mobile device
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768; // You can adjust the threshold
};

export default function useLocoScroll(containerRef) {
  useEffect(() => {
    if (!containerRef.current || isMobile()) return; // ⛔ Disable on mobile

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
        smooth: false, // 👈 Just for clarity, but we'll skip entirely
      },
      tablet: {
        smooth: true,
        breakpoint: 768,
      },
    });

    window.loco = locoScroll;

    // Register scroller proxy
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
      ScrollTrigger.removeEventListener("refresh", locoScroll.update);
    };
  }, [containerRef]);
}
