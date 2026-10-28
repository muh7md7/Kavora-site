/* Kavora marketing engine.
   Everything here is controlled from the admin panel (content/marketing.json).
   Honesty rules are enforced in code:
   - items marked "Simulated" always show a visible label;
   - countdowns need a fixed end date and disappear when it passes (never reset);
   - a simulated visitor count always says "simulated". */
(function () {
  const M = window.KAVORA_MKT;
  if (!M || !M.enabled) return;
  const R = M.rules || {};
  const page = document.body.dataset.page || "";
  if (["login", "signup", "account", "404"].includes(page)) return;
  const pageRule = {
    "All pages": true,
    "Home only": page === "home",
    "Home and Kavora Desk": page === "home" || page === "desk",
    "Product pages only": page === "store" || page === "desk",
  }[R.pages];
  if (pageRule === false) return;
  const phone = innerWidth <= 640;
  if (phone && R.show_on_mobile === false) return;

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem("kv-" + k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("kv-" + k, JSON.stringify(v)); } catch {} },
  };
  const snoozed = (k) => { const t = store.get("closed-" + k); return t && Date.now() - t < (R.hide_for_days_after_close ?? 1) * 864e5; };
  const snooze = (k) => store.set("closed-" + k, Date.now());
  // End dates are entered in Pakistan time (UTC+5)
  const endOf = (s) => { if (!s) return null; const d = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : (s.length <= 16 ? s + ":00" : s) + "+05:00"); return isNaN(d) ? null : d; };
  const left = (end) => Math.max(0, Math.floor((end - Date.now()) / 1000));
  const fmt = (s) => { const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60, p = (n) => String(n).padStart(2, "0");
    return (d ? `<b>${d}</b>d ` : "") + `<b>${p(h)}</b>h <b>${p(m)}</b>m <b>${p(x)}</b>s`; };
  const anim = { "Slide up": "a-up", "Fade": "a-fade", "Pop": "a-pop", "Slide from side": "a-side" }[R.animation] || "a-up";
  const pos = phone ? "p-center" : ({ "Bottom left": "p-left", "Bottom right": "p-right", "Bottom centre": "p-center" }[R.position] || "p-left");
  const tickers = new Set();
  setInterval(() => tickers.forEach((fn) => fn()), 1000);

  /* ---------- 1. CTA banner (top of page) ---------- */
  const B = M.banner || {};
  if (B.enabled && B.text && !snoozed("banner")) {
    const end = endOf(B.ends_at);
    if (!end || left(end) > 0) {
      const el = document.createElement("div");
      el.className = "kv-banner " + ({ Glass: "b-glass", Pearl: "b-pearl" }[B.style] || "b-grad");
      el.innerHTML = `<div class="kv-banner-in"><span class="kv-b-text"><span class="long">${esc(B.text)}</span><span class="short">${esc(B.short_text || B.text)}</span></span>` +
        (end ? `<span class="kv-b-time" aria-label="Time left"></span>` : "") +
        (B.button ? `<a class="kv-b-btn" href="${esc(B.link || "#")}">${esc(B.button)}</a>` : "") +
        `<button class="kv-x" aria-label="Close banner">×</button></div>`;
      document.body.prepend(el);
      document.body.classList.add("has-banner");
      if (end) { const t = $(".kv-b-time", el); const f = () => { const s = left(end); if (!s) { el.remove(); document.body.classList.remove("has-banner"); tickers.delete(f); return; } t.innerHTML = fmt(s); }; f(); tickers.add(f); }
      $(".kv-x", el).addEventListener("click", () => { el.classList.add("out"); snooze("banner"); setTimeout(() => { el.remove(); document.body.classList.remove("has-banner"); }, 350); });
    }
  }

  /* ---------- Modal (offer + lead) ---------- */
  let modalOpen = false;
  function modal(key, html, onMount) {
    if (modalOpen || snoozed(key)) return false;
    modalOpen = true;
    const wrap = document.createElement("div");
    wrap.className = "kv-modal " + anim;
    wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML = `<div class="kv-scrim"></div><div class="kv-card" tabindex="-1"><button class="kv-x" aria-label="Close">×</button>${html}</div>`;
    document.body.appendChild(wrap);
    requestAnimationFrame(() => wrap.classList.add("in"));
    const card = $(".kv-card", wrap); card.focus({ preventScroll: true });
    const close = () => { wrap.classList.remove("in"); snooze(key); modalOpen = false; document.removeEventListener("keydown", esc_); setTimeout(() => wrap.remove(), 400); };
    const esc_ = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", esc_);
    $(".kv-scrim", wrap).addEventListener("click", close);
    $(".kv-x", wrap).addEventListener("click", close);
    onMount && onMount(wrap, close);
    return true;
  }

  function onTrigger(cfg, fire) {
    const how = cfg.trigger || "After delay";
    let done = false; const go = () => { if (!done) { done = fire() !== false; } };
    if (how === "Immediately") setTimeout(go, 600);
    if (how === "After delay") setTimeout(go, (cfg.delay_seconds ?? 10) * 1000);
    if (how === "On scroll") {
      const f = () => { const pct = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100; if (pct >= (cfg.scroll_percent ?? 50)) { removeEventListener("scroll", f); go(); } };
      addEventListener("scroll", f, { passive: true });
    }
    if (how === "Exit intent") {
      if (!phone) document.addEventListener("mouseout", (e) => { if (!e.relatedTarget && e.clientY <= 4) go(); });
      // Phones: a quick scroll back up after reading a good part of the page
      let maxY = 0, lastY = scrollY, lastT = Date.now();
      addEventListener("scroll", () => {
        const y = scrollY, now = Date.now(); maxY = Math.max(maxY, y);
        const pct = maxY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100;
        if (pct > (cfg.scroll_percent ?? 50) && lastY - y > 140 && now - lastT < 260) go();
        lastY = y; lastT = now;
      }, { passive: true });
      setTimeout(go, Math.max(30, cfg.delay_seconds ?? 45) * 1000); // fallback
    }
  }

  /* ---------- 2. Limited-time offer ---------- */
  const O = M.offer || {};
  if (O.enabled && O.title) {
    const end = endOf(O.ends_at);
    if (!end || left(end) > 0) onTrigger(O, () => modal("offer", `
      ${O.badge ? `<span class="kv-badge">${esc(O.badge)}</span>` : ""}
      <h3 class="kv-title">${esc(O.title)}</h3>
      <p class="kv-text">${esc(O.text)}</p>
      ${end ? `<div class="kv-clock"><span>Offer ends in</span><div class="kv-time"></div></div>` : ""}
      ${O.code ? `<button class="kv-code" type="button"><span>${esc(O.code)}</span><small>Tap to copy</small></button>` : ""}
      <a class="btn btn-main kv-cta" href="${esc(O.link || "#")}">${esc(O.button || "Get the offer")}</a>`,
      (w, close) => {
        if (end) { const t = $(".kv-time", w); const f = () => { const s = left(end); if (!s) { close(); tickers.delete(f); return; } t.innerHTML = fmt(s); }; f(); tickers.add(f); }
        const c = $(".kv-code", w);
        if (c) c.addEventListener("click", async () => { try { await navigator.clipboard.writeText(O.code); } catch {} $("small", c).textContent = "Copied"; });
        $(".kv-cta", w).addEventListener("click", () => snooze("offer"));
      }));
  }

  /* ---------- 3. Lead capture ---------- */
  const L = M.lead || {};
  if (L.enabled && L.title && !store.get("joined")) {
    onTrigger(L, () => modal("lead", `
      <h3 class="kv-title">${esc(L.title)}</h3>
      <p class="kv-text">${esc(L.text)}</p>
      <form class="kv-form"><label class="sr" for="kv-em">Email address</label>
        <input class="field" id="kv-em" type="email" name="email" placeholder="you@business.com" autocomplete="email" required>
        <input type="text" name="website" tabindex="-1" autocomplete="off" hidden>
        <button class="btn btn-main" type="submit">${esc(L.button || "Join the list")}</button></form>
      <p class="kv-note">One email per drop. Unsubscribe in one click.</p>`,
      (w) => {
        const f = $(".kv-form", w), note = $(".kv-note", w), btn = $("button", f);
        f.addEventListener("submit", async (e) => {
          e.preventDefault(); btn.disabled = true; btn.textContent = "Joining…";
          try {
            const r = await fetch("/subscribe.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ email: f.email.value.trim(), source: "popup", website: f.website.value }) });
            if (!r.ok) throw 0;
            store.set("joined", 1); f.remove(); note.textContent = L.success || "You're on the list.";
          } catch { btn.disabled = false; btn.textContent = L.button || "Join the list"; note.textContent = "That didn't save. Check your connection and try again."; }
        });
      }));
  }

  /* ---------- 4. Visitor counter ---------- */
  const V = M.visitors || {};
  if (V.enabled) {
    const sim = /simulat/i.test(V.source || "");
    const pill = document.createElement("div");
    pill.className = `kv-pill ${pos}`; pill.hidden = true;
    pill.innerHTML = `<i></i><span></span>${sim ? '<em class="kv-tag">Simulated</em>' : ""}`;
    document.body.appendChild(pill);
    const show = (n) => {
      if (n < (V.show_when_at_least ?? 3)) { pill.hidden = true; return; }
      $("span", pill).textContent = (V.text || "{n} people are viewing right now").replace("{n}", n.toLocaleString());
      if (pill.hidden) { pill.hidden = false; requestAnimationFrame(() => pill.classList.add("in")); }
    };
    setTimeout(() => {
      if (sim) {
        const lo = Math.max(0, V.simulated_min ?? 5), hi = Math.max(lo, V.simulated_max ?? 20);
        let n = Math.round(lo + Math.random() * (hi - lo));
        show(n);
        setInterval(() => { n = Math.min(hi, Math.max(lo, n + Math.round((Math.random() - 0.5) * 4))); show(n); }, 9000);
      } else {
        let sid = ""; try { sid = sessionStorage.getItem("kv-sid") || ""; } catch {}
        if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); try { sessionStorage.setItem("kv-sid", sid); } catch {} }
        const ping = async () => { if (document.hidden) return; try { const r = await fetch("/stats.php?sid=" + sid, { cache: "no-store" }); if ((r.headers.get("content-type") || "").includes("json")) show((await r.json()).live || 0); } catch {} };
        ping(); setInterval(ping, 30000);
      }
    }, Math.max(2, (R.first_popup_after_seconds ?? 8) / 2) * 1000);
  }

  /* ---------- 5. Activity popups ---------- */
  const A = M.activity || {};
  const items = (A.items || []).filter((x) => x && x.text);
  if (A.enabled && items.length && !snoozed("activity")) {
    const icons = { Purchase: "🛍️", Trial: "✨", Signup: "📩", Review: "⭐", Download: "⬇️" };
    let i = 0, shown = 0;
    const max = R.max_popups_per_visit ?? 4;
    const next = () => {
      if (shown >= max || snoozed("activity")) return;
      if (modalOpen) { setTimeout(next, 4000); return; }
      const it = items[i++ % items.length]; shown++;
      const simulated = !/real/i.test(it.kind || "");
      const t = document.createElement(it.link ? "a" : "div");
      if (it.link) t.href = it.link;
      t.className = `kv-toast ${pos} ${anim}`;
      t.innerHTML = `<span class="kv-ico">${icons[it.icon] || "✨"}</span><span class="kv-t-body"><b>${esc(it.text)}</b><small>${esc(it.when || "")}${simulated ? " · illustrative" : ""}</small></span>${simulated ? '<em class="kv-tag">Example</em>' : ""}<button class="kv-x" aria-label="Hide these notifications">×</button>`;
      document.body.appendChild(t);
      requestAnimationFrame(() => t.classList.add("in"));
      $(".kv-x", t).addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); snooze("activity"); t.classList.remove("in"); setTimeout(() => t.remove(), 400); shown = max; });
      setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 450); }, 6000);
      setTimeout(next, (R.seconds_between_popups ?? 20) * 1000);
    };
    setTimeout(next, (R.first_popup_after_seconds ?? 8) * 1000);
  }
})();
