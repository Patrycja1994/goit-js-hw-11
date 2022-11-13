import { Notify } from 'notiflix';
// import functions and variables
import { fetchImages, lastPage } from './js/fetch';
import { renderImages } from './js/render';

const gallery = document.querySelector('.gallery');
const inputTag = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const loadMoreButton = document.querySelector('.load-more');

export let page = 1;


const search = () => {
  event.preventDefault();
  loadMoreButton.style.display = 'none';

  const name = inputTag.value.trim();

  fetchImages(name, page)
    .then(images => {
      renderImages(images.hits);
      if (page < lastPage) {
        loadMoreButton.style.display = 'block';
      }
    })
    .catch(error => console.log(error));
};

searchBtn.addEventListener('click', () => {
  event.preventDefault();

  if (inputTag.value.trim().length >= 1) {
    gallery.innerHTML = '';
    search();
  } else {
    Notify.failure('Please enter something.');
  }
});

loadMoreBtn.addEventListener('click', () => {
  page = page + 1;
  search();
});