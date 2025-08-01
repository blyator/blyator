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

  useEffect(() => {
    scrollInstance.current = locoScroll?.current;

    if (!scrollInstance.current) return;

    const onScroll = ({ scroll, limit }) => {
      if (limit?.y > 0) {
        scrollProgress.current = scroll.y / limit.y;
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
    };
  }, [locoScroll?.current]);

  useEffect(() => {
    const dots = dotsRef.current;
    const positions = new Array(numberOfDots).fill(0);

    const animate = () => {
      const target = scrollProgress.current;

      positions.forEach((pos, i) => {
        const prev = i === 0 ? target : positions[i - 1];
        positions[i] += (prev - pos) * 0.2;

        const t = i / (numberOfDots - 1);
        const fillThreshold = target * numberOfDots;

        let color =
          i < fillThreshold ? getBlendedColor(i / numberOfDots) : "#4b5563";

        if (dots[i]) {
          gsap.to(dots[i], {
            backgroundColor: color,
            scale: 1,
            duration: 0.3,
            ease: "sine.out",
          });
        }
      });

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
    <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[1000] flex-col gap-1 pointer-events-none md:flex hidden md:px-20">
      {Array.from({ length: numberOfDots }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="w-1.5 h-1.5 rounded-full bg-gray-500"
        />
      ))}
    </div>
  );
};

export default Scroller;
