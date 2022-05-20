import { itemsCounter } from './stats.js';
import displayPopup from './popup.js';
import { getLikes, postLike } from './like-item.js';

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

const fetchRecipes = async (category) => {
  recipeCards.innerHTML = '';
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((json) => {
      itemsCounter(json.meals, recipesLink);
      json.meals.forEach((meal) => {
        spinner.innerHTML = '';
        createCard(meal.strMealThumb, meal.strMeal, meal.idMeal);
      });
      getLikes();
      displayPopup();
      postLike();
    });
};

categories.forEach((category) => {
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

export { fetchRecipes, itemsCounter };