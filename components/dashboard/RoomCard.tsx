import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
  href?: string;
}

export function RoomCard({ room, href }: RoomCardProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const dateLocale = locale === "pt-BR" ? "pt-BR" : "en-US";

  const createdDate = room.createdAt
    ? room.createdAt.toDate().toLocaleDateString(dateLocale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <Link href={href ?? `/room/${room.id}`} className="group block">
      <div className="bg-bg-card border border-border rounded-lg p-6 h-full hover:border-accent-cyan/40 transition-colors">
        <div className="mb-4">
          <StatusBadge status={room.status} />
        </div>

        <h3 className="text-text-primary font-semibold text-lg leading-snug mb-2 group-hover:text-accent-cyan transition-colors">
          {room.name}
        </h3>

        {room.description && (
          <p className="text-text-secondary text-sm italic mb-2 line-clamp-2">
            &ldquo;{room.description}&rdquo;
          </p>
        )}

        <p className="text-text-muted text-xs">{t("created", { date: createdDate })}</p>
      </div>
    </Link>
  );
}
