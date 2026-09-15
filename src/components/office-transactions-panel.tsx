"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  sampleTransactions,
  transactionColumns,
  transactionCopy,
  transactionStatusStyles,
  transactionTabs,
  type OfficeTransaction,
  type TransactionStatus,
  type TransactionTab,
} from "@/lib/office-transactions";
import { cn } from "@/lib/utils";

const ALL_STATUSES: Array<TransactionStatus | "all"> = [
  "all",
  "جديدة",
  "تم استلام الرد",
  "مكتملة",
  "ملغاة",
];

type Props = {
  citizenTx: OfficeTransaction[];
  activeTab: TransactionTab;
  onTabChange: (tab: TransactionTab) => void;
};

export function OfficeTransactionsPanel({ citizenTx, activeTab, onTabChange }: Props) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");

  const rows = useMemo(() => {
    const merged = [...citizenTx, ...sampleTransactions];
    const q = query.trim().toLowerCase();
    return merged.filter((row) => {
      if (row.tab !== activeTab) return false;
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!q) return true;
      return (
        row.title.toLowerCase().includes(q) ||
        row.authority.toLowerCase().includes(q) ||
        row.number.toLowerCase().includes(q)
      );
    });
  }, [activeTab, citizenTx, query, statusFilter]);

  return (
    <section className="overflow-hidden rounded-xl border border-[#222]/15 bg-white shadow-sm" dir="rtl">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#222]/10 bg-[#111] px-4 py-3 text-white sm:px-5">
        <nav className="flex flex-wrap gap-1" aria-label="أقسام المعاملات">
          {transactionTabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
                  active ? "bg-gold text-[#1a1205]" : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-b border-[#222]/10 bg-[#faf8f3] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#888]" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={transactionCopy.searchPlaceholder}
            className="min-h-11 bg-white pr-10 text-right text-base md:text-sm"
            aria-label="بحث في المعاملات"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-[#444]">
          <span className="whitespace-nowrap">الحالة</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "all")}
            className="min-h-11 rounded-lg border border-input bg-white px-3 text-sm"
          >
            {ALL_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? transactionCopy.filterAll : status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="office-tx-table w-full border-collapse text-sm" dir="rtl">
          <colgroup>
            {transactionColumns.map((col) => (
              <col key={col.key} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {transactionColumns.map((col) => (
                <th key={col.key} scope="col">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={transactionColumns.length} className="empty">
                  {transactionCopy.empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="cell-num" dir="ltr">
                    {row.number}
                  </td>
                  <td className="cell-title">{row.title}</td>
                  <td>{row.authority}</td>
                  <td>
                    <span className={cn("status-badge", transactionStatusStyles[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="cell-date" dir="ltr">
                    {row.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
