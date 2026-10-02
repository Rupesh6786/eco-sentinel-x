globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/AreaChart-CuikvA5Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36d7-wSAMprMlAIP89Oz6qjwXxcK1Ye4\"",
		"mtime": "2026-10-02T09:41:07.355Z",
		"size": 14039,
		"path": "../public/assets/AreaChart-CuikvA5Y.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-10-02T09:41:07.593Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-02T09:41:07.593Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BarChart-B0aabgnd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ffa-GMuuVoBFrmbEza+sNiw9FdrniR0\"",
		"mtime": "2026-10-02T09:41:07.355Z",
		"size": 24570,
		"path": "../public/assets/BarChart-B0aabgnd.js"
	},
	"/assets/LineChart-DX6z5PRV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e48-eRCGDUIdebodo+IPZgpOOS66Ivw\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 11848,
		"path": "../public/assets/LineChart-DX6z5PRV.js"
	},
	"/assets/button-Bs-V3AZN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143b-vLRAQ52+onxGf/DIuzQb7vk0Gz0\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 5179,
		"path": "../public/assets/button-Bs-V3AZN.js"
	},
	"/assets/air-quality-DMPR3FfW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e75-/j8mZBZ/dAV8EGA60kM6aK2y1is\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 3701,
		"path": "../public/assets/air-quality-DMPR3FfW.js"
	},
	"/assets/droplets-DjF7pXWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-IivDsZyNBL9FD8G+m2N2hTfyRG8\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 402,
		"path": "../public/assets/droplets-DjF7pXWH.js"
	},
	"/assets/environmental-D73b1YCa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"456a-Sf+aozwqQP+0e+lrbvTBRnzYmtk\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 17770,
		"path": "../public/assets/environmental-D73b1YCa.js"
	},
	"/assets/CartesianChart-J5STObqB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53620-KLYoFb8x1nVGUlUWjjqpbBoQRrI\"",
		"mtime": "2026-10-02T09:41:07.355Z",
		"size": 341536,
		"path": "../public/assets/CartesianChart-J5STObqB.js"
	},
	"/assets/graphicalItemSelectors-Ce9bKyPK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0-jIBMqWx2i5ezI8TeQ2Mns5A1HGA\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 192,
		"path": "../public/assets/graphicalItemSelectors-Ce9bKyPK.js"
	},
	"/assets/index.esm-BRVS_uBq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63ba-UfwcHU5OaP6oVVz44ieuPx9M/fw\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 25530,
		"path": "../public/assets/index.esm-BRVS_uBq.js"
	},
	"/assets/index.es-CNHAvOs8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f83-uM3XoghEGgYVKaC3WGtIZse9Amc\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 151427,
		"path": "../public/assets/index.es-CNHAvOs8.js"
	},
	"/assets/index.esm-DU0nuGFV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-dT1NfdZcafYNXBX4RPfC6jgHS30\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 128,
		"path": "../public/assets/index.esm-DU0nuGFV.js"
	},
	"/assets/html2canvas-CA7kyov8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b46-1bD3NUT0o78L/KUDivNJ6s7fDy4\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 199494,
		"path": "../public/assets/html2canvas-CA7kyov8.js"
	},
	"/assets/logs-BA9XRCNj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1513-6fkB4I+y/Kk2kK6rDeac2XZruVU\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 5395,
		"path": "../public/assets/logs-BA9XRCNj.js"
	},
	"/assets/particulate-B9F782EI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d88-c7JX6gsjMrNtLGZ5sY1QEzxV1lY\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 3464,
		"path": "../public/assets/particulate-B9F782EI.js"
	},
	"/assets/power-Dai3Ldma.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14de-xdQiL37oNBUp2U+1IWfkJNScxas\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 5342,
		"path": "../public/assets/power-Dai3Ldma.js"
	},
	"/assets/jspdf.plugin.autotable-CAb09jfK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"741b-QN+U8tfm9I52cH6YO3GVWKnsZz4\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 29723,
		"path": "../public/assets/jspdf.plugin.autotable-CAb09jfK.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/index-1RyEQ_GP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a83d-95vQdUrYG66r426jIYB2bz3cA4A\"",
		"mtime": "2026-10-02T09:41:07.355Z",
		"size": 370749,
		"path": "../public/assets/index-1RyEQ_GP.js"
	},
	"/assets/rolldown-runtime-hePW80VL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc-fA8td6k29UVF6JoPfhOPkceTK1M\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 716,
		"path": "../public/assets/rolldown-runtime-hePW80VL.js"
	},
	"/assets/purify.es-ByxKKxy8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6db4-uR8yHa3mxAT+uGvnUvKVTdPEEME\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 28084,
		"path": "../public/assets/purify.es-ByxKKxy8.js"
	},
	"/assets/jspdf.es.min-C9MKZeM8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6169c-alFxiskzhOYwo66KkDR5dLEzUQw\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 399004,
		"path": "../public/assets/jspdf.es.min-C9MKZeM8.js"
	},
	"/assets/index.esm-BgEZYQ9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87b66-xu1DIkQrN815VKdlOsBRD6HygN8\"",
		"mtime": "2026-10-02T09:41:07.356Z",
		"size": 555878,
		"path": "../public/assets/index.esm-BgEZYQ9W.js"
	},
	"/assets/routes-CqIgwI7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1965-MROsGV98mqFyvtvqrHWBZBnxDkM\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 6501,
		"path": "../public/assets/routes-CqIgwI7M.js"
	},
	"/assets/settings-QOUfk8LH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3694-aWyGUN2Aj9043p2vJO2prHB2hPs\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 13972,
		"path": "../public/assets/settings-QOUfk8LH.js"
	},
	"/assets/typeof-B5XbjTb1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-yPXEOGyFHb1Ws7OoWyWNEEBz4mQ\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 271,
		"path": "../public/assets/typeof-B5XbjTb1.js"
	},
	"/assets/widgets-DI0ZfItB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e37-IQE/Zq2YTcSJrbdYvVt+Bzo8uLc\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 3639,
		"path": "../public/assets/widgets-DI0ZfItB.js"
	},
	"/assets/wifi-DxY70DjK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"449-3wsh93Aa2uALExH4LPwh9ypS+NM\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 1097,
		"path": "../public/assets/wifi-DxY70DjK.js"
	},
	"/assets/styles-DuKoBxSA.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"124c1-QODaGNMvQjEpMY1onFPgUUzktns\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 74945,
		"path": "../public/assets/styles-DuKoBxSA.css"
	},
	"/assets/utils-BdAagwtK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1329c-5JyeEnvANIWD9SPienKKxR/n50Y\"",
		"mtime": "2026-10-02T09:41:07.357Z",
		"size": 78492,
		"path": "../public/assets/utils-BdAagwtK.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_d13SAb = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_d13SAb
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
