import { Reveal } from "@/components/motion/Reveal";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  experience: string;
  tags: string[];
};

type TeamSweepProps = {
  teamMembers: TeamMember[];
};

function TeamCard({
  member,
  clone = false,
}: {
  member: TeamMember;
  clone?: boolean;
}) {
  return (
    <article
      aria-hidden={clone || undefined}
      className="group grid min-h-[420px] w-[min(82vw,560px)] shrink-0 snap-center gap-6 rounded-[2rem] border border-[#7d97ff]/16 bg-[#07102a]/40 p-6 transition duration-700 hover:-translate-y-1 hover:border-[#7d97ff]/44 hover:bg-[#10246d]/30 hover:shadow-[0_24px_90px_rgba(36,59,255,0.2)] md:w-[620px] md:grid-cols-[180px_1fr]"
    >
      <div className="grid aspect-square place-items-center rounded-[1.3rem] border border-[#7d97ff]/18 bg-[radial-gradient(circle_at_30%_20%,rgba(63,91,255,0.56),#050505_66%)] text-white shadow-[0_0_60px_rgba(63,91,255,0.22)]">
        <span className="font-heading text-6xl font-black tracking-normal">
          {member.name
            .split(" ")
            .map((part: string) => part[0])
            .join("")}
        </span>
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-[#9eb0ff]/55">
          {member.experience}
        </p>
        <h3 className="font-heading mt-3 text-3xl font-semibold tracking-normal">
          {member.name}
        </h3>
        <p className="mt-1 text-lg text-[#c7d1ff]/62">{member.role}</p>
        <p className="mt-5 leading-7 text-[#c7d1ff]/60">{member.bio}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {member.tags.map((tag: string) => (
            <span
              className="rounded-full border border-[#7d97ff]/16 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#c7d1ff]/58"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function TeamSweep({ teamMembers }: TeamSweepProps) {
  if (teamMembers.length === 0) {
    return null;
  }

  const sweepMembers = teamMembers.length > 1 ? [...teamMembers, ...teamMembers] : teamMembers;

  return (
    <Reveal delay={0.12}>
      <div className="team-sweep-shell mt-6 overflow-hidden rounded-[2rem] border border-[#7d97ff]/12 bg-[#05070d]/30 py-4">
        <div className="team-sweep-track flex w-max gap-5 px-4">
          {sweepMembers.map((member, index) => (
            <TeamCard
              clone={index >= teamMembers.length}
              key={`${member.name}-${index}`}
              member={member}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
