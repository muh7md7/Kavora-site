"use client";
import { useEffect, useState } from "react";

let firstLoad = true;

/**
 * 0.4s charcoal overlay that slides away (scaleY, transform only) on client-side navigations.
 * Skipped on the first hard load so LCP is never covered. Hidden under reduced motion (CSS).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [show] = useState(() => !firstLoad);
  const [done, setDone] = useState(false);
  useEffect(() => { firstLoad = false; }, []);
  return (
    <>
      {show && !done && <div className="pt-overlay" aria-hidden onAnimationEnd={() => setDone(true)} />}
      {children}
    </>
  );
}
