"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PublicCaseStudy } from "@/lib/data";

export function CaseStudyShowcase({ caseStudies }: { caseStudies: PublicCaseStudy[]; compact?: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const marqueeItems = useMemo(() => {
    if (caseStudies.length === 0) return [];
    return [...caseStudies, ...caseStudies];
  }, [caseStudies]);

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
          }
        }
      `}</style>
    </section>
  );
}
