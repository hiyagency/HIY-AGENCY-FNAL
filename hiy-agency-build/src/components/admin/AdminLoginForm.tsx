"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLoginSchema, type AdminLoginValues } from "@/lib/schemas";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  function onSubmit(values: AdminLoginValues) {
    setMessage(null);
    startTransition(async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { error } = await supabase.auth.signInWithPassword(values);

        if (error) {
          setMessage("Login failed. Check the single admin email and password.");
          return;
        }

        router.push(searchParams.get("next") || "/admin");
        router.refresh();
      } catch {
        setMessage(
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        );
      }
    });
  }

  return (
    <form
      className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6 shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">Admin Login</p>
      <h1 className="mt-4 text-4xl font-black tracking-normal">HIY Agency OS</h1>
      <p className="mt-3 leading-7 text-white/55">
        Single admin access for website management, leads, clients, projects,
        finance, todos, and payments.
      </p>

      <div className="mt-8 grid gap-5">
        <div>
          <Label className="text-xs uppercase tracking-[0.2em] text-white/45">Email</Label>
          <Input
            className="mt-2 bg-black/50 text-white"
            placeholder="admin@hiyagency.in"
            type="email"
            {...register("email")}
          />
          {errors.email ? <p className="mt-2 text-xs text-white/55">{errors.email.message}</p> : null}
        </div>
        <div>
          <Label className="text-xs uppercase tracking-[0.2em] text-white/45">Password</Label>
          <Input
            className="mt-2 bg-black/50 text-white"
            placeholder="********"
            type="password"
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-2 text-xs text-white/55">{errors.password.message}</p>
          ) : null}
        </div>
      </div>

      {message ? (
        <div className="mt-5 rounded-2xl border border-white/15 bg-black px-4 py-3 text-sm text-white/68">
          {message}
        </div>
      ) : null}

      <Button className="mt-6 w-full rounded-full" disabled={isPending} size="lg" type="submit">
        {isPending ? <Loader2 className="animate-spin" /> : null}
        Enter Admin Panel
      </Button>
    </form>
  );
}

