import swiperMarkup from '../templates/swiperCard.hbs';
import refs from './refs';

const updateSwiperMarkup = {
  show(movies) {
    const markup = swiperMarkup(movies);
    refs.swiperWrap.insertAdjacentHTML('beforeend', markup);
  },
};

export default updateSwiperMarkup;
