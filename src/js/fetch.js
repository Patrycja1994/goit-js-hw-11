import { Notify } from 'notiflix';

import axios from 'axios';

export let lastPage = 1;

const IMAGES_API_URL = 'https://pixabay.com/api/';

export async function fetchImages(name, page) {
  try {
    const response = await axios.get(IMAGES_API_URL, {
      method: 'get',
      params: {
        key: '31081943-fde7852d3c642a63447541410',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    if (response.data.totalHits === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (response.data.totalHits > 0 && page === 1)
      Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );

    if (response.data.totalHits % 40 === 0) {
      lastPage = response.data.totalHits / 40;
    } else {
      lastPage = Math.floor(response.data.totalHits / 40) + 1;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}