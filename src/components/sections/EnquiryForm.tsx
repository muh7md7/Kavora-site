"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services, site, isConfirmed } from "@/content/site";
import { Button } from "@/components/glass/Button";

type Errors = Partial<Record<string, string>>;
const budgets = ["Not sure yet", "Under $2k", "$2k – $5k", "$5k – $15k", "$15k+"];

function validate(f: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(f.get(k) ?? "").trim();
  if (v("name").length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Enter a valid business email.";
  if (v("company").length < 2) e.company = "Please enter your company.";
  if (v("website") && !/^https?:\/\/.+\..+/.test(v("website"))) e.website = "Include https:// in the URL.";
  if (!v("service")) e.service = "Choose a service.";
  if (v("description").length < 20) e.description = "Tell us a little more (20+ characters).";
  if (!f.get("consent")) e.consent = "Please confirm you agree to be contacted.";
  return e;
}

function Form() {
  const sp = useSearchParams();
  const preset = sp.get("service") ?? "";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const started = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { started.current = Date.now(); }, []);

  const endpoint = site.enquiryEndpoint;
  if (!endpoint) {
    return (
      <div className="glass-solid rounded-lg p-6" role="status">
        <p className="font-semibold">Enquiries temporarily unavailable</p>
        <p className="text-slate text-sm mt-1">The form endpoint isn&apos;t configured yet. Email us at {isConfirmed(site.contact.email) ? <a className="text-navy underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : <span>{site.contact.email}</span>}.</p>
      </div>
    );
  }

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name; if (!name) return;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(new FormData(e.currentTarget)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return; // duplicate-submit lock
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd); setErrors(errs); setTouched({ name: 1, email: 1, company: 1, website: 1, service: 1, description: 1, consent: 1 } as never);
    if (Object.keys(errs).length) { (e.currentTarget.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus(); return; }
    fd.set("elapsed", String(Date.now() - started.current)); // time-trap (server enforces)
    setStatus("sending");
    try {
      const r = await fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) { setStatus("ok"); window.dispatchEvent(new CustomEvent("kb:enquiry-submitted")); formRef.current?.reset(); }
      else setStatus("fail");
    } catch { setStatus("fail"); }
  };

  if (status === "ok") return <div className="glass-solid rounded-lg p-6" role="status"><p className="font-semibold">Thanks — received.</p><p className="text-slate text-sm mt-1">We reply within two working days with questions and next steps.</p></div>;

  const err = (k: string) => touched[k] && errors[k];
  const field = (k: string, label: string, input: React.ReactNode, help?: string) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}</label>
      {input}
      {help && !err(k) && <p id={`h-${k}`} className="help">{help}</p>}
      {err(k) && <p id={`e-${k}`} className="error" role="alert">{errors[k]}</p>}
    </div>
  );
  const a = (k: string, help?: boolean) => ({ id: `f-${k}`, name: k, "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `e-${k}` : help ? `h-${k}` : undefined, className: "input" });

  return (
    <form ref={formRef} onSubmit={onSubmit} onBlur={onBlur} noValidate className="grid gap-5" aria-describedby="form-note">
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /> {/* honeypot */}
      <div className="grid gap-5 md:grid-cols-2">
        {field("name", "Full name", <input {...a("name")} autoComplete="name" required />)}
        {field("email", "Business email", <input {...a("email")} type="email" autoComplete="email" required />)}
        {field("company", "Company", <input {...a("company")} autoComplete="organization" required />)}
        {field("website", "Website (optional)", <input {...a("website", true)} type="url" inputMode="url" placeholder="https://" />, "Include https://")}
        {field("service", "Service", (
          <select {...a("service")} defaultValue={preset} required>
            <option value="" disabled>Choose…</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            <option value="multiple">Several / not sure</option>
          </select>
        ))}
        {field("budget", "Budget range (optional)", <select {...a("budget")} defaultValue="">{["", ...budgets].map((b) => <option key={b} value={b}>{b || "Prefer not to say"}</option>)}</select>)}
      </div>
      {field("description", "Project description", <textarea {...a("description", true)} rows={5} required />, "What are you building, for whom, and by when?")}
      <div className="field">
        <label className="flex items-start gap-3 !font-normal text-sm"><input type="checkbox" name="consent" id="f-consent" className="mt-1 size-5 accent-navy" aria-describedby={err("consent") ? "e-consent" : undefined} /> I agree to be contacted about this enquiry. See our <a href="/legal/privacy/" className="text-navy underline">privacy policy</a>.</label>
        {err("consent") && <p id="e-consent" className="error" role="alert">{errors.consent}</p>}
      </div>
      {status === "fail" && <p className="error" role="alert">Something went wrong and nothing was sent. Please try again{isConfirmed(site.contact.email) ? ` or email ${site.contact.email}` : ""}.</p>}
      <div className="flex items-center gap-4 flex-wrap">
        <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"}</Button>
        <p id="form-note" className="text-xs text-slate">No spam. Minimal data, kept only as long as needed.</p>
      </div>
    </form>
  );
}

export function EnquiryForm() { return <Suspense><Form /></Suspense>; }
