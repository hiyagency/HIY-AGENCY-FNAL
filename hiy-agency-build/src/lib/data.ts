import {
  sampleClients,
  sampleEmployees,
  sampleLeads,
  samplePayments,
  sampleProjects,
  sampleTasks,
  services,
  teamMembers,
} from "@/lib/content";
import { canReadSupabase, createSupabaseServerClient } from "@/lib/supabase/server";

type SupabaseRow = Record<string, unknown>;

async function readTable<T extends SupabaseRow>(
  table: string,
  fallback: T[],
  orderColumn = "created_at",
) {
  if (!canReadSupabase()) {
    return fallback;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderColumn, { ascending: false });

    if (error || !data) {
      return fallback;
    }

    return data as T[];
  } catch {
    return fallback;
  }
}

export async function getAdminTable<T extends SupabaseRow>(
  table: string,
  fallback: T[] = [],
  orderColumn = "created_at",
) {
  return readTable(table, fallback, orderColumn);
}

export async function getPublishedServices() {
  if (!canReadSupabase()) {
    return services;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return services;
    }

    return data.map((service) => {
      const fallback = services.find((item) => item.slug === service.slug);
      return {
        slug: service.slug,
        title: service.title,
        shortTitle: service.short_title ?? service.title,
        description: service.description,
        points: service.bullet_points ?? [],
        icon: fallback?.icon ?? services[0].icon,
      };
    });
  } catch {
    return services;
  }
}

export async function getPublishedTeamMembers() {
  if (!canReadSupabase()) {
    return teamMembers;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return teamMembers;
    }

    return data.map((member) => ({
      name: member.name,
      role: member.role,
      bio: member.bio,
      experience: member.experience,
      tags: member.tags ?? [],
      photo_url: member.photo_url,
    }));
  } catch {
    return teamMembers;
  }
}

export async function getPublishedCaseStudies() {
  if (!canReadSupabase()) {
    return [];
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("status", "Published")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

export async function getAdminSnapshot() {
  const [leads, clients, projects, employees, teamRows, tasks, payments, expenses, servicesRows, caseStudies, mediaUploads] = await Promise.all([
    readTable("leads", sampleLeads as SupabaseRow[]),
    readTable("clients", sampleClients as SupabaseRow[]),
    readTable("projects", sampleProjects as SupabaseRow[]),
    readTable("employees", sampleEmployees as SupabaseRow[]),
    readTable("team_members", [] as SupabaseRow[]),
    readTable("tasks", sampleTasks as SupabaseRow[]),
    readTable("payments", samplePayments as SupabaseRow[]),
    readTable("expenses", [] as SupabaseRow[]),
    readTable("services", [] as SupabaseRow[]),
    readTable("case_studies", [] as SupabaseRow[]),
    readTable("media_uploads", [] as SupabaseRow[]),
  ]);

  const totalCollected = payments.reduce(
    (sum, payment) => sum + Number(payment.amount_paid ?? 0),
    0,
  );
  const totalPending = payments.reduce(
    (sum, payment) =>
      sum +
      Number(
        payment.amount_pending ??
          Math.max(Number(payment.total_amount ?? 0) - Number(payment.amount_paid ?? 0), 0),
      ),
    0,
  );
  const manualIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((sum, expense) => sum + Number(expense.amount ?? 0), 0);
  const totalExpenses = expenses
    .filter((expense) => expense.type !== "income")
    .reduce((sum, expense) => sum + Number(expense.amount ?? 0), 0);
  const employeePayoutsPending = employees.reduce(
    (sum, employee) => sum + Number(employee.total_payout_due ?? employee.payout_due ?? 0),
    0,
  );

  return {
    leads,
    clients,
    projects,
    employees,
    teamMembers: teamRows,
    tasks,
    payments,
    expenses,
    services: servicesRows,
    caseStudies,
    mediaUploads,
    metrics: {
      totalLeads: leads.length,
      newLeads: leads.filter((lead) => lead.status === "New").length,
      convertedLeads: leads.filter((lead) => lead.status === "Converted").length,
      totalClients: clients.length,
      ongoingWorks: projects.filter((project) => project.status !== "Delivered").length,
      deliveredWorks: projects.filter((project) => project.status === "Delivered").length,
      paymentsCollected: totalCollected,
      paymentsPending: totalPending,
      totalIncome: totalCollected + totalPending + manualIncome,
      totalExpenses,
      netProfit: totalCollected - totalExpenses - employeePayoutsPending,
      pendingTasks: tasks.filter((task) => task.status !== "Done").length,
      overdueTasks: tasks.filter((task) => {
        if (!task.due_date) return false;
        return new Date(String(task.due_date)) < new Date() && task.status !== "Done";
      }).length,
      employeePayoutsPending,
      upcomingDeadlines: tasks.filter((task) => task.due_date).slice(0, 5),
    },
  };
}
