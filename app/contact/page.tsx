import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/public/Footer";
import { LeadForm } from "@/components/public/LeadForm";
import { PublicNav } from "@/components/public/PublicNav";
import { SocialIconLinks } from "@/components/public/SocialIconLinks";
import { contactInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a HIY Agency project for websites, ads, video editing, automation, branding, social media, SEO listings, copywriting, AI systems, or growth infrastructure.",
};

export default function ContactPage() {
  return (
    <>
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 px-4 pb-24 pt-32 text-[#f5f7ff] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/62">
                Contact
              </p>
              <h1 className="masked-title font-heading mt-6 text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.86] tracking-normal">
                Build the next layer of your digital presence.
              </h1>
              <p className="mt-7 text-xl leading-8 text-[#c7d1ff]/62">
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
