// Builds the English site (root) and the Arabic site (/ar/, right-to-left) into one /out folder.
import { execSync } from "node:child_process";
import { rmSync, renameSync, existsSync, readdirSync } from "node:fs";

const run = (cmd, env = {}) => execSync(cmd, { stdio: "inherit", env: { ...process.env, ...env } });
rmSync("out", { recursive: true, force: true }); rmSync("out-en", { recursive: true, force: true });

run("node scripts/prepare-content.mjs");
run("npx next build", { NEXT_PUBLIC_LANG: "en" });
renameSync("out", "out-en");
run("npx next build", { NEXT_PUBLIC_LANG: "ar" });
// Server-only and shared files live once, at the root.
for (const f of ["api", "__no-custom-pages", ".htaccess", "robots.txt", "sitemap.xml"]) rmSync(`out/${f}`, { recursive: true, force: true });
renameSync("out", "out-en/ar");
renameSync("out-en", "out");
rmSync("out/__no-custom-pages", { recursive: true, force: true });
console.log("Built:", readdirSync("out").length, "entries at root; Arabic at /ar:", existsSync("out/ar/index.html"));
