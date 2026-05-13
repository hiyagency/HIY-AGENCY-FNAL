"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function AmbientBackground() {
  const x = useMotionValue(50);
  const y = useMotionValue(30);
  const prefersReducedMotion = useReducedMotion();
  const cursorLight = useMotionTemplate`radial-gradient(420px circle at ${x}% ${y}%, rgba(63,91,255,0.20), transparent 62%)`;

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      x.set((event.clientX / window.innerWidth) * 100);
      y.set((event.clientY / window.innerHeight) * 100);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion, x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: cursorLight }} />
      <motion.div
        className="absolute -left-[12vw] top-[-18vh] h-[62vh] w-[72vw] bg-[radial-gradient(ellipse_at_center,rgba(36,59,255,0.54),rgba(36,59,255,0.18)_38%,transparent_70%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 38, -12, 0], y: [0, 26, 4, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-24vw] top-[10vh] h-[84vh] w-[70vw] bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.28),rgba(9,19,83,0.20)_42%,transparent_72%)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, -34, 16, 0], y: [0, 20, -18, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(63,91,255,0.08)_1px,transparent_1px),linear-gradient(rgba(63,91,255,0.07)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(63,91,255,0.08)_22%,transparent_42%,rgba(245,247,255,0.05)_58%,transparent_76%)] opacity-70" />
      <div className="absolute inset-0 ambient-noise opacity-[0.08]" />
    </div>
  );
}
