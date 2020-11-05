import refs from '../../refs';
import globalVars from '../../globalVars/vars';
import fetchedMoviesHandler from '../../fetchedMoviesHandler';

const options = { rootMargin: '800px' };
const onEntry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (globalVars.activeTab === 'homePage') {
        if (globalVars.searchQuery) {
          fetchedMoviesHandler('search');
        } else {
          fetchedMoviesHandler('popular');
        }
      }
    }
  });
};
const intersectionObserver = new IntersectionObserver(onEntry, options);
const loadOnScroll = () => {
  intersectionObserver.observe(refs.bottom);
};

export default loadOnScroll;
