import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyShowcase } from "@/components/public/CaseStudyShowcase";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
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
              Selected Work
            </h1>
          </Reveal>

          <div className="mt-16">
            <CaseStudyShowcase caseStudies={caseStudies} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
