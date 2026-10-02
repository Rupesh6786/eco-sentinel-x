import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./utils-CunzFhYI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/widgets-j8Pd3rZG.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ code, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tracking-[0.25em] text-primary",
				children: code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: subtitle
			})
		]
	});
}
function Panel({ title, tag, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel p-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-3 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold uppercase tracking-wider",
				children: title
			}), tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded bg-accent px-2 py-0.5 font-mono text-[10px] text-accent-foreground",
				children: tag
			})]
		}), children]
	});
}
var toneCls = {
	success: "bg-success/15 text-success border-success/40",
	warning: "bg-warning/15 text-warning border-warning/40",
	destructive: "bg-destructive/15 text-destructive border-destructive/40"
};
function StatusBadge({ label, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", toneCls[tone]),
		children: label
	});
}
function StatCard({ label, value, unit, sub, icon, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("panel relative overflow-hidden p-4", accent && "glow"),
		children: [
			accent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 bg-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-baseline gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-3xl font-bold",
					children: value
				}), unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: unit
				})]
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-xs text-muted-foreground",
				children: sub
			})
		]
	});
}
function Gauge({ value, max, label, unit, warn, danger, size = 180 }) {
	const pct = Math.max(0, Math.min(1, value / max));
	const c = Math.PI * 70;
	const color = value >= danger ? "var(--destructive)" : value >= warn ? "var(--warning)" : "var(--primary)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 180 110",
			width: size,
			height: size * .61,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M20 95 A70 70 0 0 1 160 95",
					fill: "none",
					stroke: "var(--muted)",
					strokeWidth: "14",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M20 95 A70 70 0 0 1 160 95",
					fill: "none",
					stroke: color,
					strokeWidth: "14",
					strokeLinecap: "round",
					strokeDasharray: c,
					strokeDashoffset: c * (1 - pct),
					style: { transition: "stroke-dashoffset .8s ease, stroke .4s" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "90",
					y: "82",
					textAnchor: "middle",
					fill: "var(--foreground)",
					fontSize: "26",
					fontWeight: "700",
					fontFamily: "JetBrains Mono",
					children: value.toFixed(value < 10 ? 1 : 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "90",
					y: "102",
					textAnchor: "middle",
					fill: "var(--muted-foreground)",
					fontSize: "10",
					children: unit
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		})]
	});
}
function ProgressBar({ value, max = 100, tone = "primary" }) {
	const bg = {
		primary: "bg-primary",
		success: "bg-success",
		warning: "bg-warning",
		destructive: "bg-destructive"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2.5 w-full overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-all duration-700", bg),
			style: { width: `${Math.min(100, value / max * 100)}%` }
		})
	});
}
var chartTooltip = {
	contentStyle: {
		background: "var(--card)",
		border: "1px solid var(--border)",
		borderRadius: 8,
		fontSize: 12
	},
	labelStyle: { color: "var(--primary)" }
};
var axis = {
	stroke: "var(--muted-foreground)",
	fontSize: 11,
	tickLine: false,
	axisLine: false
};
//#endregion
export { StatCard as a, chartTooltip as c, ProgressBar as i, PageHeader as n, StatusBadge as o, Panel as r, axis as s, Gauge as t };
