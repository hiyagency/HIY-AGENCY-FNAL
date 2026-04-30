import { AdminPageHeader, MetricCard, StatusBadge, currency } from "@/components/admin/AdminPrimitives";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <section className="mt-6 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0b]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Pending</TableHead>
              <TableHead>Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snapshot.clients.map((client) => {
              const amount = Number(client.payment_amount ?? 0);
              const amountPaid = Number(client.amount_paid ?? 0);
              return (
                <TableRow key={`${client.client_name}-${client.business_name}`}>
                  <TableCell className="font-medium text-white">{String(client.client_name)}</TableCell>
                  <TableCell>{String(client.business_name)}</TableCell>
                  <TableCell>{String(client.service_type)}</TableCell>
                  <TableCell>
                    <StatusBadge value={String(client.project_status)} />
                  </TableCell>
                  <TableCell>{currency(amount)}</TableCell>
                  <TableCell>{currency(amountPaid)}</TableCell>
                  <TableCell>{currency(amount - amountPaid)}</TableCell>
                  <TableCell>{String(client.deadline)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
