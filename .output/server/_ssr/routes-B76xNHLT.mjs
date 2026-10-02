import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as useTelemetry, o as fmtTime, r as classify, s as fmtUptime } from "./utils-CunzFhYI.mjs";
import { a as StatCard, c as chartTooltip, i as ProgressBar, n as PageHeader, o as StatusBadge, r as Panel, s as axis, t as Gauge } from "./widgets-j8Pd3rZG.mjs";
import { a as XAxis, c as Line, f as Tooltip, i as YAxis, l as CartesianGrid, m as ResponsiveContainer, r as LineChart, s as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { C as Battery, _ as Flame, a as TriangleAlert, c as Sparkles, i as Wifi, l as ShieldCheck, o as Thermometer, r as Wind, x as Cpu, y as Droplets } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B76xNHLT.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { readings, latest, settings } = useTelemetry();
	if (!latest) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-muted-foreground",
		children: "Waiting for telemetry…"
	});
	const data = readings.slice(-60).map((r) => ({
		t: fmtTime(r.ts),
		...r
	}));
	const aqiC = classify(latest.aqi, 100, 150);
	const alerts = [
		latest.mq2_ppm >= settings.mq2_threshold && `Smoke/LPG ${latest.mq2_ppm.toFixed(0)} ppm exceeds limit`,
		latest.mq7_ppm >= settings.mq7_threshold && `CO ${latest.mq7_ppm.toFixed(0)} ppm exceeds limit`,
		latest.pm25 >= settings.pm25_threshold && `PM2.5 ${latest.pm25.toFixed(0)} µg/m³ exceeds limit`,
		latest.battery_percent < 20 && "Battery low"
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			code: "01 / OVERVIEW",
			title: "Command Center",
			subtitle: "Every sensor at a glance, streaming from Firestore in real time."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `panel mb-6 flex items-center gap-3 p-4 ${alerts.length ? "border-destructive/50" : "border-success/40"}`,
			children: [alerts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: alerts.length ? "Attention required" : "All systems nominal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-muted-foreground",
					children: alerts.length ? alerts.join(" · ") : `Uptime ${fmtUptime(latest.uptime_s)} · RSSI ${latest.rssi} dBm`
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Overall AQI",
					tag: "PM2.5 DERIVED",
					className: "glow flex flex-col items-center lg:row-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
							value: latest.aqi,
							max: 300,
							label: "Air Quality Index",
							unit: "AQI",
							warn: 100,
							danger: 150,
							size: 220
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ...aqiC })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid w-full grid-cols-2 gap-3 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
								value: latest.mq2_ppm,
								max: 1e3,
								label: "MQ-2",
								unit: "ppm",
								warn: settings.mq2_threshold * .7,
								danger: settings.mq2_threshold,
								size: 120
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
								value: latest.mq7_ppm,
								max: 200,
								label: "MQ-7 CO",
								unit: "ppm",
								warn: settings.mq7_threshold * .7,
								danger: settings.mq7_threshold,
								size: 120
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					accent: true,
					label: "Smoke / LPG",
					value: latest.mq2_ppm.toFixed(0),
					unit: "ppm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
					sub: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/air-quality",
						className: "text-primary",
						children: "MQ-2 details →"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Carbon Monoxide",
					value: latest.mq7_ppm.toFixed(1),
					unit: "ppm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-4 w-4" }),
					sub: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/air-quality",
						className: "text-primary",
						children: "MQ-7 details →"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "PM2.5 / PM10",
					value: `${latest.pm25.toFixed(0)}/${latest.pm10.toFixed(0)}`,
					unit: "µg/m³",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }),
					sub: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/particulate",
						className: "text-primary",
						children: "Particulates →"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Temperature",
					value: latest.temperature.toFixed(1),
					unit: "°C",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-4 w-4" }),
					sub: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/environmental",
						className: "text-primary",
						children: "DHT11 →"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Humidity",
					value: latest.humidity.toFixed(0),
					unit: "%",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Battery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "h-4 w-4 text-primary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 font-mono text-3xl font-bold",
							children: [latest.battery_percent.toFixed(0), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "%"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
								value: latest.battery_percent,
								tone: latest.battery_percent < 20 ? "destructive" : "primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [latest.battery_voltage.toFixed(2), " V"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-3 w-3" }),
										latest.rssi,
										" dBm"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3 w-3" }),
										(latest.free_heap / 1024).toFixed(0),
										" KB"
									]
								})
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Gas Trends",
				tag: "LIVE · 60 SAMPLES",
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
								minTickGap: 30
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "mq2_ppm",
								name: "MQ-2 ppm",
								stroke: "var(--chart-1)",
								strokeWidth: 2,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "mq7_ppm",
								name: "MQ-7 ppm",
								stroke: "var(--chart-3)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Particulate Trend",
				tag: "PM2.5 · PM10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "g1",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--chart-1)",
									stopOpacity: .5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "var(--chart-1)",
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								...axis,
								minTickGap: 30
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "pm10",
								name: "PM10",
								stroke: "var(--chart-2)",
								fill: "none",
								strokeWidth: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "pm25",
								name: "PM2.5",
								stroke: "var(--chart-1)",
								fill: "url(#g1)",
								strokeWidth: 2
							})
						]
					})
				})
			})]
		})
	] });
}
//#endregion
export { Dashboard as component };
