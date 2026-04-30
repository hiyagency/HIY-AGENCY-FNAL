"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  FileCog,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/website-management", label: "Website Management", icon: FileCog },
  { href: "/admin/leads", label: "Leads", icon: BarChart3 },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/admin/finance", label: "Finance", icon: Wallet },
  { href: "/admin/employees", label: "Employees", icon: Users },
  { href: "/admin/todo", label: "Todo", icon: ListTodo },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function signOut() {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white lg:grid lg:grid-cols-[290px_1fr]">
      <aside className="border-b border-white/10 bg-[#080808] lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-20 items-center justify-between px-5 lg:h-auto lg:flex-col lg:items-start lg:gap-8 lg:px-6 lg:py-7">
          <Link href="/admin">
            <p className="text-3xl font-black tracking-normal">HIY</p>
            <p className="text-xs uppercase tracking-[0.28em] text-white/42">Agency Admin</p>
          </Link>
          <Button className="lg:hidden" size="icon" variant="outline" asChild>
            <Link href="/admin/todo">
              <ClipboardList />
            </Link>
          </Button>
        </div>
        <nav className="hidden px-3 pb-6 lg:block">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/58 transition hover:bg-white/10 hover:text-white",
                  active && "bg-white text-black hover:bg-white hover:text-black",
                )}
                href={item.href}
                key={item.href}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
          <Button
            className="mt-4 w-full justify-start rounded-2xl"
            onClick={signOut}
            variant="outline"
          >
            <LogOut />
            Sign out
          </Button>
        </nav>
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs text-white/65"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

