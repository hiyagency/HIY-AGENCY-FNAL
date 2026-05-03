import { AdminCrudPanel } from "@/components/admin/AdminCrudPanel";
import { AdminPageHeader } from "@/components/admin/AdminPrimitives";
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
      <AdminCrudPanel
        moduleKey="payments"
        rows={snapshot.payments}
        columns={[
          { key: "client_name", label: "Client" },
          { key: "project_title", label: "Project" },
          { key: "total_amount", label: "Total" },
          { key: "amount_paid", label: "Paid" },
          { key: "amount_pending", label: "Pending" },
          { key: "status", label: "Status" },
          { key: "due_date", label: "Due date" },
        ]}
      />
    </main>
  );
}
