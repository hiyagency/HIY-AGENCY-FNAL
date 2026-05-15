"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Circle } from "lucide-react";

const stages = [
  { label: "Design", progress: 100, status: "done" },
  { label: "Build", progress: 78, status: "active" },
  { label: "Launch", progress: 42, status: "queued" },
  { label: "Leads", progress: 24, status: "queued" },
] as const;

export function HeroPipelineCard() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-20 mt-6 w-full rounded-2xl border border-[#7d97ff]/22 bg-[#07102a]/88 p-4 shadow-[0_20px_70px_rgba(36,59,255,0.32)] backdrop-blur-2xl sm:absolute sm:-right-4 sm:bottom-8 sm:mt-0 sm:w-[min(92vw,280px)]"
      animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(158,176,255,0.8),transparent)]"
        animate={reducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#9eb0ff]/72">
        Live system
      </p>
      <p className="mt-1 font-heading text-lg font-semibold text-white">Project pipeline</p>
      <div className="mt-4 flex flex-col gap-3">
        {stages.map((stage, index) => (
          <div key={stage.label}>
            <motion.div
              className="flex items-center justify-between gap-2"
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Circle
                  className={`size-2 fill-current ${
                    stage.status === "done"
                      ? "text-[#9eb0ff]"
                      : stage.status === "active"
                        ? "text-[#76e4ff] animate-pulse"
                        : "text-[#7d97ff]/35"
                  }`}
                />
                <span className="text-sm font-medium text-white">{stage.label}</span>
              </div>
              <span className="text-xs text-[#9eb0ff]/60">{stage.progress}%</span>
            </motion.div>
            <motion.div
              className="mt-2 h-1 overflow-hidden rounded-full bg-[#7d97ff]/12"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.12 + 0.1 }}
            >
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#3f5bff,#76e4ff)]"
                initial={{ width: 0 }}
                animate={{ width: `${stage.progress}%` }}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
