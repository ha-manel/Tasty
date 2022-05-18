"use strict";
(self["webpackChunktasty"] = self["webpackChunktasty"] || []).push([["index"],{

/***/ "./src/display-cards.js":
/*!******************************!*\
  !*** ./src/display-cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import openmodal from './popup.js';
const recipeCards = document.querySelector('#recipes-cards');

const createCard = (img, name, wholeData) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="meal-thumbnail">
        <img src="${img}" alt="">
      </div>
      <div class="card-header">
        <h3 class="meal-name">${name}</h3>
        <button class="like-btn"><i class="fa-regular fa-heart"></i> 201</button>
      </div>
      <button class="comments-btn" id="comments-btn" onclick="openmodal(${wholeData})">Comments</button>`;
  recipeCards.appendChild(card);
  /*
  const btn = document.querySelector('#comments-btn');
  console.log(btn);
  btn.onclick = () => {
    console.log(wholeData);
    openmodal(wholeData);
  }; */
};

const fetchRecipes = async () => {
  await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian').then(response => response.json()).then(json => {
    json.meals.forEach(meal => {
      createCard(meal.strMealThumb, meal.strMeal, meal);
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchRecipes);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _display_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-cards.js */ "./src/display-cards.js");


(0,_display_cards_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/banner.png */ "./src/assets/banner.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Dosis:wght@200;400;600;700&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  margin: 0;\n  font-family: 'Dosis', sans-serif;\n  overflow-x: hidden;\n  color: #343a40;\n}\n\nnav {\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #fefae0;\n  z-index: 8;\n  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\n}\n\nnav ul {\n  padding: 0;\n  list-style-type: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.nav-link {\n  text-decoration: none;\n  color: #606c38;\n  font-size: 18px;\n  letter-spacing: 0.3px;\n  font-weight: 600;\n  margin-right: 40px;\n  transition: all 0.3s ease-in-out;\n}\n\n.nav-link:hover {\n  color: #e05f37;\n}\n\n#headline {\n  width: 100vw;\n  height: 500px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: 0 50%;\n  margin-top: 50px;\n}\n\n#recipes-cards {\n  position: relative;\n  width: 80%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 150px auto;\n  gap: 40px;\n}\n\n#recipes-cards h2 {\n  position: absolute;\n  top: -80px;\n  text-align: center;\n  font-size: 35px;\n}\n\n.card {\n  position: relative;\n  width: 290px;\n  height: 450px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 5px 0 35px;\n  margin-top: 40px;\n  border: 1px solid #efe7c4;\n  border-radius: 12px;\n  background-color: rgba(239, 231, 196, 0.5);\n  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;\n}\n\n.meal-thumbnail {\n  width: 280px;\n  height: 280px;\n  object-fit: cover;\n}\n\n.meal-thumbnail img {\n  width: 100%;\n  height: 100%;\n  border-radius: 12px;\n}\n\n.card-header {\n  width: 90%;\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n\n.meal-name {\n  font-size: 23px;\n  margin-top: 15px;\n  color: #9b8834;\n}\n\n.like-btn {\n  min-width: 70px;\n  height: 40px;\n  font-size: 1.2rem;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  color: #bf0603;\n  margin-left: 15px;\n}\n\n.comments-btn {\n  position: absolute;\n  bottom: 25px;\n  cursor: pointer;\n  align-self: flex-start;\n  font-size: 1.2rem;\n  font-family: inherit;\n  color: #fff;\n  font-weight: 600;\n  background-color: #e05f37;\n  border: 1px solid#E05F37;\n  border-radius: 8px;\n  padding: 8px 12px;\n  margin-left: 15px;\n  transition: all 0.5s ease;\n}\n\n.comments-btn:hover {\n  background-color: #ff914d;\n  border: 1px solid #ff914d;\n}\n\nfooter {\n  width: 100vw;\n  background-color: #efe7c4;\n  padding: 15px 0;\n}\n\n.footer {\n  font-size: 20px;\n  font-weight: 600;\n  margin-left: 50px;\n}\n\n.footer a {\n  text-decoration: none;\n  color: #606c38;\n  width: 100px;\n  margin: 0 5px;\n}\n\n.modal {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: none;\n  z-index: 10;\n}\n\n.image-container {\n  width: auto;\n  height: 15rem;\n  object-fit: contain;\n}\n\n.top-img {\n  width: 100%;\n  height: 100%;\n  border-radius: 5px;\n}\n\n.modal-head {\n  display: flex;\n  width: 33rem;\n}\n\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  width: 70%;\n  background-color: white;\n  margin: 10px auto;\n  align-items: center;\n  padding: 5px;\n  border: 2px solid black;\n}\n\n.units {\n  display: flex;\n  justify-content: space-between;\n  width: 30rem;\n  margin-bottom: 5px;\n  margin-left: -50px;\n}\n\n.left-detail,\n.right-detail {\n  display: flex;\n  flex-direction: column;\n}\n\n#form-1 {\n  display: flex;\n  flex-direction: column;\n  width: 60%;\n  margin-bottom: 5px;\n}\n\n#insight {\n  margin: 10px;\n  height: 50px;\n}\n\n#yourname {\n  margin: 10px;\n  height: 30px;\n}\n\n#submit {\n  width: 25%;\n  height: 30px;\n  align-self: flex-end;\n  margin-right: 10px;\n  cursor: pointer;\n}\n\n.modal-body span {\n  line-height: 30px;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.close {\n  font-size: 5rem;\n  padding: -10rem;\n  cursor: pointer;\n  margin-top: -40px;\n}\n\n.comments {\n  margin-left: -50px;\n}\n\n.comments ul {\n  display: flex;\n  flex-direction: column;\n  list-style-type: none;\n  margin-left: -30px;\n}\n\nh4 {\n  font-size: 18px;\n  margin: 15px auto;\n  width: 10rem;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;400;600;700&display=swap');\n\nbody {\n  margin: 0;\n  font-family: 'Dosis', sans-serif;\n  overflow-x: hidden;\n  color: #343a40;\n}\n\nnav {\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #fefae0;\n  z-index: 8;\n  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\n}\n\nnav ul {\n  padding: 0;\n  list-style-type: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.nav-link {\n  text-decoration: none;\n  color: #606c38;\n  font-size: 18px;\n  letter-spacing: 0.3px;\n  font-weight: 600;\n  margin-right: 40px;\n  transition: all 0.3s ease-in-out;\n}\n\n.nav-link:hover {\n  color: #e05f37;\n}\n\n#headline {\n  width: 100vw;\n  height: 500px;\n  background-image: url('./assets/banner.png');\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: 0 50%;\n  margin-top: 50px;\n}\n\n#recipes-cards {\n  position: relative;\n  width: 80%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 150px auto;\n  gap: 40px;\n}\n\n#recipes-cards h2 {\n  position: absolute;\n  top: -80px;\n  text-align: center;\n  font-size: 35px;\n}\n\n.card {\n  position: relative;\n  width: 290px;\n  height: 450px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 5px 0 35px;\n  margin-top: 40px;\n  border: 1px solid #efe7c4;\n  border-radius: 12px;\n  background-color: rgba(239, 231, 196, 0.5);\n  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;\n}\n\n.meal-thumbnail {\n  width: 280px;\n  height: 280px;\n  object-fit: cover;\n}\n\n.meal-thumbnail img {\n  width: 100%;\n  height: 100%;\n  border-radius: 12px;\n}\n\n.card-header {\n  width: 90%;\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n\n.meal-name {\n  font-size: 23px;\n  margin-top: 15px;\n  color: #9b8834;\n}\n\n.like-btn {\n  min-width: 70px;\n  height: 40px;\n  font-size: 1.2rem;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  color: #bf0603;\n  margin-left: 15px;\n}\n\n.comments-btn {\n  position: absolute;\n  bottom: 25px;\n  cursor: pointer;\n  align-self: flex-start;\n  font-size: 1.2rem;\n  font-family: inherit;\n  color: #fff;\n  font-weight: 600;\n  background-color: #e05f37;\n  border: 1px solid#E05F37;\n  border-radius: 8px;\n  padding: 8px 12px;\n  margin-left: 15px;\n  transition: all 0.5s ease;\n}\n\n.comments-btn:hover {\n  background-color: #ff914d;\n  border: 1px solid #ff914d;\n}\n\nfooter {\n  width: 100vw;\n  background-color: #efe7c4;\n  padding: 15px 0;\n}\n\n.footer {\n  font-size: 20px;\n  font-weight: 600;\n  margin-left: 50px;\n}\n\n.footer a {\n  text-decoration: none;\n  color: #606c38;\n  width: 100px;\n  margin: 0 5px;\n}\n\n.modal {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: none;\n  z-index: 10;\n}\n\n.image-container {\n  width: auto;\n  height: 15rem;\n  object-fit: contain;\n}\n\n.top-img {\n  width: 100%;\n  height: 100%;\n  border-radius: 5px;\n}\n\n.modal-head {\n  display: flex;\n  width: 33rem;\n}\n\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  width: 70%;\n  background-color: white;\n  margin: 10px auto;\n  align-items: center;\n  padding: 5px;\n  border: 2px solid black;\n}\n\n.units {\n  display: flex;\n  justify-content: space-between;\n  width: 30rem;\n  margin-bottom: 5px;\n  margin-left: -50px;\n}\n\n.left-detail,\n.right-detail {\n  display: flex;\n  flex-direction: column;\n}\n\n#form-1 {\n  display: flex;\n  flex-direction: column;\n  width: 60%;\n  margin-bottom: 5px;\n}\n\n#insight {\n  margin: 10px;\n  height: 50px;\n}\n\n#yourname {\n  margin: 10px;\n  height: 30px;\n}\n\n#submit {\n  width: 25%;\n  height: 30px;\n  align-self: flex-end;\n  margin-right: 10px;\n  cursor: pointer;\n}\n\n.modal-body span {\n  line-height: 30px;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.close {\n  font-size: 5rem;\n  padding: -10rem;\n  cursor: pointer;\n  margin-top: -40px;\n}\n\n.comments {\n  margin-left: -50px;\n}\n\n.comments ul {\n  display: flex;\n  flex-direction: column;\n  list-style-type: none;\n  margin-left: -30px;\n}\n\nh4 {\n  font-size: 18px;\n  margin: 15px auto;\n  width: 10rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/banner.png":
/*!*******************************!*\
  !*** ./src/assets/banner.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b5d115db6863db28f5ae.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9B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QUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9kaXNwbGF5LWNhcmRzLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Rhc3R5Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgb3Blbm1vZGFsIGZyb20gJy4vcG9wdXAuanMnO1xuXG5jb25zdCByZWNpcGVDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNpcGVzLWNhcmRzJyk7XG5cbmNvbnN0IGNyZWF0ZUNhcmQgPSAoaW1nLCBuYW1lLCB3aG9sZURhdGEpID0+IHtcbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjYXJkLmNsYXNzTmFtZSA9ICdjYXJkJztcbiAgY2FyZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIm1lYWwtdGh1bWJuYWlsXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiJHtpbWd9XCIgYWx0PVwiXCI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJtZWFsLW5hbWVcIj4ke25hbWV9PC9oMz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImxpa2UtYnRuXCI+PGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWhlYXJ0XCI+PC9pPiAyMDE8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbW1lbnRzLWJ0blwiIGlkPVwiY29tbWVudHMtYnRuXCIgb25jbGljaz1cIm9wZW5tb2RhbCgke3dob2xlRGF0YX0pXCI+Q29tbWVudHM8L2J1dHRvbj5gO1xuXG4gIHJlY2lwZUNhcmRzLmFwcGVuZENoaWxkKGNhcmQpO1xuICAvKlxuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudHMtYnRuJyk7XG4gIGNvbnNvbGUubG9nKGJ0bik7XG4gIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHdob2xlRGF0YSk7XG4gICAgb3Blbm1vZGFsKHdob2xlRGF0YSk7XG4gIH07ICovXG59O1xuXG5jb25zdCBmZXRjaFJlY2lwZXMgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGZldGNoKCdodHRwczovL3d3dy50aGVtZWFsZGIuY29tL2FwaS9qc29uL3YxLzEvZmlsdGVyLnBocD9hPUl0YWxpYW4nKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChqc29uKSA9PiB7XG4gICAgICBqc29uLm1lYWxzLmZvckVhY2goKG1lYWwpID0+IHtcbiAgICAgICAgY3JlYXRlQ2FyZChtZWFsLnN0ck1lYWxUaHVtYiwgbWVhbC5zdHJNZWFsLCBtZWFsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZmV0Y2hSZWNpcGVzOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGZldGNoUmVjaXBlcyBmcm9tICcuL2Rpc3BsYXktY2FyZHMuanMnO1xuXG5mZXRjaFJlY2lwZXMoKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9iYW5uZXIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Eb3Npczp3Z2h0QDIwMDs0MDA7NjAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogJ0Rvc2lzJywgc2Fucy1zZXJpZjtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIGNvbG9yOiAjMzQzYTQwO1xcbn1cXG5cXG5uYXYge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWZhZTA7XFxuICB6LWluZGV4OiA4O1xcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwIDNweCA4cHg7XFxufVxcblxcbm5hdiB1bCB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm5hdi1saW5rIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjNjA2YzM4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIG1hcmdpbi1yaWdodDogNDBweDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ubmF2LWxpbms6aG92ZXIge1xcbiAgY29sb3I6ICNlMDVmMzc7XFxufVxcblxcbiNoZWFkbGluZSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDUwMHB4O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCA1MCU7XFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcbn1cXG5cXG4jcmVjaXBlcy1jYXJkcyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogODAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG1hcmdpbjogMTUwcHggYXV0bztcXG4gIGdhcDogNDBweDtcXG59XFxuXFxuI3JlY2lwZXMtY2FyZHMgaDIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAtODBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMzVweDtcXG59XFxuXFxuLmNhcmQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDI5MHB4O1xcbiAgaGVpZ2h0OiA0NTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweCAwIDM1cHg7XFxuICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2VmZTdjNDtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOSwgMjMxLCAxOTYsIDAuNSk7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDAgNnB4IDEycHggLTJweCwgcmdiYSgwLCAwLCAwLCAwLjMpIDAgM3B4IDdweCAtM3B4O1xcbn1cXG5cXG4ubWVhbC10aHVtYm5haWwge1xcbiAgd2lkdGg6IDI4MHB4O1xcbiAgaGVpZ2h0OiAyODBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG5cXG4ubWVhbC10aHVtYm5haWwgaW1nIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXG59XFxuXFxuLmNhcmQtaGVhZGVyIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG5cXG4ubWVhbC1uYW1lIHtcXG4gIGZvbnQtc2l6ZTogMjNweDtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBjb2xvcjogIzliODgzNDtcXG59XFxuXFxuLmxpa2UtYnRuIHtcXG4gIG1pbi13aWR0aDogNzBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgY29sb3I6ICNiZjA2MDM7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG59XFxuXFxuLmNvbW1lbnRzLWJ0biB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDI1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMDVmMzc7XFxuICBib3JkZXI6IDFweCBzb2xpZCNFMDVGMzc7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwYWRkaW5nOiA4cHggMTJweDtcXG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcXG59XFxuXFxuLmNvbW1lbnRzLWJ0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5MTRkO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmOTE0ZDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmU3YzQ7XFxuICBwYWRkaW5nOiAxNXB4IDA7XFxufVxcblxcbi5mb290ZXIge1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xcbn1cXG5cXG4uZm9vdGVyIGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICM2MDZjMzg7XFxuICB3aWR0aDogMTAwcHg7XFxuICBtYXJnaW46IDAgNXB4O1xcbn1cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNyk7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgei1pbmRleDogMTA7XFxufVxcblxcbi5pbWFnZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IDE1cmVtO1xcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuLnRvcC1pbWcge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5tb2RhbC1oZWFkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMzNyZW07XFxufVxcblxcbi5tb2RhbC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB3aWR0aDogNzAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW46IDEwcHggYXV0bztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLnVuaXRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMzByZW07XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICBtYXJnaW4tbGVmdDogLTUwcHg7XFxufVxcblxcbi5sZWZ0LWRldGFpbCxcXG4ucmlnaHQtZGV0YWlsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jZm9ybS0xIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgd2lkdGg6IDYwJTtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuXFxuI2luc2lnaHQge1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5cXG4jeW91cm5hbWUge1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4jc3VibWl0IHtcXG4gIHdpZHRoOiAyNSU7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLm1vZGFsLWJvZHkgc3BhbiB7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxufVxcblxcbi5jbG9zZSB7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBwYWRkaW5nOiAtMTByZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXJnaW4tdG9wOiAtNDBweDtcXG59XFxuXFxuLmNvbW1lbnRzIHtcXG4gIG1hcmdpbi1sZWZ0OiAtNTBweDtcXG59XFxuXFxuLmNvbW1lbnRzIHVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgbWFyZ2luLWxlZnQ6IC0zMHB4O1xcbn1cXG5cXG5oNCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBtYXJnaW46IDE1cHggYXV0bztcXG4gIHdpZHRoOiAxMHJlbTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFj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QXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RG9zaXM6d2dodEAyMDA7NDAwOzYwMDs3MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogJ0Rvc2lzJywgc2Fucy1zZXJpZjtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIGNvbG9yOiAjMzQzYTQwO1xcbn1cXG5cXG5uYXYge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWZhZTA7XFxuICB6LWluZGV4OiA4O1xcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwIDNweCA4cHg7XFxufVxcblxcbm5hdiB1bCB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm5hdi1saW5rIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjNjA2YzM4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIG1hcmdpbi1yaWdodDogNDBweDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4ubmF2LWxpbms6aG92ZXIge1xcbiAgY29sb3I6ICNlMDVmMzc7XFxufVxcblxcbiNoZWFkbGluZSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDUwMHB4O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2Fzc2V0cy9iYW5uZXIucG5nJyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgNTAlO1xcbiAgbWFyZ2luLXRvcDogNTBweDtcXG59XFxuXFxuI3JlY2lwZXMtY2FyZHMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBtYXJnaW46IDE1MHB4IGF1dG87XFxuICBnYXA6IDQwcHg7XFxufVxcblxcbiNyZWNpcGVzLWNhcmRzIGgyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTgwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDM1cHg7XFxufVxcblxcbi5jYXJkIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAyOTBweDtcXG4gIGhlaWdodDogNDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiA1cHggMCAzNXB4O1xcbiAgbWFyZ2luLXRvcDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZmU3YzQ7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzksIDIzMSwgMTk2LCAwLjUpO1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwIDZweCAxMnB4IC0ycHgsIHJnYmEoMCwgMCwgMCwgMC4zKSAwIDNweCA3cHggLTNweDtcXG59XFxuXFxuLm1lYWwtdGh1bWJuYWlsIHtcXG4gIHdpZHRoOiAyODBweDtcXG4gIGhlaWdodDogMjgwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuXFxuLm1lYWwtdGh1bWJuYWlsIGltZyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxufVxcblxcbi5jYXJkLWhlYWRlciB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG59XFxuXFxuLm1lYWwtbmFtZSB7XFxuICBmb250LXNpemU6IDIzcHg7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgY29sb3I6ICM5Yjg4MzQ7XFxufVxcblxcbi5saWtlLWJ0biB7XFxuICBtaW4td2lkdGg6IDcwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGNvbG9yOiAjYmYwNjAzO1xcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxufVxcblxcbi5jb21tZW50cy1idG4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAyNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcbiAgYm9yZGVyOiAxcHggc29saWQjRTA1RjM3O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcGFkZGluZzogOHB4IDEycHg7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XFxufVxcblxcbi5jb21tZW50cy1idG46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZjkxNGQ7XFxufVxcblxcbmZvb3RlciB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlN2M0O1xcbiAgcGFkZGluZzogMTVweCAwO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBtYXJnaW4tbGVmdDogNTBweDtcXG59XFxuXFxuLmZvb3RlciBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjNjA2YzM4O1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgbWFyZ2luOiAwIDVweDtcXG59XFxuXFxuLm1vZGFsIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHotaW5kZXg6IDEwO1xcbn1cXG5cXG4uaW1hZ2UtY29udGFpbmVyIHtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiAxNXJlbTtcXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XFxufVxcblxcbi50b3AtaW1nIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4ubW9kYWwtaGVhZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDMzcmVtO1xcbn1cXG5cXG4ubW9kYWwtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgd2lkdGg6IDcwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luOiAxMHB4IGF1dG87XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxufVxcblxcbi51bml0cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IC01MHB4O1xcbn1cXG5cXG4ubGVmdC1kZXRhaWwsXFxuLnJpZ2h0LWRldGFpbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI2Zvcm0tMSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHdpZHRoOiA2MCU7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcblxcbiNpbnNpZ2h0IHtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuXFxuI3lvdXJuYW1lIHtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGhlaWdodDogMzBweDtcXG59XFxuXFxuI3N1Ym1pdCB7XFxuICB3aWR0aDogMjUlO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5tb2RhbC1ib2R5IHNwYW4ge1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogNjAwO1xcbn1cXG5cXG4uY2xvc2Uge1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgcGFkZGluZzogLTEwcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbWFyZ2luLXRvcDogLTQwcHg7XFxufVxcblxcbi5jb21tZW50cyB7XFxuICBtYXJnaW4tbGVmdDogLTUwcHg7XFxufVxcblxcbi5jb21tZW50cyB1bCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG59XFxuXFxuaDQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbWFyZ2luOiAxNXB4IGF1dG87XFxuICB3aWR0aDogMTByZW07XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsicmVjaXBlQ2FyZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVDYXJkIiwiaW1nIiwibmFtZSIsIndob2xlRGF0YSIsImNhcmQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJmZXRjaFJlY2lwZXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJtZWFscyIsImZvckVhY2giLCJtZWFsIiwic3RyTWVhbFRodW1iIiwic3RyTWVhbCJdLCJzb3VyY2VSb290IjoiIn0=