"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { certifications, education, experience } from "@/lib/content";

function Points({ points, first }: { points: string[]; first: boolean }) {
  const LIMIT = 6;
  const [open, setOpen] = useState(false);
  const long = points.length > LIMIT;
  const shown = long && !open ? points.slice(0, LIMIT) : points;
  return (
    <>
      <ul className="mt-4 space-y-2">
        {shown.map((p) => (
          <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`mt-4 text-sm font-medium hover:underline ${first ? "text-accent" : "text-muted"}`}
        >
          {open ? "Show less" : `Show ${points.length - LIMIT} more`}
        </button>
      )}
    </>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const height = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title="Where I've worked"
        text="A path from front-end developer to team lead, with the biggest growth in fintech."
      />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        {/* vertical line that draws as you scroll */}
        <div className="absolute bottom-0 left-[11px] top-1 w-px bg-line sm:left-[19px]" />
        <motion.div
          style={{ scaleY: height }}
          className="absolute bottom-0 left-[11px] top-1 w-px origin-top bg-gradient-to-b from-accent via-accent2 to-accent3 sm:left-[19px]"
        />

        <div className="space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={0.05}>
              <div className="relative">
                <span
                  className={`absolute -left-8 top-2 grid h-[23px] w-[23px] place-items-center rounded-full border border-line bg-bg sm:-left-12 sm:h-[39px] sm:w-[39px]`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${i === 0 ? "bg-accent shadow-[0_0_14px_var(--accent)]" : "bg-muted/60"}`}
                  />
                </span>

                <div className={`glass rounded-2xl p-6 ${i === 0 ? "border-accent/40" : ""}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-semibold">
                      {e.company} <span className="text-accent">· {e.role}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{e.place}</p>
                  <Points points={e.points} first={i === 0} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Education</p>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.degree}>
                  <h3 className="font-display text-base font-semibold">{e.degree}</h3>
                  <p className="mt-0.5 text-sm text-muted">{e.school}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Certifications</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {certifications.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
