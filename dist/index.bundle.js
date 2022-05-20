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
const appID = '5ixQbMkbBqb0u42da82v';
const commentsHeader = document.querySelector('.comments-container h4');
const spinner = document.querySelector('#comments-spinner');

const getComments = async id => {
  commentsHeader.innerHTML = 'Comments (0)';
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  await fetch(`${baseURL}${appID}/comments?item_id=${id}`).then(reponse => reponse.json()).then(json => {
    spinner.innerHTML = '';
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
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup.js */ "./src/popup.js");
/* harmony import */ var _like_item_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./like-item.js */ "./src/like-item.js");



const recipeCards = document.querySelector('#recipes-container');
const recipesLink = document.querySelector('#recipes-link');
const categories = document.querySelectorAll('.category');
const spinner = document.querySelector('#recipes-spinner');

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

const fetchRecipes = async category => {
  recipeCards.innerHTML = '';
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(response => response.json()).then(json => {
    (0,_stats_js__WEBPACK_IMPORTED_MODULE_0__.itemsCounter)(json.meals, recipesLink);
    json.meals.forEach(meal => {
      spinner.innerHTML = '';
      createCard(meal.strMealThumb, meal.strMeal, meal.idMeal);
    });
    (0,_like_item_js__WEBPACK_IMPORTED_MODULE_2__.getLikes)();
    (0,_popup_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_like_item_js__WEBPACK_IMPORTED_MODULE_2__.postLike)();
  });
};

categories.forEach(category => {
  category.addEventListener('click', () => {
    if (category.id === 'dessert') {
      fetchRecipes('Dessert');
    } else if (category.id === 'pasta') {
      fetchRecipes('Pasta');
    } else if (category.id === 'seafood') {
      fetchRecipes('Seafood');
    } else if (category.id === 'starter') {
      fetchRecipes('Starter');
    }
  });
});


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _display_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-cards.js */ "./src/display-cards.js");


