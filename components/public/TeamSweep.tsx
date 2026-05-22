"use client";

import { motion, useReducedMotion } from "framer-motion";

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

const ease = [0.22, 1, 0.36, 1] as const;

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.article
      className="group grid grid-cols-[4rem_1fr] gap-4 rounded-[1.25rem] border border-[#7d97ff]/16 bg-[#07102a]/40 p-4 transition-colors duration-300 md:grid-cols-[8.5rem_1fr] md:gap-5 md:rounded-[2rem] md:p-6 md:hover:border-[#7d97ff]/40 md:hover:bg-[#10246d]/24"
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease },
        },
      }}
    >
      <div className="grid aspect-square size-16 place-items-center rounded-[1rem] border border-[#7d97ff]/18 bg-[radial-gradient(circle_at_30%_20%,rgba(63,91,255,0.48),#050505_66%)] text-white md:size-auto md:min-h-34 md:rounded-[1.3rem]">
        <span className="font-heading text-2xl font-black tracking-normal md:text-5xl">
          {member.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.22em] text-[#9eb0ff]/55 md:text-sm">
          {member.experience}
        </p>
        <h3 className="font-heading mt-3 text-2xl font-semibold leading-tight tracking-normal md:text-3xl">
          {member.name}
        </h3>
        <p className="mt-1 text-base text-[#c7d1ff]/62 md:text-lg">{member.role}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#c7d1ff]/60 md:mt-4 md:text-base md:leading-7">
          {member.bio}
        </p>
        <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
          {member.tags.slice(0, 5).map((tag) => (
            <span
              className="rounded-full border border-[#7d97ff]/16 px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-[#c7d1ff]/58 md:text-xs md:tracking-[0.14em]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function TeamSweep({ teamMembers }: TeamSweepProps) {
  const reducedMotion = useReducedMotion();

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mt-7 grid gap-4 md:mt-9 md:grid-cols-2"
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {teamMembers.map((member) => (
        <TeamCard key={member.name} member={member} />
      ))}
    </motion.div>
  );
}
