import globalVars from '../globalVars/vars';
import API_V4 from './APIKey/APIKey';

const url = 'https://api.themoviedb.org/3';
const popularURL = `${url}/movie/popular?language=en-US`;
const searchURL = `${url}/search/movie?language=en-US&include_adult=true`;
const topRatedURL = `${url}/movie/top_rated?language=en-US`;

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_V4}`,
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
  },
};

const moviesService = {
  _searchQuery: '',
  _page: 1,
  _totalPages: 1,

  get page() {
    return this._page;
  },
  set page(value) {
    this._page = value;
  },

  set totalPages(value) {
    this._totalPages = value;
  },
  get totalPages() {
    return this._totalPages;
  },

  resetPage() {
    this._page = 1;
  },

  incrementPage() {
    this._page += 1;
  },

  async fetchPopularMovies() {
    if (this.page <= this.totalPages) {
      try {
        const popularMovies = await fetch(
          `${popularURL}&page=${this.page}`,
          options
        )
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
            throw new Error('Oops, something happened, we are fixing it');
          })
          .then((res) => {
            if (!res.results.length) {
              throw new Error(
                "Unfortunately, we can't get popular movies right now"
              );
            }
            this.totalPages = res.total_pages;
            return res.results;
          });
        this.incrementPage();
        return popularMovies;
      } catch (err) {
        throw err;
      }
    }
  },

  async topRatedMovies() {
    try {
      return await fetch(`${topRatedURL}`, options).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('Oops, something happened, we are fixing it');
      });
    } catch (err) {
      throw err;
    }
  },

  async fetchMovies() {
    if (this.page <= this.totalPages) {
      try {
        const searchedMovies = await fetch(
          `${searchURL}&query=${globalVars.searchQuery}&page=${this.page}`,
          options
        )
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
            throw new Error('Oops, something happened, we are fixing it');
          })
          .then((res) => {
            if (!res.results.length) {
              throw new Error('Unfortunately, your request not found.');
            }
            this.totalPages = res.total_pages;
            return res.results;
          });
        this.incrementPage();
        return searchedMovies;
      } catch (err) {
        throw err;
      }
    }
  },
  fetchForTrailer(targetID) {
    return fetch(
      `${url}/movie/${targetID}/videos?api_key=${API_V4}>>&language=en-US`,
      options
    ).then((res) => res.json());
  },
  fetchForID(targetID) {
    return fetch(
      `${url}/movie/${targetID}?api_key=${API_V4}>>&language=en-US`,
      options
    ).then((res) => res.json());
  },
};

export default moviesService;
