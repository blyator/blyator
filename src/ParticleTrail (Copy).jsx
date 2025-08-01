import React, { useEffect, useRef } from "react";

function ScrollDotTrail({ numberOfDots = 30, locoScroll }) {
  const dotsRef = useRef([]);

  useEffect(() => {
    if (!locoScroll?.current) return;

    const updateDots = ({ scroll, limit }) => {
      const progress = scroll.y / limit.y;
      const activeCount = Math.floor(progress * numberOfDots);

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;

        const isActive = i <= activeCount;

        dot.classList.remove("bg-base-content/30", "bg-primary");
        dot.classList.add(isActive ? "bg-primary" : "bg-base-content/30");

        dot.style.transform = `scale(${isActive ? 1.2 : 1})`;
      });
    };

    locoScroll.current.on("scroll", updateDots);
    locoScroll.current.update();

    return () => {
      locoScroll.current.off("scroll", updateDots);
    };
  }, [locoScroll, numberOfDots]);

  return (
    <div className="fixed right-20 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 items-end px-20">
      {Array.from({ length: numberOfDots }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="w-2 h-2 rounded-full bg-base-content/30 transition-all duration-300 hover:scale-150 hover:bg-primary cursor-pointer"
          title={`Section ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default ScrollDotTrail;
