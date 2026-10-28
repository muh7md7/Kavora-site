#!/usr/bin/env python3
"""Kavora site generator. Edit SITE / PRODUCTS, then run:  python3 src/build.py
Outputs plain HTML into the repo root, which Hostinger serves."""
from pathlib import Path
import html as H
import re

ROOT = Path(__file__).resolve().parent.parent

import json, datetime

def load(name, fallback):
    try:
        return json.loads((ROOT / "content" / name).read_text(encoding="utf-8"))
    except Exception as e:
        print("warning: could not read", name, e)
        return fallback

CFG = load("settings.json", {})
SITE = {
    "domain": CFG.get("domain") or "kavora.com",
    "email": CFG.get("email") or "hello@kavora.com",
    "city": CFG.get("city") or "Lahore, Pakistan",
    "founder": CFG.get("founder_price", 19), "regular": CFG.get("regular_price", 29),
    "trial": CFG.get("trial_days", 7), "refund_days": CFG.get("refund_days", 14),
    "updated": "28 October 2026",
}
E = SITE["email"]

LOGO = """<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fe3cf"/><stop offset=".55" stop-color="#c49bff"/><stop offset="1" stop-color="#ffbc8f"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#lg)"/><rect x="7" y="7" width="8" height="8" rx="2.4" fill="#fff" opacity=".95"/><rect x="17" y="7" width="8" height="8" rx="2.4" fill="#fff" opacity=".55"/><rect x="7" y="17" width="18" height="8" rx="2.4" fill="#fff" opacity=".8"/></svg>"""

ICON = {
    "lock": '<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    "undo": '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
}
def ico(n): return f'<div class="t-ico"><svg viewBox="0 0 24 24" aria-hidden="true">{ICON[n]}</svg></div>'

GOOGLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.3h5.9a5 5 0 01-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0012 23z"/><path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 010-4.2V7H2.1a11 11 0 000 10l3.7-2.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 002.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z"/></svg>'

# ---------- cache busting: every CSS/JS link carries a fingerprint, so phones never keep old files ----------
import hashlib
_fp = {}
def bust(html_text):
    def fp(m):
        rel = m.group(1)
        if rel not in _fp:
            f = ROOT / rel.lstrip("/")
            _fp[rel] = hashlib.md5(f.read_bytes()).hexdigest()[:8] if f.exists() else "0"
        return f'"{rel}?v={_fp[rel]}"'
    return re.sub(r'"(/assets/(?:css|js|vendor)/[^"?]+\.(?:css|js))"', fp, html_text)

# ---------- shell ----------
def head(title, desc, path, page):
    url = f"https://{SITE['domain']}/" + (f"{path}/" if path else "")
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{H.escape(title)}</title>
<meta name="description" content="{H.escape(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:site_name" content="Kavora">
<meta property="og:title" content="{H.escape(title)}">
<meta property="og:description" content="{H.escape(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:image" content="https://{SITE['domain']}/assets/img/kavora-desk-icon.png">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#272b42">
<link rel="icon" type="image/png" href="/assets/img/favicon.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<script src="/assets/js/head.js"></script>
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"Organization","name":"Kavora","url":"https://{SITE['domain']}","logo":"https://{SITE['domain']}/assets/img/kavora-desk-icon.png","email":"{E}","address":{{"@type":"PostalAddress","addressLocality":"Lahore","addressCountry":"PK"}}}}</script>
</head>
<body data-page="{page}">
<div class="ambient" aria-hidden="true"></div>
<div class="cursor-light" aria-hidden="true"></div>
"""

LINKS = [("Catalog", "store"), ("Kavora Desk", "desk"), ("Drops", "drops"), ("About", "about")]

def nav(active):
    cur = ' aria-current="page"'
    links = "".join(f'<a href="/{h}/"{cur if h == active else ""}>{t}</a>' for t, h in LINKS)
    return f"""<header class="nav">
  <div class="wrap">
    <div class="nav-bar">
      <a class="logo" href="/" aria-label="Kavora home">{LOGO}Kavora</a>
      <nav class="nav-links" aria-label="Main">{links}</nav>
      <div class="nav-acct">
        <a class="btn btn-quiet btn-sm" href="/login/" data-guest>Sign in</a>
        <a class="btn btn-main btn-sm" href="/signup/" data-guest>Create account</a>
        <a class="avatar" href="/account/" data-user hidden aria-label="Your account"></a>
      </div>
      <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span></button>
    </div>
  </div>
</header>
<main id="main">
"""

MBAR = f"""<div class="mbar" aria-label="Kavora Desk"><img src="/assets/img/kavora-desk-icon-sm.webp" alt="" width="40" height="40"><div><b>Kavora Desk</b><span>${SITE['founder']} once, {SITE['trial']}-day free trial</span></div><a class="btn btn-main" data-buy href="/desk/#pricing">Get it</a></div>"""

def footer(mbar=True):
    return (MBAR if mbar else "") + f"""</main>
