import refs from '../refs';
import imagesService from '../imagesAPI-service';
import updateImagesMarkup from '../updateImagesMarkup';
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
