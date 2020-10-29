import searchErrorNotFound from './components/notifyErrors';
const API_V3 = 'fbc3bc6c91e2bf410b7bbf6ff5567525';
const API_V4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzYmM2YzkxZTJiZjQxMGI3YmJmNmZmNTU2NzUyNSIsInN1YiI6IjVlY2U0YTQxYWFlYzcxMDAyMDY2ZTE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.slIvk3yfJxfRtir2YlHit8J3E08usmxRcmm8Plgt87I';
const url = 'https://api.themoviedb.org/3/';
const popularURL = `${url}/movie/popular?language=en-US`;
const searchURL = `${url}/search/movie?language=en-US&include_adult=true`;

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_V4}`,
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  }
};

const moviesAPI = {
  fetchPopularMovies() {
    return fetch(`${popularURL}&page=${this.page}`, options)
      .then((res) => res.json())
      .then(({ results }) => {
        return { results };
      });
  },
  fetchQueryMovies(searchQuery = '', page = 1) {
    return fetch(`${searchURL}&query=${searchQuery}&page=${page}`, options)
      .then((res) => res.json())
      .then(({ results, total_results: total }) => {
        if (!results.length) {
          throw new Error('Unfortunately, your request not found.');
        }
        return { total, results };
      });
  }
};

const imagesService = {
  _searchQuery: '',
  _page: 1,
  _totalPages: 1,

  get query() {
    return this._searchQuery;
  },
  set query(value) {
    this._searchQuery = value;
  },

  get page() {
    return this._page;
  },
  set page(value) {
    this._page = value;
  },

  get totalPages() {
    return this._totalPages;
  },
  set totalPages(value) {
    this._totalPages = value;
  },

  resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  fetchPopularMovies() {
    return fetch(`${popularURL}&page=${this.page}`, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.results.length) {
          throw new Error('Oops, something went wrong');
        }
        this.incrementPage();
        return res.results;
      })
      .catch((err) => {
        searchErrorNotFound(err);
      });
  },

  fetchMovies() {
    return fetch(`${searchURL}&query=${this.query}&page=${this.page}`, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.results.length) {
          throw new Error('Unfortunately, your request not found.');
        }
        console.log(res);
        this.incrementPage();
        return res.results;
      })
      .catch((err) => {
        searchErrorNotFound(err);
      });
  }
};

export default imagesService;
