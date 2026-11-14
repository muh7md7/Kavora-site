import { t } from "@/i18n";
import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
export const metadata: Metadata = { title: t("Terms of Service"), alternates: { canonical: "/legal/terms/" } };
export default function Page() {
  return <LegalPage page="terms" />;
}