<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <a class="logo" href="/">{LOGO}Kavora</a>
        <p class="soft" style="max-width:34ch;margin-top:16px;font-size:15.5px">Apps, automations and kits that take busywork off your plate. Made in {SITE['city']}.</p>
        <p style="margin-top:14px;font-size:15px"><a class="link" href="mailto:{E}">{E}</a></p>
      </div>
      <div><h4>Products</h4><a href="/desk/">Kavora Desk</a><a href="/store/#kavora-flows">Kavora Flows</a><a href="/store/#kavora-ads">Kavora Ads</a><a href="/store/">Full catalog</a></div>
      <div><h4>Company</h4><a href="/about/">About</a><a href="/drops/">Weekly drops</a><a href="/contact/">Contact</a><a href="/account/">Your account</a></div>
      <div><h4>Policies</h4><a href="/legal/terms/">Terms of service</a><a href="/legal/privacy/">Privacy policy</a><a href="/legal/refunds/">Refund policy</a><a href="/legal/license/">Licence agreement</a></div>
    </div>
    <div class="foot-word" aria-hidden="true">Kavora</div>
    <div class="foot-bot">
      <span>© <span data-year>2026</span> Kavora. All rights reserved.</span>
      <span>Checkout and payments are handled by Lemon Squeezy, our authorised reseller.</span>
    </div>
  </div>
</footer>
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/lenis.min.js" defer></script>
<script src="/assets/js/settings.js" defer></script>
<script src="/assets/js/site.js" defer></script>
<script src="/assets/js/auth-config.js" defer></script>
<script src="/assets/js/auth.js" type="module"></script>
</body>
</html>
"""

def page(path, title, desc, active, body, page_id=None, chrome=True):
    out = bust(head(title, desc, path, page_id or (path or "home")) + nav(active) + body + footer(path in ("", "store", "desk", "drops")))
    t = ROOT / ("index.html" if not path else ("404.html" if path == "404" else f"{path}/index.html"))
    t.parent.mkdir(parents=True, exist_ok=True)
    t.write_text(out, encoding="utf-8")
    print("built", t.relative_to(ROOT))

# ---------- blocks ----------
def screen(extra=""):
    return f"""<div class="screen" {extra} role="img" aria-label="A Mac desktop with Kavora Desk widgets: clock, battery, weather, AI search, music, tasks and system stats">
  <div class="screen-bar"><b>Finder</b><span>File</span><span>Edit</span><span>View</span><span class="r">Fri 8:00 PM</span></div>
  <div class="screen-grid"></div>
  <div class="wd wd-clock"><small>Friday</small><div class="num">8:00</div><div style="opacity:.75;margin-top:4px">Drop day</div></div>
  <div class="wd wd-ring"><div class="ring"></div><span class="ring-v">72%</span></div>
  <div class="wd wd-weather"><small>Lahore</small><div class="num">29°</div><div style="opacity:.8;margin-top:4px">Sunny, high 31°</div></div>
  <div class="wd wd-ai"><span class="dot-ico" style="background:linear-gradient(135deg,#10a37f,#5fe3cf)"></span><div class="input-fake">Ask ChatGPT, Claude or Gemini</div><span class="dot-ico" style="background:linear-gradient(135deg,#c49bff,#ffbc8f)"></span></div>
  <div class="wd wd-music"><div class="cover"></div><b>Midnight Drive</b><div class="soft-line" style="opacity:.75">Playing on Spotify</div><div class="prog"><i></i></div></div>
  <div class="wd wd-tasks"><small>Today, 3 left</small><div class="todo done"><i></i><span>Morning workout</span></div><div class="todo"><i></i><span>Send client proposal</span></div><div class="todo"><i></i><span>Record product demo</span></div><div class="todo"><i></i><span>Plan Friday drop</span></div></div>
  <div class="wd wd-sys"><div class="stat-mini"><b>18%</b><span>CPU</span></div><div class="stat-mini"><b>9.2 GB</b><span>Memory</span></div><div class="stat-mini"><b>412 GB</b><span>Free</span></div></div>
</div>"""

def clock():
    return """<div class="clock" data-clock aria-label="Time until the next drop">
  <div><b data-d>00</b><span>days</span></div><div><b data-h>00</b><span>hours</span></div><div><b data-m>00</b><span>minutes</span></div><div><b data-s>00</b><span>seconds</span></div>
</div>"""

def signup(source, cta="Join the list"):
    return f"""<form class="signup" data-source="{source}" novalidate>
  <label class="sr" for="em-{source}">Email address</label>
  <input class="field" id="em-{source}" type="email" name="email" placeholder="you@business.com" autocomplete="email" required>
  <input type="text" name="website" tabindex="-1" autocomplete="off" hidden>
  <button class="btn btn-main" type="submit">{cta}</button>
