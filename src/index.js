import './style.css';
import { fetchRecipes } from './display-cards.js';
import { getLikes, postLike } from './like-item.js';
import displayPopup from './popup.js';

const getData = () => {
  getLikes();
  displayPopup();
  postLike();
};

const display = async () => {
  await fetchRecipes();
  await getData();
};

display();
