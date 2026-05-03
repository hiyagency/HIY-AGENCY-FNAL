export type AdminFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "boolean"
  | "tags"
  | "image"
  | "images";

export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  uploadFolder?: string;
};

export type AdminModuleKey =
  | "leads"
  | "clients"
  | "projects"
  | "expenses"
  | "payments"
  | "employees"
  | "team_members"
  | "tasks"
  | "services"
  | "case_studies"
  | "website_images";

export type AdminModuleConfig = {
  key: AdminModuleKey;
  title: string;
  table: string;
  addLabel: string;
  revalidatePaths: string[];
  fields: AdminField[];
};

const leadStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost"];
const projectStatuses = ["Pending", "In Progress", "In Review", "Delivered", "Delayed"];
const clientStatuses = ["Not Started", "In Progress", "Review", "Delivered", "On Hold", "Cancelled"];
const priorities = ["Low", "Medium", "High", "Urgent"];
const taskStatuses = ["Todo", "In Progress", "Done", "Blocked"];
const paymentStatuses = ["Unpaid", "Partial", "Paid", "Overdue"];
const employeeStatuses = ["Active", "Inactive"];

export const adminModules = {
  leads: {
    key: "leads",
    title: "Lead",
    table: "leads",
    addLabel: "Add Lead",
    revalidatePaths: ["/admin", "/admin/leads"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "business_name", label: "Business name", type: "text" },
      { name: "phone", label: "Contact number", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "source", label: "Source", type: "text", placeholder: "Website" },
      { name: "work_required", label: "Required service", type: "text", required: true },
      { name: "budget", label: "Budget range", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: leadStatuses },
      { name: "follow_up_date", label: "Follow-up date", type: "date" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  clients: {
    key: "clients",
    title: "Client",
    table: "clients",
    addLabel: "Add Client",
    revalidatePaths: ["/admin", "/admin/clients"],
    fields: [
      { name: "client_name", label: "Name", type: "text", required: true },
      { name: "business_name", label: "Business name", type: "text" },
      { name: "phone", label: "Contact", type: "tel" },
      { name: "email", label: "Email", type: "email" },
      { name: "service_type", label: "Service type", type: "text" },
      { name: "project_status", label: "Status", type: "select", options: clientStatuses },
      { name: "payment_amount", label: "Project amount", type: "number" },
      { name: "amount_paid", label: "Amount paid", type: "number" },
      { name: "deadline", label: "Deadline", type: "date" },
      { name: "website_url", label: "Website URL", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  projects: {
    key: "projects",
    title: "Project",
    table: "projects",
    addLabel: "Add Project",
    revalidatePaths: ["/admin", "/admin/projects", "/case-studies"],
    fields: [
      { name: "title", label: "Project title", type: "text", required: true },
      { name: "service_category", label: "Project type", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: projectStatuses },
      { name: "priority", label: "Priority", type: "select", options: priorities },
      { name: "budget", label: "Budget", type: "number" },
      { name: "amount_paid", label: "Amount paid", type: "number" },
      { name: "progress", label: "Progress %", type: "number" },
      { name: "due_date", label: "Deadline", type: "date" },
      { name: "delivery_link", label: "Delivery link", type: "text" },
      { name: "published", label: "Published", type: "boolean" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  expenses: {
    key: "expenses",
    title: "Finance Record",
    table: "expenses",
    addLabel: "Add Expense",
    revalidatePaths: ["/admin", "/admin/finance"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "type", label: "Type", type: "select", options: ["income", "expense"] },
      { name: "amount", label: "Amount", type: "number", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          "Ads",
          "Software",
          "Hosting",
          "Domain",
          "Freelancer",
          "Employee payout",
          "Travel",
          "Client work expense",
          "Other",
        ],
      },
      { name: "expense_date", label: "Date", type: "date" },
      { name: "payment_method", label: "Payment method", type: "text" },
      { name: "receipt_url", label: "Receipt upload", type: "image", uploadFolder: "receipts" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  payments: {
    key: "payments",
    title: "Payment",
    table: "payments",
    addLabel: "Add Payment",
    revalidatePaths: ["/admin", "/admin/payments", "/admin/finance"],
    fields: [
      { name: "total_amount", label: "Total amount", type: "number", required: true },
      { name: "amount_paid", label: "Amount paid", type: "number" },
      { name: "status", label: "Status", type: "select", options: paymentStatuses },
      { name: "due_date", label: "Due date", type: "date" },
      { name: "paid_date", label: "Paid date", type: "date" },
      { name: "payment_method", label: "Payment method", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  employees: {
    key: "employees",
    title: "Employee / Team Member",
    table: "employees",
    addLabel: "Add Employee",
    revalidatePaths: ["/admin", "/admin/employees", "/team"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "email", label: "Email", type: "email" },
      { name: "skills", label: "Skills", type: "tags" },
      { name: "status", label: "Status", type: "select", options: employeeStatuses },
      { name: "payout_type", label: "Payout type", type: "select", options: ["Fixed", "Per Project", "Percentage", "Custom"] },
      { name: "total_payout_due", label: "Payout due", type: "number" },
      { name: "total_payout_paid", label: "Payout paid", type: "number" },
      { name: "photo_url", label: "Upload Photo", type: "image", uploadFolder: "team" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  team_members: {
    key: "team_members",
    title: "Team Member",
    table: "team_members",
    addLabel: "Add Team Member",
    revalidatePaths: ["/", "/team", "/admin/website-management"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "experience", label: "Experience", type: "text" },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "photo_url", label: "Upload Photo", type: "image", uploadFolder: "team" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  tasks: {
    key: "tasks",
    title: "Task",
    table: "tasks",
    addLabel: "Add Task",
    revalidatePaths: ["/admin", "/admin/todo"],
    fields: [
      { name: "title", label: "Task title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: taskStatuses },
      { name: "priority", label: "Priority", type: "select", options: priorities },
      { name: "due_date", label: "Due date", type: "date" },
      { name: "reminder_date", label: "Reminder date", type: "date" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  services: {
    key: "services",
    title: "Service",
    table: "services",
    addLabel: "Add Service",
    revalidatePaths: ["/", "/services", "/admin/website-management"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "short_title", label: "Short label", type: "text" },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "bullet_points", label: "Bullet points", type: "tags" },
      { name: "icon_name", label: "Icon / label", type: "text" },
      { name: "display_order", label: "Order", type: "number" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  case_studies: {
    key: "case_studies",
    title: "Case Study",
    table: "case_studies",
    addLabel: "Add Case Study",
    revalidatePaths: ["/", "/case-studies", "/admin/website-management"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "client_name", label: "Client name", type: "text", required: true },
      { name: "category", label: "Service provided", type: "text" },
      { name: "short_summary", label: "Short description", type: "textarea" },
      { name: "full_description", label: "Long description", type: "textarea" },
      { name: "services_delivered", label: "Services delivered", type: "tags" },
      { name: "results", label: "Result metric", type: "textarea" },
      { name: "cloudinary_public_id", label: "Cloudinary public ID", type: "text" },
      { name: "video_url", label: "Cloudinary video URL", type: "text" },
      { name: "use_poster_gallery_images", label: "Use poster/gallery images", type: "boolean" },
      { name: "cover_image_url", label: "Poster image", type: "image", uploadFolder: "case-covers" },
      { name: "gallery_images", label: "Gallery images", type: "images", uploadFolder: "case-gallery" },
      { name: "cta_text", label: "CTA text", type: "text", placeholder: "Build My Case Study" },
      { name: "website_url", label: "CTA link", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["Draft", "Published"] },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "display_order", label: "Sort order", type: "number" },
    ],
  },
  website_images: {
    key: "website_images",
    title: "Website Image",
    table: "media_uploads",
    addLabel: "Upload Photo",
    revalidatePaths: ["/admin/website-management"],
    fields: [
      { name: "purpose", label: "Purpose", type: "text", required: true },
      { name: "public_url", label: "Website image", type: "image", uploadFolder: "website" },
    ],
  },
} satisfies Record<AdminModuleKey, AdminModuleConfig>;

export function getAdminModule(key: AdminModuleKey) {
  return adminModules[key];
}