</form>
<p class="note">One email per drop. Unsubscribe in one click.</p>"""

# Product art (each product gets its own object, not a shared template)
ART = {
 "desk": '<img class="art-icon" src="/assets/img/kavora-desk-icon.webp" alt="" width="190" height="190" loading="lazy" decoding="async">',
 "flows": '''<div class="art-flow"><svg viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true"><path d="M60 40 C140 40 120 100 200 100"/><path d="M60 160 C140 160 120 100 200 100"/></svg>
   <div class="node" style="left:0;top:8%"><b></b>New lead</div><div class="node" style="left:0;bottom:8%"><b style="background:#ffbc8f"></b>Invoice paid</div><div class="node" style="right:0;top:40%"><b style="background:#c49bff"></b>WhatsApp reply</div></div>''',
 "ads": '<div class="art-ad"><div class="ph"></div><div class="ln"></div><div class="ln s"></div><div class="cta-f"></div></div>',
 "kits": '<div class="art-kit"><i class="big" style="background:#23263b">Aa</i><i style="background:#ffbc8f"></i><i style="background:#5fe3cf"></i><i style="background:#ece8f5"></i><i style="background:#c49bff"></i></div>',
 "studio": '<div class="art-studio"><div class="row"><span class="cb on"></span><span>Client onboarding</span><span class="pill">Done</span></div><div class="row"><span class="cb on"></span><span>Content calendar</span><span class="pill">Live</span></div><div class="row"><span class="cb"></span><span>Q4 proposal</span><span class="pill">Draft</span></div><div class="row"><span class="cb"></span><span>Hiring SOP</span><span class="pill">Next</span></div></div>',
 "all": '<div class="art-all">K+</div>',
}

ART_BY_LABEL = {
    "Kavora Desk icon": "desk", "Automation flow": "flows", "Ad mockup": "ads",
    "Brand palette": "kits", "Task board": "studio", "K+ letters": "all",
}

def esc(v): return H.escape(str(v or ""))

PRODUCTS = [p for p in load("products.json", {"products": []}).get("products", []) if p.get("show_on_website", True)]

def slug(name): return re.sub(r"[^a-z0-9]+", "-", str(name).lower()).strip("-") or "product"

def prod(p):
    key = slug(p.get("name"))
    if p.get("picture"):
        art = f'<img class="art-photo" src="{esc(p["picture"])}" alt="" loading="lazy" decoding="async">'
    else:
        art = ART.get(ART_BY_LABEL.get(p.get("built_in_art"), ""), f'<div class="art-all">{esc(str(p.get("name","K"))[:1])}</div>')
    status = esc(p.get("status"))
    live = " live" if status.lower().startswith("available") else ""
    old = f'<s>{esc(p["old_price"])}</s>' if p.get("old_price") else ""
    price_cls = "price" if old or live else "price soft"
    cat = esc(p.get("category", "")).lower()
    link = esc(p.get("link") or "/store/")
    return f"""<article class="prod" id="{key}" data-cat="{cat}" style="--tint:{esc(p.get('color_1') or '#c49bff')};--tint2:{esc(p.get('color_2') or '#5fe3cf')}">
  <div class="prod-art">{art}</div>
  <div class="prod-body">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h3>{esc(p.get('name'))}</h3><span class="status{live}">{status}</span></div>
    <p>{esc(p.get('description'))}</p>
    <div class="prod-foot"><span class="{price_cls}"{'' if old or live else ' style="font-size:18px"'}>{esc(p.get('price'))}{old}</span><span class="soft" style="font-size:15px;font-weight:600">View details</span></div>
  </div>
  <a class="prod-link" href="{link}" aria-label="{esc(p.get('name'))}: view details"></a>
</article>"""

def trust():
    return f"""<div class="trust-grid">
  <div class="fade">{ico('lock')}<h3>Secure checkout</h3><p>Payments run through Lemon Squeezy with encrypted card processing. We never see your card details.</p></div>
  <div class="fade">{ico('undo')}<h3>{SITE['refund_days']}-day refunds</h3><p>Not right for you? Email us within {SITE['refund_days']} days for a full refund. No forms, no arguments.</p></div>
  <div class="fade">{ico('eye')}<h3>Private by design</h3><p>Your widgets, notes and stats stay on your device. No ad trackers on this site.</p></div>
  <div class="fade">{ico('mail')}<h3>Real support</h3><p>Write to <a class="link" href="mailto:{E}">{E}</a> and a person replies within one business day.</p></div>
</div>"""

def faq(items):
    return '<div class="faq">' + "".join(f'<details class="fade"><summary>{q}<i aria-hidden="true"></i></summary><p>{a}</p></details>' for q, a in items) + "</div>"

# ---------- pages ----------
def home():
    shelf = "".join(prod(p) for p in PRODUCTS)
    body = f"""
<section class="hero">
  <div class="hero-pin">
    <div class="hero-inner">
      <div class="hero-copy">
        <h1 class="d-xl split">Business tools, made beautifully.</h1>
        <p class="lede fade">Kavora makes apps, automations and ready-to-use kits for founders and teams. Less busywork, more of the work that grows your business.</p>
        <div class="btn-row fade">
          <a class="btn btn-main" href="/desk/">See Kavora Desk</a>
          <a class="btn btn-quiet" href="/store/">Browse the catalog</a>
        </div>
        <p class="hero-note fade">Kavora Desk is out now for macOS. Try it free for {SITE['trial']} days.</p>
      </div>
      <div>{screen()}</div>
    </div>
    <div class="hero-caption">One click, and every widget finds its place.</div>
    <div class="scroll-hint" aria-hidden="true"><i></i>Scroll to arrange</div>
  </div>
