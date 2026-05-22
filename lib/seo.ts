import { contactInfo } from "@/lib/content";

export const siteUrl = "https://hiy.agency";
export const siteName = "HIY Agency";
export const siteTitle = "HIY Agency | Websites, AI Automation & Growth Marketing";
export const siteDescription =
  "HIY Agency builds custom websites, AI automation, performance marketing, video editing, branding, SEO listings, copywriting, ad creatives, and growth systems for businesses.";

export const seoKeywords = [
  "HIY Agency",
  "HIY Agency India",
  "website development agency",
  "digital marketing agency",
  "AI automation agency",
  "AI systems agency",
  "performance marketing agency",
  "video editing agency",
  "branding agency",
  "SEO listings",
  "copywriting agency",
  "ad creative agency",
  "Google Business Profile setup",
  "growth systems agency",
  "landing page agency",
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
  description: siteDescription,
  email: contactInfo.email,
  telephone: `+91${contactInfo.phone}`,
  foundingDate: "2026",
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

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${siteUrl}/#local-business`,
  name: siteName,
  url: siteUrl,
  image: absoluteUrl("/icon.svg"),
  logo: absoluteUrl("/icon.svg"),
  description: siteDescription,
  email: contactInfo.email,
  telephone: `+91${contactInfo.phone}`,
  priceRange: "₹₹",
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
    {
      "@type": "Place",
      name: "Global remote clients",
    },
  ],
  sameAs: [
    contactInfo.instagram,
    contactInfo.linkedin,
    contactInfo.facebook,
  ],
};

export const serviceCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${siteUrl}/#service-catalog`,
  name: "HIY Agency service catalog",
  url: absoluteUrl("/services"),
  itemListElement: [
    "Custom Websites",
    "Performance Marketing",
    "Video Editing",
    "Automation & AI Systems",
    "Branding & Positioning",
    "Funnels & Landing Pages",
    "SEO Listings",
    "Copywriting",
    "Ad Creatives",
  ].map((name, index) => ({
    "@type": "Offer",
    position: index + 1,
    itemOffered: {
      "@type": "Service",
      name,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: ["India", "Global"],
    },
  })),
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
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/services?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
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

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
