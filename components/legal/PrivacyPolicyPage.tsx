import { LegalPage } from "./LegalPage";
import { getPrivacyContent } from "./privacyContent";

export function PrivacyPolicyPage({ locale }: { locale: string }) {
  return <LegalPage content={getPrivacyContent(locale)} />;
}
