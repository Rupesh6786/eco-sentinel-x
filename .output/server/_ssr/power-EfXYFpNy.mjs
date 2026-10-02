import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as useTelemetry, o as fmtTime, s as fmtUptime } from "./utils-CunzFhYI.mjs";
import { a as StatCard, c as chartTooltip, i as ProgressBar, n as PageHeader, o as StatusBadge, r as Panel, s as axis, t as Gauge } from "./widgets-j8Pd3rZG.mjs";
import { a as XAxis, c as Line, f as Tooltip, i as YAxis, l as CartesianGrid, m as ResponsiveContainer, r as LineChart, s as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { C as Battery, S as Clock, i as Wifi, m as Plug, t as Zap, x as Cpu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/power-EfXYFpNy.js
var import_jsx_runtime = require_jsx_runtime();
var HEAP_TOTAL = 327680;
function Power() {
	const { readings, latest } = useTelemetry();
	if (!latest) return null;
	const data = readings.slice(-120).map((r) => ({
		t: fmtTime(r.ts),
		v: +r.battery_voltage.toFixed(2),
		boost: +r.boost_voltage.toFixed(2),
		rssi: r.rssi,
		heap: +(r.free_heap / 1024).toFixed(1)
	}));
	const sig = latest.rssi > -60 ? {
		label: "Excellent",
		tone: "success"
	} : latest.rssi > -75 ? {
		label: "Fair",
		tone: "warning"
	} : {
		label: "Weak",
		tone: "destructive"
	};
	const usedPct = 100 - latest.free_heap / HEAP_TOTAL * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			code: "05 / TELEMETRY",
			title: "Power & System",
			subtitle: "ESP32 · TP4056 charger · MT3608 boost converter health."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Battery",
					tag: "Li-ion 1S",
					className: "glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-28 w-14 rounded-md border-2 border-primary p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-2 left-1/2 h-2 w-5 -translate-x-1/2 rounded-t bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-1 bottom-1 rounded-sm bg-primary transition-all duration-700",
								style: { height: `calc(${latest.battery_percent}% - 8px)` }
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-4xl font-bold",
								children: [latest.battery_percent.toFixed(0), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground",
								children: [latest.battery_voltage.toFixed(2), " V"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
									label: latest.charging ? "Charging (TP4056)" : "On battery",
									tone: latest.charging ? "success" : "warning"
								})
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, { value: latest.battery_percent })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "MT3608 Boost Output",
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
						value: latest.boost_voltage,
						max: 6,
						label: "Output",
						unit: "V",
						warn: 5.3,
						danger: 5.6,
						size: 200
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
							label: Math.abs(latest.boost_voltage - 5) < .25 ? "Regulated" : "Out of range",
							tone: Math.abs(latest.boost_voltage - 5) < .25 ? "success" : "destructive"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "ESP32 Memory",
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
						value: usedPct,
						max: 100,
						label: "Heap used",
						unit: "%",
						warn: 70,
						danger: 90,
						size: 200
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [(latest.free_heap / 1024).toFixed(0), " KB free"]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Uptime",
					value: fmtUptime(latest.uptime_s),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Wi-Fi RSSI",
					value: String(latest.rssi),
					unit: "dBm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-4 w-4" }),
					sub: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ...sig })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Free Heap",
					value: (latest.free_heap / 1024).toFixed(0),
					unit: "KB",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Boost Rail",
					value: latest.boost_voltage.toFixed(2),
					unit: "V",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Battery & Boost Voltage",
				tag: "V",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								...axis,
								minTickGap: 40
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								...axis,
								domain: ["auto", "auto"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "v",
								name: "Battery V",
								stroke: "var(--chart-1)",
								strokeWidth: 2,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "boost",
								name: "Boost V",
								stroke: "var(--chart-2)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Wi-Fi Signal & Heap",
				tag: "RSSI · KB",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								...axis,
								minTickGap: 40
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								yAxisId: "l",
								...axis
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								yAxisId: "r",
								orientation: "right",
								...axis
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								yAxisId: "l",
								type: "monotone",
								dataKey: "rssi",
								name: "RSSI dBm",
								stroke: "var(--chart-1)",
								fill: "var(--chart-1)",
								fillOpacity: .15
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								yAxisId: "r",
								type: "monotone",
								dataKey: "heap",
								name: "Free heap KB",
								stroke: "var(--chart-3)",
								fill: "none"
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "h-3 w-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "h-3 w-3" }),
				"Battery % is reported by the ESP32 from the ADC voltage divider."
			]
		})
	] });
}
//#endregion
export { Power as component };
