"use client";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(420px_circle_at_50%_30%,rgba(63,91,255,0.20),transparent_62%)]" />
      <div
        className="absolute -left-[12vw] top-[-18vh] h-[62vh] w-[72vw] bg-[radial-gradient(ellipse_at_center,rgba(36,59,255,0.54),rgba(36,59,255,0.18)_38%,transparent_70%)] blur-3xl"
      />
      <div
        className="absolute right-[-24vw] top-[10vh] h-[84vh] w-[70vw] bg-[radial-gradient(ellipse_at_center,rgba(63,91,255,0.28),rgba(9,19,83,0.20)_42%,transparent_72%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(63,91,255,0.08)_1px,transparent_1px),linear-gradient(rgba(63,91,255,0.07)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(63,91,255,0.08)_22%,transparent_42%,rgba(245,247,255,0.05)_58%,transparent_76%)] opacity-70" />
      <div className="absolute inset-0 ambient-noise opacity-[0.08]" />
    </div>
  );
}
