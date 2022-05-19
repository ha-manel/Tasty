const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian';

// const btnComment = document.querySelectorAll('#comments-btn');
const closepopup = document.querySelector('.close');
const popupmodal = document.querySelector('.modal');
const image = document.querySelector('.top-img');
const foodname = document.querySelector('.food-name');

const openmodal = async (id) => {
  await fetch(url).then((res) => res.json())
    .then((data) => {
      // eslint-disable-next-line eqeqeq
      const matchedID = data.meals.find((e) => e.idMeal == id);

      foodname.innerHTML = `${matchedID.strMeal}`;
      image.setAttribute('src', matchedID.strMealThumb);
    });
  popupmodal.style.display = 'block';
};
window.openmodal = openmodal;
// const openmodal = (name, img) => {
// foodname.innerHTML = `${name}`;
// image.setAttribute('src', img);
// popupmodal.style.display = 'block';
// console.log('hello');
// };
closepopup.addEventListener('click', () => {
  popupmodal.style.display = 'none';
});

export default openmodal;