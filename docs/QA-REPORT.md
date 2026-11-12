# QA report — 2026-11-12 (build 1)

Measured in this build environment (Chromium via Playwright, static `out/` served locally). Lighthouse/WebPageTest not run yet.

## Status matrix
| Area | Status |
|---|---|
| Tokens, type, glass material, reduced-motion / reduced-transparency / no-backdrop-filter fallbacks | Implemented |
| Glass Kit ×10 + Lab + capture mode with cursor timelines | Implemented |
| Home, Services ×5, Work, About, Insights, Contact, Legal ×3, 404, sitemap, robots, JSON-LD, OG | Implemented |
| Enquiry form UX (validation, lock, server-confirmed success, retry, unavailable state) | Implemented |
| PHP endpoint `server/api/enquiry.php` | Needs external config (upload, DB, SMTP, PHPMailer, config file) |
| n8n webhook forward | Needs external config |
| Security headers `.htaccess` | Implemented — not yet tested on Hostinger (CSP must be verified live) |
| Brand name, domain, email, WhatsApp, socials, team, legal text | Needs real content ([TO CONFIRM]) |
| Backdrop photography, project screenshots, case studies | Needs real content |
| Analytics, Turnstile, booking embed, AI plans page | Future enhancements (flags off) |
| Lighthouse, cross-browser (Safari/Firefox/Edge), NVDA/VoiceOver, axe | Not yet tested |

## Functional (this build)
- Build: `next build` passes; 30 static routes exported.
- Pages load with zero console errors at 1440×900 and 390×844: Home, Lab, Dashboards service, Contact.
- No horizontal overflow at 1440 / 390 on Home, Lab, Contact (checked `scrollWidth`). Dashboards page: transient overflow seen once during sidebar width animation; not reproducible at rest — `overflow-x: clip` added as guard.
- Form: endpoint unset → "Enquiries temporarily unavailable" state renders. Success/failure/duplicate/spam paths: **not yet tested** (needs live endpoint).

## Performance budget (static check)
- Fonts preloaded: 2 (Barlow 600/700). Geist loaded on demand.
- Hero backdrop: 2 KB SVG placeholder (real photo budget: ≤180 KB).
- JS gz on Home: **245 KB measured** vs 170 KB budget — over. Next step: dynamic-import GlassSidebar/WorkflowCanvas in hero below-fold variants and audit motion chunk; retest.
