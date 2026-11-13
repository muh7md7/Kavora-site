// Renders one OG image per page, in brand, using the same palette and type as the site.
// Run after `npm run build` is not required — it only needs the content file.
// Usage: node scripts/og.mjs   (writes public/og/*.png)
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const PAGES = [
  { slug: "default", eyebrow: "Keelbiz", title: "Build your presence. Grow your business. Automate what comes next.", sub: "Websites · Social · Advertising · AI · Dashboards" },
  { slug: "services", eyebrow: "Services", title: "Five services. Hire one, or build the whole system.", sub: "Each one works on its own. Together they become a loop." },
  { slug: "website-design-development", eyebrow: "Website design & development", title: "A site that earns the enquiry.", sub: "Fast, credible and built to convert." },
  { slug: "social-media-management", eyebrow: "Social media management", title: "Posted, consistently. Without you posting.", sub: "Planned, produced and published every month." },
  { slug: "digital-advertising", eyebrow: "Digital advertising", title: "Put your offer in front of people already looking.", sub: "Meta and Google, structured and measured." },
  { slug: "ai-agents-automation", eyebrow: "AI agents & automation", title: "Answer every enquiry. Even at 2am.", sub: "Agents, workflows and the systems behind them." },
  { slug: "business-dashboards-systems", eyebrow: "Business dashboards & systems", title: "Stop asking where the numbers are.", sub: "One screen, built on your own data." },
  { slug: "work", eyebrow: "Work", title: "Proof, not promises.", sub: "Running demonstrations of what we build." },
  { slug: "about", eyebrow: "About", title: "A small team that builds the whole thing.", sub: "One point of contact. No relay." },
  { slug: "contact", eyebrow: "Contact", title: "Tell us what you're building.", sub: "Six quick steps. A person reads every one." },
  { slug: "ai-solutions", eyebrow: "AI Solutions", title: "Ready-made, custom, or pure automation.", sub: "Enquiry and quote only — no invented product list." },
  { slug: "insights", eyebrow: "Insights", title: "Nothing published yet.", sub: "We'd rather publish nothing than publish filler." },
];

const html = (p) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:G;src:url('http://localhost:4173/_next/static/media/REPLACED') format('woff2');}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F7F8F6;color:#11191E;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
  display:flex;flex-direction:column;justify-content:space-between;padding:68px 72px;position:relative;overflow:hidden}
body::before{content:'';position:absolute;inset:0;background:
  radial-gradient(60% 70% at 88% -8%, rgba(184,201,210,.95), transparent 66%),
  radial-gradient(45% 55% at -6% 104%, rgba(184,201,210,.5), transparent 68%)}
body::after{content:'';position:absolute;inset:0;opacity:.035;background-image:
  linear-gradient(rgba(40,53,61,.6) 1px, transparent 1px),linear-gradient(90deg, rgba(40,53,61,.6) 1px, transparent 1px);background-size:48px 48px}
.row{position:relative;display:flex;align-items:center;gap:14px}
.mark{width:34px;height:34px;border-radius:9px;background:#28353D;display:flex;align-items:center;justify-content:center}
.mark i{display:block;width:14px;height:14px;border:2px solid #F7F8F6;border-right-color:transparent;border-bottom-color:transparent;transform:rotate(45deg);border-radius:2px 0 0 0}
.brand{font-size:21px;font-weight:620;letter-spacing:-.045em}
.eyebrow{position:relative;font-family:ui-monospace,Menlo,monospace;font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:#4F6673}
h1{position:relative;font-size:${p.title.length > 46 ? 62 : 74}px;line-height:1.02;letter-spacing:-.045em;font-weight:560;max-width:17ch;margin-top:22px}
.sub{position:relative;font-size:23px;color:#5A6A73;margin-top:26px;max-width:46ch;letter-spacing:-.015em}
.foot{position:relative;display:flex;justify-content:space-between;align-items:flex-end;font-size:16px;color:#5A6A73}
.pill{border:1px solid rgba(40,53,61,.16);border-radius:999px;padding:9px 16px;font-size:14px;color:#28353D}
</style></head><body>
<div class="row"><span class="mark"><i></i></span><span class="brand">keelbiz</span></div>
<div><p class="eyebrow">${p.eyebrow}</p><h1>${p.title}</h1><p class="sub">${p.sub}</p></div>
<div class="foot"><span>keelbiz</span><span class="pill">One service, or a complete solution</span></div>
</body></html>`;

mkdirSync("public/og", { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome" });
const pg = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const p of PAGES) {
  await pg.setContent(html(p), { waitUntil: "load" });
  writeFileSync(`public/og/${p.slug}.png`, await pg.screenshot({ type: "png" }));
  console.log("og/" + p.slug + ".png");
}
await b.close();
