import Link from "next/link";
import { Sparkles } from "lucide-react";
import { contactInfo } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#7d97ff]/14 bg-[#050505] px-4 py-14 text-[#f5f7ff] sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 bottom-0 select-none font-heading text-[18vw] font-black leading-none tracking-normal text-[#3f5bff]/[0.04]">
        HIY
      </div>
      <div className="absolute left-0 top-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(63,91,255,0.8),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl border border-[#7d97ff]/22 bg-[#3f5bff]/14">
              <Sparkles className="size-5 text-[#9eb0ff]" />
            </span>
            <p className="font-heading text-4xl font-black tracking-normal">HIY AGENCY</p>
          </div>
          <p className="mt-4 max-w-sm text-lg text-[#9eb0ff]/72">
            Digital infrastructure for high-impact growth.
          </p>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#c7d1ff]/48">
            Premium websites, AI systems, automation, content engines, paid media,
            and CRM infrastructure for businesses moving into their next digital layer.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9eb0ff]/55">
            Systems
          </p>
          <div className="mt-5 grid gap-3 text-sm text-[#c7d1ff]/70">
            <Link href="/services">Premium Websites</Link>
            <Link href="/services">Performance Growth</Link>
            <Link href="/services">Automation & AI Systems</Link>
            <Link href="/services">Content Operations</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9eb0ff]/55">
            Contact
          </p>
          <div className="mt-5 grid gap-3 text-sm text-[#c7d1ff]/70">
            <Link href={contactInfo.whatsapp}>WhatsApp / Call: {contactInfo.phone}</Link>
            <Link href={contactInfo.instagram}>Instagram: {contactInfo.instagramHandle}</Link>
            <Link href={contactInfo.facebook}>Facebook</Link>
            <Link href="/contact">Start Project</Link>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#7d97ff]/14 pt-6 text-xs uppercase tracking-[0.22em] text-[#9eb0ff]/45 md:flex-row md:items-center md:justify-between">
        <p>Copyright {year} HIY Agency. All rights reserved.</p>
        <p>Built for clarity, speed, systems, and impact.</p>
      </div>
    </footer>
  );
}
