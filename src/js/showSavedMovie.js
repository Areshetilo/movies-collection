import globalVars from './globalVars/vars';
import localStorageAPI from './localStorageAPI';
import updateMoviesMarkup from './updateMoviesMarkup';

const showSavedMovie = (idTab) => {
  globalVars.activeTab = idTab;
  if (localStorageAPI.getMovies(idTab).length > 0) {
    updateMoviesMarkup.show(localStorageAPI.getMovies(idTab));
  } else if (idTab === 'watchedMovies') {
    updateMoviesMarkup.defaultMsg('You do not have any watched movies:(');
  } else {
    updateMoviesMarkup.defaultMsg('You do not have any queued movies:(');
  }
};

export default showSavedMovie;
