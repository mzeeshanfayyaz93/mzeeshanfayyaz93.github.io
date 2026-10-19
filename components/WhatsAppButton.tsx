"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { profile } from "@/lib/content";

/** Floating WhatsApp chat button, bottom right. Appears a moment after the page opens, with a soft pulse. */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  // Say hello once, then get out of the way.
  useEffect(() => {
    if (!show) return;
    const open = window.setTimeout(() => setTip(true), 2500);
    const close = window.setTimeout(() => setTip(false), 9000);
    return () => {
      window.clearTimeout(open);
      window.clearTimeout(close);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-4 right-4 z-[55] flex items-center gap-3 sm:bottom-6 sm:right-6"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence>
            {tip && (
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.7 }}
                className="glass hidden whitespace-nowrap rounded-full px-4 py-2 text-sm shadow-lg sm:block"
              >
                Questions? Chat with me on WhatsApp
              </motion.span>
            )}
          </AnimatePresence>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Zeeshan on WhatsApp (opens in a new tab)"
            title="Chat on WhatsApp"
            onFocus={() => setTip(true)}
            onMouseEnter={() => setTip(true)}
            onMouseLeave={() => setTip(false)}
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] sm:h-16 sm:w-16 text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.7)] transition-transform duration-500 hover:scale-110 focus-visible:scale-110"
          >
            {[0, 1, 2].map((k) => (
              <span key={k} className="wa-ring absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
            ))}
            <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
