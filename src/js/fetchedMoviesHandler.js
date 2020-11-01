import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import moviesService from './APIService/moviesAPI-service';
import globalVars from './globalVars/vars';
import updateMoviesMarkup from './updateMoviesMarkup';
import modalOptions from './modalOptions';
import lazyLoad from './components/lazyLoad';
import Loader from './components/Loader';
import searchErrorNotFound from './components/notifyErrors';

const loader = new Loader('.js-loader', 'is-hidden');
const fetchedMoviesHandler = (queryType) => {
  const getMovies = async () => {
    return queryType === 'search'
      ? moviesService.fetchMovies()
      : moviesService.fetchPopularMovies();
  };

  const getMovieFromID = async (queryType) => {
    return moviesService.fetchForID(queryType);
  };

  (function () {
    if (queryType === 'search' || queryType === 'popular') {
      loader.show();
      getMovies()
        .then((movies) => {
          movies = movies ?? [];
          console.log('movies:', movies);
          if (movies.length) {
            globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
            console.log('moviesArr: ', globalVars.moviesArr);
            updateMoviesMarkup.show(movies);
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
          const instance = basicLightbox.create(
            updateMoviesMarkup.showModalTemplate(movie),
            modalOptions
          );
          instance.show();
        })
        .finally(() => {
          loader.hide();
        });
    }
  })();
};

export default fetchedMoviesHandler;
