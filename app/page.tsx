import Link from "next/link";
import {
  ArrowUpRight,
  CircleDot,
  Dot,
  Orbit,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyShowcase } from "@/components/public/CaseStudyShowcase";
import { ContactButtons } from "@/components/public/ContactButtons";
import { Footer } from "@/components/public/Footer";
import { LeadForm } from "@/components/public/LeadForm";
import { PublicNav } from "@/components/public/PublicNav";
import { ServicesScrollShowcase } from "@/components/public/ServicesScrollShowcase";
import { ShippedProjectsMarquee } from "@/components/public/ShippedProjectsMarquee";
import { SocialIconLinks } from "@/components/public/SocialIconLinks";
import { TeamSweep } from "@/components/public/TeamSweep";
import {
  positioningCards,
  processSteps,
  testimonials,
  trustChips,
  whyHiy,
  homepageFaqs,
} from "@/lib/content";
import {
  getPublishedCaseStudies,
  getPublishedServices,
  getPublishedShippedProjects,
  getPublishedTeamMembers,
} from "@/lib/data";
import { jsonLdScript } from "@/lib/seo";

const heroStats = [
  ["Systems", "Websites, AI flows, CRM, automation"],
  ["Growth", "Paid media, content engines, conversion paths"],
  ["Ops", "Dashboards, tracking, launch infrastructure"],
];

