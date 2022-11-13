
import { Notify } from "notiflix";
import { fetchImages, lastPage } from "./js/fetch";
import { resultImages } from "./js/render";

const gallery = document.querySelector('.gallery');
const inputBtn = document.querySelector('#search-form input');
const searchBtn = document.querySelector('button[type=submit]');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;

const search = () => {
  event.preventDefault();
  loadMoreButton.style.display = "none";

  const name = inputBtn.value.trim();

  fetchImages (name, page) 
  .then(images => {
    resultImages(images.hits);
    
    if (page < lastPage) {
      loadMoreButton.style.display = "block";
    }
  })
  .catch(error => console.log(error));

};

searchBtn.addEventListener("click", () => {
  event.preventDefault();

    
  if (inputBtn.value.trim().length >= 1) {
    gallery.innerHTML = '';
    search();
  } else {
    Notify.failure('Please enter something.');
  }
});

loadMoreButton.addEventListener('click', () => {
  page = page + 1;
  search();
});
