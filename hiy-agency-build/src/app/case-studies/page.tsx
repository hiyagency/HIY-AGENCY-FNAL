import type { Metadata } from "next";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
import { Reveal } from "@/components/motion/Reveal";
import { getPublishedCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Published HIY Agency case studies and growth systems for websites, ads, automation, and content.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-black px-4 pb-24 pt-32 text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Work
            </p>
            <h1 className="masked-title mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.9] tracking-normal">
              Real businesses. Real systems. Real growth stories.
            </h1>
          </Reveal>

          <div className="mt-16">
            {caseStudies.length === 0 ? (
              <Reveal>
                <div className="grid min-h-[430px] place-items-center rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-8 text-center">
                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-white/35">
                      Case studies
                    </p>
                    <p className="mt-5 max-w-xl text-4xl font-semibold tracking-normal">
                      Case studies are being prepared. New work will be added soon.
                    </p>
                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                {caseStudies.map((study) => (
                  <article
                    className="rounded-[1.6rem] border border-white/10 bg-[#0b0b0b] p-6"
                    key={String(study.id)}
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                      {String(study.industry)}
                    </p>
                    <h2 className="mt-5 text-3xl font-semibold tracking-normal">
                      {String(study.client_name)}
                    </h2>
                    <p className="mt-4 text-white/55">{String(study.solution)}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

