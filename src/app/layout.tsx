import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

// Self-hosted WOFF2 (SIL OFL). Geist = display + UI; Instrument Serif italic = single accent word.
const serif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-serif-accent", display: "swap", preload: true, adjustFontFallback: "Times New Roman",
});
const geist = GeistSans; // --font-geist-sans
const geistMono = GeistMono; // --font-geist-mono

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} — Digital Experiences. Smarter Growth.`, template: `%s · ${site.brand}` },
  description: site.positioning,
  openGraph: { type: "website", siteName: site.brand, images: ["/og/default.png"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#F4F3EF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${geist.variable} ${geistMono.variable}`}>
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
