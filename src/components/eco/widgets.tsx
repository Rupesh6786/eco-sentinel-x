import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({ code, title, subtitle }: { code: string; title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <span className="font-mono text-xs tracking-[0.25em] text-primary">{code}</span>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function Panel({ title, tag, children, className }: { title: string; tag?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("panel p-4", className)}>
      <header className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
        {tag && <span className="rounded bg-accent px-2 py-0.5 font-mono text-[10px] text-accent-foreground">{tag}</span>}
      </header>
      {children}
    </section>
  );
}

const toneCls = {
  success: "bg-success/15 text-success border-success/40",
  warning: "bg-warning/15 text-warning border-warning/40",
  destructive: "bg-destructive/15 text-destructive border-destructive/40",
};
export type Tone = keyof typeof toneCls;

export function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", toneCls[tone])}>{label}</span>;
}

export function StatCard({ label, value, unit, sub, icon, accent }: { label: string; value: string; unit?: string; sub?: ReactNode; icon?: ReactNode; accent?: boolean }) {
  return (
    <div className={cn("panel relative overflow-hidden p-4", accent && "glow")}>
      {accent && <div className="absolute inset-x-0 top-0 h-1 bg-primary" />}
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary">{icon}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-mono text-3xl font-bold">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {sub && <div className="mt-2 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

export function Gauge({ value, max, label, unit, warn, danger, size = 180 }: { value: number; max: number; label: string; unit: string; warn: number; danger: number; size?: number }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = 70, c = Math.PI * r;
  const color = value >= danger ? "var(--destructive)" : value >= warn ? "var(--warning)" : "var(--primary)";
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 110" width={size} height={size * 0.61}>
        <path d="M20 95 A70 70 0 0 1 160 95" fill="none" stroke="var(--muted)" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 95 A70 70 0 0 1 160 95" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ transition: "stroke-dashoffset .8s ease, stroke .4s" }} />
        <text x="90" y="82" textAnchor="middle" fill="var(--foreground)" fontSize="26" fontWeight="700" fontFamily="JetBrains Mono">{value.toFixed(value < 10 ? 1 : 0)}</text>
        <text x="90" y="102" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">{unit}</text>
      </svg>
      <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

export function ProgressBar({ value, max = 100, tone = "primary" }: { value: number; max?: number; tone?: "primary" | Tone }) {
  const bg = { primary: "bg-primary", success: "bg-success", warning: "bg-warning", destructive: "bg-destructive" }[tone];
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all duration-700", bg)} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  );
}

export const chartTooltip = {
  contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "var(--primary)" },
};
export const axis = { stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false } as const;
