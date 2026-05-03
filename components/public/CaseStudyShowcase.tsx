"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PublicCaseStudy } from "@/lib/data";

export function CaseStudyShowcase({ caseStudies }: { caseStudies: PublicCaseStudy[]; compact?: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const marqueeItems = useMemo(() => {
    if (caseStudies.length === 0) return [];
    return [...caseStudies, ...caseStudies];
  }, [caseStudies]);

=======
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PublicCaseStudy } from "@/lib/data";

export function CaseStudyShowcase({
  caseStudies,
}: {
  caseStudies: PublicCaseStudy[];
  compact?: boolean;
}) {
 dde15c3 (Fix case study media layout and duplicate entries)
  if (caseStudies.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-white/15 bg-[#050505] p-8">
        <h3 className="text-2xl font-semibold tracking-normal">Selected Work</h3>
        <p className="mt-3 text-white/65">Case studies are being prepared. New work will be added soon.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-[0.95] tracking-normal">Selected Work</h3>
          <p className="mt-3 max-w-2xl text-white/62">A curated look at projects built to improve clarity, conversion, and growth.</p>
        </div>
      </div>

<<<<<<< HEAD
      <div className="marquee-shell mt-10">
        <div className="marquee-row">
          {marqueeItems.map((study, index) => {
            const shortDescription = study.problem || "Project details will be updated soon.";
            const fullDescription = study.solution || "More details coming soon.";
            const mediaKey = `${study.id}-${index}`;

            return (
              <article className="work-card" key={mediaKey}>
                <div className="flex h-full flex-col">
                  <div className="p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{study.clientName}</p>
                    <h4 className="mt-3 text-2xl font-semibold leading-tight tracking-normal">{study.title}</h4>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/55">{study.service}</p>
                    <p className="mt-4 text-sm leading-7 text-white/70">{shortDescription}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:bg-white/85"
                        href={study.href || "/contact"}
                      >
                        View Project
                        <ArrowUpRight className="size-4" />
                      </Link>
                      <button
                        className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition hover:border-white hover:text-white"
                        onClick={() => setExpandedId(expandedId === mediaKey ? null : mediaKey)}
                        type="button"
                      >
                        Read More
                      </button>
                    </div>

                    {expandedId === mediaKey ? (
                      <div className="mt-5 rounded-xl border border-white/15 bg-white/[0.03] p-4 text-sm leading-7 text-white/74">
                        {fullDescription}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-auto border-t border-white/10 bg-black p-4 sm:p-5">
                    <div className="media-frame">
                      {study.videoUrl ? (
                        <video
                          className="h-full w-full object-cover"
                          controls
                          playsInline
                          poster={study.posterUrl || study.imageUrl || undefined}
                          preload="metadata"
                          src={study.videoUrl}
                        />
                      ) : study.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt={`${study.clientName} project`} className="h-full w-full object-cover" loading="lazy" src={study.imageUrl} />
                      ) : (
                        <div className="grid h-full place-items-center bg-[#0f0f0f] text-center text-sm text-white/50">
                          Media coming soon
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .marquee-shell {
          width: 100%;
          overflow: hidden;
        }
        .marquee-row {
          display: flex;
          width: max-content;
          gap: 1rem;
          animation: work-marquee 46s linear infinite;
          will-change: transform;
          padding-right: 1rem;
        }
        .marquee-shell:hover .marquee-row {
          animation-play-state: paused;
        }
        .work-card {
          width: clamp(280px, 84vw, 360px);
          flex: 0 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 1.2rem;
          background: #050505;
          overflow: hidden;
        }
        .media-frame {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0.8rem;
          overflow: hidden;
          background: #0a0a0a;
        }
        @media (min-width: 1024px) {
          .work-card {
            width: clamp(360px, 34vw, 520px);
          }
        }
        @keyframes work-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
=======
  const animatedStudies = caseStudies.length > 1 ? [...caseStudies, ...caseStudies] : caseStudies;

  return (
    <section className="-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="case-study-track flex w-max gap-5 overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {animatedStudies.map((study, index) => (
          <CaseStudyCard
            clone={index >= caseStudies.length}
            key={`${study.id}-${index}`}
            ordinal={(index % caseStudies.length) + 1}
            study={study}
          />
        ))}
      </div>

      <style jsx>{`
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .case-study-track {
            animation: case-study-marquee 48s linear infinite;
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
>>>>>>> dde15c3 (Fix case study media layout and duplicate entries)
          }
        }
      `}</style>
    </section>
  );
}
<<<<<<< HEAD
=======

function CaseStudyCard({
  study,
  ordinal,
  clone,
}: {
  study: PublicCaseStudy;
  ordinal: number;
  clone: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      aria-hidden={clone || undefined}
      className="flex min-w-[86vw] max-w-[86vw] shrink-0 snap-center flex-col rounded-[1.8rem] border border-white/10 bg-[#080808] p-4 sm:min-w-[520px] sm:max-w-[520px] lg:min-w-[620px] lg:max-w-[620px]"
    >
      <div className="flex min-w-0 flex-1 flex-col rounded-[1.4rem] border border-white/10 bg-black p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/48">
            {study.service}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black">
            {String(ordinal).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.24em] text-white/34">
          {study.clientName}
        </p>
        <h3 className="mt-3 text-[clamp(2rem,8vw,3.7rem)] font-black leading-[0.94] tracking-normal">
          {study.title}
        </h3>

        <p className="mt-5 break-words text-base leading-7 text-white/58">{study.problem}</p>

        {expanded ? (
          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/34">Full case study</p>
            <p className="mt-3 break-words leading-7 text-white/62">{study.solution}</p>
            {study.result ? (
              <p className="mt-4 rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold leading-6 text-white/78">
                {study.result}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#d8d8d8]"
            href={study.href}
            tabIndex={clone ? -1 : undefined}
          >
            {study.ctaLabel || "View Project"}
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:text-white"
            onClick={() => setExpanded((current) => !current)}
            tabIndex={clone ? -1 : undefined}
            type="button"
          >
            {expanded ? "Hide Full Case Study" : "View Full Case Study"}
          </button>
        </div>
      </div>

      <CaseStudyImage study={study} />
    </article>
  );
}

function CaseStudyImage({ study }: { study: PublicCaseStudy }) {
  return (
    <div className="mt-4 aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050505] sm:aspect-[16/10] lg:aspect-video">
      {study.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${study.clientName} case study`}
          className="h-full w-full object-cover"
          height={720}
          loading="lazy"
          src={study.imageUrl}
          width={1280}
        />
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#1c1c1c,#050505_58%,#000)]">
          <div className="px-6 text-center">
            <p className="text-5xl font-black tracking-normal text-white/70">
              {study.clientName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 3)}
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/38">
              Case study image coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
>>>>>>> dde15c3 (Fix case study media layout and duplicate entries)
