import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const interpolateColor = (color1, color2, factor) => {
  return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
};

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

  useEffect(() => {
    if (!locoScroll?.current) return;

    const onScroll = ({ scroll, limit }) => {
      scrollProgress.current = scroll.y / limit.y;
    };

    locoScroll.current.on("scroll", onScroll);
    locoScroll.current.update();

    return () => locoScroll.current.off("scroll", onScroll);
  }, [locoScroll]);

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

        let color;
        if (i < fillThreshold) {
          const blendT = i / numberOfDots;
          color = getBlendedColor(blendT);
        } else {
          color = "#4b5563";
        }

        gsap.to(dots[i], {
          backgroundColor: color,
          scale: 1,
          duration: 0.3,
          ease: "sine.out",
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [numberOfDots]);

  return (
    <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[1000] flex flex-col gap-1 pointer-events-none px-20">
      {Array.from({ length: numberOfDots }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="w-2 h-2 rounded-full bg-gray-600"
        />
      ))}
    </div>
  );
};

export default Scroller;
