import { postComment, getComments } from './comments.js';

const modal = document.querySelector('.comment-modal');
const modalImg = document.querySelector('.popup-image img');
const modalTitle = document.querySelector('.item-info h3');
const modalRecipe = document.querySelector('.recipe');
const closeBtn = document.querySelector('.close-btn');
const form = document.querySelector('.add-comment form');
const name = document.querySelector('#name');
const comment = document.querySelector('#comment');

const baseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const displayPopup = () => {
  const cards = document.querySelectorAll('.card');
  const commentBtns = document.querySelectorAll('.comments-btn');

  commentBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
      fetch(`${baseURL}${cards[index].id}`)
        .then((response) => response.json())
        .then((json) => {
          modal.classList.add('active');
          document.querySelector('body').classList.add('no-scroll');
          modalImg.setAttribute('src', json.meals[0].strMealThumb);
          modalTitle.innerHTML = json.meals[0].strMeal;
          modalRecipe.innerHTML = json.meals[0].strInstructions;
          getComments(cards[index].id);
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (name.value && comment.value) {
              postComment(name.value, comment.value, cards[index].id);
              name.value = '';
              comment.value = '';
            }
          });
        });
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.querySelector('body').classList.remove('no-scroll');
  });
};

export default displayPopup;