export default async function Home() {
  const [services, teamMembers, caseStudies, shippedProjects] = await Promise.all([
    getPublishedServices(),
    getPublishedTeamMembers(),
    getPublishedCaseStudies(),
    getPublishedShippedProjects(),
  ]);

  const shippedNames = shippedProjects.map((project) => project.client_name);
  const homepageServices = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    description: service.description,
    points: service.points,
  }));
  const homepageFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://hiy.agency/#homepage-faq",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homepageFaqJsonLd) }}
      />
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 overflow-hidden text-[#f5f7ff]">
        <section className="noise-layer relative min-h-screen px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <div className="absolute left-1/2 top-28 h-px w-[72vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(63,91,255,0.8),transparent)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
            <Reveal className="min-w-0">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#7d97ff]/22 bg-[#07102a]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#9eb0ff] shadow-[0_0_50px_rgba(63,91,255,0.18)] backdrop-blur-xl">
                  <Sparkles className="size-4" />
                  Premium Digital Infrastructure
                </div>
                <h1 className="masked-title font-heading mt-6 max-w-6xl break-words text-[clamp(2.55rem,11vw,3.6rem)] font-black leading-[0.9] tracking-normal sm:mt-7 sm:text-[clamp(3.6rem,7vw,7.4rem)] sm:leading-[0.92]">
                  We engineer growth systems that feel expensive before they convert.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#c7d1ff]/70 sm:mt-7 sm:text-xl sm:leading-8">
                  HIY Agency builds elite websites, AI experiences, automation stacks,
                  content engines, and paid growth systems for businesses that need a
                  sharper digital command layer.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5f7ff] px-7 text-sm font-bold uppercase tracking-[0.14em] text-[#050505] transition-transform duration-300 hover:translate-y-[-2px]"
                    href="/contact"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#7d97ff]/35 bg-[#07102a]/60 px-7 text-sm font-bold uppercase tracking-[0.14em] text-[#f5f7ff] transition-colors duration-300 hover:border-[#9eb0ff]/80 hover:bg-[#1126a4]/30"
                    href="/case-studies"
                  >
                    View Systems
                  </Link>
                </div>
                <div className="mt-7 grid gap-2 sm:mt-9 sm:grid-cols-3 sm:gap-3">
                  {heroStats.map(([title, text]) => (
                    <div
                      className="rounded-2xl border border-[#7d97ff]/16 bg-[#07102a]/36 p-3 backdrop-blur sm:p-4"
                      key={title}
                    >
                      <p className="font-heading text-lg font-semibold text-white sm:text-xl">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#c7d1ff]/56 sm:mt-2 sm:text-sm sm:leading-6">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[#7d97ff]/14 bg-[#05070d]/66 py-4 backdrop-blur">
          <div className="marquee-track flex w-max gap-10 text-sm font-semibold uppercase tracking-[0.32em] text-[#9eb0ff]/56">
            {Array.from({ length: 2 }).map((_, group) => (
              <div className="flex gap-10" key={group}>
                {[
                  "AI Systems",
                  "Premium Websites",
                  "Growth Engines",
                  "Automation",
                  "Content Ops",
                  "Paid Media",
                  "HIY Agency",
                ].map((item) => (
                  <span className="flex items-center gap-10" key={`${group}-${item}`}>
                    {item}
                    <Dot className="size-5" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <ShippedProjectsMarquee projects={shippedNames} />

        <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="about">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
                <h2 className="font-heading blue-text text-[clamp(2.35rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(2.7rem,6vw,6rem)] sm:leading-[0.88]">
                  A growth agency for companies that need infrastructure, not decoration.
                </h2>
                <div className="flex flex-col justify-end">
                  <p className="text-base leading-7 text-[#c7d1ff]/68 sm:text-xl sm:leading-8">
                    The new HIY identity is built around one idea: every public touchpoint
                    should connect to a real operating system. Positioning, interface,
                    creative, tracking, automation, and acquisition should feel like one
                    premium machine.
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
              {positioningCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal delay={index * 0.08} key={card.title}>
                    <article className="group relative h-full overflow-hidden rounded-[1.35rem] border border-[#7d97ff]/16 bg-[#07102a]/42 p-5 transition-[border-color,background-color,box-shadow,transform] duration-500 md:rounded-[1.6rem] md:p-6 md:hover:-translate-y-2 md:hover:border-[#7d97ff]/45 md:hover:bg-[#10246d]/32 md:hover:shadow-[0_22px_80px_rgba(36,59,255,0.22)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(63,91,255,0.22),transparent_42%)] opacity-0 transition duration-700 group-hover:opacity-100" />
                      <span className="relative grid size-11 place-items-center rounded-2xl border border-[#7d97ff]/18 bg-[#3f5bff]/10 transition duration-700 group-hover:scale-105 group-hover:bg-[#3f5bff]/18">
                        <Icon className="size-6 text-[#9eb0ff]" />
                      </span>
                      <h3 className="font-heading relative mt-6 text-xl font-semibold tracking-normal md:mt-8 md:text-2xl">
                        {card.title}
                      </h3>
                      <p className="relative mt-3 text-sm leading-6 text-[#c7d1ff]/58 md:mt-4 md:text-base md:leading-7">{card.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <ServicesScrollShowcase services={homepageServices} />

        <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="work">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/60">
                    Case Studies
                  </p>
                  <h2 className="font-heading mt-5 max-w-4xl text-[clamp(2.45rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,7vw,7rem)] sm:leading-[0.86]">
                    Cinematic proof of systems built to move businesses.
                  </h2>
                </div>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb0ff]"
                  href="/case-studies"
                >
                  Browse all work
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 sm:mt-14">
              <CaseStudyShowcase caseStudies={caseStudies} compact />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="font-heading blue-text max-w-4xl text-[clamp(2.45rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,7vw,7rem)] sm:leading-[0.86]">
                A precise process from signal to launch.
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {processSteps.map((step, index) => (
                <Reveal delay={index * 0.05} key={step.title}>
                  <article className="relative min-h-36 rounded-[1.25rem] border border-[#7d97ff]/16 bg-[#07102a]/42 p-4 sm:min-h-56 sm:rounded-[1.5rem] sm:p-5 lg:min-h-64">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/50">
                      0{index + 1}
                    </p>
                    <CircleDot className="mt-5 size-5 text-[#9eb0ff] sm:mt-8 sm:size-6 lg:mt-10" />
                    <h3 className="font-heading mt-3 text-lg font-semibold tracking-normal sm:mt-5 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#c7d1ff]/56 sm:mt-4 sm:text-sm sm:leading-6">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="team">
          <div className="pointer-events-none absolute inset-x-0 top-20 h-72 bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.16),transparent_68%)]" />
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                <h2 className="font-heading text-[2.65rem] font-black leading-[0.9] tracking-normal sm:text-[clamp(2.8rem,7vw,6.6rem)] sm:leading-[0.86]">
                  Built by operators who understand tech, media, and modern business speed.
                </h2>
                <p className="self-end text-sm leading-6 text-[#c7d1ff]/64 sm:text-xl sm:leading-8">
                  The team structure stays connected to the admin schema, so profiles
                  can still be managed from the backend while the public experience
                  moves into the new premium identity.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-7 hidden overflow-hidden rounded-[1.45rem] border border-[#7d97ff]/16 bg-[#05070d]/68 p-3 shadow-[0_24px_80px_rgba(36,59,255,0.14)] sm:mt-12 sm:block sm:rounded-[2rem] sm:p-4">
                <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                  {["Strategy", "Build", "Growth"].map((item, index) => (
                    <div
                      className="rounded-2xl border border-[#7d97ff]/14 bg-[#07102a]/46 p-3 sm:p-4"
                      key={item}
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/54">
                        0{index + 1}
                      </p>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#7d97ff]/10 sm:mt-5">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#3f5bff,#f5f7ff)]"
                          style={{ width: `${70 + index * 10}%` }}
                        />
                      </div>
                      <p className="font-heading mt-3 text-lg font-semibold text-white sm:mt-4 sm:text-xl">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <TeamSweep teamMembers={teamMembers} />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="why-hiy">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/60">
                Why HIY
              </p>
              <h2 className="font-heading mt-5 max-w-4xl text-[clamp(2.45rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,7vw,7rem)] sm:leading-[0.86]">
                One partner for design, growth, and systems that actually ship.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2 lg:grid-cols-5">
              {whyHiy.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title}>
                  <article className="group h-full rounded-[1.35rem] border border-[#7d97ff]/16 bg-[#05070d]/70 p-4 transition-[border-color,background-color,box-shadow,transform] duration-500 md:rounded-[1.5rem] md:p-5 md:hover:-translate-y-1.5 md:hover:border-[#7d97ff]/48 md:hover:bg-[#10246d]/28 md:hover:shadow-[0_22px_70px_rgba(36,59,255,0.2)]">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/48">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading mt-5 text-xl font-semibold tracking-normal transition-colors duration-300 group-hover:text-white md:mt-8 md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#c7d1ff]/56">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20" id="faq">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr] lg:gap-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/60">
                    FAQ
                  </p>
                  <h2 className="font-heading mt-5 max-w-3xl text-[2.4rem] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,6vw,5.5rem)] sm:leading-[0.86]">
                    Clear answers for AI search and real buyers.
                  </h2>
                </div>
                <div className="divide-y divide-[#7d97ff]/12 rounded-[1.35rem] border border-[#7d97ff]/16 bg-[#05070d]/64">
                  {homepageFaqs.map((faq, index) => (
                    <details className="group p-4 sm:p-5" key={faq.question} open={index === 0}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                        <h3 className="font-heading text-lg font-semibold leading-tight text-white sm:text-xl">
                          {faq.question}
                        </h3>
                        <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-[#9eb0ff]/58 group-open:hidden">
                          Open
                        </span>
                        <span className="hidden shrink-0 text-xs uppercase tracking-[0.18em] text-[#9eb0ff]/58 group-open:inline">
                          Close
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-[#c7d1ff]/64 sm:text-base sm:leading-7">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute inset-x-0 top-1/4 h-96 bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.13),transparent_70%)]" />
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="font-heading max-w-4xl text-[clamp(2.45rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,7vw,7rem)] sm:leading-[0.86]">
                What clients say after launch.
              </h2>
            </Reveal>
            <div className="relative mt-8 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal delay={index * 0.06} key={testimonial.quote}>
                  <figure className={`glass-panel group h-full rounded-[1.45rem] p-5 transition-[border-color,box-shadow,transform] duration-500 md:rounded-[2rem] md:p-7 md:hover:-translate-y-2 md:hover:border-[#7d97ff]/42 md:hover:shadow-[0_28px_100px_rgba(36,59,255,0.22)] ${index >= 3 ? "hidden md:block" : ""}`}>
                    <span className="grid size-11 place-items-center rounded-2xl border border-[#7d97ff]/16 bg-[#3f5bff]/10 transition-transform duration-500 group-hover:scale-105 md:size-12">
                      <Orbit className="size-7 text-[#9eb0ff]" />
                    </span>
                    <blockquote className="font-heading mt-6 line-clamp-5 text-xl font-semibold leading-tight sm:text-3xl md:mt-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 text-sm text-[#c7d1ff]/62 md:mt-8">
                      <ShieldCheck className="size-4 text-[#9eb0ff]" />
                      {testimonial.name} / {testimonial.role}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="contact">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-sm uppercase tracking-[0.3em] text-[#9eb0ff]/60">
                  Start Project
                </p>
                <h2 className="font-heading mt-5 text-[clamp(2.45rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,7vw,6.8rem)] sm:leading-[0.86]">
                  Tell us what system you want to build.
                </h2>
                <p className="mt-6 text-base leading-7 text-[#c7d1ff]/62 sm:mt-7 sm:text-xl sm:leading-8">
                  Share your requirements and we will contact you within 24 hours.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {trustChips.map((chip) => (
                    <span
                      className="rounded-full border border-[#7d97ff]/16 bg-[#07102a]/42 px-4 py-2 text-xs uppercase tracking-[0.17em] text-[#c7d1ff]/62"
                      key={chip}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <SocialIconLinks className="mt-7" />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <LeadForm />
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-14 pt-2 sm:px-6 sm:pb-28 sm:pt-10 lg:px-8">
          <div className="glass-panel mx-auto grid max-w-7xl gap-8 rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-7 lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7d97ff]/18 bg-[#3f5bff]/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#9eb0ff]">
                  <Zap className="size-4" />
                  Build the next layer
                </div>
                <h2 className="font-heading mt-6 text-[clamp(2.45rem,10vw,4rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3rem,8vw,7rem)] sm:leading-[0.86]">
                  Ready to create something that looks and works world-class?
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-[#c7d1ff]/62 sm:mt-7 sm:text-xl sm:leading-8">
                  Website, campaign, video system, automation, or complete growth
                  package - HIY Agency can shape the premium system behind it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ContactButtons className="self-end" layout="grid" />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
