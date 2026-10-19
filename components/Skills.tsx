"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Reveal";
import { skillGroups, skillLevels } from "@/lib/content";

/** Which self-rated proficiency rows belong to which skill group. */
const levelMap: Record<string, number[]> = {
  Frontend: [0, 1, 2],
  "Shopify & theme development": [4],
  "WordPress & WooCommerce": [5],
  "Backend & APIs": [3, 6],
  "Trading & Fintech": [6],
  "CRM & Marketing automation": [7, 8, 11],
  "Email & Communications": [7],
  "Cloud & DevOps": [10],
  "Analytics & SEO": [9],
  "AI & Security": [12],
};

function levelsFor(title: string) {
  return (levelMap[title] ?? []).map((i) => skillLevels[i]);
}

const allSkills = skillGroups.flatMap((g) => g.items.map((name) => ({ name, group: g.title })));

/** A slowly turning 3D sphere of every skill. Drag to spin it, pick a group to light that group up. */
const pts = (() => {
  const n = allSkills.length;
  return allSkills.map((s, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = Math.PI * (3 - Math.sqrt(5)) * i;
    return { ...s, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
  });
})();

function Sphere({ filter }: { filter: string | null }) {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const state = useRef({ ax: 0.25, ay: 0, vx: 0, vy: 0.0016, drag: false, lx: 0, ly: 0, hover: false });
  const filt = useRef(filter);
  filt.current = filter;

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const frame = () => {
      const s = state.current;
      const el = box.current;
      if (el) {
        const R = Math.min(el.clientWidth, el.clientHeight) * 0.42;
        if (!s.drag) {
          // ease back toward a gentle spin
          const target = calm ? 0 : s.hover ? 0.0006 : 0.0016;
          s.vy += (target - s.vy) * 0.02;
          s.vx *= 0.95;
        }
        s.ay += s.vy;
        s.ax += s.vx;
        s.ax = Math.max(-1.2, Math.min(1.2, s.ax));
        const cx = Math.cos(s.ax), sx = Math.sin(s.ax), cy = Math.cos(s.ay), sy = Math.sin(s.ay);
        pts.forEach((p, i) => {
          const node = els.current[i];
          if (!node) return;
          const x1 = p.x * cy + p.z * sy;
          const z1 = -p.x * sy + p.z * cy;
          const y2 = p.y * cx - z1 * sx;
          const z2 = p.y * sx + z1 * cx;
          const depth = (z2 + 1) / 2;
          const on = !filt.current || p.group === filt.current;
          node.style.transform = `translate3d(${x1 * R}px, ${y2 * R}px, 0) translate(-50%, -50%) scale(${0.65 + depth * 0.6})`;
          node.style.opacity = String(on ? 0.35 + depth * 0.65 : 0.08 + depth * 0.1);
          node.style.zIndex = String(Math.round(depth * 100));
          node.style.color = on && filt.current ? "var(--accent)" : "";
          node.style.fontWeight = on && filt.current ? "600" : "500";
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={box}
      className="relative mx-auto aspect-square w-full max-w-[540px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={(e) => {
        const s = state.current;
        s.drag = true;
        s.lx = e.clientX;
        s.ly = e.clientY;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const s = state.current;
        if (!s.drag) return;
        s.vy = (e.clientX - s.lx) * 0.0009;
        s.vx = -(e.clientY - s.ly) * 0.0009;
        s.lx = e.clientX;
        s.ly = e.clientY;
      }}
      onPointerUp={() => (state.current.drag = false)}
      onPointerCancel={() => (state.current.drag = false)}
      onPointerEnter={() => (state.current.hover = true)}
      onPointerLeave={() => (state.current.hover = false)}
      aria-label="Rotating sphere of skills. Drag to spin."
      role="img"
    >
      <div className="pointer-events-none absolute inset-[12%] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }} />
      {pts.map((p, i) => (
        <span
          key={p.group + p.name}
          ref={(n) => {
            els.current[i] = n;
          }}
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-line bg-soft/70 px-2.5 py-1 text-[11px] text-fg backdrop-blur-sm will-change-transform sm:text-xs"
        >
          {p.name}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const [group, setGroup] = useState<string | null>(null);
  const levels = group ? levelsFor(group) : skillGroups.flatMap((g) => levelsFor(g.title)).filter((l, i, a) => a.findIndex((z) => z.name === l.name) === i && l.level >= 90).slice(0, 6);
  const count = group ? skillGroups.find((g) => g.title === group)?.items.length : allSkills.length;

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 overflow-x-clip px-5 py-12 sm:px-6 sm:py-16">
      <SectionHeading index="03" eyebrow="Skills" title="The toolkit behind the work" text="Drag the sphere to turn it. Choose a group to light up its tools." />

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Sphere filter={group} />

        <div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGroup(null)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${group === null ? "border-accent bg-accent/15 text-fg" : "border-line text-muted hover:text-fg"}`}
            >
              All
            </button>
            {skillGroups.map((g) => (
              <button
                key={g.title}
                type="button"
                onClick={() => setGroup(group === g.title ? null : g.title)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${group === g.title ? "border-accent bg-accent/15 text-fg" : "border-line text-muted hover:text-fg"}`}
              >
                {g.title}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-end gap-4">
            <motion.span key={String(count)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-gradient font-display text-6xl font-bold leading-none">
              {count}
            </motion.span>
            <span className="pb-1 text-sm text-muted">{group ? `tools in ${group}` : "tools across the stack"}</span>
          </div>

          <div className="mt-8 space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{group ? "Confidence" : "Strongest areas"}</p>
            {levels.map((l, i) => (
              <div key={group + l.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{l.name}</span>
                  <span className="font-mono text-xs text-muted">{l.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-fg/[0.08]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${l.level}%` }}
                    transition={{ duration: 2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-accent via-accent2 to-accent3"
                  />
                </div>
              </div>
            ))}
            {levels.length === 0 && <p className="text-sm text-muted">No self-rating for this group.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
