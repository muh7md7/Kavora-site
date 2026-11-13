"use client";
import { useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Footer email capture. Posts to the same endpoint with intent=subscribe (email + consent only)
 * and stores to its own file server-side. No list is implied beyond what the copy says.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [err, setErr] = useState("");
  const started = useRef(0);

  // The endpoint rejects anything submitted in under 3s; the clock starts when the field is first touched.
  const touch = () => { if (!started.current) started.current = Date.now(); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErr("Enter a valid email address."); return; }
    setErr(""); setStatus("sending");
    const fd = new FormData();
    fd.set("intent", "subscribe"); fd.set("email", email.trim()); fd.set("consent", "1");
    fd.set("elapsed", String(started.current ? Date.now() - started.current : 0)); fd.set("website_url", "");
    try {
      const r = await fetch(site.enquiryEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) setStatus("ok");
      else { setStatus("fail"); setErr(r.status === 429 ? "Too many attempts — try again later." : "That didn't go through. Try again, or send an enquiry."); }
    } catch { setStatus("fail"); setErr("That didn't go through. Try again, or send an enquiry."); }
  };

  if (status === "ok") {
    return (
      <p className="flex items-center gap-2.5 text-[0.95rem]" role="status">
        <span className="size-7 rounded-full bg-[var(--steel-blue)] text-[var(--deep-charcoal)] grid place-items-center shrink-0"><Check size={14} strokeWidth={3} aria-hidden /></span>
        You&rsquo;re on the list. We only send something when it&rsquo;s worth reading.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="nl-email" className="block text-[0.95rem] font-[550]">Occasional notes, no noise</label>
      <p className="mt-1.5 text-[0.85rem] text-text-2">What we learn building sites, running ads and automating things. Unsubscribe any time.</p>
      <div className="mt-4 flex gap-2">
        <input id="nl-email" type="email" inputMode="email" autoComplete="email" value={email} placeholder="you@company.com"
          onFocus={touch} onChange={(e) => { touch(); setEmail(e.target.value); if (err) setErr(""); }}
          aria-invalid={!!err || undefined} aria-describedby={err ? "nl-err" : undefined}
          className={cn("min-w-0 flex-1 min-h-12 px-4 rounded-pill bg-[var(--surface-strong)] border text-text placeholder:text-text-2/70 transition-colors",
            err ? "border-rust" : "border-line-strong focus:border-accent")} />
        <button type="submit" disabled={status === "sending"} className="b b-primary shrink-0 !px-5" aria-label="Subscribe">
          {status === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <ArrowRight size={16} className="b-arrow-r" aria-hidden />}
        </button>
      </div>
      {err && <p id="nl-err" className="mt-2 text-[0.8rem] text-rust" role="alert">{err}</p>}
    </form>
  );
}
