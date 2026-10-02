import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getFirebaseConfig } from "./firebase-config.functions";
import type { Firestore } from "firebase/firestore";

export const READINGS_COLLECTION = "sensor_readings";
export const SETTINGS_DOC = ["device_settings", "esp32_node_01"] as const;

export type Reading = {
  id: string;
  ts: number;
  deviceId: string;
  mq2_ppm: number;
  mq7_ppm: number;
  pm25: number;
  pm10: number;
  dust_density: number;
  temperature: number;
  humidity: number;
  battery_voltage: number;
  battery_percent: number;
  boost_voltage: number;
  charging: boolean;
  rssi: number;
  free_heap: number;
  uptime_s: number;
  aqi: number;
};

export type Settings = {
  sample_interval_s: number;
  buzzer_enabled: boolean;
  mq2_threshold: number;
  mq7_threshold: number;
  pm25_threshold: number;
  wifi_ssid: string;
  mqtt_broker: string;
  firmware_version: string;
};

export const defaultSettings: Settings = {
  sample_interval_s: 10,
  buzzer_enabled: true,
  mq2_threshold: 300,
  mq7_threshold: 50,
  pm25_threshold: 60,
  wifi_ssid: "",
  mqtt_broker: "",
  firmware_version: "1.0.0",
};

type Status = "connecting" | "live" | "demo" | "error";
type Ctx = {
  readings: Reading[]; // oldest -> newest
  latest: Reading | null;
  status: Status;
  error: string | null;
  db: Firestore | null;
  settings: Settings;
};

const TelemetryContext = createContext<Ctx | null>(null);

const num = (v: unknown, d = 0) => (typeof v === "number" && !Number.isNaN(v) ? v : typeof v === "string" && v !== "" && !Number.isNaN(+v) ? +v : d);

function toMs(v: any): number {
  if (!v) return Date.now();
  if (typeof v === "number") return v < 1e12 ? v * 1000 : v;
  if (typeof v === "string") return new Date(v).getTime();
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v.seconds === "number") return v.seconds * 1000;
  return Date.now();
}

export function computeAqi(pm25: number) {
  const bp: [number, number, number, number][] = [
    [0, 12, 0, 50], [12.1, 35.4, 51, 100], [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200], [150.5, 250.4, 201, 300], [250.5, 500, 301, 500],
  ];
  for (const [cl, ch, il, ih] of bp) if (pm25 <= ch) return Math.round(((ih - il) / (ch - cl)) * (pm25 - cl) + il);
  return 500;
}

function normalize(id: string, d: any): Reading {
  const pm25 = num(d.pm25 ?? d.particulate?.pm25);
  return {
    id,
    ts: toMs(d.timestamp ?? d.ts ?? d.createdAt),
    deviceId: d.deviceId ?? "esp32",
    mq2_ppm: num(d.mq2_ppm ?? d.gas?.mq2_ppm),
    mq7_ppm: num(d.mq7_ppm ?? d.gas?.mq7_ppm),
    pm25,
    pm10: num(d.pm10 ?? d.particulate?.pm10),
    dust_density: num(d.dust_density ?? d.particulate?.dust_density),
    temperature: num(d.temperature ?? d.environment?.temperature),
    humidity: num(d.humidity ?? d.environment?.humidity),
    battery_voltage: num(d.battery_voltage ?? d.power?.battery_voltage),
    battery_percent: num(d.battery_percent ?? d.power?.battery_percent),
    boost_voltage: num(d.boost_voltage ?? d.power?.boost_voltage),
    charging: Boolean(d.charging ?? d.power?.charging),
    rssi: num(d.rssi ?? d.system?.rssi, -100),
    free_heap: num(d.free_heap ?? d.system?.free_heap),
    uptime_s: num(d.uptime_s ?? d.system?.uptime_s),
    aqi: num(d.aqi, computeAqi(pm25)),
  };
}