</section>

<section class="sec shelf" aria-labelledby="cat-h">
  <div class="wrap sec-head">
    <div><h2 class="d-lg split" id="cat-h">The catalog</h2><p class="lede fade">One Mac app today. A new product or feature every Friday until every part of your business has a tool.</p></div>
    <a class="btn btn-quiet fade" href="/store/">View all products</a>
  </div>
  <div class="shelf-wrap"><div class="shelf-track">{shelf}
    <div class="end-card"><h3 class="d-md">More every Friday.</h3><p class="soft">Join the list and get each new product the day it drops, at the launch price.</p><a class="btn btn-main" href="#waitlist">Join the list</a></div>
  </div></div>
  <div class="shelf-progress" aria-hidden="true"><i></i></div>
</section>

<section class="sec pearl" aria-labelledby="how-h">
  <div class="wrap">
    <div class="sec-head"><div><h2 class="d-lg split" id="how-h">How buying works</h2><p class="lede fade">No subscriptions to untangle. Try it, pay once, keep getting better versions.</p></div></div>
    <div class="steps">
      <div class="step"><span class="step-line"></span><span class="step-n">Step 1</span><h3>Try it free</h3><p>Download and use every feature for {SITE['trial']} days. No card needed.</p></div>
      <div class="step"><span class="step-line"></span><span class="step-n">Step 2</span><h3>Pay once</h3><p>${SITE['founder']} for the first {CFG.get('founder_seats', 100)} customers, then ${SITE['regular']}. Your licence key arrives by email in seconds.</p></div>
      <div class="step"><span class="step-line"></span><span class="step-n">Step 3</span><h3>Get every drop</h3><p>New widgets and features install automatically every Friday for a full year.</p></div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="trust-h">
  <div class="wrap">
    <div class="sec-head"><div><h2 class="d-lg split" id="trust-h">Buy with confidence</h2></div></div>
    {trust()}
  </div>
</section>

<section class="sec" style="padding-top:0" aria-labelledby="drop-h">
  <div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:40px;align-items:center">
    <div><h2 class="d-lg split" id="drop-h">Next drop: {esc(CFG.get('next_drop_title', 'Something new'))}</h2><p class="lede fade" style="margin-top:18px">{esc(CFG.get('next_drop_text', ''))} Arrives <span data-drop-date>this Friday</span>.</p>
      <a class="btn btn-quiet fade" href="/drops/" style="margin-top:28px">See the roadmap</a></div>
    <div class="fade">{clock()}</div>
  </div>
</section>

<section class="wrap" id="waitlist">
  <div class="final">
    <h2 class="d-lg split">Get each drop first.</h2>
    <p class="lede fade">Early customers get launch prices. One short email when something new is ready.</p>
    <div class="fade">{signup('home')}</div>
  </div>
</section>
"""
    page("", "Kavora | Premium apps, automations and business kits", "Kavora makes premium Mac apps, n8n automations, ad templates and brand kits for founders and teams. Start with Kavora Desk: 80+ desktop widgets for macOS.", "", body, "home")

def store():
    seen = []
    for p in PRODUCTS:
        c = p.get("category")
        if c and c not in seen: seen.append(c)
    groups = [(c, c.lower()) for c in seen]
    cards = "".join(prod(p) for p in PRODUCTS)
    cats = "".join(f'<span class="chip">{g}</span>' for g, _ in groups)
    body = f"""
<section class="sec" style="padding-top:150px">
  <div class="wrap">
    <div class="sec-head"><div><h1 class="d-lg split">The Kavora catalog</h1><p class="lede fade">Every product is built to be useful in the first five minutes. Kavora Desk is available now; the rest arrive through our Friday drops.</p></div></div>
    <div class="chips fade" style="margin-bottom:40px">{cats}</div>
    <div class="store-grid">{cards}</div>
  </div>
</section>
<section class="wrap" id="waitlist">
  <div class="final"><h2 class="d-lg split">Hear when new products land.</h2><p class="lede fade">Launch-day prices go to the list first.</p><div class="fade">{signup('store')}</div></div>
</section>
"""
    page("store", "Catalog | Kavora", "Premium digital products for business owners: Mac apps, n8n automations, ad templates, brand kits and Notion and Canva systems.", "store", body)

def desk():
    widgets = ["Analog, digital and world clocks", "Word clock", "Calendar", "Live weather", "Prayer times", "Battery health", "CPU and memory", "Disk and network",
               "Now playing", "ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "ChatGPT Images", "YouTube", "TikTok", "Instagram", "Facebook", "LinkedIn", "X",
               "Snapchat", "WhatsApp", "Gmail", "Spotify", "Notion", "Canva", "Post everywhere", "Tasks", "Reminders", "Habits", "Journal", "Daily goal",
               "Focus timer", "Quotes", "Affirmations", "Photo frames", "Greeting", "Command center", "Your own designs"]
    chips = "".join(f'<span class="chip">{w}</span>' for w in widgets)
    faqs = [
        ("Which Macs does it run on?", "Any Mac on macOS 14 Sonoma or newer, Intel or Apple silicon."),
        ("Is it a subscription?", f"No. Pay once and keep it. The price includes a year of Friday drops; the version you have keeps working forever."),
        ("How does the free trial work?", f"Download it and use everything for {SITE['trial']} days without a card. When you buy, paste your licence key and carry on."),
        ("Do widgets stay when I close the app?", "Yes. Closing the window keeps your widgets on the desktop while the app rests in the menu bar using very little power. It can also open at login."),
        ("How many Macs can I use?", "Each licence works on 2 of your own Macs. Email us for team pricing."),
        ("What if it isn't for me?", f"Email {E} within {SITE['refund_days']} days of buying for a full refund."),
        ("What data does it collect?", "None about you. Weather and prayer times are fetched using only the city you choose; everything else stays on your Mac."),
    ]
    body = f"""
