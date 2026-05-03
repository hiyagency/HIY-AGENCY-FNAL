"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { PublicCaseStudy } from "@/lib/data";

const chapterLabels = ["Name", "Service", "Brief", "Story", "Impact", "CTA"];

export function CaseStudyShowcase({
  caseStudies,
  compact = false,
}: {
  caseStudies: PublicCaseStudy[];
  compact?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const activeStudy = caseStudies[activeIndex];
  const chapters = useMemo(() => buildChapters(activeStudy), [activeStudy]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (sectionVisible && index === activeIndex && !prefersReducedMotion) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, prefersReducedMotion, sectionVisible]);

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
    <div ref={sectionRef} className="relative">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] ${
              compact ? "min-h-[520px]" : "min-h-[620px]"
            }`}
          >
            {caseStudies.map((study, index) => {
              const shouldLoad = Math.abs(index - activeIndex) <= 1;
              return (
                <motion.div
                  animate={{ opacity: index === activeIndex ? 1 : 0, scale: index === activeIndex ? 1 : 1.025 }}
                  className="absolute inset-0"
                  initial={false}
                  key={study.id}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
                >
                  {study.hasVideo && shouldLoad ? (
                    <video
                      aria-label={`${study.title} case study video`}
                      className="h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                      poster={study.posterUrl || undefined}
                      preload="metadata"
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      src={study.videoUrl}
                    />
                  ) : (
                    <CaseStudyPoster study={study} />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.68))]" />
                </motion.div>
              );
            })}

            <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-black/45 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/62 backdrop-blur">
                {activeStudy.service}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-black">
                {activeStudy.result}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                {activeStudy.clientName}
              </p>
              <h3 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-normal sm:text-6xl">
                {activeStudy.title}
              </h3>
              {!activeStudy.hasVideo ? (
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/58 backdrop-blur">
                  <Play className="size-3" />
                  Video will appear after upload
                </div>
              ) : null}
            </div>
            <div className="absolute bottom-5 right-5 z-20 hidden flex-col items-end gap-2 md:flex">
              {chapterLabels.map((label, index) => (
                <span
                  className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/38"
                  key={label}
                >
                  <span className="hidden lg:inline">{label}</span>
                  <span
                    className={`block h-1.5 rounded-full ${
                      index < 2 ? "w-7 bg-white/80" : "w-3 bg-white/30"
                    }`}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {caseStudies.map((study, index) => (
              <button
                aria-label={`View ${study.title}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-12 bg-white" : "w-2.5 bg-white/24 hover:bg-white/50"
                }`}
                key={study.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {caseStudies.map((study, index) => (
            <motion.article
              className="rounded-[1.6rem] border border-white/10 bg-[#0b0b0b] p-5 transition hover:border-white/28"
              initial={{ opacity: 0.65, y: 16 }}
              key={study.id}
              onViewportEnter={() => setActiveIndex(index)}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
              viewport={{ amount: 0.54, margin: "-20% 0px -28% 0px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/34">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-3 text-3xl font-semibold leading-tight tracking-normal">
                    {study.title}
                  </h4>
                </div>
                <span className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/48">
                  {study.service}
                </span>
              </div>

              <div className="mt-7 grid gap-4">
                {buildChapters(study).map((chapter) => (
                  <div className="grid gap-2 border-t border-white/10 pt-4" key={chapter.label}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/32">
                      {chapter.label}
                    </p>
                    <p className={`leading-7 ${chapter.strong ? "text-white/82" : "text-white/56"}`}>
                      {chapter.value}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#d8d8d8]"
                href={study.href}
              >
                {study.ctaLabel}
                <ArrowUpRight className="size-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="sr-only">{chapters.map((chapter) => chapter.label).join(", ")}</div>
    </div>
  );
}

function CaseStudyPoster({ study }: { study: PublicCaseStudy }) {
  if (study.posterUrl || study.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={`${study.clientName} case study`}
        className="h-full w-full object-cover grayscale"
        loading="lazy"
        src={study.posterUrl || study.imageUrl || ""}
      />
    );
  }

  return (
    <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#1c1c1c,#050505_58%,#000)]">
      <div className="text-center">
        <p className="text-6xl font-black tracking-normal text-white/80">
          {study.clientName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 3)}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/36">{study.service}</p>
      </div>
    </div>
  );
}

function buildChapters(study?: PublicCaseStudy) {
  if (!study) return [];

  return [
    { label: "Case study name", value: study.clientName },
    { label: "Service provided", value: study.service },
    { label: "Short description", value: study.problem },
    { label: "Long description", value: study.solution },
    { label: "Results / impact", value: study.result, strong: true },
  ].filter((chapter) => chapter.value);
}
