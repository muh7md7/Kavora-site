# Keelbiz — agency website (Light Glass)

Next.js 16 (App Router, static export) · TypeScript strict · Tailwind 4 (tokens in `src/styles/tokens.css`) · Motion for React · lucide-react.
Brief: `docs/AGENCY-SITE-BRIEF.md`. Design rationale: `docs/DESIGN.md`. QA + status matrix: `docs/QA-REPORT.md`.

## Run
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_ENQUIRY_ENDPOINT once the PHP endpoint is live
npm run dev                  # http://localhost:3000
npm run build                # static export -> /out
```

## Deploy to Hostinger Business (shared, no Node)
1. `npm run build` → upload the contents of `out/` to `public_html/` (keep `out/.htaccess` — it carries the security headers).
2. Enquiry endpoint: upload `server/api/enquiry.php` to `public_html/api/enquiry.php`.
   Copy `server/keelbiz-config.example.php` to `/home/USER/keelbiz-config.php` (outside `public_html`) and fill DB, SMTP, allowed origins.
   Install PHPMailer outside web root: `composer require phpmailer/phpmailer` in `/home/USER`.
   Create a MySQL DB in hPanel; the endpoint creates the `enquiries` table on first run.
3. Set `NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://DOMAIN/api/enquiry.php` and rebuild. Until then the form shows "Enquiries temporarily unavailable".
4. Replace `site.url` in `src/content/site.ts` with the real domain (sitemap, canonicals, JSON-LD depend on it).
5. Enable HSTS in `.htaccess` only after HTTPS is verified on all hosts.

## Structure
`src/app` pages · `src/components/glass` Glass Kit (10) · `src/components/sections` page sections · `src/content` typed content · `src/lab` Lab registry + cursor timelines · `src/styles/tokens.css` · `server/` PHP endpoint · `docs/`.

## Lab + reel capture
`/lab` — all components with real source. `/lab/capture/<slug>/?theme=light|dark&bg=interior-1|abstract-1&title=&tag=` — 1080×1920 recording frame with scripted cursor (`src/lab/timelines/*.json`) and end card. See `docs/CONTENT-ENGINE.md`.

## Previous Kavora site
Preserved on branch `kavora-archive`.
