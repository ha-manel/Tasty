const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'FasIWx1EwA6odcY3m4KW';

const getComments = (id) => {
  fetch(`${baseURL}${appID}/comments?item_id=${id}`)
    .then((reponse) => reponse.json())
    .then((json) => {
      if (json) {
        const commentsList = document.querySelector('.comment');
        commentsList.innerHTML = '';
        json.forEach((comment) => {
          const newComment = document.createElement('li');
          newComment.innerHTML = `<span class="date">${comment.creation_date}</span><span class="name">${comment.username}:</span> <span
              class="comment-text">${comment.comment}</span>`;
          commentsList.appendChild(newComment);
        });
      }
    });
};

const postComment = (username, comment, id) => {
  fetch(`${baseURL}${appID}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(getComments(id));
};

export { postComment, getComments };