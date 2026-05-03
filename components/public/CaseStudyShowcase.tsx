"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { PublicCaseStudy } from "@/lib/data";

export function CaseStudyShowcase({
  caseStudies,
  compact = false,
}: {
  caseStudies: PublicCaseStudy[];
  compact?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <div className="grid gap-10">
      {caseStudies.map((study, index) => (
        <motion.article
          className="grid gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] p-4 sm:p-5 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)] lg:gap-6"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          key={study.id}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
          viewport={{ amount: 0.22, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2 lg:hidden">
              <span className="rounded-full border border-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/48">
                {study.service}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mb-5 text-[clamp(2rem,9vw,4rem)] font-black leading-[0.94] tracking-normal lg:hidden">
              {study.title}
            </h3>
            <CaseStudyMedia study={study} compact={compact} />
          </div>

          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.5rem] border border-white/10 bg-black p-5 sm:p-6">
              <div className="hidden flex-wrap items-center gap-2 lg:flex">
                <span className="rounded-full border border-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/48">
                  {study.service}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-0 hidden text-[clamp(2.4rem,4.5vw,4.9rem)] font-black leading-[0.92] tracking-normal lg:block">
                {study.title}
              </h3>

              <div className="mt-1 grid gap-4 lg:mt-7">
                <DetailBlock label="Client" value={study.clientName} />
                <DetailBlock label="Short description" value={study.problem} />
                <DetailBlock label="Long description" value={study.solution} />
                <DetailBlock label="Results / impact" value={study.result} strong />
              </div>

              {study.services.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/52"
                      key={service}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              ) : null}

              <Link
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#d8d8d8] sm:w-auto"
                href={study.href}
              >
                {study.ctaLabel}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function CaseStudyMedia({ study, compact }: { study: PublicCaseStudy; compact: boolean }) {
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
      { rootMargin: "520px 0px", threshold: 0.05 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className={`relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050505] ${
        compact ? "lg:min-h-[420px]" : "lg:min-h-[500px]"
      }`}
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
          <div className="text-center">
            <Play className="mx-auto size-8 text-white/34" />
            <p className="mt-5 text-5xl font-black tracking-normal text-white/80">
              {study.clientName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 3)}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/36">
              Video case study
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

function DetailBlock({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  if (!value) return null;

  return (
    <div className="border-t border-white/10 pt-4">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/32">
        {label}
      </p>
      <p className={`mt-2 break-words leading-7 ${strong ? "text-white/84" : "text-white/58"}`}>
        {value}
      </p>
    </div>
  );
}
