import { Link } from "@/i18n/navigation";
import { RetroDashLogo } from "@/components/ui/RetroDashLogo";

export function WordmarkLogo() {
  return (
    <Link href="/" className="shrink-0">
      <RetroDashLogo width={110} className="w-20.5 sm:w-27.5" />
    </Link>
  );
}
