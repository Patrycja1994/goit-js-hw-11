import axios from "axios";
import { Notify } from "notiflix";

export let lastPage = 1;

export async function fetchImages (inputName, page) {
    try {
        const response = await axios.get(`https://pixabay.com/api/`, {
                method: 'get',
                params: {
                    key: '31081943-fde7852d3c642a63447541410',
                    q: inputName,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: 'true',
                    per_page: 40,
                    page: page,
                },
            });

            if (response.data.totalHits === 0) {
                return Notify.failure ('Sorry, there are no images matching your search query. Please try again.')
            }

            if (response.data.totalHits > 0 && page === 1) {
                return Notify.success (`Hooray! We found ${response.data.totalHits} images.`);
            }
            
            if (response.data.totalHits % 40 === 0) {
                lastPage = response.data.totalHits / 40;
            } else {
                lastPage = Math.floor(response.data.totalHits / 40) + 1;
            }
            return response.data;
    }
    catch (error) {
        console.log('error');
    }
};

