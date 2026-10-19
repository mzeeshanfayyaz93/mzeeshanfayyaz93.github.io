"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the top showing how far the page has been scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-accent2 to-accent3"
    />
  );
}

/** Soft glow that follows the mouse. Hidden on touch screens. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);
    const move = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: "spring", stiffness: 40, damping: 22, mass: 0.8 }}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full opacity-60"
      style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }}
    />
  );
}

/** Fixed background: grid, drifting colour blobs. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="blob -left-24 top-10 h-[420px] w-[420px]" style={{ background: "var(--accent-2)" }} />
      <div className="blob right-[-8%] top-[30%] h-[460px] w-[460px]" style={{ background: "var(--accent)", animationDelay: "-8s" }} />
      <div className="blob bottom-[-10%] left-[30%] h-[380px] w-[380px]" style={{ background: "var(--accent-3)", animationDelay: "-14s" }} />
    </div>
  );
}
