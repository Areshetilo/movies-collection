import refs from '../refs';
import imagesService from '../moviesAPI-service';
import updateImagesMarkup from '../updateMoviesMarkup';
import lazyLoad from './lazyLoad';
import globalVars from "../globalVars/vars";

import updateMoviesLocalStorage from '../updateMoviesLocalStorage'

const loadOnScroll = () => {
  const options = { rootMargin: '500px' };
  const onEntry = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(globalVars.activeTab, "main")
        if (globalVars.activeTab==='homePage'){
          console.log(globalVars.activeTab)
          imagesService.fetchImages().then((images) => {
            updateImagesMarkup.show(images);

          });
        }else if(globalVars.activeTab==='watched'){
          console.log(globalVars.activeTab, "  else if(globalVars.activeTab==='watched' ")
          updateImagesMarkup.show(updateMoviesLocalStorage.getWatchedMovies());

        }else if(globalVars.activeTab==='queue'){
          console.log(globalVars.activeTab)
          updateImagesMarkup.show(updateMoviesLocalStorage.getQueueMovies());
        }
        lazyLoad();

      }
    });
  };
  const intersectionObserver = new IntersectionObserver(onEntry, options);
  intersectionObserver.observe(refs.bottom);
};

export default loadOnScroll;
