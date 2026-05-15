"use client";

import { motion, useReducedMotion } from "framer-motion";

type ShippedProjectsMarqueeProps = {
  projects: string[];
};

function ProjectPill({ name }: { name: string }) {
  return (
    <span className="group relative shrink-0">
      <span className="absolute -inset-px rounded-[1.35rem] bg-[linear-gradient(120deg,rgba(63,91,255,0.55),rgba(118,228,255,0.2),rgba(63,91,255,0.45))] opacity-60 blur-[1px] transition duration-500 group-hover:opacity-100" />
      <span className="relative inline-flex items-center rounded-[1.35rem] border border-[#7d97ff]/22 bg-[#07102a]/72 px-5 py-3 font-heading text-[clamp(1.05rem,2.8vw,2.1rem)] font-bold tracking-normal text-[#eef1ff] shadow-[0_0_32px_rgba(63,91,255,0.14)] backdrop-blur-md transition duration-500 group-hover:border-[#9eb0ff]/50 group-hover:text-white sm:px-7 sm:py-4">
        {name}
      </span>
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`shipped-marquee-track flex w-max gap-4 sm:gap-6 ${reverse ? "shipped-marquee-reverse" : ""}`}
      >
        {[0, 1].map((group) => (
          <div className="flex items-center gap-4 sm:gap-6" key={group}>
            {items.flatMap((name) => [
              <ProjectPill key={`${group}-${name}-pill`} name={name} />,
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-[#9eb0ff]/40"
                key={`${group}-${name}-dot`}
              />,
            ])}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,#05070d,transparent)] sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,#05070d,transparent)] sm:w-28" />
    </div>
  );
}

export function ShippedProjectsMarquee({ projects }: ShippedProjectsMarqueeProps) {
  const items = projects.length > 0 ? projects : ["HIY Agency"];
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative z-10 overflow-hidden border-y border-[#7d97ff]/14 bg-[linear-gradient(180deg,#05070d_0%,#07102a_52%,#05070d_100%)] py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.18),transparent_65%)]" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(92vw,56rem)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(158,176,255,0.75),transparent)]"
        animate={reducedMotion ? undefined : { opacity: [0.35, 1, 0.35], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#9eb0ff]/58 sm:text-xs">
          Shipped systems
        </p>
        <h2 className="font-heading mx-auto mt-3 max-w-3xl text-center text-[clamp(1.65rem,4.2vw,3.2rem)] font-black leading-[0.94] tracking-normal text-white">
          Projects flowing from build to launch.
        </h2>
      </div>

      <div className="relative mt-8 space-y-3 sm:mt-10">
        <MarqueeRow items={items} />
        <MarqueeRow items={[...items].reverse()} reverse />
      </div>
    </section>
  );
}
