import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
  metadataBase: new URL("https://hiyagency.in"),
  title: {
    default: "HIY AGENCY - High Impact for You",
    template: "%s | HIY AGENCY",
  },
  description:
    "HIY Agency builds custom websites, performance marketing campaigns, premium creatives, automation systems, and CRM dashboards for growing businesses.",
  keywords: [
    "HIY Agency",
    "custom websites",
    "performance marketing",
    "video editing",
    "automation agency",
    "digital growth studio",
  ],
  openGraph: {
    title: "HIY AGENCY - High Impact for You",
    description:
      "A premium digital growth studio for websites, ads, content, automation, and business systems.",
    url: "https://hiyagency.in",
    siteName: "HIY AGENCY",
    type: "website",
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
      <body className="min-h-full bg-black text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
