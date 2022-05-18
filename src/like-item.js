const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'PfqH1ufrdevL3Pxq8vXs';

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

export default getLikes;
