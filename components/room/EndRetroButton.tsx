"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";

interface EndRetroButtonProps {
  loading: boolean;
  onClick: (description: string) => void;
}

export function EndRetroButton({ loading, onClick }: EndRetroButtonProps) {
  const t = useTranslations("room");
  const [open, setOpen] = useState(false);
  const [phrase, setPhrase] = useState("");

  const handleConfirm = () => {
    onClick(phrase.trim());
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
        className="border border-red-500/30 bg-transparent hover:bg-red-500/10"
      >
        <span className="min-[390px]:hidden">{t("endRetroShort")}</span>
        <span className="hidden min-[390px]:inline">{t("endRetro")}</span>
      </Button>

      {open && (
        <Modal title={t("endRetroTitle")} onClose={() => setOpen(false)} size="sm">
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            {t("endRetroSubtitle")}
          </p>
          <Textarea
            autoFocus
            placeholder={t("endRetroPlaceholder")}
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="ghost-text" size="sm" onClick={() => setOpen(false)}>
              {t("cancel")}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleConfirm} disabled={loading}>
              {loading ? t("ending") : t("confirmEnd")}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
