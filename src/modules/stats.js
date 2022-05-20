const itemsCounter = (data, link) => {
  link.innerHTML = `Recipes (${data.length})`;
  return data.length;
};

const commentsCounter = (data, link) => {
  if (data.length) {
    link.innerHTML = `Comments (${data.length})`;
  }
  return data.length;
};

export { itemsCounter, commentsCounter };