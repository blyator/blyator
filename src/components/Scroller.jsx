import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const interpolateColor = (color1, color2, factor) =>
  color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));

const getBlendedColor = (t) => {
  const green = [34, 197, 94];
  const yellow = [234, 179, 8];
  const red = [239, 68, 68];

  let rgb;
  if (t < 0.5) {
    rgb = interpolateColor(green, yellow, t / 0.5);
  } else {
    rgb = interpolateColor(yellow, red, (t - 0.5) / 0.5);
  }

  return `rgb(${rgb.join(",")})`;
};

const Scroller = ({ numberOfDots = 30, locoScroll }) => {
  const dotsRef = useRef([]);
  const scrollProgress = useRef(0);
  const scrollInstance = useRef(null);
  const animationFrameId = useRef(null);
  const hideTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const headDotRef = useRef(null);
  const isVisible = useRef(false);

  const showScroller = () => {
    if (isVisible.current) return;
    isVisible.current = true;

    gsap.set(containerRef.current, { pointerEvents: "auto" });

    gsap.fromTo(
      dotsRef.current,
      {
        opacity: 0,
        x: 40,
        scale: 0.5,
        skewX: 5,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        skewX: 0,
        duration: 0.4,
        ease: "back.out(1.2)",
        stagger: 0.02,
      }
    );

    gsap.fromTo(
      headDotRef.current,
      {
        opacity: 0,
        x: 60,
        scale: 0,
      },
      {
        opacity: 1,
        x: -1, //moon position
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.7)",
      }
    );
  };

  const hideScroller = () => {
    if (!isVisible.current) return;
    isVisible.current = false;

    gsap.to(dotsRef.current, {
      opacity: 0,
      x: 20,
      scale: 0.7,
      skewX: -3,
      duration: 0.6,
      ease: "power4.inOut",
      stagger: {
        each: 0.02,
        from: "end",
      },
    });

    gsap.to(headDotRef.current, {
      opacity: 0,
      x: 20,
      scale: 0.5,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.set(containerRef.current, { pointerEvents: "none", delay: 0.5 });
  };

  useEffect(() => {
    scrollInstance.current = locoScroll?.current;
    if (!scrollInstance.current) return;

    const onScroll = ({ scroll, limit }) => {
      if (limit?.y > 0) {
        scrollProgress.current = scroll.y / limit.y;

        showScroller();

        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
          hideScroller();
        }, 1000);
      }
    };

    scrollInstance.current.on("scroll", onScroll);

    return () => {
      if (scrollInstance.current) {
        scrollInstance.current.off("scroll", onScroll);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [locoScroll?.current]);

  useEffect(() => {
    const dots = dotsRef.current;
    const positions = new Array(numberOfDots).fill(0);

    let headY = 0;

    const animate = () => {
      const target = scrollProgress.current;
      const container = containerRef.current;

      positions.forEach((pos, i) => {
        const prev = i === 0 ? target : positions[i - 1];
        positions[i] += (prev - pos) * 0.2;

        const fillThreshold = target * numberOfDots;
        let color =
          i < fillThreshold ? getBlendedColor(i / numberOfDots) : "#4b5563";

        if (dots[i]) {
          gsap.to(dots[i], {
            backgroundColor: color,
            duration: 0.4,
            ease: "sine.out",
          });
        }
      });

      const dotSpacing = dots[1]?.offsetTop - dots[0]?.offsetTop || 8;
      const headIndex = target * (numberOfDots - 1);
      const newY = headIndex * dotSpacing;

      headY += (newY - headY) * 0.15;

      if (headDotRef.current) {
        gsap.set(headDotRef.current, {
          y: headY,
        });
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [numberOfDots]);

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 right-6 -translate-y-1/2 z-[1000] flex-col gap-1 md:flex hidden md:px-20 pointer-events-none"
    >
      {/* Dots */}
      {Array.from({ length: numberOfDots }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="w-1.5 h-1.5 rounded-full bg-gray-500 opacity-0"
          style={{
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
          }}
        />
      ))}

      {/* Head Dot */}
      <div
        ref={headDotRef}
        className="absolute w-8 h-8 rounded-full pointer-events-none"
        style={{
          right: "1.25rem",
          opacity: 0,
        }}
      >
        <img
          src="/assets/Illustrations/star.svg"
          alt="Star"
          className="w-full h-full drop-shadow-[0_0_24px_rgba(230,230,230,0.6)]"
        />
      </div>
    </div>
  );
};

export default Scroller;
