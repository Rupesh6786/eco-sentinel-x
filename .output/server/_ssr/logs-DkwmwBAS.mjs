import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as fmtDateTime, c as useTelemetry } from "./utils-CunzFhYI.mjs";
import { n as PageHeader, r as Panel } from "./widgets-j8Pd3rZG.mjs";
import { T as ArrowUpDown, d as Search, v as FileDown } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./button-D0zsbyU0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logs-DkwmwBAS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cols = [
	{
		key: "ts",
		label: "Timestamp"
	},
	{
		key: "aqi",
		label: "AQI",
		d: 0
	},
	{
		key: "mq2_ppm",
		label: "MQ-2",
		d: 0
	},
	{
		key: "mq7_ppm",
		label: "MQ-7",
		d: 1
	},
	{
		key: "pm25",
		label: "PM2.5",
		d: 1
	},
	{
		key: "pm10",
		label: "PM10",
		d: 1
	},
	{
		key: "temperature",
		label: "Temp °C",
		d: 1
	},
	{
		key: "humidity",
		label: "RH %",
		d: 0
	},
	{
		key: "battery_voltage",
		label: "Batt V",
		d: 2
	},
	{
		key: "rssi",
		label: "RSSI",
		d: 0
	}
];
var PAGE = 25;
function Logs() {
	const { readings } = useTelemetry();
	const [q, setQ] = (0, import_react.useState)("");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)({
		k: "ts",
		asc: false
	});
	const [page, setPage] = (0, import_react.useState)(0);
	const rows = (0, import_react.useMemo)(() => {
		const f = from ? new Date(from).getTime() : -Infinity;
		const t = to ? new Date(to).getTime() + 86399999 : Infinity;
		return readings.filter((r) => r.ts >= f && r.ts <= t).filter((r) => !q || [
			fmtDateTime(r.ts),
			r.deviceId,
			...cols.map((c) => String(r[c.key]))
		].join(" ").toLowerCase().includes(q.toLowerCase())).sort((a, b) => (a[sort.k] - b[sort.k]) * (sort.asc ? 1 : -1));
	}, [
		readings,
		q,
		from,
		to,
		sort
	]);
	const cell = (r, c) => c.key === "ts" ? fmtDateTime(r.ts) : r[c.key].toFixed(c.d ?? 1);
	async function exportPdf() {
		const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => n.t);
		const { default: autoTable } = await import("../_libs/jspdf-autotable.mjs").then((n) => n.t);
		const doc = new jsPDF({ orientation: "landscape" });
		doc.setFillColor(20, 20, 18);
		doc.rect(0, 0, 297, 24, "F");
		doc.setTextColor(250, 214, 30);
		doc.setFontSize(18);
		doc.text("Eco-Sentinal-X · Sensor Report", 14, 15);
		doc.setTextColor(200, 200, 200);
		doc.setFontSize(9);
		doc.text(`Generated ${(/* @__PURE__ */ new Date()).toLocaleString()} · ${rows.length} records`, 14, 21);
		autoTable(doc, {
			startY: 30,
			head: [cols.map((c) => c.label)],
			body: rows.map((r) => cols.map((c) => cell(r, c))),
			styles: { fontSize: 8 },
			headStyles: {
				fillColor: [
					250,
					214,
					30
				],
				textColor: [
					20,
					20,
					18
				]
			},
			alternateRowStyles: { fillColor: [
				245,
				245,
				240
			] }
		});
		doc.save(`eco-sentinal-x-report-${Date.now()}.pdf`);
	}
	const pages = Math.max(1, Math.ceil(rows.length / PAGE));
	const view = rows.slice(page * PAGE, page * PAGE + PAGE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		code: "06 / HISTORY",
		title: "Historical Data Logs",
		subtitle: "Every timestamped reading uploaded by the ESP32."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Readings",
		tag: `${rows.length} RECORDS`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-52 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-9",
							placeholder: "Search readings…",
							value: q,
							onChange: (e) => {
								setQ(e.target.value);
								setPage(0);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted-foreground",
						children: ["From", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: from,
							onChange: (e) => {
								setFrom(e.target.value);
								setPage(0);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted-foreground",
						children: ["To", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: to,
							onChange: (e) => {
								setTo(e.target.value);
								setPage(0);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: exportPdf,
						className: "font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4" }), "Export High-Quality PDF Report"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-md border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-1 hover:text-primary",
								onClick: () => setSort((s) => ({
									k: c.key,
									asc: s.k === c.key ? !s.asc : false
								})),
								children: [c.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: `h-3 w-3 ${sort.k === c.key ? "text-primary" : "opacity-40"}` })]
							})
						}, c.key)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "font-mono",
						children: [view.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-t hover:bg-accent/40",
							children: cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-2",
								children: cell(r, c)
							}, c.key))
						}, r.id)), !view.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: cols.length,
							className: "p-8 text-center text-muted-foreground",
							children: "No readings match."
						}) })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Page ",
					page + 1,
					" of ",
					pages
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: page === 0,
						onClick: () => setPage((p) => p - 1),
						children: "Prev"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: page >= pages - 1,
						onClick: () => setPage((p) => p + 1),
						children: "Next"
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { Logs as component };
