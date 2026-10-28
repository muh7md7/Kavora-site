# Kavora website

Static site on Hostinger, deployed from this repo's `main` branch.

| What | Where |
|---|---|
| Pages & copy | `src/build.py` → run `python3 src/build.py` |
| Checkout link, download link, founder seats sold | `assets/js/site.js` (`window.KAVORA`) |
| Google / email sign-in config | `assets/js/auth-config.js` |
| Security headers, HTTPS, clean URLs | `.htaccess` |
| Waitlist emails | saved to `data/waitlist.csv` on the server (not public) |
