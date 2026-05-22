import type { CSSProperties } from "react";

type ShippedProjectsMarqueeProps = {
  projects: string[];
};

const requiredProjects = [
  "Financial Investment Group",
  "Sonam Creation",
  "Desi Jayka",
  "Kidzee",
  "Kinetic Green",
  "Vilasa International",
  "Hotel Vijayshree",
];

function ProjectPill({ name }: { name: string }) {
  return (
    <span className="group relative shrink-0">
      <span className="absolute -inset-px rounded-[1.15rem] bg-[linear-gradient(120deg,rgba(63,91,255,0.42),rgba(118,228,255,0.14),rgba(63,91,255,0.30))] opacity-70 sm:rounded-[1.35rem]" />
      <span className="relative inline-flex items-center rounded-[1.15rem] border border-[#7d97ff]/22 bg-[#07102a]/86 px-4 py-2.5 font-heading text-lg font-bold tracking-normal text-[#eef1ff] transition-colors duration-300 group-hover:border-[#9eb0ff]/50 group-hover:text-white sm:rounded-[1.35rem] sm:px-7 sm:py-4 sm:text-[clamp(1.35rem,2.8vw,2.1rem)]">
        {name}
      </span>
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = "48s",
}: {
  items: string[];
  reverse?: boolean;
  duration?: string;
}) {
  return (
    <div className="relative overflow-hidden py-1.5 sm:py-2">
      <div
        className={`shipped-marquee-track flex w-max ${reverse ? "shipped-marquee-reverse" : ""}`}
        style={{
          "--marquee-duration": duration,
          "--marquee-mobile-duration": reverse ? "82s" : "76s",
        } as CSSProperties}
      >
        {[0, 1].map((group) => (
          <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-6 sm:pr-6" key={group}>
            {items.map((name) => (
              <span className="flex shrink-0 items-center gap-3 sm:gap-6" key={`${group}-${name}`}>
                <ProjectPill name={name} />
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-[#9eb0ff]/36"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-[linear-gradient(90deg,#05070d,transparent)] sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-[linear-gradient(270deg,#05070d,transparent)] sm:w-28" />
    </div>
  );
}

export function ShippedProjectsMarquee({ projects }: ShippedProjectsMarqueeProps) {
  const items = Array.from(
    new Set([...projects.filter(Boolean), ...requiredProjects]),
  );

  return (
    <section className="relative z-10 overflow-hidden border-y border-[#7d97ff]/14 bg-[linear-gradient(180deg,#05070d_0%,#07102a_52%,#05070d_100%)] py-9 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(92vw,56rem)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(158,176,255,0.75),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#9eb0ff]/58 sm:text-xs">
          Shipped systems
        </p>
        <h2 className="font-heading mx-auto mt-3 max-w-3xl text-center text-[clamp(1.75rem,4.2vw,3.2rem)] font-black leading-[0.94] tracking-normal text-white">
          Projects flowing from build to launch.
        </h2>
      </div>

      <div className="relative mt-7 space-y-2 sm:mt-10 sm:space-y-3">
        <MarqueeRow duration="58s" items={items} />
        <MarqueeRow duration="64s" items={[...items].reverse()} reverse />
      </div>
    </section>
  );
}
