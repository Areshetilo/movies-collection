import './scss/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import throttle from 'lodash.throttle';
import refs from './js/refs';
import imagesService from './js/imagesAPI-service';
import updateImagesMarkup from './js/updateImagesMarkup';
import Loader from './js/components/Loader';
import lazyLoad from './js/components/lazyLoad';
import loadOnScroll from './js/components/loadOnScroll';
import scrollToTop from './js/components/scrollToTop';
import isVisible from './js/components/isScrollBtnVisible';

import showLightbox from './js/showLightbox';

const loader = new Loader('.js-loader', 'is-hidden');

imagesService.fetchImages().then((images) => {
  updateImagesMarkup.show(images);
  lazyLoad();
  imagesService.editors = false;
  imagesService.imagesPerPage = 12;
});

const submitHandler = (e) => {
  e.preventDefault();
  updateImagesMarkup.reset();
  loader.show();
  imagesService.query = e.currentTarget.elements.query.value;
  imagesService.resetPage();
  imagesService
    .fetchImages()
    .then((images) => {
      updateImagesMarkup.show(images);
      lazyLoad();
      loadOnScroll();
    })
    .finally(() => loader.hide());
  e.currentTarget.reset();
};

const galleryClickHandler = ({ target }) => {
  if (target.nodeName === 'IMG') {
    const imageElArr = Array.from(
      refs.gallery.querySelectorAll('.gallery-image')
    );
    const imageSrcArr = imageElArr.map((image) => image.dataset.source);
    const currentTargetId = imageSrcArr.findIndex(
      (value) => value === target.dataset.source
    );
    showLightbox(imageSrcArr, currentTargetId);
  }
};

refs.searchForm.addEventListener('submit', submitHandler);
refs.gallery.addEventListener('click', galleryClickHandler);
refs.toTop.addEventListener('click', function () {
  scrollToTop(1);
});
window.addEventListener('scroll', throttle(isVisible, 500));
