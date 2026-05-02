import { Badge } from "@/components/ui/badge";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/38">{eyebrow}</p>
      <h1 className="text-4xl font-black tracking-normal sm:text-6xl">{title}</h1>
      <p className="max-w-3xl text-base leading-7 text-white/55">{description}</p>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <article className="rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-white/36">{label}</p>
      <p className="mt-5 text-3xl font-bold tracking-normal text-white">{value}</p>
      {note ? <p className="mt-2 text-xs text-white/45">{note}</p> : null}
    </article>
  );
}

export function StatusBadge({ value }: { value: string }) {
  return (
    <Badge className="rounded-full border-white/10 bg-white/10 px-3 py-1 text-white hover:bg-white/10">
      {value}
    </Badge>
  );
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

