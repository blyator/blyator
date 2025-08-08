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
    let rafId;

    // Add a longer delay to ensure everything is ready
    const initializeScroll = () => {
      try {
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

        // Setup ScrollTrigger proxy with better error handling
        ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (
              !locoScroll ||
              !locoScroll.scroll ||
              !locoScroll.scroll.instance ||
              !locoScroll.scroll.instance.scroll
            )
              return 0;

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

        // Add scroll event listener with error handling
        const handleScroll = () => {
          try {
            ScrollTrigger.update();
          } catch (error) {
            console.warn("ScrollTrigger update error:", error);
          }
        };

        locoScroll.on("scroll", handleScroll);

        // Setup refresh listener with error handling
        const handleRefresh = () => {
          try {
            if (locoScroll && typeof locoScroll.update === "function") {
              locoScroll.update();
            }
          } catch (error) {
            console.warn("LocoScroll update error:", error);
          }
        };

        ScrollTrigger.addEventListener("refresh", handleRefresh);

        // Initial refresh with delay
        setTimeout(() => {
          try {
            ScrollTrigger.refresh();
          } catch (error) {
            console.warn("Initial ScrollTrigger refresh error:", error);
          }
        }, 100);

        return () => {
          try {
            locoScroll.off("scroll", handleScroll);
            ScrollTrigger.removeEventListener("refresh", handleRefresh);
          } catch (error) {
            console.warn("Cleanup error:", error);
          }
        };
      } catch (error) {
        console.error("Failed to initialize LocoScroll:", error);
      }
    };

    // Use requestAnimationFrame for better timing
    rafId = requestAnimationFrame(() => {
      // Add small delay to ensure DOM is ready
      setTimeout(initializeScroll, 100);
    });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (locoScrollRef.current) {
        try {
          locoScrollRef.current.destroy();
          locoScrollRef.current = null;
        } catch (error) {
          console.warn("LocoScroll destroy error:", error);
        }
      }

      // Clean up global reference
      if (window.loco) {
        delete window.loco;
      }
    };
  }, [containerRef, shouldInit]);

  return locoScrollRef;
}
