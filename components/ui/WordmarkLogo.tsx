import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function WordmarkLogo() {
  return (
    <Link href="/" className="shrink-0">
      <Image src="/logo.svg" alt="RetroDash" width={110} height={48} priority />
    </Link>
  );
}
