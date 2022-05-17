import './style.css';
import fetchRecipes from './display-cards.js';
import { getLikes, postLike } from './like-item.js';
import displayPopup from './popup-modal.js';

const display = async () => {
  await fetchRecipes();
  await getLikes();
  await displayPopup();
  await postLike();
};

display();