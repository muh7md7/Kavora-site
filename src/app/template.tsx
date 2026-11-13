import { PageTransition } from "@/components/motion/PageTransition";

/** Re-mounts on every route change → overlay slide on client navigations. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
