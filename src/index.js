import { fetchImages } from "./js/fetch"; 
import { resultImages } from "./js/render";
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const inputBtn = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const loadMoreButton = document.querySelector('.load-more');


let page = 1;

export { page };

const search = () => {
    event.preventDefault();

    const name = inputBtn.value.trim();

    
    fetchImages(name, page) 
    .then (images => {
      resultImages(images.hits);
      var lightbox = new SimpleLightbox('.gallery a').refresh();

      loadMoreButton.style.display = 'block';

      const totalPage = Math.ceil(images.totalHits / 40);

      if (page = totalPage) {
        loadMoreButton.style.display = 'none';
        return Notify.failure ("We're sorry, but you've reached the end of search results.")
      }
      })
      .catch(error => console.log(error));
};

function loadMoreBtn() {
  page += 1;
  search();
}

loadMoreButton.addEventListener('click', loadMoreBtn);

searchBtn.addEventListener('click', () => {
  event.preventDefault();

  if (inputBtn.value.trim().length >= 1) {
    gallery.innerHTML = '';
    search();
  } else {
    Notify.failure('Please enter something.');
  }
})