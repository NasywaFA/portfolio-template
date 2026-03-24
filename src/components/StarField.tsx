"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const STAR_COUNT = 150;

// Generate stars once outside the component so they're stable
// across re-renders without needing useMemo
function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    twinkleSpeed: Math.random() * 2 + 1,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
}

const stars = generateStars();

export const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let startTime: number | null = null;

    const resize = () => {
      // Use devicePixelRatio for crisp rendering on retina screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const draw = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = (ts - startTime) / 1000;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const twinkle = Math.sin(elapsed * star.twinkleSpeed + star.twinkleOffset);
        const alpha = Math.max(0.05, star.opacity + twinkle * 0.3);

        const px = star.x * w;
        const py = star.y * h;

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${alpha})`;
        ctx.fill();

        // Soft glow for larger stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 190, 255, ${alpha * 0.18})`;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []); // stable — stars array is module-level, no deps needed

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.75 }}
      aria-hidden
    />
  );
};