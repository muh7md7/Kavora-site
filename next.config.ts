import type { NextConfig } from "next";

// Static export: Hostinger Business (shared) has no persistent Node server.
// Output goes to /out and is uploaded to public_html. See README.md.
// The Arabic build (NEXT_PUBLIC_LANG=ar, run by scripts/build-all.mjs) is served from /ar/.
const isAr = process.env.NEXT_PUBLIC_LANG === "ar";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isAr ? "/ar" : undefined,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
