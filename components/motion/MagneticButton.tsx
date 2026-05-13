"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

export function MagneticButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  const rotateX = useTransform(springY, [-18, 18], [5, -5]);
  const rotateY = useTransform(springX, [-18, 18], [-5, 5]);

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.24);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.24);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: springX, y: springY, rotateX, rotateY }}>
      <Link
        className={
          variant === "solid"
            ? "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-[#f5f7ff] px-7 text-sm font-bold uppercase tracking-[0.14em] text-[#050505] shadow-[0_0_50px_rgba(63,91,255,0.35)] transition hover:shadow-[0_0_70px_rgba(63,91,255,0.55)]"
            : "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-[#7d97ff]/35 bg-[#07102a]/45 px-7 text-sm font-bold uppercase tracking-[0.14em] text-[#f5f7ff] backdrop-blur-xl transition hover:border-[#9eb0ff]/80 hover:bg-[#1126a4]/30"
        }
        href={href}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
      >
        <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(100deg,transparent,rgba(63,91,255,0.28),transparent)] transition duration-700 group-hover:translate-x-[120%]" />
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}
