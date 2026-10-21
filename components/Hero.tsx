"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/lib/content";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import Magnetic from "./Magnetic";
import CodeEditor from "./CodeEditor";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingWords() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % profile.roles.length), 4800);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block min-h-[1.4em] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.4 }}
          className="text-gradient inline-block font-medium"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Each letter flips up out of a blur, one after another. */
function Letters({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block whitespace-nowrap" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          style={{ transformPerspective: 600 }}
          initial={{ opacity: 0, y: 48, rotateX: -80, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: delay + i * 0.08, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function FloatChip({
  label,
  className,
  depth,
  mx,
  my,
  delay,
  dot = "bg-accent",
  children,
}: {
  label?: string;
  className: string;
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  delay: number;
  dot?: string;
  children?: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.6, ease }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 10 + depth / 5, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
          className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dot} shadow-[0_0_10px_currentColor]`} />
          {children ?? label}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function DubaiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai" }).format(new Date()),
      );
    tick();
    const t = window.setInterval(tick, 20000);
    return () => window.clearInterval(t);
  }, []);
  return <span className="font-mono">Dubai {time || "--:--"}</span>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  // wait for the intro curtain before starting the text animation
  const base = reduce ? 0 : 2;

  // pointer position (-1..1) drives the parallax on the floating chips
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 30, damping: 20 });
  const my = useSpring(rawY, { stiffness: 30, damping: 20 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY]);

  // scroll parallax: copy drifts up and fades, the editor sinks slightly
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -80]);
  const textOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const editorY = useTransform(scrollY, [0, 800], [0, 40]);
  const editorOpacity = useTransform(scrollY, [0, 1000], [1, 0.65]);
  // gentle 3D tilt that follows the pointer
  const tiltY = useTransform(mx, (v) => v * 5);
  const tiltX = useTransform(my, (v) => v * -4);

  const fadeUp = (i: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, delay: base + i * 0.2, ease },
  });

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* breathing glow behind the editor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-1/2 h-[80vmin] w-[80vmin] -translate-y-1/2 rounded-full lg:right-[0%]"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 68%)" }}
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/30 to-transparent lg:from-bg/60 lg:via-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-32 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-2xl">
          <motion.div
            {...fadeUp(0)}
            className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs text-muted sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.title} · {profile.company}, {profile.location}
          </motion.div>

          <motion.p {...fadeUp(1)} className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-accent">
            Hello, I&apos;m
          </motion.p>

          <h1
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-7xl xl:text-8xl"
          >
            <Letters text="Mohammad" delay={base + 0.2} />{" "}
            <motion.span
              aria-hidden="true"
              className="text-gradient inline-block"
              style={{ transformPerspective: 600 }}
              initial={{ opacity: 0, y: 48, rotateX: -80, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: base + 0.9, ease }}
            >
              Zeeshan
            </motion.span>{" "}
            <Letters text="Fayyaz" delay={base + 0.75} />
            <span className="sr-only">{profile.name} - Senior Web Developer in Dubai</span>
          </h1>

          <motion.p {...fadeUp(4)} className="mt-6 text-lg text-muted sm:text-2xl">
            I build <RotatingWords />
          </motion.p>

          <motion.p {...fadeUp(5)} className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Senior Web Developer &amp; Team Lead in Dubai with 8+ years of experience. I build fast, multilingual websites, custom
            Shopify and WordPress themes, trading integrations and automation that saves your team hours.
          </motion.p>

          <motion.div {...fadeUp(6)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
              >
                View projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-muted transition-colors hover:text-fg"
            >
              <Mail className="h-4 w-4" />
              Contact me
            </a>
          </motion.div>

          <motion.div {...fadeUp(7)} className="mt-8 flex items-center gap-3">
            {[
              { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon className="h-[18px] w-[18px]" />, ext: true },
              { href: profile.github, label: "GitHub", icon: <GitHubIcon className="h-[18px] w-[18px]" />, ext: true },
              { href: `mailto:${profile.email}`, label: "Email", icon: <Mail className="h-[18px] w-[18px]" />, ext: false },
            ].map((s) => (
              <Magnetic key={s.label} strength={0.45}>
                <a
                  href={s.href}
                  target={s.ext ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="glass grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:text-accent"
                >
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        {/* live code editor (replaces the old globe) */}
        <motion.div style={{ y: editorY, opacity: editorOpacity }} className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.6, delay: base + 0.8, ease }}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          >
            <CodeEditor />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <FloatChip label="Next.js 16" className="-left-8 -top-5" depth={22} mx={mx} my={my} delay={base + 1.6} />
            <FloatChip label="Salesforce" className="-top-5 right-20" depth={28} mx={mx} my={my} delay={base + 2.2} dot="bg-accent2" />
            <FloatChip label="MT5 / MT4 API" className="-right-4 top-[22%]" depth={34} mx={mx} my={my} delay={base + 1.9} dot="bg-accent3" />
            <FloatChip className="-bottom-5 right-6" depth={30} mx={mx} my={my} delay={base + 2.5} dot="bg-accent3">
              <DubaiTime />
            </FloatChip>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted sm:flex"
      >
        Scroll
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-accent"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="sr-only" />
      </motion.a>
    </section>
  );
}
