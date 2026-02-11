"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/manifest.json/route";
exports.ids = ["app/manifest.json/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.json%2Froute&page=%2Fmanifest.json%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.json&appDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.json%2Froute&page=%2Fmanifest.json%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.json&appDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_metadata_route_loader_filePath_2FUsers_2Flcaseiro_2FSites_2FGithub_2Fsightread_2Fsrc_2Fapp_2Fmanifest_json_isDynamicRouteExtension_0_next_metadata_route___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-metadata-route-loader?filePath=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp%2Fmanifest.json&isDynamicRouteExtension=0!?__next_metadata_route__ */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp%2Fmanifest.json&isDynamicRouteExtension=0!?__next_metadata_route__\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/manifest.json/route\",\n        pathname: \"/manifest.json\",\n        filename: \"manifest\",\n        bundlePath: \"app/manifest.json/route\"\n    },\n    resolvedPagePath: \"next-metadata-route-loader?filePath=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp%2Fmanifest.json&isDynamicRouteExtension=0!?__next_metadata_route__\",\n    nextConfigOutput,\n    userland: next_metadata_route_loader_filePath_2FUsers_2Flcaseiro_2FSites_2FGithub_2Fsightread_2Fsrc_2Fapp_2Fmanifest_json_isDynamicRouteExtension_0_next_metadata_route___WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZtYW5pZmVzdC5qc29uJTJGcm91dGUmcGFnZT0lMkZtYW5pZmVzdC5qc29uJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGbWFuaWZlc3QuanNvbiZhcHBEaXI9JTJGVXNlcnMlMkZsY2FzZWlybyUyRlNpdGVzJTJGR2l0aHViJTJGc2lnaHRyZWFkJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmxjYXNlaXJvJTJGU2l0ZXMlMkZHaXRodWIlMkZzaWdodHJlYWQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ21IO0FBQ2hNO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJuZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlcj9maWxlUGF0aD0lMkZVc2VycyUyRmxjYXNlaXJvJTJGU2l0ZXMlMkZHaXRodWIlMkZzaWdodHJlYWQlMkZzcmMlMkZhcHAlMkZtYW5pZmVzdC5qc29uJmlzRHluYW1pY1JvdXRlRXh0ZW5zaW9uPTAhP19fbmV4dF9tZXRhZGF0YV9yb3V0ZV9fXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL21hbmlmZXN0Lmpzb24vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL21hbmlmZXN0Lmpzb25cIixcbiAgICAgICAgZmlsZW5hbWU6IFwibWFuaWZlc3RcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvbWFuaWZlc3QuanNvbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIm5leHQtbWV0YWRhdGEtcm91dGUtbG9hZGVyP2ZpbGVQYXRoPSUyRlVzZXJzJTJGbGNhc2Vpcm8lMkZTaXRlcyUyRkdpdGh1YiUyRnNpZ2h0cmVhZCUyRnNyYyUyRmFwcCUyRm1hbmlmZXN0Lmpzb24maXNEeW5hbWljUm91dGVFeHRlbnNpb249MCE/X19uZXh0X21ldGFkYXRhX3JvdXRlX19cIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.json%2Froute&page=%2Fmanifest.json%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.json&appDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp%2Fmanifest.json&isDynamicRouteExtension=0!?__next_metadata_route__":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp%2Fmanifest.json&isDynamicRouteExtension=0!?__next_metadata_route__ ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* static asset route */\n\n\nconst contentType = \"application/manifest+json\"\nconst buffer = Buffer.from(\"ewogICAgIm5hbWUiOiAiU2lnaHRyZWFkIiwKICAgICJzaG9ydF9uYW1lIjogInNpZ2h0cmVhZCIsCiAgICAiZGVzY3JpcHRpb24iOiAiYXBwIGZvciBsZWFybmluZyBwaWFubyIsCiAgICAic3RhcnRfdXJsIjogIi8iLAogICAgImRpc3BsYXkiOiAic3RhbmRhbG9uZSIsCiAgICAiaWNvbnMiOiBbCiAgICAgICAgewogICAgICAgICAgICAic3JjIjogIi9pY29uLTE5Mi5wbmciLAogICAgICAgICAgICAic2l6ZXMiOiAiMTkyeDE5MiIsCiAgICAgICAgICAgICJ0eXBlIjogImltYWdlL3BuZyIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICAgInNyYyI6ICIvaWNvbi01MTIucG5nIiwKICAgICAgICAgICAgInNpemVzIjogIjUxMng1MTIiLAogICAgICAgICAgICAidHlwZSI6ICJpbWFnZS9wbmciCiAgICAgICAgfQogICAgXQp9Cg==\", 'base64'\n  )\n\nif (false) {}\n\nfunction GET() {\n  return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(buffer, {\n    headers: {\n      'Content-Type': contentType,\n      'Cache-Control': \"no-cache, no-store\",\n    },\n  })\n}\n\nconst dynamic = 'force-static'\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlci5qcz9maWxlUGF0aD0lMkZVc2VycyUyRmxjYXNlaXJvJTJGU2l0ZXMlMkZHaXRodWIlMkZzaWdodHJlYWQlMkZzcmMlMkZhcHAlMkZtYW5pZmVzdC5qc29uJmlzRHluYW1pY1JvdXRlRXh0ZW5zaW9uPTAhP19fbmV4dF9tZXRhZGF0YV9yb3V0ZV9fIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQzBDOztBQUUxQztBQUNBO0FBQ0E7O0FBRUEsSUFBSSxLQUFLLEVBQUUsRUFTVjs7QUFFTTtBQUNQLGFBQWEscURBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFTyIsInNvdXJjZXMiOlsiP19fbmV4dF9tZXRhZGF0YV9yb3V0ZV9fIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIHN0YXRpYyBhc3NldCByb3V0ZSAqL1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmNvbnN0IGNvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9tYW5pZmVzdCtqc29uXCJcbmNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKFwiZXdvZ0lDQWdJbTVoYldVaU9pQWlVMmxuYUhSeVpXRmtJaXdLSUNBZ0lDSnphRzl5ZEY5dVlXMWxJam9nSW5OcFoyaDBjbVZoWkNJc0NpQWdJQ0FpWkdWelkzSnBjSFJwYjI0aU9pQWlZWEJ3SUdadmNpQnNaV0Z5Ym1sdVp5QndhV0Z1YnlJc0NpQWdJQ0FpYzNSaGNuUmZkWEpzSWpvZ0lpOGlMQW9nSUNBZ0ltUnBjM0JzWVhraU9pQWljM1JoYm1SaGJHOXVaU0lzQ2lBZ0lDQWlhV052Ym5NaU9pQmJDaUFnSUNBZ0lDQWdld29nSUNBZ0lDQWdJQ0FnSUNBaWMzSmpJam9nSWk5cFkyOXVMVEU1TWk1d2JtY2lMQW9nSUNBZ0lDQWdJQ0FnSUNBaWMybDZaWE1pT2lBaU1Ua3llREU1TWlJc0NpQWdJQ0FnSUNBZ0lDQWdJQ0owZVhCbElqb2dJbWx0WVdkbEwzQnVaeUlLSUNBZ0lDQWdJQ0I5TEFvZ0lDQWdJQ0FnSUhzS0lDQWdJQ0FnSUNBZ0lDQWdJbk55WXlJNklDSXZhV052YmkwMU1USXVjRzVuSWl3S0lDQWdJQ0FnSUNBZ0lDQWdJbk5wZW1Weklqb2dJalV4TW5nMU1USWlMQW9nSUNBZ0lDQWdJQ0FnSUNBaWRIbHdaU0k2SUNKcGJXRm5aUzl3Ym1jaUNpQWdJQ0FnSUNBZ2ZRb2dJQ0FnWFFwOUNnPT1cIiwgJ2Jhc2U2NCdcbiAgKVxuXG5pZiAoZmFsc2UpIHtcbiAgY29uc3QgZmlsZVNpemVJbk1CID0gYnVmZmVyLmJ5dGVMZW5ndGggLyAxMDI0IC8gMTAyNFxuICBpZiAoZmlsZVNpemVJbk1CID4gOCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRmlsZSBzaXplIGZvciBPcGVuIEdyYXBoIGltYWdlIFwiL1VzZXJzL2xjYXNlaXJvL1NpdGVzL0dpdGh1Yi9zaWdodHJlYWQvc3JjL2FwcC9tYW5pZmVzdC5qc29uXCIgZXhjZWVkcyA4TUIuICcgK1xuICAgIGAoQ3VycmVudDogJHtmaWxlU2l6ZUluTUIudG9GaXhlZCgyKX1NQilcbmAgK1xuICAgICdSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwcC9hcGktcmVmZXJlbmNlL2ZpbGUtY29udmVudGlvbnMvbWV0YWRhdGEvb3BlbmdyYXBoLWltYWdlI2ltYWdlLWZpbGVzLWpwZy1wbmctZ2lmJ1xuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR0VUKCkge1xuICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShidWZmZXIsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogY29udGVudFR5cGUsXG4gICAgICAnQ2FjaGUtQ29udHJvbCc6IFwibm8tY2FjaGUsIG5vLXN0b3JlXCIsXG4gICAgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2Utc3RhdGljJ1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp%2Fmanifest.json&isDynamicRouteExtension=0!?__next_metadata_route__\n");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.json%2Froute&page=%2Fmanifest.json%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.json&appDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flcaseiro%2FSites%2FGithub%2Fsightread&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();