import refs from '../refs';
import imagesService from '../moviesAPI-service';
import updateMoviesMarkup from '../updateMoviesMarkup';
import lazyLoad from './lazyLoad';
import globalVars from '../globalVars/vars';

import updateMoviesLocalStorage from '../updateMoviesLocalStorage';

const loadOnScroll = () => {
  const activeTab = globalVars.activeTab;
  const options = { rootMargin: '500px' };
  const onEntry = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (activeTab === 'homePage') {
          console.log('мы на главной');
          imagesService.fetchPopularMovies().then((movies) => {
            updateMoviesMarkup.show(movies);
            lazyLoad();
          });
        } else if (activeTab === 'watched') {
          console.log('переходим на watched');
          updateMoviesMarkup.show(updateMoviesLocalStorage.getWatchedMovies());
        } else {
          updateMoviesMarkup.show(updateMoviesLocalStorage.getQueueMovies());
        }
      }
    });
  };
  const intersectionObserver = new IntersectionObserver(onEntry, options);
  intersectionObserver.observe(refs.bottom);
};

export default loadOnScroll;
