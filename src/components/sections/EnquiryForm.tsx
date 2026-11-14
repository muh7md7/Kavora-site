"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { services, site, isConfirmed, type ServiceId } from "@/content/site";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<string, string>>;
const contactMethods = ["Email", "WhatsApp", "Phone call", "Video call"];
export const enquiryTypes = [
  { id: "single", label: "One service" },
  { id: "multiple", label: "Several services" },
  { id: "solution", label: "Complete solution" },
  { id: "ai-ready", label: "Ready-made AI solution" },
  { id: "ai-custom", label: "Custom AI agent" },
  { id: "automation", label: "Custom automation" },
  { id: "unsure", label: "Not sure yet" },
] as const;
const serviceIds = services.map((s) => s.id) as string[];

function validate(f: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(f.get(k) ?? "").trim();
  if (v("name").length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Enter a valid email address.";
  if (v("company").length < 2) e.company = "Please enter your business name.";
  if (v("website") && !/^https?:\/\/.+\..+/.test(v("website"))) e.website = "Include https:// in the address.";
  if (f.getAll("services[]").length === 0) e.services = "Choose at least one option — or “Not sure yet”.";
  if (v("description").length < 20) e.description = "Tell us a little more (at least 20 characters).";
  if (!f.get("consent")) e.consent = "Please confirm you agree to be contacted.";
  return e;
}

function Form() {
  const sp = useSearchParams();
  const presetServices = (sp.get("services") ?? sp.get("service") ?? "").split(",").filter((x) => serviceIds.includes(x));
  const presetType = enquiryTypes.some((t) => t.id === sp.get("type")) ? (sp.get("type") as string) : presetServices.length > 1 ? "multiple" : presetServices.length === 1 ? "single" : "";
  const topic = sp.get("topic") ?? "";

  const [type, setType] = useState(presetType);
  const [picked, setPicked] = useState<string[]>(presetType === "solution" ? [...serviceIds] : presetServices);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail" | "unavailable" | "rate">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const started = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { started.current = Date.now(); }, []);

  const toggle = (id: string) => setPicked((p) => {
    if (id === "unsure") return p.includes("unsure") ? [] : ["unsure"];
    const base = p.filter((x) => x !== "unsure");
    return base.includes(id) ? base.filter((x) => x !== id) : [...base, id];
  });
  const chooseType = (id: string) => {
    setType(id);
    if (id === "solution") setPicked([...serviceIds]);
    if (id.startsWith("ai-") || id === "automation") setPicked((p) => (p.includes("automation") ? p : [...p.filter((x) => x !== "unsure"), "automation"]));
    if (id === "unsure") setPicked(["unsure"]);
  };

  const endpoint = site.enquiryEndpoint;
  const err = (k: string) => touched[k] && errors[k];

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name; if (!name) return;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(new FormData(e.currentTarget)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return; // duplicate-submit lock
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd); setErrors(errs);
    setTouched({ name: true, email: true, company: true, website: true, services: true, description: true, consent: true });
    if (Object.keys(errs).length) { requestAnimationFrame(() => (formRef.current?.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus()); return; }
    if (!endpoint) { setStatus("fail"); return; }
    fd.set("elapsed", String(Date.now() - started.current)); // time-trap (server enforces)
    setStatus("sending");
    try {
      const r = await fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) { setStatus("ok"); window.dispatchEvent(new CustomEvent("kb:enquiry-submitted")); }
      else if (r.status === 503 || r.status === 404) setStatus("unavailable");
      else if (r.status === 429) setStatus("rate");
      else setStatus("fail");
    } catch { setStatus("fail"); }
  };

  if (status === "ok") return (
    <div className="rounded-[calc(20px*var(--rs,1))] border border-line bg-surface p-8" role="status">
      <span className="size-11 rounded-full bg-[var(--graphite)] text-[var(--c-stone)] inline-flex items-center justify-center" aria-hidden><Check size={20} /></span>
      <p className="mt-5 text-[1.3rem] font-[560] tracking-[-0.02em]">Thank you — we&apos;ve received your enquiry.</p>
      <p className="text-text-2 mt-2">We&apos;ll reply with questions and next steps within two working days.</p>
    </div>
  );

  const a = (k: string, help?: boolean) => ({ id: `f-${k}`, name: k, "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `e-${k}` : help ? `h-${k}` : undefined, className: "input" });
  const field = (k: string, label: string, input: React.ReactNode, help?: string) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}</label>
      {input}
      {help && !err(k) && <p id={`h-${k}`} className="help">{help}</p>}
      {err(k) && <p id={`e-${k}`} className="error" role="alert">{errors[k]}</p>}
    </div>
  );
  const pill = (on: boolean) => cn("relative inline-flex items-center gap-2 min-h-11 px-4 rounded-full border text-[0.9rem] font-[500] cursor-pointer select-none transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--accent)]",
    on ? "bg-[var(--graphite)] text-[var(--c-stone)] border-[var(--graphite)]" : "bg-surface-strong border-line-strong text-text hover:border-text-2");

  return (
    <form ref={formRef} onSubmit={onSubmit} onBlur={onBlur} noValidate className="grid gap-8" aria-describedby="form-note">
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /> {/* honeypot */}
      <input type="hidden" name="type" value={type} />
      {topic && <input type="hidden" name="topic" value={topic} />}

      <fieldset>
        <legend className="text-[0.875rem] font-[550] mb-3">What are you looking for?</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {enquiryTypes.map((t) => (
            <label key={t.id} className={pill(type === t.id)}>
              <input type="radio" name="type_ui" value={t.id} checked={type === t.id} onChange={() => chooseType(t.id)} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset aria-describedby={err("services") ? "e-services" : "h-services"}>
        <legend className="text-[0.875rem] font-[550] mb-3">Which services? <span className="text-text-2 font-normal">Choose one or more</span></legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <label key={s.id} className={pill(picked.includes(s.id))}>
              <input type="checkbox" name="services[]" value={s.id} checked={picked.includes(s.id)} onChange={() => toggle(s.id)} className="sr-only" aria-invalid={err("services") ? true : undefined} />
              {picked.includes(s.id) && <Check size={14} aria-hidden />}{s.name}
            </label>
          ))}
          <label className={pill(picked.includes("unsure"))}>
            <input type="checkbox" name="services[]" value="unsure" checked={picked.includes("unsure")} onChange={() => toggle("unsure")} className="sr-only" />
            {picked.includes("unsure") && <Check size={14} aria-hidden />}Not sure yet
          </label>
        </div>
        {err("services") ? <p id="e-services" className="error" role="alert">{errors.services}</p> : <p id="h-services" className="help mt-2 text-[0.75rem] text-text-2">We&apos;ll only recommend what you need.</p>}
        {picked.includes("ads" as ServiceId) && (
          <div className="mt-4 field">
            <label htmlFor="f-ad_platforms">Advertising platforms</label>
            <select id="f-ad_platforms" name="ad_platforms" className="input max-w-xs" defaultValue="both">
              <option value="meta">Meta (Facebook &amp; Instagram)</option>
              <option value="google">Google Ads</option>
              <option value="both">Both</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>
        )}
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        {field("name", "Full name", <input {...a("name")} autoComplete="name" required />)}
        {field("email", "Email", <input {...a("email")} type="email" autoComplete="email" required />)}
        {field("company", "Business name", <input {...a("company")} autoComplete="organization" required />)}
        {field("website", "Website (optional)", <input {...a("website", true)} type="url" inputMode="url" placeholder="https://" />, "Include https://")}
        {field("contact_method", "Preferred contact method (optional)", <select {...a("contact_method")} defaultValue="">{["", ...contactMethods].map((b) => <option key={b} value={b}>{b || "No preference"}</option>)}</select>)}
      </div>
      {field("description", "Tell us about your project", <textarea {...a("description", true)} rows={5} required defaultValue={topic ? `I'm interested in: ${topic}.\n\n` : ""} />, "What do you need, for whom, and by when? A few lines is enough.")}

      <div className="field">
        <label className="!flex items-start gap-3 !font-normal text-[0.9rem]"><input type="checkbox" name="consent" id="f-consent" className="mt-1 size-5 accent-[var(--graphite)]" aria-invalid={err("consent") ? true : undefined} aria-describedby={err("consent") ? "e-consent" : undefined} /> <span>I agree to be contacted about this enquiry. See our <a href="/legal/privacy/" className="text-text underline underline-offset-2">privacy policy</a>.</span></label>
        {err("consent") && <p id="e-consent" className="error" role="alert">{errors.consent}</p>}
      </div>

      {(status === "fail" || status === "unavailable" || status === "rate") && (
        <p className="error !text-[0.9rem]" role="alert">
          {status === "unavailable" ? "Online enquiries aren't connected yet, so nothing was sent" : status === "rate" ? "Too many enquiries from this connection in the last hour — nothing was sent. Please try again later" : "Something went wrong and nothing was sent. Please try again"}{isConfirmed(site.contact.email) ? ` — or email ${site.contact.email}` : ""}.
        </p>
      )}
      <div className="flex items-center gap-5 flex-wrap">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"} aria-disabled={status === "sending"}>
          {status === "sending" ? <><Loader2 size={16} className="animate-spin" aria-hidden /> Sending…</> : "Send enquiry"}
        </button>
        <p id="form-note" className="text-[0.78rem] text-text-2">Custom quote. No obligation. No budget required. Minimal data, kept only as long as needed.</p>
      </div>
    </form>
  );
}

// Fallback reserves the form's measured height so hydration causes no layout shift (CLS).
export function EnquiryForm() { return <Suspense fallback={<div className="min-h-[1850px] sm:min-h-[1195px] lg:min-h-[1147px]" aria-hidden />}><Form /></Suspense>; }
