import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-config.functions-Co68_7N7.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getFirebaseConfig_createServerFn_handler = createServerRpc({
	id: "9cc6bf9eb674cf9080df7d4d3d3071d8080d8571164a79b90da7a6282380595e",
	name: "getFirebaseConfig",
	filename: "src/lib/firebase-config.functions.ts"
}, (opts) => getFirebaseConfig.__executeServer(opts));
var getFirebaseConfig = createServerFn({ method: "GET" }).handler(getFirebaseConfig_createServerFn_handler, async () => {
	return {
		apiKey: "AIzaSyDTeORCY_Yglneqcwv2OObH3M9D-eR6qe4",
		authDomain: "studio-1142491547-98533.firebaseapp.com",
		projectId: "studio-1142491547-98533",
		storageBucket: "studio-1142491547-98533.firebasestorage.app",
		messagingSenderId: "153917479951",
		appId: "1:153917479951:web:c21215f0a3edbd6664d77a"
	};
});
//#endregion
export { getFirebaseConfig_createServerFn_handler };
