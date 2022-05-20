import { postComment, getComments } from './comments.js';

const modal = document.querySelector('.comment-modal');
const modalImg = document.querySelector('.popup-image img');
const modalTitle = document.querySelector('.item-info h3');
const modalRecipe = document.querySelector('.recipe');
const closeBtn = document.querySelector('.close-btn');
const formContainer = document.querySelector('.add-comment');

const baseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const createForm = (id) => {
  formContainer.innerHTML = '<h4> Add a comment</h4>';
  const form = document.createElement('form');
  form.id = id;
  form.innerHTML = `<input type="text" placeholder="Your Name" id="name" required>
          <input type="text" placeholder="Write your comment" id="comment" required>
          <input type="submit" value="Comment" id="submit-btn">`;
  formContainer.appendChild(form);
  const name = document.querySelector('#name');
  const comment = document.querySelector('#comment');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (name.value && comment.value) {
      postComment(name.value, comment.value, form.id);
      form.reset();
    }
  });
};

const displayPopup = () => {
  const commentBtns = document.querySelectorAll('.comments-btn');

  commentBtns.forEach((button) => {
    button.addEventListener('click', () => {
      createForm(button.id);
      getComments(button.id);

      fetch(`${baseURL}${button.id}`)
        .then((response) => response.json())
        .then((json) => {
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

export default displayPopup;