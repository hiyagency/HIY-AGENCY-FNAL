"use server";

import { leadSchema, type LeadFormValues } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LeadActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof LeadFormValues, string>>;
};

export async function createLeadAction(
  values: LeadFormValues,
): Promise<LeadActionState> {
  const parsed = leadSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce<
      Partial<Record<keyof LeadFormValues, string>>
    >(
      (errors, issue) => {
        const field = issue.path[0] as keyof LeadFormValues;
        errors[field] = issue.message;
        return errors;
      },
      {},
    );

    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      work_required: parsed.data.workRequired,
      budget: parsed.data.budget,
      timeline_days: parsed.data.timelineDays,
      message: parsed.data.message,
      source: "Website",
      status: "New",
    });

    if (error) {
      return {
        ok: false,
        message: "We could not save your request. Please call or WhatsApp us directly.",
      };
    }

    return {
      ok: true,
      message:
        "Your request has been received. Our team will contact you within 24 hours.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Supabase is not configured yet. Add the environment variables, then submit again.",
    };
  }
}
