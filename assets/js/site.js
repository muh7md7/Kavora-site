/* Kavora site — settings + motion. Change values in KAVORA only; nothing else needs editing. */
window.KAVORA = {
  deskCheckout: "",       // Lemon Squeezy checkout link for Kavora Desk
  deskDownload: "",       // trial .dmg link
  founderSeats: 100,
  founderSold: 0,
  dropDayUTC: 5,          // Friday
  dropHourUTC: 15         // 20:00 Pakistan time
};

(function () {
  const K = window.KAVORA;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = () => innerWidth > 960;
  const hasG = typeof window.gsap !== "undefined";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3.2), smoothWheel: true });
    if (hasG) {
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -90 }); }
    }));
  }

  /* ---------- Nav ---------- */
  const nav = $(".nav");
  const burger = $(".burger");
  if (burger) burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  let lastY = 0;
  const onScroll = (y) => {
    if (!nav || nav.classList.contains("open")) return;
    nav.classList.toggle("hide", y > lastY && y > 240);
    lastY = y;
  };
  if (lenis) lenis.on("scroll", (e) => onScroll(e.scroll)); else addEventListener("scroll", () => onScroll(scrollY), { passive: true });

  /* ---------- Cursor light + magnetic buttons ---------- */
  const light = $(".cursor-light");
  if (light && !reduce && matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", (e) => { light.style.left = e.clientX + "px"; light.style.top = e.clientY + "px"; }, { passive: true });
  }
  if (!reduce && matchMedia("(hover: hover)").matches) {
    $$(".btn").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        b.style.setProperty("--mx", x + "px"); b.style.setProperty("--my", y + "px");
        b.style.transform = `translate(${(x - r.width / 2) * 0.12}px, ${(y - r.height / 2) * 0.22}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
    // 3D tilt for product cards
    $$(".prod").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.transform = `perspective(900px) rotateY(${(px - .5) * 9}deg) rotateX(${(.5 - py) * 7}deg)`;
        c.style.setProperty("--gx", px * 100 + "%"); c.style.setProperty("--gy", py * 100 + "%");
      });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
  }

  /* ---------- Split headings into words ---------- */
  $$(".split").forEach((el) => {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement("span"); w.className = "w";
            const i = document.createElement("span"); i.textContent = part; w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains("w")) walk(n);
      });
    };
    walk(el);
  });

  /* ---------- GSAP choreography ---------- */
  if (hasG && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    // Page-load moment: hero words rise, then the desktop assembles
    const heroWords = $$(".hero .split .w > span");
    const load = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (heroWords.length) load.from(heroWords, { yPercent: 110, duration: 1.2, stagger: 0.06 }, 0.1);
    load.fromTo(".hero .fade", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.5);

    // Other pages: widgets drift in once, gently
    const calm = $$(".screen .wd").filter((w) => !w.closest(".hero"));
    if (calm.length) gsap.from(calm, { opacity: 0, y: 18, scale: 0.94, duration: 0.9, stagger: 0.06, ease: "power3.out", delay: 0.3 });

    const widgets = $$(".hero .screen .wd");
    if (widgets.length) {
      // scattered "messy desktop" positions
      const mess = [[-26, 22, -7], [40, 54, 9], [-22, -14, 5], [54, -26, -5], [-46, 28, 7], [22, 40, -8], [-34, -40, 5]];
      if (wide()) {
        gsap.set(".screen", { transformPerspective: 1400 });
        load.from(".screen", { y: 80, rotateX: 14, opacity: 0, duration: 1.4 }, 0.25);
        widgets.forEach((w, i) => {
          const [x, y, r] = mess[i % mess.length];
          gsap.set(w, { x, y, rotate: r, scale: 0.86 });
        });
        load.from(widgets, { opacity: 0, scale: 0.5, duration: 1, stagger: 0.07, ease: "back.out(1.6)" }, 0.6);

        // Scroll: the desktop arranges itself into Smart Zones
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".hero", start: "top top", end: "+=130%", scrub: 0.8, pin: ".hero-pin", anticipatePin: 1 }
        });
        tl.to(".scroll-hint", { opacity: 0, duration: 0.15 }, 0)
          .to(".screen-grid", { opacity: 1, duration: 0.25 }, 0.05)
          .to(widgets, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.6, stagger: 0.04, ease: "power3.inOut" }, 0.1)
          .to(".screen-grid", { opacity: 0, duration: 0.25 }, 0.75)
          .to(".hero-copy", { opacity: 0.25, x: -30, duration: 0.4 }, 0.6)
          .to(".screen", { scale: 1.06, duration: 0.5 }, 0.55)
          .to(".hero-caption", { opacity: 1, y: -10, duration: 0.3 }, 0.8);
      } else {
        load.from(widgets, { opacity: 0, y: 20, scale: 0.9, duration: 0.9, stagger: 0.06 }, 0.5);
      }
    }

    // Section headings: words rise as they enter
    $$(".split").forEach((el) => {
      if (el.closest(".hero")) return;
      gsap.from($$(".w > span", el), {
        yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 86%" }
      });
    });
    // Gentle fade for supporting content
    $$(".fade").forEach((el) => {
      if (el.closest(".hero")) return;
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" } });
    });

    // Catalog shelf slides sideways while you scroll down
    const track = $(".shelf-track");
    if (track && wide()) {
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: ".shelf", start: "top top", end: () => "+=" + dist(), scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      $$(".prod-art > *", track).forEach((art) => {
        gsap.fromTo(art, { xPercent: 12 }, { xPercent: -12, ease: "none",
          scrollTrigger: { trigger: ".shelf", start: "top top", end: () => "+=" + dist(), scrub: true } });
      });
    }

    // Buying steps: a line draws across each step in turn
    $$(".step-line").forEach((ln, i) => {
      gsap.to(ln, { width: "100%", ease: "none", scrollTrigger: { trigger: ".steps", start: `top ${75 - i * 8}%`, end: `top ${45 - i * 8}%`, scrub: true } });
    });
    // Roadmap line fills as you scroll
    const rl = $(".road-line i");
    if (rl) gsap.to(rl, { height: "100%", ease: "none", scrollTrigger: { trigger: ".road", start: "top 70%", end: "bottom 60%", scrub: true } });
    // Parallax depth
    $$("[data-depth]").forEach((el) => {
      gsap.to(el, { yPercent: -parseFloat(el.dataset.depth), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    // Footer wordmark drifts in
    const fw = $(".foot-word");
    if (fw) gsap.fromTo(fw, { xPercent: 8 }, { xPercent: -4, ease: "none", scrollTrigger: { trigger: "footer", start: "top bottom", end: "bottom bottom", scrub: true } });

    addEventListener("load", () => ScrollTrigger.refresh());
  } else {
    document.documentElement.classList.remove("js");
  }

  /* ---------- Buy / download ---------- */
  $$("[data-buy]").forEach((a) => {
    if (K.deskCheckout) { a.href = K.deskCheckout; a.classList.add("lemonsqueezy-button"); }
    else a.href = "/desk#waitlist";
  });
  $$("[data-download]").forEach((a) => (a.href = K.deskDownload || "/desk#waitlist"));
  if (K.deskCheckout) { const s = document.createElement("script"); s.src = "https://app.lemonsqueezy.com/js/lemon.js"; s.defer = true; document.head.appendChild(s); }

  /* ---------- Founder seats ---------- */
  $$("[data-seats]").forEach((el) => {
    const left = Math.max(0, K.founderSeats - K.founderSold);
    const n = $("[data-left]", el); if (n) n.textContent = left;
    const bar = $(".bar i", el);
    if (bar && "IntersectionObserver" in window) {
      new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { bar.style.width = Math.max(3, K.founderSold / K.founderSeats * 100) + "%"; o.disconnect(); } })).observe(el);
    }
  });

  /* ---------- Countdown ---------- */
  const nextDrop = (now) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), K.dropHourUTC));
    let add = (K.dropDayUTC - d.getUTCDay() + 7) % 7;
    if (add === 0 && d <= now) add = 7;
    d.setUTCDate(d.getUTCDate() + add); return d;
  };
  const clocks = $$("[data-clock]");
  if (clocks.length) {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const now = new Date(), s = Math.max(0, Math.floor((nextDrop(now) - now) / 1000));
      const v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
      clocks.forEach((c) => Object.entries(v).forEach(([k, val]) => { const el = $(`[data-${k}]`, c); if (el) el.textContent = pad(val); }));
    };
    tick(); setInterval(tick, 1000);
    $$("[data-drop-date]").forEach((el) => (el.textContent = nextDrop(new Date()).toLocaleString(undefined, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })));
  }

  /* ---------- Waitlist ---------- */
  $$("form.signup").forEach((form) => form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const note = form.parentElement.querySelector(".note");
    const btn = form.querySelector("button");
    const email = form.email.value.trim();
    if (!email) return;
    btn.disabled = true; btn.textContent = "Joining…";
    try {
      const r = await fetch("/subscribe.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, source: form.dataset.source || location.pathname, website: form.website.value }) });
      if (r.status === 429) throw new Error("slow");
      if (!r.ok) throw new Error("fail");
      form.reset(); btn.textContent = "You're in";
      if (note) note.textContent = "Done. We'll email you when it drops.";
    } catch (err) {
      btn.disabled = false; btn.textContent = "Join the list";
      if (note) note.textContent = err.message === "slow" ? "Too many tries. Wait a minute and try again." : "That didn't save. Check your connection and try again.";
    }
  }));

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