<section class="sec" style="padding-top:150px">
  <div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:56px;align-items:center">
    <div>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:26px" class="fade"><img src="/assets/img/kavora-desk-icon-sm.webp" alt="Kavora Desk app icon" width="72" height="72" style="filter:drop-shadow(0 14px 26px rgba(196,155,255,.5))"><div><b style="font:650 19px var(--display)">Kavora Desk</b><div class="dim" style="font-size:15px">For macOS 14 and newer</div></div></div>
      <h1 class="d-xl split" style="font-size:clamp(44px,6.4vw,92px)">Your desktop, arranged.</h1>
      <p class="lede fade" style="margin:24px 0 32px">80+ widgets with live data, one-click AI and social launchers, ready-made layouts and a builder for your own designs. Pick a setup and Kavora Desk places everything for you.</p>
      <div class="btn-row fade"><a class="btn btn-main" href="#pricing">Buy for ${SITE['founder']}</a><a class="btn btn-quiet" data-download href="#waitlist">Try free for {SITE['trial']} days</a></div>
    </div>
    <div class="fade" data-depth="8">{screen()}</div>
  </div>
</section>

<section class="sec" style="padding-top:20px">
  <div class="wrap">
    <div class="sec-head"><div><h2 class="d-lg split">What it does</h2></div></div>
    <div class="feat-grid">
      <div class="feat wide fade"><h3>Ready-made desktops</h3><p>Choose a setup for productivity, content creation, AI work or social media. Preview it, pick single or combined widgets, choose spacious or full, and it lands on your desktop in neat zones.</p></div>
      <div class="feat fade"><h3>Widget builder</h3><p>Drag in time, weather, battery, apps, photos, icons and shapes. Use any font installed on your Mac.</p></div>
      <div class="feat fade"><h3>Style everything at once</h3><p>Dark or light. Plain, transparent or liquid glass. Any colour or gradient, on one widget or all of them.</p>
        <div class="feat-vis"><span class="sw" style="background:#23263b"></span><span class="sw" style="background:linear-gradient(135deg,#5fe3cf,#c49bff)"></span><span class="sw" style="background:linear-gradient(135deg,#ffbc8f,#ff7fb5)"></span><span class="sw" style="background:rgba(255,255,255,.2)"></span><span class="sw" style="background:#ece8f5"></span></div></div>
      <div class="feat fade"><h3>Live data</h3><p>CPU, memory, disk, network, battery health, weather, prayer times and what's playing, all updating as you work.</p></div>
      <div class="feat fade"><h3>Ask any AI in one place</h3><p>Type once and send it to ChatGPT, Claude, Gemini, Perplexity or Grok. Jump straight to ChatGPT Images or Claude Projects.</p></div>
      <div class="feat half fade"><h3>Shapes, guides and snapping</h3><p>Nine widget shapes. Move and resize freely while guides keep everything lined up.</p>
        <div class="feat-vis"><span class="shp" style="border-radius:12px"></span><span class="shp" style="border-radius:50%"></span><span class="shp" style="border-radius:999px;width:70px"></span><span class="shp" style="clip-path:polygon(25% 4%,75% 4%,100% 50%,75% 96%,25% 96%,0 50%)"></span><span class="shp" style="border-radius:0 20px"></span></div></div>
      <div class="feat half fade"><h3>Light on your Mac</h3><p>Close the window and your widgets stay. The app rests in the menu bar, pauses its animations and opens again at login.</p></div>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:20px">
  <div class="wrap"><div class="sec-head"><div><h2 class="d-lg split">Every widget</h2><p class="lede fade">Small, medium and large sizes, with more added each Friday.</p></div></div>
  <div class="chips fade">{chips}</div></div>
</section>

