import { AdminPageHeader, StatusBadge } from "@/components/admin/AdminPrimitives";
import { Progress } from "@/components/ui/progress";
import { getAdminSnapshot } from "@/lib/data";

const columns = ["Pending", "In Progress", "In Review", "Delivered", "Delayed"];

export default async function ProjectsPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Delivery"
        title="Works and projects"
        description="Kanban-style view for ongoing works, service category, assignment, priority, due dates, progress, delivery links, and payment linkage."
      />
      <section className="mt-8 grid gap-4 xl:grid-cols-5">
        {columns.map((column) => {
          const projects = snapshot.projects.filter((project) => project.status === column);
          return (
            <div className="rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-4" key={column}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold tracking-normal">{column}</h2>
                <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/45">
                  {projects.length}
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {projects.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/35">
                    No work in this stage.
                  </div>
                ) : (
                  projects.map((project) => (
                    <article className="rounded-2xl border border-white/10 bg-black p-4" key={project.title}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-semibold tracking-normal">{String(project.title)}</h3>
                        <StatusBadge value={String(project.priority)} />
                      </div>
                      <p className="mt-3 text-sm text-white/50">{String(project.service_category)}</p>
                      <Progress className="mt-5" value={Number(project.progress ?? 0)} />
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/36">
                        Due {String(project.due_date)}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

