import { AdminPageHeader, StatusBadge } from "@/components/admin/AdminPrimitives";
import { Button } from "@/components/ui/button";
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

export default async function LeadsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const snapshot = await getAdminSnapshot();
  const query = params?.q?.toLowerCase() ?? "";
  const status = params?.status ?? "";
  const leads = snapshot.leads.filter((lead) => {
    const matchesQuery =
      !query ||
      [lead.name, lead.email, lead.phone, lead.work_required]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesStatus = !status || lead.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="CRM"
        title="Lead management"
        description="Search, filter, qualify, follow up, and convert website enquiries into paying clients."
      />
      <form className="mt-8 grid gap-3 rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-4 md:grid-cols-[1fr_220px_auto]">
        <Input name="q" placeholder="Search name, phone, email, or service" defaultValue={params?.q} />
        <Input name="status" placeholder="Status filter" defaultValue={params?.status} />
        <Button type="submit">Filter Leads</Button>
      </form>
      <section className="mt-6 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0b]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Work Required</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={`${lead.email}-${lead.created_at}`}>
                <TableCell className="font-medium text-white">{String(lead.name)}</TableCell>
                <TableCell>{String(lead.phone)}</TableCell>
                <TableCell>{String(lead.email)}</TableCell>
                <TableCell>{String(lead.work_required)}</TableCell>
                <TableCell>{String(lead.budget)}</TableCell>
                <TableCell>{String(lead.timeline_days)} days</TableCell>
                <TableCell>
                  <StatusBadge value={String(lead.status)} />
                </TableCell>
                <TableCell>{String(lead.source)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
