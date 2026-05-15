import { saveContactSettingsAction, saveHeroSettingsAction } from "@/app/actions/site";
import { AdminCrudPanel } from "@/components/admin/AdminCrudPanel";
import { AdminPageHeader } from "@/components/admin/AdminPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactInfo, processSteps, whyHiy } from "@/lib/content";
import { getAdminSnapshot } from "@/lib/data";

const managementAreas = [
  "Hero Management",
  "Services Management",
  "Team Management",
  "Case Study Management",
  "About / Positioning Content",
  "Contact Info Management",
  "SEO Settings",
];

export default async function WebsiteManagementPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        eyebrow="Website"
        title="Website management"
        description="Editable content structure for hero copy, services, team, case studies, positioning, contact details, SEO metadata, and upload-backed media."
      />

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {managementAreas.map((area) => (
          <Card className="border-white/10 bg-[#0b0b0b] text-white" key={area}>
            <CardHeader>
              <CardTitle>{area}</CardTitle>
              <CardDescription>
                Stored in Supabase with timestamps, order fields, and published controls.
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        <form action={saveHeroSettingsAction}>
          <Card className="border-white/10 bg-[#0b0b0b] text-white">
            <CardHeader>
              <CardTitle>Hero Management</CardTitle>
              <CardDescription>
                Default production copy. Saves into the `site_settings` row for live editing.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Field label="Eyebrow" name="eyebrow" value="HIGH IMPACT DIGITAL AGENCY" />
              <Field
                label="Headline"
                name="headline"
                value="We build websites, ads, content, and systems that help businesses grow faster."
              />
              <Field
                label="Subheadline"
                name="subheadline"
                textarea
                value="HIY Agency creates custom websites, performance marketing campaigns, premium creatives, automation systems, and brand experiences for businesses that want more traffic, better leads, and stronger online presence."
              />
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Primary CTA" name="primaryCta" value="Start Your Project" />
                <Field label="Secondary CTA" name="secondaryCta" value="View Services" />
              </div>
              <Button className="rounded-full" type="submit">
                Save hero settings
              </Button>
            </CardContent>
          </Card>
        </form>

        <form action={saveContactSettingsAction}>
          <Card className="border-white/10 bg-[#0b0b0b] text-white">
            <CardHeader>
              <CardTitle>Contact Info Management</CardTitle>
              <CardDescription>
                Update phone, WhatsApp, email, Instagram, LinkedIn, Facebook, and optional address.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Field label="Phone" name="phone" value={contactInfo.phone} />
              <Field label="WhatsApp" name="whatsapp" value={contactInfo.whatsapp} />
              <Field label="Email" name="email" value={contactInfo.email} />
              <Field label="Instagram" name="instagram" value={contactInfo.instagram} />
              <Field label="LinkedIn" name="linkedin" value={contactInfo.linkedin} />
              <Field label="Facebook" name="facebook" value={contactInfo.facebook} />
              <Button className="rounded-full" type="submit">
                Save contact info
              </Button>
            </CardContent>
          </Card>
        </form>
      </section>

      <AdminCrudPanel
        moduleKey="services"
        rows={snapshot.services}
        title="Services Management"
        description="Add, edit, delete, order, feature, and publish public service cards."
        columns={[
          { key: "title", label: "Title" },
          { key: "short_title", label: "Short label" },
          { key: "slug", label: "Slug" },
          { key: "display_order", label: "Order" },
          { key: "featured", label: "Featured" },
          { key: "published", label: "Published" },
        ]}
      />
      <AdminCrudPanel
        moduleKey="team_members"
        rows={snapshot.teamMembers}
        title="Team Management"
        description="Manage public team cards, profile photos, bios, tags, order, and published state."
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "experience", label: "Experience" },
          { key: "tags", label: "Tags" },
          { key: "display_order", label: "Order" },
          { key: "published", label: "Published" },
        ]}
      />
      <AdminCrudPanel
        moduleKey="shipped_projects"
        rows={snapshot.shippedProjects}
        title="Shipped Projects Marquee"
        description="Manage flowing project names shown on the homepage marquee. Unpublished or empty data falls back to defaults."
        columns={[
          { key: "client_name", label: "Project name" },
          { key: "display_order", label: "Order" },
          { key: "published", label: "Published" },
        ]}
      />
      <AdminCrudPanel
        moduleKey="case_studies"
        rows={snapshot.caseStudies}
        title="Case Study Management"
        description="Create work showcase records with cover images, galleries, services, results, and publish controls."
        columns={[
          { key: "title", label: "Title" },
          { key: "client_name", label: "Client" },
          { key: "category", label: "Category" },
          { key: "cloudinary_public_id", label: "Cloudinary ID" },
          { key: "status", label: "Status" },
          { key: "featured", label: "Featured" },
          { key: "display_order", label: "Order" },
        ]}
      />
      <AdminCrudPanel
        moduleKey="website_images"
        rows={snapshot.mediaUploads}
        title="Website Images"
        description="Upload reusable website assets to the website-assets Supabase Storage bucket."
        columns={[
          { key: "purpose", label: "Purpose" },
          { key: "bucket", label: "Bucket" },
          { key: "public_url", label: "URL" },
        ]}
      />

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Process steps</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {processSteps.map((step) => (
              <div className="rounded-2xl border border-white/10 bg-black p-4" key={step.title}>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-white/50">{step.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[#0b0b0b] text-white">
          <CardHeader>
            <CardTitle>Why HIY section</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {whyHiy.map((item) => (
              <div className="rounded-2xl border border-white/10 bg-black p-4" key={item.title}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/50">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  textarea,
  value,
}: {
  label: string;
  name: string;
  textarea?: boolean;
  value: string;
}) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-[0.2em] text-white/42">{label}</Label>
      {textarea ? (
        <Textarea className="mt-2 min-h-28 bg-black text-white" defaultValue={value} name={name} />
      ) : (
        <Input className="mt-2 bg-black text-white" defaultValue={value} name={name} />
      )}
    </div>
  );
}
