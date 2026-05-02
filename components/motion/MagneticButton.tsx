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
            ? "inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#d8d8d8]"
            : "inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black"
        }
        href={href}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
      >
        {children}
      </Link>
    </motion.div>
  );
}
