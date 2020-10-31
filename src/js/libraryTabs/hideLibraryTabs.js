import refs from '../refs';

const hideLibraryTabs = () => {
  refs.sectionWatched.classList.remove('visibility');
  refs.searchForm.classList.remove('unVisibility');
};

export default hideLibraryTabs;
