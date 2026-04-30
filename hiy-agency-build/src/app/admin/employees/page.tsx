import { AdminPageHeader, StatusBadge, currency } from "@/components/admin/AdminPrimitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminSnapshot } from "@/lib/data";

export default async function EmployeesPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="People"
        title="Employees and payouts"
        description="Track agency people, skills, status, payout type, assigned works, completed works, delayed works, and payout due."
      />
      <section className="mt-8 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0b]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payout type</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snapshot.employees.map((employee) => (
              <TableRow key={String(employee.name)}>
                <TableCell className="font-medium text-white">{String(employee.name)}</TableCell>
                <TableCell>{String(employee.role)}</TableCell>
                <TableCell>
                  <StatusBadge value={String(employee.status)} />
                </TableCell>
                <TableCell>{String(employee.payout_type)}</TableCell>
                <TableCell>{currency(Number(employee.payout_due ?? 0))}</TableCell>
                <TableCell>{currency(Number(employee.payout_paid ?? 0))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
