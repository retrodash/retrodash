"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from "@/components/ui/Icons";

interface RoomCreatedScreenProps {
  roomId: string;
  roomName: string;
  password: string;
  isPublic?: boolean;
  onOpen: () => void;
}

export function RoomCreatedScreen({
  roomId,
  roomName,
  password,
  isPublic = false,
  onOpen,
}: RoomCreatedScreenProps) {
  const t = useTranslations("newRoom");
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const copy = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const copiedStyle = {
    background: "color-mix(in srgb, var(--color-accent-primary) 12%, transparent)",
    color: "var(--color-accent-primary)",
    borderColor: "var(--color-accent-primary)",
  };

  const defaultStyle = {
    background: "transparent",
    color: "var(--color-text-secondary)",
    borderColor: "var(--color-border)",
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm bg-bg-card border border-border rounded-lg p-5 sm:p-8 space-y-6">
        <div>
          <p className="text-accent-primary text-[11px] font-semibold uppercase tracking-widest mb-1">
            {t("createdHeader")}
          </p>
          <h1 className="text-text-primary font-bold text-xl leading-snug">{roomName}</h1>
          <p className="text-text-secondary text-sm mt-1">
            {isPublic ? t("createdSharePublic") : t("createdShare")}
          </p>
        </div>

        {!isPublic && (
          <div>
            <label className="text-text-muted text-[11px] font-semibold uppercase tracking-widest mb-2 block">
              {t("passwordLabel")}
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center bg-bg-elevated border border-border rounded-md px-4 py-2.5 font-mono text-text-primary text-sm tracking-widest min-w-0">
                <span className="truncate">
                  {showPassword ? password : "•".repeat(password.length)}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="ml-2 shrink-0 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon />}
                </button>
              </div>
              <button
                onClick={() => copy(password, setCopiedPassword)}
                className="h-10 px-4 rounded-md text-xs font-semibold transition-all cursor-pointer shrink-0 border"
                style={copiedPassword ? copiedStyle : defaultStyle}
              >
                {copiedPassword ? t("copied") : t("copy")}
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="text-text-muted text-[11px] font-semibold uppercase tracking-widest mb-2 block">
            {t("codeLabel")}
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-bg-elevated border border-border rounded-md px-4 py-2.5 font-mono text-accent-primary text-sm tracking-widest truncate">
              {roomId}
            </div>
            <button
              onClick={() => copy(roomId, setCopiedCode)}
              className="h-10 px-4 rounded-md text-xs font-semibold transition-all cursor-pointer shrink-0 border"
              style={copiedCode ? copiedStyle : defaultStyle}
            >
              {copiedCode ? t("copied") : t("copy")}
            </button>
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={onOpen}>
          {t("openRoom")}
          <ArrowRightIcon size={14} />
        </Button>
      </div>
    </div>
  );
}
