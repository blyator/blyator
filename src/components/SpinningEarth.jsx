import React from "react";

const SpinningEarth = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <img
        src="/assets/Illustrations/star.svg"
        alt="Spinning Star"
        className="w-10 h-10 animate-spin-slow drop-shadow-[0_0_12px_rgba(0,150,255,0.5)]"
      />
    </div>
  );
};

export default SpinningEarth;
