"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/** Minimal syntax highlighter for TS/TSX/CSS — no external library. Output escaped first. */
export function highlight(src: string): string {
  const esc = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc
    .replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="tok-c">$1</span>')
    .replace(/(&quot;[^&]*?&quot;|"[^"\n]*"|'[^'\n]*'|`[^`]*`)/g, '<span class="tok-s">$1</span>')
    .replace(/\b(import|export|from|const|let|return|function|type|interface|default|if|else|async|await|new|extends)\b/g, '<span class="tok-k">$1</span>')
    .replace(/\b(true|false|null|undefined|\d+(?:\.\d+)?(?:px|ms|%)?)\b/g, '<span class="tok-t">$1</span>')
    .replace(/\b([A-Z][A-Za-z0-9]*)\b(?=[(<])/g, '<span class="tok-f">$1</span>');
}

type Props = { code: string; filename: string; lang?: string; className?: string; autoScroll?: boolean; maxHeight?: number };

/** Code Window — macOS traffic lights, filename/lang chip, highlighted REAL source, copy button. */
export function CodeWindow({ code, filename, lang = "tsx", className, autoScroll = false, maxHeight = 360 }: Props) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!autoScroll || !preRef.current) return;
    const el = preRef.current; let raf = 0; let y = 0;
    const step = () => { y += 0.6; el.scrollTop = y; if (y < el.scrollHeight - el.clientHeight) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.dispatchEvent(new CustomEvent("kb:lab-code-copied", { detail: filename })); setTimeout(() => setCopied(false), 1400); } catch {}
  };

  return (
    <figure className={cn("code-window glass-solid rounded-md overflow-hidden text-sm", className)}>
      <figcaption className="flex items-center gap-2 px-3 py-2 border-b border-mist bg-pearl/70">
        <span className="flex gap-1.5" aria-hidden><i className="size-3 rounded-full bg-[#ff5f57]" /><i className="size-3 rounded-full bg-[#febc2e]" /><i className="size-3 rounded-full bg-[#28c840]" /></span>
        <span className="font-mono text-xs text-slate ml-2">{filename}</span>
        <span className="chip chip-navy ml-1">{lang}</span>
        <button type="button" onClick={copy} className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-navy min-h-11 px-2 rounded-sm hover:bg-navy-tint" aria-live="polite">
          {copied ? <><Check size={14} aria-hidden /> Copied</> : <><Copy size={14} aria-hidden /> Copy</>}
        </button>
      </figcaption>
      <pre ref={preRef} className="p-4 overflow-auto bg-white/60" style={{ maxHeight }}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </figure>
  );
}