(0,_display_cards_js__WEBPACK_IMPORTED_MODULE_1__.fetchRecipes)('Dessert');

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
const appID = '5ixQbMkbBqb0u42da82v';

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
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n  margin: 0;\r\n  font-family: 'Dosis', sans-serif;\r\n  overflow-x: hidden;\r\n  color: #343a40;\r\n  background-color: rgba(254, 250, 224, 0.7);\r\n}\r\n\r\nbody.no-scroll {\r\n  overflow: hidden;\r\n}\r\n\r\nnav {\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100vw;\r\n  height: 50px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  z-index: 1;\r\n  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\r\n}\r\n\r\nnav ul {\r\n  padding: 0;\r\n  list-style-type: none;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.nav-link {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  font-size: 18px;\r\n  letter-spacing: 0.3px;\r\n  font-weight: 600;\r\n  margin: 0 20px;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #e05f37;\r\n}\r\n\r\n#headline {\r\n  width: 100vw;\r\n  height: 500px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: 0 50%;\r\n  margin-top: 50px;\r\n}\r\n\r\n#recipes-cards {\r\n  width: 80%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin: 50px auto 150px;\r\n}\r\n\r\n#recipes-header {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n#recipes-header h2 {\r\n  text-align: center;\r\n  font-size: 35px;\r\n}\r\n\r\n#categories ul {\r\n  display: flex;\r\n  justify-content: center;\r\n  padding: 0;\r\n  list-style-type: none;\r\n}\r\n\r\n.category {\r\n  cursor: pointer;\r\n  font-size: 17px;\r\n  color: #fff;\r\n  font-weight: 500;\r\n  background-color: rgba(224, 95, 55, 0.9);\r\n  padding: 5px 12px;\r\n  margin: 0 15px;\r\n  border-radius: 20px;\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;\r\n  transition: transform 0.2s ease-in-out;\r\n}\r\n\r\n.category:hover {\r\n  transform: scale(1.1);\r\n}\r\n\r\n.spinner {\r\n  margin: 20px auto 0;\r\n  font-size: 30px;\r\n}\r\n\r\n#recipes-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin-top: 30px;\r\n}\r\n\r\n.card {\r\n  position: relative;\r\n  width: 290px;\r\n  height: 450px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  padding: 5px 0 35px;\r\n  margin: 20px 25px;\r\n  border: 1px solid #efe7c4;\r\n  border-radius: 12px;\r\n  background-color: rgba(239, 231, 196, 0.5);\r\n  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;\r\n}\r\n\r\n.meal-thumbnail {\r\n  width: 97%;\r\n  height: 280px;\r\n  object-fit: cover;\r\n}\r\n\r\n.meal-thumbnail img {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 12px;\r\n}\r\n\r\n.card-header {\r\n  width: 90%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n}\r\n\r\n.meal-name {\r\n  font-size: 23px;\r\n  margin-top: 15px;\r\n  color: #9b8834;\r\n}\r\n\r\n.like-btn {\r\n  cursor: pointer;\r\n  min-width: 70px;\r\n  height: 40px;\r\n  font-size: 1.3rem;\r\n  background-color: transparent;\r\n  border: none;\r\n  outline: none;\r\n  color: #bf0603;\r\n  margin-left: 15px;\r\n}\r\n\r\n.comments-btn {\r\n  position: absolute;\r\n  bottom: 25px;\r\n  cursor: pointer;\r\n  align-self: flex-start;\r\n  font-size: 1.2rem;\r\n  font-family: inherit;\r\n  color: #fff;\r\n  font-weight: 600;\r\n  background-color: #e05f37;\r\n  border: 1px solid#E05F37;\r\n  border-radius: 8px;\r\n  padding: 8px 12px;\r\n  margin-left: 15px;\r\n  transition: all 0.5s ease;\r\n}\r\n\r\n.comments-btn:hover {\r\n  background-color: #ff914d;\r\n  border: 1px solid #ff914d;\r\n}\r\n\r\n.comment-modal {\r\n  display: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background-color: rgba(52, 58, 64, 0.8);\r\n  justify-content: center;\r\n  padding: 50px 0;\r\n  box-sizing: border-box;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.comment-modal.active {\r\n  display: flex;\r\n  z-index: 3;\r\n}\r\n\r\n.popup-window {\r\n  width: 60%;\r\n  min-width: 420px;\r\n  max-width: 700px;\r\n  /* stylelint-disable-next-line csstree/validator */\r\n  height: fit-content;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  border-radius: 12px;\r\n  padding: 10px 30px 30px;\r\n}\r\n\r\n.close-btn {\r\n  cursor: pointer;\r\n  font-size: 35px;\r\n  align-self: flex-end;\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n\r\n.close-btn:hover {\r\n  transform: rotate(90deg);\r\n}\r\n\r\n.popup-image {\r\n  width: 90%;\r\n}\r\n\r\n.popup-image img {\r\n  width: 100%;\r\n  max-height: 300px;\r\n  border-radius: 12px;\r\n  object-fit: cover;\r\n}\r\n\r\n.item-info {\r\n  width: 87%;\r\n}\r\n\r\n.item-info h3 {\r\n  font-size: 35px;\r\n  color: #606c38;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.recipe {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  letter-spacing: 0.5px;\r\n  color: #000;\r\n  line-height: 1.5;\r\n}\r\n\r\n.comments-container {\r\n  width: 80%;\r\n  max-width: 400px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.comment-modal h4 {\r\n  font-size: 25px;\r\n  text-align: center;\r\n}\r\n\r\n.comment {\r\n  width: 100%;\r\n  list-style-type: none;\r\n  padding: 0;\r\n}\r\n\r\n.comment li {\r\n  margin-bottom: 8px;\r\n  border-bottom: 1px solid #ced4da;\r\n  padding-bottom: 8px;\r\n}\r\n\r\n.comment span {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  margin-right: 5px;\r\n}\r\n\r\n.comment .date {\r\n  margin-right: 20px;\r\n}\r\n\r\n.comment .comment-text {\r\n  font-weight: 500;\r\n}\r\n\r\n.add-comment {\r\n  width: 70%;\r\n  max-width: 300px;\r\n}\r\n\r\n.add-comment form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 0 auto;\r\n}\r\n\r\n.add-comment form input {\r\n  padding: 8px 12px;\r\n  font-size: 14px;\r\n  border: 1px solid #ced4da;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.add-comment form input:focus {\r\n  outline: 2px solid #ced4da;\r\n}\r\n\r\n#submit-btn {\r\n  cursor: pointer;\r\n  width: 90px;\r\n  background-color: #e05f37;\r\n  color: #fff;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n#submit-btn:hover {\r\n  background-color: #ff914d;\r\n}\r\n\r\nfooter {\r\n  width: 100vw;\r\n  background-color: #efe7c4;\r\n  padding: 15px 0;\r\n}\r\n\r\n.footer {\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n  margin-left: 50px;\r\n}\r\n\r\n.footer a {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  width: 100px;\r\n  margin: 0 5px;\r\n}\r\n\r\n@media screen and (max-width: 500px) {\r\n  .nav-link {\r\n    font-size: 15px;\r\n    margin: 0 10px;\r\n  }\r\n\r\n  #headline {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\r\n    background-position: 50% 50%;\r\n  }\r\n\r\n  #recipes-cards {\r\n    width: 100%;\r\n  }\r\n\r\n  #recipes-cards h2 {\r\n    font-size: 28px;\r\n  }\r\n\r\n  #categories ul {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .category {\r\n    margin: 5px;\r\n    font-size: 15px;\r\n  }\r\n\r\n  .card {\r\n    width: 90%;\r\n    min-width: 230px;\r\n    max-width: 290px;\r\n  }\r\n\r\n  .meal-name {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .comments-btn {\r\n    font-size: 1rem;\r\n  }\r\n\r\n  .popup-window {\r\n    width: 90%;\r\n    min-width: 200px;\r\n    padding: 0 8px 30px;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  .item-info h3 {\r\n    font-size: 26px;\r\n  }\r\n\r\n  .comment-modal h4 {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .comment span {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .add-comment form input {\r\n    font-size: 12px;\r\n  }\r\n\r\n  .footer {\r\n    font-size: 17px;\r\n    margin-left: 5%;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;400;500;600;700&display=swap');\r\n\r\nbody {\r\n  margin: 0;\r\n  font-family: 'Dosis', sans-serif;\r\n  overflow-x: hidden;\r\n  color: #343a40;\r\n  background-color: rgba(254, 250, 224, 0.7);\r\n}\r\n\r\nbody.no-scroll {\r\n  overflow: hidden;\r\n}\r\n\r\nnav {\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100vw;\r\n  height: 50px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  z-index: 1;\r\n  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\r\n}\r\n\r\nnav ul {\r\n  padding: 0;\r\n  list-style-type: none;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.nav-link {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  font-size: 18px;\r\n  letter-spacing: 0.3px;\r\n  font-weight: 600;\r\n  margin: 0 20px;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #e05f37;\r\n}\r\n\r\n#headline {\r\n  width: 100vw;\r\n  height: 500px;\r\n  background-image: url('./assets/banner.png');\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: 0 50%;\r\n  margin-top: 50px;\r\n}\r\n\r\n#recipes-cards {\r\n  width: 80%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin: 50px auto 150px;\r\n}\r\n\r\n#recipes-header {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n#recipes-header h2 {\r\n  text-align: center;\r\n  font-size: 35px;\r\n}\r\n\r\n#categories ul {\r\n  display: flex;\r\n  justify-content: center;\r\n  padding: 0;\r\n  list-style-type: none;\r\n}\r\n\r\n.category {\r\n  cursor: pointer;\r\n  font-size: 17px;\r\n  color: #fff;\r\n  font-weight: 500;\r\n  background-color: rgba(224, 95, 55, 0.9);\r\n  padding: 5px 12px;\r\n  margin: 0 15px;\r\n  border-radius: 20px;\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;\r\n  transition: transform 0.2s ease-in-out;\r\n}\r\n\r\n.category:hover {\r\n  transform: scale(1.1);\r\n}\r\n\r\n.spinner {\r\n  margin: 20px auto 0;\r\n  font-size: 30px;\r\n}\r\n\r\n#recipes-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin-top: 30px;\r\n}\r\n\r\n.card {\r\n  position: relative;\r\n  width: 290px;\r\n  height: 450px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  padding: 5px 0 35px;\r\n  margin: 20px 25px;\r\n  border: 1px solid #efe7c4;\r\n  border-radius: 12px;\r\n  background-color: rgba(239, 231, 196, 0.5);\r\n  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;\r\n}\r\n\r\n.meal-thumbnail {\r\n  width: 97%;\r\n  height: 280px;\r\n  object-fit: cover;\r\n}\r\n\r\n.meal-thumbnail img {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 12px;\r\n}\r\n\r\n.card-header {\r\n  width: 90%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n}\r\n\r\n.meal-name {\r\n  font-size: 23px;\r\n  margin-top: 15px;\r\n  color: #9b8834;\r\n}\r\n\r\n.like-btn {\r\n  cursor: pointer;\r\n  min-width: 70px;\r\n  height: 40px;\r\n  font-size: 1.3rem;\r\n  background-color: transparent;\r\n  border: none;\r\n  outline: none;\r\n  color: #bf0603;\r\n  margin-left: 15px;\r\n}\r\n\r\n.comments-btn {\r\n  position: absolute;\r\n  bottom: 25px;\r\n  cursor: pointer;\r\n  align-self: flex-start;\r\n  font-size: 1.2rem;\r\n  font-family: inherit;\r\n  color: #fff;\r\n  font-weight: 600;\r\n  background-color: #e05f37;\r\n  border: 1px solid#E05F37;\r\n  border-radius: 8px;\r\n  padding: 8px 12px;\r\n  margin-left: 15px;\r\n  transition: all 0.5s ease;\r\n}\r\n\r\n.comments-btn:hover {\r\n  background-color: #ff914d;\r\n  border: 1px solid #ff914d;\r\n}\r\n\r\n.comment-modal {\r\n  display: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background-color: rgba(52, 58, 64, 0.8);\r\n  justify-content: center;\r\n  padding: 50px 0;\r\n  box-sizing: border-box;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.comment-modal.active {\r\n  display: flex;\r\n  z-index: 3;\r\n}\r\n\r\n.popup-window {\r\n  width: 60%;\r\n  min-width: 420px;\r\n  max-width: 700px;\r\n  /* stylelint-disable-next-line csstree/validator */\r\n  height: fit-content;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: #fefae0;\r\n  border-radius: 12px;\r\n  padding: 10px 30px 30px;\r\n}\r\n\r\n.close-btn {\r\n  cursor: pointer;\r\n  font-size: 35px;\r\n  align-self: flex-end;\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n\r\n.close-btn:hover {\r\n  transform: rotate(90deg);\r\n}\r\n\r\n.popup-image {\r\n  width: 90%;\r\n}\r\n\r\n.popup-image img {\r\n  width: 100%;\r\n  max-height: 300px;\r\n  border-radius: 12px;\r\n  object-fit: cover;\r\n}\r\n\r\n.item-info {\r\n  width: 87%;\r\n}\r\n\r\n.item-info h3 {\r\n  font-size: 35px;\r\n  color: #606c38;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.recipe {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  letter-spacing: 0.5px;\r\n  color: #000;\r\n  line-height: 1.5;\r\n}\r\n\r\n.comments-container {\r\n  width: 80%;\r\n  max-width: 400px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.comment-modal h4 {\r\n  font-size: 25px;\r\n  text-align: center;\r\n}\r\n\r\n.comment {\r\n  width: 100%;\r\n  list-style-type: none;\r\n  padding: 0;\r\n}\r\n\r\n.comment li {\r\n  margin-bottom: 8px;\r\n  border-bottom: 1px solid #ced4da;\r\n  padding-bottom: 8px;\r\n}\r\n\r\n.comment span {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  margin-right: 5px;\r\n}\r\n\r\n.comment .date {\r\n  margin-right: 20px;\r\n}\r\n\r\n.comment .comment-text {\r\n  font-weight: 500;\r\n}\r\n\r\n.add-comment {\r\n  width: 70%;\r\n  max-width: 300px;\r\n}\r\n\r\n.add-comment form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 0 auto;\r\n}\r\n\r\n.add-comment form input {\r\n  padding: 8px 12px;\r\n  font-size: 14px;\r\n  border: 1px solid #ced4da;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.add-comment form input:focus {\r\n  outline: 2px solid #ced4da;\r\n}\r\n\r\n#submit-btn {\r\n  cursor: pointer;\r\n  width: 90px;\r\n  background-color: #e05f37;\r\n  color: #fff;\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n\r\n#submit-btn:hover {\r\n  background-color: #ff914d;\r\n}\r\n\r\nfooter {\r\n  width: 100vw;\r\n  background-color: #efe7c4;\r\n  padding: 15px 0;\r\n}\r\n\r\n.footer {\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n  margin-left: 50px;\r\n}\r\n\r\n.footer a {\r\n  text-decoration: none;\r\n  color: #606c38;\r\n  width: 100px;\r\n  margin: 0 5px;\r\n}\r\n\r\n@media screen and (max-width: 500px) {\r\n  .nav-link {\r\n    font-size: 15px;\r\n    margin: 0 10px;\r\n  }\r\n\r\n  #headline {\r\n    background-image: url('./assets/banner-mobile.png');\r\n    background-position: 50% 50%;\r\n  }\r\n\r\n  #recipes-cards {\r\n    width: 100%;\r\n  }\r\n\r\n  #recipes-cards h2 {\r\n    font-size: 28px;\r\n  }\r\n\r\n  #categories ul {\r\n    flex-wrap: wrap;\r\n  }\r\n\r\n  .category {\r\n    margin: 5px;\r\n    font-size: 15px;\r\n  }\r\n\r\n  .card {\r\n    width: 90%;\r\n    min-width: 230px;\r\n    max-width: 290px;\r\n  }\r\n\r\n  .meal-name {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .comments-btn {\r\n    font-size: 1rem;\r\n  }\r\n\r\n  .popup-window {\r\n    width: 90%;\r\n    min-width: 200px;\r\n    padding: 0 8px 30px;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  .item-info h3 {\r\n    font-size: 26px;\r\n  }\r\n\r\n  .comment-modal h4 {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .comment span {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .add-comment form input {\r\n    font-size: 12px;\r\n  }\r\n\r\n  .footer {\r\n    font-size: 17px;\r\n    margin-left: 5%;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxL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anMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9zcmMvZGlzcGxheS1jYXJkcy5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9saWtlLWl0ZW0uanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9zcmMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9zcmMvc3RhdHMuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3Rhc3R5Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdGFzdHkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90YXN0eS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbW1lbnRzQ291bnRlciB9IGZyb20gJy4vc3RhdHMuanMnO1xyXG5cclxuY29uc3QgYmFzZVVSTCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy8nO1xyXG5jb25zdCBhcHBJRCA9ICc1aXhRYk1rYkJxYjB1NDJkYTgydic7XHJcblxyXG5jb25zdCBjb21tZW50c0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb250YWluZXIgaDQnKTtcclxuY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50cy1zcGlubmVyJyk7XHJcblxyXG5jb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChpZCkgPT4ge1xyXG4gIGNvbW1lbnRzSGVhZGVyLmlubmVySFRNTCA9ICdDb21tZW50cyAoMCknO1xyXG4gIHNwaW5uZXIuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4nO1xyXG4gIGF3YWl0IGZldGNoKGAke2Jhc2VVUkx9JHthcHBJRH0vY29tbWVudHM/aXRlbV9pZD0ke2lkfWApXHJcbiAgICAudGhlbigocmVwb25zZSkgPT4gcmVwb25zZS5qc29uKCkpXHJcbiAgICAudGhlbigoanNvbikgPT4ge1xyXG4gICAgICBzcGlubmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICBjb21tZW50c0NvdW50ZXIoanNvbiwgY29tbWVudHNIZWFkZXIpO1xyXG4gICAgICBjb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudCcpO1xyXG4gICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIGpzb24uZm9yRWFjaCgoY29tbWVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIG5ld0NvbW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZGF0ZVwiPiR7Y29tbWVudC5jcmVhdGlvbl9kYXRlfTwvc3Bhbj48c3BhbiBjbGFzcz1cIm5hbWVcIj4ke2NvbW1lbnQudXNlcm5hbWV9Ojwvc3Bhbj4gPHNwYW5cclxuICAgICAgICAgICAgICBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7Y29tbWVudC5jb21tZW50fTwvc3Bhbj5gO1xyXG4gICAgICAgIGNvbW1lbnRzTGlzdC5hcHBlbmRDaGlsZChuZXdDb21tZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHBvc3RDb21tZW50ID0gYXN5bmMgKHVzZXJuYW1lLCBjb21tZW50LCBpZCkgPT4ge1xyXG4gIGF3YWl0IGZldGNoKGAke2Jhc2VVUkx9JHthcHBJRH0vY29tbWVudHMvYCwge1xyXG4gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGl0ZW1faWQ6IGlkLFxyXG4gICAgICB1c2VybmFtZSxcclxuICAgICAgY29tbWVudCxcclxuICAgIH0pLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxyXG4gICAgfSxcclxuICB9KS50aGVuKCgpID0+IHtcclxuICAgIGdldENvbW1lbnRzKGlkKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IHBvc3RDb21tZW50LCBnZXRDb21tZW50cyB9O1xyXG4iLCJpbXBvcnQgeyBpdGVtc0NvdW50ZXIgfSBmcm9tICcuL3N0YXRzLmpzJztcclxuaW1wb3J0IGRpc3BsYXlQb3B1cCBmcm9tICcuL3BvcHVwLmpzJztcclxuaW1wb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlIH0gZnJvbSAnLi9saWtlLWl0ZW0uanMnO1xyXG5cclxuY29uc3QgcmVjaXBlQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVjaXBlcy1jb250YWluZXInKTtcclxuY29uc3QgcmVjaXBlc0xpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVjaXBlcy1saW5rJyk7XHJcbmNvbnN0IGNhdGVnb3JpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnknKTtcclxuY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNpcGVzLXNwaW5uZXInKTtcclxuXHJcbmNvbnN0IGNyZWF0ZUNhcmQgPSAoaW1nLCBuYW1lLCBpZCkgPT4ge1xyXG4gIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjYXJkLmNsYXNzTmFtZSA9ICdjYXJkJztcclxuICBjYXJkLmlkID0gaWQ7XHJcbiAgY2FyZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIm1lYWwtdGh1bWJuYWlsXCI+XHJcbiAgICAgICAgPGltZyBzcmM9XCIke2ltZ31cIiBhbHQ9XCJcIj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cIm1lYWwtbmFtZVwiPiR7bmFtZX08L2gzPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJsaWtlLWJ0blwiPjxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1oZWFydFwiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaWtlcy1jb3VudFwiPjA8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY29tbWVudHMtYnRuXCIgaWQ9XCIke2lkfVwiPkNvbW1lbnRzPC9idXR0b24+YDtcclxuXHJcbiAgcmVjaXBlQ2FyZHMuYXBwZW5kQ2hpbGQoY2FyZCk7XHJcbn07XHJcblxyXG5jb25zdCBmZXRjaFJlY2lwZXMgPSBhc3luYyAoY2F0ZWdvcnkpID0+IHtcclxuICByZWNpcGVDYXJkcy5pbm5lckhUTUwgPSAnJztcclxuICBzcGlubmVyLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+JztcclxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly93d3cudGhlbWVhbGRiLmNvbS9hcGkvanNvbi92MS8xL2ZpbHRlci5waHA/Yz0ke2NhdGVnb3J5fWApXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKChqc29uKSA9PiB7XHJcbiAgICAgIGl0ZW1zQ291bnRlcihqc29uLm1lYWxzLCByZWNpcGVzTGluayk7XHJcbiAgICAgIGpzb24ubWVhbHMuZm9yRWFjaCgobWVhbCkgPT4ge1xyXG4gICAgICAgIHNwaW5uZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY3JlYXRlQ2FyZChtZWFsLnN0ck1lYWxUaHVtYiwgbWVhbC5zdHJNZWFsLCBtZWFsLmlkTWVhbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBnZXRMaWtlcygpO1xyXG4gICAgICBkaXNwbGF5UG9wdXAoKTtcclxuICAgICAgcG9zdExpa2UoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gIGNhdGVnb3J5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgaWYgKGNhdGVnb3J5LmlkID09PSAnZGVzc2VydCcpIHtcclxuICAgICAgZmV0Y2hSZWNpcGVzKCdEZXNzZXJ0Jyk7XHJcbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5LmlkID09PSAncGFzdGEnKSB7XHJcbiAgICAgIGZldGNoUmVjaXBlcygnUGFzdGEnKTtcclxuICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkuaWQgPT09ICdzZWFmb29kJykge1xyXG4gICAgICBmZXRjaFJlY2lwZXMoJ1NlYWZvb2QnKTtcclxuICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkuaWQgPT09ICdzdGFydGVyJykge1xyXG4gICAgICBmZXRjaFJlY2lwZXMoJ1N0YXJ0ZXInKTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5leHBvcnQgeyBmZXRjaFJlY2lwZXMsIGl0ZW1zQ291bnRlciB9OyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgeyBmZXRjaFJlY2lwZXMgfSBmcm9tICcuL2Rpc3BsYXktY2FyZHMuanMnO1xyXG5cclxuZmV0Y2hSZWNpcGVzKCdEZXNzZXJ0Jyk7XHJcbiIsImNvbnN0IGJhc2VVUkwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvJztcbmNvbnN0IGFwcElEID0gJzVpeFFiTWtiQnFiMHU0MmRhODJ2JztcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgY29uc3QgbGlrZXNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saWtlcy1jb3VudCcpO1xuICBhd2FpdCBmZXRjaChgJHtiYXNlVVJMfSR7YXBwSUR9L2xpa2VzL2ApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGpzb24pID0+IHtcbiAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XG4gICAgICAgIGpzb24uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1faWQgPT09IGNhcmQuaWQpIHtcbiAgICAgICAgICAgIGxpa2VzQ291bnRbaW5kZXhdLmlubmVySFRNTCA9IGl0ZW0ubGlrZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuY29uc3QgcG9zdExpa2UgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGxpa2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpa2UtYnRuJyk7XG4gIGNvbnN0IGxpa2VCdG5JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhLWhlYXJ0Jyk7XG4gIGNvbnN0IGxpa2VzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZXMtY291bnQnKTtcbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xuXG4gIGxpa2VCdG5zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsaWtlQnRuSWNvbltpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtcmVndWxhcicpO1xuICAgICAgbGlrZUJ0bkljb25baW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gICAgICBsaWtlc0NvdW50W2luZGV4XS5pbm5lckhUTUwgPSBOdW1iZXIobGlrZXNDb3VudFtpbmRleF0uaW5uZXJIVE1MKSArIDE7XG5cbiAgICAgIGZldGNoKGAke2Jhc2VVUkx9JHthcHBJRH0vbGlrZXMvYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1faWQ6IGNhcmRzW2luZGV4XS5pZCxcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlIH07XG4iLCJpbXBvcnQgeyBwb3N0Q29tbWVudCwgZ2V0Q29tbWVudHMgfSBmcm9tICcuL2NvbW1lbnRzLmpzJztcblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1tb2RhbCcpO1xuY29uc3QgbW9kYWxJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtaW1hZ2UgaW1nJyk7XG5jb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW0taW5mbyBoMycpO1xuY29uc3QgbW9kYWxSZWNpcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVjaXBlJyk7XG5jb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbmNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNvbW1lbnQnKTtcblxuY29uc3QgYmFzZVVSTCA9ICdodHRwczovL3d3dy50aGVtZWFsZGIuY29tL2FwaS9qc29uL3YxLzEvbG9va3VwLnBocD9pPSc7XG5cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoaWQpID0+IHtcbiAgZm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGg0PiBBZGQgYSBjb21tZW50PC9oND4nO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmb3JtLmlkID0gaWQ7XG4gIGZvcm0uaW5uZXJIVE1MID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBOYW1lXCIgaWQ9XCJuYW1lXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIGNvbW1lbnRcIiBpZD1cImNvbW1lbnRcIiByZXF1aXJlZD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQ29tbWVudFwiIGlkPVwic3VibWl0LWJ0blwiPmA7XG4gIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpO1xuICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnQnKTtcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAobmFtZS52YWx1ZSAmJiBjb21tZW50LnZhbHVlKSB7XG4gICAgICBwb3N0Q29tbWVudChuYW1lLnZhbHVlLCBjb21tZW50LnZhbHVlLCBmb3JtLmlkKTtcbiAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICBjb25zdCBjb21tZW50QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50cy1idG4nKTtcblxuICBjb21tZW50QnRucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjcmVhdGVGb3JtKGJ1dHRvbi5pZCk7XG4gICAgICBnZXRDb21tZW50cyhidXR0b24uaWQpO1xuXG4gICAgICBmZXRjaChgJHtiYXNlVVJMfSR7YnV0dG9uLmlkfWApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCduby1zY3JvbGwnKTtcbiAgICAgICAgICBtb2RhbEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGpzb24ubWVhbHNbMF0uc3RyTWVhbFRodW1iKTtcbiAgICAgICAgICBtb2RhbFRpdGxlLmlubmVySFRNTCA9IGpzb24ubWVhbHNbMF0uc3RyTWVhbDtcbiAgICAgICAgICBtb2RhbFJlY2lwZS5pbm5lckhUTUwgPSBqc29uLm1lYWxzWzBdLnN0ckluc3RydWN0aW9ucztcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCduby1zY3JvbGwnKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5UG9wdXA7IiwiY29uc3QgaXRlbXNDb3VudGVyID0gKGRhdGEsIGxpbmspID0+IHtcclxuICBsaW5rLmlubmVySFRNTCA9IGBSZWNpcGVzICgke2RhdGEubGVuZ3RofSlgO1xyXG4gIHJldHVybiBkYXRhLmxlbmd0aDtcclxufTtcclxuXHJcbmNvbnN0IGNvbW1lbnRzQ291bnRlciA9IChkYXRhLCBsaW5rKSA9PiB7XHJcbiAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICBsaW5rLmlubmVySFRNTCA9IGBDb21tZW50cyAoJHtkYXRhLmxlbmd0aH0pYDtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGEubGVuZ3RoO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgaXRlbXNDb3VudGVyLCBjb21tZW50c0NvdW50ZXIgfTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvYmFubmVyLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2Jhbm5lci1tb2JpbGUucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Eb3Npczp3Z2h0QDIwMDs0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnRG9zaXMnLCBzYW5zLXNlcmlmO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbiAgY29sb3I6ICMzNDNhNDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NCwgMjUwLCAyMjQsIDAuNyk7XFxyXFxufVxcclxcblxcclxcbmJvZHkubm8tc2Nyb2xsIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbm5hdiB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDA7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmFlMDtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMjQpIDAgM3B4IDhweDtcXHJcXG59XFxyXFxuXFxyXFxubmF2IHVsIHtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubmF2LWxpbmsge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICBmb250LXNpemU6IDE4cHg7XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgbWFyZ2luOiAwIDIwcHg7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdi1saW5rOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiAjZTA1ZjM3O1xcclxcbn1cXHJcXG5cXHJcXG4jaGVhZGxpbmUge1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgaGVpZ2h0OiA1MDBweDtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgNTAlO1xcclxcbiAgbWFyZ2luLXRvcDogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3JlY2lwZXMtY2FyZHMge1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luOiA1MHB4IGF1dG8gMTUwcHg7XFxyXFxufVxcclxcblxcclxcbiNyZWNpcGVzLWhlYWRlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI3JlY2lwZXMtaGVhZGVyIGgyIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMzVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2NhdGVnb3JpZXMgdWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhdGVnb3J5IHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMTdweDtcXHJcXG4gIGNvbG9yOiAjZmZmO1xcclxcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjI0LCA5NSwgNTUsIDAuOSk7XFxyXFxuICBwYWRkaW5nOiA1cHggMTJweDtcXHJcXG4gIG1hcmdpbjogMCAxNXB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xKSAwIDRweCAxMnB4O1xcclxcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxufVxcclxcblxcclxcbi5jYXRlZ29yeTpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxyXFxufVxcclxcblxcclxcbi5zcGlubmVyIHtcXHJcXG4gIG1hcmdpbjogMjBweCBhdXRvIDA7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbiNyZWNpcGVzLWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IDI5MHB4O1xcclxcbiAgaGVpZ2h0OiA0NTBweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDVweCAwIDM1cHg7XFxyXFxuICBtYXJnaW46IDIwcHggMjVweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZmU3YzQ7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzksIDIzMSwgMTk2LCAwLjUpO1xcclxcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwIDZweCAxMnB4IC0ycHgsIHJnYmEoMCwgMCwgMCwgMC4zKSAwIDNweCA3cHggLTNweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtdGh1bWJuYWlsIHtcXHJcXG4gIHdpZHRoOiA5NyU7XFxyXFxuICBoZWlnaHQ6IDI4MHB4O1xcclxcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZWFsLXRodW1ibmFpbCBpbWcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZC1oZWFkZXIge1xcclxcbiAgd2lkdGg6IDkwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi5tZWFsLW5hbWUge1xcclxcbiAgZm9udC1zaXplOiAyM3B4O1xcclxcbiAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gIGNvbG9yOiAjOWI4ODM0O1xcclxcbn1cXHJcXG5cXHJcXG4ubGlrZS1idG4ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgbWluLXdpZHRoOiA3MHB4O1xcclxcbiAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgZm9udC1zaXplOiAxLjNyZW07XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBjb2xvcjogI2JmMDYwMztcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudHMtYnRuIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGJvdHRvbTogMjVweDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwNWYzNztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkI0UwNUYzNztcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXHJcXG4gIHBhZGRpbmc6IDhweCAxMnB4O1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudHMtYnRuOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjkxNGQ7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjZmY5MTRkO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1tb2RhbCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1MiwgNTgsIDY0LCAwLjgpO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiA1MHB4IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1tb2RhbC5hY3RpdmUge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIHotaW5kZXg6IDM7XFxyXFxufVxcclxcblxcclxcbi5wb3B1cC13aW5kb3cge1xcclxcbiAgd2lkdGg6IDYwJTtcXHJcXG4gIG1pbi13aWR0aDogNDIwcHg7XFxyXFxuICBtYXgtd2lkdGg6IDcwMHB4O1xcclxcbiAgLyogc3R5bGVsaW50LWRpc2FibGUtbmV4dC1saW5lIGNzc3RyZWUvdmFsaWRhdG9yICovXFxyXFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmFlMDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4IDMwcHggMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNsb3NlLWJ0biB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBmb250LXNpemU6IDM1cHg7XFxyXFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xvc2UtYnRuOmhvdmVyIHtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLWltYWdlIHtcXHJcXG4gIHdpZHRoOiA5MCU7XFxyXFxufVxcclxcblxcclxcbi5wb3B1cC1pbWFnZSBpbWcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXgtaGVpZ2h0OiAzMDBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0taW5mbyB7XFxyXFxuICB3aWR0aDogODclO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbS1pbmZvIGgzIHtcXHJcXG4gIGZvbnQtc2l6ZTogMzVweDtcXHJcXG4gIGNvbG9yOiAjNjA2YzM4O1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlY2lwZSB7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudHMtY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiA4MCU7XFxyXFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1tb2RhbCBoNCB7XFxyXFxuICBmb250LXNpemU6IDI1cHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQgbGkge1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWQ0ZGE7XFxyXFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTdweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQgLmRhdGUge1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCAuY29tbWVudC10ZXh0IHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxufVxcclxcblxcclxcbi5hZGQtY29tbWVudCB7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWF4LXdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkZC1jb21tZW50IGZvcm0ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSBpbnB1dCB7XFxyXFxuICBwYWRkaW5nOiA4cHggMTJweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ0ZGE7XFxyXFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSBpbnB1dDpmb2N1cyB7XFxyXFxuICBvdXRsaW5lOiAycHggc29saWQgI2NlZDRkYTtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdC1idG4ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgd2lkdGg6IDkwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdC1idG46aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmU3YzQ7XFxyXFxuICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbi5mb290ZXIge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICB3aWR0aDogMTAwcHg7XFxyXFxuICBtYXJnaW46IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweCkge1xcclxcbiAgLm5hdi1saW5rIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgICBtYXJnaW46IDAgMTBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNoZWFkbGluZSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjcmVjaXBlcy1jYXJkcyB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgfVxcclxcblxcclxcbiAgI3JlY2lwZXMtY2FyZHMgaDIge1xcclxcbiAgICBmb250LXNpemU6IDI4cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjY2F0ZWdvcmllcyB1bCB7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jYXRlZ29yeSB7XFxyXFxuICAgIG1hcmdpbjogNXB4O1xcclxcbiAgICBmb250LXNpemU6IDE1cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY2FyZCB7XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIG1pbi13aWR0aDogMjMwcHg7XFxyXFxuICAgIG1heC13aWR0aDogMjkwcHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubWVhbC1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmNvbW1lbnRzLWJ0biB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wb3B1cC13aW5kb3cge1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcbiAgICBtaW4td2lkdGg6IDIwMHB4O1xcclxcbiAgICBwYWRkaW5nOiAwIDhweCAzMHB4O1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgfVxcclxcblxcclxcbiAgLml0ZW0taW5mbyBoMyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjZweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jb21tZW50LW1vZGFsIGg0IHtcXHJcXG4gICAgZm9udC1zaXplOiAyMnB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmNvbW1lbnQgc3BhbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5hZGQtY29tbWVudCBmb3JtIGlucHV0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmZvb3RlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDUlO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0UsU0FBUztFQUNULGdDQUFnQztFQUNoQyxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixNQUFNO0VBQ04sWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsVUFBVTtFQUNWLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLFVBQVU7RUFDVixxQkFBcUI7RUFDckIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLGVBQWU7RUFDZixxQkFBcUI7RUFD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RSx5REFBbUQ7SUFDbkQsNEJBQTRCO0VBQzlCOztFQUVBO0lBQ0UsV0FBVztFQUNiOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGVBQWU7RUFDakI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Eb3Npczp3Z2h0QDIwMDs0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBmb250LWZhbWlseTogJ0Rvc2lzJywgc2Fucy1zZXJpZjtcXHJcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXHJcXG4gIGNvbG9yOiAjMzQzYTQwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTQsIDI1MCwgMjI0LCAwLjcpO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5Lm5vLXNjcm9sbCB7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5uYXYge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWZhZTA7XFxyXFxuICB6LWluZGV4OiAxO1xcclxcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwIDNweCA4cHg7XFxyXFxufVxcclxcblxcclxcbm5hdiB1bCB7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdi1saW5rIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGNvbG9yOiAjNjA2YzM4O1xcclxcbiAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbjogMCAyMHB4O1xcclxcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxufVxcclxcblxcclxcbi5uYXYtbGluazpob3ZlciB7XFxyXFxuICBjb2xvcjogI2UwNWYzNztcXHJcXG59XFxyXFxuXFxyXFxuI2hlYWRsaW5lIHtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIGhlaWdodDogNTAwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vYXNzZXRzL2Jhbm5lci5wbmcnKTtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCA1MCU7XFxyXFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcmVjaXBlcy1jYXJkcyB7XFxyXFxuICB3aWR0aDogODAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBtYXJnaW46IDUwcHggYXV0byAxNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3JlY2lwZXMtaGVhZGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jcmVjaXBlcy1oZWFkZXIgaDIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAzNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jY2F0ZWdvcmllcyB1bCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY2F0ZWdvcnkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgZm9udC1zaXplOiAxN3B4O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMjQsIDk1LCA1NSwgMC45KTtcXHJcXG4gIHBhZGRpbmc6IDVweCAxMnB4O1xcclxcbiAgbWFyZ2luOiAwIDE1cHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcclxcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjEpIDAgNHB4IDEycHg7XFxyXFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhdGVnb3J5OmhvdmVyIHtcXHJcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnNwaW5uZXIge1xcclxcbiAgbWFyZ2luOiAyMHB4IGF1dG8gMDtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3JlY2lwZXMtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogMjkwcHg7XFxyXFxuICBoZWlnaHQ6IDQ1MHB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcGFkZGluZzogNXB4IDAgMzVweDtcXHJcXG4gIG1hcmdpbjogMjBweCAyNXB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2VmZTdjNDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOSwgMjMxLCAxOTYsIDAuNSk7XFxyXFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDAgNnB4IDEycHggLTJweCwgcmdiYSgwLCAwLCAwLCAwLjMpIDAgM3B4IDdweCAtM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVhbC10aHVtYm5haWwge1xcclxcbiAgd2lkdGg6IDk3JTtcXHJcXG4gIGhlaWdodDogMjgwcHg7XFxyXFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtdGh1bWJuYWlsIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkLWhlYWRlciB7XFxyXFxuICB3aWR0aDogOTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lYWwtbmFtZSB7XFxyXFxuICBmb250LXNpemU6IDIzcHg7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgY29sb3I6ICM5Yjg4MzQ7XFxyXFxufVxcclxcblxcclxcbi5saWtlLWJ0biB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBtaW4td2lkdGg6IDcwcHg7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBmb250LXNpemU6IDEuM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGNvbG9yOiAjYmYwNjAzO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1idG4ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgYm90dG9tOiAyNXB4O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXHJcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA1ZjM3O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQjRTA1RjM3O1xcclxcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcclxcbiAgcGFkZGluZzogOHB4IDEycHg7XFxyXFxuICBtYXJnaW4tbGVmdDogMTVweDtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1idG46aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTE0ZDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZjkxNGQ7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUyLCA1OCwgNjQsIDAuOCk7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDUwcHggMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsLmFjdGl2ZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgei1pbmRleDogMztcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLXdpbmRvdyB7XFxyXFxuICB3aWR0aDogNjAlO1xcclxcbiAgbWluLXdpZHRoOiA0MjBweDtcXHJcXG4gIG1heC13aWR0aDogNzAwcHg7XFxyXFxuICAvKiBzdHlsZWxpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY3NzdHJlZS92YWxpZGF0b3IgKi9cXHJcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmYWUwO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDEwcHggMzBweCAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xvc2UtYnRuIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMzVweDtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcclxcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxyXFxufVxcclxcblxcclxcbi5jbG9zZS1idG46aG92ZXIge1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wdXAtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDkwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvcHVwLWltYWdlIGltZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbS1pbmZvIHtcXHJcXG4gIHdpZHRoOiA4NyU7XFxyXFxufVxcclxcblxcclxcbi5pdGVtLWluZm8gaDMge1xcclxcbiAgZm9udC1zaXplOiAzNXB4O1xcclxcbiAgY29sb3I6ICM2MDZjMzg7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVjaXBlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cy1jb250YWluZXIge1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIG1heC13aWR0aDogNDAwcHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGFsIGg0IHtcXHJcXG4gIGZvbnQtc2l6ZTogMjVweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCBsaSB7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlZDRkYTtcXHJcXG4gIHBhZGRpbmctYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50IHNwYW4ge1xcclxcbiAgZm9udC1zaXplOiAxN3B4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudCAuZGF0ZSB7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50IC5jb21tZW50LXRleHQge1xcclxcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkZC1jb21tZW50IHtcXHJcXG4gIHdpZHRoOiA3MCU7XFxyXFxuICBtYXgtd2lkdGg6IDMwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWNvbW1lbnQgZm9ybSB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxufVxcclxcblxcclxcbi5hZGQtY29tbWVudCBmb3JtIGlucHV0IHtcXHJcXG4gIHBhZGRpbmc6IDhweCAxMnB4O1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2NlZDRkYTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5hZGQtY29tbWVudCBmb3JtIGlucHV0OmZvY3VzIHtcXHJcXG4gIG91dGxpbmU6IDJweCBzb2xpZCAjY2VkNGRhO1xcclxcbn1cXHJcXG5cXHJcXG4jc3VibWl0LWJ0biB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICB3aWR0aDogOTBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMDVmMzc7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcclxcbn1cXHJcXG5cXHJcXG4jc3VibWl0LWJ0bjpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5MTRkO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZTdjNDtcXHJcXG4gIHBhZGRpbmc6IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvb3RlciB7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5mb290ZXIgYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBjb2xvcjogIzYwNmMzODtcXHJcXG4gIHdpZHRoOiAxMDBweDtcXHJcXG4gIG1hcmdpbjogMCA1cHg7XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxyXFxuICAubmF2LWxpbmsge1xcclxcbiAgICBmb250LXNpemU6IDE1cHg7XFxyXFxuICAgIG1hcmdpbjogMCAxMHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgI2hlYWRsaW5lIHtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2Fzc2V0cy9iYW5uZXItbW9iaWxlLnBuZycpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNTAlO1xcclxcbiAgfVxcclxcblxcclxcbiAgI3JlY2lwZXMtY2FyZHMge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNyZWNpcGVzLWNhcmRzIGgyIHtcXHJcXG4gICAgZm9udC1zaXplOiAyOHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgI2NhdGVnb3JpZXMgdWwge1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY2F0ZWdvcnkge1xcclxcbiAgICBtYXJnaW46IDVweDtcXHJcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmNhcmQge1xcclxcbiAgICB3aWR0aDogOTAlO1xcclxcbiAgICBtaW4td2lkdGg6IDIzMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDI5MHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLm1lYWwtbmFtZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jb21tZW50cy1idG4ge1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucG9wdXAtd2luZG93IHtcXHJcXG4gICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgbWluLXdpZHRoOiAyMDBweDtcXHJcXG4gICAgcGFkZGluZzogMCA4cHggMzBweDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5pdGVtLWluZm8gaDMge1xcclxcbiAgICBmb250LXNpemU6IDI2cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY29tbWVudC1tb2RhbCBoNCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjJweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jb21tZW50IHNwYW4ge1xcclxcbiAgICBmb250LXNpemU6IDE2cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuYWRkLWNvbW1lbnQgZm9ybSBpbnB1dCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5mb290ZXIge1xcclxcbiAgICBmb250LXNpemU6IDE3cHg7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiA1JTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjb21tZW50c0NvdW50ZXIiLCJiYXNlVVJMIiwiYXBwSUQiLCJjb21tZW50c0hlYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNwaW5uZXIiLCJnZXRDb21tZW50cyIsImlkIiwiaW5uZXJIVE1MIiwiZmV0Y2giLCJ0aGVuIiwicmVwb25zZSIsImpzb24iLCJjb21tZW50c0xpc3QiLCJmb3JFYWNoIiwiY29tbWVudCIsIm5ld0NvbW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRpb25fZGF0ZSIsInVzZXJuYW1lIiwiYXBwZW5kQ2hpbGQiLCJwb3N0Q29tbWVudCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJpdGVtc0NvdW50ZXIiLCJkaXNwbGF5UG9wdXAiLCJnZXRMaWtlcyIsInBvc3RMaWtlIiwicmVjaXBlQ2FyZHMiLCJyZWNpcGVzTGluayIsImNhdGVnb3JpZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY3JlYXRlQ2FyZCIsImltZyIsIm5hbWUiLCJjYXJkIiwiY2xhc3NOYW1lIiwiZmV0Y2hSZWNpcGVzIiwiY2F0ZWdvcnkiLCJyZXNwb25zZSIsIm1lYWxzIiwibWVhbCIsInN0ck1lYWxUaHVtYiIsInN0ck1lYWwiLCJpZE1lYWwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FyZHMiLCJsaWtlc0NvdW50IiwiaW5kZXgiLCJpdGVtIiwibGlrZXMiLCJsaWtlQnRucyIsImxpa2VCdG5JY29uIiwiYnV0dG9uIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiTnVtYmVyIiwibW9kYWwiLCJtb2RhbEltZyIsIm1vZGFsVGl0bGUiLCJtb2RhbFJlY2lwZSIsImNsb3NlQnRuIiwiZm9ybUNvbnRhaW5lciIsImNyZWF0ZUZvcm0iLCJmb3JtIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJyZXNldCIsImNvbW1lbnRCdG5zIiwic2V0QXR0cmlidXRlIiwic3RySW5zdHJ1Y3Rpb25zIiwiZGF0YSIsImxpbmsiLCJsZW5ndGgiXSwic291cmNlUm9vdCI6IiJ9