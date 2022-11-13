// import SipleLighbox
import SimpleLightbox from 'simplelightbox';
// additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function resultImages (images) {
    const result = images
     .map( image => {
        return`<div class="photo-card">
        <a class="gallery__item" href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b>
            ${image.likes}
          </p>
          <p class="info-item">
            <b>Views:</b>
            ${image.views}
          </p>
          <p class="info-item">
            <b>Comments:</b>
            ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b>
            ${image.downloads}
          </p>
        </div>
      </div>`
     })
     .join('');

     gallery.insertAdjacentHTML('beforeend', result);

    var lightbox = new SimpleLightbox('.gallery a');
}