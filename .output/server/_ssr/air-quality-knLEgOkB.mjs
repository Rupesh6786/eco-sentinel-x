import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as useTelemetry, o as fmtTime, r as classify } from "./utils-CunzFhYI.mjs";
import { a as StatCard, c as chartTooltip, n as PageHeader, o as StatusBadge, r as Panel, s as axis, t as Gauge } from "./widgets-j8Pd3rZG.mjs";
import { a as XAxis, c as Line, d as Cell, f as Tooltip, i as YAxis, l as CartesianGrid, m as ResponsiveContainer, n as BarChart, o as Bar, r as LineChart, u as ReferenceLine } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/air-quality-knLEgOkB.js
var import_jsx_runtime = require_jsx_runtime();
function AirQuality() {
	const { readings, latest, settings } = useTelemetry();
	if (!latest) return null;
	const data = readings.slice(-120).map((r) => ({
		t: fmtTime(r.ts),
		mq2: +r.mq2_ppm.toFixed(1),
		mq7: +r.mq7_ppm.toFixed(1),
		aqi: r.aqi
	}));
	const c2 = classify(latest.mq2_ppm, settings.mq2_threshold * .7, settings.mq2_threshold);
	const c7 = classify(latest.mq7_ppm, settings.mq7_threshold * .7, settings.mq7_threshold);
	const max2 = Math.max(...readings.map((r) => r.mq2_ppm));
	const max7 = Math.max(...readings.map((r) => r.mq7_ppm));
	const aqiColor = (v) => v >= 150 ? "var(--destructive)" : v >= 100 ? "var(--warning)" : "var(--primary)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			code: "02 / GAS SENSORS",
			title: "Air Quality",
			subtitle: "MQ-2 (Smoke / LPG) and MQ-7 (Carbon Monoxide) live concentrations."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "MQ-2 · Smoke / LPG",
				tag: "ppm",
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
					value: latest.mq2_ppm,
					max: 1e3,
					label: "Concentration",
					unit: "ppm",
					warn: settings.mq2_threshold * .7,
					danger: settings.mq2_threshold,
					size: 240
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ...c2 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "MQ-7 · Carbon Monoxide",
				tag: "ppm",
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
					value: latest.mq7_ppm,
					max: 200,
					label: "Concentration",
					unit: "ppm",
					warn: settings.mq7_threshold * .7,
					danger: settings.mq7_threshold,
					size: 240
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ...c7 })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "MQ-2 Peak",
					value: max2.toFixed(0),
					unit: "ppm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "MQ-2 Limit",
					value: String(settings.mq2_threshold),
					unit: "ppm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "MQ-7 Peak",
					value: max7.toFixed(0),
					unit: "ppm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "MQ-7 Limit",
					value: String(settings.mq7_threshold),
					unit: "ppm"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "MQ-2 Concentration",
			tag: "THRESHOLD CODED",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 260,
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
							y: settings.mq2_threshold * .7,
							stroke: "var(--warning)",
							strokeDasharray: "4 4",
							label: {
								value: "Moderate",
								fill: "var(--warning)",
								fontSize: 10
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
							y: settings.mq2_threshold,
							stroke: "var(--destructive)",
							strokeDasharray: "4 4",
							label: {
								value: "Hazard",
								fill: "var(--destructive)",
								fontSize: 10
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "mq2",
							name: "MQ-2 ppm",
							stroke: "var(--chart-1)",
							strokeWidth: 2,
							dot: false
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "MQ-7 Concentration",
				tag: "CO",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: settings.mq7_threshold,
								stroke: "var(--destructive)",
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "mq7",
								name: "MQ-7 ppm",
								stroke: "var(--chart-3)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "AQI History",
				tag: "LAST 30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data.slice(-30),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								...axis,
								minTickGap: 30
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								...chartTooltip,
								cursor: { fill: "var(--muted)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "aqi",
								name: "AQI",
								radius: [
									3,
									3,
									0,
									0
								],
								children: data.slice(-30).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: aqiColor(d.aqi) }, i))
							})
						]
					})
				})
			})]
		})
	] });
}
//#endregion
export { AirQuality as component };
