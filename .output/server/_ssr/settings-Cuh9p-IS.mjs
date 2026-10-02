import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { c as useTelemetry, i as cn, t as SETTINGS_DOC } from "./utils-CunzFhYI.mjs";
import { n as PageHeader, r as Panel } from "./widgets-j8Pd3rZG.mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { f as Save } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./button-D0zsbyU0.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Cuh9p-IS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function SettingsPage() {
	const { settings, db } = useTelemetry();
	const [s, setS] = (0, import_react.useState)(settings);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setS(settings), [settings]);
	const set = (k, v) => setS((p) => ({
		...p,
		[k]: v
	}));
	async function save() {
		if (!db) {
			toast.error("Firestore not connected");
			return;
		}
		setSaving(true);
		try {
			const { doc, setDoc, serverTimestamp } = await import("../_libs/firebase.mjs").then((n) => n.t);
			await setDoc(doc(db, ...SETTINGS_DOC), {
				...s,
				updatedAt: serverTimestamp()
			}, { merge: true });
			toast.success("Settings saved — ESP32 will pick them up on next sync");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	}
	const numField = (k, label, unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
			label,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground",
				children: [
					"(",
					unit,
					")"
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			value: s[k],
			onChange: (e) => set(k, Number(e.target.value))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			code: "07 / CONFIG",
			title: "System Settings & Calibration",
			subtitle: "Changes are written to Firestore and read by the ESP32 firmware."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Sampling",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [numField("sample_interval_s", "Upload interval", "seconds"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-md border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Alarm buzzer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Sound buzzer when any threshold is exceeded"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: s.buzzer_enabled,
								onCheckedChange: (v) => set("buzzer_enabled", v)
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Alarm Thresholds",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							numField("mq2_threshold", "MQ-2", "ppm"),
							numField("mq7_threshold", "MQ-7", "ppm"),
							numField("pm25_threshold", "PM2.5", "µg/m³")
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Connectivity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Wi-Fi SSID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: s.wifi_ssid,
								onChange: (e) => set("wifi_ssid", e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "MQTT broker" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "mqtt://broker:1883",
								value: s.mqtt_broker,
								onChange: (e) => set("mqtt_broker", e.target.value)
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Firmware",
					tag: "ESP32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 font-mono text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Version"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: settings.firmware_version
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Settings doc"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: SETTINGS_DOC.join("/") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Readings collection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "sensor_readings" })]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				onClick: save,
				disabled: saving,
				className: "font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), saving ? "Saving…" : "Save to Firestore"]
			})
		})
	] });
}
//#endregion
export { SettingsPage as component };
