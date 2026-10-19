"use client";

import { motion } from "framer-motion";
import { Bot, Code2, LineChart, Search, Store, Workflow, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import TiltCard from "./TiltCard";
import { WhatsAppIcon } from "./Icons";
import { profile, services } from "@/lib/content";

const icons: Record<string, React.ReactNode> = {
  store: <Store className="h-5 w-5" />,
  code: <Code2 className="h-5 w-5" />,
  chart: <LineChart className="h-5 w-5" />,
  workflow: <Workflow className="h-5 w-5" />,
  search: <Search className="h-5 w-5" />,
  bot: <Bot className="h-5 w-5" />,
};

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        index="02"
        eyebrow="Services"
        title="How I can help"
        text="Whether you need a store that sells, a fast multilingual website, or a trading platform wired to your CRM, this is what I do day to day."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.1}>
            <TiltCard className="flex h-full flex-col p-6" strength={5}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-bg">{icons[s.icon]}</span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.points.map((p) => (
                  <li key={p} className="rounded-full border border-line bg-fg/[0.04] px-2.5 py-1 text-xs text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="glass flex flex-col items-start justify-between gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">Have a project in mind?</h3>
            <p className="mt-1 text-sm text-muted">Tell me what you are building. WhatsApp is the quickest way to reach me, or use the form below.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -3 }}
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#06260f]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </motion.a>
            <a href="#contact" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors hover:border-accent">
              Send a message <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
