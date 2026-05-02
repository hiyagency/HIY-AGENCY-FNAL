"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiyAgencyLogo } from "@/components/shared/HiyAgencyLogo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="group" href="/" aria-label="HIY Agency home">
          <HiyAgencyLogo className="w-[150px] sm:w-[168px]" priority />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <Link
              className={cn(
                "rounded-full px-4 py-2 text-sm text-white/58 transition hover:bg-white/10 hover:text-white",
                pathname === item.href && "bg-white text-black hover:bg-white hover:text-black",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:border-white hover:bg-white hover:text-black"
            href="/admin/login"
          >
            Admin
          </Link>
          <Link
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-[#d8d8d8]"
            href="/contact"
          >
            Start Project
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="border-white/20 bg-white text-black md:hidden"
              size="icon"
              variant="outline"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-white/10 bg-black text-white">
            <SheetTitle className="text-left text-white">HIY AGENCY</SheetTitle>
            <div className="mt-10 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  className="rounded-2xl border border-white/10 px-4 py-4 text-lg font-medium text-white/80"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="mt-4 rounded-full bg-white px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-black"
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

