import Image from "next/image";

interface AvatarProps {
  photoURL?: string | null;
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ photoURL, name, size = 24, className = "" }: AvatarProps) {
  const sizeStyle = { width: size, height: size, minWidth: size };

  if (photoURL) {
    return (
      <Image
        src={photoURL}
        alt={name}
        width={size}
        height={size}
        style={sizeStyle}
        className={`rounded-full object-cover shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      style={sizeStyle}
      className={`rounded-full bg-bg-elevated border border-border flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="text-[10px] font-semibold text-text-muted">
        {name[0]?.toUpperCase() ?? "?"}
      </span>
    </div>
  );
}
