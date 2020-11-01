import refs from '../refs';

const showLibraryTabs = () => {
  refs.sectionWatched.classList.add('visibility');
  refs.searchForm.classList.add('unVisibility');
};

export default showLibraryTabs;
