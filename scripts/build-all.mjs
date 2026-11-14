// Builds the English site (root) and the Arabic site (/ar/, right-to-left) into one /out folder.
import { execSync } from "node:child_process";
import { rmSync, renameSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

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

// Security: lock inline scripts to their exact hashes with a per-page <meta> policy (works together with the header in .htaccess).
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith(".html") ? [join(d, e.name)] : []));
let locked = 0;
for (const file of walk("out")) {
  let html = readFileSync(file, "utf8");
  const hashes = new Set();
  for (const m of html.matchAll(/<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/(ld\+)?json"/.test(m[1])) continue; // data blocks are not executed
    hashes.add(`'sha256-${createHash("sha256").update(m[2], "utf8").digest("base64")}'`);
  }
  const meta = `<meta http-equiv="Content-Security-Policy" content="script-src 'self' ${[...hashes].join(" ")}"/>`;
  const at = html.indexOf("<meta charSet=\"utf-8\"/>");
  if (at === -1) continue;
  const cut = at + "<meta charSet=\"utf-8\"/>".length;
  writeFileSync(file, html.slice(0, cut) + meta + html.slice(cut)); locked++;
}
console.log("Inline scripts locked on", locked, "pages");
console.log("Built:", readdirSync("out").length, "entries at root; Arabic at /ar:", existsSync("out/ar/index.html"));
