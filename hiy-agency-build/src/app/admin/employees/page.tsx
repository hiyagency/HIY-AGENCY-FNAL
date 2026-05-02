import { AdminCrudPanel } from "@/components/admin/AdminCrudPanel";
import { AdminPageHeader } from "@/components/admin/AdminPrimitives";
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
      <AdminCrudPanel
        moduleKey="employees"
        rows={snapshot.employees}
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
          { key: "payout_type", label: "Payout type" },
          { key: "total_payout_due", label: "Due" },
          { key: "total_payout_paid", label: "Paid" },
        ]}
      />
    </main>
  );
}
