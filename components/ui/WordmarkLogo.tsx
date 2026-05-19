import { Link } from "@/i18n/navigation";
import { RetroDashLogo } from "@/components/ui/RetroDashLogo";

export function WordmarkLogo() {
  return (
    <Link href="/" className="shrink-0">
      <RetroDashLogo width={110} />
    </Link>
  );
}