function demoData(): Reading[] {
  const now = Date.now();
  const out: Reading[] = [];
  for (let i = 119; i >= 0; i--) {
    const t = now - i * 60_000;
    const w = Math.sin(i / 9);
    const spike = i % 37 < 3 ? 40 : 0;
    const pm25 = Math.max(4, 28 + w * 14 + spike + Math.random() * 6);
    out.push({
      id: `demo-${i}`, ts: t, deviceId: "esp32_node_01",
      mq2_ppm: 180 + w * 60 + Math.random() * 30 + spike * 3,
      mq7_ppm: 18 + w * 8 + Math.random() * 4 + spike / 3,
      pm25, pm10: pm25 * 1.6 + Math.random() * 8,
      dust_density: pm25 / 1000 + 0.02,
      temperature: 29 + Math.cos(i / 20) * 3 + Math.random(),
      humidity: 58 + Math.sin(i / 15) * 10 + Math.random() * 2,
      battery_voltage: 3.7 + (120 - i) * 0.003, battery_percent: Math.min(100, 62 + (120 - i) * 0.25),
      boost_voltage: 5.02 + Math.random() * 0.05, charging: true,
      rssi: -58 - Math.round(Math.random() * 12), free_heap: 182000 - Math.round(Math.random() * 15000),
      uptime_s: (240 - i) * 60, aqi: computeAqi(pm25),
    });
  }
  return out;
}

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [status, setStatus] = useState<Status>("connecting");
  const [error, setError] = useState<string | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    let unsubs: (() => void)[] = [];
    let cancelled = false;
    (async () => {
      try {
        const cfg = await getFirebaseConfig();
        if (!cfg.apiKey) throw new Error("Firebase API key missing");
        const { initializeApp, getApps } = await import("firebase/app");
        const fs = await import("firebase/firestore");
        const app = getApps()[0] ?? initializeApp(cfg);
        const firestore = fs.getFirestore(app);
        if (cancelled) return;
        setDb(firestore);
        const q = fs.query(fs.collection(firestore, READINGS_COLLECTION), fs.orderBy("timestamp", "desc"), fs.limit(500));
        unsubs.push(
          fs.onSnapshot(q, (snap) => {
            if (snap.empty) { setReadings(demoData()); setStatus("demo"); return; }
            const rows = snap.docs.map((d) => normalize(d.id, d.data())).sort((a, b) => a.ts - b.ts);
            setReadings(rows); setStatus("live"); setError(null);
          }, (e) => { setError(e.message); setReadings(demoData()); setStatus("error"); }),
        );
        unsubs.push(
          fs.onSnapshot(fs.doc(firestore, ...SETTINGS_DOC), (s) => {
            if (s.exists()) setSettings({ ...defaultSettings, ...(s.data() as Partial<Settings>) });
          }, () => {}),
        );
      } catch (e: any) {
        setError(e?.message ?? String(e)); setReadings(demoData()); setStatus("error");
      }
    })();
    return () => { cancelled = true; unsubs.forEach((u) => u()); };
  }, []);

  const value = useMemo<Ctx>(() => ({ readings, latest: readings.at(-1) ?? null, status, error, db, settings }), [readings, status, error, db, settings]);
  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
}

export function useTelemetry() {
  const c = useContext(TelemetryContext);
  if (!c) throw new Error("useTelemetry outside provider");
  return c;
}

export function classify(value: number, warn: number, danger: number) {
  if (value >= danger) return { label: "Hazardous", tone: "destructive" as const };
  if (value >= warn) return { label: "Moderate", tone: "warning" as const };
  return { label: "Good", tone: "success" as const };
}

export const fmtTime = (ts: number) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
export const fmtDateTime = (ts: number) => new Date(ts).toLocaleString();
export const fmtUptime = (s: number) => `${Math.floor(s / 86400)}d ${Math.floor((s % 86400) / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