<section class="sec" id="pricing">
  <div class="wrap">
    <div class="sec-head"><div><h2 class="d-lg split">Pay once, keep it</h2><p class="lede fade">Prices in US dollars. Local tax is added at checkout where required.</p></div></div>
    <div class="plans">
      <div class="plan fade"><h3>Free trial</h3><div class="amt">$0</div><div class="dim">{SITE['trial']} days, every feature</div>
        <ul><li>All 80+ widgets</li><li>Ready-made desktops</li><li>Widget builder</li><li>No card needed</li></ul>
        <a class="btn btn-quiet" data-download href="#waitlist">Download the trial</a></div>
      <div class="plan star fade"><h3>Founder licence</h3><div class="amt">${SITE['founder']} <small>one time</small></div><div class="dim">${SITE['regular']} after the first {CFG.get('founder_seats', 100)} customers</div>
        <ul><li>Use on 2 Macs, for life</li><li>A year of Friday drops</li><li>Early access to new products</li><li>{SITE['refund_days']}-day money-back guarantee</li></ul>
        <a class="btn btn-main" data-buy href="#waitlist">Buy Kavora Desk</a>
        <div class="seats" data-seats><b data-left>100</b> founder licences left<div class="bar"><i></i></div></div></div>
      <div class="plan fade"><h3>All-Access</h3><div class="amt">Soon</div><div class="dim">Every Kavora product in one membership</div>
        <ul><li>Kavora Desk and future apps</li><li>Flows, Ads, Kits and Studio</li><li>Every drop, every year</li><li>Member-only extras</li></ul>
        <a class="btn btn-quiet" href="/drops/#waitlist">Join the waitlist</a></div>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:20px"><div class="wrap"><div class="sec-head"><div><h2 class="d-lg split">Questions</h2></div></div>{faq(faqs)}</div></section>

<section class="wrap" id="waitlist">
  <div class="final"><h2 class="d-lg split">Get Kavora Desk on launch day.</h2><p class="lede fade">We'll send the download link and hold a founder price for you.</p><div class="fade">{signup('desk')}</div></div>
</section>
"""
    page("desk", "Kavora Desk | Premium desktop widgets for macOS", "80+ premium Mac desktop widgets with live weather, battery, system stats, music, AI and social launchers, ready-made layouts and a widget builder. One-time purchase.", "desk", body)

def drops():
    road = [(d.get("when", ""), d.get("title", ""), d.get("description", ""), bool(d.get("is_next"))) for d in load("roadmap.json", {"drops": []}).get("drops", [])]
    rows = "".join(f"""<div class="road-item{' next' if n else ''} fade"><span class="pin"></span><span class="when">{esc(w)}</span><div><h3>{esc(t)}</h3><p>{esc(d)}</p></div></div>""" for w, t, d, n in road)
    body = f"""
<section class="sec" style="padding-top:150px">
  <div class="wrap">
    <h1 class="d-xl split" style="max-width:12ch">Something new every Friday.</h1>
    <p class="lede fade" style="margin:26px 0 34px">New widgets, features and products arrive every Friday at 8 PM Pakistan time. Next one: <span data-drop-date>this Friday</span>.</p>
    <div class="fade">{clock()}</div>
  </div>
</section>
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <h2 class="d-md split" style="margin-bottom:24px">Roadmap</h2>
    <div class="road" style="max-width:860px"><div class="road-line"><i></i></div>{rows}</div>
    <p class="dim fade" style="margin-top:20px;font-size:15px">Dates can move as we listen to customers. Drops appear inside Kavora Desk automatically.</p>
  </div>
</section>
<section class="wrap" id="waitlist">
  <div class="final"><h2 class="d-lg split">Never miss a drop.</h2><p class="lede fade">One email when each drop is live.</p><div class="fade">{signup('drops')}</div></div>
</section>
"""
    page("drops", "Weekly drops and roadmap | Kavora", "New Kavora widgets, features and products every Friday. See what is coming next.", "drops", body)

def about():
    body = f"""
<section class="prose">
  <h1 class="split">We make the tools we wanted.</h1>
  <p class="lede" style="margin-top:22px">Running a business means juggling dozens of apps, tabs and templates, and most of them feel like an afterthought. Kavora exists to make that work lighter and better looking.</p>
  <h2>What we make</h2>
  <p>Native apps like Kavora Desk, ready-to-import automations, ad and brand templates, and complete business systems. Each product should save you time in the first five minutes.</p>
  <h2>How we work</h2>
  <ul><li>If it isn't fast and beautiful, it doesn't ship.</li><li>Pay once wherever we can. No surprise subscriptions.</li><li>Ship every Friday, so what you bought keeps improving.</li><li>Your data stays on your device.</li></ul>
  <h2>Where we are</h2>
  <p>Kavora is an independent studio based in {SITE['city']}, serving customers worldwide, with a focus on founders and teams in Pakistan and the UAE.</p>
  <h2>Contact</h2>
  <p>Questions, ideas or partnerships: <a href="mailto:{E}">{E}</a>. A person replies within one business day.</p>
</section>"""
    page("about", "About | Kavora", "Kavora is an independent studio making premium apps, automations and business kits for founders and teams.", "about", body)

def contact():
    body = f"""
