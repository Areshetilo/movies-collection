import refs from '../refs';
import globalVars from '../globalVars/vars';
import fetchedMoviesHandler from '../fetchedMoviesHandler';

const options = { rootMargin: '400px' };
const onEntry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('intersecting!');
      if (globalVars.activeTab === 'homePage') {
        if (globalVars.searchQuery) {
          console.log('running user search fetch');
          fetchedMoviesHandler('search');
        } else {
          console.log('running populars fetch');
          fetchedMoviesHandler('popular');
        }
      } else if (globalVars.activeTab === 'watched') {
        //updateMoviesMarkup.show(updateMoviesLocalStorage.getWatchedMovies());
      } else if (globalVars.activeTab === 'queue') {
        //updateMoviesMarkup.show(updateMoviesLocalStorage.getQueueMovies());
      }
    }
  });
};
const intersectionObserver = new IntersectionObserver(onEntry, options);
const loadOnScroll = () => {
  intersectionObserver.observe(refs.bottom);
  console.log('observer is running');
};

export default loadOnScroll;
