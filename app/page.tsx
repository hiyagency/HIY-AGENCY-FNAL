import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Dot,
  MoveRight,
  Orbit,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Preloader } from "@/components/motion/Preloader";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyShowcase } from "@/components/public/CaseStudyShowcase";
import { Footer } from "@/components/public/Footer";
import { LeadForm } from "@/components/public/LeadForm";
import { PublicNav } from "@/components/public/PublicNav";
import { SocialIconLinks } from "@/components/public/SocialIconLinks";
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

const heroStats = [
  ["Systems", "Websites, AI flows, CRM, automation"],
  ["Growth", "Paid media, content engines, conversion paths"],
  ["Ops", "Dashboards, tracking, launch infrastructure"],
];

const testimonials = [
  {
    quote:
      "HIY feels like a technical growth team, not a vendor. Strategy, website, ads, and response systems finally moved together.",
    name: "Founder",
    role: "Local service brand",
  },
  {
    quote:
      "The execution was sharp, fast, and premium. Our online presence started feeling like the business we actually wanted to become.",
    name: "Operator",
    role: "Commerce business",
  },
];

export default async function Home() {
  const [services, teamMembers, caseStudies] = await Promise.all([
    getPublishedServices(),
    getPublishedTeamMembers(),
    getPublishedCaseStudies(),
  ]);

  return (
    <>
      <Preloader />
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 overflow-hidden text-[#f5f7ff]">
        <section className="noise-layer relative min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="absolute left-1/2 top-28 h-px w-[72vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(63,91,255,0.8),transparent)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
            <Reveal className="min-w-0">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#7d97ff]/22 bg-[#07102a]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#9eb0ff] shadow-[0_0_50px_rgba(63,91,255,0.18)] backdrop-blur-xl">
                  <Sparkles className="size-4" />
                  Premium Digital Infrastructure
                </div>
                <h1 className="masked-title font-heading mt-7 max-w-6xl break-words text-[clamp(3.6rem,7vw,7.4rem)] font-black leading-[0.92] tracking-normal">
                  We engineer growth systems that feel expensive before they convert.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#c7d1ff]/70 sm:text-xl">
                  HIY Agency builds elite websites, AI experiences, automation stacks,
                  content engines, and paid growth systems for businesses that need a
                  sharper digital command layer.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton href="/contact">Start Your Project</MagneticButton>
                  <MagneticButton href="/case-studies" variant="outline">
                    View Systems
                  </MagneticButton>
                </div>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {heroStats.map(([title, text]) => (
                    <div
                      className="rounded-2xl border border-[#7d97ff]/16 bg-[#07102a]/36 p-4 backdrop-blur"
                      key={title}
                    >
                      <p className="font-heading text-xl font-semibold text-white">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#c7d1ff]/56">{text}</p>
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

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="about">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
                <h2 className="font-heading blue-text text-[clamp(2.7rem,6vw,6rem)] font-black leading-[0.88] tracking-normal">
                  A growth agency for companies that need infrastructure, not decoration.
                </h2>
                <div className="flex flex-col justify-end">
                  <p className="text-xl leading-8 text-[#c7d1ff]/68">
                    The new HIY identity is built around one idea: every public touchpoint
                    should connect to a real operating system. Positioning, interface,
                    creative, tracking, automation, and acquisition should feel like one
                    premium machine.
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {positioningCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal delay={index * 0.08} key={card.title}>
                    <article className="group h-full rounded-[1.6rem] border border-[#7d97ff]/16 bg-[#07102a]/42 p-6 transition duration-500 hover:-translate-y-1 hover:border-[#7d97ff]/45 hover:bg-[#10246d]/32 hover:shadow-[0_22px_80px_rgba(36,59,255,0.22)]">
                      <Icon className="size-7 text-[#9eb0ff]" />
                      <h3 className="font-heading mt-8 text-2xl font-semibold tracking-normal">
                        {card.title}
                      </h3>
                      <p className="mt-4 leading-7 text-[#c7d1ff]/58">{card.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="services">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 className="font-heading max-w-4xl text-[clamp(2.8rem,7vw,6.8rem)] font-black leading-[0.88] tracking-normal">
                  Websites, AI, content, ads, and systems built as one command layer.
                </h2>
                <Link
                  className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb0ff]"
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
                    <article className="group relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[1.7rem] border border-[#7d97ff]/16 bg-[#05070d]/72 p-6 transition duration-500 hover:-translate-y-2 hover:border-[#7d97ff]/50 hover:shadow-[0_30px_110px_rgba(36,59,255,0.25)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(63,91,255,0.22),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="relative flex items-start justify-between gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl border border-[#7d97ff]/18 bg-[#3f5bff]/12">
                          <Icon className="size-6 text-[#dfe5ff]" />
                        </span>
                        <span className="text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/45">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-heading relative mt-8 text-3xl font-semibold leading-tight tracking-normal">
                        {service.shortTitle ?? service.title}
                      </h3>
                      <p className="relative mt-5 line-clamp-5 leading-7 text-[#c7d1ff]/58">
                        {service.description}
                      </p>
                      <ul className="relative mt-7 grid gap-2 text-sm text-[#c7d1ff]/62">
                        {service.points.slice(0, 5).map((point: string) => (
                          <li className="flex items-start gap-2" key={point}>
                            <Check className="mt-0.5 size-4 shrink-0 text-[#9eb0ff]" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="relative mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                        <Link
                          className="rounded-full bg-[#f5f7ff] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#050505] transition hover:shadow-[0_0_44px_rgba(63,91,255,0.48)]"
                          href={`/services#${service.slug}`}
                        >
                          Explore
                        </Link>
                        <Link
                          className="rounded-full border border-[#7d97ff]/22 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#c7d1ff]/70 transition hover:border-[#9eb0ff]/70 hover:text-white"
                          href="/contact"
                        >
                          Discuss
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="work">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/60">
                    Case Studies
                  </p>
                  <h2 className="font-heading mt-5 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.86] tracking-normal">
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
            <div className="mt-14">
              <CaseStudyShowcase caseStudies={caseStudies} compact />
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="font-heading blue-text max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.86] tracking-normal">
                A precise process from signal to launch.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-4 lg:grid-cols-6">
              {processSteps.map((step, index) => (
                <Reveal delay={index * 0.05} key={step.title}>
                  <article className="relative min-h-64 rounded-[1.5rem] border border-[#7d97ff]/16 bg-[#07102a]/42 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/50">
                      0{index + 1}
                    </p>
                    <CircleDot className="mt-10 size-6 text-[#9eb0ff]" />
                    <h3 className="font-heading mt-6 text-2xl font-semibold tracking-normal">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#c7d1ff]/56">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="team">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 className="font-heading text-[clamp(2.8rem,7vw,6.6rem)] font-black leading-[0.86] tracking-normal">
                  Built by operators who understand tech, media, and modern business speed.
                </h2>
                <p className="self-end text-xl leading-8 text-[#c7d1ff]/64">
                  The team structure stays connected to the admin schema, so profiles
                  can still be managed from the backend while the public experience
                  moves into the new premium identity.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {teamMembers.map((member) => (
                <Reveal key={member.name}>
                  <article className="group grid gap-6 rounded-[2rem] border border-[#7d97ff]/16 bg-[#07102a]/40 p-6 transition duration-500 hover:border-[#7d97ff]/44 hover:bg-[#10246d]/30 md:grid-cols-[180px_1fr]">
                    <div className="grid aspect-square place-items-center rounded-[1.3rem] border border-[#7d97ff]/18 bg-[radial-gradient(circle_at_30%_20%,rgba(63,91,255,0.56),#050505_66%)] text-white shadow-[0_0_60px_rgba(63,91,255,0.22)]">
                      <span className="font-heading text-6xl font-black tracking-normal">
                        {member.name
                          .split(" ")
                          .map((part: string) => part[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-[#9eb0ff]/55">
                        {member.experience}
                      </p>
                      <h3 className="font-heading mt-3 text-3xl font-semibold tracking-normal">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-lg text-[#c7d1ff]/62">{member.role}</p>
                      <p className="mt-5 leading-7 text-[#c7d1ff]/60">{member.bio}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {member.tags.map((tag: string) => (
                          <span
                            className="rounded-full border border-[#7d97ff]/16 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#c7d1ff]/58"
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

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="font-heading max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.86] tracking-normal">
                Why businesses choose HIY Agency.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {whyHiy.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title}>
                  <article className="h-full rounded-[1.5rem] border border-[#7d97ff]/16 bg-[#05070d]/70 p-5 transition duration-500 hover:-translate-y-1 hover:border-[#7d97ff]/44">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/48">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading mt-8 text-2xl font-semibold tracking-normal">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#c7d1ff]/56">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Reveal delay={index * 0.08} key={testimonial.quote}>
                <figure className="glass-panel rounded-[2rem] p-7">
                  <Orbit className="size-8 text-[#9eb0ff]" />
                  <blockquote className="font-heading mt-8 text-3xl font-semibold leading-tight">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 text-sm text-[#c7d1ff]/62">
                    <ShieldCheck className="size-4 text-[#9eb0ff]" />
                    {testimonial.name} / {testimonial.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8" id="contact">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="sticky top-28">
                <p className="text-sm uppercase tracking-[0.3em] text-[#9eb0ff]/60">
                  Start Project
                </p>
                <h2 className="font-heading mt-5 text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.86] tracking-normal">
                  Tell us what system you want to build.
                </h2>
                <p className="mt-7 text-xl leading-8 text-[#c7d1ff]/62">
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

        <section className="px-4 pb-28 pt-10 sm:px-6 lg:px-8">
          <div className="glass-panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-7 lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7d97ff]/18 bg-[#3f5bff]/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#9eb0ff]">
                  <Zap className="size-4" />
                  Build the next layer
                </div>
                <h2 className="font-heading mt-6 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.86] tracking-normal">
                  Ready to create something that looks and works world-class?
                </h2>
                <p className="mt-7 max-w-3xl text-xl leading-8 text-[#c7d1ff]/62">
                  Website, campaign, video system, automation, or complete growth
                  package - HIY Agency can shape the premium system behind it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid gap-3 self-end">
                <Link
                  className="rounded-full bg-[#f5f7ff] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:shadow-[0_0_44px_rgba(63,91,255,0.48)]"
                  href={contactInfo.whatsapp}
                >
                  WhatsApp / Call: {contactInfo.phone}
                </Link>
                <Link
                  className="rounded-full border border-[#7d97ff]/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#f5f7ff]"
                  href={contactInfo.instagram}
                >
                  Instagram: {contactInfo.instagramHandle}
                </Link>
                <Link
                  className="rounded-full border border-[#7d97ff]/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#f5f7ff]"
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
