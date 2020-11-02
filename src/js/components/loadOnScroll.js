import refs from '../refs';
import { showToasty, destroyToasty } from '../updateToasyMarkup';
import globalVars from '../globalVars/vars';
import fetchedMoviesHandler from '../fetchedMoviesHandler';

const options = { rootMargin: '400px' };
const onEntry = (entries) => {
  entries.forEach((entry) => {
    console.log('зашли');
    if (entry.isIntersecting) {
      console.log('зашли isIntersecting');
      console.log(globalVars.activeTab);

      console.log('intersecting!');
      if (globalVars.activeTab === 'homePage') {
        if (globalVars.searchQuery) {
          console.log('running user search fetch');
          fetchedMoviesHandler('search');
        } else {
          console.log('running populars fetch');
          fetchedMoviesHandler('popular');
        }
      } else if (
        globalVars.activeTab === 'watchedMovies' ||
        globalVars.activeTab === 'queueMovies'
      ) {
        showToasty();
        destroyToasty();
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
