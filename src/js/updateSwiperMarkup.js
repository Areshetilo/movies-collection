import swiperMarkup from '../templates/swiperCard.hbs';
import refs from './refs';
import movieModalTemplate from '../templates/imageLightbox.hbs';

const updateSwiperMarkup = {
  show(movies) {
    const markup = swiperMarkup(movies);
    refs.swiperWrap.insertAdjacentHTML('beforeend', markup);
  },
  reset() {
    refs.swiperWrap.innerHTML = '';
  },
  showModalTemplate(movie) {
    return movieModalTemplate(movie);
  },
};

export default updateSwiperMarkup;
