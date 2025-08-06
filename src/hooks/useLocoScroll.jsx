import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 768;

export default function useLocoScroll(containerRef, shouldInit = true) {
  const locoScrollRef = useRef(null);

  useEffect(() => {
    if (!shouldInit || !containerRef.current || isMobile()) return;

    const scrollEl = containerRef.current;

    let rafId = requestAnimationFrame(() => {
      const locoScroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        lerp: 0.07,
        multiplier: 0.5,
        class: "is-inview",
        getDirection: true,
        getSpeed: true,
        scrollbar: false,
        smartphone: {
          smooth: false,
          scrollbar: false,
        },
        tablet: {
          smooth: true,
          breakpoint: 768,
        },
      });

      locoScrollRef.current = locoScroll;
      window.loco = locoScroll;

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
      ScrollTrigger.addEventListener("refresh", locoScroll.update);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (locoScrollRef.current) {
        locoScrollRef.current.destroy();
        ScrollTrigger.removeEventListener(
          "refresh",
          locoScrollRef.current.update
        );
      }
    };
  }, [containerRef, shouldInit]);

  return locoScrollRef;
}
