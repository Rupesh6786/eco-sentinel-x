import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as useTelemetry, o as fmtTime } from "./utils-CunzFhYI.mjs";
import { a as StatCard, c as chartTooltip, n as PageHeader, r as Panel, s as axis, t as Gauge } from "./widgets-j8Pd3rZG.mjs";
import { a as XAxis, c as Line, f as Tooltip, i as YAxis, l as CartesianGrid, m as ResponsiveContainer, p as Legend, r as LineChart } from "../_libs/recharts+[...].mjs";
import { o as Thermometer, s as Sun, y as Droplets } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/environmental-CQUzvTCa.js
var import_jsx_runtime = require_jsx_runtime();
function Environmental() {
	const { readings, latest } = useTelemetry();
	if (!latest) return null;
	const data = readings.slice(-120).map((r) => ({
		t: fmtTime(r.ts),
		temp: +r.temperature.toFixed(1),
		hum: +r.humidity.toFixed(1),
		mq2: +r.mq2_ppm.toFixed(0)
	}));
	const temps = readings.map((r) => r.temperature);
	const hi = latest.temperature + .5555 * (6.11 * Math.exp(5417.753 * (1 / 273.16 - 1 / (273.15 + latest.temperature - (100 - latest.humidity) / 5))) - 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			code: "04 / DHT11",
			title: "Environmental Metrics",
			subtitle: "Meteorological readouts and correlation with gas concentration shifts."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Temperature",
					className: "flex flex-col items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
						value: latest.temperature,
						max: 60,
						label: "Ambient",
						unit: "°C",
						warn: 35,
						danger: 45,
						size: 220
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Relative Humidity",
					className: "flex flex-col items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
						value: latest.humidity,
						max: 100,
						label: "RH",
						unit: "%",
						warn: 75,
						danger: 90,
						size: 220
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							accent: true,
							label: "Feels Like",
							value: hi.toFixed(1),
							unit: "°C",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Min / Max Temp",
							value: `${Math.min(...temps).toFixed(0)} / ${Math.max(...temps).toFixed(0)}`,
							unit: "°C",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Comfort",
							value: latest.humidity > 70 ? "Humid" : latest.humidity < 30 ? "Dry" : "Optimal",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-4 w-4" })
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Temperature & Humidity",
			tag: "DUAL AXIS",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 280,
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
							yAxisId: "l",
							...axis
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							yAxisId: "r",
							orientation: "right",
							...axis
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...chartTooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							yAxisId: "l",
							type: "monotone",
							dataKey: "temp",
							name: "Temp °C",
							stroke: "var(--chart-1)",
							strokeWidth: 2,
							dot: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							yAxisId: "r",
							type: "monotone",
							dataKey: "hum",
							name: "Humidity %",
							stroke: "var(--chart-3)",
							strokeWidth: 2,
							dot: false
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Humidity vs Gas Correlation",
			tag: "MQ-2 OVERLAY",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							yAxisId: "l",
							type: "monotone",
							dataKey: "hum",
							name: "Humidity %",
							stroke: "var(--chart-4)",
							strokeWidth: 2,
							dot: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							yAxisId: "r",
							type: "monotone",
							dataKey: "mq2",
							name: "MQ-2 ppm",
							stroke: "var(--chart-2)",
							strokeWidth: 2,
							dot: false
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { Environmental as component };
