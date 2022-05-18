import './style.css';
import fetchRecipes from './display-cards.js';
import { getLikes, postLike } from './like-item.js';

const display = async () => {
  await fetchRecipes();
  await postLike();
  await getLikes();
};

display();
