import type { Metadata } from "next";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyShowcase } from "@/components/public/CaseStudyShowcase";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
import { getPublishedCaseStudies } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Work & Case Studies",
  description:
    "Published HIY Agency case studies and growth systems for websites, ads, automation, AI systems, and content.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "HIY Agency Work and Case Studies",
    description:
      "Published case studies, shipped projects, launches, and growth systems from HIY Agency.",
    url: absoluteUrl("/case-studies"),
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <>
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 min-h-screen px-4 pb-16 pt-28 text-[#f5f7ff] sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/62">
              Work
            </p>
            <h1 className="masked-title font-heading mt-6 max-w-6xl text-[clamp(2.55rem,11vw,3.6rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3.5rem,8vw,8rem)] sm:leading-[0.86]">
              Selected systems, launches, and growth infrastructure.
            </h1>
          </Reveal>

          <div className="mt-10 sm:mt-16">
            <CaseStudyShowcase caseStudies={caseStudies} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
