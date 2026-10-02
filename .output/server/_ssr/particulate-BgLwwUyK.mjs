import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as fmtDateTime, c as useTelemetry, o as fmtTime, r as classify } from "./utils-CunzFhYI.mjs";
import { a as StatCard, c as chartTooltip, n as PageHeader, o as StatusBadge, r as Panel, s as axis, t as Gauge } from "./widgets-j8Pd3rZG.mjs";
import { a as XAxis, f as Tooltip, i as YAxis, l as CartesianGrid, m as ResponsiveContainer, n as BarChart, o as Bar, s as Area, t as AreaChart, u as ReferenceLine } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/particulate-BgLwwUyK.js
var import_jsx_runtime = require_jsx_runtime();
function Particulate() {
	const { readings, latest, settings } = useTelemetry();
	if (!latest) return null;
	const data = readings.slice(-120).map((r) => ({
		t: fmtTime(r.ts),
		pm25: +r.pm25.toFixed(1),
		pm10: +r.pm10.toFixed(1)
	}));
	const peak = readings.reduce((a, b) => b.pm25 > a.pm25 ? b : a, latest);
	const avg = readings.reduce((s, r) => s + r.pm25, 0) / readings.length;
	const bins = [
		[0, 12],
		[12, 35],
		[35, 55],
		[55, 150],
		[150, 9999]
	].map(([lo, hi]) => ({
		range: hi > 1e3 ? `${lo}+` : `${lo}-${hi}`,
		count: readings.filter((r) => r.pm25 >= lo && r.pm25 < hi).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			code: "03 / DUST SENSOR",
			title: "Particulate Matter",
			subtitle: "Optical dust sensor density, PM2.5 / PM10 trends and peak thresholds."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "PM2.5",
					className: "flex flex-col items-center md:row-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
						value: latest.pm25,
						max: 250,
						label: "Fine particles",
						unit: "µg/m³",
						warn: 35,
						danger: settings.pm25_threshold,
						size: 220
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { ...classify(latest.pm25, 35, settings.pm25_threshold) })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					accent: true,
					label: "PM10",
					value: latest.pm10.toFixed(0),
					unit: "µg/m³"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Dust Density",
					value: latest.dust_density.toFixed(3),
					unit: "mg/m³"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Average PM2.5",
					value: avg.toFixed(1),
					unit: "µg/m³"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Peak PM2.5",
					value: peak.pm25.toFixed(0),
					unit: "µg/m³",
					sub: fmtDateTime(peak.ts)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Threshold",
					value: String(settings.pm25_threshold),
					unit: "µg/m³"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Over Limit",
					value: String(readings.filter((r) => r.pm25 >= settings.pm25_threshold).length),
					unit: "samples"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Pollution Trend",
			tag: "AREA · SPIKES",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 300,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "p25",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--chart-1)",
								stopOpacity: .55
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--chart-1)",
								stopOpacity: 0
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "p10",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--chart-2)",
								stopOpacity: .3
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--chart-2)",
								stopOpacity: 0
							})]
						})] }),
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
							y: settings.pm25_threshold,
							stroke: "var(--destructive)",
							strokeDasharray: "4 4",
							label: {
								value: "Peak limit",
								fill: "var(--destructive)",
								fontSize: 10
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "pm10",
							name: "PM10",
							stroke: "var(--chart-2)",
							fill: "url(#p10)",
							strokeWidth: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "pm25",
							name: "PM2.5",
							stroke: "var(--chart-1)",
							fill: "url(#p25)",
							strokeWidth: 2
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "PM2.5 Distribution",
			tag: "SAMPLE COUNT",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 220,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: bins,
					layout: "vertical",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "var(--border)",
							strokeDasharray: "3 3",
							horizontal: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							...axis
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							type: "category",
							dataKey: "range",
							...axis,
							width: 60
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							...chartTooltip,
							cursor: { fill: "var(--muted)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "count",
							fill: "var(--chart-1)",
							radius: [
								0,
								3,
								3,
								0
							]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { Particulate as component };
