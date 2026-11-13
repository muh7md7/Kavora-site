import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  variable: "--font-serif-accent", display: "swap", preload: false, adjustFontFallback: "Times New Roman",
});
// Self-hosted subsets (scripts/subset-fonts.mjs): 141 KB of variable fonts cut to 38 KB,
// which was the single biggest item on the critical path for mobile LCP.
const geist = localFont({ src: "../fonts/Geist-subset.woff2", variable: "--font-geist-sans", weight: "100 900", display: "swap", preload: true,
  fallback: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"], adjustFontFallback: "Arial" });
// Mono is decorative (eyebrows, numbers): not preloaded, so it never competes with the LCP headline.

const geistMono = localFont({ src: "../fonts/GeistMono-subset.woff2", variable: "--font-geist-mono", weight: "100 900", display: "swap", preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"], adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} — Build, grow and automate your business`, template: `%s · ${site.brand}` },
  description: site.supporting,
  openGraph: { type: "website", siteName: site.brand, images: ["/og/default.png"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#F7F8F6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Marks JS-capable clients so reveal start-states only apply when JS can finish them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
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
