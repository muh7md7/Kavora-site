import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

// Self-hosted WOFF2 (OFL / Geist licence). Display face preloaded only; size-adjusted fallback.
const barlow = localFont({
  src: [
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow", display: "swap", preload: true, adjustFontFallback: "Arial",
});
const geist = GeistSans; // variable --font-geist-sans
const geistMono = GeistMono; // variable --font-geist-mono

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} — Digital Experiences. Smarter Growth.`, template: `%s · ${site.brand}` },
  description: site.positioning,
  openGraph: { type: "website", siteName: site.brand, images: ["/og/default.png"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#F8F7F3", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
