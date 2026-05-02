import { AdminCrudPanel } from "@/components/admin/AdminCrudPanel";
import { AdminPageHeader, StatusBadge } from "@/components/admin/AdminPrimitives";
import { getAdminSnapshot } from "@/lib/data";

const columns = ["Todo", "In Progress", "Done", "Blocked"];

export default async function TodoPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Tasks"
        title="Todo board"
        description="A delivery board for tasks by client, project, employee, priority, due date, reminder date, and internal notes."
      />
      <section className="mt-8 grid gap-4 lg:grid-cols-4">
        {columns.map((column) => {
          const tasks = snapshot.tasks.filter((task) => task.status === column);
          return (
            <div className="rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-4" key={column}>
              <h2 className="font-semibold tracking-normal">{column}</h2>
              <div className="mt-4 grid gap-3">
                {tasks.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/35">
                    No tasks here.
                  </div>
                ) : (
                  tasks.map((task) => (
                    <article className="rounded-2xl border border-white/10 bg-black p-4" key={String(task.title)}>
                      <h3 className="font-semibold tracking-normal">{String(task.title)}</h3>
                      <p className="mt-3 text-sm text-white/50">
                        Assigned to {String(task.assigned_employee ?? "Unassigned")}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <StatusBadge value={String(task.priority)} />
                        <StatusBadge value={`Due ${String(task.due_date)}`} />
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>
      <AdminCrudPanel
        moduleKey="tasks"
        rows={snapshot.tasks}
        columns={[
          { key: "title", label: "Task" },
          { key: "assigned_employee", label: "Owner" },
          { key: "status", label: "Status" },
          { key: "priority", label: "Priority" },
          { key: "due_date", label: "Due date" },
          { key: "reminder_date", label: "Reminder" },
          { key: "notes", label: "Notes" },
        ]}
      />
    </main>
  );
}
