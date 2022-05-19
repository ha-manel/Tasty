"use strict";
(self["webpackChunktasty"] = self["webpackChunktasty"] || []).push([["index"],{

/***/ "./src/comments.js":
/*!*************************!*\
  !*** ./src/comments.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getComments": () => (/* binding */ getComments),
/* harmony export */   "postComment": () => (/* binding */ postComment)
/* harmony export */ });
/* harmony import */ var _stats_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats.js */ "./src/stats.js");

const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'FasIWx1EwA6odcY3m4KW';
const commentsHeader = document.querySelector('.comments-container h4');

const getComments = async id => {
  commentsHeader.innerHTML = 'Comments (0)';
  await fetch(`${baseURL}${appID}/comments?item_id=${id}`).then(reponse => reponse.json()).then(json => {
    (0,_stats_js__WEBPACK_IMPORTED_MODULE_0__.commentsCounter)(json, commentsHeader);
    const commentsList = document.querySelector('.comment');
    commentsList.innerHTML = '';
    json.forEach(comment => {
      const newComment = document.createElement('li');
      newComment.innerHTML = `<span class="date">${comment.creation_date}</span><span class="name">${comment.username}:</span> <span
              class="comment-text">${comment.comment}</span>`;
      commentsList.appendChild(newComment);
    });
  });
};

