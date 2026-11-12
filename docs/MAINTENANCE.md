# Maintenance

- Monthly: `npm outdated`, `npm audit`, rebuild + upload. Keep the lockfile.
- Quarterly: rotate SMTP/DB passwords in `/home/USER/keelbiz-config.php`; review `enquiries` table and delete rows older than the retention period (set in Privacy Policy).
- Backups: hPanel backups + export of `enquiries` table.
- Content: edit `src/content/*.ts`; add posts to `insights.ts`, case studies to `work.ts` (permission + verified results only).
- Secrets never in the repo. `.env.local` is public-only values.
