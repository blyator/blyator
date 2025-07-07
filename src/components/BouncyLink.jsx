import React, { useRef } from "react";
import gsap from "gsap";

export default function BouncyLink({ text, href }) {
  const lettersRef = useRef([]);
  const containerRef = useRef();

  const BOUNCE_OFFSET = 12;
  const START_DURATION = 0.12;
  const BOUNCE_DURATION = 0.14;
  const RETURN_DURATION = 0.18;
  const DELAY_PER_LETTER = 0.02;

  const onEnter = () => {
    gsap.to(containerRef.current, {
      rotate: -3,
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
    });

    // Letter bounce //
    lettersRef.current.forEach((el, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        el,
        { y: 0 },
        {
          keyframes: [
            { y: 10 * direction, duration: START_DURATION, ease: "power3.in" },
            {
              y: -BOUNCE_OFFSET * direction,
              duration: BOUNCE_DURATION,
              ease: "power1.out",
            },
            { y: 0, duration: RETURN_DURATION, ease: "power2.out" },
          ],
          delay: i * DELAY_PER_LETTER,
        }
      );
    });
  };

  const onLeave = () => {
    // Reset tilt + scale
    gsap.to(containerRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <a
      href={href}
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="inline-flex items-center font-sans text-primary hover:text-primary-content hover:bg-secondary transition-colors duration-300 rounded-full px-4 py-1"
      style={{
        gap: "0.04em",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          className="inline-block"
          style={{ marginRight: "-0.01em" }}
        >
          {char}
        </span>
      ))}
    </a>
  );
}