<section class="prose">
  <h1 class="split">Talk to us</h1>
  <p class="lede" style="margin-top:22px">Real people answer every message within one business day, Monday to Saturday.</p>
  <h2>Email</h2><p><a href="mailto:{E}">{E}</a></p>
  <h2>Orders, licences and refunds</h2><p>Find your receipts and licence keys any time at <a href="https://app.lemonsqueezy.com/my-orders" rel="noopener" target="_blank">Lemon Squeezy: My Orders</a> using the email you bought with. For refunds within {SITE['refund_days']} days, email us your order number.</p>
  <h2>Business</h2><p>Kavora, {SITE['city']}. Online orders are processed by our reseller, Lemon Squeezy, which issues your invoice.</p>
  <h2>Security</h2><p>Found a security issue? Email <a href="mailto:{E}">{E}</a> with the details. We respond to reports within 48 hours.</p>
</section>"""
    page("contact", "Contact | Kavora", "Contact Kavora for help with orders, licences, refunds or partnerships.", "", body)

def auth_side(title, text):
    return f"""<div class="auth-side"><h2 class="d-lg">{title}</h2><p class="lede" style="margin-top:16px">{text}</p></div>"""

def login():
    body = f"""<section class="auth">{auth_side('Welcome back.', 'Your licences, downloads and drops in one place.')}
<div class="auth-main"><div class="auth-card">
  <h1>Sign in</h1><p class="soft">New here? <a class="link" href="/signup/">Create an account</a></p>
  <button class="btn google" type="button" data-google>{GOOGLE}Continue with Google</button>
  <div class="or">or use your email</div>
  <form data-login novalidate>
    <label class="sr" for="li-email">Email</label><input class="field" id="li-email" name="email" type="email" placeholder="Email" autocomplete="email" required>
    <label class="sr" for="li-pass">Password</label><input class="field" id="li-pass" name="password" type="password" placeholder="Password" autocomplete="current-password" required>
    <button class="btn btn-main" type="submit">Sign in</button>
  </form>
  <p class="auth-msg" role="status" aria-live="polite"></p>
  <p class="auth-alt"><a href="#" data-reset>Reset password</a></p>
</div></div></section>"""
    page("login", "Sign in | Kavora", "Sign in to your Kavora account.", "", body)

def signup_page():
    body = f"""<section class="auth">{auth_side('Make it yours.', 'Save your products, get licence keys faster and hear about drops first.')}
<div class="auth-main"><div class="auth-card">
  <h1>Create account</h1><p class="soft">Already have one? <a class="link" href="/login/">Sign in</a></p>
  <button class="btn google" type="button" data-google>{GOOGLE}Sign up with Google</button>
  <div class="or">or use your email</div>
  <form data-signup novalidate>
    <label class="sr" for="su-name">Name</label><input class="field" id="su-name" name="name" type="text" placeholder="Your name" autocomplete="name">
    <label class="sr" for="su-email">Email</label><input class="field" id="su-email" name="email" type="email" placeholder="Email" autocomplete="email" required>
    <label class="sr" for="su-pass">Password</label><input class="field" id="su-pass" name="password" type="password" placeholder="Password, 8+ characters" autocomplete="new-password" minlength="8" required>
    <button class="btn btn-main" type="submit">Create account</button>
  </form>
  <p class="auth-msg" role="status" aria-live="polite"></p>
  <p class="auth-alt dim" style="font-size:14px">By creating an account you agree to our <a href="/legal/terms/">terms</a> and <a href="/legal/privacy/">privacy policy</a>.</p>
</div></div></section>"""
    page("signup", "Create account | Kavora", "Create your Kavora account with Google or email.", "", body)

def account():
    body = f"""<section class="prose" style="max-width:820px">
  <div class="auth-card" style="width:100%"><p class="auth-msg" role="status" aria-live="polite"></p></div>
  <div class="acct" hidden>
    <h1>Hi, <span data-name>there</span>.</h1>
    <p class="lede" style="margin:12px 0 34px">Signed in as <span data-email></span></p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px">
      <div class="acct-card"><h3>Your licences and receipts</h3><p class="soft" style="margin:10px 0 20px">Licence keys and invoices live in Lemon Squeezy under the email you bought with.</p><a class="btn btn-main btn-sm" href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener">Open my orders</a></div>
      <div class="acct-card"><h3>Kavora Desk</h3><p class="soft" style="margin:10px 0 20px">Download the latest version or start your free trial.</p><a class="btn btn-quiet btn-sm" data-download href="/desk/">Download</a></div>
      <div class="acct-card"><h3>Account</h3><p class="soft" style="margin:10px 0 6px">Email status: <span data-verified></span></p><p class="soft" style="margin-bottom:20px">Member since <span data-since></span></p><button class="btn btn-quiet btn-sm" data-signout type="button">Sign out</button></div>
    </div>
  </div>
