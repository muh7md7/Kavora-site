# Maintenance

- Monthly: `npm outdated`, `npm audit`, rebuild + upload. Keep the lockfile.
- Quarterly: rotate SMTP/DB passwords in `/home/USER/keelbiz-config.php`; review `enquiries` table and delete rows older than the retention period (set in Privacy Policy).
- Backups: hPanel backups + export of `enquiries` table.
- Content: edit `src/content/*.ts`; add posts to `insights.ts`, case studies to `work.ts` (permission + verified results only).
- Secrets never in the repo. `.env.local` is public-only values.

## Publish-hook key (optional, recommended)
1. hPanel → File Manager → the folder ABOVE `public_html` → new file `keelbiz-publish-key.txt` containing one long random line.
2. GitHub → repo → Settings → Secrets and variables → Actions → New repository secret → name `PUBLISH_KEY`, same value.
Do step 2 right after step 1: once the file exists, publishing only works with the matching secret.

## Market landing pages
`content/custom-pages/digital-marketing-agency-*.json` (English) + `content/ar/custom-pages/` (Arabic text, same file name).
Country names are allowed on these pages only; the rest of the site stays location-neutral. Editable in the admin panel under 📄 Pages / 📄 Pages — Arabic text.
