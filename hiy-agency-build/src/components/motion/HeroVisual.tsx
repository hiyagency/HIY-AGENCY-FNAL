"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bell, CheckCircle2, MousePointer2, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Leads", value: "128", delta: "+32%" },
  { label: "ROAS", value: "4.8x", delta: "+18%" },
  { label: "Tasks", value: "24", delta: "Live" },
];

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[560px] perspective-dramatic">
      <motion.div
        className="absolute -left-4 top-12 hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-2xl backdrop-blur md:block"
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/50">
          <Bell className="size-4" />
          Lead captured
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Website project</p>
        <p className="mt-1 text-sm text-white/55">Budget: ₹50,000 - ₹1,00,000</p>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#111111] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        animate={reducedMotion ? undefined : { rotateX: [0, 2, 0], rotateY: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.08),transparent_34%)]" />
        <div className="relative rounded-[1.4rem] border border-white/10 bg-black/65 p-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-white/45">Agency OS</p>
              <p className="mt-2 text-xl font-semibold text-white">Growth command center</p>
            </div>
            <div className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60">
              Live
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                key={metric.label}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{metric.label}</p>
                <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
                <p className="mt-2 text-xs text-white/55">{metric.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Campaign pulse</p>
                <TrendingUp className="size-4 text-white/60" />
              </div>
              <div className="mt-8 flex h-32 items-end gap-2">
                {[34, 58, 44, 76, 64, 92, 82, 100].map((height, index) => (
                  <motion.div
                    className="flex-1 rounded-t bg-white"
                    initial={{ height: 12 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.07, duration: 0.7 }}
                    key={height}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-medium text-white">Launch checklist</p>
              <div className="mt-5 flex flex-col gap-3">
                {["Domain", "Forms", "Tracking", "WhatsApp CTA"].map((item) => (
                  <div className="flex items-center gap-3 text-sm text-white/70" key={item}>
                    <CheckCircle2 className="size-4 text-white" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 right-0 hidden rounded-2xl border border-white/15 bg-white p-4 text-black shadow-2xl md:block"
        animate={reducedMotion ? undefined : { y: [0, 12, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-black/50">
          <MousePointer2 className="size-4" />
          Conversion path
        </div>
        <p className="mt-2 text-lg font-semibold">CTA - Form - CRM</p>
      </motion.div>
    </div>
  );
}
