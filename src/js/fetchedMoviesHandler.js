import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import moviesService from './APIService/moviesAPI-service';
import globalVars from './globalVars/vars';
import updateMoviesMarkup from './updateMoviesMarkup';
import modalOptions from './components/modal/modalOptions';
import lazyLoad from './components/observers/lazyLoad';
import Loader from './components/Loader';
import searchErrorNotFound from './components/notifyErrors';
import {
  checkMovieHandler,
  closeModalEscapeHandler,
} from './components/modal/modalListener';

const loader = new Loader('.js-loader', 'is-hidden');
const fetchedMoviesHandler = (queryType) => {
  const getMovies = async () => {
    return queryType === 'search'
      ? moviesService.fetchMovies()
      : moviesService.fetchPopularMovies();
  };

  // eslint-disable-next-line no-shadow
  const getMovieFromID = async (queryType) => {
    const url = 'https://www.youtube.com/embed/';
    const responseTrailer = await moviesService.fetchForTrailer(queryType);
    const responseMovie = await moviesService
      .fetchForID(queryType)
      .then((movie) => movie);
    let key;

    if (responseTrailer.results.length === 0) {
      key = null;
      responseMovie.trailerLink = null;
    } else {
      key = responseTrailer.results[0].key;
      responseMovie.trailerLink = `${url}${key}`;
    }

    globalVars.currentMovie = responseMovie;
    const instance = basicLightbox.create(
      updateMoviesMarkup.showModalTemplate(responseMovie),
      modalOptions
    );
    instance.show();
    window.addEventListener('keydown', closeModalEscapeHandler);
    document.addEventListener('click', closeModalEscapeHandler);
    document.addEventListener('click', checkMovieHandler);
  };

  (function () {
    if (queryType === 'search' || queryType === 'popular') {
      loader.show();
      getMovies()
        .then((moviesArr) => {
          const movies = moviesArr ?? [];
          if (movies.length) {
            globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
            updateMoviesMarkup.show(movies);
            lazyLoad();
          }
        })
        .catch((err) => {
          searchErrorNotFound(err);
          globalVars.searchQuery = '';
        })
        .finally(() => {
          loader.hide();
        });
      return;
    }

    getMovieFromID(queryType);
  })();
};

export default fetchedMoviesHandler;
