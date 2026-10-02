import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, FileDown, Search } from "lucide-react";
import { useTelemetry, fmtDateTime, type Reading } from "@/lib/telemetry";
import { PageHeader, Panel } from "@/components/eco/widgets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/logs")({
  head: () => meta("Data Logs", "Searchable, sortable history of every ESP32 reading with date filters and PDF export."),
  component: Logs,
});

const cols: { key: keyof Reading; label: string; d?: number }[] = [
  { key: "ts", label: "Timestamp" }, { key: "aqi", label: "AQI", d: 0 },
  { key: "mq2_ppm", label: "MQ-2", d: 0 }, { key: "mq7_ppm", label: "MQ-7", d: 1 },
  { key: "pm25", label: "PM2.5", d: 1 }, { key: "pm10", label: "PM10", d: 1 },
  { key: "temperature", label: "Temp °C", d: 1 }, { key: "humidity", label: "RH %", d: 0 },
  { key: "battery_voltage", label: "Batt V", d: 2 }, { key: "rssi", label: "RSSI", d: 0 },
];
const PAGE = 25;

function Logs() {
  const { readings } = useTelemetry();
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState<{ k: keyof Reading; asc: boolean }>({ k: "ts", asc: false });
  const [page, setPage] = useState(0);

  const rows = useMemo(() => {
    const f = from ? new Date(from).getTime() : -Infinity;
    const t = to ? new Date(to).getTime() + 86_399_999 : Infinity;
    return readings
      .filter((r) => r.ts >= f && r.ts <= t)
      .filter((r) => !q || [fmtDateTime(r.ts), r.deviceId, ...cols.map((c) => String(r[c.key]))].join(" ").toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => ((a[sort.k] as number) - (b[sort.k] as number)) * (sort.asc ? 1 : -1));
  }, [readings, q, from, to, sort]);

  const cell = (r: Reading, c: (typeof cols)[number]) => (c.key === "ts" ? fmtDateTime(r.ts) : (r[c.key] as number).toFixed(c.d ?? 1));

  async function exportPdf() {
    const { jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFillColor(20, 20, 18); doc.rect(0, 0, 297, 24, "F");
    doc.setTextColor(250, 214, 30); doc.setFontSize(18); doc.text("Eco-Sentinal-X · Sensor Report", 14, 15);
    doc.setTextColor(200, 200, 200); doc.setFontSize(9); doc.text(`Generated ${new Date().toLocaleString()} · ${rows.length} records`, 14, 21);
    autoTable(doc, {
      startY: 30, head: [cols.map((c) => c.label)], body: rows.map((r) => cols.map((c) => cell(r, c))),
      styles: { fontSize: 8 }, headStyles: { fillColor: [250, 214, 30], textColor: [20, 20, 18] },
      alternateRowStyles: { fillColor: [245, 245, 240] },
    });
    doc.save(`eco-sentinal-x-report-${Date.now()}.pdf`);
  }

  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const view = rows.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <div>
      <PageHeader code="06 / HISTORY" title="Historical Data Logs" subtitle="Every timestamped reading uploaded by the ESP32." />
      <Panel title="Readings" tag={`${rows.length} RECORDS`}>
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div className="relative min-w-52 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search readings…" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} />
          </div>
          <label className="text-xs text-muted-foreground">From<Input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(0); }} /></label>
          <label className="text-xs text-muted-foreground">To<Input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(0); }} /></label>
          <Button onClick={exportPdf} className="font-semibold"><FileDown className="h-4 w-4" />Export High-Quality PDF Report</Button>
        </div>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>{cols.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  <button className="inline-flex items-center gap-1 hover:text-primary" onClick={() => setSort((s) => ({ k: c.key, asc: s.k === c.key ? !s.asc : false }))}>
                    {c.label}<ArrowUpDown className={`h-3 w-3 ${sort.k === c.key ? "text-primary" : "opacity-40"}`} />
                  </button>
                </th>))}</tr>
            </thead>
            <tbody className="font-mono">
              {view.map((r) => (
                <tr key={r.id} className="border-t hover:bg-accent/40">
                  {cols.map((c) => <td key={c.key} className="whitespace-nowrap px-3 py-2">{cell(r, c)}</td>)}
                </tr>
              ))}
              {!view.length && <tr><td colSpan={cols.length} className="p-8 text-center text-muted-foreground">No readings match.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Page {page + 1} of {pages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Prev</Button>
            <Button variant="outline" size="sm" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
