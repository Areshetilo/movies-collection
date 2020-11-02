import './scss/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import throttle from 'lodash.throttle';
import refs from './js/refs';
import moviesService from './js/APIService/moviesAPI-service';
import updateMoviesMarkup from './js/updateMoviesMarkup';
import lazyLoad from './js/components/lazyLoad';
import loadOnScroll from './js/components/loadOnScroll';
import scrollToTop from './js/components/scrollToTop';
import isVisible from './js/components/isScrollBtnVisible';
import * as basicLightbox from 'basiclightbox';
import globalVars from './js/globalVars/vars';
import fetchedMoviesHandler from './js/fetchedMoviesHandler';
import searchErrorNotFound from './js/components/notifyErrors';
import showLibraryTabs from './js/libraryTabs/showLibraryTabs';
import hideLibraryTabs from './js/libraryTabs/hideLibraryTabs';
import localStorageAPI from './js/localStorageAPI';
import modalOptions from './js/components/modal/modalOptions';
import { updateSwiperMarkup, mySwiper } from './js/swiper';
import {
  checkFilmHandler,
  closeModalEscapeHandler,
} from './js/components/modal/modalListener';

function loadData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

loadData().then(() => {
  let preloaderEl = document.getElementById('preloader');
  preloaderEl.classList.add('hidden');
  preloaderEl.classList.remove('visible');
});

// const localStorageAPI = new LocalStorageAPI();

loadOnScroll();
console.log('running populars fetch');
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
  updateMoviesMarkup.reset();
  moviesService.resetPage();
  fetchedMoviesHandler('search');
  e.currentTarget.reset();
};

const galleryClickHandler = ({ target }) => {
  const card = target.closest('.movie-card');
  if (target.closest('.movie-card').nodeName === 'DIV') {
    const movieID = card.children[0].dataset.id;
    if (localStorageAPI.checkMovie(movieID)) {
      const instance = basicLightbox.create(
        updateMoviesMarkup.showModalTemplate(globalVars.currentMovie),
        modalOptions
      );
      instance.show();
      window.addEventListener('keydown', closeModalEscapeHandler);
    } else {
      fetchedMoviesHandler(movieID);
    }
  }
};

updateSwiperMarkup.show('popular');
mySwiper.init();

const showSavedMovie = (idTab) => {
  globalVars.activeTab = idTab;
  if (localStorageAPI.getMovies(idTab).length > 0) {
    updateMoviesMarkup.show(localStorageAPI.getMovies(idTab));
  } else if (idTab === 'watchedMovies') {
    updateMoviesMarkup.defaultMsg('Вы не просмотрели ни одного фильма');
  } else {
    updateMoviesMarkup.defaultMsg('У вас нет очереди к просмотру');
  }
};

const showLibraryHandler = ({ target: { value } }) => {
  if (value === 'library') {
    showLibraryTabs();
    updateMoviesMarkup.reset();
    refs.queueTab.checked
      ? showSavedMovie('queueMovies')
      : showSavedMovie('watchedMovies');
  }

  if (value === 'homePage') {
    globalVars.activeTab = value;
    hideLibraryTabs();
    updateMoviesMarkup.reset();
    updateMoviesMarkup.show(globalVars.moviesArr);
  }
  lazyLoad();
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

// const showSavedMovieWatched = () => {
//   globalVars.activeTab = 'watched';
//   localStorageAPI.getMovies('watchedMovies').length > 0
//     ? updateMoviesMarkup.show(localStorageAPI.getMovies('watchedMovies'))
//     : updateMoviesMarkup.defaultMsg('Вы не просмотрели ни одного фильма');
// };
//
// const showSavedMovieQueue = () => {
//   globalVars.activeTab = 'queue';
//   localStorageAPI.getMovies('queueMovies').length > 0
//     ? updateMoviesMarkup.show(localStorageAPI.getMovies('queueMovies'))
//     : updateMoviesMarkup.defaultMsg('У вас нет очереди к просмотру');
// };

const tmdbButtonHandler = () => {
  fetchSessionID(globalVars.requestToken).then(
    (sessionID) => (globalVars.sessionID = sessionID)
  );
};

refs.gallery.addEventListener('click', galleryClickHandler);
refs.headNav.addEventListener('click', showLibraryHandler);
refs.searchForm.addEventListener('submit', submitHandler);
refs.sectionWatched.addEventListener('click', showSavedMovieFromGrade);
refs.toTop.addEventListener('click', function () {
  scrollToTop(30);
});

refs.headNav.addEventListener('click', showLibraryHandler);
refs.sectionWatched.addEventListener('click', showSavedMovieFromGrade);
document.addEventListener('click', checkFilmHandler);
window.addEventListener('scroll', throttle(isVisible, 500));
