"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileSpreadsheet,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  Printer,
  RefreshCw,
  Table2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OfficeTransactionsPanel } from "@/components/office-transactions-panel";
import {
  citizenToOfficialRow,
  defaultOfficeDocs,
  formatOfficeDate,
  requestsTableCopy as copy,
  sampleOfficialRows,
  type CitizenRequestRecord,
  type OfficialRequestRow,
} from "@/lib/requests-table";
import { citizenToTransaction, transactionCopy, type OfficeTransaction, type TransactionTab } from "@/lib/office-transactions";
import { office } from "@/lib/content";
import { cn } from "@/lib/utils";

type ApiItem = CitizenRequestRecord & { id?: string };
type WorkspaceView = "transactions" | "writing";

const DOCS_PANEL_KEY = "office-docs-panel-open";

export function RequestsTableView() {
  const router = useRouter();
  const [citizenRows, setCitizenRows] = useState<OfficialRequestRow[]>([]);
  const [citizenTx, setCitizenTx] = useState<OfficeTransaction[]>([]);
  const [includeSamples, setIncludeSamples] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [today] = useState(() => formatOfficeDate(new Date()));
  const [docsOpen, setDocsOpen] = useState(true);
  const [activeDocId, setActiveDocId] = useState(defaultOfficeDocs[0]?.id ?? "doc-requests-table");
  const [workspace, setWorkspace] = useState<WorkspaceView>("transactions");
  const [txTab, setTxTab] = useState<TransactionTab>("transactions");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DOCS_PANEL_KEY);
      if (saved === "0") setDocsOpen(false);
      if (saved === "1") setDocsOpen(true);
    } catch {
      // ignore
    }
  }, []);

  function toggleDocsPanel() {
    setDocsOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(DOCS_PANEL_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/office/requests", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/office-login?next=/requests-table");
        return;
      }
      const data = (await res.json()) as { ok?: boolean; items?: ApiItem[]; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "تعذر تحميل الطلبات");
        setCitizenRows([]);
        setCitizenTx([]);
        setLoading(false);
        return;
      }
      const items = data.items ?? [];
      const chronological = [...items].reverse();
      setCitizenRows(chronological.map((row, index) => citizenToOfficialRow(row, index)));
      setCitizenTx(items.map((row, index) => citizenToTransaction(row, index)));
      setIncludeSamples(items.length === 0);
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const rows = useMemo(() => {
    return includeSamples ? [...sampleOfficialRows, ...citizenRows] : citizenRows;
  }, [citizenRows, includeSamples]);

  const docs = useMemo(() => defaultOfficeDocs, []);

  function onPrint() {
    window.print();
  }

  async function onLogout() {
    await fetch("/api/office/logout", { method: "POST" });
    router.replace("/office-login");
    router.refresh();
  }

  async function onClearCitizen() {
    if (!window.confirm("مسح كل الطلبات المحفوظة على الخادم؟")) return;
    const res = await fetch("/api/office/requests", { method: "DELETE" });
    if (res.status === 401) {
      router.replace("/office-login?next=/requests-table");
      return;
    }
    await reload();
  }

  return (
    <div className="requests-table-page bg-[#f7f4ee] text-[#111]">
      <div className="no-print mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-[#6b5b3a]">{office.brand}</p>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl">{transactionCopy.workspaceTitle}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#444]">
              معاملات منظمة بتبويبات واضحة، مع جدول كتابة رسمي يمكن توسيعه بإخفاء قائمة الوثائق.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
            <Button
              type="button"
              size="lg"
              variant={workspace === "transactions" ? "default" : "outline"}
              className={cn(
                "h-11 w-full rounded-md sm:w-auto",
                workspace === "transactions" && "bg-[#111] text-white hover:bg-black"
              )}
              onClick={() => setWorkspace("transactions")}
            >
              المعاملات
            </Button>
            <Button
              type="button"
              size="lg"
              variant={workspace === "writing" ? "default" : "outline"}
              className={cn(
                "h-11 w-full rounded-md sm:w-auto",
                workspace === "writing" && "bg-[#111] text-white hover:bg-black"
              )}
              onClick={() => setWorkspace("writing")}
            >
              <FileSpreadsheet className="size-4" aria-hidden />
              {transactionCopy.writingTab}
            </Button>
            {workspace === "writing" ? (
              <Button
                type="button"
                size="lg"
                className="h-11 w-full rounded-md bg-gold text-[#1a1205] hover:bg-gold/90 sm:w-auto"
                onClick={toggleDocsPanel}
                aria-pressed={docsOpen}
                aria-controls="office-docs-panel"
              >
                {docsOpen ? (
                  <PanelRightClose className="size-4" aria-hidden />
                ) : (
                  <PanelRightOpen className="size-4" aria-hidden />
                )}
                {docsOpen ? copy.hideDocsPanel : copy.showDocsPanel}
              </Button>
            ) : null}
            <Button type="button" variant="outline" size="lg" className="h-11 w-full rounded-md sm:w-auto" onClick={() => void reload()}>
              <RefreshCw className="size-4" aria-hidden />
              {copy.refresh}
            </Button>
            {workspace === "writing" ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-11 w-full rounded-md sm:w-auto"
                  onClick={() => setIncludeSamples((v) => !v)}
                >
                  <Table2 className="size-4" aria-hidden />
                  {includeSamples ? copy.hideSamples : copy.showSamples}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="h-11 w-full rounded-md bg-[#111] text-white hover:bg-black sm:w-auto"
                  onClick={onPrint}
                >
                  <Printer className="size-4" aria-hidden />
                  {copy.print}
                </Button>
              </>
            ) : null}
            <Button type="button" variant="outline" size="lg" className="h-11 w-full rounded-md sm:w-auto" onClick={() => void onLogout()}>
              <LogOut className="size-4" aria-hidden />
              تسجيل الخروج
            </Button>
          </div>
        </div>
        {loading ? <p className="text-sm text-[#555]">جاري تحميل الطلبات...</p> : null}
        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {citizenRows.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-fit text-destructive hover:text-destructive"
            onClick={() => void onClearCitizen()}
          >
            <Trash2 className="size-4" aria-hidden />
            مسح الطلبات المحفوظة على الخادم
          </Button>
        ) : null}
      </div>

      {workspace === "transactions" ? (
        <div className="mx-auto max-w-[1400px] px-3 pb-10 sm:px-6">
          <OfficeTransactionsPanel citizenTx={citizenTx} activeTab={txTab} onTabChange={setTxTab} />
        </div>
      ) : (
        <div
          className={cn(
            "mx-auto grid max-w-[1400px] gap-4 px-3 pb-10 sm:px-6",
            docsOpen ? "lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)]" : "grid-cols-1"
          )}
        >
          <aside
            id="office-docs-panel"
            className={cn(
              "no-print overflow-hidden rounded-xl border border-[#222]/20 bg-white shadow-sm transition-all duration-300",
              docsOpen ? "block max-h-[80vh] opacity-100" : "hidden max-h-0 opacity-0 lg:hidden"
            )}
            hidden={!docsOpen}
            aria-hidden={!docsOpen}
          >
            <div className="border-b border-[#222]/10 bg-[#111] px-4 py-3 text-white">
              <p className="text-sm font-semibold">{copy.docsPanelTitle}</p>
              <p className="mt-1 text-xs text-white/65">اضغط الصف لفتح وثيقة الكتابة</p>
            </div>
            <div className="overflow-x-auto">
              <table className="office-docs-list w-full border-collapse text-sm" dir="rtl">
                <thead>
                  <tr className="bg-[#f0ece3]">
                    <th className="border-b border-[#222]/15 px-3 py-2.5 text-right font-semibold">
                      {copy.docsColumns.status}
                    </th>
                    <th className="border-b border-[#222]/15 px-3 py-2.5 text-right font-semibold">
                      {copy.docsColumns.type}
                    </th>
                    <th className="border-b border-[#222]/15 px-3 py-2.5 text-right font-semibold">
                      {copy.docsColumns.title}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc) => {
                    const active = doc.id === activeDocId;
                    return (
                      <tr
                        key={doc.id}
                        className={cn(
                          "cursor-pointer border-b border-[#222]/10 transition-colors hover:bg-gold/10",
                          active && "bg-gold/15"
                        )}
                        onClick={() => setActiveDocId(doc.id)}
                      >
                        <td className="px-3 py-3 text-right">
                          <span
                            className={cn(
                              "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                              doc.status === "مسودة" ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                            )}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right text-[#444]">{doc.type}</td>
                        <td className="px-3 py-3 text-right font-medium">{doc.title}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </aside>

          <div className={cn("min-w-0", !docsOpen && "w-full")}>
            {!docsOpen ? (
              <div className="no-print mb-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-10 rounded-md border-gold/50 bg-gold/10 text-[#1a1205] hover:bg-gold/20"
                  onClick={toggleDocsPanel}
                >
                  <PanelRightOpen className="size-4" aria-hidden />
                  {copy.showDocsPanel}
                </Button>
              </div>
            ) : null}

            <article
              className="official-sheet border border-[#222] bg-white p-4 shadow-sm sm:p-8 print:border-0 print:p-0 print:shadow-none"
              dir="rtl"
              lang="ar"
            >
              <header className="mb-5 text-right">
                <p className="font-heading text-lg font-bold leading-9 sm:text-xl">{copy.addressee}</p>
                <p className="mt-1 font-heading text-base font-semibold text-[#222] sm:text-lg">
                  {copy.documentTitle}
                </p>
                <p className="mt-2 text-sm text-[#444]">{copy.officeLine}</p>
                <p className="mt-3 text-sm">
                  <span className="font-semibold">{copy.dateLabel}: </span>
                  <span dir="ltr" className="unicode-isolate inline-block tabular-nums">
                    {today}
                  </span>
                </p>
              </header>

              <div className="overflow-x-auto">
                <table className="official-requests-table w-full border-collapse text-sm" dir="rtl">
                  <colgroup>
                    {copy.columns.map((col) => (
                      <col key={col.key} style={{ width: col.width }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      {copy.columns.map((col) => (
                        <th key={col.key} scope="col" className="text-right">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={copy.columns.length} className="empty-cell text-right">
                          {copy.empty}
                        </td>
                      </tr>
                    ) : (
                      rows.map((row, index) => (
                        <tr key={row.id}>
                          <td className="cell-seq text-right" dir="ltr">
                            {index + 1}
                          </td>
                          <td className="text-right">{row.subject}</td>
                          <td className="cell-content text-right">{row.content}</td>
                          <td className="cell-phone text-right" dir="ltr">
                            {row.phone}
                          </td>
                          <td className="cell-directive text-right">{row.directive || "\u00a0"}</td>
                        </tr>
                      ))
                    )}
                    {rows.length > 0
                      ? Array.from({ length: Math.max(0, 3) }).map((_, i) => (
                          <tr key={`blank-${i}`} className="blank-row">
                            <td className="cell-seq text-right" dir="ltr">
                              {rows.length + i + 1}
                            </td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="cell-directive text-right">&nbsp;</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              <footer className="mt-8 grid gap-6 text-right text-sm sm:grid-cols-2 print:mt-10">
                <div>
                  <p className="font-semibold">إعداد المكتب</p>
                  <p className="mt-6">التوقيع: ........................</p>
                </div>
                <div>
                  <p className="font-semibold">للاستخدام الرسمي</p>
                  <p className="mt-2 text-[#555]">عمود «توجيه سيادتكم» يُعبَّأ يدوياً بعد العرض.</p>
                </div>
              </footer>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
