import { Reveal } from "@/components/motion/Reveal";

type ClientProofSectionProps = {
  clients: string[];
};

export function ClientProofSection({ clients }: ClientProofSectionProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/60">
                Trusted by
              </p>
              <h2 className="font-heading mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-black leading-[0.92] tracking-normal">
                Systems shipped for brands that needed clarity, speed, and trust.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#c7d1ff]/58">
              Websites, campaigns, and growth infrastructure delivered across finance,
              retail, education, and local business.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client, index) => (
            <Reveal delay={index * 0.05} key={client}>
              <div className="group flex h-full min-h-[88px] items-center justify-center rounded-2xl border border-[#7d97ff]/16 bg-[#07102a]/42 px-4 py-5 text-center transition duration-500 hover:-translate-y-1 hover:border-[#7d97ff]/44 hover:bg-[#10246d]/28 hover:shadow-[0_18px_60px_rgba(36,59,255,0.18)]">
                <p className="font-heading text-sm font-semibold leading-snug text-[#dfe5ff] transition group-hover:text-white sm:text-base">
                  {client}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


