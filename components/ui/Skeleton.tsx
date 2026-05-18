import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={`animate-pulse rounded bg-bg-elevated ${className}`}
    />
  );
}
