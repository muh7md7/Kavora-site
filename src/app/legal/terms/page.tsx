import { seo } from "@/lib/seo";
import { t } from "@/i18n";
import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: t("Terms of Service"), ...seo("/legal/terms/") };
export default function Page() {
  return <LegalPage page="terms" />;
}
