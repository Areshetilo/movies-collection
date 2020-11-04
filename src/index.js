import throttle from 'lodash.throttle';
import * as basicLightbox from 'basiclightbox';
import runPreloader from './js/components/preloader';
import { footerObserver } from './js/components/observers/footerObserver';
import lazyLoad from './js/components/observers/lazyLoad';
import loadOnScroll from './js/components/observers/loadOnScroll';
import scrollToTop from './js/components/scrollToTop';
import isVisible from './js/components/isScrollBtnVisible';
import searchErrorNotFound from './js/components/notifyErrors';
import modalOptions from './js/components/modal/modalOptions';
import refs from './js/refs';
import moviesService from './js/APIService/moviesAPI-service';
import updateMoviesMarkup from './js/updateMoviesMarkup';
import updateSwiperMarkup from './js/updateSwiperMarkup';
import globalVars from './js/globalVars/vars';
import localStorageAPI from './js/localStorageAPI';
import fetchedTopRated from './js/fetchedTopRated';
import fetchedMoviesHandler from './js/fetchedMoviesHandler';
import showLibraryTabs from './js/libraryTabs/showLibraryTabs';
import hideLibraryTabs from './js/libraryTabs/hideLibraryTabs';
import {
  checkMovieHandler,
  closeModalEscapeHandler,
} from './js/components/modal/modalListener';
import showSavedMovie from './js/showSavedMovie';

import './scss/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'basiclightbox/dist/basicLightbox.min.css';

loadOnScroll();

console.log('running populars fetch');
fetchedTopRated('topRated');
fetchedMoviesHandler('popular');

const submitHandler = (e) => {
  e.preventDefault();
  const reg = /^[0-9a-zа-яё\s]+$/iu;
  const inputValue = e.currentTarget.elements.query.value.trim().match(reg);
  if (!inputValue) {
    searchErrorNotFound(
      'Please enter correct movie name (numbers, latin and cyrillic symbols are allowed)'
    );
    return;
  }
  globalVars.searchQuery = inputValue;
  globalVars.moviesArr = [];
  footerObserver();
  updateMoviesMarkup.reset();
  updateSwiperMarkup.reset();
  refs.swiperContainer.style.display = 'none';
  moviesService.resetPage();
  fetchedMoviesHandler('search');
  e.currentTarget.reset();
};

const galleryClickHandler = ({ target }) => {
  const card = target.closest('.movie-card');
  if (card && card.nodeName === 'DIV') {
    const movieID = card.children[0].dataset.id;
    if (localStorageAPI.checkMovie(movieID)) {
      const instance = basicLightbox.create(
        updateMoviesMarkup.showModalTemplate(globalVars.currentMovie),
        modalOptions
      );
      instance.show();

      window.addEventListener('keydown', closeModalEscapeHandler);
      document.addEventListener('click', closeModalEscapeHandler);
      document.addEventListener('click', checkMovieHandler);
    } else {
      fetchedMoviesHandler(movieID);
    }
  }
};

// const swiperClickHandler = ({ target }) => {
//   const card = target.closest('.swiper-card__image');
//   if (card && card.nodeName === 'DIV') {
//     const movieID = card.children[0].dataset.id;
//     if (localStorageAPI.checkMovie(movieID)) {
//       const instance = basicLightbox.create(
//         updateSwiperMarkup.showModalTemplate(globalVars.currentMovie),
//         modalOptions
//       );
//       instance.show();
//
//       window.addEventListener('keydown', closeModalEscapeHandler);
//       document.addEventListener('click', closeModalEscapeHandler);
//       document.addEventListener('click', checkMovieHandler);
//     } else {
//       fetchedMoviesHandler(movieID);
//     }
//   }
// };

const showLibraryHandler = ({ target: { value } }) => {
  if (value === 'library') {
    showLibraryTabs();
    updateMoviesMarkup.reset();
    updateSwiperMarkup.reset();
    refs.noMoviesMessage.textContent = '';
    refs.queueTab.checked
      ? showSavedMovie('queueMovies')
      : showSavedMovie('watchedMovies');
  }

  if (value === 'homePage') {
    globalVars.activeTab = value;
    hideLibraryTabs();
    updateMoviesMarkup.reset();
    refs.noMoviesMessage.textContent = '';
    updateMoviesMarkup.show(globalVars.moviesArr);
    fetchedTopRated('topRated');
  }
  lazyLoad();
  footerObserver();
};

const showSavedMovieFromGrade = (e) => {
  if (e.target.tagName === 'INPUT') {
    updateMoviesMarkup.reset();
    if (e.target.value === 'watchedMovies') {
      showSavedMovie(e.target.value);
    } else if (e.target.value === 'queueMovies') {
      showSavedMovie(e.target.value);
    }
    lazyLoad();
  }
};

refs.gallery.addEventListener('click', galleryClickHandler);
// refs.swiperSLide.addEventListener('click', swiperClickHandler);
refs.headNav.addEventListener('click', showLibraryHandler);
refs.searchForm.addEventListener('submit', submitHandler);
refs.sectionWatched.addEventListener('click', showSavedMovieFromGrade);
refs.toTop.addEventListener('click', function () {
  scrollToTop(30);
});
refs.headNav.addEventListener('click', showLibraryHandler);
refs.sectionWatched.addEventListener('click', showSavedMovieFromGrade);
window.addEventListener('scroll', throttle(isVisible, 500));
