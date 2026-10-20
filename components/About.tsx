"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import TiltCard from "./TiltCard";
import { highlights, interests, marquee, profile } from "@/lib/content";
import { Counter, splitStat } from "./ui";

/** Bento grid. Each tile does one thing: portrait, story, numbers, stack, status, AI tools. */
const tools = ["Claude", "ChatGPT", "Cursor", "DeepSeek", "Grok", "AbacusAI"];
const key = ["Next.js", "Node.js", "Strapi CMS", "Shopify", "WordPress", "MT5/MT4", "Salesforce", "20+ markets", "fintech"];

function Story() {
  const parts = profile.summary.split(new RegExp(`(${key.map((k) => k.replace(/[+/.]/g, "\\$&")).join("|")})`, "g"));
  return (
    <p className="text-base leading-relaxed text-muted sm:text-lg">
      {parts.map((p, i) =>
        key.includes(p) ? (
          <span key={i} className="font-semibold text-fg">
            <span className="rounded bg-gradient-to-r from-accent/25 to-accent2/25 px-1">{p}</span>
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </p>
  );
}

function DubaiClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Dubai" }).format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="font-mono text-2xl font-semibold tabular-nums sm:text-3xl">{time}</span>;
}

function Ring() {
  const text = "SENIOR WEB DEVELOPER • TEAM LEAD • FINTECH • NEXT.JS • ";
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute inset-0 h-full w-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <defs>
        {/* r=88 keeps labels inside the size-80 frame (card uses overflow-hidden). */}
        <path id="aboutRingPath" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
      </defs>
      <text fontSize="9.25" letterSpacing="2.15" fill="var(--muted)" fontWeight="600">
        <textPath href="#aboutRingPath">{text.repeat(2)}</textPath>
      </text>
    </motion.svg>
  );
}


/* ------------------------------------------------------------------ */
/* Two terminal panes type across the whole portrait tile, behind the photo */
/* ------------------------------------------------------------------ */
type Line = { cmd: string; out: string };

const leftScript: Line[] = [
  { cmd: "whoami", out: "mohammad-zeeshan-fayyaz" },
  { cmd: "role --current", out: "Senior Web Developer & Team Lead @ GTCFX, Dubai" },
  { cmd: "experience --years", out: "8+ years · 20+ markets · 200+ sites · 50+ clients" },
  { cmd: "stack --list", out: "Next.js · Node.js · Strapi · Tailwind · MT5/MT4 · Salesforce · AWS" },
  { cmd: "themes --custom", out: "Shopify (Liquid) · WordPress · WooCommerce, built from scratch with no starter themes" },
  { cmd: "location", out: "Dubai, UAE · open to full-time and freelance" },
  { cmd: "clients --count", out: "50+ happy clients across 20+ markets" },
  { cmd: "cat interests", out: "AI & automation · UI/UX design · Travel · Music · Cycling" },
  { cmd: "status", out: "always learning, happy to multitask" },
];

const rightScript: Line[] = [
  { cmd: "cat skills.txt", out: "Shopify Liquid · WordPress themes & plugins · WooCommerce · ACF · WPML" },
  { cmd: "ai --tools", out: "Claude · ChatGPT · DeepSeek · Grok · AbacusAI · Cursor" },
  { cmd: "deploy --targets", out: "Vercel · AWS EC2 · Cloudflare · AliCloud · PM2 · Nginx" },
  { cmd: "crm --sync", out: "Meta · Google · TikTok leads → Salesforce via Zapier" },
  { cmd: "trading --connect", out: "MT5 · MT4 · Copy Trading · client portal onboarding" },
  { cmd: "npm run build", out: "✓ compiled, 0 errors, fast and accessible" },
  { cmd: "ls clients/", out: "Snowe Home · BURGA · Tilevera · Bliss Pilates · RockzFX · FreedomFi" },
  { cmd: "uptime", out: "8+ years and counting" },
  { cmd: "git push", out: "shipped to production" },
];

const CPS = 14; // characters typed per second
const PAUSE = 10; // beat between a command and its output
const REST = 6; // seconds to rest before typing it all again

const lineLen = (l: Line) => l.cmd.length + PAUSE + l.out.length;
const total = (script: Line[]) => script.reduce((n, l) => n + lineLen(l), 0);

function TerminalPane({ script, side, delay = 0 }: { script: Line[]; side: "left" | "right"; delay?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "-40px" });
  const [chars, setChars] = useState(0);
  const [calm, setCalm] = useState(false);
  const all = total(script);

  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Time-based, so a slow frame never makes the typing crawl.
  useEffect(() => {
    if (calm || !inView) return;
    let raf = 0;
    const t0 = performance.now() + delay * 1000;
    const loop = (now: number) => {
      const sec = (now - t0) / 1000;
      const cycle = all / CPS + REST;
      const within = sec < 0 ? 0 : sec % cycle;
      setChars(Math.min(all, Math.floor(within * CPS)));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [calm, inView, all, delay]);

  // keep the newest line in view, like a real terminal
  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTop = calm ? 0 : el.scrollHeight;
  }, [chars, calm]);

  let left = calm ? all : chars;
  const rows = script.map((l) => {
    const cmd = Math.max(0, Math.min(left, l.cmd.length));
    left -= l.cmd.length + PAUSE;
    const out = Math.max(0, Math.min(left, l.out.length));
    left -= l.out.length;
    return { cmd: l.cmd.slice(0, cmd), out: l.out.slice(0, out), started: cmd > 0, done: out === l.out.length };
  });
  const lastStarted = rows.reduce((n, r, i) => (r.started ? i : n), -1);
  const right = side === "right";

  return (
    <div ref={box} className={`h-full w-1/2 overflow-hidden ${right ? "text-right" : "text-left"}`}>
      {rows.map((r, i) =>
        r.started ? (
          <div key={i} className="mb-1.5">
            <p className="break-words">
              <span className="text-accent3">$</span> <span className="text-accent">{r.cmd}</span>
              {i === lastStarted && !r.out && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-accent" />}
            </p>
            {r.out && (
              <p className={`break-words text-muted ${right ? "pr-3" : "pl-3"}`}>
                {r.out}
                {i === lastStarted && !r.done && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent" />}
              </p>
            )}
          </div>
        ) : null,
      )}
    </div>
  );
}

// Hide the text behind the photo ring and the name, so it reads as a backdrop on every other side.
const hole = [
  "radial-gradient(circle at 50% var(--mask-y), transparent calc(var(--ring) / 2 + 2px), #000 calc(var(--ring) / 2 + 52px))",
  "radial-gradient(ellipse var(--name-w) var(--nh) at 50% calc(var(--mask-y) + var(--ring) / 2 + 16px), transparent 82%, #000 100%)",
].join(", ");

function TerminalBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex overflow-hidden px-4 py-4 font-mono text-[10px] leading-[1.35rem] opacity-70 sm:px-5 sm:text-[11px]"
      style={{ maskImage: hole, WebkitMaskImage: hole, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
    >
      <TerminalPane script={leftScript} side="left" />
      <TerminalPane script={rightScript} side="right" delay={1.5} />
    </div>
  );
}

export default function About() {
  const loop = [...marquee, ...marquee];
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16">
      <SectionHeading index="01" eyebrow="About" title="One developer, many moving parts" />

      <div className="grid auto-rows-[minmax(150px,auto)] gap-4 grid-cols-1 lg:grid-cols-4">
        {/* portrait */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <TiltCard
            className="relative flex h-full min-h-[500px] flex-col items-center justify-center overflow-hidden p-8 [--ring:352px] [--mask-y:42%] [--name-w:20rem] [--nh:68px] sm:[--mask-y:41%] sm:[--nh:52px]"
            strength={5}
          >
            <TerminalBackdrop />
            <div className="relative z-10 size-80 shrink-0">
              <Ring />
              <div className="absolute inset-8 overflow-hidden rounded-full border border-line bg-black shadow-[0_0_60px_-10px_var(--accent)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover object-[center_18%]" />
              </div>
            </div>
            <h3 className="relative z-10 mt-6 font-display text-2xl font-semibold">{profile.name}</h3>
            <p className="relative z-10 text-sm text-muted">{profile.title}</p>
          </TiltCard>
        </Reveal>

        {/* story */}
        <Reveal delay={0.05} className="lg:col-span-2">
          <TiltCard className="h-full p-6 sm:p-7" strength={3}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">The short version</p>
            <Story />
          </TiltCard>
        </Reveal>

        {/* numbers */}
        {highlights.slice(0, 2).map((h, i) => {
          const { n, suffix } = splitStat(h.value);
          return (
            <Reveal key={h.label} delay={0.1 + i * 0.05}>
              <TiltCard className="flex h-full flex-col justify-between p-6" strength={5}>
                <div className="text-gradient font-display text-5xl font-bold">
                  <Counter to={n} suffix={suffix} />
                </div>
                <p className="text-sm text-muted">{h.label}</p>
              </TiltCard>
            </Reveal>
          );
        })}

        {/* now */}
        <Reveal delay={0.1}>
          <TiltCard className="flex h-full flex-col justify-between p-6" strength={5}>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Right now
            </div>
            <div>
              <DubaiClock />
              <p className="mt-1 text-sm text-muted">Leading full-stack at GTCFX, Dubai</p>
            </div>
          </TiltCard>
        </Reveal>

        {/* stack ribbon */}
        <Reveal delay={0.12} className="lg:col-span-3">
          <TiltCard className="flex h-full flex-col justify-center gap-3 overflow-hidden py-6" strength={2}>
            {[false, true].map((rev) => (
              <div
                key={String(rev)}
                className="overflow-hidden"
                style={{ maskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)" }}
              >
                <div className="marquee" style={{ animationDirection: rev ? "reverse" : "normal", animationDuration: rev ? "95s" : "80s" }}>
                  {(rev ? [...loop].reverse() : loop).map((m, i) => (
                    <span key={i} className="mr-3 shrink-0 rounded-full border border-line bg-fg/[0.04] px-4 py-1.5 text-sm text-muted">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </TiltCard>
        </Reveal>

        {/* AI tools */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="relative h-full overflow-hidden rounded-2xl p-[1.5px]">
            <motion.div
              aria-hidden="true"
              className="absolute -inset-[60%]"
              style={{ background: "conic-gradient(from 0deg, transparent 0 60%, var(--accent) 80%, var(--accent-3) 100%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative h-full rounded-[calc(1rem-1.5px)] bg-soft p-6">
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">AI-augmented developer</p>
              <p className="text-sm text-muted">Daily tools that help me ship faster and think wider.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tools.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    whileHover={{ y: -4, scale: 1.06 }}
                    className="rounded-full bg-gradient-to-r from-accent/20 to-accent2/20 px-3.5 py-1.5 text-sm font-medium"
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* interests */}
        <Reveal delay={0.12} className="lg:col-span-2">
          <TiltCard className="h-full p-6" strength={3}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Outside the editor</p>
            <ul className="flex flex-wrap gap-2">
              {interests.map((x) => (
                <motion.li
                  key={x}
                  whileHover={{ rotate: [0, -4, 4, 0], scale: 1.08 }}
                  className="cursor-default rounded-full border border-line bg-fg/[0.04] px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {x}
                </motion.li>
              ))}
            </ul>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