const postComment = async (username, comment, id) => {
  await fetch(`${baseURL}${appID}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username,
      comment
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(() => {
    getComments(id);
  });
};



/***/ }),

/***/ "./src/display-cards.js":
/*!******************************!*\
  !*** ./src/display-cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchRecipes": () => (/* binding */ fetchRecipes),
/* harmony export */   "itemsCounter": () => (/* reexport safe */ _stats_js__WEBPACK_IMPORTED_MODULE_0__.itemsCounter)
/* harmony export */ });
/* harmony import */ var _stats_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats.js */ "./src/stats.js");

const recipeCards = document.querySelector('#recipes-cards');
const recipesLink = document.querySelector('#recipes-link');

const createCard = (img, name, id) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = id;
  card.innerHTML = `<div class="meal-thumbnail">
        <img src="${img}" alt="">
      </div>
      <div class="card-header">
        <h3 class="meal-name">${name}</h3>
        <button class="like-btn"><i class="fa-regular fa-heart"></i> <span class="likes-count">0</span></button>
      </div>
      <button class="comments-btn" id="${id}">Comments</button>`;
  recipeCards.appendChild(card);
};

const fetchRecipes = async () => {
  await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian').then(response => response.json()).then(json => {
    (0,_stats_js__WEBPACK_IMPORTED_MODULE_0__.itemsCounter)(json.meals, recipesLink);
    json.meals.forEach(meal => {
      createCard(meal.strMealThumb, meal.strMeal, meal.idMeal);
    });
  });
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _display_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-cards.js */ "./src/display-cards.js");
/* harmony import */ var _like_item_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./like-item.js */ "./src/like-item.js");
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup.js */ "./src/popup.js");





const getData = () => {
  (0,_like_item_js__WEBPACK_IMPORTED_MODULE_2__.getLikes)();
  (0,_popup_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_like_item_js__WEBPACK_IMPORTED_MODULE_2__.postLike)();
};

const display = async () => {
  await (0,_display_cards_js__WEBPACK_IMPORTED_MODULE_1__.fetchRecipes)();
  await getData();
};

display();

/***/ }),

/***/ "./src/like-item.js":
/*!**************************!*\
  !*** ./src/like-item.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "postLike": () => (/* binding */ postLike)
/* harmony export */ });
const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'FiApALAkslTGOrakNZ0b';

const getLikes = async () => {
  const cards = document.querySelectorAll('.card');
  const likesCount = document.querySelectorAll('.likes-count');
  await fetch(`${baseURL}${appID}/likes/`).then(response => response.json()).then(json => {
    cards.forEach((card, index) => {
      json.forEach(item => {
        if (item.item_id === card.id) {
          likesCount[index].innerHTML = item.likes;
        }
      });
    });
  });
};

const postLike = async () => {
  const likeBtns = document.querySelectorAll('.like-btn');
  const likeBtnIcon = document.querySelectorAll('.fa-heart');
  const likesCount = document.querySelectorAll('.likes-count');
  const cards = document.querySelectorAll('.card');
  likeBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
      likeBtnIcon[index].classList.remove('fa-regular');
      likeBtnIcon[index].classList.add('fa-solid');
      likesCount[index].innerHTML = Number(likesCount[index].innerHTML) + 1;
      fetch(`${baseURL}${appID}/likes/`, {
        method: 'POST',
        body: JSON.stringify({
          item_id: cards[index].id
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
    });
  });
};



/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.js */ "./src/comments.js");

const modal = document.querySelector('.comment-modal');
const modalImg = document.querySelector('.popup-image img');
const modalTitle = document.querySelector('.item-info h3');
const modalRecipe = document.querySelector('.recipe');
const closeBtn = document.querySelector('.close-btn');
const formContainer = document.querySelector('.add-comment');
const baseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const createForm = id => {
  formContainer.innerHTML = '<h4> Add a comment</h4>';
  const form = document.createElement('form');
  form.id = id;
  form.innerHTML = `<input type="text" placeholder="Your Name" id="name" required>
          <input type="text" placeholder="Write your comment" id="comment" required>
          <input type="submit" value="Comment" id="submit-btn">`;
  formContainer.appendChild(form);
  const name = document.querySelector('#name');
  const comment = document.querySelector('#comment');
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (name.value && comment.value) {
      (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.postComment)(name.value, comment.value, form.id);
      form.reset();
    }
  });
};

const displayPopup = () => {
  const commentBtns = document.querySelectorAll('.comments-btn');
  commentBtns.forEach(button => {
    button.addEventListener('click', () => {
      createForm(button.id);
      (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.getComments)(button.id);
      fetch(`${baseURL}${button.id}`).then(response => response.json()).then(json => {
        modal.classList.add('active');
        document.querySelector('body').classList.add('no-scroll');
        modalImg.setAttribute('src', json.meals[0].strMealThumb);
        modalTitle.innerHTML = json.meals[0].strMeal;
        modalRecipe.innerHTML = json.meals[0].strInstructions;
      });
    });
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.querySelector('body').classList.remove('no-scroll');
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayPopup);

/***/ }),

/***/ "./src/stats.js":
/*!**********************!*\
  !*** ./src/stats.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commentsCounter": () => (/* binding */ commentsCounter),
/* harmony export */   "itemsCounter": () => (/* binding */ itemsCounter)
/* harmony export */ });
const itemsCounter = (data, link) => {
  link.innerHTML = `Recipes (${data.length})`;
  return data.length;
};

const commentsCounter = (data, link) => {
  if (data.length) {
    link.innerHTML = `Comments (${data.length})`;
  }

  return data.length;
};



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
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/banner-mobile.png */ "./src/assets/banner-mobile.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Dosis:wght@200;400;500;600;700&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n  margin: 0;\r\n  font-family: 'Dosis', sans-serif;\r\n  overflow-x: hidden;\r\n  color: #343a40;\r\n}\r\n\r\nbody.no-scroll {\r\n  overflow: hidden;\r\n}\r\n\r\nnav {\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100vw;\r\n  height: 50px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  z-index: 1;\r\n  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\r\n}\r\n\r\nnav ul {\r\n  padding: 0;\r\n  list-style-type: none;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.nav-link {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  font-size: 18px;\r\n  letter-spacing: 0.3px;\r\n  font-weight: 600;\r\n  margin: 0 20px;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #e05f37;\r\n}\r\n\r\n#headline {\r\n  width: 100vw;\r\n  height: 500px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: 0 50%;\r\n  margin-top: 50px;\r\n}\r\n\r\n#recipes-cards {\r\n  position: relative;\r\n  width: 80%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n  margin: 150px auto;\r\n}\r\n\r\n#recipes-cards h2 {\r\n  position: absolute;\r\n  top: -80px;\r\n  text-align: center;\r\n  font-size: 35px;\r\n}\r\n\r\n.card {\r\n  position: relative;\r\n  width: 290px;\r\n  height: 450px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  padding: 5px 0 35px;\r\n  margin: 20px;\r\n  border: 1px solid #efe7c4;\r\n  border-radius: 12px;\r\n  background-color: rgba(239, 231, 196, 0.5);\r\n  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;\r\n}\r\n\r\n.meal-thumbnail {\r\n  width: 97%;\r\n  height: 280px;\r\n  object-fit: cover;\r\n}\r\n\r\n.meal-thumbnail img {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 12px;\r\n}\r\n\r\n.card-header {\r\n  width: 90%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n}\r\n\r\n.meal-name {\r\n  font-size: 23px;\r\n  margin-top: 15px;\r\n  color: #9b8834;\r\n}\r\n\r\n.like-btn {\r\n  cursor: pointer;\r\n  min-width: 70px;\r\n  height: 40px;\r\n  font-size: 1.3rem;\r\n  background-color: transparent;\r\n  border: none;\r\n  outline: none;\r\n  color: #bf0603;\r\n  margin-left: 15px;\r\n}\r\n\r\n.comments-btn {\r\n  position: absolute;\r\n  bottom: 25px;\r\n  cursor: pointer;\r\n  align-self: flex-start;\r\n  font-size: 1.2rem;\r\n  font-family: inherit;\r\n  color: #fff;\r\n  font-weight: 600;\r\n  background-color: #e05f37;\r\n  border: 1px solid#E05F37;\r\n  border-radius: 8px;\r\n  padding: 8px 12px;\r\n  margin-left: 15px;\r\n  transition: all 0.5s ease;\r\n}\r\n\r\n.comments-btn:hover {\r\n  background-color: #ff914d;\r\n  border: 1px solid #ff914d;\r\n}\r\n\r\n.comment-modal {\r\n  display: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background-color: rgba(52, 58, 64, 0.8);\r\n  justify-content: center;\r\n  padding: 50px 0;\r\n  box-sizing: border-box;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.comment-modal.active {\r\n  display: flex;\r\n  z-index: 3;\r\n}\r\n\r\n.popup-window {\r\n  width: 60%;\r\n  min-width: 420px;\r\n  max-width: 700px;\r\n  /* stylelint-disable-next-line csstree/validator */\r\n  height: fit-content;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  border-radius: 12px;\r\n  padding: 0 30px 30px;\r\n}\r\n\r\n.close-btn {\r\n  cursor: pointer;\r\n  font-size: 70px;\r\n  align-self: flex-end;\r\n}\r\n\r\n.popup-image {\r\n  width: 90%;\r\n}\r\n\r\n.popup-image img {\r\n  width: 100%;\r\n  max-height: 300px;\r\n  border-radius: 12px;\r\n  object-fit: cover;\r\n}\r\n\r\n.item-info {\r\n  width: 87%;\r\n}\r\n\r\n.item-info h3 {\r\n  font-size: 35px;\r\n  color: #606c38;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.recipe {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  letter-spacing: 0.5px;\r\n  color: #000;\r\n  line-height: 1.5;\r\n}\r\n\r\n.comments-container {\r\n  width: 80%;\r\n  max-width: 400px;\r\n}\r\n\r\n.comment-modal h4 {\r\n  font-size: 25px;\r\n  text-align: center;\r\n}\r\n\r\n.comment {\r\n  list-style-type: none;\r\n  padding: 0;\r\n}\r\n\r\n.comment li {\r\n  margin-bottom: 8px;\r\n  border-bottom: 1px solid #ced4da;\r\n  padding-bottom: 8px;\r\n}\r\n\r\n.comment span {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  margin-right: 5px;\r\n}\r\n\r\n.comment .date {\r\n  margin-right: 20px;\r\n}\r\n\r\n.comment .comment-text {\r\n  font-weight: 500;\r\n}\r\n\r\n.add-comment {\r\n  width: 70%;\r\n  max-width: 300px;\r\n}\r\n\r\n.add-comment form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 0 auto;\r\n}\r\n\r\n.add-comment form input {\r\n  padding: 8px 12px;\r\n  font-size: 14px;\r\n  border: 1px solid #ced4da;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.add-comment form input:focus {\r\n  outline: 2px solid #ced4da;\r\n}\r\n\r\n#submit-btn {\r\n  cursor: pointer;\r\n  width: 90px;\r\n  background-color: #e05f37;\r\n  color: #fff;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n#submit-btn:hover {\r\n  background-color: #ff914d;\r\n}\r\n\r\nfooter {\r\n  width: 100vw;\r\n  background-color: #efe7c4;\r\n  padding: 15px 0;\r\n}\r\n\r\n.footer {\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n  margin-left: 50px;\r\n}\r\n\r\n.footer a {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  width: 100px;\r\n  margin: 0 5px;\r\n}\r\n\r\n@media screen and (max-width: 500px) {\r\n  .nav-link {\r\n    font-size: 15px;\r\n    margin: 0 10px;\r\n  }\r\n\r\n  #headline {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\r\n    background-position: 50% 50%;\r\n  }\r\n\r\n  #recipes-cards {\r\n    width: 100%;\r\n  }\r\n\r\n  #recipes-cards h2 {\r\n    font-size: 28px;\r\n  }\r\n\r\n  .card {\r\n    width: 90%;\r\n    min-width: 230px;\r\n    max-width: 290px;\r\n  }\r\n\r\n  .meal-name {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .comments-btn {\r\n    font-size: 1rem;\r\n  }\r\n\r\n  .popup-window {\r\n    width: 90%;\r\n    min-width: 200px;\r\n    padding: 0 8px 30px;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  .item-info h3 {\r\n    font-size: 26px;\r\n  }\r\n\r\n  .comment-modal h4 {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .comment span {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .add-comment form input {\r\n    font-size: 12px;\r\n  }\r\n\r\n  .footer {\r\n    font-size: 17px;\r\n    margin-left: 5%;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;400;500;600;700&display=swap');\r\n\r\nbody {\r\n  margin: 0;\r\n  font-family: 'Dosis', sans-serif;\r\n  overflow-x: hidden;\r\n  color: #343a40;\r\n}\r\n\r\nbody.no-scroll {\r\n  overflow: hidden;\r\n}\r\n\r\nnav {\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100vw;\r\n  height: 50px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  z-index: 1;\r\n  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\r\n}\r\n\r\nnav ul {\r\n  padding: 0;\r\n  list-style-type: none;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.nav-link {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  font-size: 18px;\r\n  letter-spacing: 0.3px;\r\n  font-weight: 600;\r\n  margin: 0 20px;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #e05f37;\r\n}\r\n\r\n#headline {\r\n  width: 100vw;\r\n  height: 500px;\r\n  background-image: url('./assets/banner.png');\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: 0 50%;\r\n  margin-top: 50px;\r\n}\r\n\r\n#recipes-cards {\r\n  position: relative;\r\n  width: 80%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n  margin: 150px auto;\r\n}\r\n\r\n#recipes-cards h2 {\r\n  position: absolute;\r\n  top: -80px;\r\n  text-align: center;\r\n  font-size: 35px;\r\n}\r\n\r\n.card {\r\n  position: relative;\r\n  width: 290px;\r\n  height: 450px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  padding: 5px 0 35px;\r\n  margin: 20px;\r\n  border: 1px solid #efe7c4;\r\n  border-radius: 12px;\r\n  background-color: rgba(239, 231, 196, 0.5);\r\n  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;\r\n}\r\n\r\n.meal-thumbnail {\r\n  width: 97%;\r\n  height: 280px;\r\n  object-fit: cover;\r\n}\r\n\r\n.meal-thumbnail img {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 12px;\r\n}\r\n\r\n.card-header {\r\n  width: 90%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n}\r\n\r\n.meal-name {\r\n  font-size: 23px;\r\n  margin-top: 15px;\r\n  color: #9b8834;\r\n}\r\n\r\n.like-btn {\r\n  cursor: pointer;\r\n  min-width: 70px;\r\n  height: 40px;\r\n  font-size: 1.3rem;\r\n  background-color: transparent;\r\n  border: none;\r\n  outline: none;\r\n  color: #bf0603;\r\n  margin-left: 15px;\r\n}\r\n\r\n.comments-btn {\r\n  position: absolute;\r\n  bottom: 25px;\r\n  cursor: pointer;\r\n  align-self: flex-start;\r\n  font-size: 1.2rem;\r\n  font-family: inherit;\r\n  color: #fff;\r\n  font-weight: 600;\r\n  background-color: #e05f37;\r\n  border: 1px solid#E05F37;\r\n  border-radius: 8px;\r\n  padding: 8px 12px;\r\n  margin-left: 15px;\r\n  transition: all 0.5s ease;\r\n}\r\n\r\n.comments-btn:hover {\r\n  background-color: #ff914d;\r\n  border: 1px solid #ff914d;\r\n}\r\n\r\n.comment-modal {\r\n  display: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background-color: rgba(52, 58, 64, 0.8);\r\n  justify-content: center;\r\n  padding: 50px 0;\r\n  box-sizing: border-box;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.comment-modal.active {\r\n  display: flex;\r\n  z-index: 3;\r\n}\r\n\r\n.popup-window {\r\n  width: 60%;\r\n  min-width: 420px;\r\n  max-width: 700px;\r\n  /* stylelint-disable-next-line csstree/validator */\r\n  height: fit-content;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  border-radius: 12px;\r\n  padding: 0 30px 30px;\r\n}\r\n\r\n.close-btn {\r\n  cursor: pointer;\r\n  font-size: 70px;\r\n  align-self: flex-end;\r\n}\r\n\r\n.popup-image {\r\n  width: 90%;\r\n}\r\n\r\n.popup-image img {\r\n  width: 100%;\r\n  max-height: 300px;\r\n  border-radius: 12px;\r\n  object-fit: cover;\r\n}\r\n\r\n.item-info {\r\n  width: 87%;\r\n}\r\n\r\n.item-info h3 {\r\n  font-size: 35px;\r\n  color: #606c38;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.recipe {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  letter-spacing: 0.5px;\r\n  color: #000;\r\n  line-height: 1.5;\r\n}\r\n\r\n.comments-container {\r\n  width: 80%;\r\n  max-width: 400px;\r\n}\r\n\r\n.comment-modal h4 {\r\n  font-size: 25px;\r\n  text-align: center;\r\n}\r\n\r\n.comment {\r\n  list-style-type: none;\r\n  padding: 0;\r\n}\r\n\r\n.comment li {\r\n  margin-bottom: 8px;\r\n  border-bottom: 1px solid #ced4da;\r\n  padding-bottom: 8px;\r\n}\r\n\r\n.comment span {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  margin-right: 5px;\r\n}\r\n\r\n.comment .date {\r\n  margin-right: 20px;\r\n}\r\n\r\n.comment .comment-text {\r\n  font-weight: 500;\r\n}\r\n\r\n.add-comment {\r\n  width: 70%;\r\n  max-width: 300px;\r\n}\r\n\r\n.add-comment form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 0 auto;\r\n}\r\n\r\n.add-comment form input {\r\n  padding: 8px 12px;\r\n  font-size: 14px;\r\n  border: 1px solid #ced4da;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.add-comment form input:focus {\r\n  outline: 2px solid #ced4da;\r\n}\r\n\r\n#submit-btn {\r\n  cursor: pointer;\r\n  width: 90px;\r\n  background-color: #e05f37;\r\n  color: #fff;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n#submit-btn:hover {\r\n  background-color: #ff914d;\r\n}\r\n\r\nfooter {\r\n  width: 100vw;\r\n  background-color: #efe7c4;\r\n  padding: 15px 0;\r\n}\r\n\r\n.footer {\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n  margin-left: 50px;\r\n}\r\n\r\n.footer a {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  width: 100px;\r\n  margin: 0 5px;\r\n}\r\n\r\n@media screen and (max-width: 500px) {\r\n  .nav-link {\r\n    font-size: 15px;\r\n    margin: 0 10px;\r\n  }\r\n\r\n  #headline {\r\n    background-image: url('./assets/banner-mobile.png');\r\n    background-position: 50% 50%;\r\n  }\r\n\r\n  #recipes-cards {\r\n    width: 100%;\r\n  }\r\n\r\n  #recipes-cards h2 {\r\n    font-size: 28px;\r\n  }\r\n\r\n  .card {\r\n    width: 90%;\r\n    min-width: 230px;\r\n    max-width: 290px;\r\n  }\r\n\r\n  .meal-name {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .comments-btn {\r\n    font-size: 1rem;\r\n  }\r\n\r\n  .popup-window {\r\n    width: 90%;\r\n    min-width: 200px;\r\n    padding: 0 8px 30px;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  .item-info h3 {\r\n    font-size: 26px;\r\n  }\r\n\r\n  .comment-modal h4 {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .comment span {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .add-comment form input {\r\n    font-size: 12px;\r\n  }\r\n\r\n  .footer {\r\n    font-size: 17px;\r\n    margin-left: 5%;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
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

/***/ "./src/assets/banner-mobile.png":
/*!**************************************!*\
  !*** ./src/assets/banner-mobile.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "28ce9d563df03b39779e.png";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFP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QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9kaXNwbGF5LWNhcmRzLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Rhc3R5Ly4vc3JjL2xpa2UtaXRlbS5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9wb3B1cC5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9zdGF0cy5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tbWVudHNDb3VudGVyIH0gZnJvbSAnLi9zdGF0cy5qcyc7XG5cbmNvbnN0IGJhc2VVUkwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvJztcbmNvbnN0IGFwcElEID0gJ0Zhc0lXeDFFd0E2b2RjWTNtNEtXJztcblxuY29uc3QgY29tbWVudHNIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY29udGFpbmVyIGg0Jyk7XG5cbmNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGlkKSA9PiB7XG4gIGNvbW1lbnRzSGVhZGVyLmlubmVySFRNTCA9ICdDb21tZW50cyAoMCknO1xuXG4gIGF3YWl0IGZldGNoKGAke2Jhc2VVUkx9JHthcHBJRH0vY29tbWVudHM/aXRlbV9pZD0ke2lkfWApXG4gICAgLnRoZW4oKHJlcG9uc2UpID0+IHJlcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChqc29uKSA9PiB7XG4gICAgICBjb21tZW50c0NvdW50ZXIoanNvbiwgY29tbWVudHNIZWFkZXIpO1xuICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQnKTtcbiAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgIGpzb24uZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdDb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbmV3Q29tbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkYXRlXCI+JHtjb21tZW50LmNyZWF0aW9uX2RhdGV9PC9zcGFuPjxzcGFuIGNsYXNzPVwibmFtZVwiPiR7Y29tbWVudC51c2VybmFtZX06PC9zcGFuPiA8c3BhblxuICAgICAgICAgICAgICBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7Y29tbWVudC5jb21tZW50fTwvc3Bhbj5gO1xuICAgICAgICBjb21tZW50c0xpc3QuYXBwZW5kQ2hpbGQobmV3Q29tbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHBvc3RDb21tZW50ID0gYXN5bmMgKHVzZXJuYW1lLCBjb21tZW50LCBpZCkgPT4ge1xuICBhd2FpdCBmZXRjaChgJHtiYXNlVVJMfSR7YXBwSUR9L2NvbW1lbnRzL2AsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBpZCxcbiAgICAgIHVzZXJuYW1lLFxuICAgICAgY29tbWVudCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pLnRoZW4oKCkgPT4ge1xuICAgIGdldENvbW1lbnRzKGlkKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBwb3N0Q29tbWVudCwgZ2V0Q29tbWVudHMgfTtcbiIsImltcG9ydCB7IGl0ZW1zQ291bnRlciB9IGZyb20gJy4vc3RhdHMuanMnO1xuXG5jb25zdCByZWNpcGVDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNpcGVzLWNhcmRzJyk7XG5jb25zdCByZWNpcGVzTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNpcGVzLWxpbmsnKTtcblxuY29uc3QgY3JlYXRlQ2FyZCA9IChpbWcsIG5hbWUsIGlkKSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2FyZC5jbGFzc05hbWUgPSAnY2FyZCc7XG4gIGNhcmQuaWQgPSBpZDtcbiAgY2FyZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIm1lYWwtdGh1bWJuYWlsXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiJHtpbWd9XCIgYWx0PVwiXCI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJtZWFsLW5hbWVcIj4ke25hbWV9PC9oMz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImxpa2UtYnRuXCI+PGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWhlYXJ0XCI+PC9pPiA8c3BhbiBjbGFzcz1cImxpa2VzLWNvdW50XCI+MDwvc3Bhbj48L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbW1lbnRzLWJ0blwiIGlkPVwiJHtpZH1cIj5Db21tZW50czwvYnV0dG9uPmA7XG5cbiAgcmVjaXBlQ2FyZHMuYXBwZW5kQ2hpbGQoY2FyZCk7XG59O1xuXG5jb25zdCBmZXRjaFJlY2lwZXMgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGZldGNoKCdodHRwczovL3d3dy50aGVtZWFsZGIuY29tL2FwaS9qc29uL3YxLzEvZmlsdGVyLnBocD9hPUl0YWxpYW4nKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChqc29uKSA9PiB7XG4gICAgICBpdGVtc0NvdW50ZXIoanNvbi5tZWFscywgcmVjaXBlc0xpbmspO1xuICAgICAganNvbi5tZWFscy5mb3JFYWNoKChtZWFsKSA9PiB7XG4gICAgICAgIGNyZWF0ZUNhcmQobWVhbC5zdHJNZWFsVGh1bWIsIG1lYWwuc3RyTWVhbCwgbWVhbC5pZE1lYWwpO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgeyBmZXRjaFJlY2lwZXMsIGl0ZW1zQ291bnRlciB9OyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgZmV0Y2hSZWNpcGVzIH0gZnJvbSAnLi9kaXNwbGF5LWNhcmRzLmpzJztcbmltcG9ydCB7IGdldExpa2VzLCBwb3N0TGlrZSB9IGZyb20gJy4vbGlrZS1pdGVtLmpzJztcbmltcG9ydCBkaXNwbGF5UG9wdXAgZnJvbSAnLi9wb3B1cC5qcyc7XG5cbmNvbnN0IGdldERhdGEgPSAoKSA9PiB7XG4gIGdldExpa2VzKCk7XG4gIGRpc3BsYXlQb3B1cCgpO1xuICBwb3N0TGlrZSgpO1xufTtcblxuY29uc3QgZGlzcGxheSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZmV0Y2hSZWNpcGVzKCk7XG4gIGF3YWl0IGdldERhdGEoKTtcbn07XG5cbmRpc3BsYXkoKTtcbiIsImNvbnN0IGJhc2VVUkwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvJztcbmNvbnN0IGFwcElEID0gJ0ZpQXBBTEFrc2xUR09yYWtOWjBiJztcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgY29uc3QgbGlrZXNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saWtlcy1jb3VudCcpO1xuICBhd2FpdCBmZXRjaChgJHtiYXNlVVJMfSR7YXBwSUR9L2xpa2VzL2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGpzb24pID0+IHtcbiAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XG4gICAgICAgIGpzb24uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1faWQgPT09IGNhcmQuaWQpIHtcbiAgICAgICAgICAgIGxpa2VzQ291bnRbaW5kZXhdLmlubmVySFRNTCA9IGl0ZW0ubGlrZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuY29uc3QgcG9zdExpa2UgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGxpa2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpa2UtYnRuJyk7XG4gIGNvbnN0IGxpa2VCdG5JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhLWhlYXJ0Jyk7XG4gIGNvbnN0IGxpa2VzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZXMtY291bnQnKTtcbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xuXG4gIGxpa2VCdG5zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsaWtlQnRuSWNvbltpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtcmVndWxhcicpO1xuICAgICAgbGlrZUJ0bkljb25baW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gICAgICBsaWtlc0NvdW50W2luZGV4XS5pbm5lckhUTUwgPSBOdW1iZXIobGlrZXNDb3VudFtpbmRleF0uaW5uZXJIVE1MKSArIDE7XG5cbiAgICAgIGZldGNoKGAke2Jhc2VVUkx9JHthcHBJRH0vbGlrZXMvYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1faWQ6IGNhcmRzW2luZGV4XS5pZCxcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlIH07XG4iLCJpbXBvcnQgeyBwb3N0Q29tbWVudCwgZ2V0Q29tbWVudHMgfSBmcm9tICcuL2NvbW1lbnRzLmpzJztcblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1tb2RhbCcpO1xuY29uc3QgbW9kYWxJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtaW1hZ2UgaW1nJyk7XG5jb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW0taW5mbyBoMycpO1xuY29uc3QgbW9kYWxSZWNpcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVjaXBlJyk7XG5jb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbmNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNvbW1lbnQnKTtcblxuY29uc3QgYmFzZVVSTCA9ICdodHRwczovL3d3dy50aGVtZWFsZGIuY29tL2FwaS9qc29uL3YxLzEvbG9va3VwLnBocD9pPSc7XG5cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoaWQpID0+IHtcbiAgZm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGg0PiBBZGQgYSBjb21tZW50PC9oND4nO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmb3JtLmlkID0gaWQ7XG4gIGZvcm0uaW5uZXJIVE1MID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBOYW1lXCIgaWQ9XCJuYW1lXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIGNvbW1lbnRcIiBpZD1cImNvbW1lbnRcIiByZXF1aXJlZD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQ29tbWVudFwiIGlkPVwic3VibWl0LWJ0blwiPmA7XG4gIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpO1xuICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnQnKTtcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAobmFtZS52YWx1ZSAmJiBjb21tZW50LnZhbHVlKSB7XG4gICAgICBwb3N0Q29tbWVudChuYW1lLnZhbHVlLCBjb21tZW50LnZhbHVlLCBmb3JtLmlkKTtcbiAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICBjb25zdCBjb21tZW50QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50cy1idG4nKTtcblxuICBjb21tZW50QnRucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjcmVhdGVGb3JtKGJ1dHRvbi5pZCk7XG4gICAgICBnZXRDb21tZW50cyhidXR0b24uaWQpO1xuXG4gICAgICBmZXRjaChgJHtiYXNlVVJMfSR7YnV0dG9uLmlkfWApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCduby1zY3JvbGwnKTtcbiAgICAgICAgICBtb2RhbEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGpzb24ubWVhbHNbMF0uc3RyTWVhbFRodW1iKTtcbiAgICAgICAgICBtb2RhbFRpdGxlLmlubmVySFRNTCA9IGpzb24ubWVhbHNbMF0uc3RyTWVhbDtcbiAgICAgICAgICBtb2RhbFJlY2lwZS5pbm5lckhUTUwgPSBqc29uLm1lYWxzWzBdLnN0ckluc3RydWN0aW9ucztcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCduby1zY3JvbGwnKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5UG9wdXA7IiwiY29uc3QgaXRlbXNDb3VudGVyID0gKGRhdGEsIGxpbmspID0+IHtcbiAgbGluay5pbm5lckhUTUwgPSBgUmVjaXBlcyAoJHtkYXRhLmxlbmd0aH0pYDtcbiAgcmV0dXJuIGRhdGEubGVuZ3RoO1xufTtcblxuY29uc3QgY29tbWVudHNDb3VudGVyID0gKGRhdGEsIGxpbmspID0+IHtcbiAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgbGluay5pbm5lckhUTUwgPSBgQ29tbWVudHMgKCR7ZGF0YS5sZW5ndGh9KWA7XG4gIH1cbiAgcmV0dXJuIGRhdGEubGVuZ3RoO1xufTtcblxuZXhwb3J0IHsgaXRlbXNDb3VudGVyLCBjb21tZW50c0NvdW50ZXIgfTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvYmFubmVyLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2Jhbm5lci1tb2JpbGUucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Eb3Npczp3Z2h0QDIwMDs0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnRG9zaXMnLCBzYW5zLXNlcmlmO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbiAgY29sb3I6ICMzNDNhNDA7XFxyXFxufVxcclxcblxcclxcbmJvZHkubm8tc2Nyb2xsIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbm5hdiB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDA7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmFlMDtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMjQpIDAgM3B4IDhweDtcXHJcXG59XFxyXFxuXFxyXFxubmF2IHVsIHtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2LWxpbmsge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICBmb250LXNpemU6IDE4cHg7XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgbWFyZ2luOiAwIDIwcHg7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdi1saW5rOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiAjZTA1ZjM3O1xcclxcbn1cXHJcXG5cXHJcXG4jaGVhZGxpbmUge1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgaGVpZ2h0OiA1MDBweDtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgNTAlO1xcclxcbiAgbWFyZ2luLXRvcDogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3JlY2lwZXMtY2FyZHMge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICBtYXJnaW46IDE1MHB4IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNyZWNpcGVzLWNhcmRzIGgyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogLTgwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDM1cHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHdpZHRoOiAyOTBweDtcXHJcXG4gIGhlaWdodDogNDUwcHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiA1cHggMCAzNXB4O1xcclxcbiAgbWFyZ2luOiAyMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2VmZTdjNDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOSwgMjMxLCAxOTYsIDAuNSk7XFxyXFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDAgNnB4IDEycHggLTJweCwgcmdiYSgwLCAwLCAwLCAwLjMpIDAgM3B4IDdweCAtM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVhbC10aHVtYm5haWwge1xcclxcbiAgd2lkdGg6IDk3JTtcXHJcXG4gIGhlaWdodDogMjgwcHg7XFxyXFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtdGh1bWJuYWlsIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWhlYWRlciB7XFxyXFxuICB3aWR0aDogOTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtbmFtZSB7XFxyXFxuICBmb250LXNpemU6IDIzcHg7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgY29sb3I6ICM5Yjg4MzQ7XFxyXFxufVxcclxcblxcclxcbi5saWtlLWJ0biB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBtaW4td2lkdGg6IDcwcHg7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBmb250LXNpemU6IDEuM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGNvbG9yOiAjYmYwNjAzO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1idG4ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgYm90dG9tOiAyNXB4O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXHJcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQjRTA1RjM3O1xcclxcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcclxcbiAgcGFkZGluZzogOHB4IDEycHg7XFxyXFxuICBtYXJnaW4tbGVmdDogMTVweDtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1idG46aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZjkxNGQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUyLCA1OCwgNjQsIDAuOCk7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDUwcHggMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsLmFjdGl2ZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgei1pbmRleDogMztcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLXdpbmRvdyB7XFxyXFxuICB3aWR0aDogNjAlO1xcclxcbiAgbWluLXdpZHRoOiA0MjBweDtcXHJcXG4gIG1heC13aWR0aDogNzAwcHg7XFxyXFxuICAvKiBzdHlsZWxpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY3NzdHJlZS92YWxpZGF0b3IgKi9cXHJcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmYWUwO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDAgMzBweCAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xvc2UtYnRuIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogNzBweDtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wdXAtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDkwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLWltYWdlIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbS1pbmZvIHtcXHJcXG4gIHdpZHRoOiA4NyU7XFxyXFxufVxcclxcblxcclxcbi5pdGVtLWluZm8gaDMge1xcclxcbiAgZm9udC1zaXplOiAzNXB4O1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVjaXBlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1jb250YWluZXIge1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIG1heC13aWR0aDogNDAwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsIGg0IHtcXHJcXG4gIGZvbnQtc2l6ZTogMjVweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQge1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQgbGkge1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWQ0ZGE7XFxyXFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTdweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQgLmRhdGUge1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCAuY29tbWVudC10ZXh0IHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxufVxcclxcblxcclxcbi5hZGQtY29tbWVudCB7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWF4LXdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkZC1jb21tZW50IGZvcm0ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSBpbnB1dCB7XFxyXFxuICBwYWRkaW5nOiA4cHggMTJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ0ZGE7XFxyXFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSBpbnB1dDpmb2N1cyB7XFxyXFxuICBvdXRsaW5lOiAycHggc29saWQgI2NlZDRkYTtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdC1idG4ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgd2lkdGg6IDkwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdC1idG46aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmU3YzQ7XFxyXFxuICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbi5mb290ZXIge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICB3aWR0aDogMTAwcHg7XFxyXFxuICBtYXJnaW46IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweCkge1xcclxcbiAgLm5hdi1saW5rIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgICBtYXJnaW46IDAgMTBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNoZWFkbGluZSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjcmVjaXBlcy1jYXJkcyB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgfVxcclxcblxcclxcbiAgI3JlY2lwZXMtY2FyZHMgaDIge1xcclxcbiAgICBmb250LXNpemU6IDI4cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY2FyZCB7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIG1pbi13aWR0aDogMjMwcHg7XFxyXFxuICAgIG1heC13aWR0aDogMjkwcHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubWVhbC1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmNvbW1lbnRzLWJ0biB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wb3B1cC13aW5kb3cge1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcbiAgICBtaW4td2lkdGg6IDIwMHB4O1xcclxcbiAgICBwYWRkaW5nOiAwIDhweCAzMHB4O1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgfVxcclxcblxcclxcbiAgLml0ZW0taW5mbyBoMyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjZweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jb21tZW50LW1vZGFsIGg0IHtcXHJcXG4gICAgZm9udC1zaXplOiAyMnB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmNvbW1lbnQgc3BhbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5hZGQtY29tbWVudCBmb3JtIGlucHV0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmZvb3RlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDUlO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0UsU0FBUztFQUNULGdDQUFnQztFQUNoQyxrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixNQUFNO0VBQ04sWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsVUFBVTtFQUNWLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLFVBQVU7RUFDVixxQkFBcUI7RUFDckIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYix5REFBNEM7RUFDNUMsc0JBQXNCO0VBQ3RCLDRCQUE0QjtFQUM1QiwwQkFBMEI7RUFDMUIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQiwwQ0FBMEM7RUFDMUMscUZBQXFGO0FBQ3ZGOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGFBQWE7RUFDYixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQiw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLGFBQWE7RUFDYixjQUFjO0VBQ2QsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCx1Q0FBdUM7RUFDdkMsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGtEQUFrRDtFQUNsRCxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQ0FBZ0M7RUFDaEMsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRTtJQUNFLGVBQWU7SUFDZixjQUFjO0VBQ2hCOztFQUVBO0lBQ0UseURBQW1EO0lBQ25ELDRCQUE0QjtFQUM5Qjs7RUFFQTtJQUNFLFdBQVc7RUFDYjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7SUFDZixlQUFlO0VBQ2pCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RG9zaXM6d2dodEAyMDA7NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcpO1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdEb3NpcycsIHNhbnMtc2VyaWY7XFxyXFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxyXFxuICBjb2xvcjogIzM0M2E0MDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keS5uby1zY3JvbGwge1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxubmF2IHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIGhlaWdodDogNTBweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmYWUwO1xcclxcbiAgei1pbmRleDogMTtcXHJcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yNCkgMCAzcHggOHB4O1xcclxcbn1cXHJcXG5cXHJcXG5uYXYgdWwge1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5uYXYtbGluayB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBjb2xvcjogIzYwNmMzODtcXHJcXG4gIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAwLjNweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW46IDAgMjBweDtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2LWxpbms6aG92ZXIge1xcclxcbiAgY29sb3I6ICNlMDVmMzc7XFxyXFxufVxcclxcblxcclxcbiNoZWFkbGluZSB7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuICBoZWlnaHQ6IDUwMHB4O1xcclxcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2Fzc2V0cy9iYW5uZXIucG5nJyk7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgNTAlO1xcclxcbiAgbWFyZ2luLXRvcDogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3JlY2lwZXMtY2FyZHMge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICBtYXJnaW46IDE1MHB4IGF1dG87XFxyXFxufVxcclxcblxcclxcbiNyZWNpcGVzLWNhcmRzIGgyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogLTgwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDM1cHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHdpZHRoOiAyOTBweDtcXHJcXG4gIGhlaWdodDogNDUwcHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiA1cHggMCAzNXB4O1xcclxcbiAgbWFyZ2luOiAyMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2VmZTdjNDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOSwgMjMxLCAxOTYsIDAuNSk7XFxyXFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDAgNnB4IDEycHggLTJweCwgcmdiYSgwLCAwLCAwLCAwLjMpIDAgM3B4IDdweCAtM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVhbC10aHVtYm5haWwge1xcclxcbiAgd2lkdGg6IDk3JTtcXHJcXG4gIGhlaWdodDogMjgwcHg7XFxyXFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtdGh1bWJuYWlsIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWhlYWRlciB7XFxyXFxuICB3aWR0aDogOTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtbmFtZSB7XFxyXFxuICBmb250LXNpemU6IDIzcHg7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgY29sb3I6ICM5Yjg4MzQ7XFxyXFxufVxcclxcblxcclxcbi5saWtlLWJ0biB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBtaW4td2lkdGg6IDcwcHg7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBmb250LXNpemU6IDEuM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGNvbG9yOiAjYmYwNjAzO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1idG4ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgYm90dG9tOiAyNXB4O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXHJcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQjRTA1RjM3O1xcclxcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcclxcbiAgcGFkZGluZzogOHB4IDEycHg7XFxyXFxuICBtYXJnaW4tbGVmdDogMTVweDtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1idG46aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZjkxNGQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUyLCA1OCwgNjQsIDAuOCk7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDUwcHggMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsLmFjdGl2ZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgei1pbmRleDogMztcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLXdpbmRvdyB7XFxyXFxuICB3aWR0aDogNjAlO1xcclxcbiAgbWluLXdpZHRoOiA0MjBweDtcXHJcXG4gIG1heC13aWR0aDogNzAwcHg7XFxyXFxuICAvKiBzdHlsZWxpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY3NzdHJlZS92YWxpZGF0b3IgKi9cXHJcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmYWUwO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDAgMzBweCAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xvc2UtYnRuIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogNzBweDtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wdXAtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDkwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLWltYWdlIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbS1pbmZvIHtcXHJcXG4gIHdpZHRoOiA4NyU7XFxyXFxufVxcclxcblxcclxcbi5pdGVtLWluZm8gaDMge1xcclxcbiAgZm9udC1zaXplOiAzNXB4O1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVjaXBlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1jb250YWluZXIge1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIG1heC13aWR0aDogNDAwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsIGg0IHtcXHJcXG4gIGZvbnQtc2l6ZTogMjVweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQge1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQgbGkge1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWQ0ZGE7XFxyXFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTdweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQgLmRhdGUge1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCAuY29tbWVudC10ZXh0IHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxufVxcclxcblxcclxcbi5hZGQtY29tbWVudCB7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWF4LXdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkZC1jb21tZW50IGZvcm0ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSBpbnB1dCB7XFxyXFxuICBwYWRkaW5nOiA4cHggMTJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ0ZGE7XFxyXFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSBpbnB1dDpmb2N1cyB7XFxyXFxuICBvdXRsaW5lOiAycHggc29saWQgI2NlZDRkYTtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdC1idG4ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgd2lkdGg6IDkwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdC1idG46aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmU3YzQ7XFxyXFxuICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbi5mb290ZXIge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICB3aWR0aDogMTAwcHg7XFxyXFxuICBtYXJnaW46IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweCkge1xcclxcbiAgLm5hdi1saW5rIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgICBtYXJnaW46IDAgMTBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNoZWFkbGluZSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9hc3NldHMvYmFubmVyLW1vYmlsZS5wbmcnKTtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNyZWNpcGVzLWNhcmRzIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjcmVjaXBlcy1jYXJkcyBoMiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjhweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jYXJkIHtcXHJcXG4gICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgbWluLXdpZHRoOiAyMzBweDtcXHJcXG4gICAgbWF4LXdpZHRoOiAyOTBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZWFsLW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY29tbWVudHMtYnRuIHtcXHJcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnBvcHVwLXdpbmRvdyB7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIG1pbi13aWR0aDogMjAwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDAgOHB4IDMwcHg7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuaXRlbS1pbmZvIGgzIHtcXHJcXG4gICAgZm9udC1zaXplOiAyNnB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmNvbW1lbnQtbW9kYWwgaDQge1xcclxcbiAgICBmb250LXNpemU6IDIycHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY29tbWVudCBzcGFuIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmFkZC1jb21tZW50IGZvcm0gaW5wdXQge1xcclxcbiAgICBmb250LXNpemU6IDEycHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuZm9vdGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxN3B4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogNSU7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiY29tbWVudHNDb3VudGVyIiwiYmFzZVVSTCIsImFwcElEIiwiY29tbWVudHNIZWFkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRDb21tZW50cyIsImlkIiwiaW5uZXJIVE1MIiwiZmV0Y2giLCJ0aGVuIiwicmVwb25zZSIsImpzb24iLCJjb21tZW50c0xpc3QiLCJmb3JFYWNoIiwiY29tbWVudCIsIm5ld0NvbW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiYXBwZW5kQ2hpbGQiLCJwb3N0Q29tbWVudCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJpdGVtc0NvdW50ZXIiLCJyZWNpcGVDYXJkcyIsInJlY2lwZXNMaW5rIiwiY3JlYXRlQ2FyZCIsImltZyIsIm5hbWUiLCJjYXJkIiwiY2xhc3NOYW1lIiwiZmV0Y2hSZWNpcGVzIiwicmVzcG9uc2UiLCJtZWFscyIsIm1lYWwiLCJzdHJNZWFsVGh1bWIiLCJzdHJNZWFsIiwiaWRNZWFsIiwiZ2V0TGlrZXMiLCJwb3N0TGlrZSIsImRpc3BsYXlQb3B1cCIsImdldERhdGEiLCJkaXNwbGF5IiwiY2FyZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlrZXNDb3VudCIsImluZGV4IiwiaXRlbSIsImxpa2VzIiwibGlrZUJ0bnMiLCJsaWtlQnRuSWNvbiIsImJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJOdW1iZXIiLCJtb2RhbCIsIm1vZGFsSW1nIiwibW9kYWxUaXRsZSIsIm1vZGFsUmVjaXBlIiwiY2xvc2VCdG4iLCJmb3JtQ29udGFpbmVyIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInJlc2V0IiwiY29tbWVudEJ0bnMiLCJzZXRBdHRyaWJ1dGUiLCJzdHJJbnN0cnVjdGlvbnMiLCJkYXRhIiwibGluayIsImxlbmd0aCJdLCJzb3VyY2VSb290IjoiIn0=