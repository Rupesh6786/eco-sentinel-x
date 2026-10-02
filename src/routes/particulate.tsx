import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTelemetry, classify, fmtTime, fmtDateTime } from "@/lib/telemetry";
import { PageHeader, Panel, StatCard, Gauge, StatusBadge, chartTooltip, axis } from "@/components/eco/widgets";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/particulate")({
  head: () => meta("Particulate Matter", "PM2.5, PM10 and dust density tracking with pollution spike detection."),
  component: Particulate,
});

function Particulate() {
  const { readings, latest, settings } = useTelemetry();
  if (!latest) return null;
  const data = readings.slice(-120).map((r) => ({ t: fmtTime(r.ts), pm25: +r.pm25.toFixed(1), pm10: +r.pm10.toFixed(1) }));
  const peak = readings.reduce((a, b) => (b.pm25 > a.pm25 ? b : a), latest);
  const avg = readings.reduce((s, r) => s + r.pm25, 0) / readings.length;
  const bins = ([[0, 12], [12, 35], [35, 55], [55, 150], [150, 9999]] as [number, number][]).map(([lo, hi]) => ({
    range: hi > 1000 ? `${lo}+` : `${lo}-${hi}`, count: readings.filter((r) => r.pm25 >= lo && r.pm25 < hi).length,
  }));

  return (
    <div>
      <PageHeader code="03 / DUST SENSOR" title="Particulate Matter" subtitle="Optical dust sensor density, PM2.5 / PM10 trends and peak thresholds." />
      <div className="grid gap-4 md:grid-cols-4">
        <Panel title="PM2.5" className="flex flex-col items-center md:row-span-2">
          <Gauge value={latest.pm25} max={250} label="Fine particles" unit="µg/m³" warn={35} danger={settings.pm25_threshold} size={220} />
          <div className="mt-2"><StatusBadge {...classify(latest.pm25, 35, settings.pm25_threshold)} /></div>
        </Panel>
        <StatCard accent label="PM10" value={latest.pm10.toFixed(0)} unit="µg/m³" />
        <StatCard label="Dust Density" value={latest.dust_density.toFixed(3)} unit="mg/m³" />
        <StatCard label="Average PM2.5" value={avg.toFixed(1)} unit="µg/m³" />
        <StatCard label="Peak PM2.5" value={peak.pm25.toFixed(0)} unit="µg/m³" sub={fmtDateTime(peak.ts)} />
        <StatCard label="Threshold" value={String(settings.pm25_threshold)} unit="µg/m³" />
        <StatCard label="Over Limit" value={String(readings.filter((r) => r.pm25 >= settings.pm25_threshold).length)} unit="samples" />
      </div>
      <Panel title="Pollution Trend" tag="AREA · SPIKES" className="mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="p25" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} /></linearGradient>
              <linearGradient id="p10" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="t" {...axis} minTickGap={40} /><YAxis {...axis} />
            <Tooltip {...chartTooltip} />
            <ReferenceLine y={settings.pm25_threshold} stroke="var(--destructive)" strokeDasharray="4 4" label={{ value: "Peak limit", fill: "var(--destructive)", fontSize: 10 }} />
            <Area type="monotone" dataKey="pm10" name="PM10" stroke="var(--chart-2)" fill="url(#p10)" strokeWidth={2} />
            <Area type="monotone" dataKey="pm25" name="PM2.5" stroke="var(--chart-1)" fill="url(#p25)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="PM2.5 Distribution" tag="SAMPLE COUNT" className="mt-4">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={bins} layout="vertical">
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" {...axis} /><YAxis type="category" dataKey="range" {...axis} width={60} />
            <Tooltip {...chartTooltip} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="count" fill="var(--chart-1)" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
