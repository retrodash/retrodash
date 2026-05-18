"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { hashPassword } from "@/lib/auth";
import { createRoom } from "@/lib/firestore";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ColumnEntry = { id: string; title: string };

const DEFAULT_COLUMNS: ColumnEntry[] = [
  { id: "1", title: "Went Well" },
  { id: "2", title: "To Improve" },
];

export default function NewRoomPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAnonymous, setAnonymous] = useState(false);
  const [columns, setColumns] = useState<ColumnEntry[]>(DEFAULT_COLUMNS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const addColumn = () => {
    setColumns((prev) => [...prev, { id: crypto.randomUUID(), title: "" }]);
  };

  const removeColumn = (id: string) => {
    setColumns((prev) => prev.filter((c) => c.id !== id));
  };

  const updateColumn = (id: string, title: string) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Room name is required.";
    if (!password.trim()) next.password = "Password is required.";
    if (password.trim().length < 4)
      next.password = "Password must be at least 4 characters.";
    if (columns.some((c) => !c.title.trim()))
      next.columns = "All column names must be filled in.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const passwordHash = await hashPassword(password.trim());
      const roomId = await createRoom({
        name: name.trim(),
        passwordHash,
        ownerId: user.uid,
        isAnonymous,
        columnTitles: columns.map((c) => c.title.trim()),
      });
      router.push(`/room/${roomId}`);
    } catch {
      setServerError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar />

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-10">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm mb-8 transition-colors"
        >
          <ArrowLeftIcon />
          My Rooms
        </Link>

        {/* Card */}
        <div className="bg-bg-card border border-border rounded-lg p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            Create a Room
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            Set up a space for your team&apos;s retrospective.
          </p>

          {serverError && (
            <div className="mb-6 px-4 py-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Room Name */}
            <Field label="Room Name" error={errors.name}>
              <Input
                type="text"
                placeholder="e.g. Sprint 42 Retrospective"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            {/* Password */}
            <Field
              label="Password"
              error={errors.password}
              hint="Participants will need this to join."
            >
              <Input
                type="password"
                placeholder="Enter a room password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {/* Anonymous mode */}
            <div className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-text-primary text-sm font-medium">
                  Anonymous mode
                </p>
                <p className="text-text-muted text-xs mt-0.5">
                  Hide card authors from participants
                </p>
              </div>
              <Toggle checked={isAnonymous} onChange={setAnonymous} />
            </div>

            <Divider />

            {/* Columns */}
            <div>
              <p className="text-text-primary text-sm font-medium mb-1">
                Columns
              </p>
              <p className="text-text-muted text-xs mb-4">
                Define the topics your team will discuss.
              </p>

              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={col.id} className="flex items-center gap-2">
                    <Input
                      type="text"
                      size="sm"
                      placeholder="Column name"
                      value={col.title}
                      onChange={(e) => updateColumn(col.id, e.target.value)}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeColumn(col.id)}
                      disabled={columns.length === 1}
                      className="size-10 flex items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Remove column"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>

              {errors.columns && (
                <p className="mt-2 text-xs text-red-400">{errors.columns}</p>
              )}

              <button
                type="button"
                onClick={addColumn}
                className="mt-3 flex items-center gap-1.5 text-accent-cyan text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
              >
                <SmallPlusIcon />
                Add column
              </button>

              {/* Locked Action Items row */}
              <div className="mt-4 flex items-center gap-3 h-10 px-3 rounded-md border border-dashed border-border bg-bg-elevated/50">
                <LockIcon />
                <span className="text-text-muted text-sm flex-1">
                  Action Items
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  Auto-added
                </span>
              </div>
            </div>

            <Divider />

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Creating…" : "Create Room"}
                {!submitting && <ArrowRightIcon />}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-text-primary text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-text-muted text-xs">{hint}</p>}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer ${
        checked ? "bg-accent-cyan" : "bg-bg-elevated border border-border"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-border" />;
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M9 2L4 7l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmallPlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <rect
        x="1.5"
        y="5.5"
        width="10"
        height="7"
        rx="1.5"
        stroke="var(--color-text-muted)"
        strokeWidth="1.2"
      />
      <path
        d="M4 5.5V4a2.5 2.5 0 015 0v1.5"
        stroke="var(--color-text-muted)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
