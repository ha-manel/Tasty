const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appUrl = 'PfqH1ufrdevL3Pxq8vXs';

// const commentlist = document.querySelector('#commentlist');
const form = document.querySelector('#form-1');

// eslint-disable-next-line camelcase
const postcomments = async (idMeal, username, comment) => {
  await fetch(`${baseUrl}${appUrl}/apps/:app_id/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: idMeal,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => json);
};

form.addEventListener('submit', 'idMeal', (e) => {
  e.preventDefault();
  const username = document.querySelector('#yourname').value;
  const comment = document.querySelector('#insight').value;
  // eslint-disable-next-line no-undef
  postcomments(username, comment, idMeal);
});

/*
const getComments = async () => {
  const response = await fetch(`${baseUrl}/${appUrl}/comments/`);
  const comments = await response.json();
}; */

export default postcomments;