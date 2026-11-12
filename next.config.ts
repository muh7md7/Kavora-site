import type { NextConfig } from "next";

// Static export: Hostinger Business (shared) has no persistent Node server.
// Output goes to /out and is uploaded to public_html. See README.md.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
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
