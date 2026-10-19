"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./Reveal";
import { projects, type Category } from "@/lib/content";

const catColor: Record<Category, string> = {
  Fintech: "var(--accent)",
  Automation: "var(--accent-3)",
  Web: "var(--accent-2)",
  "Internal tools": "var(--muted)",
};

/** A systems map. Every project is a node around the platform; pick one to read it. */
const cats: Category[] = ["Fintech", "Automation", "Internal tools", "Web"];
const sector: Record<Category, [number, number]> = {
  Fintech: [-78, -8],
  Automation: [12, 72],
  "Internal tools": [108, 158],
  Web: [172, 282],
};

export default function Projects() {
  const [sel, setSel] = useState(0);
  const [cat, setCat] = useState<Category | null>(null);

  const nodes = useMemo(() => {
    return projects.map((p, idx) => {
      const same = projects.filter((q) => q.category === p.category);
      const k = same.indexOf(p);
      const [a0, a1] = sector[p.category];
      const t = same.length === 1 ? 0.5 : k / (same.length - 1);
      const ang = ((a0 + (a1 - a0) * (0.12 + t * 0.76)) * Math.PI) / 180;
      const r = k % 2 === 0 ? 31 : 44; // percent of half-size
      return { p, idx, x: 50 + Math.cos(ang) * r, y: 50 + Math.sin(ang) * r };
    });
  }, []);

  const cur = projects[sel];

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16">
      <SectionHeading index="05" eyebrow="Projects" title="Platform and integration work" text="Systems and integrations I have designed and built, mostly in fintech. Tap a node to open it." />

      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {[31, 44].map((r) => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeDasharray="0.6 1.4" strokeWidth="0.25" />
            ))}
            {nodes.map((n) => {
              const dim = cat && n.p.category !== cat;
              return (
                <line key={n.p.title} x1="50" y1="50" x2={n.x} y2={n.y} stroke={catColor[n.p.category]} strokeWidth={n.idx === sel ? 0.5 : 0.25} strokeDasharray="1.2 1.8" opacity={dim ? 0.12 : n.idx === sel ? 1 : 0.5} style={{ transition: "all 1s" }}>
                  <animate attributeName="stroke-dashoffset" from="0" to="-9" dur="9s" repeatCount="indefinite" />
                </line>
              );
            })}
          </svg>

          {/* hub */}
          <motion.div
            className="absolute left-1/2 top-1/2 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/60 bg-soft text-center shadow-[0_0_50px_-8px_var(--accent)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px]">
              Platform
              <br />
              core
            </span>
          </motion.div>

          {nodes.map((n) => {
            const on = n.idx === sel;
            const dim = cat && n.p.category !== cat;
            return (
              <button
                key={n.p.title}
                type="button"
                onClick={() => setSel(n.idx)}
                onMouseEnter={() => setSel(n.idx)}
                aria-label={n.p.title}
                aria-pressed={on}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: dim ? 0.2 : 1, transition: "opacity 1s" }}
              >
                <span className="relative grid h-7 w-7 place-items-center sm:h-9 sm:w-9">
                  {on && <motion.span className="absolute inset-0 rounded-full" style={{ background: catColor[n.p.category] }} initial={{ opacity: 0.5, scale: 1 }} animate={{ opacity: 0, scale: 2 }} transition={{ duration: 3, repeat: Infinity }} />}
                  <span className="relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-700 sm:h-4 sm:w-4" style={{ borderColor: catColor[n.p.category], background: on ? catColor[n.p.category] : "var(--bg)", transform: on ? "scale(1.4)" : "scale(1)" }} />
                </span>
                <span className={`pointer-events-none absolute left-1/2 top-full mt-0.5 hidden w-28 -translate-x-1/2 text-center text-[10px] leading-tight transition-colors duration-700 sm:block ${on ? "text-fg" : "text-muted"}`}>{n.p.title}</span>
              </button>
            );
          })}
        </div>

        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(cat === c ? null : c)}
                aria-pressed={cat === c}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${cat === c ? "border-accent bg-accent/10 text-fg" : "border-line text-muted hover:text-fg"}`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: catColor[c] }} />
                {c}
              </button>
            ))}
          </div>
          <div className="glass min-h-[300px] rounded-3xl p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={cur.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: catColor[cur.category] }}>
                  {cur.category} · {String(sel + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug sm:text-3xl">{cur.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{cur.text}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {cur.tags.map((t) => (
                    <li key={t} className="rounded-md bg-fg/[0.06] px-2.5 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
