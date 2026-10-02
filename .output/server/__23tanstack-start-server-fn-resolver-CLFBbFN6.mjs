//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CLFBbFN6.js
var manifest = { "9cc6bf9eb674cf9080df7d4d3d3071d8080d8571164a79b90da7a6282380595e": {
	functionName: "getFirebaseConfig_createServerFn_handler",
	importer: () => import("./_ssr/firebase-config.functions-Co68_7N7.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
