import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
};

export default function useLocoScroll(containerRef, shouldInit = true) {
  useEffect(() => {
    if (!shouldInit || !containerRef.current || isMobile()) return;

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
        smooth: false,
      },
      tablet: {
        smooth: true,
        breakpoint: 768,
      },
    });

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
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
      ScrollTrigger.removeEventListener("refresh", locoScroll.update);
    };
  }, [containerRef, shouldInit]);
}
