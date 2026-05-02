import { AdminCrudPanel } from "@/components/admin/AdminCrudPanel";
import { AdminPageHeader, MetricCard, currency } from "@/components/admin/AdminPrimitives";
import { RevenueChart } from "@/components/admin/AdminCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminSnapshot } from "@/lib/data";

export default async function FinancePage() {
  const snapshot = await getAdminSnapshot();
  const { metrics } = snapshot;

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Money"
        title="Finance"
        description="Income, collected payments, pending revenue, expenses, employee payouts, and project-level profit are calculated from CRM records."
      />
      <section className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Total income" value={currency(metrics.totalIncome)} />
        <MetricCard label="Collected" value={currency(metrics.paymentsCollected)} />
        <MetricCard label="Pending" value={currency(metrics.paymentsPending)} />
        <MetricCard label="Expenses" value={currency(metrics.totalExpenses)} />
        <MetricCard label="Payouts pending" value={currency(metrics.employeePayoutsPending)} />
        <MetricCard label="Net profit" value={currency(metrics.netProfit)} />
      </section>
      <section className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Monthly income chart</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Pending payment list</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshot.payments.map((payment) => (
                  <TableRow key={`${payment.client}-${payment.project}`}>
                    <TableCell>{String(payment.client)}</TableCell>
                    <TableCell>{String(payment.project)}</TableCell>
                    <TableCell>{currency(Number(payment.amount_pending ?? 0))}</TableCell>
                    <TableCell>{String(payment.due_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
      <AdminCrudPanel
        moduleKey="expenses"
        rows={snapshot.expenses}
        title="Income and expense records"
        description="Add income, operating expenses, client work expenses, receipts, and payment notes. Dashboard totals update from these rows."
        columns={[
          { key: "title", label: "Title" },
          { key: "type", label: "Type" },
          { key: "amount", label: "Amount" },
          { key: "category", label: "Category" },
          { key: "expense_date", label: "Date" },
          { key: "payment_method", label: "Method" },
        ]}
      />
    </main>
  );
}
