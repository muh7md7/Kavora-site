"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { isAr, otherLangHref, t } from "@/i18n";
import { cn } from "@/lib/cn";

/** Toggle html.dark and remember it. */
export function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.classList.toggle("dark", next);
    try { localStorage.setItem("kb-theme", next ? "dark" : "light"); } catch {}
    setDark(next);
    window.setTimeout(() => root.classList.remove("theme-switching"), 350);
  };
  return { dark, toggle };
}

export function ThemeToggle({ className }: { className?: string }) {
  const { dark, toggle } = useDarkMode();
  return (
    <button type="button" onClick={toggle} className={cn("pref-btn", className)} aria-label={dark ? t("Switch to light mode") : t("Switch to dark mode")} aria-pressed={dark}>
      <span className="relative size-[18px]" aria-hidden>
        <Sun size={18} className={cn("absolute inset-0 transition-[opacity,transform] duration-300", dark ? "opacity-0 -rotate-90 scale-50" : "opacity-100")} />
        <Moon size={18} className={cn("absolute inset-0 transition-[opacity,transform] duration-300", dark ? "opacity-100" : "opacity-0 rotate-90 scale-50")} />
      </span>
    </button>
  );
}

/** Language switch: plain <a> so the /ar base path is crossed correctly. */
export function LangSwitch({ className, long = false }: { className?: string; long?: boolean }) {
  const path = usePathname() ?? "/";
  return (
    <a href={otherLangHref(path)} className={cn("pref-btn", long ? "!w-auto px-3.5 gap-2" : "", className)} hrefLang={isAr ? "en" : "ar"} lang={isAr ? "en" : "ar"} aria-label={isAr ? "English" : "العربية"}>
      <span className={cn("text-[0.82rem] font-[600] leading-none", !isAr && "font-arabic text-[0.95rem]")}>{isAr ? "EN" : "ع"}</span>
      {long && <span className="text-[0.86rem]">{isAr ? "English" : "العربية"}</span>}
    </a>
  );
}

export function PrefSwitches() {
  return <div className="flex items-center gap-2"><LangSwitch /><ThemeToggle /></div>;
}
