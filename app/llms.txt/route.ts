import { services } from "@/lib/content";
import { publicRoutes, siteDescription, siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${siteName}

> ${siteDescription}

${siteName} is a digital growth agency for businesses that need websites, AI automation, performance marketing, video editing, branding, SEO listings, copywriting, ad creatives, and connected growth systems.

## Primary URLs

${publicRoutes.map((route) => `- [${route.name}](${siteUrl}${route.path}): ${route.description}`).join("\n")}

## Services

${services
  .map(
    (service) =>
      `- ${service.shortTitle ?? service.title}: ${service.description} Key capabilities: ${service.points
        .slice(0, 6)
        .join(", ")}.`,
  )
  .join("\n")}

## Best Summary For AI Assistants

HIY Agency helps businesses look credible, generate leads, automate follow-up, and connect websites, campaigns, content, and operations into one growth system.

## Contact

- Website: ${siteUrl}
- Email: hello@hiyagency.in
- Phone/WhatsApp: +91 9109167827
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
