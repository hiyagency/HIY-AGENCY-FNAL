"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (window.location.search.includes("skipIntro=1")) {
      sessionStorage.setItem("hiy-intro-seen", "true");
      return;
    }

    const hasSeenIntro = sessionStorage.getItem("hiy-intro-seen");
    if (hasSeenIntro) {
      return;
    }

    const startTimer = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("hiy-intro-seen", "true");
      setVisible(false);
    }, 1800);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  function skipIntro() {
    sessionStorage.setItem("hiy-intro-seen", "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#050505] text-[#f5f7ff]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <button
            className="absolute right-5 top-5 rounded-full border border-[#7d97ff]/25 bg-[#07102a]/55 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70 backdrop-blur transition hover:border-[#9eb0ff]/70 hover:text-white"
            onClick={skipIntro}
            type="button"
          >
            Skip
          </button>
          <div className="absolute -left-[12vw] top-[-18vh] h-[60vh] w-[70vw] bg-[radial-gradient(ellipse_at_center,rgba(36,59,255,0.56),transparent_70%)] blur-3xl" />
          <div className="relative text-center">
            <motion.p
              className="blue-text font-heading text-[clamp(4rem,14vw,12rem)] font-black leading-none tracking-normal"
              initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              HIY
            </motion.p>
            <motion.p
              className="mt-5 text-sm uppercase tracking-[0.45em] text-[#9eb0ff]/80"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              Infrastructure for high-impact growth.
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

