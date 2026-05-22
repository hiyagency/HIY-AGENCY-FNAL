"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Bot, CheckCircle2, DatabaseZap, MousePointer2, TrendingUp } from "lucide-react";
import { HeroPipelineCard } from "@/components/motion/HeroPipelineCard";

const metrics = [
  { label: "Leads routed", value: "128", delta: "+32%", icon: Activity },
  { label: "ROAS lift", value: "4.8x", delta: "+18%", icon: TrendingUp },
  { label: "Automations", value: "24", delta: "Live", icon: Bot },
];

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[620px] perspective-dramatic">
      <div
        className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.34),transparent_68%)] blur-3xl sm:-inset-10"
      />

      <div className="absolute -left-2 top-10 z-10 hidden rounded-3xl border border-[#7d97ff]/20 bg-[#07102a]/82 p-4 text-white shadow-[0_20px_60px_rgba(36,59,255,0.24)] md:block">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#9eb0ff]/72">
          <DatabaseZap className="size-4" />
          Lead pipeline
        </div>
        <p className="mt-3 font-heading text-2xl font-semibold tracking-tight">AI qualified</p>
        <p className="mt-1 text-sm text-[#c7d1ff]/58">Website - CRM - WhatsApp</p>
      </div>

      <motion.div
        className="relative hidden overflow-hidden rounded-[2rem] border border-[#7d97ff]/20 bg-[#05070d]/88 p-4 shadow-[0_28px_90px_rgba(0,16,124,0.26)] sm:block"
        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(63,91,255,0.40),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(118,228,255,0.14),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(245,247,255,0.10),transparent_56%)] opacity-70" />
        <div className="relative rounded-[1.45rem] border border-[#7d97ff]/18 bg-[#050505]/72 p-4">
          <div className="flex items-center justify-between border-b border-[#7d97ff]/14 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#9eb0ff]/64">HIY Infrastructure</p>
              <p className="mt-2 font-heading text-xl font-semibold text-white">Growth command layer</p>
            </div>
            <div className="rounded-full border border-[#7d97ff]/25 bg-[#3f5bff]/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#c7d1ff]/78">
              Live
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  className="group rounded-2xl border border-[#7d97ff]/14 bg-[#07102a]/58 p-4 transition-colors duration-300 hover:border-[#7d97ff]/40 hover:bg-[#10246d]/42"
                  key={metric.label}
                >
                  <Icon className="size-4 text-[#9eb0ff]" />
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#c7d1ff]/48">{metric.label}</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs text-[#9eb0ff]/70">{metric.delta}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-[#7d97ff]/14 bg-[#07102a]/44 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Campaign signal</p>
                <TrendingUp className="size-4 text-[#9eb0ff]" />
              </div>
              <div className="mt-8 flex h-32 items-end gap-2">
                {[34, 58, 44, 76, 64, 92, 82, 100].map((height, index) => (
                  <div className="flex h-full flex-1 items-end" key={height}>
                    <motion.div
                      className="w-full origin-bottom rounded-t bg-[linear-gradient(180deg,#f5f7ff,#3f5bff_55%,#1426a4)] shadow-[0_0_24px_rgba(63,91,255,0.28)]"
                      initial={{ scaleY: 0.15, opacity: 0.6 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[#7d97ff]/14 bg-[#07102a]/44 p-4">
              <p className="text-sm font-medium text-white">Launch stack</p>
              <div className="mt-5 flex flex-col gap-3">
                {["Website", "AI flows", "Tracking", "CRM"].map((item) => (
                  <div className="flex items-center gap-3 text-sm text-[#c7d1ff]/70" key={item}>
                    <CheckCircle2 className="size-4 text-[#9eb0ff]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <HeroPipelineCard />

      <div className="absolute -bottom-4 right-0 z-10 hidden rounded-3xl border border-[#7d97ff]/25 bg-[#f5f7ff] p-4 text-[#050505] shadow-[0_20px_60px_rgba(63,91,255,0.22)] md:block">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#243bff]/70">
          <MousePointer2 className="size-4" />
          Conversion path
        </div>
        <p className="mt-2 font-heading text-lg font-semibold">Traffic - Trust - Revenue</p>
      </div>
    </div>
  );
}
