const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = '5HXqG8Muhv3U5liZPQXF';

const getLikes = async () => {
  const cards = document.querySelectorAll('.card');
  const likesCount = document.querySelectorAll('.likes-count');
  await fetch(`${baseURL}${appID}/likes/`)
    .then((response) => response.json())
    .then((json) => {
      cards.forEach((card, index) => {
        json.forEach((item) => {
          if (item.item_id === card.id) {
            likesCount[index].innerHTML = item.likes;
          }
        });
      });
    });
};

const postLike = async () => {
  const likeBtns = document.querySelectorAll('.like-btn');
  const likeBtnIcon = document.querySelectorAll('.fa-heart');
  const likesCount = document.querySelectorAll('.likes-count');
  const cards = document.querySelectorAll('.card');

  likeBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
      likeBtnIcon[index].classList.remove('fa-regular');
      likeBtnIcon[index].classList.add('fa-solid');
      likesCount[index].innerHTML = Number(likesCount[index].innerHTML) + 1;

      fetch(`${baseURL}${appID}/likes/`, {
        method: 'POST',
        body: JSON.stringify({
          item_id: cards[index].id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    });
  });
};

export { getLikes, postLike };
