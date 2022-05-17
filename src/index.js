import './style.css';

const btnComment = document.querySelector('.comments-btn');
const popupmodal = document.querySelector('.modal');
const closepopup = document.querySelector('.close');

btnComment.addEventListener('click', (e) => {
  if (e.target) {
    popupmodal.style.display = 'block';
  }
});

closepopup.addEventListener('click', (e) => {
  if (e.target) {
    popupmodal.style.display = 'none';
  }
});