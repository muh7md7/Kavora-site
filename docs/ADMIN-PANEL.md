# Editing the Keelbiz website (no code)

1. Open https://app.pagescms.org and sign in with GitHub.
2. Choose **muh7md7/Kavora-site** (branch **main**).
3. Pick a section in the left menu — Business details, Home page, Services, Process & FAQ, AI offer, Other pages, Legal.
4. Edit the text and click **Save**.
5. The site rebuilds and goes live automatically in about 2–3 minutes (GitHub → Actions → "Publish website" shows progress).

Tips
- "Accent word" is the word shown in elegant italic inside a heading.
- Leave a contact field empty to hide it on the website.
- Keep exactly five services; their order sets which visual each one uses.
- Layout or design changes still need a developer.

How it works: Pages CMS commits to `content/*.json` on `main` → `.github/workflows/publish.yml` builds the static site and pushes it to the `deploy` branch → Hostinger Git deployment pulls `deploy` into `public_html` (auto-deploy webhook).
