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
2. Enquiry endpoint: `public/api/enquiry.php` ships inside `out/` automatically. Copy `server/config.example.php` to `public_html/api/config.php`
   (blocked from the web by `api/.htaccess`) — or to `/home/USER/keelbiz-config.php` outside the web root — and set `notify_to`.
   No database or Composer needed: enquiries are appended to a private `api/_data/enquiries.jsonl` and emailed with PHP `mail()`.
   Optional: SMTP via PHPMailer, MySQL, Turnstile, n8n webhook (see the example config). Until `config.php` exists the endpoint returns 503 and the form says enquiries aren't connected yet (no fake success).
3. The form posts to `/api/enquiry.php` on the same host by default; override with `NEXT_PUBLIC_ENQUIRY_ENDPOINT` if the endpoint lives elsewhere.
4. Replace `site.url` in `src/content/site.ts` with the real domain (sitemap, canonicals, JSON-LD depend on it).
5. Enable HSTS in `.htaccess` only after HTTPS is verified on all hosts.

## Structure
`src/app` pages · `src/components/glass` Glass Kit (10) · `src/components/sections` page sections · `src/content` typed content · `src/styles/tokens.css` · `server/` PHP endpoint · `docs/`.

## Lab (retired)
The public Lab was removed in v4; its components now live inside the site (home "See it in action" showcase, service examples, cursor, spotlight cards). `/lab/*` 301-redirects to `/` via `.htaccess`. Previous Lab source: tag/commit `b834867` or branch history.

## Previous Kavora site
Preserved on branch `kavora-archive`.
