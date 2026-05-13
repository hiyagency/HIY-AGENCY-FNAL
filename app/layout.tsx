import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
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
    default: "HIY AGENCY - Digital Infrastructure & Growth Systems",
    template: "%s | HIY AGENCY",
  },
  description:
    "HIY Agency builds premium websites, AI systems, automation infrastructure, content engines, and paid growth systems for ambitious modern businesses.",
  keywords: [
    "HIY Agency",
    "digital infrastructure",
    "premium websites",
    "AI systems",
    "growth agency",
    "automation studio",
  ],
  openGraph: {
    title: "HIY AGENCY - Digital Infrastructure & Growth Systems",
    description:
      "A futuristic premium growth agency for websites, AI experiences, automation, paid media, and business systems.",
    url: "https://hiyagency.in",
    siteName: "HIY AGENCY",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
        <SmoothScroll />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
