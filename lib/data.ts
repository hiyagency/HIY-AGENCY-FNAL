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
import { getCloudinaryPosterUrl, getCloudinaryVideoUrl } from "@/lib/cloudinary";
import { canReadSupabase, createSupabaseServerClient } from "@/lib/supabase/server";

type SupabaseRow = Record<string, unknown>;
type TableResult<T extends SupabaseRow> = {
  rows: T[];
  error?: string;
  usedFallback: boolean;
};

export type PublicCaseStudy = {
  id: string;
  title: string;
  clientName: string;
  service: string;
  problem: string;
  solution: string;
  result: string;
  industry: string;
  imageUrl: string | null;
  videoUrl: string;
  posterUrl: string;
  hasVideo: boolean;
  href: string;
  ctaLabel: string;
  services: string[];
};

function cleanText(value: unknown) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim();
  if (!text || ["null", "undefined", "n/a", "na", "-"].includes(text.toLowerCase())) {
    return "";
  }
  return text;
}

function numberValue(value: unknown) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function resultText(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return cleanText(value);
  if (Array.isArray(value)) {
    return value.map(cleanText).filter(Boolean).join(" | ");
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const preferred = cleanText(record.summary) || cleanText(record.result) || cleanText(record.metric);
    if (preferred) return preferred;

    return Object.entries(record)
      .map(([key, entry]) => {
        const text = cleanText(entry);
        return text ? `${key}: ${text}` : "";
      })
      .filter(Boolean)
      .join(" | ");
  }
  return "";
}

function normalizeCaseStudy(study: SupabaseRow): PublicCaseStudy {
  const title = cleanText(study.title);
  const clientName = cleanText(study.client_name);
  const service =
    cleanText(study.category) ||
    cleanText(study.project_type) ||
    cleanText(study.industry) ||
    "Growth system";
  const services = Array.isArray(study.services_delivered)
    ? study.services_delivered.map(cleanText).filter(Boolean).slice(0, 4)
    : [];
  const cloudinaryPublicId = cleanText(study.cloudinary_public_id);
  const rawVideoUrl = cleanText(study.video_url);
  const coverImage = cleanText(study.cover_image_url);
  const videoUrl = getCloudinaryVideoUrl({
    publicId: cloudinaryPublicId,
    secureUrl: rawVideoUrl,
  });
  const posterUrl = getCloudinaryPosterUrl({
    publicId: cloudinaryPublicId,
    secureUrl: rawVideoUrl,
    posterUrl: coverImage,
  });

  return {
    id: cleanText(study.id) || `${clientName}-${title || service}`,
    title: title || `${clientName || "Business"} growth story`,
    clientName: clientName || "Featured client",
    service,
    problem:
      cleanText(study.problem) ||
      cleanText(study.short_summary) ||
      "The business needed a clearer digital presence and a stronger path from attention to enquiries.",
    solution:
      cleanText(study.solution) ||
      cleanText(study.full_description) ||
      "HIY Agency shaped the strategy, visual system, conversion flow, and launch-ready execution around the business goal.",
    result:
      resultText(study.results) ||
      cleanText(study.result_metric) ||
      cleanText(study.short_summary) ||
      "A cleaner brand experience built to create trust and convert more conversations.",
    industry: cleanText(study.industry) || service,
    imageUrl: coverImage || posterUrl || null,
    videoUrl,
    posterUrl,
    hasVideo: Boolean(videoUrl),
    href: cleanText(study.website_url) || "/contact",
    ctaLabel:
      cleanText(study.cta_text) ||
      (cleanText(study.website_url) ? "View project" : "Build My Case Study"),
    services,
  };
}

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

async function readAdminTable<T extends SupabaseRow>(
  table: string,
  fallback: T[],
  orderColumn = "created_at",
  supabase?: Awaited<ReturnType<typeof createSupabaseServerClient>>,
): Promise<TableResult<T>> {
  if (!canReadSupabase()) {
    return { rows: fallback, usedFallback: true };
  }

  try {
    const client = supabase ?? (await createSupabaseServerClient());
    const { data, error } = await client
      .from(table)
      .select("*")
      .order(orderColumn, { ascending: false });

    if (error) {
      return { rows: [], error: `${table}: ${error.message}`, usedFallback: false };
    }

    return { rows: (data ?? []) as T[], usedFallback: false };
  } catch (error) {
    return {
      rows: [],
      error: `${table}: ${error instanceof Error ? error.message : "Unable to load data"}`,
      usedFallback: false,
    };
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
    return [] as PublicCaseStudy[];
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

    return data.map((study) => normalizeCaseStudy(study as SupabaseRow));
  } catch {
    return [] as PublicCaseStudy[];
  }
}

