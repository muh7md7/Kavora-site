"use client";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2, Pencil, RotateCcw, X } from "lucide-react";
import { services, site, isConfirmed, menuName, type ServiceId } from "@/content/site";
import { budgets, contactMethods, enquiryTypes, packages, serviceIcon, timelines } from "@/content/enquiry";
import { SelectCard } from "@/components/ui/SelectCard";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

type State = {
  type: string; services: string[]; adPlatforms: string; pkg: string; budget: number; timeline: string;
  name: string; email: string; company: string; website: string; contact: string; description: string; consent: boolean;
};
const empty: State = { type: "", services: [], adPlatforms: "both", pkg: "unsure", budget: 0, timeline: "flexible",
  name: "", email: "", company: "", website: "", contact: "", description: "", consent: false };
const KEY = "kb-enquiry-v5";
const STEPS = ["Looking for", "Services", "Scope", "About you", "Details", "Review"] as const;
const serviceIds = services.map((s) => s.id) as string[];
const MAX_FILE = 5 * 1024 * 1024;
const FILE_TYPES = ".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt";

const elapsedSince = (t: number) => String(Date.now() - t);
const normUrl = (v: string) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v);
function validate(step: number, s: State) {
  const e: Record<string, string> = {};
  if (step === 0 && !s.type) e.type = "Choose one option to continue.";
  if (step === 1 && s.services.length === 0) e.services = "Choose at least one — or “Not sure yet”.";
  if (step === 3) {
    if (s.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) e.email = "Enter a valid email address.";
    if (s.company.trim().length < 2) e.company = "Please enter your business name.";
    if (s.website && !/^https?:\/\/[^\s.]+\.[^\s]+$/i.test(normUrl(s.website.trim()))) e.website = "That address doesn't look right.";
  }
  if (step === 4 && s.description.trim().length < 20) e.description = "A little more, please — at least 20 characters.";
  if (step === 5 && !s.consent) e.consent = "Please confirm you agree to be contacted.";
  return e;
}

