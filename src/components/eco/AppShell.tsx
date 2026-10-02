import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LayoutDashboard, Wind, Sparkles, Thermometer, BatteryCharging, Database, Settings, Menu, X, Radio } from "lucide-react";
import { useTelemetry, fmtDateTime } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/air-quality", label: "Air Quality", icon: Wind },
  { to: "/particulate", label: "Particulate Matter", icon: Sparkles },
  { to: "/environmental", label: "Environmental", icon: Thermometer },
  { to: "/power", label: "Power & System", icon: BatteryCharging },
  { to: "/logs", label: "Data Logs", icon: Database },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { status, latest, error } = useTelemetry();
  const statusMap = {
    connecting: ["Connecting…", "bg-warning"],
    live: ["Firestore Live", "bg-success"],
    demo: ["No data", "bg-warning"],
    error: ["Offline", "bg-destructive"],
  } as const;
  const [sLabel, sDot] = statusMap[status];

  return (
    <div className="flex min-h-screen w-full">
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="hazard-stripe h-1.5" />
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground"><Radio className="h-5 w-5" /></div>
          <div>
            <div className="text-lg font-bold leading-none tracking-tight">Eco-Sentinal<span className="text-primary">-X</span></div>
            <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">IOT AIR MONITOR</div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <div className="mx-4 mb-4 flex items-center gap-2 rounded-md border border-sidebar-border px-3 py-2 text-xs">
          <span className={cn("h-2 w-2 animate-pulse rounded-full", sDot)} />
          <span>{sLabel}</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "!border-primary bg-sidebar-accent !text-sidebar-accent-foreground font-semibold" }}>
              <n.icon className="h-4 w-4" />{n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4 font-mono text-[10px] text-muted-foreground">
          LAST PACKET<br /><span className="text-sidebar-foreground">{latest ? fmtDateTime(latest.ts) : "—"}</span>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-background/70 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <span className="font-mono text-xs text-muted-foreground">NODE: <span className="text-primary">{latest?.deviceId ?? "—"}</span></span>
          {error && <span className="ml-auto truncate text-xs text-destructive" title={error}>Firestore: {error}</span>}
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