export async function getAdminSnapshot() {
  const supabase = canReadSupabase() ? await createSupabaseServerClient() : undefined;
  const results = await Promise.all([
    readAdminTable("leads", sampleLeads as SupabaseRow[], "created_at", supabase),
    readAdminTable("clients", sampleClients as SupabaseRow[], "created_at", supabase),
    readAdminTable("projects", sampleProjects as SupabaseRow[], "created_at", supabase),
    readAdminTable("employees", sampleEmployees as SupabaseRow[], "created_at", supabase),
    readAdminTable("team_members", [] as SupabaseRow[], "created_at", supabase),
    readAdminTable("tasks", sampleTasks as SupabaseRow[], "created_at", supabase),
    readAdminTable("payments", samplePayments as SupabaseRow[], "created_at", supabase),
    readAdminTable("expenses", [] as SupabaseRow[], "created_at", supabase),
    readAdminTable("services", [] as SupabaseRow[], "created_at", supabase),
    readAdminTable("case_studies", [] as SupabaseRow[], "created_at", supabase),
    readAdminTable("media_uploads", [] as SupabaseRow[], "created_at", supabase),
  ]);

  const [
    leadsResult,
    clientsResult,
    projectsResult,
    employeesResult,
    teamRowsResult,
    tasksResult,
    paymentsResult,
    expensesResult,
    servicesRowsResult,
    caseStudiesResult,
    mediaUploadsResult,
  ] = results;

  const leads = leadsResult.rows;
  const clients = clientsResult.rows;
  const projects = projectsResult.rows;
  const employees = employeesResult.rows;
  const teamRows = teamRowsResult.rows;
  const tasks = tasksResult.rows;
  const payments = (paymentsResult.rows as SupabaseRow[]).map((payment): SupabaseRow => {
    const client = clients.find((item) => item.id === payment.client_id);
    const project = projects.find((item) => item.id === payment.project_id);
    return {
      ...payment,
      client_name: payment.client_name ?? client?.client_name ?? client?.business_name,
      project_title: payment.project_title ?? project?.title,
    };
  });
  const expenses = expensesResult.rows;
  const servicesRows = servicesRowsResult.rows;
  const caseStudies = caseStudiesResult.rows;
  const mediaUploads = mediaUploadsResult.rows;

  const totalCollected = payments.reduce(
    (sum, payment) => sum + numberValue(payment.amount_paid),
    0,
  );
  const totalPaymentValue = payments.reduce(
    (sum, payment) => sum + numberValue(payment.total_amount),
    0,
  );
  const totalPending = payments.reduce(
    (sum, payment) =>
      sum +
      numberValue(
        payment.amount_pending ??
          Math.max(numberValue(payment.total_amount) - numberValue(payment.amount_paid), 0),
      ),
    0,
  );
  const manualIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((sum, expense) => sum + numberValue(expense.amount), 0);
  const totalExpenses = expenses
    .filter((expense) => expense.type !== "income")
    .reduce((sum, expense) => sum + numberValue(expense.amount), 0);
  const employeePayoutsPending = employees.reduce(
    (sum, employee) => sum + numberValue(employee.total_payout_due ?? employee.payout_due),
    0,
  );
  const errors = results.map((result) => result.error).filter(Boolean) as string[];

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
    errors,
    usingDemoData: results.some((result) => result.usedFallback),
    charts: {
      revenue: buildRevenueChart(payments, expenses),
      leads: countByStatus(leads, ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost"]),
      work: countByStatus(projects, ["Pending", "In Progress", "In Review", "Delivered", "Delayed"]),
    },
    metrics: {
      totalLeads: leads.length,
      newLeads: leads.filter((lead) => lead.status === "New").length,
      convertedLeads: leads.filter((lead) => lead.status === "Converted").length,
      totalClients: clients.length,
      totalProjects: projects.length,
      activeEmployees: employees.filter((employee) => employee.status !== "Inactive").length,
      totalCaseStudies: caseStudies.length,
      totalFinanceRecords: expenses.length + payments.length,
      ongoingWorks: projects.filter((project) => project.status !== "Delivered").length,
      deliveredWorks: projects.filter((project) => project.status === "Delivered").length,
      totalPayments: totalPaymentValue,
      paymentsCollected: totalCollected,
      paymentsPending: totalPending,
      totalIncome: totalCollected + manualIncome,
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

function countByStatus(rows: SupabaseRow[], statuses: string[]) {
  return statuses
    .map((status) => ({
      status,
      value: rows.filter((row) => row.status === status || row.project_status === status).length,
    }))
    .filter((item) => item.value > 0);
}

function monthKey(value: unknown) {
  const date = value ? new Date(String(value)) : new Date();
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString("en-IN", { month: "short" });
}

function buildRevenueChart(payments: SupabaseRow[], expenses: SupabaseRow[]) {
  const months = new Map<string, { month: string; income: number; expenses: number }>();

  for (const payment of payments) {
    const month = monthKey(payment.paid_date ?? payment.created_at ?? payment.due_date);
    const current = months.get(month) ?? { month, income: 0, expenses: 0 };
    current.income += numberValue(payment.amount_paid);
    months.set(month, current);
  }

  for (const expense of expenses) {
    const month = monthKey(expense.expense_date ?? expense.created_at);
    const current = months.get(month) ?? { month, income: 0, expenses: 0 };
    if (expense.type === "income") {
      current.income += numberValue(expense.amount);
    } else {
      current.expenses += numberValue(expense.amount);
    }
    months.set(month, current);
  }

  return Array.from(months.values()).slice(-6);
}