/* ---------- small field primitives ---------- */
function Float({ id, label, value, onChange, error, valid, type = "text", optional, auto, inputMode }:
  { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; valid?: boolean; type?: string; optional?: boolean; auto?: string; inputMode?: "url" | "email" | "text" }) {
  return (
    <div className={cn("fl", error && "fl-err")}>
      <input id={id} name={id} type={type} value={value} placeholder=" " autoComplete={auto} inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)} aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-e` : undefined} />
      <label htmlFor={id}>{label}{optional && <span className="opacity-60"> · optional</span>}</label>
      <span className="fl-icon" aria-hidden>{error ? <AlertCircle size={18} /> : valid ? <CheckCircle2 size={18} /> : null}</span>
      {error && <p id={`${id}-e`} className="fl-msg" role="alert">{error}</p>}
    </div>
  );
}
function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: readonly { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="text-[.95rem] font-[550] mb-3">{label}</legend>
      <div role="radiogroup" aria-label={label} className="seg">
        {options.map((o) => (
          <button key={o.id} type="button" role="radio" aria-checked={value === o.id} onClick={() => onChange(o.id)} className="seg-btn">
            {value === o.id && <motion.span layoutId={`seg-${label}`} className="seg-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden />}
            <span className="relative">{o.label}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- wizard ---------- */
function WizardInner() {
  const sp = useSearchParams();
  const reduce = useReducedMotion();
  const [s, setS] = useState<State>(empty);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState("");
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail" | "unavailable" | "rate">("idle");
  const [hydrated, setHydrated] = useState(false);
  const started = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const set = useCallback(<K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v })), []);

  // Restore saved progress, then apply URL prefill on top (URL wins).
  useEffect(() => {
    started.current = Number(elapsedSince(0));
    let base = empty;
    try { const raw = localStorage.getItem(KEY); if (raw) base = { ...empty, ...JSON.parse(raw).s, consent: false }; } catch {}
    const pType = sp.get("type"); const pSvc = (sp.get("services") ?? sp.get("service") ?? "").split(",").filter((x) => serviceIds.includes(x));
    const pPkg = sp.get("package"); const topic = sp.get("topic");
    const next = { ...base };
    if (pType && enquiryTypes.some((t) => t.id === pType)) next.type = pType;
    if (pSvc.length) { next.services = pSvc; if (!next.type) next.type = pSvc.length > 1 ? "multiple" : "single"; }
    if (next.type === "solution" && !pSvc.length) next.services = [...serviceIds];
    if (pPkg && packages.some((p) => p.id === pPkg)) next.pkg = pPkg;
    if (topic && !next.description) next.description = `I'm interested in: ${topic}.\n\n`;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage + URL
    setS(next);
    // Land on the first step that still needs input.
    const first = [0, 1].find((i) => Object.keys(validate(i, next)).length) ?? (pType || pSvc.length ? 2 : 0);
    setStep(first); setHydrated(true);
  }, [sp]);
  useEffect(() => { if (hydrated && status !== "ok") try { localStorage.setItem(KEY, JSON.stringify({ s: { ...s, consent: false } })); } catch {} }, [s, hydrated, status]);

  const focusPanel = () => requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-step-title]")?.focus());
  const go = (to: number) => { setDir(to > step ? 1 : -1); setErrors({}); setStep(to); focusPanel(); };
  const next = () => {
    const e = validate(step, s); setErrors(e);
    if (Object.keys(e).length) { setShake((n) => n + 1); requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [role=alert]")?.focus?.()); return; }
    if (step < STEPS.length - 1) go(step + 1); else submit();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey || (e.target as HTMLElement).tagName === "TEXTAREA" || (e.target as HTMLElement).tagName === "BUTTON") return;
    e.preventDefault(); next();
  };

  const toggleSvc = (id: string) => setS((p) => {
    if (id === "unsure") return { ...p, services: p.services.includes("unsure") ? [] : ["unsure"] };
    const b = p.services.filter((x) => x !== "unsure");
    return { ...p, services: b.includes(id) ? b.filter((x) => x !== id) : [...b, id] };
  });
  const chooseType = (id: string) => setS((p) => ({
    ...p, type: id,
    services: id === "solution" ? [...serviceIds] : id === "unsure" ? ["unsure"] : (id.startsWith("ai-") || id === "automation") && !p.services.includes("automation") ? [...p.services.filter((x) => x !== "unsure"), "automation"] : p.services,
  }));
  const pickFile = (f?: File | null) => {
    setFileErr("");
    if (!f) return setFile(null);
    if (f.size > MAX_FILE) return setFileErr("Max 5 MB. Share a link in the description instead.");
    setFile(f);
  };

  async function submit() {
    if (status === "sending") return;
    const fd = new FormData();
    fd.set("website_url", (document.getElementById("kb-hp") as HTMLInputElement | null)?.value ?? "");
    fd.set("type", s.type); s.services.forEach((x) => fd.append("services[]", x));
    if (s.services.includes("ads")) fd.set("ad_platforms", s.adPlatforms);
    fd.set("package", s.pkg); fd.set("budget", budgets[s.budget]); fd.set("timeline", s.timeline);
    fd.set("name", s.name.trim()); fd.set("email", s.email.trim()); fd.set("company", s.company.trim());
    fd.set("website", s.website ? normUrl(s.website.trim()) : ""); fd.set("contact_method", s.contact);
    fd.set("description", s.description.trim()); fd.set("consent", "1"); fd.set("elapsed", elapsedSince(started.current));
    if (file) fd.set("attachment", file);
    setStatus("sending");
    try {
      const [r] = await Promise.all([fetch(site.enquiryEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } }), new Promise((ok) => setTimeout(ok, 700))]);
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) { setStatus("ok"); try { localStorage.removeItem(KEY); } catch {} window.dispatchEvent(new CustomEvent("kb:enquiry-submitted")); }
      else setStatus(r.status === 503 || r.status === 404 ? "unavailable" : r.status === 429 ? "rate" : "fail");
    } catch { setStatus("fail"); }
  }

  const pct = ((step + (status === "ok" ? 1 : 0)) / (STEPS.length - 1)) * 100;
  const variants = { enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 48 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -48 }) };
  const typeLabel = enquiryTypes.find((t) => t.id === s.type)?.label;
  const svcLabels = s.services.map((id) => (id === "unsure" ? "Not sure yet" : menuName[id as ServiceId]));
  const wa = isConfirmed(site.contact.whatsapp) ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}` : "";
  const failed = status === "fail" || status === "unavailable" || status === "rate";

  return (
    <div className="flip-scene">
      <div className={cn("flip-card", status === "ok" && "is-flipped")}>
        {/* FRONT — the form */}
        <div className="flip-face panel !rounded-[28px] p-6 sm:p-9" aria-hidden={status === "ok"} inert={status === "ok" ? true : undefined}>
          <input id="kb-hp" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          {/* progress */}
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[.14em] uppercase text-text-2" aria-live="polite">Step {Math.min(step + 1, STEPS.length)} of {STEPS.length} · {STEPS[step]}</p>
            {step > 0 && <button type="button" onClick={() => { setS(empty); try { localStorage.removeItem(KEY); } catch {} go(0); }} className="text-xs text-text-2 hover:text-text inline-flex items-center gap-1 min-h-11"><RotateCcw size={12} aria-hidden />Start over</button>}
          </div>
          <div className="mt-3 h-1 rounded-full bg-line overflow-hidden" role="progressbar" aria-label="Enquiry progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
            <div className="h-full w-full origin-left rounded-full bg-[var(--graphite)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `scaleX(${Math.max(pct, 4) / 100})` }} />
          </div>
          <ol className="mt-4 hidden sm:flex gap-1.5" aria-hidden>
            {STEPS.map((n, i) => (
              <li key={n} className="flex-1"><button type="button" tabIndex={-1} disabled={i > step} onClick={() => i < step && go(i)}
                className={cn("w-full text-left text-[11px] font-[500] truncate min-h-11 flex items-center -my-3 py-3", i === step ? "text-text" : i < step ? "text-text-2 hover:text-text" : "text-text-2/50")}>{n}</button></li>
            ))}
          </ol>

          <div ref={panelRef} onKeyDown={onKey} className="relative mt-8 min-h-[440px]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: easeOut }}>
                <motion.div key={shake} animate={shake && !reduce ? { x: [0, -8, 8, -5, 5, 0] } : undefined} transition={{ duration: 0.4 }}>
                  {step === 0 && (
                    <section aria-labelledby="ws0">
                      <h2 id="ws0" data-step-title tabIndex={-1} className="!text-[clamp(26px,3vw,36px)] outline-none">What are you looking for?</h2>
                      <div role="radiogroup" aria-labelledby="ws0" className="mt-7 grid sm:grid-cols-2 gap-3">
                        {enquiryTypes.map((t) => <SelectCard key={t.id} icon={t.icon} title={t.label} desc={t.desc} checked={s.type === t.id} onChange={() => chooseType(t.id)} />)}
                      </div>
                      {errors.type && <p className="fl-msg mt-4" role="alert" tabIndex={-1}>{errors.type}</p>}
                    </section>
                  )}
                  {step === 1 && (
                    <section aria-labelledby="ws1">
                      <h2 id="ws1" data-step-title tabIndex={-1} className="!text-[clamp(26px,3vw,36px)] outline-none">Which services?</h2>
                      <p className="text-text-2 mt-2">Choose one or more. We only recommend what you need.</p>
                      <div role="group" aria-labelledby="ws1" className="mt-7 grid sm:grid-cols-2 gap-3">
                        {services.map((x) => <SelectCard key={x.id} multi icon={serviceIcon[x.id]} title={menuName[x.id]} checked={s.services.includes(x.id)} onChange={() => toggleSvc(x.id)} />)}
                        <SelectCard multi title="Not sure yet" desc="We'll suggest a starting point." checked={s.services.includes("unsure")} onChange={() => toggleSvc("unsure")} />
                      </div>
                      {s.services.includes("ads") && (
                        <div className="mt-7"><Segmented label="Advertising platforms" value={s.adPlatforms} onChange={(v) => set("adPlatforms", v)}
                          options={[{ id: "meta", label: "Meta" }, { id: "google", label: "Google" }, { id: "both", label: "Both" }, { id: "unsure", label: "Not sure" }]} /></div>
                      )}
                      {errors.services && <p className="fl-msg mt-4" role="alert" tabIndex={-1}>{errors.services}</p>}
                    </section>
                  )}
                  {step === 2 && (
                    <section aria-labelledby="ws2" className="grid gap-9">
                      <h2 id="ws2" data-step-title tabIndex={-1} className="!text-[clamp(26px,3vw,36px)] outline-none">Scope, budget and timing.</h2>
                      <Segmented label="Package" value={s.pkg} onChange={(v) => set("pkg", v)} options={packages} />
                      <div>
                        <label htmlFor="kb-budget" className="text-[.95rem] font-[550] flex justify-between gap-4"><span>Budget range</span><span className="text-text-2 font-[450]">{budgets[s.budget]}</span></label>
                        <input id="kb-budget" type="range" min={0} max={budgets.length - 1} step={1} value={s.budget} onChange={(e) => set("budget", Number(e.target.value))}
                          aria-valuetext={budgets[s.budget]} className="range mt-4 w-full" style={{ ["--p" as string]: `${(s.budget / (budgets.length - 1)) * 100}%` }} />
                        <div className="mt-2 flex justify-between text-[11px] text-text-2 font-mono uppercase tracking-wider" aria-hidden><span>Discuss</span><span>Major</span></div>
                        <p className="text-sm text-text-2 mt-3">Every quote is custom. This only helps us suggest the right scope.</p>
                      </div>
                      <Segmented label="Timeline" value={s.timeline} onChange={(v) => set("timeline", v)} options={timelines} />
                    </section>
                  )}
                  {step === 3 && (
                    <section aria-labelledby="ws3">
                      <h2 id="ws3" data-step-title tabIndex={-1} className="!text-[clamp(26px,3vw,36px)] outline-none">About you.</h2>
                      <div className="mt-7 grid sm:grid-cols-2 gap-4">
                        <Float id="name" label="Full name" auto="name" value={s.name} onChange={(v) => set("name", v)} error={errors.name} valid={s.name.trim().length >= 2} />
                        <Float id="email" label="Email" type="email" inputMode="email" auto="email" value={s.email} onChange={(v) => set("email", v)} error={errors.email} valid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())} />
                        <Float id="company" label="Business name" auto="organization" value={s.company} onChange={(v) => set("company", v)} error={errors.company} valid={s.company.trim().length >= 2} />
                        <Float id="website" label="Website" optional inputMode="url" auto="url" value={s.website} onChange={(v) => set("website", v)} error={errors.website} valid={!!s.website && !validate(3, { ...s, name: "xx", email: "a@b.co", company: "xx" }).website} />
                      </div>
                      <div className="mt-7"><Segmented label="Preferred contact" value={s.contact || "none"} onChange={(v) => set("contact", v === "none" ? "" : v)}
                        options={[{ id: "none", label: "Any" }, ...contactMethods.map((c) => ({ id: c, label: c }))]} /></div>
                    </section>
                  )}
                  {step === 4 && (
                    <section aria-labelledby="ws4">
                      <h2 id="ws4" data-step-title tabIndex={-1} className="!text-[clamp(26px,3vw,36px)] outline-none">Tell us about the project.</h2>
                      <div className={cn("fl fl-area mt-7", errors.description && "fl-err")}>
                        <textarea id="description" rows={6} value={s.description} placeholder=" " maxLength={4000} onChange={(e) => set("description", e.target.value)}
                          aria-invalid={!!errors.description || undefined} aria-describedby="description-h" />
                        <label htmlFor="description">What do you need, for whom, and by when?</label>
                        <p id="description-h" className={cn("mt-2 text-xs flex justify-between", errors.description ? "text-rust" : "text-text-2")} role={errors.description ? "alert" : undefined}>
                          <span>{errors.description ?? (s.description.trim().length < 20 ? `${20 - s.description.trim().length} more characters to go` : "Looks good — add as much as you like.")}</span>
                          <span className="font-mono">{s.description.length}/4000</span>
                        </p>
                      </div>
                      <div className={cn("drop mt-6", drag && "is-drag")} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                        onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]); }}>
                        {file ? (
                          <div className="flex items-center gap-3 w-full">
                            <FileUp size={18} aria-hidden /><span className="truncate text-sm font-[500]">{file.name}</span><span className="text-xs text-text-2 shrink-0">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                            <button type="button" onClick={() => pickFile(null)} className="ml-auto size-11 grid place-items-center rounded-full hover:bg-bg-2" aria-label="Remove file"><X size={16} aria-hidden /></button>
                          </div>
                        ) : (
                          <label className="flex flex-col sm:flex-row items-center gap-3 cursor-pointer w-full justify-center min-h-11">
                            <FileUp size={18} aria-hidden /><span className="text-sm"><b className="font-[550]">Drop a file</b> or browse <span className="text-text-2">· optional · brief, logo or screenshot · max 5 MB</span></span>
                            <input type="file" accept={FILE_TYPES} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
                          </label>
                        )}
                      </div>
                      {fileErr && <p className="fl-msg mt-2" role="alert">{fileErr}</p>}
                    </section>
                  )}
                  {step === 5 && (
                    <section aria-labelledby="ws5">
                      <h2 id="ws5" data-step-title tabIndex={-1} className="!text-[clamp(26px,3vw,36px)] outline-none">Review and send.</h2>
                      <p className="text-text-2 mt-2">Tap any item to change it.</p>
                      <dl className="mt-6 grid gap-3">
                        {[
                          { k: "Looking for", v: [typeLabel ?? "—"], to: 0 },
                          { k: "Services", v: svcLabels.length ? svcLabels : ["—"], to: 1 },
                          { k: "Scope", v: [packages.find((p) => p.id === s.pkg)?.label + " package", budgets[s.budget], timelines.find((t) => t.id === s.timeline)?.label ?? ""], to: 2 },
                          { k: "You", v: [s.name, s.email, s.company, s.website, s.contact && `Prefers ${s.contact}`].filter(Boolean) as string[], to: 3 },
                          { k: "Details", v: [s.description.length > 90 ? s.description.slice(0, 90) + "…" : s.description, file?.name ?? ""].filter(Boolean), to: 4 },
                        ].map((row) => (
                          <div key={row.k} className="grid sm:grid-cols-[120px_1fr] gap-2 py-3 border-b border-line items-start">
                            <dt className="font-mono text-[11px] uppercase tracking-[.12em] text-text-2 pt-2.5">{row.k}</dt>
                            <dd className="flex flex-wrap gap-2">{row.v.map((v) => (
                              <button key={v} type="button" onClick={() => go(row.to)} className="tag !min-h-9 hover:!text-text group max-w-full" aria-label={`Edit ${row.k}: ${v}`}>
                                <span className="truncate">{v}</span><Pencil size={11} className="opacity-40 group-hover:opacity-100 shrink-0" aria-hidden />
                              </button>
                            ))}</dd>
                          </div>
                        ))}
                      </dl>
                      <label className="mt-6 flex items-start gap-3 text-[.92rem] cursor-pointer">
                        <input type="checkbox" checked={s.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 size-5 accent-[var(--graphite)]" aria-invalid={!!errors.consent || undefined} aria-describedby={errors.consent ? "consent-e" : undefined} />
                        <span>I agree to be contacted about this enquiry. See the <Link href="/legal/privacy/" className="underline underline-offset-2">privacy policy</Link>.</span>
                      </label>
                      {errors.consent && <p id="consent-e" className="fl-msg mt-2" role="alert">{errors.consent}</p>}
                      {failed && (
                        <div className="mt-6 rounded-[16px] border border-[color-mix(in_srgb,var(--rust)_35%,transparent)] bg-[color-mix(in_srgb,var(--rust)_6%,transparent)] p-5 flex gap-3" role="alert">
                          <AlertCircle size={20} className="text-rust shrink-0 mt-0.5" aria-hidden />
                          <div>
                            <p className="font-[550]">{status === "unavailable" ? "Online enquiries aren't connected yet." : status === "rate" ? "Too many enquiries from this connection." : "That didn't go through."}</p>
                            <p className="text-sm text-text-2 mt-1">Nothing was sent. Your answers are saved on this device{status === "rate" ? " — try again in an hour" : " — try again"}{isConfirmed(site.contact.email) ? `, or email ${site.contact.email}` : ""}.</p>
                          </div>
                        </div>
                      )}
                    </section>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-line flex items-center justify-between gap-4">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className={cn("b b-ghost", step === 0 && "invisible")}><ArrowLeft size={16} aria-hidden />Back</button>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-xs text-text-2">Press <kbd className="font-mono px-1.5 py-0.5 rounded border border-line-strong">Enter ↵</kbd></span>
              <button type="button" onClick={next} disabled={status === "sending"} data-magnetic
                className={cn("b b-primary submit-morph", status === "sending" && "is-sending")} aria-live="polite">
                {status === "sending" ? <><Loader2 size={18} className="animate-spin" aria-hidden /><span className="sr-only">Sending</span></>
                  : step === STEPS.length - 1 ? <>{failed ? "Try again" : "Send enquiry"}<ArrowRight size={16} className="b-arrow-r" aria-hidden /></>
                  : <>Continue<ArrowRight size={16} className="b-arrow-r" aria-hidden /></>}
              </button>
            </div>
          </div>
        </div>

        {/* BACK — success */}
        <div className="flip-face flip-back panel !rounded-[28px] p-6 sm:p-10 flex flex-col" aria-hidden={status !== "ok"} inert={status !== "ok" ? true : undefined} role="status">
          {status === "ok" && (
            <>
              <div className="relative size-20">
                <Burst />
                <svg viewBox="0 0 80 80" className="relative size-20" aria-hidden>
                  <circle cx="40" cy="40" r="36" fill="var(--graphite)" className="ok-ring" />
                  <path d="M25 41l10 10 20-22" fill="none" stroke="var(--offwhite)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="ok-check" />
                </svg>
              </div>
              <h2 className="mt-8 !text-[clamp(30px,3.6vw,48px)]">Thanks, <span className="accent">{s.name.trim().split(" ")[0] || "there"}.</span></h2>
              <p className="lead mt-4">Your enquiry is in. Here&apos;s what you sent:</p>
              <div className="mt-5 flex flex-wrap gap-2">{[typeLabel, ...svcLabels, packages.find((p) => p.id === s.pkg)?.label + " package", timelines.find((t) => t.id === s.timeline)?.label].filter(Boolean).map((v) => <span key={v} className="tag">{v}</span>)}</div>
              <ol className="mt-8 grid sm:grid-cols-3 gap-3">
                {["We read it and reply within two working days.", "A short call to understand what you need.", "A clear proposal and custom quote."].map((t, i) => (
                  <li key={t} className="card-inner p-4 text-sm"><span className="num block mb-2">0{i + 1}</span>{t}</li>
                ))}
              </ol>
              <div className="mt-auto pt-8 flex flex-wrap gap-3">
                {wa && <a href={wa} className="b b-primary" rel="noopener" data-event="whatsapp_click">WhatsApp us now</a>}
                {site.features.bookingEmbed && <Link href="/contact/#book" className="b b-secondary">Book a call</Link>}
                <Link href="/" className={cn("b", wa ? "b-secondary" : "b-primary")}>Back home</Link>
                <Link href="/work/" className="b b-ghost">See our work</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Light particle burst in palette colours (transform/opacity only). */
function Burst() {
  const parts = useMemo(() => Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2 + (i % 2 ? 0.2 : 0); const d = 46 + (i % 4) * 12;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, c: ["var(--steel-blue)", "var(--graphite)", "var(--mist-grey)", "#4f6673"][i % 4], s: 4 + (i % 3) * 2, delay: (i % 5) * 30 };
  }), []);
  return <div className="burst" aria-hidden>{parts.map((p, i) => <i key={i} style={{ ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px`, background: p.c, width: p.s, height: p.s, animationDelay: `${300 + p.delay}ms` }} />)}</div>;
}

export function Wizard() {
  return <Suspense fallback={<div className="panel !rounded-[28px] min-h-[720px]" aria-hidden />}><WizardInner /></Suspense>;
}
