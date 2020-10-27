import refs from '../refs';
import imagesService from '../moviesAPI-service';
import updateImagesMarkup from '../updateMoviesMarkup';
import lazyLoad from './lazyLoad';

const loadOnScroll = () => {
  const options = { rootMargin: '500px' };
  const onEntry = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imagesService.fetchImages().then((images) => {
          updateImagesMarkup.show(images);
          lazyLoad();
        });
      }
    });
  };
  const intersectionObserver = new IntersectionObserver(onEntry, options);
  intersectionObserver.observe(refs.bottom);
};

export default loadOnScroll;
