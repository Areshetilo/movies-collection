import './scss/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import throttle from 'lodash.throttle';
import refs from './js/refs';
import imagesService from './js/moviesAPI-service';
import updateMoviesMarkup from './js/updateMoviesMarkup';
import Loader from './js/components/Loader';
import lazyLoad from './js/components/lazyLoad';
import loadOnScroll from './js/components/loadOnScroll';
import scrollToTop from './js/components/scrollToTop';
import isVisible from './js/components/isScrollBtnVisible';

import showLightbox from './js/showLightbox';

const loader = new Loader('.js-loader', 'is-hidden');

imagesService.fetchPopularMovies().then((movies) => {
  console.log(movies);
  updateMoviesMarkup.show(movies);
  lazyLoad();
});

const submitHandler = (e) => {
  e.preventDefault();
  const reg = /^[a-zа-яё\s]+$/iu;
  const inputValue = e.currentTarget.elements.query.value.match(reg).input;
  //TODO check if inputValue is not a null
  updateMoviesMarkup.reset();
  loader.show();
  imagesService.query = inputValue;
  imagesService.resetPage();
  imagesService
    .fetchPopularMovies()
    .then((movies) => {
      updateMoviesMarkup.show(movies);
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
  scrollToTop(30);
});
window.addEventListener('scroll', throttle(isVisible, 500));
