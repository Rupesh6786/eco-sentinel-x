import { i as __toESM } from "../_runtime.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CLFBbFN6.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-CunzFhYI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getFirebaseConfig = createServerFn({ method: "GET" }).handler(createSsrRpc("9cc6bf9eb674cf9080df7d4d3d3071d8080d8571164a79b90da7a6282380595e"));
var READINGS_COLLECTION = "sensor_readings";
var SETTINGS_DOC = ["device_settings", "esp32_node_01"];
var defaultSettings = {
	sample_interval_s: 10,
	buzzer_enabled: true,
	mq2_threshold: 300,
	mq7_threshold: 50,
	pm25_threshold: 60,
	wifi_ssid: "",
	mqtt_broker: "",
	firmware_version: "1.0.0"
};
var TelemetryContext = (0, import_react.createContext)(null);
var num = (v, d = 0) => typeof v === "number" && !Number.isNaN(v) ? v : typeof v === "string" && v !== "" && !Number.isNaN(+v) ? +v : d;
function toMs(v) {
	if (!v) return Date.now();
	if (typeof v === "number") return v < 0xe8d4a51000 ? v * 1e3 : v;
	if (typeof v === "string") return new Date(v).getTime();
	if (typeof v.toMillis === "function") return v.toMillis();
	if (typeof v.seconds === "number") return v.seconds * 1e3;
	return Date.now();
}
function computeAqi(pm25) {
	for (const [cl, ch, il, ih] of [
		[
			0,
			12,
			0,
			50
		],
		[
			12.1,
			35.4,
			51,
			100
		],
		[
			35.5,
			55.4,
			101,
			150
		],
		[
			55.5,
			150.4,
			151,
			200
		],
		[
			150.5,
			250.4,
			201,
			300
		],
		[
			250.5,
			500,
			301,
			500
		]
	]) if (pm25 <= ch) return Math.round((ih - il) / (ch - cl) * (pm25 - cl) + il);
	return 500;
}
function normalize(id, d) {
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
		aqi: num(d.aqi, computeAqi(pm25))
	};
}
function demoData() {
	const now = Date.now();
	const out = [];
	for (let i = 119; i >= 0; i--) {
		const t = now - i * 6e4;
		const w = Math.sin(i / 9);
		const spike = i % 37 < 3 ? 40 : 0;
		const pm25 = Math.max(4, 28 + w * 14 + spike + Math.random() * 6);
		out.push({
			id: `demo-${i}`,
			ts: t,
			deviceId: "esp32_node_01",
			mq2_ppm: 180 + w * 60 + Math.random() * 30 + spike * 3,
			mq7_ppm: 18 + w * 8 + Math.random() * 4 + spike / 3,
			pm25,
			pm10: pm25 * 1.6 + Math.random() * 8,
			dust_density: pm25 / 1e3 + .02,
			temperature: 29 + Math.cos(i / 20) * 3 + Math.random(),
			humidity: 58 + Math.sin(i / 15) * 10 + Math.random() * 2,
			battery_voltage: 3.7 + (120 - i) * .003,
			battery_percent: Math.min(100, 62 + (120 - i) * .25),
			boost_voltage: 5.02 + Math.random() * .05,
			charging: true,
			rssi: -58 - Math.round(Math.random() * 12),
			free_heap: 182e3 - Math.round(Math.random() * 15e3),
			uptime_s: (240 - i) * 60,
			aqi: computeAqi(pm25)
		});
	}
	return out;
}
function TelemetryProvider({ children }) {
	const [readings, setReadings] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("connecting");
	const [error, setError] = (0, import_react.useState)(null);
	const [db, setDb] = (0, import_react.useState)(null);
	const [settings, setSettings] = (0, import_react.useState)(defaultSettings);
	(0, import_react.useEffect)(() => {
		let unsubs = [];
		let cancelled = false;
		(async () => {
			try {
				const cfg = await getFirebaseConfig();
				if (!cfg.apiKey) throw new Error("Firebase API key missing");
				const { initializeApp, getApps } = await import("../_libs/firebase.mjs").then((n) => n.n);
				const fs = await import("../_libs/firebase.mjs").then((n) => n.t);
				const app = getApps()[0] ?? initializeApp(cfg);
				const firestore = fs.getFirestore(app);
				if (cancelled) return;
				setDb(firestore);
				const q = fs.query(fs.collection(firestore, READINGS_COLLECTION), fs.orderBy("timestamp", "desc"), fs.limit(500));
				unsubs.push(fs.onSnapshot(q, (snap) => {
					if (snap.empty) {
						setReadings(demoData());
						setStatus("demo");
						return;
					}
					const rows = snap.docs.map((d) => normalize(d.id, d.data())).sort((a, b) => a.ts - b.ts);
					setReadings(rows);
					setStatus("live");
					setError(null);
				}, (e) => {
					setError(e.message);
					setReadings(demoData());
					setStatus("error");
				}));
				unsubs.push(fs.onSnapshot(fs.doc(firestore, ...SETTINGS_DOC), (s) => {
					if (s.exists()) setSettings({
						...defaultSettings,
						...s.data()
					});
				}, () => {}));
			} catch (e) {
				setError(e?.message ?? String(e));
				setReadings(demoData());
				setStatus("error");
			}
		})();
		return () => {
			cancelled = true;
			unsubs.forEach((u) => u());
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		readings,
		latest: readings.at(-1) ?? null,
		status,
		error,
		db,
		settings
	}), [
		readings,
		status,
		error,
		db,
		settings
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelemetryContext.Provider, {
		value,
		children
	});
}
function useTelemetry() {
	const c = (0, import_react.useContext)(TelemetryContext);
	if (!c) throw new Error("useTelemetry outside provider");
	return c;
}
function classify(value, warn, danger) {
	if (value >= danger) return {
		label: "Hazardous",
		tone: "destructive"
	};
	if (value >= warn) return {
		label: "Moderate",
		tone: "warning"
	};
	return {
		label: "Good",
		tone: "success"
	};
}
var fmtTime = (ts) => new Date(ts).toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit"
});
var fmtDateTime = (ts) => new Date(ts).toLocaleString();
var fmtUptime = (s) => `${Math.floor(s / 86400)}d ${Math.floor(s % 86400 / 3600)}h ${Math.floor(s % 3600 / 60)}m`;
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { fmtDateTime as a, useTelemetry as c, cn as i, TelemetryProvider as n, fmtTime as o, classify as r, fmtUptime as s, SETTINGS_DOC as t };
