"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Check,
  Clapperboard,
  FileText,
  Megaphone,
  MousePointerClick,
  Search,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Service = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  points: string[];
};

type ServicesScrollShowcaseProps = {
  services: Service[];
};

type ShowcaseService = Service & {
  displayTitle: string;
  eyebrow: string;
  icon: ComponentType<{ className?: string }>;
};

const serviceIcons: Record<string, ComponentType<{ className?: string }>> = {
  "custom-websites": BriefcaseBusiness,
  "performance-marketing": Megaphone,
  "video-editing-content-production": Clapperboard,
  "automation-ai-systems": Bot,
  "branding-positioning": BadgeCheck,
  "funnels-landing-pages": MousePointerClick,
  "seo-listings-local-discovery": Search,
  "copywriting-conversion-messaging": FileText,
  "ad-creatives": Sparkles,
};

const preferredServices = [
  ["custom-websites", "Custom Websites", "Presence"],
  ["performance-marketing", "Performance Marketing", "Growth"],
  ["video-editing-content-production", "Video Editing", "Content"],
  ["automation-ai-systems", "Automation & AI Systems", "Systems"],
  ["branding-positioning", "Branding & Positioning", "Trust"],
  ["funnels-landing-pages", "Funnels & Landing Pages", "Conversion"],
  ["seo-listings-local-discovery", "SEO Listings", "Discovery"],
  ["copywriting-conversion-messaging", "Copywriting", "Messaging"],
  ["ad-creatives", "Ad Creatives", "Attention"],
] as const;

function buildShowcaseServices(services: Service[]): ShowcaseService[] {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const websites = bySlug.get("custom-websites") ?? services[0];

  return preferredServices
    .map(([key, title, eyebrow]) => {
      if (key === "funnels-landing-pages") {
        return {
          slug: websites?.slug ?? "custom-websites",
          title,
          shortTitle: title,
          displayTitle: title,
          eyebrow,
          description:
            "Focused landing pages and campaign funnels that make one offer clear, route leads fast, and keep every conversion path measurable.",
          points: [
            "Landing page strategy",
            "Offer and section flow",
            "Lead capture forms",
          ],
          icon: serviceIcons[key],
        };
      }

      const service = bySlug.get(key);
      if (!service) return null;

      return {
        ...service,
        displayTitle: title,
        eyebrow,
        icon: serviceIcons[key] ?? BriefcaseBusiness,
      };
    })
    .filter(Boolean) as ShowcaseService[];
}

function ServiceCard({
  service,
  index,
}: {
  service: ShowcaseService;
  index: number;
}) {
  const Icon = service.icon;

  return (
    <article className="relative h-full overflow-hidden rounded-[1.1rem] border border-[#7d97ff]/16 bg-[#05070d]/80 p-3 sm:rounded-[1.45rem] sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(158,176,255,0.58),transparent)]" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-9 place-items-center rounded-xl border border-[#7d97ff]/18 bg-[#3f5bff]/12 text-[#dfe5ff] sm:size-11 sm:rounded-2xl">
          <Icon className="size-4 sm:size-5" />
        </span>
        <span className="font-heading text-[0.65rem] tracking-[0.2em] text-[#9eb0ff]/54 sm:text-xs sm:tracking-[0.24em]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-4 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#9eb0ff]/58 sm:mt-7 sm:text-[0.65rem] sm:tracking-[0.28em]">
        {service.eyebrow}
      </p>
      <h3 className="font-heading mt-2 text-lg font-black leading-[0.98] tracking-normal text-white sm:mt-3 sm:text-3xl">
        {service.displayTitle}
      </h3>
      <p className="mt-4 hidden text-sm leading-6 text-[#c7d1ff]/62 sm:line-clamp-4 sm:block">
        {service.description}
      </p>

      <ul className="mt-5 hidden gap-2 text-sm text-[#c7d1ff]/66 sm:grid">
        {service.points.slice(0, 3).map((point) => (
          <li className="flex items-start gap-2" key={point}>
            <Check className="mt-0.5 size-4 shrink-0 text-[#9eb0ff]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ServicesScrollShowcase({ services }: ServicesScrollShowcaseProps) {
  const showcaseServices = useMemo(() => buildShowcaseServices(services), [services]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (showcaseServices.length === 0) {
    return null;
  }

  const activeService = showcaseServices[activeIndex] ?? showcaseServices[0];
  const ActiveIcon = activeService.icon;

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20" id="services">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(63,91,255,0.16),transparent_68%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9eb0ff]/62">
                Services
              </p>
              <h2 className="font-heading mt-4 max-w-4xl text-[2.55rem] font-black leading-[0.9] tracking-normal text-white sm:text-[clamp(3rem,7vw,6.5rem)] sm:leading-[0.86]">
                Websites, AI, content, ads, and systems built as one command layer.
              </h2>
            </div>
            <Link
              className="inline-flex w-fit items-center rounded-full border border-[#7d97ff]/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#c7d1ff]/74 transition-colors duration-300 hover:border-[#9eb0ff]/60 hover:text-white"
              href="/services"
            >
              All services
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 hidden gap-3 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {showcaseServices.map((service, index) => (
              <ServiceCard
                index={index}
                key={service.displayTitle}
                service={service}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-7 sm:hidden">
          <div
            aria-label="Choose a HIY Agency service"
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {showcaseServices.map((service, index) => (
              <button
                aria-pressed={activeIndex === index}
                className={`snap-start whitespace-nowrap rounded-full border px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  activeIndex === index
                    ? "border-[#9eb0ff]/60 bg-[#f5f7ff] text-[#050505]"
                    : "border-[#7d97ff]/18 bg-[#07102a]/60 text-[#c7d1ff]/64"
                }`}
                key={`${service.displayTitle}-chip`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {String(index + 1).padStart(2, "0")} {service.displayTitle}
              </button>
            ))}
          </div>

          <article className="mt-4 overflow-hidden rounded-[1.25rem] border border-[#7d97ff]/18 bg-[#05070d]/86 p-4">
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-xl border border-[#7d97ff]/18 bg-[#3f5bff]/12 text-[#dfe5ff]">
                <ActiveIcon className="size-5" />
              </span>
              <span className="font-heading text-xs tracking-[0.22em] text-[#9eb0ff]/58">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#9eb0ff]/58">
              {activeService.eyebrow}
            </p>
            <h3 className="font-heading mt-2 text-2xl font-black leading-[0.95] tracking-normal text-white">
              {activeService.displayTitle}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#c7d1ff]/64">
              {activeService.description}
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-[#c7d1ff]/68">
              {activeService.points.slice(0, 3).map((point) => (
                <li className="flex items-start gap-2" key={point}>
                  <Check className="mt-0.5 size-4 shrink-0 text-[#9eb0ff]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="mt-4 divide-y divide-[#7d97ff]/12 rounded-[1.15rem] border border-[#7d97ff]/14 bg-[#05070d]/58">
            {showcaseServices.map((service, index) => (
              <details className="group px-4 py-3" key={`${service.displayTitle}-details`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left">
                  <span className="font-heading text-base font-semibold text-white">
                    {String(index + 1).padStart(2, "0")} {service.displayTitle}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[#9eb0ff]/58 group-open:hidden">
                    Open
                  </span>
                  <span className="hidden text-xs uppercase tracking-[0.18em] text-[#9eb0ff]/58 group-open:inline">
                    Close
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#c7d1ff]/62">
                  {service.description}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
