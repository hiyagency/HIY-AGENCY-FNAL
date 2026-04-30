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

export default async function PaymentsPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Payments"
        title="Payment tracking"
        description="Track total amount, paid amount, pending amount, payment status, due dates, payment method, and notes."
      />
      <section className="mt-8 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0b]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Pending</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snapshot.payments.map((payment) => (
              <TableRow key={`${payment.client}-${payment.project}`}>
                <TableCell className="font-medium text-white">{String(payment.client)}</TableCell>
                <TableCell>{String(payment.project)}</TableCell>
                <TableCell>{currency(Number(payment.total_amount ?? 0))}</TableCell>
                <TableCell>{currency(Number(payment.amount_paid ?? 0))}</TableCell>
                <TableCell>{currency(Number(payment.amount_pending ?? 0))}</TableCell>
                <TableCell>
                  <StatusBadge value={String(payment.payment_status)} />
                </TableCell>
                <TableCell>{String(payment.due_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
