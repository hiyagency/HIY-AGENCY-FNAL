import { AdminPageHeader } from "@/components/admin/AdminPrimitives";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Settings"
        title="Admin settings"
        description="Single-admin configuration, SEO defaults, storage buckets, and environment readiness for the HIY Agency production setup."
      />
      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>
              Meta title, description, OG image, keywords, and sitemap-ready page structure.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field label="Meta title" value="HIY AGENCY - High Impact for You" />
            <Field
              label="Meta description"
              value="Premium digital growth studio for websites, ads, content, automation, and business systems."
            />
            <Field label="Keywords" value="websites, ads, automation, video editing, digital agency" />
            <Field label="OG image path" value="/og-image.png" />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Storage buckets</CardTitle>
            <CardDescription>
              Supabase Storage supports team photos, case study covers, galleries, receipt uploads, and website media.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-white/60">
            <p>team-photos</p>
            <p>case-study-covers</p>
            <p>case-study-galleries</p>
            <p>receipt-uploads</p>
            <p>website-images</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-[0.2em] text-white/42">{label}</Label>
      <Input className="mt-2 bg-black text-white" defaultValue={value} />
    </div>
  );
}
