import Link from "next/link";
import { contactInfo } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 bottom-0 select-none text-[18vw] font-black leading-none tracking-[-0.1em] text-white/[0.03]">
        HIY
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-4xl font-black tracking-normal">HIY AGENCY</p>
          <p className="mt-3 max-w-sm text-lg text-white/60">High Impact for You.</p>
          <p className="mt-6 max-w-md text-sm leading-6 text-white/45">
            Websites, ads, content, automation, and CRM systems for businesses
            that want sharper online presence and better leads.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
            Services
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <Link href="/services">Custom Websites</Link>
            <Link href="/services">Performance Marketing</Link>
            <Link href="/services">Automation & AI Systems</Link>
            <Link href="/services">SEO Listings</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
            Contact
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <Link href={contactInfo.whatsapp}>WhatsApp / Call: {contactInfo.phone}</Link>
            <Link href={contactInfo.instagram}>Instagram: {contactInfo.instagramHandle}</Link>
            <Link href={contactInfo.facebook}>Facebook</Link>
            <Link href="/contact">Start Project</Link>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-white/40 md:flex-row md:items-center md:justify-between">
        <p>Copyright {year} HIY Agency. All rights reserved.</p>
        <p>Built for clarity, speed, and impact.</p>
      </div>
    </footer>
  );
}

