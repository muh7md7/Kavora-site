"use client";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "./useInView";

type Level = "h1" | "h2" | "h3" | "p";

/**
 * Masked word-by-word reveal (reads as a line reveal and survives any wrap width).
 * `accent` = the single italic-serif word; `underline` draws a line under it.
 * `auto` = hero: plays via CSS on first paint (no hydration wait, no CLS).
 * Screen readers get the full sentence once via aria-label.
 */
export function SplitHeading({ as = "h2", text, accent, after, underline = false, auto = false, className, delay = 0, id }:
  { as?: Level; text: string; accent?: string; after?: string; underline?: boolean; auto?: boolean; className?: string; delay?: number; id?: string }) {
  const [ref, inView] = useInViewOnce<HTMLHeadingElement>();
  const Tag = as;
  const pre = text.split(" ").filter(Boolean);
  const post = (after ?? "").split(" ").filter(Boolean);
  let i = 0;
  const word = (w: string, cls?: string, key?: string) => (
    <Fragment key={key}>
      <span className="sw" aria-hidden><span className={cls} style={{ ["--i" as string]: i++, ["--d" as string]: `${delay}ms` }}>{w}</span></span>{" "}
    </Fragment>
  );
  const full = [text, accent, after].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} id={id} aria-label={full} className={cn(auto ? "sw-auto" : inView && "is-in", className)}>
      {pre.map((w, k) => word(w, undefined, `a${k}`))}
      {accent && (
        <>
          <span className="sw" aria-hidden>
            <span className={cn("accent", underline && "u-draw")} style={{ ["--i" as string]: i++, ["--d" as string]: `${delay}ms`, ["--u-delay" as string]: `${delay + 650}ms` }}>{accent}</span>
          </span>{" "}
        </>
      )}
      {post.map((w, k) => word(w, undefined, `b${k}`))}
    </Tag>
  );
}
