import type { Metadata } from "next";
import Link from "next/link";
import { Check, MoveRight } from "lucide-react";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
import { getPublishedServices } from "@/lib/data";
import { absoluteUrl, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services - Websites, AI Automation, Ads & SEO Listings",
  description:
    "Explore HIY Agency services: custom websites, performance marketing, video editing, AI automation, branding, social media, SEO listings, copywriting, and ad creatives.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "HIY Agency Services",
    description:
      "Custom websites, paid ads, video editing, automation, branding, social media, SEO listings, copywriting, and ad creatives.",
    url: absoluteUrl("/services"),
  },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();
  const servicesJsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": absoluteUrl("/services#service-list"),
      name: "HIY Agency services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": absoluteUrl(`/services#${service.slug}`),
          name: service.shortTitle ?? service.title,
          description: service.description,
          provider: {
            "@id": absoluteUrl("/#organization"),
          },
          areaServed: ["India", "Global"],
          serviceType: service.shortTitle ?? service.title,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(servicesJsonLd) }}
      />
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 px-4 pb-16 pt-28 text-[#f5f7ff] sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/62">
              Services
            </p>
            <h1 className="masked-title font-heading mt-6 max-w-6xl text-[clamp(2.55rem,11vw,3.6rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3.5rem,8vw,8rem)] sm:leading-[0.86]">
              Premium execution systems for brands that need more than a website.
            </h1>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:mt-16 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal delay={0.04 * (index % 4)} key={service.slug}>
                  <article
                    className="group relative grid gap-6 overflow-hidden rounded-[2rem] border border-[#7d97ff]/16 bg-[#05070d]/74 p-5 shadow-[0_30px_110px_rgba(0,12,90,0.22)] transition duration-500 hover:border-[#7d97ff]/48 sm:gap-8 sm:p-6 lg:grid-cols-[0.7fr_1.3fr]"
                    id={service.slug}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(63,91,255,0.24),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <span className="grid size-14 place-items-center rounded-2xl border border-[#7d97ff]/18 bg-[#3f5bff]/12">
                        <Icon className="size-7 text-[#dfe5ff]" />
                      </span>
                      <p className="mt-10 text-xs uppercase tracking-[0.26em] text-[#9eb0ff]/50">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="font-heading mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-[#c7d1ff]/60 sm:mt-5 sm:text-lg sm:leading-8">
                        {service.description}
                      </p>
                      <Link
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5f7ff] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#050505] transition hover:shadow-[0_0_44px_rgba(63,91,255,0.48)]"
                        href="/contact"
                      >
                        Discuss This
                        <MoveRight className="size-4" />
                      </Link>
                    </div>
                    <div className="relative grid gap-3 sm:grid-cols-2">
                      {service.points.map((point: string) => (
                        <div
                          className="flex items-start gap-3 rounded-2xl border border-[#7d97ff]/14 bg-[#050505]/50 p-4 text-sm text-[#c7d1ff]/68"
                          key={point}
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-[#9eb0ff]" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
