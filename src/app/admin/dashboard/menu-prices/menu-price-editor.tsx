"use client";

import { useState } from "react";
import type { MenuItem } from "./page";

type EditState = { price: string; price_label: string } | null;

function PriceTable({
  title,
  items,
  onSave,
}: {
  title: string;
  items: MenuItem[];
  onSave: (id: string, price: number, price_label: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState<Record<string, EditState>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [localItems, setLocalItems] = useState<MenuItem[]>(items);

  const byCategory = localItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const startEdit = (item: MenuItem) => {
    setEditing((prev) => ({
      ...prev,
      [item.id]: { price: String(item.price), price_label: item.price_label },
    }));
    setSaved((prev) => ({ ...prev, [item.id]: false }));
  };

  const cancelEdit = (id: string) => {
    setEditing((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  const handleSave = async (item: MenuItem) => {
    const draft = editing[item.id];
    if (!draft) return;
    const newPrice = parseFloat(draft.price);
    if (isNaN(newPrice) || newPrice < 0) return;

    setSaving((prev) => ({ ...prev, [item.id]: true }));
    await onSave(item.id, newPrice, draft.price_label);
    setLocalItems((prev) => prev.map((i) => i.id === item.id ? { ...i, price: newPrice, price_label: draft.price_label } : i));
    setSaving((prev) => ({ ...prev, [item.id]: false }));
    setSaved((prev) => ({ ...prev, [item.id]: true }));
    setEditing((prev) => { const next = { ...prev }; delete next[item.id]; return next; });

    setTimeout(() => setSaved((prev) => ({ ...prev, [item.id]: false })), 2000);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border bg-[hsl(32_40%_97%)] px-6 py-4">
        <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{localItems.length} items</p>
      </div>

      {Object.entries(byCategory).map(([category, catItems]) => (
        <div key={category}>
          <div className="border-b border-border bg-[hsl(38_48%_96%)] px-6 py-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{category}</p>
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {catItems.map((item) => {
                const draft = editing[item.id];
                const isSaving = saving[item.id];
                const wasSaved = saved[item.id];
                return (
                  <tr key={item.id} className="hover:bg-[hsl(32_40%_98%)]">
                    <td className="px-6 py-3 font-semibold text-foreground">{item.name}</td>

                    {draft ? (
                      <>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm">€</span>
                            <input
                              type="number"
                              min={0}
                              step={0.01}
                              value={draft.price}
                              onChange={(e) =>
                                setEditing((prev) => ({
                                  ...prev,
                                  [item.id]: { ...prev[item.id]!, price: e.target.value },
                                }))
                              }
                              className="w-24 rounded-lg border border-primary bg-background px-3 py-1.5 text-sm focus:outline-none"
                              autoFocus
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={draft.price_label}
                            onChange={(e) =>
                              setEditing((prev) => ({
                                ...prev,
                                [item.id]: { ...prev[item.id]!, price_label: e.target.value },
                              }))
                            }
                            placeholder="e.g. €119 or from €50"
                            className="w-32 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
                          />
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSave(item)}
                              disabled={isSaving}
                              className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:opacity-80 disabled:opacity-60"
                            >
                              {isSaving ? "Saving…" : "Save"}
                            </button>
                            <button
                              onClick={() => cancelEdit(item.id)}
                              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-[hsl(38_40%_93%)]"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 font-semibold text-primary">€{Number(item.price).toFixed(2)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.price_label}</td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {wasSaved ? (
                            <span className="text-xs font-semibold text-green-600">Saved ✓</span>
                          ) : (
                            <button
                              onClick={() => startEdit(item)}
                              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-[hsl(38_40%_93%)]"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export function MenuPriceEditor({
  cateringItems,
  dineinItems,
}: {
  cateringItems: MenuItem[];
  dineinItems: MenuItem[];
}) {
  const [tab, setTab] = useState<"catering" | "dinein">("catering");
  const [globalError, setGlobalError] = useState("");

  const handleSave = async (id: string, price: number, price_label: string) => {
    setGlobalError("");
    const res = await fetch("/api/admin/menu-items", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, price, price_label }),
    });
    const json = await res.json();
    if (!json.success) {
      setGlobalError(json.error ?? "Failed to save. Please try again.");
      throw new Error(json.error);
    }
  };

  return (
    <div>
      {globalError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {globalError}
        </div>
      )}

      <div className="mb-5 inline-flex rounded-full bg-muted p-1">
        <button
          type="button"
          onClick={() => setTab("catering")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
            tab === "catering" ? "bg-primary text-primary-foreground shadow" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          Catering Prices
        </button>
        <button
          type="button"
          onClick={() => setTab("dinein")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
            tab === "dinein" ? "bg-primary text-primary-foreground shadow" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          Dine-in Prices
        </button>
      </div>

      {tab === "catering" ? (
        <PriceTable title="Catering Menu Prices" items={cateringItems} onSave={handleSave} />
      ) : (
        <PriceTable title="Dine-in Menu Prices" items={dineinItems} onSave={handleSave} />
      )}
    </div>
  );
}
