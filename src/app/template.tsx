/** Re-mounts on every route change: a short opacity fade between pages (reduced-motion safe via global rule). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
