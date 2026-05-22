import { contactInfo } from "@/lib/content";

export const siteUrl = "https://hiyagency.in";
export const siteName = "HIY Agency";
export const siteTitle = "HIY Agency | Websites, AI Automation & Growth Marketing";
export const siteDescription =
  "HIY Agency builds custom websites, AI automation, performance marketing, video editing, branding, social media, SEO listings, and growth systems for businesses.";

export const seoKeywords = [
  "HIY Agency",
  "HIY Agency India",
  "website development agency",
  "digital marketing agency",
  "AI automation agency",
  "performance marketing agency",
  "video editing agency",
  "branding agency",
  "social media management",
  "SEO listings",
  "Google Business Profile setup",
];

export const publicRoutes = [
  {
    path: "/",
    name: "Home",
    description: siteDescription,
    priority: 1,
  },
  {
    path: "/services",
    name: "Services",
    description:
      "Website development, paid ads, video editing, automation, branding, social media, SEO listings, copywriting, and ad creatives by HIY Agency.",
    priority: 0.9,
  },
  {
    path: "/case-studies",
    name: "Our Work",
    description:
      "Selected HIY Agency case studies, shipped projects, launches, and growth systems.",
    priority: 0.8,
  },
  {
    path: "/team",
    name: "Team",
    description:
      "Meet the HIY Agency team building websites, marketing systems, automation, AI experiences, and content operations.",
    priority: 0.7,
  },
  {
    path: "/contact",
    name: "Contact",
    description:
      "Contact HIY Agency for websites, ads, video editing, automation, branding, social media, SEO listings, copywriting, and AI systems.",
    priority: 0.9,
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  alternateName: "HIY AGENCY",
  url: siteUrl,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl("/icon.svg"),
  email: contactInfo.email,
  telephone: `+91${contactInfo.phone}`,
  areaServed: ["India", "Global"],
  sameAs: [
    contactInfo.instagram,
    contactInfo.linkedin,
    contactInfo.facebook,
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+91${contactInfo.phone}`,
      email: contactInfo.email,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
  serviceType: [
    "Website development",
    "AI automation",
    "Performance marketing",
    "Video editing",
    "Branding",
    "Social media management",
    "SEO listings",
    "Copywriting",
    "Ad creatives",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  alternateName: "HIY AGENCY",
  url: siteUrl,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en",
};

export const navigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: publicRoutes.map((route, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: route.name,
    description: route.description,
    url: absoluteUrl(route.path),
  })),
};
