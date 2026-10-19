"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import Magnetic from "./Magnetic";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./Icons";
import { profile } from "@/lib/content";
import { WaveText, copyText, mailtoUrl } from "./ui";

/** Spotlight form. The border glows where your cursor is, labels float, the button animates through sending and sent. */
const links = [
  { href: `mailto:${profile.email}`, label: "Email", value: profile.email, icon: <Mail className="h-5 w-5" /> },
  { href: profile.whatsapp, label: "WhatsApp", value: profile.phone, icon: <WhatsAppIcon className="h-5 w-5" /> },
  { href: profile.linkedin, label: "LinkedIn", value: "muhammad-zeeshan-fayyaz993", icon: <LinkedInIcon className="h-5 w-5" /> },
  { href: profile.github, label: "GitHub", value: "mzeeshanfayyaz93", icon: <GitHubIcon className="h-5 w-5" /> },
];

const field =
  "peer w-full rounded-xl border border-line bg-fg/[0.04] px-4 pb-2 pt-6 text-sm outline-none transition-colors placeholder-transparent focus:border-accent focus:bg-fg/[0.06]";
const label =
  "pointer-events-none absolute left-4 top-2 text-[11px] uppercase tracking-widest text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-accent";

export default function Contact() {
  const box = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [vals, setVals] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = box.current?.getBoundingClientRect();
    if (!r || !box.current) return;
    box.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    box.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => {
      window.location.href = mailtoUrl(profile.email, vals.name, vals.email, vals.message);
      setStatus("sent");
    }, 900);
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--accent-2)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] bottom-0 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--accent)" }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      </div>

      <div className="relative">
        <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span>08</span>
          <span className="h-px w-10 bg-accent/60" />
          <span>Contact</span>
        </div>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <WaveText text="Let's build" />
          <br />
          <WaveText text="something" className="text-gradient" />
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">Have a project, a role or just a question? Fill in the form, or message me on WhatsApp for the quickest reply.</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={i * 0.06}>
                <Magnetic strength={0.12} className="block">
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="glass group flex items-center justify-between rounded-2xl p-4 transition-colors hover:border-accent"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-bg transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                        {l.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-widest text-muted">{l.label}</span>
                        <span className="block truncate text-sm font-medium">{l.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </Magnetic>
              </Reveal>
            ))}
            <div className="flex items-center gap-2 px-1 pt-1 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" /> {profile.location}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div
              ref={box}
              onPointerMove={onMove}
              className="rounded-3xl p-[1.5px]"
              style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), var(--accent), var(--accent-2) 40%, var(--border) 70%)" }}
            >
              <div className="min-h-[420px] rounded-[calc(1.5rem-1.5px)] bg-soft p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {status !== "sent" ? (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      className="space-y-4"
                      exit={{ opacity: 0, y: -12 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="relative">
                          <input id="ca-name" name="name" required placeholder=" " value={vals.name} onChange={set("name")} className={field} autoComplete="name" />
                          <label htmlFor="ca-name" className={label}>Name</label>
                        </div>
                        <div className="relative">
                          <input id="ca-email" name="email" type="email" required placeholder=" " value={vals.email} onChange={set("email")} className={field} autoComplete="email" />
                          <label htmlFor="ca-email" className={label}>Email</label>
                        </div>
                      </div>
                      <div className="relative">
                        <textarea id="ca-msg" name="message" required rows={6} placeholder=" " value={vals.message} onChange={set("message")} className={`${field} resize-none`} />
                        <label htmlFor="ca-msg" className={label}>Tell me about your project</label>
                      </div>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-primary group relative inline-flex min-w-[10.5rem] items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-80"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {status === "sending" ? (
                            <motion.span key="s" className="flex items-center gap-2" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
                              <Loader2 className="h-4 w-4 animate-spin" /> Sending
                            </motion.span>
                          ) : (
                            <motion.span key="i" className="flex items-center gap-2" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
                              Send message <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="sent" className="flex min-h-[360px] flex-col items-center justify-center text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden="true">
                        <motion.circle cx="26" cy="26" r="23" fill="none" stroke="var(--accent)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                        <motion.path d="M15 27 l8 8 l15 -17" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5 }} />
                      </svg>
                      <h3 className="mt-5 font-display text-2xl font-semibold">Your message is ready</h3>
                      <p className="mt-2 max-w-sm text-sm text-muted">Your email app should open with everything filled in. If it does not, use Copy message and send it to {profile.email}.</p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            setCopied(await copyText(`To: ${profile.email}\n\n${vals.message}\n\n— ${vals.name} (${vals.email})`));
                            window.setTimeout(() => setCopied(false), 1800);
                          }}
                          className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm hover:border-accent"
                        >
                          {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy message"}
                        </button>
                        <button type="button" onClick={() => setStatus("idle")} className="rounded-full px-5 py-2.5 text-sm text-muted hover:text-fg">
                          Write another
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
