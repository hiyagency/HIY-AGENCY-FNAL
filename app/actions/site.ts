"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function saveHeroSettingsAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("site_settings").upsert(
    {
      key: "hero",
      value: {
        eyebrow: formData.get("eyebrow"),
        headline: formData.get("headline"),
        subheadline: formData.get("subheadline"),
        primaryCta: formData.get("primaryCta"),
        secondaryCta: formData.get("secondaryCta"),
      },
    },
    { onConflict: "key" },
  );

  revalidatePath("/");
  revalidatePath("/admin/website-management");
}

export async function saveContactSettingsAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("site_settings").upsert(
    {
      key: "contact",
      value: {
        phone: formData.get("phone"),
        whatsapp: formData.get("whatsapp"),
        email: formData.get("email"),
        instagram: formData.get("instagram"),
        facebook: formData.get("facebook"),
      },
    },
    { onConflict: "key" },
  );

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/website-management");
}
