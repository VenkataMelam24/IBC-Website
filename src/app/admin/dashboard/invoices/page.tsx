"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Invoice = {
  id: string;
  invoice_number: string;
  client_company: string | null;
  client_name: string | null;
  client_email: string;
  invoice_date: string;
  due_date: string;
  total_gross: number;
  status: string;
  created_at: string;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/invoices")
      .then((r) => r.json())
      .then((data) => { setInvoices(data ?? []); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-primary">Invoices</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{invoices.length} total</p>
        </div>
        <Link
          href="/admin/dashboard/invoices/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Invoice
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">Loading…</div>
      ) : invoices.length === 0 ? (
        <div className="rounded-xl border border-border bg-background py-16 text-center">
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
          <Link href="/admin/dashboard/invoices/new" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
            Create your first invoice →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-[hsl(38_40%_96%)]">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Invoice #</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Client</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Due</th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">Total</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[hsl(38_40%_98%)]">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{inv.invoice_number}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{inv.client_company ?? inv.client_name ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">{inv.client_email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.invoice_date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.due_date}</td>
                  <td className="px-4 py-3 text-right font-semibold">€{Number(inv.total_gross).toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/api/admin/invoices/${inv.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-[hsl(38_40%_93%)]"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
