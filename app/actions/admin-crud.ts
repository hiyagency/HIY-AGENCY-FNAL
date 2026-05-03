"use server";

import { revalidatePath } from "next/cache";
import { getAdminModule, type AdminModuleKey } from "@/lib/admin-config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SavePayload = Record<string, unknown> & { id?: string };

async function assertAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("You must be signed in to manage admin records.");
  }

  return supabase;
}

function cleanPayload(moduleKey: AdminModuleKey, payload: SavePayload) {
  const moduleConfig = getAdminModule(moduleKey);
  const allowedFields = new Set(moduleConfig.fields.map((field) => field.name));
  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (key === "id" || !allowedFields.has(key)) {
      continue;
    }

    const field = moduleConfig.fields.find((item) => item.name === key);
    if (!field) {
      continue;
    }

    if (value === "" || value === undefined) {
      cleaned[key] = null;
      continue;
    }

    if (field.type === "number") {
      cleaned[key] = Number(value) || 0;
      continue;
    }

    if (field.type === "boolean") {
      cleaned[key] = Boolean(value);
      continue;
    }

    if (["tags", "images"].includes(field.type)) {
      if (Array.isArray(value)) {
        cleaned[key] = value.filter(Boolean);
      } else {
        cleaned[key] = String(value)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      continue;
    }

    if (moduleKey === "case_studies" && key === "results") {
      cleaned[key] = String(value).trim() ? { summary: String(value).trim() } : {};
      continue;
    }

    cleaned[key] = value;
  }

  if (moduleKey === "services" && !cleaned.slug && cleaned.title) {
    cleaned.slug = String(cleaned.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (moduleKey === "website_images") {
    cleaned.bucket = "website-assets";
    cleaned.path = cleaned.public_url;
  }

  return cleaned;
}

export async function saveAdminRecord(moduleKey: AdminModuleKey, payload: SavePayload) {
  const moduleConfig = getAdminModule(moduleKey);
  const supabase = await assertAdmin();
  const cleaned = cleanPayload(moduleKey, payload);

  if (payload.id) {
    const { error } = await supabase.from(moduleConfig.table).update(cleaned).eq("id", payload.id);
    if (error) {
      return { ok: false, message: error.message };
    }
  } else {
    const { error } = await supabase.from(moduleConfig.table).insert(cleaned);
    if (error) {
      return { ok: false, message: error.message };
    }
  }

  moduleConfig.revalidatePaths.forEach((path) => revalidatePath(path));

  return {
    ok: true,
    message: payload.id ? `${moduleConfig.title} updated.` : `${moduleConfig.title} created.`,
  };
}

export async function deleteAdminRecord(moduleKey: AdminModuleKey, id: string) {
  const moduleConfig = getAdminModule(moduleKey);
  const supabase = await assertAdmin();
  const { error } = await supabase.from(moduleConfig.table).delete().eq("id", id);

  if (error) {
    return { ok: false, message: error.message };
  }

  moduleConfig.revalidatePaths.forEach((path) => revalidatePath(path));

  return {
    ok: true,
    message: `${moduleConfig.title} deleted.`,
  };
}
