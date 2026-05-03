import { AdminPageHeader, MetricCard, currency } from "@/components/admin/AdminPrimitives";
import { LeadStatusChart, RevenueChart, WorkStatusChart } from "@/components/admin/AdminCharts";
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

export default async function AdminDashboardPage() {
  const snapshot = await getAdminSnapshot();
  const { metrics } = snapshot;

  const metricCards = [
    ["Total leads", metrics.totalLeads],
    ["New leads", metrics.newLeads],
    ["Converted leads", metrics.convertedLeads],
    ["Total clients", metrics.totalClients],
    ["Projects", metrics.totalProjects],
    ["Employees", metrics.activeEmployees],
    ["Case studies", metrics.totalCaseStudies],
    ["Finance records", metrics.totalFinanceRecords],
    ["Ongoing works", metrics.ongoingWorks],
    ["Delivered works", metrics.deliveredWorks],
    ["Total payments", currency(metrics.totalPayments)],
    ["Payments collected", currency(metrics.paymentsCollected)],
    ["Payments to collect", currency(metrics.paymentsPending)],
    ["Total income", currency(metrics.totalIncome)],
    ["Total expenses", currency(metrics.totalExpenses)],
    ["Net profit", currency(metrics.netProfit)],
    ["Pending tasks", metrics.pendingTasks],
    ["Overdue tasks", metrics.overdueTasks],
    ["Payouts pending", currency(metrics.employeePayoutsPending)],
    ["Upcoming deadlines", metrics.upcomingDeadlines.length],
  ];

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Command Center"
        title="Agency dashboard"
        description="A single premium control room for leads, clients, projects, payments, expenses, todos, and upcoming delivery pressure."
      />
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map(([label, value]) => (
          <MetricCard key={label} label={String(label)} value={value} />
        ))}
      </section>
      {snapshot.errors.length > 0 ? (
        <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-[#0b0b0b] p-4 text-sm leading-6 text-white/58">
          Some dashboard data could not be loaded from Supabase. Check table access or RLS:
          {" "}
          {snapshot.errors.join(" | ")}
        </div>
      ) : null}
      {snapshot.usingDemoData ? (
        <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-[#0b0b0b] p-4 text-sm leading-6 text-white/58">
          Supabase is not configured, so the dashboard is showing demo-only admin data.
        </div>
      ) : null}

      <section className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Revenue and expense pulse</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={snapshot.charts.revenue} />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Lead status</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadStatusChart data={snapshot.charts.leads} />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Work status</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkStatusChart data={snapshot.charts.work} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Recent leads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Work</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshot.leads.slice(0, 5).map((lead) => (
                  <TableRow key={`${lead.email}-${lead.created_at}`}>
                    <TableCell>{String(lead.name)}</TableCell>
                    <TableCell>{String(lead.work_required)}</TableCell>
                    <TableCell>{String(lead.status)}</TableCell>
                    <TableCell>{String(lead.budget)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Pending todos and deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshot.tasks.slice(0, 5).map((task) => (
                  <TableRow key={`${task.title}-${task.due_date}`}>
                    <TableCell>{String(task.title)}</TableCell>
                    <TableCell>{String(task.assigned_employee ?? "Unassigned")}</TableCell>
                    <TableCell>{String(task.priority)}</TableCell>
                    <TableCell>{String(task.due_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
