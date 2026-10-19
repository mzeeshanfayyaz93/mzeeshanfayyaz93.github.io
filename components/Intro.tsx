"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Short loading curtain: the MZF mark draws itself, then the curtain lifts to reveal the hero. */
export default function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = prev;
    }, 2300);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [reduce]);

  return (
    <>
      <noscript>
        <style>{".intro-curtain{display:none!important}"}</style>
      </noscript>
      <AnimatePresence>
        {!done && (
          <motion.div
            key="intro"
            aria-hidden="true"
            className="intro-curtain fixed inset-x-0 top-0 z-[100] grid h-[100dvh] place-items-center bg-bg"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative grid h-24 w-24 place-items-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                  <defs>
                    <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="60%" stopColor="var(--accent-2)" />
                      <stop offset="100%" stopColor="var(--accent-3)" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#introGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </svg>
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="text-gradient font-display text-2xl font-extrabold tracking-tight"
                >
                  MZF
                </motion.span>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="font-mono text-xs uppercase tracking-[0.35em] text-muted"
              >
                Loading experience
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
