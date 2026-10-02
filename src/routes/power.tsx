import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Battery, Zap, Clock, Wifi, Cpu, Plug } from "lucide-react";
import { useTelemetry, fmtTime, fmtUptime } from "@/lib/telemetry";
import { PageHeader, Panel, StatCard, Gauge, ProgressBar, StatusBadge, chartTooltip, axis } from "@/components/eco/widgets";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/power")({
  head: () => meta("Power & System", "ESP32 battery, TP4056 charging, MT3608 boost output, Wi-Fi RSSI and memory telemetry."),
  component: Power,
});

const HEAP_TOTAL = 320 * 1024;

function Power() {
  const { readings, latest } = useTelemetry();
  if (!latest) return null;
  const data = readings.slice(-120).map((r) => ({ t: fmtTime(r.ts), v: +r.battery_voltage.toFixed(2), boost: +r.boost_voltage.toFixed(2), rssi: r.rssi, heap: +(r.free_heap / 1024).toFixed(1) }));
  const sig = latest.rssi > -60 ? { label: "Excellent", tone: "success" as const } : latest.rssi > -75 ? { label: "Fair", tone: "warning" as const } : { label: "Weak", tone: "destructive" as const };
  const usedPct = 100 - (latest.free_heap / HEAP_TOTAL) * 100;

  return (
    <div>
      <PageHeader code="05 / TELEMETRY" title="Power & System" subtitle="ESP32 · TP4056 charger · MT3608 boost converter health." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Battery" tag="Li-ion 1S" className="glow">
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-14 rounded-md border-2 border-primary p-1">
              <div className="absolute -top-2 left-1/2 h-2 w-5 -translate-x-1/2 rounded-t bg-primary" />
              <div className="absolute inset-x-1 bottom-1 rounded-sm bg-primary transition-all duration-700" style={{ height: `calc(${latest.battery_percent}% - 8px)` }} />
            </div>
            <div>
              <div className="font-mono text-4xl font-bold">{latest.battery_percent.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">{latest.battery_voltage.toFixed(2)} V</div>
              <div className="mt-2"><StatusBadge label={latest.charging ? "Charging (TP4056)" : "On battery"} tone={latest.charging ? "success" : "warning"} /></div>
            </div>
          </div>
          <div className="mt-4"><ProgressBar value={latest.battery_percent} /></div>
        </Panel>
        <Panel title="MT3608 Boost Output" className="flex flex-col items-center">
          <Gauge value={latest.boost_voltage} max={6} label="Output" unit="V" warn={5.3} danger={5.6} size={200} />
          <div className="mt-1"><StatusBadge label={Math.abs(latest.boost_voltage - 5) < 0.25 ? "Regulated" : "Out of range"} tone={Math.abs(latest.boost_voltage - 5) < 0.25 ? "success" : "destructive"} /></div>
        </Panel>
        <Panel title="ESP32 Memory" className="flex flex-col items-center">
          <Gauge value={usedPct} max={100} label="Heap used" unit="%" warn={70} danger={90} size={200} />
          <div className="mt-1 text-xs text-muted-foreground">{(latest.free_heap / 1024).toFixed(0)} KB free</div>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Uptime" value={fmtUptime(latest.uptime_s)} icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Wi-Fi RSSI" value={String(latest.rssi)} unit="dBm" icon={<Wifi className="h-4 w-4" />} sub={<StatusBadge {...sig} />} />
        <StatCard label="Free Heap" value={(latest.free_heap / 1024).toFixed(0)} unit="KB" icon={<Cpu className="h-4 w-4" />} />
        <StatCard label="Boost Rail" value={latest.boost_voltage.toFixed(2)} unit="V" icon={<Zap className="h-4 w-4" />} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Battery & Boost Voltage" tag="V">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="t" {...axis} minTickGap={40} /><YAxis {...axis} domain={["auto", "auto"]} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="v" name="Battery V" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="boost" name="Boost V" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Wi-Fi Signal & Heap" tag="RSSI · KB">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="t" {...axis} minTickGap={40} />
              <YAxis yAxisId="l" {...axis} /><YAxis yAxisId="r" orientation="right" {...axis} />
              <Tooltip {...chartTooltip} />
              <Area yAxisId="l" type="monotone" dataKey="rssi" name="RSSI dBm" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.15} />
              <Area yAxisId="r" type="monotone" dataKey="heap" name="Free heap KB" stroke="var(--chart-3)" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Plug className="h-3 w-3" /><Battery className="h-3 w-3" />Battery % is reported by the ESP32 from the ADC voltage divider.</p>
    </div>
  );
}
