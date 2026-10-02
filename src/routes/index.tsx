import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Wind, Flame, Sparkles, Thermometer, Droplets, Battery, Wifi, Cpu, ShieldCheck, AlertTriangle } from "lucide-react";
import { useTelemetry, classify, fmtTime, fmtUptime } from "@/lib/telemetry";
import { PageHeader, Panel, StatCard, Gauge, StatusBadge, ProgressBar, chartTooltip, axis } from "@/components/eco/widgets";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("Command Center", "Live overview of every ESP32 sensor: AQI, gases, particulates, climate and power."),
  component: Dashboard,
});

function Dashboard() {
  const { readings, latest, settings } = useTelemetry();
  if (!latest) return <div className="p-10 text-muted-foreground">Waiting for telemetry…</div>;
  const data = readings.slice(-60).map((r) => ({ t: fmtTime(r.ts), ...r }));
  const aqiC = classify(latest.aqi, 100, 150);
  const alerts = [
    latest.mq2_ppm >= settings.mq2_threshold && `Smoke/LPG ${latest.mq2_ppm.toFixed(0)} ppm exceeds limit`,
    latest.mq7_ppm >= settings.mq7_threshold && `CO ${latest.mq7_ppm.toFixed(0)} ppm exceeds limit`,
    latest.pm25 >= settings.pm25_threshold && `PM2.5 ${latest.pm25.toFixed(0)} µg/m³ exceeds limit`,
    latest.battery_percent < 20 && "Battery low",
  ].filter(Boolean) as string[];

  return (
    <div>
      <PageHeader code="01 / OVERVIEW" title="Command Center" subtitle="Every sensor at a glance, streaming from Firestore in real time." />

      <div className={`panel mb-6 flex items-center gap-3 p-4 ${alerts.length ? "border-destructive/50" : "border-success/40"}`}>
        {alerts.length ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <ShieldCheck className="h-5 w-5 text-success" />}
        <div className="text-sm">
          <span className="font-semibold">{alerts.length ? "Attention required" : "All systems nominal"}</span>
          <span className="ml-2 text-muted-foreground">{alerts.length ? alerts.join(" · ") : `Uptime ${fmtUptime(latest.uptime_s)} · RSSI ${latest.rssi} dBm`}</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Panel title="Overall AQI" tag="PM2.5 DERIVED" className="glow flex flex-col items-center lg:row-span-2">
          <Gauge value={latest.aqi} max={300} label="Air Quality Index" unit="AQI" warn={100} danger={150} size={220} />
          <div className="mt-3"><StatusBadge {...aqiC} /></div>
          <div className="mt-6 grid w-full grid-cols-2 gap-3 text-center">
            <Gauge value={latest.mq2_ppm} max={1000} label="MQ-2" unit="ppm" warn={settings.mq2_threshold * 0.7} danger={settings.mq2_threshold} size={120} />
            <Gauge value={latest.mq7_ppm} max={200} label="MQ-7 CO" unit="ppm" warn={settings.mq7_threshold * 0.7} danger={settings.mq7_threshold} size={120} />
          </div>
        </Panel>
        <StatCard accent label="Smoke / LPG" value={latest.mq2_ppm.toFixed(0)} unit="ppm" icon={<Flame className="h-4 w-4" />} sub={<Link to="/air-quality" className="text-primary">MQ-2 details →</Link>} />
        <StatCard label="Carbon Monoxide" value={latest.mq7_ppm.toFixed(1)} unit="ppm" icon={<Wind className="h-4 w-4" />} sub={<Link to="/air-quality" className="text-primary">MQ-7 details →</Link>} />
        <StatCard label="PM2.5 / PM10" value={`${latest.pm25.toFixed(0)}/${latest.pm10.toFixed(0)}`} unit="µg/m³" icon={<Sparkles className="h-4 w-4" />} sub={<Link to="/particulate" className="text-primary">Particulates →</Link>} />
        <StatCard label="Temperature" value={latest.temperature.toFixed(1)} unit="°C" icon={<Thermometer className="h-4 w-4" />} sub={<Link to="/environmental" className="text-primary">DHT11 →</Link>} />
        <StatCard label="Humidity" value={latest.humidity.toFixed(0)} unit="%" icon={<Droplets className="h-4 w-4" />} />
        <div className="panel p-4">
          <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground"><span>Battery</span><Battery className="h-4 w-4 text-primary" /></div>
          <div className="mt-2 font-mono text-3xl font-bold">{latest.battery_percent.toFixed(0)}<span className="text-sm text-muted-foreground">%</span></div>
          <div className="mt-2"><ProgressBar value={latest.battery_percent} tone={latest.battery_percent < 20 ? "destructive" : "primary"} /></div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{latest.battery_voltage.toFixed(2)} V</span><span className="flex items-center gap-1"><Wifi className="h-3 w-3" />{latest.rssi} dBm</span><span className="flex items-center gap-1"><Cpu className="h-3 w-3" />{(latest.free_heap / 1024).toFixed(0)} KB</span></div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Gas Trends" tag="LIVE · 60 SAMPLES">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="t" {...axis} minTickGap={30} /><YAxis {...axis} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="mq2_ppm" name="MQ-2 ppm" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="mq7_ppm" name="MQ-7 ppm" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Particulate Trend" tag="PM2.5 · PM10">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="t" {...axis} minTickGap={30} /><YAxis {...axis} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="pm10" name="PM10" stroke="var(--chart-2)" fill="none" strokeWidth={2} />
              <Area type="monotone" dataKey="pm25" name="PM2.5" stroke="var(--chart-1)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  );
}
