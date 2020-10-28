const globalVars = {
  _moviesArr: null,
  _activeTab: 'homePage',
  _watched: 'watched',
  _queue: 'queue',

  set moviesArr(arr) {
    this._moviesArr = arr;
  },
  get moviesArr() {
    return this._moviesArr;
  },

  set activeTab(nameTab) {
    this._activeTab = nameTab;
  },
  get activeTab() {
    return this._activeTab;
  },

  set watched(str) {
    this._watched = str;
  },
  get watched() {
    return this._watched;
  },

  set queue(str) {
    this._queue = str;
  },
  get queue() {
    return this._queue;
  }
};

export default globalVars;
