import Link from "next/link";
import { ArrowUpRight, Check, CircleDot, Dot, MoveRight } from "lucide-react";
import { Footer } from "@/components/public/Footer";
import { CaseStudyShowcase } from "@/components/public/CaseStudyShowcase";
import { LeadForm } from "@/components/public/LeadForm";
import { PublicNav } from "@/components/public/PublicNav";
import { SocialIconLinks } from "@/components/public/SocialIconLinks";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Preloader } from "@/components/motion/Preloader";
import { Reveal } from "@/components/motion/Reveal";
import {
  contactInfo,
  positioningCards,
  processSteps,
  trustChips,
  whyHiy,
} from "@/lib/content";
import {
  getPublishedCaseStudies,
  getPublishedServices,
  getPublishedTeamMembers,
} from "@/lib/data";

export default async function Home() {
  const [services, teamMembers, caseStudies] = await Promise.all([
    getPublishedServices(),
    getPublishedTeamMembers(),
    getPublishedCaseStudies(),
  ]);

  return (
    <>
      <Preloader />
      <PublicNav />
      <main className="overflow-hidden bg-black text-white">
        <section className="noise-layer relative min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal className="min-w-0">
              <div className="min-w-0 max-w-[358px] sm:max-w-none">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/48">
                  High Impact Digital Agency
                </p>
                <h1 className="masked-title mt-7 max-w-5xl break-words text-[2.25rem] font-black leading-[0.95] tracking-normal sm:text-[clamp(2.65rem,7vw,7.4rem)] sm:leading-[0.92]">
                  We build websites, ads, content, and systems that help businesses grow faster.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
                  HIY Agency creates custom websites, performance marketing campaigns,
                  premium creatives, automation systems, and brand experiences for
                  businesses that want more traffic, better leads, and stronger online presence.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton href="/contact">Start Your Project</MagneticButton>
                  <MagneticButton href="/services" variant="outline">
                    View Services
                  </MagneticButton>
                </div>
                <div className="mt-9 flex flex-wrap gap-2">
                  {trustChips.map((chip) => (
                    <span
                      className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.17em] text-white/62"
                      key={chip}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal className="min-w-0" delay={0.2}>
              <div className="max-w-[358px] lg:hidden">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                    Mobile command center
                  </p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ["Leads", "128"],
                      ["ROAS", "4.8x"],
                      ["Tasks", "24"],
                    ].map(([label, value]) => (
                      <div
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black px-4 py-4"
                        key={label}
                      >
                        <span className="text-xs uppercase tracking-[0.2em] text-white/42">
                          {label}
                        </span>
                        <span className="text-2xl font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <HeroVisual />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#080808] py-4">
          <div className="marquee-track flex w-max gap-10 text-sm font-semibold uppercase tracking-[0.32em] text-white/42">
            {Array.from({ length: 2 }).map((_, group) => (
              <div className="flex gap-10" key={group}>
                {[
                  "Strategy",
                  "Websites",
                  "Ads",
                  "Content",
                  "Automation",
                  "CRM",
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

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <h2 className="text-[clamp(2.6rem,6vw,5.8rem)] font-black leading-[0.92] tracking-normal">
                  Most businesses do not need &quot;just a website&quot;. They need a system
                  that brings attention, trust, and leads.
                </h2>
                <div className="flex flex-col justify-end">
                  <p className="text-xl leading-8 text-white/62">
                    A website without strategy feels empty. Ads without creatives waste
                    budget. Content without positioning gets ignored. HIY Agency connects
                    design, marketing, automation, and business systems into one clean
                    growth engine.
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {positioningCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal delay={index * 0.08} key={card.title}>
                    <article className="group h-full rounded-[1.6rem] border border-white/10 bg-[#0b0b0b] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/35 hover:bg-[#111111]">
                      <Icon className="size-7 text-white/80" />
                      <h3 className="mt-8 text-2xl font-semibold tracking-normal">
                        {card.title}
                      </h3>
                      <p className="mt-4 leading-7 text-white/55">{card.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#080808] px-4 py-24 sm:px-6 lg:px-8" id="services">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 className="max-w-4xl text-[clamp(2.8rem,7vw,6.8rem)] font-black leading-[0.92] tracking-normal">
                  Everything your business needs to look premium, get discovered, and convert better.
                </h2>
                <Link
                  className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/68"
                  href="/services"
                >
                  Explore all services
                  <MoveRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Reveal delay={(index % 3) * 0.06} key={service.slug}>
                    <article className="group flex h-full min-h-[520px] flex-col rounded-[1.7rem] border border-white/10 bg-black p-6 transition duration-500 hover:-translate-y-2 hover:border-white/35 hover:bg-[#111111]">
                      <div className="flex items-start justify-between gap-4">
                        <Icon className="size-8 text-white" />
                        <span className="text-xs uppercase tracking-[0.24em] text-white/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-8 text-3xl font-semibold leading-tight tracking-normal">
                        {service.title}
                      </h3>
                      <p className="mt-5 line-clamp-5 leading-7 text-white/56">
                        {service.description}
                      </p>
                      <ul className="mt-7 grid gap-2 text-sm text-white/60">
                        {service.points.slice(0, 6).map((point: string) => (
                          <li className="flex items-start gap-2" key={point}>
                            <Check className="mt-0.5 size-4 shrink-0 text-white" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                        <Link
                          className="rounded-full bg-white px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#d8d8d8]"
                          href={`/services#${service.slug}`}
                        >
                          Explore Service
                        </Link>
                        <Link
                          className="rounded-full border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition hover:border-white hover:text-white"
                          href="/contact"
                        >
                          Discuss This
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.9] tracking-normal">
                A clean process from idea to launch.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-4 lg:grid-cols-6">
              {processSteps.map((step, index) => (
                <Reveal delay={index * 0.05} key={step.title}>
                  <article className="relative min-h-64 rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                      0{index + 1}
                    </p>
                    <CircleDot className="mt-10 size-6 text-white" />
                    <h3 className="mt-6 text-2xl font-semibold tracking-normal">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/55">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 text-black sm:px-6 lg:px-8" id="team">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 className="text-[clamp(2.8rem,7vw,6.6rem)] font-black leading-[0.9] tracking-normal">
                  Built by a young team that understands tech, content, and modern business.
                </h2>
                <p className="self-end text-xl leading-8 text-black/62">
                  The team cards are connected to the website management schema,
                  so production photos, roles, bios, and order can be managed from admin.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {teamMembers.map((member) => (
                <Reveal key={member.name}>
                  <article className="grid gap-6 rounded-[2rem] border border-black/10 bg-[#f3f3f3] p-6 md:grid-cols-[180px_1fr]">
                    <div className="grid aspect-square place-items-center rounded-[1.3rem] bg-black text-white">
                      <span className="text-6xl font-black tracking-normal">
                        {member.name
                          .split(" ")
                          .map((part: string) => part[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-black/45">
                        {member.experience}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-normal">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-lg text-black/58">{member.role}</p>
                      <p className="mt-5 leading-7 text-black/62">{member.bio}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {member.tags.map((tag: string) => (
                          <span
                            className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-black/60"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="work">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.9] tracking-normal">
                    Real businesses. Real systems. Real growth stories.
                  </h2>
                </div>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/60"
                  href="/case-studies"
                >
                  View work
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-14">
              <CaseStudyShowcase caseStudies={caseStudies} compact />
            </div>
          </div>
        </section>

        <section className="bg-[#080808] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.9] tracking-normal">
                Why businesses choose HIY Agency.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {whyHiy.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title}>
                  <article className="h-full rounded-[1.5rem] border border-white/10 bg-black p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-8 text-2xl font-semibold tracking-normal">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/55">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="contact">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="sticky top-28">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Start Project
                </p>
                <h2 className="mt-5 text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.9] tracking-normal">
                  Tell us what you want to build.
                </h2>
                <p className="mt-7 text-xl leading-8 text-white/60">
                  Share your requirements and we will contact you within 24 hours.
                </p>
                <SocialIconLinks className="mt-7" />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <LeadForm />
            </Reveal>
          </div>
        </section>

        <section className="bg-white px-4 py-24 text-black sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr]">
            <Reveal>
              <div>
                <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-normal">
                  Ready to create something high impact?
                </h2>
                <p className="mt-7 max-w-3xl text-xl leading-8 text-black/62">
                  Whether you need a website, ad campaign, video system, automation
                  setup, or complete digital growth package - HIY Agency can help you
                  build it with clarity and premium execution.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid gap-3 self-end">
                <Link
                  className="rounded-full bg-black px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white"
                  href={contactInfo.whatsapp}
                >
                  WhatsApp / Call: {contactInfo.phone}
                </Link>
                <Link
                  className="rounded-full border border-black/15 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-black"
                  href={contactInfo.instagram}
                >
                  Instagram: {contactInfo.instagramHandle}
                </Link>
                <Link
                  className="rounded-full border border-black/15 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-black"
                  href={contactInfo.facebook}
                >
                  Facebook
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

