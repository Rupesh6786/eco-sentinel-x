import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useTelemetry, SETTINGS_DOC, type Settings } from "@/lib/telemetry";
import { PageHeader, Panel } from "@/components/eco/widgets";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/settings")({
  head: () => meta("Settings & Calibration", "Sampling frequency, alarm thresholds, Wi-Fi/MQTT config and firmware info for the ESP32 node."),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, db } = useTelemetry();
  const [s, setS] = useState<Settings>(settings);
  const [saving, setSaving] = useState(false);
  useEffect(() => setS(settings), [settings]);
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS((p) => ({ ...p, [k]: v }));

  async function save() {
    if (!db) { toast.error("Firestore not connected"); return; }
    setSaving(true);
    try {
      const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
      await setDoc(doc(db, ...SETTINGS_DOC), { ...s, updatedAt: serverTimestamp() }, { merge: true });
      toast.success("Settings saved — ESP32 will pick them up on next sync");
    } catch (e: any) { toast.error(e.message); } finally { setSaving(false); }
  }

  const numField = (k: keyof Settings, label: string, unit: string) => (
    <div className="space-y-1.5">
      <Label>{label} <span className="text-muted-foreground">({unit})</span></Label>
      <Input type="number" value={s[k] as number} onChange={(e) => set(k, Number(e.target.value) as never)} />
    </div>
  );

  return (
    <div>
      <PageHeader code="07 / CONFIG" title="System Settings & Calibration" subtitle="Changes are written to Firestore and read by the ESP32 firmware." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Sampling">
          <div className="space-y-4">
            {numField("sample_interval_s", "Upload interval", "seconds")}
            <div className="flex items-center justify-between rounded-md border p-3">
              <div><div className="text-sm font-medium">Alarm buzzer</div><div className="text-xs text-muted-foreground">Sound buzzer when any threshold is exceeded</div></div>
              <Switch checked={s.buzzer_enabled} onCheckedChange={(v) => set("buzzer_enabled", v)} />
            </div>
          </div>
        </Panel>
        <Panel title="Alarm Thresholds">
          <div className="grid gap-4 sm:grid-cols-3">
            {numField("mq2_threshold", "MQ-2", "ppm")}
            {numField("mq7_threshold", "MQ-7", "ppm")}
            {numField("pm25_threshold", "PM2.5", "µg/m³")}
          </div>
        </Panel>
        <Panel title="Connectivity">
          <div className="space-y-4">
            <div className="space-y-1.5"><Label>Wi-Fi SSID</Label><Input value={s.wifi_ssid} onChange={(e) => set("wifi_ssid", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>MQTT broker</Label><Input placeholder="mqtt://broker:1883" value={s.mqtt_broker} onChange={(e) => set("mqtt_broker", e.target.value)} /></div>
          </div>
        </Panel>
        <Panel title="Firmware" tag="ESP32">
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Version</span><span className="text-primary">{settings.firmware_version}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Settings doc</span><span>{SETTINGS_DOC.join("/")}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Readings collection</span><span>sensor_readings</span></div>
          </div>
        </Panel>
      </div>
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={save} disabled={saving} className="font-semibold"><Save className="h-4 w-4" />{saving ? "Saving…" : "Save to Firestore"}</Button>
      </div>
    </div>
  );
}
