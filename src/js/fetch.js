import axios from "axios";
import { page } from "..index"; 
import { Notify } from "notiflix";

const URL_API_IMAGES = 'https://pixabay.com/api/';

export async function fetchImages (inputName, page) {
    try {
            const response = await axios.get(URL_API_IMAGES, {
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

            if (response.data.totalHits > 0 ) {
                return Notify.success (`Hooray! We found ${response.data.totalHits} images.`);
            }

            return response.data;
    }
    catch (error) {
        console.log('error');
    }
};

