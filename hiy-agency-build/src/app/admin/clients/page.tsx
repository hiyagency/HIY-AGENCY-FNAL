import { AdminCrudPanel } from "@/components/admin/AdminCrudPanel";
import { AdminPageHeader, MetricCard, currency } from "@/components/admin/AdminPrimitives";
import { Input } from "@/components/ui/input";
import { getAdminSnapshot } from "@/lib/data";

export default async function ClientsPage() {
  const snapshot = await getAdminSnapshot();
  const totalValue = snapshot.clients.reduce(
    (sum, client) => sum + Number(client.payment_amount ?? 0),
    0,
  );
  const paid = snapshot.clients.reduce((sum, client) => sum + Number(client.amount_paid ?? 0), 0);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="CRM"
        title="Clients"
        description="Track client records, service type, project status, payment value, delivery deadline, notes, files, and social or website links."
      />
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricCard label="Total clients" value={snapshot.clients.length} />
        <MetricCard label="Booked value" value={currency(totalValue)} />
        <MetricCard label="Collected" value={currency(paid)} />
      </section>
      <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-4">
        <Input placeholder="Search clients by name, business, service, status, or deadline" />
      </div>
      <AdminCrudPanel
        moduleKey="clients"
        rows={snapshot.clients}
        columns={[
          { key: "client_name", label: "Client" },
          { key: "business_name", label: "Business" },
          { key: "service_type", label: "Service" },
          { key: "project_status", label: "Status" },
          { key: "payment_amount", label: "Amount" },
          { key: "amount_paid", label: "Paid" },
          { key: "deadline", label: "Deadline" },
        ]}
      />
    </main>
  );
}
