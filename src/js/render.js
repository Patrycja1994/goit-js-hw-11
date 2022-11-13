// import SipleLighbox
import SimpleLightbox from 'simplelightbox';
// additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function renderImages(images) {
  const markup = images
    .map(image => {
      return `<a class="gallery__link" href="${image.largeImageURL}">
                <div class="gallery-item">
                    <img class="gallery-item__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
                  <div class="info">
                    <p class="info-item">
                      <b>Likes: ${image.likes}</b><br>
                    </p>
                    <p class="info-item">
                      <b>Views: ${image.views}</b><br>
                    </p>
                    <p class="info-item">
                      <b>Comments: ${image.comments}</b><br>
                    </p>
                    <p class="info-item">
                      <b>Downloads: ${image.downloads}</b><br>
                    </p>
                  </div>
                </div>
              </a>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  var lightbox = new SimpleLightbox('.gallery a').refresh();
}