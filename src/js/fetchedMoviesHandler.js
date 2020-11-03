import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import moviesService from './APIService/moviesAPI-service';
import globalVars from './globalVars/vars';
import updateMoviesMarkup from './updateMoviesMarkup';
import modalOptions from './components/modal/modalOptions';
import lazyLoad from './components/lazyLoad';
import Loader from './components/Loader';
import searchErrorNotFound from './components/notifyErrors';
import { closeModalEscapeHandler } from './components/modal/modalListener';
import { updateSwiperMarkup } from './swiper';

const loader = new Loader('.js-loader', 'is-hidden');
const fetchedMoviesHandler = (queryType) => {
  const getMovies = async () => {
    return queryType === 'search'
      ? moviesService.fetchMovies()
      : moviesService.fetchPopularMovies();
  };

  // eslint-disable-next-line no-shadow
  const getMovieFromID = async (queryType) => {
    return moviesService.fetchForID(queryType);
  };

  (function () {
    if (queryType === 'search' || queryType === 'popular') {
      loader.show();
      getMovies()
        .then((moviesArr) => {
          const movies = moviesArr ?? [];
          console.log('movies:', movies);
          if (movies.length) {
            globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
            console.log('moviesArr: ', globalVars.moviesArr);
            updateMoviesMarkup.show(movies);
            updateSwiperMarkup.show(movies);
            lazyLoad();
          }
        })
        .catch((err) => searchErrorNotFound(err))
        .finally(() => {
          loader.hide();
        });
    } else {
      getMovieFromID(queryType)
        .then((movie) => {
          globalVars.currentMovie = movie;
          const instance = basicLightbox.create(
            updateMoviesMarkup.showModalTemplate(movie),
            modalOptions
          );
          instance.show();
          window.addEventListener('keydown', closeModalEscapeHandler);
          document.addEventListener('click', closeModalEscapeHandler);
        })
        .finally(() => {});
    }
  }());
};

export default fetchedMoviesHandler;
