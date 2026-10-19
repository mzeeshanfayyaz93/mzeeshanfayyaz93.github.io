"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "./Reveal";
import { testimonials } from "@/lib/content";
import { initials } from "./ui";

/** 3D coverflow. Drag, swipe, click a side card or use the arrow keys. */
export default function Testimonials() {
  const n = testimonials.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 9500);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const offset = (idx: number) => {
    let d = idx - i;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 overflow-x-clip px-5 py-12 sm:px-6 sm:py-16">
      <SectionHeading index="07" eyebrow="Testimonials" title="What clients say" text="Drag the cards, or use the arrows." />

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        role="group"
        aria-label="Client testimonials"
      >
        <div className="relative mx-auto h-[390px] sm:h-[340px]" style={{ perspective: 1300 }}>
          {testimonials.map((t, idx) => {
            const d = offset(idx);
            const a = Math.abs(d);
            const active = d === 0;
            return (
              <motion.figure
                key={t.name}
                className="glass absolute inset-x-0 top-0 mx-auto flex h-full w-[min(400px,80vw)] cursor-pointer flex-col justify-between rounded-3xl p-7 sm:p-8"
                style={{ zIndex: 10 - a, transformStyle: "preserve-3d", pointerEvents: a > 2 ? "none" : "auto" }}
                animate={{
                  x: `${d * 62}%`,
                  rotateY: -d * 34,
                  scale: 1 - a * 0.13,
                  opacity: a > 2 ? 0 : 1 - a * 0.28,
                  filter: active ? "blur(0px)" : `blur(${a * 1.5}px)`,
                }}
                transition={{ type: "spring", stiffness: 55, damping: 18 }}
                drag={active ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={() => !active && setI(idx)}
                aria-hidden={!active}
              >
                <Quote className="h-9 w-9 text-accent" aria-hidden="true" />
                <blockquote className="my-4 text-lg font-medium leading-relaxed tracking-tight">{t.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-bg">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous" onClick={() => go(-1)} className="glass grid h-11 w-11 place-items-center rounded-full transition-colors hover:border-accent hover:text-accent">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show ${t.name}`}
                onClick={() => setI(idx)}
                className="relative h-2.5 rounded-full bg-line transition-all"
                style={{ width: idx === i ? 34 : 10 }}
              >
                {idx === i && <motion.span layoutId="rv-dot" className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent2" />}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next" onClick={() => go(1)} className="glass grid h-11 w-11 place-items-center rounded-full transition-colors hover:border-accent hover:text-accent">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
