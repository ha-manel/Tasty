import { itemsCounter } from './stats.js';

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
  await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian')
    .then((response) => response.json())
    .then((json) => {
      itemsCounter(json.meals, recipesLink);
      json.meals.forEach((meal) => {
        createCard(meal.strMealThumb, meal.strMeal, meal.idMeal);
      });
    });
};

export { fetchRecipes, itemsCounter };