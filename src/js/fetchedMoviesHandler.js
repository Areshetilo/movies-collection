import imagesService from './moviesAPI-service';
import globalVars from './globalVars/vars';
import updateMoviesMarkup from './updateMoviesMarkup';
import lazyLoad from './components/lazyLoad';
import Loader from './components/Loader';

const loader = new Loader('.js-loader', 'is-hidden');
const fetchedMoviesHandler = (queryType) => {
  const getMovies = async () => {
     return  queryType === 'search' ?
      imagesService.fetchMovies() :
      imagesService.fetchPopularMovies()
    }

  const getMovieFromID = async (queryType) => {
    return imagesService.fetchForID(queryType);
  }

  loader.show();

  (function () {
    if (queryType === 'search' || queryType === 'popular'){


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
        .finally(() => {
          loader.hide();
        });
    }else{
      getMovieFromID(queryType).then(console.log)
    }
  }())


};

export default fetchedMoviesHandler;
