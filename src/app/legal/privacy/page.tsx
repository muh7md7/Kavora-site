import { seo } from "@/lib/seo";
import { t } from "@/i18n";
import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: t("Privacy Policy"), ...seo("/legal/privacy/") };
export default function Page() {
  return <LegalPage page="privacy" />;
}
