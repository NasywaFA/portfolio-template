"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
}

export const WaterCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false); // true when on clickable element
  const trailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile / reduced motion — only run on client
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile && !reduced) setEnabled(true);
  }, []);

  // Hide / restore native cursor
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.style.cursor = "none";
    // Also hide on every element so iframes / inputs don't show it
    const style = document.createElement("style");
    style.id = "__water-cursor-hide__";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = "";
      document.getElementById("__water-cursor-hide__")?.remove();
    };
  }, [enabled]);

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);

    setTrails((prev) => [
      ...prev.slice(-8),
      { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY },
    ]);

    // Detect if hovering a clickable element
    const el = e.target as HTMLElement;
    setActive(
      el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.closest("button") !== null ||
        el.closest("a") !== null ||
        el.style.cursor === "pointer" ||
        window.getComputedStyle(el).cursor === "pointer"
    );
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1500);
  }, []);

  const handleLeave = useCallback(() => setVisible(false), []);
  const handleEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, handleMove, handleClick, handleLeave, handleEnter]);

  // Trim old trails
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setTrails((p) => p.slice(-6)), 100);
    return () => clearInterval(id);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden>

      {/* Main cursor dot */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute rounded-full"
            style={{
              left: pos.x,
              top: pos.y,
              translateX: "-50%",
              translateY: "-50%",
              background: "hsl(var(--primary) / 0.7)",
              boxShadow: "0 0 16px hsl(var(--primary) / 0.45)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: active ? 1.8 : 1,
              opacity: 1,
              width: 14,
              height: 14,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Outer ring — lags slightly for water feel */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute rounded-full border"
            style={{
              left: pos.x,
              top: pos.y,
              translateX: "-50%",
              translateY: "-50%",
              borderColor: "hsl(var(--primary) / 0.25)",
              width: 36,
              height: 36,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: active ? 1.4 : 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Trail */}
      {trails.map((t, i) => (
        <motion.div
          key={t.id}
          className="absolute rounded-full"
          style={{
            left: t.x,
            top: t.y,
            translateX: "-50%",
            translateY: "-50%",
            width: 7,
            height: 7,
            background: "hsl(var(--primary) / 0.35)",
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 0.2, opacity: 0, filter: "blur(3px)" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.015 }}
        />
      ))}

      {/* Click ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full border"
          style={{
            left: r.x,
            top: r.y,
            translateX: "-50%",
            translateY: "-50%",
            width: 20,
            height: 20,
            borderColor: "hsl(var(--primary) / 0.4)",
          }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 9, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};