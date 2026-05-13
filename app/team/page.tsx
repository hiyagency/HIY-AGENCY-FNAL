import type { Metadata } from "next";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
import { getPublishedTeamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the HIY Agency founding team building websites, ads, content, production systems, AI experiences, and automation for modern businesses.",
};

export default async function TeamPage() {
  const teamMembers = await getPublishedTeamMembers();

  return (
    <>
      <AmbientBackground />
      <PublicNav />
      <main className="relative z-10 px-4 pb-24 pt-32 text-[#f5f7ff] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9eb0ff]/62">
              Team
            </p>
            <h1 className="masked-title font-heading mt-6 max-w-6xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.86] tracking-normal">
              Operators building the systems behind modern growth.
            </h1>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {teamMembers.map((member) => (
              <Reveal key={member.name}>
                <article className="group rounded-[2rem] border border-[#7d97ff]/16 bg-[#05070d]/74 p-6 transition duration-500 hover:-translate-y-1 hover:border-[#7d97ff]/48 hover:shadow-[0_30px_110px_rgba(36,59,255,0.24)]">
                  <div className="grid aspect-[4/3] place-items-center rounded-[1.4rem] border border-[#7d97ff]/18 bg-[radial-gradient(circle_at_30%_20%,rgba(63,91,255,0.56),#050505_66%)] text-white">
                    <span className="font-heading text-7xl font-black tracking-normal">
                      {member.name
                        .split(" ")
                        .map((part: string) => part[0])
                        .join("")}
                    </span>
                  </div>
                  <p className="mt-8 text-xs uppercase tracking-[0.24em] text-[#9eb0ff]/50">
                    {member.experience}
                  </p>
                  <h2 className="font-heading mt-3 text-4xl font-semibold tracking-normal">
                    {member.name}
                  </h2>
                  <p className="mt-2 text-xl text-[#c7d1ff]/62">{member.role}</p>
                  <p className="mt-6 leading-8 text-[#c7d1ff]/60">{member.bio}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {member.tags.map((tag: string) => (
                      <span
                        className="rounded-full border border-[#7d97ff]/16 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#c7d1ff]/58"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
