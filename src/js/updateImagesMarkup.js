import imageCardTemplate from '../templates/imageCard.hbs';
import refs from './refs';

const updateImagesMarkup = {
  show(images) {
    const markup = imageCardTemplate(images);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  },
  reset() {
    refs.gallery.innerHTML = '';
  }
};

export default updateImagesMarkup;
