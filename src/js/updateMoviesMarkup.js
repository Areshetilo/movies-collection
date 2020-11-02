import movieCardTemplate from '../templates/movieCard.hbs';
import movieModalTemplate from '../templates/imageLightbox.hbs';
import refs from './refs';
import lazyLoad from '../../../Новая папка/movies-collection/movies-collection/src/js/components/lazyLoad';

const updateMoviesMarkup = {
  show(movies) {
    const markup = movieCardTemplate(movies);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lazyLoad();
  },
  reset() {
    refs.gallery.innerHTML = '';
    console.log('убираем разметку');
  },

  defaultMsg(msg) {
    refs.gallery.innerHTML = `${msg}`;
  },

  showModalTemplate(movie) {
    return movieModalTemplate(movie);
  },
};

export default updateMoviesMarkup;
