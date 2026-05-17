import type { Metadata, Viewport } from "next";
import Analytics from "@/components/Analytics";
import GrainOverlay from "@/components/GrainOverlay";
import GridBackground from "@/components/GridBackground";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const siteUrl = `https://${siteConfig.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0E12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Web fonts as progressive enhancement: non-blocking, with system
            fallbacks in CSS so the app renders even if Google is unreachable
            (build/SSR never depends on fetching these). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="font-sans antialiased bg-void text-text-primary">
        <GridBackground />
        {children}
        <GrainOverlay />
        <Analytics />
      </body>
    </html>
  );
}
