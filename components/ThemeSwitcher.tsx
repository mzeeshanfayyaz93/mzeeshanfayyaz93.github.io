"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Contrast, Moon, Sun } from "lucide-react";
import type { ThemeName } from "@/hooks/useThemeColors";

const options: { value: ThemeName; label: string; Icon: typeof Sun }[] = [
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "gray", label: "Gray", Icon: Contrast },
  { value: "light", label: "Light", Icon: Sun },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "gray" || current === "light" || current === "dark") setTheme(current);
  }, []);

  function choose(next: ThemeName) {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be blocked; the theme still changes for this visit */
    }
    setTheme(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 600);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="glass relative flex items-center gap-0.5 rounded-full p-1"
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => choose(value)}
            className="relative grid h-8 w-8 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-fg/12"
                style={{ boxShadow: "0 0 0 1px var(--border) inset, 0 4px 18px -4px var(--glow)" }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <Icon
              className={`relative h-4 w-4 transition-colors ${active ? "text-accent" : "text-muted"}`}
              strokeWidth={2}
            />
          </button>
        );
      })}
    </div>
  );
}
