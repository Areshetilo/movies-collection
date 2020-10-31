import './scss/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import throttle from 'lodash.throttle';
import refs from './js/refs';
import imagesService from './js/moviesAPI-service';
import updateMoviesMarkup from './js/updateMoviesMarkup';
import lazyLoad from './js/components/lazyLoad';
import loadOnScroll from './js/components/loadOnScroll';
import scrollToTop from './js/components/scrollToTop';
import isVisible from './js/components/isScrollBtnVisible';


// import filmsList from './js/currentFilmList';
import localStorageAPI from './js/localStorageAPI';
import globalVars from './js/globalVars/vars';
import showLightbox from './js/showLightbox';
import fetchedMoviesHandler from './js/fetchedMoviesHandler';
import searchErrorNotFound from './js/components/notifyErrors';

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
  imagesService.resetPage();
  fetchedMoviesHandler('search');
  e.currentTarget.reset();
};



const galleryClickHandler = ({ target }) => {
  if (target.nodeName === 'DIV') {
    const  movieID =  target.children[0].dataset.id;
    console.log(movieID +' movieID')
    fetchedMoviesHandler(movieID);
  }
};

const showLibrary = (e) => {
  if (e.target.value === 'library') {
    refs.sectionWatched.classList.add('visibility');
    refs.searchForm.classList.add('unVisibility');
    updateMoviesMarkup.reset();
    refs.queueTab.checked ? showSavedMovieQueue() : showSavedMovieWatched();

  } else if (e.target.value === 'homePage') {
    globalVars.activeTab = e.target.value;
    refs.sectionWatched.classList.remove('visibility');
    refs.searchForm.classList.remove('unVisibility');
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

refs.searchForm.addEventListener('submit', submitHandler);
refs.gallery.addEventListener('click', galleryClickHandler);
refs.toTop.addEventListener('click', function () {
  scrollToTop(30);
});

refs.headNav.addEventListener('click', showLibrary);
refs.sectionWatched.addEventListener('click', showSavedMovieFromGrade);

window.addEventListener('scroll', throttle(isVisible, 500));
