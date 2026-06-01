"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/useAuth";
import { addFeedback } from "@/lib/firestore";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Input";
import { CheckCircleIcon } from "@/components/ui/Icons";
import type { FeedbackType } from "@/types";

const TYPES: { value: FeedbackType; labelKey: "typeBug" | "typeFeature" | "typeGeneral" }[] = [
  { value: "bug", labelKey: "typeBug" },
  { value: "feature", labelKey: "typeFeature" },
  { value: "general", labelKey: "typeGeneral" },
];

export function FeedbackClient() {
  const { user } = useAuth();
  const t = useTranslations("feedback");

  const [type, setType] = useState<FeedbackType>("general");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    const trimmed = message.trim();
    if (!trimmed) next.message = t("messageRequired");
    else if (trimmed.length < 20) next.message = t("messageMinLength");
    else if (trimmed.length > 2000) next.message = t("messageMaxLength");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setSubmitting(true);
    setServerError(null);

    try {
      await addFeedback({
        userId: user.uid,
        userName: user.displayName ?? "Anonymous",
        userEmail: user.email ?? "",
        userPhoto: user.photoURL ?? null,
        type,
        message: message.trim(),
      });
      setSubmitted(true);
    } catch {
      setServerError(t("serverError"));
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setMessage("");
    setType("general");
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col">
        <Navbar logoHref="/dashboard" />
        <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center justify-center text-center gap-6">
          <div className="size-16 rounded-2xl border border-border bg-bg-card flex items-center justify-center text-accent-primary">
            <CheckCircleIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {t("successTitle")}
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              {t("successSubtitle")}
            </p>
          </div>
          <button
            onClick={reset}
            className="text-accent-primary text-sm hover:underline cursor-pointer"
          >
            {t("sendAnother")}
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar logoHref="/dashboard" />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm mb-8 transition-colors"
        >
          {t("backToDashboard")}
        </Link>

        <div className="bg-bg-card border border-border rounded-lg p-5 sm:p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {t("title")}
          </h1>
          <p className="text-text-secondary text-sm mb-8">{t("subtitle")}</p>

          {serverError && (
            <div className="mb-6 px-4 py-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <p className="text-text-primary text-sm font-medium mb-2">
                {t("typeLabel")}
              </p>
              <div className="flex rounded-md border border-border overflow-hidden">
                {TYPES.map((item, i) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setType(item.value)}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      i < TYPES.length - 1 ? "border-r border-border" : ""
                    } ${
                      type === item.value
                        ? "bg-accent-violet/10 text-accent-violet"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <Field
              label={t("messageLabel")}
              error={errors.message}
              hint={t("messageHint")}
            >
              <Textarea
                rows={6}
                placeholder={t("messagePlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? t("submitting") : t("submit")}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
