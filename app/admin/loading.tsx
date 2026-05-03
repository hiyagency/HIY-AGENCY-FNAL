export default function AdminLoading() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-4 w-40 rounded-full bg-white/10" />
      <div className="mt-5 h-14 max-w-xl rounded-2xl bg-white/10" />
      <div className="mt-4 h-6 max-w-3xl rounded-full bg-white/10" />
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-5" key={index}>
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <div className="mt-5 h-8 w-20 rounded-xl bg-white/10" />
          </div>
        ))}
      </section>
      <section className="mt-8 grid gap-5 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="h-80 rounded-[1.4rem] border border-white/10 bg-[#0b0b0b]" key={index} />
        ))}
      </section>
    </main>
  );
}
