"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/public/SocialIcons";
import { contactInfo } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

const socialClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-[#7d97ff]/20 bg-[#07102a]/55 text-[#c7d1ff]/75 transition hover:-translate-y-0.5 hover:border-[#9eb0ff]/65 hover:bg-[#f5f7ff] hover:text-[#050505] hover:shadow-[0_0_28px_rgba(63,91,255,0.28)]";
const mobileSocialClass = socialClass.replace("size-10", "size-11");

const contactActions = [
  { label: "Call", href: contactInfo.call, icon: PhoneIcon },
  { label: "WhatsApp", href: contactInfo.whatsapp, icon: WhatsAppIcon },
  { label: "Instagram", href: contactInfo.instagram, icon: InstagramIcon },
  { label: "LinkedIn", href: contactInfo.linkedin, icon: LinkedinIcon },
];

export function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#7d97ff]/15 bg-[#05070d]/62 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="group flex items-center gap-3" href="/" aria-label="HIY Agency home">
          <span className="grid size-11 place-items-center overflow-hidden rounded-2xl border border-[#7d97ff]/25 bg-[#050505] shadow-[0_0_42px_rgba(63,91,255,0.28)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden="true"
              className="size-full object-cover"
              src="/icon.svg"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-2xl font-black tracking-normal text-white">HIY</span>
            <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#9eb0ff]/75">
              Agency
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-[#7d97ff]/18 bg-[#07102a]/50 p-1 shadow-[0_12px_60px_rgba(36,59,255,0.14)] backdrop-blur-xl lg:flex">
          {navItems.map((item) => (
            <Link
              className={cn(
                "rounded-full px-4 py-2 text-sm text-[#c7d1ff]/64 transition hover:bg-[#3f5bff]/18 hover:text-white",
                pathname === item.href && "bg-[#3f5bff] text-white shadow-[0_0_30px_rgba(63,91,255,0.38)] hover:bg-[#3f5bff] hover:text-white",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5 rounded-full border border-[#7d97ff]/14 bg-[#05070d]/45 p-1">
            {contactActions.map(({ label, href, icon: Icon }) => (
              <Link
                aria-label={label}
                className={socialClass}
                href={href}
                key={label}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
          <Link
            className="rounded-full border border-[#7d97ff]/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#c7d1ff]/75 transition hover:border-[#9eb0ff]/70 hover:bg-[#0b1b63]/35 hover:text-white"
            href="/admin/login"
          >
            Admin
          </Link>
          <Link
            className="rounded-full bg-[#f5f7ff] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-[#050505] shadow-[0_0_38px_rgba(63,91,255,0.35)] transition hover:shadow-[0_0_54px_rgba(63,91,255,0.56)]"
            href="/contact"
          >
            Start Project
          </Link>
        </div>

        <Button
          aria-controls="mobile-nav-panel"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="size-11 border-[#7d97ff]/30 bg-[#f5f7ff] text-[#050505] lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          size="icon"
          type="button"
          variant="outline"
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {mobileOpen ? (
        <div className="fixed inset-0 top-20 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-[#050505]/68 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
          <div
            className="absolute right-4 top-4 max-h-[calc(100dvh-7rem)] w-[min(calc(100vw-2rem),22rem)] overflow-y-auto rounded-[1.6rem] border border-[#7d97ff]/20 bg-[#05070d]/96 p-5 text-white shadow-[0_28px_100px_rgba(36,59,255,0.24)]"
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-heading text-lg font-black tracking-normal text-white">HIY AGENCY</p>
              <button
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-[#7d97ff]/20 bg-[#07102a]/70 text-[#f5f7ff]"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-7 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  className="rounded-2xl border border-[#7d97ff]/18 bg-[#07102a]/55 px-4 py-4 text-lg font-medium text-white/80"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-4 gap-2">
                {contactActions.map(({ label, href, icon: Icon }) => (
                  <Link
                    aria-label={label}
                    className={mobileSocialClass}
                    href={href}
                    key={label}
                    onClick={() => setMobileOpen(false)}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
              <Link
                className="mt-4 rounded-full bg-[#f5f7ff] px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#050505]"
                href="/contact"
                onClick={() => setMobileOpen(false)}
              >
                Start Project
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
