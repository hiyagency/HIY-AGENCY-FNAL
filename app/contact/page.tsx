import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/public/Footer";
import { LeadForm } from "@/components/public/LeadForm";
import { PublicNav } from "@/components/public/PublicNav";
import { SocialIconLinks } from "@/components/public/SocialIconLinks";
import { contactInfo } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact HIY Agency",
  description:
    "Start a HIY Agency project for websites, ads, video editing, automation, branding, social media, SEO listings, copywriting, AI systems, or growth infrastructure.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact HIY Agency",
    description:
      "Start a website, marketing, video, automation, branding, SEO listings, copywriting, or AI systems project with HIY Agency.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <>
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 px-4 pb-16 pt-28 text-[#f5f7ff] sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/62">
                Contact
              </p>
              <h1 className="masked-title font-heading mt-6 text-[clamp(2.55rem,11vw,3.6rem)] font-black leading-[0.9] tracking-normal sm:text-[clamp(3.5rem,8vw,8rem)] sm:leading-[0.86]">
                Build the next layer of your digital presence.
              </h1>
              <p className="mt-6 text-base leading-7 text-[#c7d1ff]/62 sm:mt-7 sm:text-xl sm:leading-8">
                Website, campaign, video system, automation setup, or complete
                growth package - HIY Agency can shape it with premium execution.
              </p>
              <div className="mt-8 grid gap-3">
                <Link className="text-[#9eb0ff] underline underline-offset-4" href={contactInfo.whatsapp}>
                  WhatsApp / Call: {contactInfo.phone}
                </Link>
              </div>
              <SocialIconLinks className="mt-6" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <LeadForm />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
