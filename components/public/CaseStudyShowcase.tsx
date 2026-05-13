"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Maximize2, Sparkles } from "lucide-react";
import type { PublicCaseStudy } from "@/lib/data";

export function CaseStudyShowcase({
  caseStudies,
}: {
  caseStudies: PublicCaseStudy[];
  compact?: boolean;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const animatedStudies = useMemo(() => {
    if (caseStudies.length === 0) return [];
    return caseStudies.length > 1 ? [...caseStudies, ...caseStudies] : caseStudies;
  }, [caseStudies]);

  if (caseStudies.length === 0) {
    return (
      <div className="glass-panel rounded-[1.6rem] p-8">
        <Sparkles className="size-8 text-[#9eb0ff]" />
        <h3 className="font-heading mt-6 text-3xl font-semibold tracking-normal">Selected Work</h3>
        <p className="mt-3 max-w-2xl text-[#c7d1ff]/65">
          Case studies are being prepared. New systems and launch stories will be added soon.
        </p>
      </div>
    );
  }

  return (
    <section className="-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="case-study-track flex w-max gap-5 overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {animatedStudies.map((study, index) => {
          const mediaKey = `${study.id}-${index}`;
          return (
            <CaseStudyCard
              active={activeId === mediaKey}
              clone={index >= caseStudies.length}
              key={mediaKey}
              onToggle={() => setActiveId(activeId === mediaKey ? null : mediaKey)}
              ordinal={(index % caseStudies.length) + 1}
              study={study}
            />
          );
        })}
      </div>

      <style jsx>{`
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .case-study-track {
            animation: case-study-marquee 54s linear infinite;
          }

          .case-study-track:hover {
            animation-play-state: paused;
          }
        }

        @media (max-width: 1023px), (prefers-reduced-motion: reduce) {
          .case-study-track {
            width: 100%;
            scroll-snap-type: x mandatory;
          }
        }

        @keyframes case-study-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}

function CaseStudyCard({
  study,
  ordinal,
  clone,
  active,
  onToggle,
}: {
  study: PublicCaseStudy;
  ordinal: number;
  clone: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      aria-hidden={clone || undefined}
      className="group relative flex min-w-[88vw] max-w-[88vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.9rem] border border-[#7d97ff]/16 bg-[#05070d]/82 p-4 shadow-[0_34px_120px_rgba(0,12,90,0.28)] transition duration-500 hover:border-[#7d97ff]/48 hover:shadow-[0_34px_140px_rgba(36,59,255,0.30)] sm:min-w-[540px] sm:max-w-[540px] lg:min-w-[680px] lg:max-w-[680px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(63,91,255,0.28),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <CaseStudyImage study={study} />

      <div className="relative mt-4 flex min-w-0 flex-1 flex-col rounded-[1.35rem] border border-[#7d97ff]/14 bg-[#050505]/58 p-5 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#7d97ff]/18 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#9eb0ff]/68">
            {study.service}
          </span>
          <span className="rounded-full bg-[#f5f7ff] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#050505]">
            {String(ordinal).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/48">
          {study.clientName}
        </p>
        <h3 className="font-heading mt-3 text-[clamp(2rem,8vw,3.8rem)] font-black leading-[0.9] tracking-normal">
          {study.title}
        </h3>

        <p className="mt-5 break-words text-base leading-7 text-[#c7d1ff]/60">{study.problem}</p>

        {active ? (
          <div className="mt-5 border-t border-[#7d97ff]/14 pt-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#9eb0ff]/52">System preview</p>
            <p className="mt-3 break-words leading-7 text-[#c7d1ff]/64">{study.solution}</p>
            {study.result ? (
              <p className="mt-4 rounded-[1rem] border border-[#7d97ff]/16 bg-[#3f5bff]/10 p-4 text-sm font-semibold leading-6 text-[#f5f7ff]/86">
                {study.result}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#f5f7ff] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#050505] transition hover:shadow-[0_0_44px_rgba(63,91,255,0.48)]"
            href={study.href}
            tabIndex={clone ? -1 : undefined}
          >
            {study.ctaLabel || "View Project"}
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#7d97ff]/20 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#c7d1ff]/76 transition hover:border-[#9eb0ff]/70 hover:text-white"
            onClick={onToggle}
            tabIndex={clone ? -1 : undefined}
            type="button"
          >
            <Maximize2 className="size-4" />
            {active ? "Collapse" : "Preview"}
          </button>
        </div>
      </div>
    </article>
  );
}

function CaseStudyImage({ study }: { study: PublicCaseStudy }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] border border-[#7d97ff]/14 bg-[#050505] sm:aspect-[16/10] lg:aspect-video">
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_40%,rgba(5,5,5,0.72))]" />
      {study.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${study.clientName} case study`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          height={720}
          loading="lazy"
          src={study.imageUrl}
          width={1280}
        />
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(63,91,255,0.56),#050505_58%,#000)]">
          <div className="px-6 text-center">
            <p className="font-heading text-6xl font-black tracking-normal text-white/78">
              {study.clientName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 3)}
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.24em] text-[#c7d1ff]/52">
              Preview coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
