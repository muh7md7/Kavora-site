"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { services, site } from "@/content/site";
import { t } from "@/i18n";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<string, string>>;
const serviceIds = services.map((s) => s.id) as string[];
/** Kept for links like /contact/?type=solution — mapped onto the single "service" choice. */
export const enquiryTypes = [
  { id: "single", label: t("One service") }, { id: "multiple", label: t("Several services") }, { id: "solution", label: t("Complete solution") },
  { id: "ai-ready", label: t("Ready-made AI solution") }, { id: "ai-custom", label: t("Custom AI agent") }, { id: "automation", label: t("Custom automation") }, { id: "unsure", label: t("Not sure yet") },
] as const;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(f.get(k) ?? "").trim();
  if (v("name").length < 2) e.name = t("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = t("Enter a valid email address.");
  if (!v("choice")) e.choice = t("Choose what you need.");
  if (v("description").length < 10) e.description = t("A few words about your project, please.");
  if (!f.get("consent")) e.consent = t("Please confirm you agree to be contacted.");
  return e;
}

/** Short enquiry form — five inputs. One dropdown replaces the long service lists. */
function Form() {
  const sp = useSearchParams();
  const preset = (() => {
    const s = (sp.get("services") ?? sp.get("service") ?? "").split(",").filter((x) => serviceIds.includes(x));
    const ty = sp.get("type") ?? "";
    if (ty === "solution" || s.length > 1) return "solution";
    if (ty.startsWith("ai-") || ty === "automation") return "automation";
    return s[0] ?? "";
  })();
  const [choice, setChoice] = useState(preset);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail" | "unavailable" | "rate">("idle");
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { started.current = Date.now(); }, []);
  const err = (k: string) => touched[k] && errors[k];

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name; if (!name) return;
    setTouched((x) => ({ ...x, [name]: true }));
    setErrors(validate(new FormData(e.currentTarget)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd); setErrors(errs);
    setTouched({ name: true, email: true, choice: true, description: true, consent: true });
    if (Object.keys(errs).length) { requestAnimationFrame(() => (formRef.current?.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus()); return; }
    // Map the single choice onto the server's fields.
    const c = String(fd.get("choice"));
    if (c === "solution") { serviceIds.forEach((id) => fd.append("services[]", id)); fd.set("type", "solution"); }
    else if (c === "unsure") { fd.append("services[]", "unsure"); fd.set("type", "unsure"); }
    else { fd.append("services[]", c); fd.set("type", "single"); }
    fd.set("elapsed", String(Date.now() - started.current));
    setStatus("sending");
    try {
      const r = await fetch(site.enquiryEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) { setStatus("ok"); window.dispatchEvent(new CustomEvent("kb:enquiry-submitted")); }
      else if (r.status === 503 || r.status === 404) setStatus("unavailable");
      else if (r.status === 429) setStatus("rate");
      else setStatus("fail");
    } catch { setStatus("fail"); }
  };

  if (status === "ok") return (
    <div className="py-10 text-center" role="status">
      <span className="size-14 rounded-full bg-[var(--graphite)] text-[var(--c-stone)] inline-flex items-center justify-center" aria-hidden><Check size={24} /></span>
      <p className="mt-6 text-[1.5rem] font-[580] tracking-[-0.02em]">{t("Thank you — message received.")}</p>
      <p className="text-text-2 mt-2 mx-auto max-w-[36ch]">{t("We'll be in touch by email with next steps.")}</p>
    </div>
  );

  const label = "block text-[0.8rem] font-[600] tracking-[0.01em] text-text-2 mb-2";
  const field = (name: string, text: string, input: React.ReactNode) => (
    <div className="field">
      <label htmlFor={`f-${name}`} className={label}>{text}</label>
      {input}
      {err(name) && <p id={`f-${name}-err`} className="error">{errors[name]}</p>}
    </div>
  );
  const aria = (name: string) => ({ id: `f-${name}`, name, "aria-invalid": !!err(name), "aria-describedby": err(name) ? `f-${name}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} onBlur={onBlur} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", t("Your name"), <input {...aria("name")} className="input" autoComplete="name" required />)}
        {field("email", t("Email"), <input {...aria("email")} type="email" className="input" autoComplete="email" inputMode="email" required dir="ltr" />)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("company", t("Company (optional)"), <input {...aria("company")} className="input" autoComplete="organization" />)}
        {field("choice", t("What do you need?"),
          <select {...aria("choice")} className={cn("input", !choice && "text-text-2")} value={choice} onChange={(e) => setChoice(e.target.value)} required>
            <option value="" disabled>{t("Choose a service")}</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            <option value="solution">Complete solution (several services)</option>
            <option value="unsure">{t("Not sure yet")}</option>
          </select>)}
      </div>
      {field("description", t("Project details"), <textarea {...aria("description")} className="input !min-h-[120px] resize-y" rows={4} placeholder={t("What do you want to achieve?")} required />)}
      {/* Honeypot */}
      <div className="hidden" aria-hidden><label>{t("Website URL")}<input name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
      <div>
        <label className="flex items-start gap-3 text-[0.88rem] text-text-2 cursor-pointer">
          <input type="checkbox" name="consent" id="f-consent" className="check mt-0.5" aria-invalid={!!err("consent")} />
          <span>{t("I agree to be contacted about this enquiry.")} <Link href="/legal/privacy/" className="underline underline-offset-2 hover:text-text">{t("Privacy policy")}</Link></span>
        </label>
        {err("consent") && <p className="error mt-2">{errors.consent}</p>}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
        <button type="submit" className="btn btn-primary !min-h-[54px] !px-8 w-full sm:w-auto" disabled={status === "sending"} data-magnetic>
          {status === "sending" ? <><Loader2 size={18} className="animate-spin" aria-hidden />{t("Sending…")}</> : <>{t("Send message")} <ArrowUpRight size={18} className="btn-arrow" aria-hidden /></>}
        </button>
        <p className="text-[0.8rem] text-text-2">{t("Custom quote. No obligation.")}</p>
      </div>
      <div aria-live="polite">
        {status === "fail" && <p className="error">{t("Something went wrong. Please try again in a moment.")}</p>}
        {status === "rate" && <p className="error">{t("Too many attempts. Please try again later.")}</p>}
        {status === "unavailable" && <p className="error">{t("The form is being set up. Please try again soon.")}</p>}
      </div>
    </form>
  );
}

export function EnquiryForm() {
  return <Suspense fallback={<div className="min-h-[460px]" aria-hidden />}><Form /></Suspense>;
}
