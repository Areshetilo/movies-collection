import refs from '../refs';
import imagesService from '../moviesAPI-service';
import updateImagesMarkup from '../updateMoviesMarkup';
import lazyLoad from './lazyLoad';

import updateMoviesLocalStorage from '../updateMoviesLocalStorage'

const loadOnScroll = (activeTab) => {
  const options = { rootMargin: '0px' };
  const onEntry = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (activeTab==='homePage'){
          imagesService.fetchImages().then((images) => {
            updateImagesMarkup.show(images);
            lazyLoad();
          });
        }else if(activeTab==='watched'){
          updateImagesMarkup.show(updateMoviesLocalStorage.getWatchedMovies());

        }else{
          updateImagesMarkup.show(updateMoviesLocalStorage.getQueueMovies());
        }

      }
    });
  };
  const intersectionObserver = new IntersectionObserver(onEntry, options);
  intersectionObserver.observe(refs.bottom);
};

export default loadOnScroll;
