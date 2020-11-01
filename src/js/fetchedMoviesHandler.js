import "basiclightbox/dist/basicLightbox.min.css";
import * as basicLightbox from 'basiclightbox'
import imagesService from './moviesAPI-service';
import globalVars from './globalVars/vars';
import updateMoviesMarkup from './updateMoviesMarkup';
import modalOptions from "./modalOptions";
import lazyLoad from './components/lazyLoad';
import Loader from './components/Loader';
import refs from "./refs";
import localStorageAPI from "./localStorageAPI";

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


  (function () {
    if (queryType === 'search' || queryType === 'popular'){

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
        .finally(() => {
          loader.hide();
        });
    }else{
      getMovieFromID(queryType).then(movie=>{
        globalVars.currentMovie = movie;
        const instance = basicLightbox.create(updateMoviesMarkup.showModalTemplate(movie), modalOptions);
        instance.show()

      }).finally(()=>{

      })
    }
  }())

};



export default fetchedMoviesHandler;
