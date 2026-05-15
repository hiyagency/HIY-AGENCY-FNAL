"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/public/SocialIcons";
import { contactInfo } from "@/lib/content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

const contactActions = [
  { label: "Call", href: contactInfo.call, icon: PhoneIcon },
  { label: "WhatsApp", href: contactInfo.whatsapp, icon: WhatsAppIcon },
  { label: "Instagram", href: contactInfo.instagram, icon: InstagramIcon },
  { label: "LinkedIn", href: contactInfo.linkedin, icon: LinkedinIcon },
];

export function PublicNav() {
  const pathname = usePathname();

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

        <div className="hidden items-center gap-1 rounded-full border border-[#7d97ff]/18 bg-[#07102a]/50 p-1 shadow-[0_12px_60px_rgba(36,59,255,0.14)] backdrop-blur-xl md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
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

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="border-[#7d97ff]/30 bg-[#f5f7ff] text-[#050505] md:hidden"
              size="icon"
              variant="outline"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-[#7d97ff]/20 bg-[#05070d] text-white">
            <SheetTitle className="text-left font-heading text-white">HIY AGENCY</SheetTitle>
            <div className="mt-10 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  className="rounded-2xl border border-[#7d97ff]/18 bg-[#07102a]/55 px-4 py-4 text-lg font-medium text-white/80"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-4 gap-2">
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
                className="mt-4 rounded-full bg-[#f5f7ff] px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#050505]"
                href="/contact"
              >
                Start Project
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
