import type { Metadata } from "next";
import Link from "next/link";
import { Check, MoveRight } from "lucide-react";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
import { Reveal } from "@/components/motion/Reveal";
import { getPublishedServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom websites, ads, video editing, automation, branding, social media, SEO listings, copywriting, and ad creatives by HIY Agency.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <PublicNav />
      <main className="bg-black px-4 pb-24 pt-32 text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Services
            </p>
            <h1 className="masked-title mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.9] tracking-normal">
              Premium digital execution for businesses that want to look sharper and convert better.
            </h1>
          </Reveal>
          <div className="mt-16 grid gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal delay={0.04 * (index % 4)} key={service.slug}>
                  <article
                    className="grid gap-8 rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6 lg:grid-cols-[0.7fr_1.3fr]"
                    id={service.slug}
                  >
                    <div>
                      <Icon className="size-10 text-white" />
                      <p className="mt-10 text-xs uppercase tracking-[0.26em] text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal">
                        {service.title}
                      </h2>
                      <p className="mt-5 text-lg leading-8 text-white/58">
                        {service.description}
                      </p>
                      <Link
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black"
                        href="/contact"
                      >
                        Discuss This
                        <MoveRight className="size-4" />
                      </Link>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.points.map((point: string) => (
                        <div
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/55 p-4 text-sm text-white/68"
                          key={point}
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-white" />
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