</section>"""
    page("account", "Your account | Kavora", "Your Kavora account.", "", body)

def legal(path, title, sections):
    s = "".join(f"<h2>{h}</h2>" + "".join(f"<p>{p}</p>" for p in ps) for h, ps in sections)
    page(path, f"{title} | Kavora", f"Kavora {title.lower()}.", "", f'<section class="prose"><h1>{title}</h1><p class="upd">Last updated {SITE["updated"]}</p>{s}</section>')

def legal_pages():
    legal("legal/terms", "Terms of service", [
        ("Who we are", [f"Kavora is an independent studio based in {SITE['city']}. Our order process is conducted by our online reseller Lemon Squeezy, the Merchant of Record for all orders. Lemon Squeezy handles payment, tax, invoicing and returns."]),
        ("Your purchase", ['Buying a product gives you a personal, non-transferable licence to use it as described in our <a href="/legal/license/">licence agreement</a>. Prices are in US dollars; local taxes are calculated at checkout.']),
        ("Accounts", ["You are responsible for keeping your login secure. Tell us straight away if you think someone else has used your account. We may suspend accounts used for fraud or abuse."]),
        ("Free trials", ["Trials let you evaluate a product before buying. Trial features stop when the trial ends until you enter a valid licence."]),
        ("Updates and drops", ["We release new features regularly, including weekly drops. Roadmap items are plans and may change."]),
        ("Acceptable use", ["Do not resell, share licence keys publicly, reverse engineer, or use our products for anything unlawful."]),
        ("Liability", ["Products are provided as is. To the extent the law allows, we are not liable for indirect or consequential losses, and our total liability is limited to what you paid for the product."]),
        ("Contact", [f'Questions about these terms: <a href="mailto:{E}">{E}</a>.']),
    ])
    legal("legal/privacy", "Privacy policy", [
        ("In short", ["We collect as little as possible, never sell your data and run no advertising trackers."]),
        ("Accounts", ["If you create an account we store your name, email and sign-in method with Google Firebase Authentication. If you sign in with Google we receive your name, email and profile picture from Google. Passwords are handled by Firebase and never stored by us."]),
        ("Waitlist", ["If you join the list we store your email address and the page you joined from, only to send product news. A hashed version of your IP address is kept for ten minutes to stop spam."]),
        ("Purchases", ["Payments are processed by Lemon Squeezy, which receives your name, email, billing country and payment details under its own privacy policy. We receive your name, email and order details. Licence checks send your licence key and an anonymous device name to Lemon Squeezy."]),
        ("Inside the app", ["Kavora Desk keeps widgets, notes, tasks and statistics on your Mac. Weather (Open-Meteo) and prayer times (AlAdhan) are requested using only the city and country you choose."]),
        ("Cookies", ["We use only the storage needed to keep you signed in. No analytics or advertising cookies."]),
        ("Your rights", [f'Ask for a copy of your data, a correction or deletion at <a href="mailto:{E}">{E}</a>. Unsubscribe from emails in one click. You can delete your account at any time by emailing us.']),
    ])
    legal("legal/refunds", "Refund policy", [
        (f"{SITE['refund_days']}-day money-back guarantee", [f'If a Kavora product isn\'t right for you, email <a href="mailto:{E}">{E}</a> within {SITE["refund_days"]} days of purchase with your order number. We will arrange a full refund through Lemon Squeezy, usually within 2 business days.']),
        ("Try before you buy", ["Kavora Desk has a free trial so you can check it works on your Mac before paying."]),
        ("After a refund", ["Your licence key is deactivated once the refund is issued."]),
    ])
    legal("legal/license", "Licence agreement", [
        ("What you can do", ["Each paid licence lets one person use the product on up to 2 Macs they own or control. Templates you customise for your own business are yours to use commercially."]),
        ("What you can't do", ["Share, sell, rent or publish your licence key, or redistribute, modify or reverse engineer the software."]),
        ("Updates", ["Your licence includes updates and weekly drops for one year from purchase. The version you have keeps working after that."]),
        ("Ownership", ["The software and designs remain the property of Kavora."]),
        ("Ending the licence", ["The licence ends if you break these terms or receive a refund."]),
    ])

def notfound():
    page("404", "Page not found | Kavora", "Page not found.", "", f'<section class="prose" style="text-align:center;padding-top:200px"><h1 class="d-lg">This page doesn\'t exist.</h1><p class="lede" style="margin:18px auto 30px">The link may be old or mistyped.</p><div class="btn-row" style="justify-content:center"><a class="btn btn-main" href="/">Go to the home page</a><a class="btn btn-quiet" href="/store/">Browse the catalog</a></div></section>')

def seo():
    pages = ["", "store", "desk", "drops", "about", "contact", "legal/terms", "legal/privacy", "legal/refunds", "legal/license"]
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "".join(f"<url><loc>https://{SITE['domain']}/{p + '/' if p else ''}</loc></url>" for p in pages) + "</urlset>", encoding="utf-8")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /account/\nDisallow: /data/\nSitemap: https://{SITE['domain']}/sitemap.xml\n", encoding="utf-8")

def browser_settings():
    js = {
        "deskCheckout": CFG.get("desk_checkout_link", ""), "deskDownload": CFG.get("desk_download_link", ""),
        "founderSeats": CFG.get("founder_seats", 100), "founderSold": CFG.get("founder_sold", 0),
    }
    (ROOT / "assets/js/settings.js").write_text("/* Generated from content/settings.json — edit there, not here. */\nwindow.KAVORA_SETTINGS = " + json.dumps(js) + ";\n", encoding="utf-8")

if __name__ == "__main__":
    browser_settings()
    home(); store(); desk(); drops(); about(); contact(); login(); signup_page(); account(); legal_pages(); notfound(); seo()
