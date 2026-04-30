import type { Metadata } from "next";
import { Footer } from "@/components/public/Footer";
import { PublicNav } from "@/components/public/PublicNav";
import { Reveal } from "@/components/motion/Reveal";
import { getPublishedTeamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the HIY Agency founding team building websites, ads, content, production systems, and automation for modern businesses.",
};

export default async function TeamPage() {
  const teamMembers = await getPublishedTeamMembers();

  return (
    <>
      <PublicNav />
      <main className="bg-black px-4 pb-24 pt-32 text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Team
            </p>
            <h1 className="masked-title mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.9] tracking-normal">
              Young, sharp, execution-led, and built around modern business growth.
            </h1>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {teamMembers.map((member) => (
              <Reveal key={member.name}>
                <article className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6">
                  <div className="grid aspect-[4/3] place-items-center rounded-[1.4rem] bg-white text-black">
                    <span className="text-7xl font-black tracking-normal">
                      {member.name
                        .split(" ")
                        .map((part: string) => part[0])
                        .join("")}
                    </span>
                  </div>
                  <p className="mt-8 text-xs uppercase tracking-[0.24em] text-white/35">
                    {member.experience}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-normal">
                    {member.name}
                  </h2>
                  <p className="mt-2 text-xl text-white/58">{member.role}</p>
                  <p className="mt-6 leading-8 text-white/60">{member.bio}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {member.tags.map((tag: string) => (
                      <span
                        className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/55"
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

