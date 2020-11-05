import globalVars from './globalVars/vars';
import hideLibraryTabs from './libraryTabs/hideLibraryTabs';
import updateMoviesMarkup from './updateMoviesMarkup';
import refs from './refs';

const showHomePage = () => {
  globalVars.activeTab = 'homePage';
  hideLibraryTabs();
  updateMoviesMarkup.reset();
  refs.noMoviesMessage.textContent = '';
  updateMoviesMarkup.show(globalVars.moviesArr);
  refs.swiperContainer.classList.remove('swiper-hidden');
};

export default showHomePage;
