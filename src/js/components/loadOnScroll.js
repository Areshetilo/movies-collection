import refs from '../refs';
import imagesService from '../moviesAPI-service';
import updateMoviesMarkup from '../updateMoviesMarkup';
import lazyLoad from './lazyLoad';
import globalVars from '../globalVars/vars';
import localStorageAPI from '../localStorageAPI';


const options = { rootMargin: '500px' };

const onEntry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (globalVars.activeTab === 'homePage') {
        if (globalVars.queue) {
          imagesService.fetchMovies().then((movies) => {
            globalVars.moviesArr = [...movies];
            updateMoviesMarkup.show(movies);
            lazyLoad();
          });
        } else {
          imagesService.fetchPopularMovies().then((movies) => {
            updateMoviesMarkup.show(movies);
            globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
            console.log(globalVars.moviesArr);
            lazyLoad();
          });
        }
      } else if (globalVars.activeTab === 'watched') {
        //updateMoviesMarkup.show(updateMoviesLocalStorage.getWatchedMovies());
      } else if (globalVars.activeTab === 'queue') {
        //updateMoviesMarkup.show(updateMoviesLocalStorage.getQueueMovies());
      }
    }
  });
};

const intersectionObserver = new IntersectionObserver(onEntry, options);

const loadOnScroll = () => {

  intersectionObserver.observe(refs.bottom);
};


export default loadOnScroll;
