"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";
import { profile } from "@/lib/content";
import { siteSections } from "@/lib/site-sections";

const links = siteSections.map(({ id, label }) => ({ id, label }));

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`mx-auto mt-3 max-w-6xl px-4 transition-all duration-300 ${scrolled ? "" : "sm:mt-5"}`}>
        <nav
          className={`glass flex items-center justify-between rounded-2xl px-4 py-2.5 transition-shadow duration-300 ${
            scrolled ? "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]" : ""
          }`}
          aria-label="Main"
        >
          <a href="#top" aria-label={`${profile.name}, back to top`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === l.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-fg/8"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button
              type="button"
              className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 flex flex-col rounded-2xl p-2 md:hidden"
            >
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base ${active === l.id ? "bg-fg/8 text-fg" : "text-muted"}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
