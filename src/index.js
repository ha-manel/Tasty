import './style.css';
import fetchRecipes from './display-cards.js';
import getLikes from './like-item.js';

const display = async () => {
  await fetchRecipes();
  await getLikes();
};

display();