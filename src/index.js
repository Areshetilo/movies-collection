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
// import filmsList from './js/currentFilmList';
import localStorageAPI from './js/localStorageAPI';
import globalVars from './js/globalVars/vars';
import fetchedMoviesHandler from './js/fetchedMoviesHandler';
import searchErrorNotFound from './js/components/notifyErrors';
import fetchRequestToken from './js/APIService/requestToken';
import fetchSessionID from './js/APIService/getSessionID';
import showLibraryTabs from './js/libraryTabs/showLibraryTabs';
import hideLibraryTabs from './js/libraryTabs/hideLibraryTabs';

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
}

loadData().then(() => {
  let preloaderEl = document.getElementById('preloader');
  preloaderEl.classList.add('hidden');
  preloaderEl.classList.remove('visible');
});

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
  if (target.nodeName === 'DIV') {
    const movieID = target.children[0].dataset.id;
    console.log(movieID + ' movieID');
    fetchedMoviesHandler(movieID);
  }
};

const showLibraryHandler = ({ target: { value } }) => {
  if (value === 'library') {
    showLibraryTabs();
    updateMoviesMarkup.reset();
    refs.queueTab.checked ? showSavedMovieQueue() : showSavedMovieWatched();
  }
  if (value === 'tmdb') {
    showLibraryTabs();
    updateMoviesMarkup.reset();
    fetchRequestToken().then((requestToken) => {
      console.log(requestToken);
      refs.tmdbLink.href = `https://www.themoviedb.org/authenticate/${requestToken}`;
      globalVars.requestToken = requestToken;
    });
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
    globalVars.activeTab = e.target.value;

    if (e.target.value === 'watched') {
      showSavedMovieWatched();
    } else if (e.target.value === 'queue') {
      showSavedMovieQueue();
    }
    lazyLoad();
  }
};

const runLoadScroll = () => {};

const showSavedMovieWatched = () => {
  globalVars.activeTab = 'watched';
  localStorageAPI.getWatchedMovies()
    ? updateMoviesMarkup.show(localStorageAPI.getWatchedMovies())
    : updateMoviesMarkup.defaultMsg('Вы не просмотрели ни одного фильма');
};

const showSavedMovieQueue = () => {
  globalVars.activeTab = 'queue';
  localStorageAPI.getQueueMovies()
    ? updateMoviesMarkup.show(localStorageAPI.getQueueMovies())
    : updateMoviesMarkup.defaultMsg('У вас нет очереди к просмотру');
};

const tmdbButtonHandler = () => {
  fetchSessionID(globalVars.requestToken).then(
    (sessionID) => (globalVars.sessionID = sessionID)
  );
};

refs.gallery.addEventListener('click', galleryClickHandler);
refs.headNav.addEventListener('click', showLibraryHandler);
refs.searchForm.addEventListener('submit', submitHandler);
refs.sectionWatched.addEventListener('click', showSavedMovieFromGrade);
refs.tmdbButton.addEventListener('click', tmdbButtonHandler);
refs.toTop.addEventListener('click', function () {
  scrollToTop(30);
});

window.addEventListener('scroll', throttle(isVisible, 500));
