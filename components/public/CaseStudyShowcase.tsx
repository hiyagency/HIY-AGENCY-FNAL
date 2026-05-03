"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { PublicCaseStudy } from "@/lib/data";

export function CaseStudyShowcase({
  caseStudies,
  compact = false,
}: {
  caseStudies: PublicCaseStudy[];
  compact?: boolean;
}) {
  if (caseStudies.length === 0) {
    return (
      <div className="grid min-h-80 place-items-center rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-8 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-white/35">Case studies</p>
          <p className="mt-5 max-w-xl text-4xl font-semibold tracking-normal">
            Case studies are being prepared. New work will be added soon.
          </p>
        </div>
      </div>
    );
  }

  const marqueeStudies = caseStudies.length > 1 ? [...caseStudies, ...caseStudies] : caseStudies;

  return (
    <div className="case-study-strip -mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="case-study-track flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] motion-safe:lg:animate-[case-study-marquee_42s_linear_infinite] hover:lg:[animation-play-state:paused] [&::-webkit-scrollbar]:hidden">
        {marqueeStudies.map((study, index) => (
          <CaseStudyCard
            compact={compact}
            key={`${study.id}-${index}`}
            ordinal={(index % caseStudies.length) + 1}
            study={study}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes case-study-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 1023px) {
          .case-study-track {
            animation: none;
            scroll-snap-type: x mandatory;
          }
        }
      `}</style>
    </div>
  );
}

function CaseStudyCard({
  study,
  ordinal,
  compact,
}: {
  study: PublicCaseStudy;
  ordinal: number;
  compact: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`case-study-card flex min-w-[86vw] max-w-[86vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#080808] p-4 sm:min-w-[520px] sm:max-w-[520px] sm:p-5 lg:min-w-[620px] lg:max-w-[620px] ${
        compact ? "lg:min-h-[620px]" : "lg:min-h-[680px]"
      }`}
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
          >
            {study.ctaLabel || "View Project"}
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:text-white"
            onClick={() => setExpanded((current) => !current)}
            type="button"
          >
            {expanded ? "Hide Full Case Study" : "View Full Case Study"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <CaseStudyMedia study={study} />
      </div>
    </article>
  );
}

function CaseStudyMedia({ study }: { study: PublicCaseStudy }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "480px 0px", threshold: 0.05 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="aspect-video w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050505]"
    >
      {study.hasVideo && shouldLoad ? (
        <video
          aria-label={`${study.title} case study video`}
          className="h-full w-full object-contain"
          controls
          playsInline
          poster={study.posterUrl || undefined}
          preload="metadata"
          ref={videoRef}
          src={study.videoUrl}
        />
      ) : study.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${study.clientName} case study`}
          className="h-full w-full object-cover grayscale"
          loading="lazy"
          src={study.imageUrl}
        />
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#1c1c1c,#050505_58%,#000)]">
          <div className="px-6 text-center">
            <Play className="mx-auto size-8 text-white/34" />
            <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/38">
              Case study media coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
