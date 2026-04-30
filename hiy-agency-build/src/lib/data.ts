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
  const [leads, clients, projects, employees, tasks, payments] = await Promise.all([
    readTable("leads", sampleLeads),
    readTable("clients", sampleClients),
    readTable("projects", sampleProjects),
    readTable("employees", sampleEmployees),
    readTable("tasks", sampleTasks),
    readTable("payments", samplePayments),
  ]);

  const totalCollected = payments.reduce(
    (sum, payment) => sum + Number(payment.amount_paid ?? 0),
    0,
  );
  const totalPending = payments.reduce(
    (sum, payment) => sum + Number(payment.amount_pending ?? 0),
    0,
  );
  const totalExpenses = 18000;
  const employeePayoutsPending = employees.reduce(
    (sum, employee) => sum + Number(employee.payout_due ?? 0),
    0,
  );

  return {
    leads,
    clients,
    projects,
    employees,
    tasks,
    payments,
    metrics: {
      totalLeads: leads.length,
      newLeads: leads.filter((lead) => lead.status === "New").length,
      convertedLeads: leads.filter((lead) => lead.status === "Converted").length,
      totalClients: clients.length,
      ongoingWorks: projects.filter((project) => project.status !== "Delivered").length,
      deliveredWorks: projects.filter((project) => project.status === "Delivered").length,
      paymentsCollected: totalCollected,
      paymentsPending: totalPending,
      totalIncome: totalCollected + totalPending,
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
