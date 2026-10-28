/* Kavora free tools. Everything runs in the browser — nothing typed here is sent anywhere. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const tool = document.body.dataset.tool;
  const num = (v) => { const n = parseFloat(String(v).replace(/,/g, "")); return isFinite(n) ? n : 0; };
  const money = (n, cur) => {
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: cur || "USD", maximumFractionDigits: 2 }).format(n); }
    catch { return (cur ? cur + " " : "") + n.toFixed(2); }
  };
  const pct = (n) => (isFinite(n) ? n.toFixed(2).replace(/\.00$/, "") : "0") + "%";
  const save = (k, v) => { try { localStorage.setItem("kvt-" + k, JSON.stringify(v)); } catch {} };
  const load = (k) => { try { return JSON.parse(localStorage.getItem("kvt-" + k)); } catch { return null; } };
  const copy = async (text, btn) => {
    try { await navigator.clipboard.writeText(text); } catch { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    if (btn) { const o = btn.textContent; btn.textContent = "Copied"; setTimeout(() => (btn.textContent = o), 1500); }
  };
  const qrSvg = (text, size = 220) => {
    if (!window.qrcode || !text) return "";
    const q = qrcode(0, "M"); q.addData(text); q.make();
    return q.createSvgTag({ cellSize: Math.max(2, Math.floor(size / (q.getModuleCount() + 8))), margin: 4, scalable: true });
  };
  const downloadSvgAsPng = (svgEl, name) => {
    const xml = new XMLSerializer().serializeToString(svgEl);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = c.height = 1024;
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, 1024, 1024); g.drawImage(img, 0, 0, 1024, 1024);
      const a = document.createElement("a"); a.download = name; a.href = c.toDataURL("image/png"); a.click();
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
  };

  /* ---------- Profit margin & markup ---------- */
  if (tool === "profit") {
    const f = $("#pm"); const out = $("#pm-out");
    const calc = () => {
      const cur = f.currency.value, cost = num(f.cost.value), mode = f.mode.value;
      let price, profit, margin, markup;
      if (mode === "price") { price = num(f.price.value); }
      else if (mode === "margin") { const m = num(f.target.value) / 100; price = m < 1 ? cost / (1 - m) : 0; }
      else { price = cost * (1 + num(f.target.value) / 100); }
      profit = price - cost; margin = price ? (profit / price) * 100 : 0; markup = cost ? (profit / cost) * 100 : 0;
      const qty = Math.max(1, num(f.qty.value) || 1);
      out.innerHTML = `
        <div class="res big"><span>Selling price</span><b>${money(price, cur)}</b></div>
        <div class="res"><span>Profit per sale</span><b class="${profit < 0 ? "neg" : ""}">${money(profit, cur)}</b></div>
        <div class="res"><span>Profit margin</span><b>${pct(margin)}</b></div>
        <div class="res"><span>Markup</span><b>${pct(markup)}</b></div>
        <div class="res"><span>Profit on ${qty.toLocaleString()} sales</span><b>${money(profit * qty, cur)}</b></div>`;
      $("#pm-price-row").hidden = mode !== "price"; $("#pm-target-row").hidden = mode === "price";
      $("#pm-target-label").textContent = mode === "margin" ? "Target margin (%)" : "Markup (%)";
      save("profit", Object.fromEntries(new FormData(f)));
    };
    const s = load("profit"); if (s) Object.entries(s).forEach(([k, v]) => { if (f[k]) f[k].value = v; });
    f.addEventListener("input", calc); calc();
  }

  /* ---------- VAT / GST ---------- */
  if (tool === "vat") {
    const f = $("#vat"); const out = $("#vat-out");
    const calc = () => {
      const rate = num(f.rate.value) / 100, amt = num(f.amount.value), cur = f.currency.value;
      let net, tax, gross;
      if (f.mode.value === "add") { net = amt; tax = amt * rate; gross = net + tax; }
      else { gross = amt; net = amt / (1 + rate); tax = gross - net; }
      out.innerHTML = `
        <div class="res"><span>Amount before tax</span><b>${money(net, cur)}</b></div>
        <div class="res"><span>Tax at ${pct(rate * 100)}</span><b>${money(tax, cur)}</b></div>
        <div class="res big"><span>Total including tax</span><b>${money(gross, cur)}</b></div>`;
      save("vat", Object.fromEntries(new FormData(f)));
    };
    $$("[data-rate]").forEach((b) => b.addEventListener("click", () => {
      f.rate.value = b.dataset.rate; if (b.dataset.cur) f.currency.value = b.dataset.cur;
      $$("[data-rate]").forEach((x) => x.classList.toggle("on", x === b)); calc();
    }));
    const s = load("vat"); if (s) Object.entries(s).forEach(([k, v]) => { if (f[k]) f[k].value = v; });
    f.addEventListener("input", calc); calc();
  }

  /* ---------- WhatsApp link + QR ---------- */
  if (tool === "whatsapp") {
    const f = $("#wa"); const linkEl = $("#wa-link"); const qr = $("#wa-qr");
    const build = () => {
      const digits = (f.code.value + f.phone.value).replace(/\D/g, "").replace(/^00/, "");
      const local = f.phone.value.replace(/\D/g, "").replace(/^0+/, "");
      const full = (f.code.value.replace(/\D/g, "") + local);
      const msg = f.message.value.trim();
      const url = full.length > 6 ? `https://wa.me/${full}${msg ? "?text=" + encodeURIComponent(msg) : ""}` : "";
      linkEl.value = url;
      qr.innerHTML = url ? qrSvg(url) : '<p class="muted-s">Enter a phone number to see the QR code.</p>';
      $("#wa-open").href = url || "#";
      save("wa", { code: f.code.value, phone: f.phone.value, message: f.message.value });
      return digits;
    };
    const s = load("wa"); if (s) Object.entries(s).forEach(([k, v]) => { if (f[k]) f[k].value = v; });
    f.addEventListener("input", build); build();
    $("#wa-copy").addEventListener("click", (e) => linkEl.value && copy(linkEl.value, e.currentTarget));
    $("#wa-png").addEventListener("click", () => { const svg = $("svg", qr); if (svg) downloadSvgAsPng(svg, "whatsapp-qr.png"); });
  }

  /* ---------- UTM builder ---------- */
  if (tool === "utm") {
    const f = $("#utm"); const out = $("#utm-out"); const qr = $("#utm-qr");
    const presets = {
      facebook: ["facebook", "paid_social"], instagram: ["instagram", "social"], whatsapp: ["whatsapp", "messaging"],
      google: ["google", "cpc"], newsletter: ["newsletter", "email"], tiktok: ["tiktok", "paid_social"], linkedin: ["linkedin", "social"],
    };
    const clean = (v) => v.trim().toLowerCase().replace(/\s+/g, "_");
    const build = () => {
      let base = f.url.value.trim();
      if (base && !/^https?:\/\//i.test(base)) base = "https://" + base;
      let u; try { u = new URL(base); } catch { out.value = ""; qr.innerHTML = '<p class="muted-s">Enter your page address to build the link.</p>'; return; }
      [["utm_source", f.source.value], ["utm_medium", f.medium.value], ["utm_campaign", f.campaign.value], ["utm_term", f.term.value], ["utm_content", f.content.value]]
        .forEach(([k, v]) => { if (v.trim()) u.searchParams.set(k, clean(v)); else u.searchParams.delete(k); });
      out.value = u.toString(); qr.innerHTML = qrSvg(out.value);
      save("utm", Object.fromEntries(new FormData(f)));
    };
    $$("[data-preset]").forEach((b) => b.addEventListener("click", () => {
      const [s, m] = presets[b.dataset.preset]; f.source.value = s; f.medium.value = m;
      $$("[data-preset]").forEach((x) => x.classList.toggle("on", x === b)); build();
    }));
    const s = load("utm"); if (s) Object.entries(s).forEach(([k, v]) => { if (f[k]) f[k].value = v; });
    f.addEventListener("input", build); build();
    $("#utm-copy").addEventListener("click", (e) => out.value && copy(out.value, e.currentTarget));
    $("#utm-png").addEventListener("click", () => { const svg = $("svg", qr); if (svg) downloadSvgAsPng(svg, "campaign-qr.png"); });
  }

  /* ---------- Invoice generator ---------- */
  if (tool === "invoice") {
    const f = $("#inv"); const rows = $("#inv-rows"); const prev = $("#inv-preview");
    const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const addRow = (d = { desc: "", qty: 1, price: 0 }) => {
      const r = document.createElement("div"); r.className = "inv-row";
      r.innerHTML = `<input class="tf" name="desc" placeholder="Item or service" value="${esc(d.desc)}" aria-label="Description">
        <input class="tf num" name="qty" type="number" min="0" step="any" value="${d.qty}" aria-label="Quantity">
        <input class="tf num" name="price" type="number" min="0" step="any" value="${d.price}" aria-label="Unit price">
        <button type="button" class="tbtn ghost del" aria-label="Remove line">×</button>`;
      $(".del", r).addEventListener("click", () => { r.remove(); render(); });
      rows.appendChild(r);
    };
    const data = () => ({
      from: f.from.value, to: f.to.value, number: f.number.value, date: f.date.value, due: f.due.value,
      currency: f.currency.value, tax: f.tax.value, discount: f.discount.value, notes: f.notes.value,
      items: $$(".inv-row", rows).map((r) => ({ desc: $("[name=desc]", r).value, qty: num($("[name=qty]", r).value), price: num($("[name=price]", r).value) })),
    });
    const render = () => {
      const d = data(), cur = d.currency;
      const sub = d.items.reduce((a, i) => a + i.qty * i.price, 0);
      const disc = sub * num(d.discount) / 100, taxed = sub - disc, tax = taxed * num(d.tax) / 100, total = taxed + tax;
      const lines = d.items.filter((i) => i.desc || i.price).map((i) => `<tr><td>${esc(i.desc)}</td><td class="r">${i.qty}</td><td class="r">${money(i.price, cur)}</td><td class="r">${money(i.qty * i.price, cur)}</td></tr>`).join("");
      prev.innerHTML = `
        <div class="ip-head"><div><div class="ip-title">Invoice</div><div class="ip-meta">No. ${esc(d.number)}<br>Issued ${esc(d.date)}${d.due ? "<br>Due " + esc(d.due) : ""}</div></div>
          <div class="ip-from">${esc(d.from).replace(/\n/g, "<br>")}</div></div>
        <div class="ip-to"><span>Bill to</span>${esc(d.to).replace(/\n/g, "<br>")}</div>
        <table class="ip-table"><thead><tr><th>Description</th><th class="r">Qty</th><th class="r">Price</th><th class="r">Amount</th></tr></thead><tbody>${lines || '<tr><td colspan="4" class="muted-s">Add a line item to see it here.</td></tr>'}</tbody></table>
        <div class="ip-totals"><div><span>Subtotal</span><b>${money(sub, cur)}</b></div>
          ${num(d.discount) ? `<div><span>Discount (${pct(num(d.discount))})</span><b>−${money(disc, cur)}</b></div>` : ""}
          ${num(d.tax) ? `<div><span>Tax (${pct(num(d.tax))})</span><b>${money(tax, cur)}</b></div>` : ""}
          <div class="grand"><span>Total due</span><b>${money(total, cur)}</b></div></div>
        ${d.notes ? `<div class="ip-notes">${esc(d.notes).replace(/\n/g, "<br>")}</div>` : ""}`;
      save("invoice", d);
    };
    const s = load("invoice");
    const today = new Date().toISOString().slice(0, 10);
    if (s) { ["from", "to", "number", "date", "due", "currency", "tax", "discount", "notes"].forEach((k) => { if (f[k] && s[k] != null) f[k].value = s[k]; }); (s.items || []).forEach(addRow); }
    else { f.date.value = today; f.number.value = "INV-" + today.replace(/-/g, "").slice(2) + "-01"; addRow({ desc: "Website design", qty: 1, price: 500 }); addRow({ desc: "Monthly support", qty: 3, price: 80 }); }
    if (!$$(".inv-row", rows).length) addRow();
    $("#inv-add").addEventListener("click", () => { addRow(); render(); });
    $("#inv-print").addEventListener("click", () => { render(); window.print(); });
    $("#inv-reset").addEventListener("click", () => { try { localStorage.removeItem("kvt-invoice"); } catch {} location.reload(); });
    f.addEventListener("input", render); rows.addEventListener("input", render); render();
  }
})();

/* Ad slots (only present when an AdSense ID is set in the admin panel) */
document.querySelectorAll(".adsbygoogle").forEach(() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {} });
