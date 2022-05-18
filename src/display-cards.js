// eslint-disable-next-line no-unused-vars
import openmodal from './popup.js';

const recipeCards = document.querySelector('#recipes-cards');
const recipesLink = document.querySelector('#recipes-link');

const itemsCounter = (counter) => counter + 1;

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
      <button class="comments-btn" id="comments-btn" onclick="openmodal(${id})">Comments</button>`;

  recipeCards.appendChild(card);
};

const fetchRecipes = async () => {
  let counter = 0;
  await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian')
    .then((response) => response.json())
    .then((json) => {
      json.meals.forEach((meal) => {
        createCard(meal.strMealThumb, meal.strMeal, meal.idMeal);
        counter = itemsCounter(counter);
      });
      recipesLink.innerHTML = `Recipes (${counter})`;
    });
};

export default fetchRecipes;