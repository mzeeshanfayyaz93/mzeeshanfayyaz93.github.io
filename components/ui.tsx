"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Public asset path (served from /public). */
export function img(_key: string, fallback: string) {
  return fallback;
}

export function splitStat(value: string) {
  const n = parseInt(value, 10);
  return { n: Number.isNaN(n) ? 0 : n, suffix: value.replace(/^[0-9]+/, "") };
}

/** Number that counts up the first time it scrolls into view. */
export function Counter({ to, suffix = "", duration = 3 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/** Heading whose letters rise in one by one and bounce when hovered. */
export function WaveText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((c, i) =>
        c === " " ? (
          <span key={i} aria-hidden="true">
            &nbsp;
          </span>
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            initial={{ y: "70%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 1.1, ease }}
            whileHover={{ y: -10, scale: 1.12, transition: { duration: 0.15 } }}
          >
            {c}
          </motion.span>
        ),
      )}
    </span>
  );
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function mailtoUrl(to: string, name: string, email: string, message: string, subject?: string) {
  const s = encodeURIComponent(subject ?? `Portfolio message from ${name}`);
  const b = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  return `mailto:${to}?subject=${s}&body=${b}`;
}
