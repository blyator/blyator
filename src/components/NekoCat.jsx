import React, { useState, useEffect, useRef } from "react";

const directionSprites = {
  awake: ["awake.png", "awake.png"],
  scratch: ["scratch1.png", "scratch2.png"],
  wash: ["wash1.png", "wash2.png"],
  yawn: ["yawn1.png", "yawn2.png"],
  sleep: ["sleep1.png", "sleep2.png"],
  up: ["up1.png", "up2.png"],
  upright: ["upright1.png", "upright2.png"],
  right: ["right1.png", "right2.png"],
  downright: ["downright1.png", "downright2.png"],
  down: ["down1.png", "down2.png"],
  downleft: ["downleft1.png", "downleft2.png"],
  left: ["left1.png", "left2.png"],
  upleft: ["upleft1.png", "upleft2.png"],
};

export default function NekoCat() {
  const offset = { x: -12, y: -36 };

  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [pos, setPos] = useState({
    x: window.innerWidth / 2 + offset.x,
    y: window.innerHeight / 2 + offset.y,
  });

  const [renderPos, setRenderPos] = useState({
    x: window.innerWidth / 2 + offset.x,
    y: window.innerHeight / 2 + offset.y,
  });

  const [spriteState, setSpriteState] = useState("sleep");
  const [frameIndex, setFrameIndex] = useState(0);
  const [idleFrames, setIdleFrames] = useState(80);
  const [hasMoved, setHasMoved] = useState(false);

  const countRef = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const speed = 3; // nekocat speed adjusting
    const minDist = 2;

    const animate = () => {
      countRef.current += 1;

      const targetX = mouse.x + offset.x;
      const targetY = mouse.y + offset.y;

      const dx = targetX - pos.x;
      const dy = targetY - pos.y;
      const distance = Math.hypot(dx, dy);
      const isMoving = distance > minDist;

      let direction = spriteState;

      if (!hasMoved) {
        direction = "sleep";
      } else if (isMoving) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const a = (angle + 360) % 360;

        if (a > 247.5 && a <= 292.5) direction = "up";
        else if (a > 292.5 && a <= 337.5) direction = "upright";
        else if (a <= 22.5 || a > 337.5) direction = "right";
        else if (a > 22.5 && a <= 67.5) direction = "downright";
        else if (a > 67.5 && a <= 112.5) direction = "down";
        else if (a > 112.5 && a <= 157.5) direction = "downleft";
        else if (a > 157.5 && a <= 202.5) direction = "left";
        else if (a > 202.5 && a <= 247.5) direction = "upleft";

        const ratio = speed / distance;
        const stepX = dx * ratio;
        const stepY = dy * ratio;

        setPos((prev) => ({
          x: prev.x + stepX,
          y: prev.y + stepY,
        }));

        setIdleFrames(0);
      } else if (hasMoved) {
        // here is for idle animation
        if (countRef.current % 4 === 0) {
          setIdleFrames((prev) => prev + 1);
        }
        if (idleFrames < 20) direction = "awake";
        else if (idleFrames < 40) direction = "scratch";
        else if (idleFrames < 60) direction = "wash";
        else if (idleFrames < 80) direction = "yawn";
        else direction = "sleep";
      }

      setSpriteState(direction);

      const isIdle = ["scratch", "wash", "yawn", "sleep"].includes(direction);
      const delay = isIdle ? 12 : 6;

      if (countRef.current % delay === 0) {
        setFrameIndex((prev) => (prev + 1) % 2);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouse, pos, spriteState, idleFrames, hasMoved]);

  useEffect(() => {
    let interpolationId;
    const interpolate = () => {
      setRenderPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      interpolationId = requestAnimationFrame(interpolate);
    };
    interpolationId = requestAnimationFrame(interpolate);
    return () => cancelAnimationFrame(interpolationId);
  }, [pos]);

  const sprite = directionSprites[spriteState]?.[frameIndex] ?? "sleep1.png";

  return (
    <img
      src={`/assets/neko/${sprite}`}
      alt="neko"
      className="hidden lg:block fixed pointer-events-none z-0 w-[32px] h-[32px]"
      style={{
        left: `${renderPos.x}px`,
        top: `${renderPos.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
