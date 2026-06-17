"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CompleteOrderButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async (outcome: "confirmed" | "rejected") => {
    setLoading(true);
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: outcome }),
    });
    setOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-80"
      >
        Mark Complete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-7 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-foreground">Close this deal?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              What was the outcome for <strong>{name}</strong>?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                disabled={loading}
                onClick={() => handle("confirmed")}
                className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-60"
              >
                ✓ Confirmed
              </button>
              <button
                disabled={loading}
                onClick={() => handle("rejected")}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                ✕ Rejected
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
