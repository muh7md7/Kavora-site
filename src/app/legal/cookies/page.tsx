import { seo } from "@/lib/seo";
import { t } from "@/i18n";
import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: t("Cookie Policy"), ...seo("/legal/cookies/") };
export default function Page() {
  return <LegalPage page="cookies" />;
}
