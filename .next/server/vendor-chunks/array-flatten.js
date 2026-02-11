"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/array-flatten";
exports.ids = ["vendor-chunks/array-flatten"];
exports.modules = {

/***/ "(ssr)/./node_modules/array-flatten/dist.es2015/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/array-flatten/dist.es2015/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   flatten: () => (/* binding */ flatten)\n/* harmony export */ });\n/**\n * Flatten an array indefinitely.\n */\nfunction flatten(array) {\n    var result = [];\n    $flatten(array, result);\n    return result;\n}\n/**\n * Internal flatten function recursively passes `result`.\n */\nfunction $flatten(array, result) {\n    for (var i = 0; i < array.length; i++) {\n        var value = array[i];\n        if (Array.isArray(value)) {\n            $flatten(value, result);\n        }\n        else {\n            result.push(value);\n        }\n    }\n}\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYXJyYXktZmxhdHRlbi9kaXN0LmVzMjAxNS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2xjYXNlaXJvL1NpdGVzL0dpdGh1Yi9zaWdodHJlYWQvbm9kZV9tb2R1bGVzL2FycmF5LWZsYXR0ZW4vZGlzdC5lczIwMTUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGbGF0dGVuIGFuIGFycmF5IGluZGVmaW5pdGVseS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgJGZsYXR0ZW4oYXJyYXksIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogSW50ZXJuYWwgZmxhdHRlbiBmdW5jdGlvbiByZWN1cnNpdmVseSBwYXNzZXMgYHJlc3VsdGAuXG4gKi9cbmZ1bmN0aW9uICRmbGF0dGVuKGFycmF5LCByZXN1bHQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICRmbGF0dGVuKHZhbHVlLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/array-flatten/dist.es2015/index.js\n");

/***/ })

};
;