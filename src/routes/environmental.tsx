import { createFileRoute } from "@tanstack/react-router";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Thermometer, Droplets, Sun } from "lucide-react";
import { useTelemetry, fmtTime } from "@/lib/telemetry";
import { PageHeader, Panel, StatCard, Gauge, chartTooltip, axis } from "@/components/eco/widgets";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/environmental")({
  head: () => meta("Environmental Metrics", "DHT11 temperature and humidity correlated against gas concentrations."),
  component: Environmental,
});

function Environmental() {
  const { readings, latest } = useTelemetry();
  if (!latest) return null;
  const data = readings.slice(-120).map((r) => ({ t: fmtTime(r.ts), temp: +r.temperature.toFixed(1), hum: +r.humidity.toFixed(1), mq2: +r.mq2_ppm.toFixed(0) }));
  const temps = readings.map((r) => r.temperature);
  // Heat index (simplified Steadman)
  const hi = latest.temperature + 0.5555 * (6.11 * Math.exp(5417.753 * (1 / 273.16 - 1 / (273.15 + latest.temperature - ((100 - latest.humidity) / 5)))) - 10);

  return (
    <div>
      <PageHeader code="04 / DHT11" title="Environmental Metrics" subtitle="Meteorological readouts and correlation with gas concentration shifts." />
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Temperature" className="flex flex-col items-center"><Gauge value={latest.temperature} max={60} label="Ambient" unit="°C" warn={35} danger={45} size={220} /></Panel>
        <Panel title="Relative Humidity" className="flex flex-col items-center"><Gauge value={latest.humidity} max={100} label="RH" unit="%" warn={75} danger={90} size={220} /></Panel>
        <div className="grid gap-4">
          <StatCard accent label="Feels Like" value={hi.toFixed(1)} unit="°C" icon={<Sun className="h-4 w-4" />} />
          <StatCard label="Min / Max Temp" value={`${Math.min(...temps).toFixed(0)} / ${Math.max(...temps).toFixed(0)}`} unit="°C" icon={<Thermometer className="h-4 w-4" />} />
          <StatCard label="Comfort" value={latest.humidity > 70 ? "Humid" : latest.humidity < 30 ? "Dry" : "Optimal"} icon={<Droplets className="h-4 w-4" />} />
        </div>
      </div>
      <Panel title="Temperature & Humidity" tag="DUAL AXIS" className="mt-4">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="t" {...axis} minTickGap={40} />
            <YAxis yAxisId="l" {...axis} /><YAxis yAxisId="r" orientation="right" {...axis} />
            <Tooltip {...chartTooltip} /><Legend wrapperStyle={{ fontSize: 12 }} />
            <Line yAxisId="l" type="monotone" dataKey="temp" name="Temp °C" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
            <Line yAxisId="r" type="monotone" dataKey="hum" name="Humidity %" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Humidity vs Gas Correlation" tag="MQ-2 OVERLAY" className="mt-4">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="t" {...axis} minTickGap={40} />
            <YAxis yAxisId="l" {...axis} /><YAxis yAxisId="r" orientation="right" {...axis} />
            <Tooltip {...chartTooltip} /><Legend wrapperStyle={{ fontSize: 12 }} />
            <Line yAxisId="l" type="monotone" dataKey="hum" name="Humidity %" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
            <Line yAxisId="r" type="monotone" dataKey="mq2" name="MQ-2 ppm" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
