import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/public/Footer";
import { LeadForm } from "@/components/public/LeadForm";
import { PublicNav } from "@/components/public/PublicNav";
import { SocialIconLinks } from "@/components/public/SocialIconLinks";
import { Reveal } from "@/components/motion/Reveal";
import { contactInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a HIY Agency project for websites, ads, video editing, automation, branding, social media, SEO listings, or copywriting.",
};

export default function ContactPage() {
  return (
    <>
      <PublicNav />
      <main className="bg-black px-4 pb-24 pt-32 text-white sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                Contact
              </p>
              <h1 className="masked-title mt-6 text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.9] tracking-normal">
                Ready to create something high impact?
              </h1>
              <p className="mt-7 text-xl leading-8 text-white/60">
                Whether you need a website, ad campaign, video system, automation setup,
                or complete digital growth package - HIY Agency can help you build it
                with clarity and premium execution.
              </p>
              <div className="mt-8 grid gap-3">
                <Link className="text-white/75 underline underline-offset-4" href={contactInfo.whatsapp}>
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

