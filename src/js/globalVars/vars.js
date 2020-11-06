const globalVars = {
  _activeTab: 'homePage',
  _moviesArr: [],
  _topMoviesArr: [],
  _queue: 'queue',
  _searchQuery: '',
  _watched: 'watched',
  _currentMovie: null,

  set currentMovie(movie) {
    this._currentMovie = movie;
  },
  get currentMovie() {
    return this._currentMovie;
  },

  set activeTab(nameTab) {
    this._activeTab = nameTab;
  },
  get activeTab() {
    return this._activeTab;
  },

  set moviesArr(arr) {
    this._moviesArr = arr;
  },
  get moviesArr() {
    return this._moviesArr;
  },

  set queue(str) {
    this._queue = str;
  },
  get queue() {
    return this._queue;
  },

  set searchQuery(str) {
    this._searchQuery = str;
  },
  get searchQuery() {
    return this._searchQuery;
  },

  set watched(str) {
    this._watched = str;
  },
  get watched() {
    return this._watched;
  },
};

export default globalVars;
