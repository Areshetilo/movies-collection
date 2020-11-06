import movieCardTemplate from '../templates/movieCard.hbs';
import movieModalTemplate from '../templates/imageLightbox.hbs';
import refs from './refs';
import lazyLoad from './components/observers/lazyLoad';
import '../images/noPoster.jpg';
import '../images/noImageCard.jpg';

const updateMoviesMarkup = {
  show(movies) {
    const markup = movieCardTemplate(movies);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lazyLoad();
  },
  reset() {
    refs.gallery.innerHTML = '';
  },

  defaultMsg(msg) {
    refs.gallery.innerHTML = `<p class="default-msg">${msg}</p>`;
  },

  showModalTemplate(movie) {
    return movieModalTemplate(movie);
  },
};

export default updateMoviesMarkup;
