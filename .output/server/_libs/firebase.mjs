import { r as __exportAll } from "../_runtime.mjs";
import { a as _components, c as _registerComponent, d as getApps, f as initializeApp, i as _apps, l as _serverApps, n as SDK_VERSION, o as _getProvider, p as registerVersion, r as _addComponent, s as _isFirebaseServerApp, t as DEFAULT_ENTRY_NAME, u as getApp } from "./@firebase/app+[...].mjs";
import { C as oa, S as getFirestore, T as serverTimestamp, _ as aa, a as QueryOrderByConstraint, b as doc, c as onSnapshot, d as setDoc, f as DocumentKey, g as SnapshotMetadata, h as QuerySnapshot, i as QueryLimitConstraint, l as orderBy, m as Query, n as QueryConstraint, o as executeWrite, p as DocumentSnapshot, r as QueryFieldFilterConstraint, s as limit, t as QueryCompositeFilterConstraint, u as query, v as collection, w as ra, x as e, y as da } from "./@firebase/firestore+[...].mjs";
//#region node_modules/firebase/app/dist/esm/index.esm.js
var index_esm_exports$1 = /* @__PURE__ */ __exportAll({
	SDK_VERSION: () => SDK_VERSION,
	_DEFAULT_ENTRY_NAME: () => DEFAULT_ENTRY_NAME,
	_addComponent: () => _addComponent,
	_apps: () => _apps,
	_components: () => _components,
	_getProvider: () => _getProvider,
	_isFirebaseServerApp: () => _isFirebaseServerApp,
	_registerComponent: () => _registerComponent,
	_serverApps: () => _serverApps,
	getApp: () => getApp,
	getApps: () => getApps,
	initializeApp: () => initializeApp,
	registerVersion: () => registerVersion
});
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
registerVersion("firebase", "12.19.0", "app");
//#endregion
//#region node_modules/firebase/firestore/dist/esm/index.esm.js
var index_esm_exports = /* @__PURE__ */ __exportAll({
	CACHE_SIZE_UNLIMITED: () => -1,
	DocumentReference: () => aa,
	DocumentSnapshot: () => DocumentSnapshot,
	Firestore: () => da,
	FirestoreError: () => e,
	Query: () => Query,
	QueryCompositeFilterConstraint: () => QueryCompositeFilterConstraint,
	QueryConstraint: () => QueryConstraint,
	QueryFieldFilterConstraint: () => QueryFieldFilterConstraint,
	QueryLimitConstraint: () => QueryLimitConstraint,
	QueryOrderByConstraint: () => QueryOrderByConstraint,
	QuerySnapshot: () => QuerySnapshot,
	SnapshotMetadata: () => SnapshotMetadata,
	_DocumentKey: () => DocumentKey,
	_cast: () => ra,
	collection: () => collection,
	doc: () => doc,
	ensureFirestoreConfigured: () => oa,
	executeWrite: () => executeWrite,
	getFirestore: () => getFirestore,
	limit: () => limit,
	onSnapshot: () => onSnapshot,
	orderBy: () => orderBy,
	query: () => query,
	serverTimestamp: () => serverTimestamp,
	setDoc: () => setDoc
});
//#endregion
export { index_esm_exports$1 as n, index_esm_exports as t };
