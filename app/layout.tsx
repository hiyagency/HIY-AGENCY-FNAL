import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import {
  absoluteUrl,
  jsonLdScript,
  localBusinessJsonLd,
  navigationJsonLd,
  organizationJsonLd,
  serviceCatalogJsonLd,
  seoKeywords,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: "%s | HIY Agency",
  },
  description: siteDescription,
  keywords: seoKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: absoluteUrl("/icon.svg"),
        width: 512,
        height: 512,
        alt: "HIY Agency logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [absoluteUrl("/icon.svg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    other: {
      "facebook-domain-verification": "rl9p3vt413qa50ffoll05p2c1fshuu",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-[#f5f7ff]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([
              organizationJsonLd,
              localBusinessJsonLd,
              websiteJsonLd,
              navigationJsonLd,
              serviceCatalogJsonLd,
            ]),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
