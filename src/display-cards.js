const recipeCards = document.querySelector('#recipes-cards');

const createCard = (img, name) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="meal-thumbnail">
        <img src="${img}" alt="">
      </div>
      <div class="card-header">
        <h3 class="meal-name">${name}</h3>
        <button class="like-btn"><i class="fa-regular fa-heart"></i> 201</button>
      </div>
      <button class="comments-btn">Comments</button>`;

  recipeCards.appendChild(card);
};

const fetchRecipes = async () => {
  await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian')
    .then((response) => response.json())
    .then((json) => {
      json.meals.forEach((meal) => {
        createCard(meal.strMealThumb, meal.strMeal);
      });
    });
};

export default fetchRecipes;