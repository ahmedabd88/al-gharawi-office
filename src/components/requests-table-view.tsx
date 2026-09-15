"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Printer, RefreshCw, Table2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  citizenToOfficialRow,
  formatOfficeDate,
  readCitizenRequests,
  REQUESTS_STORAGE_KEY,
  requestsTableCopy as copy,
  sampleOfficialRows,
  type OfficialRequestRow,
} from "@/lib/requests-table";
import { office } from "@/lib/content";

export function RequestsTableView() {
  const [citizenRows, setCitizenRows] = useState<OfficialRequestRow[]>([]);
  const [includeSamples, setIncludeSamples] = useState(true);
  const [today] = useState(() => formatOfficeDate(new Date()));

  const reload = useCallback(() => {
    const stored = readCitizenRequests();
    // Newest first in storage → number them chronologically for the letter
    const chronological = [...stored].reverse();
    setCitizenRows(chronological.map((row, index) => citizenToOfficialRow(row, index)));
    if (stored.length > 0) {
      setIncludeSamples(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const rows = useMemo(() => {
    const merged = includeSamples ? [...sampleOfficialRows, ...citizenRows] : citizenRows;
    return merged;
  }, [citizenRows, includeSamples]);

  function onPrint() {
    window.print();
  }

  function onClearCitizen() {
    try {
      localStorage.removeItem(REQUESTS_STORAGE_KEY);
    } catch {
      // ignore
    }
    reload();
    setIncludeSamples(true);
  }

  return (
    <div className="requests-table-page bg-[#f7f4ee] text-[#111]">
      <div className="no-print mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[#6b5b3a]">{office.brand}</p>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl">{copy.pageTitle}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#444]">{copy.citizenNote}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="lg" className="rounded-md" onClick={reload}>
              <RefreshCw className="size-4" aria-hidden />
              {copy.refresh}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-md"
              onClick={() => setIncludeSamples((v) => !v)}
            >
              <Table2 className="size-4" aria-hidden />
              {includeSamples ? copy.hideSamples : copy.showSamples}
            </Button>
            <Button
              type="button"
              size="lg"
              className="rounded-md bg-[#111] text-white hover:bg-black"
              onClick={onPrint}
            >
              <Printer className="size-4" aria-hidden />
              {copy.print}
            </Button>
          </div>
        </div>
        <p className="text-xs text-[#666]">{copy.printHint}</p>
        {citizenRows.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-fit text-destructive hover:text-destructive"
            onClick={onClearCitizen}
          >
            <Trash2 className="size-4" aria-hidden />
            {copy.clearCitizen}
          </Button>
        ) : null}
      </div>

      <div className="mx-auto max-w-[1100px] px-3 pb-10 sm:px-6">
        <article className="official-sheet border border-[#222] bg-white p-4 shadow-sm sm:p-8 print:border-0 print:p-0 print:shadow-none">
          <header className="mb-5 text-center">
            <p className="font-heading text-lg font-bold leading-9 sm:text-xl">{copy.addressee}</p>
            <p className="mt-1 font-heading text-base font-semibold text-[#222] sm:text-lg">
              {copy.documentTitle}
            </p>
            <p className="mt-2 text-sm text-[#444]">{copy.officeLine}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">{copy.dateLabel}: </span>
              <span dir="ltr" className="unicode-isolate tabular-nums">
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
                    <th key={col.key} scope="col">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={copy.columns.length} className="empty-cell">
                      {copy.empty}
                    </td>
                  </tr>
                ) : (
                  rows.map((row, index) => (
                    <tr key={row.id}>
                      <td className="cell-seq" dir="ltr">
                        {index + 1}
                      </td>
                      <td>{row.letterRef}</td>
                      <td>{row.subject}</td>
                      <td className="cell-content">{row.content}</td>
                      <td className="cell-phone" dir="ltr">
                        {row.phone}
                      </td>
                      <td className="cell-directive">{row.directive || "\u00a0"}</td>
                    </tr>
                  ))
                )}
                {/* Extra blank lines for handwriting when printing */}
                {rows.length > 0
                  ? Array.from({ length: Math.max(0, 3) }).map((_, i) => (
                      <tr key={`blank-${i}`} className="blank-row">
                        <td className="cell-seq" dir="ltr">
                          {rows.length + i + 1}
                        </td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td className="cell-directive">&nbsp;</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>

          <footer className="mt-8 grid gap-6 text-sm sm:grid-cols-2 print:mt-10">
            <div>
              <p className="font-semibold">إعداد المكتب</p>
              <p className="mt-6">التوقيع: ........................</p>
            </div>
            <div className="sm:text-start">
              <p className="font-semibold">للاستخدام الرسمي</p>
              <p className="mt-2 text-[#555]">عمود «توجيه سيادتكم» يُعبَّأ يدوياً بعد العرض.</p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
