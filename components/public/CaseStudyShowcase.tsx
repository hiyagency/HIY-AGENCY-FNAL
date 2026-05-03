import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
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
      <Reveal>
        <div className="grid min-h-80 place-items-center rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-8 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/35">Case studies</p>
            <p className="mt-5 max-w-xl text-4xl font-semibold tracking-normal">
              Case studies are being prepared. New work will be added soon.
            </p>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-black to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-black to-transparent lg:block" />
      <div className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:flex lg:overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {caseStudies.map((study, index) => (
          <Reveal delay={(index % 3) * 0.06} key={study.id}>
            <article
              className={`group relative flex h-full min-w-[86vw] snap-center overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0b0b0b] transition duration-500 hover:-translate-y-1 hover:border-white/35 hover:bg-[#101010] md:min-w-0 lg:min-w-[430px] ${
                compact ? "min-h-[560px]" : "min-h-[640px]"
              }`}
            >
              <div className="flex w-full flex-col">
                <CaseStudyMedia study={study} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/12 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/48">
                      {study.service}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black">
                      {study.clientName}
                    </span>
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-normal">
                    {study.title}
                  </h3>
                  <div className="mt-7 grid gap-4">
                    <CaseStudyPoint label="Problem" value={study.problem} />
                    <CaseStudyPoint label="Solution" value={study.solution} />
                    <CaseStudyPoint label="Result" value={study.result} strong />
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
                    className="mt-auto inline-flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition group-hover:text-white/72"
                    href={study.href}
                  >
                    {study.ctaLabel}
                    <span className="grid size-10 place-items-center rounded-full border border-white/15 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function CaseStudyMedia({ study }: { study: PublicCaseStudy }) {
  return (
    <div className="relative aspect-[1.25/1] overflow-hidden border-b border-white/10 bg-black">
      {study.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${study.clientName} case study`}
          className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
          src={study.imageUrl}
        />
      ) : (
        <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#050505,#151515_45%,#000)]">
          <div className="text-center">
            <ImageIcon className="mx-auto size-8 text-white/34" />
            <p className="mt-5 text-5xl font-black tracking-normal text-white/80">
              {study.clientName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 3)}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/36">
              {study.industry}
            </p>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
    </div>
  );
}

function CaseStudyPoint({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/32">
        {label}
      </p>
      <p className={`mt-2 leading-7 ${strong ? "text-white/82" : "text-white/56"}`}>{value}</p>
    </div>
  );
}
