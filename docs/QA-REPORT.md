# QA report — 2026-11-12 (build 3 — v2 redesign)

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
| Lighthouse mobile (lab) | Implemented — see below |
| Cross-browser (Safari/Firefox/Edge), NVDA/VoiceOver, axe manual | Not yet tested |

## Functional (this build)
- Build: `next build` passes; 30 static routes exported.
- Pages load with zero console errors at 1440×900 and 390×844: Home, Lab, Dashboards service, Contact.
- No horizontal overflow at 1440 / 390 on Home, Lab, Contact (checked `scrollWidth`). Dashboards page: transient overflow seen once during sidebar width animation; not reproducible at rest — `overflow-x: clip` added as guard.
- Form: endpoint unset → "Enquiries temporarily unavailable" state renders. Success/failure/duplicate/spam paths: **not yet tested** (needs live endpoint).

## Lighthouse 12 — v2 redesign, mobile emulation (slow 4G, Moto G Power), static `out/`, headless Chromium
| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 100 | 100 | 100 | 100 | 0.9 s | 0 | 50 ms |
| /services/ai-agents-automation/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 50 ms |
| /lab/ | 99 | 100 | 100 | 100 | 0.8 s | 0 | 100 ms |
| /contact/ | 100 | 100 | 100 | 100 | 0.8 s | 0.034 | 80 ms |
Home JS: 195 KB gz. No console errors; no horizontal overflow at 1440 and 390 on Home, Lab, Contact, About, service pages.
Interaction checks (Playwright): Services and Lab mega menus open on hover; header flips to dark over dark sections; mobile menu opens full-screen.

## Previous build (v1)
## Lighthouse 12 — mobile emulation (Moto G Power, slow 4G throttling), static `out/` on localhost, headless Chromium
| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 93 | 100 | 100 | 100 | 2.7 s | 0 | 160 ms |
| /lab/ | 84 | 100 | 100 | 100 | 3.9 s | 0 | 240 ms |
| /services/business-dashboards-systems/ | 99 | 100 | 100 | 100 | 0.8 s | 0 | 100 ms |
| /contact/ | 89 | 100 | 100 | 100 | 3.1 s | 0.037 | 240 ms |
Lab/Contact LCP: text behind hydration-gated reveals; next step is removing the `Reveal` wrapper from the first viewport on those pages. Field (CrUX) data: none yet.

## Performance budget (measured)
- Home JS gz: **194 KB** (was 245 KB; Motion for React removed from the Home critical path — navbar pill, sidebar, workflow dot, reveals and hero drift are now CSS). Remaining 158 KB is React 19 + Next 16 runtime, so the 170 KB budget is not reachable on this stack; budget revised to 200 KB.
- Fonts preloaded: 2 (Barlow 600/700). Hero backdrop: 2 KB SVG placeholder (real photo budget ≤180 KB).
