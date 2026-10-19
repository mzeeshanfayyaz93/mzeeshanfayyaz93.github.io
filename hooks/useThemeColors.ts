"use client";

import { useEffect, useState } from "react";

export type ThemeName = "dark" | "gray" | "light";

export type ThemeColors = {
  theme: ThemeName;
  accent: string;
  accent2: string;
  accent3: string;
  bg: string;
};

const fallback: ThemeColors = {
  theme: "dark",
  accent: "#5eead4",
  accent2: "#818cf8",
  accent3: "#f472b6",
  bg: "#05070d",
};

function read(): ThemeColors {
  const root = document.documentElement;
  const css = getComputedStyle(root);
  const get = (name: string, fb: string) => css.getPropertyValue(name).trim() || fb;
  const t = root.getAttribute("data-theme");
  const theme: ThemeName = t === "light" || t === "gray" ? t : "dark";
  return {
    theme,
    accent: get("--accent", fallback.accent),
    accent2: get("--accent-2", fallback.accent2),
    accent3: get("--accent-3", fallback.accent3),
    bg: get("--bg", fallback.bg),
  };
}

/** Reads the current theme colours from CSS variables and updates when the theme changes. */
export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(fallback);

  useEffect(() => {
    setColors(read());
    const observer = new MutationObserver(() => setColors(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}
