import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { theme } from "@/content/builder";
import { LANG, dir, isAr, t } from "@/i18n";

// Self-hosted WOFF2 (SIL OFL). Geist = display + UI; Instrument Serif italic = single accent word.
// Only the italic is used for the accent word, so only that file is shipped and preloaded.
const serif = localFont({
  src: [{ path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-serif-accent", display: "swap", preload: true, adjustFontFallback: "Times New Roman",
});
// Arabic: Readex Pro (SIL OFL) — modern Gulf-style sans, used only by the /ar/ build.
const arabic = localFont({
  src: [
    { path: "../fonts/readex-pro-arabic-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/readex-pro-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/readex-pro-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/readex-pro-arabic-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-arabic", display: "swap", preload: false,
});
const geist = GeistSans; // --font-geist-sans
// Mono is only used for small labels: loaded on demand (not preloaded) so it never competes with the first paint.
const geistMono = localFont({ src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2", variable: "--font-geist-mono", weight: "100 900", display: "swap", preload: false, adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} — ${t("Build, grow and automate your business")}`, template: `%s · ${site.brand}` },
  description: t("Keelbiz is a digital growth and AI solutions agency: websites, social media, advertising, AI automation and business dashboards."),
  openGraph: { type: "website", siteName: site.brand, images: [theme.brand.shareImage?.src ?? "/og/default.png"] },
  twitter: { card: "summary_large_image" },
  // Favicon + share image can be replaced in the admin panel (🎨 Design & theme → Brand files).
  icons: theme.brand.favicon
    ? { icon: theme.brand.favicon.src, apple: theme.brand.favicon.src }
    : { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: theme.background, width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={LANG} dir={dir} className={`${serif.variable} ${geist.variable} ${geistMono.variable} ${arabic.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply saved dark mode before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('kb-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}" }} />
        {theme.preload.slice(0, 2).map((href) => <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />)}
      </head>
      <body>
        <a href="#main" className="skip-link">{isAr ? "انتقل إلى المحتوى" : "Skip to content"}</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
