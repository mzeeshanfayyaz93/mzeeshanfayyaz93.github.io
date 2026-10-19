"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Reveal";
import { img } from "./ui";
import { clientWork, type WorkType } from "@/lib/content";
function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Three walls of sites drifting past in opposite directions, very slowly. Hover to hold one still. */
const filters: ("All" | WorkType)[] = ["All", "Web apps", "Shopify", "WordPress"];

function Card({ w }: { w: (typeof clientWork)[number] }) {
  return (
    <a href={w.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${w.name} (opens in a new tab)`} className="group mr-5 block w-[280px] shrink-0 sm:w-[320px]">
      <div className="glass overflow-hidden rounded-2xl transition-colors duration-700 group-hover:border-accent">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-accent2/10 via-transparent to-accent/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(`work/${w.image}`, `/work/${w.image}.webp`)} alt={`Screenshot of ${w.name}, a ${w.type === "Web apps" ? "web app" : w.type + " website"} built by Mohammad Zeeshan Fayyaz`} loading="lazy" className={`h-full w-full transition-transform duration-[1400ms] group-hover:scale-[1.06] ${w.bleed ? "object-cover" : "object-contain p-3"}`} />
          <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-bg/80 text-accent opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold">{w.name}</h3>
            <p className="truncate text-xs text-muted">{host(w.url)}</p>
          </div>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent">{w.type}</span>
        </div>
      </div>
    </a>
  );
}

function Wall({ items, reverse, seconds }: { items: (typeof clientWork)[number][]; reverse?: boolean; seconds: number }) {
  const base = useMemo(() => {
    const out = [...items];
    while (out.length < 7) out.push(...items);
    return out;
  }, [items]);
  const loop = [...base, ...base];
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div className="marquee" style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: `${seconds * (base.length / 9)}s` }}>
        {loop.map((w, i) => (
          <Card key={`${w.name}-${i}`} w={w} />
        ))}
      </div>
    </div>
  );
}

export default function ClientWork() {
  const [filter, setFilter] = useState<"All" | WorkType>("All");
  const list = useMemo(() => clientWork.filter((w) => filter === "All" || w.type === filter), [filter]);
  const rows = useMemo(() => {
    const n = list.length >= 6 ? 3 : list.length >= 4 ? 2 : 1;
    return Array.from({ length: n }, (_, r) => list.filter((_, k) => k % n === r));
  }, [list]);

  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading index="06" eyebrow="Client work" title="Websites I have shipped" text={`${clientWork.length} live sites and platforms across web apps, Shopify and WordPress. Hover a card to pause the wall, tap to visit.`} />
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f === "All" ? clientWork.length : clientWork.filter((w) => w.type === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors ${filter === f ? "border-transparent text-bg" : "border-line text-muted hover:text-fg"}`}
              >
                {filter === f && <motion.span layoutId="wc-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent2" transition={{ type: "spring", stiffness: 70, damping: 18 }} />}
                <span className="relative">
                  {f} <span className="opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-5" key={filter}>
        {rows.map((r, k) => (
          <Wall key={k} items={r} reverse={k % 2 === 1} seconds={[120, 140, 130][k]} />
        ))}
      </div>
    </section>
  );
}
