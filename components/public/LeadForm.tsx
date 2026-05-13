"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createLeadAction } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { budgetOptions, leadWorkOptions } from "@/lib/content";
import { leadSchema, type LeadFormValues } from "@/lib/schemas";

export function LeadForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [workRequired, setWorkRequired] = useState<LeadFormValues["workRequired"]>("Website");
  const [budget, setBudget] = useState<LeadFormValues["budget"]>("₹25,000 - ₹50,000");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      workRequired: "Website",
      budget: "₹25,000 - ₹50,000",
      timelineDays: 21,
    },
  });

  function onSubmit(values: LeadFormValues) {
    setStatus(null);
    startTransition(async () => {
      const result = await createLeadAction(values);
      setStatus({ ok: result.ok, message: result.message });
      if (result.ok) {
        setWorkRequired("Website");
        setBudget("₹25,000 - ₹50,000");
        reset({
          name: "",
          phone: "",
          email: "",
          workRequired: "Website",
          budget: "₹25,000 - ₹50,000",
          timelineDays: 21,
          message: "",
        });
      }
    });
  }

  return (
    <form
      className="glass-panel rounded-[2rem] p-5 sm:p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input className="border-[#7d97ff]/18 bg-[#050505]/62 text-white placeholder:text-[#c7d1ff]/32" placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Phone Number" error={errors.phone?.message}>
          <Input className="border-[#7d97ff]/18 bg-[#050505]/62 text-white placeholder:text-[#c7d1ff]/32" placeholder="9109167827" {...register("phone")} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <Input
            className="border-[#7d97ff]/18 bg-[#050505]/62 text-white placeholder:text-[#c7d1ff]/32"
            placeholder="you@company.com"
            type="email"
            {...register("email")}
          />
        </Field>
        <Field label="Timeline in days" error={errors.timelineDays?.message}>
          <Input
            className="border-[#7d97ff]/18 bg-[#050505]/62 text-white"
            min={1}
            type="number"
            {...register("timelineDays", { valueAsNumber: true })}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Work Required" error={errors.workRequired?.message}>
          <Select
            onValueChange={(value) => {
              const nextValue = value as LeadFormValues["workRequired"];
              setWorkRequired(nextValue);
              setValue("workRequired", nextValue, {
                shouldValidate: true,
              });
            }}
            value={workRequired}
          >
            <SelectTrigger className="w-full border-[#7d97ff]/18 bg-[#050505]/62 text-white">
              <SelectValue placeholder="Select work" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {leadWorkOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Budget" error={errors.budget?.message}>
          <Select
            onValueChange={(value) => {
              const nextValue = value as LeadFormValues["budget"];
              setBudget(nextValue);
              setValue("budget", nextValue, {
                shouldValidate: true,
              });
            }}
            value={budget}
          >
            <SelectTrigger className="w-full border-[#7d97ff]/18 bg-[#050505]/62 text-white">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {budgetOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field className="mt-5" label="Message / Requirements" error={errors.message?.message}>
        <Textarea
          className="min-h-32 border-[#7d97ff]/18 bg-[#050505]/62 text-white placeholder:text-[#c7d1ff]/32"
          placeholder="Tell us what you want to build, improve, launch, or automate."
          {...register("message")}
        />
      </Field>

      {status ? (
        <div
          className={
            status.ok
              ? "mt-5 rounded-2xl border border-[#7d97ff]/25 bg-[#3f5bff]/18 px-4 py-3 text-sm font-medium text-white"
              : "mt-5 rounded-2xl border border-[#7d97ff]/20 bg-[#050505]/70 px-4 py-3 text-sm text-white"
          }
        >
          {status.message}
        </div>
      ) : null}

      <Button className="mt-6 h-12 w-full rounded-full bg-[#f5f7ff] font-bold uppercase tracking-[0.14em] text-[#050505] hover:shadow-[0_0_44px_rgba(63,91,255,0.48)]" disabled={isPending} size="lg" type="submit">
        {isPending ? <Loader2 className="animate-spin" /> : null}
        Tell us what you want to build
      </Button>
    </form>
  );
}

function Field({
  children,
  className,
  error,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  error?: string;
  label: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-[0.2em] text-[#9eb0ff]/62">{label}</Label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 text-xs text-[#c7d1ff]/70">{error}</p> : null}
    </div>
  );
}
