"use client";

import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  // reducedMotion="user" turns off movement animations for people who
  // have "reduce motion" enabled in their operating system.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
