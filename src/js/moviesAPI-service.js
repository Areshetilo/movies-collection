import searchErrorNotFound from './components/notifyErrors';
import globalVars from './globalVars/vars';

const API_V3 = 'fbc3bc6c91e2bf410b7bbf6ff5567525';
const API_V4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzYmM2YzkxZTJiZjQxMGI3YmJmNmZmNTU2NzUyNSIsInN1YiI6IjVlY2U0YTQxYWFlYzcxMDAyMDY2ZTE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.slIvk3yfJxfRtir2YlHit8J3E08usmxRcmm8Plgt87I';
const url = 'https://api.themoviedb.org/3';
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

const imagesService = {
  _searchQuery: '',
  _page: 1,
  _totalPages: 1,

  get page() {
    return this._page;
  },
  set page(value) {
    this._page = value;
    console.log('set page:', this._page);
  },

  set totalPages(value) {
    this._totalPages = value;
    console.log('totalPages: ', this._totalPages);
  },
  get totalPages() {
    return this._totalPages;
  },

  resetPage() {
    this._page = 1;
    console.log('reset page:', this._page);
  },

  incrementPage() {
    this._page += 1;
    console.log('increment page:', this._page);
  },

  fetchPopularMovies() {
    if (this.page <= this.totalPages) {
      return fetch(`${popularURL}&page=${this.page}`, options)
        .then((res) => res.json())
        .then((res) => {
          if (!res.results.length) {
            throw new Error('Oops, something went wrong');
          }
          this.totalPages = res.total_pages;
          this.incrementPage();
          return res.results;
        })
        .catch((err) => {
          searchErrorNotFound(err);
        });
    }
  },

  fetchMovies() {
    if (this.page <= this.totalPages) {
      return fetch(
        `${searchURL}&query=${globalVars.searchQuery}&page=${this.page}`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          if (!res.results.length) {
            throw new Error('Unfortunately, your request not found.');
          }
          console.log(res);
          this.totalPages = res.total_pages;
          this.incrementPage();
          return res.results;
        })
        .catch((err) => {
          searchErrorNotFound(err);
        });
    }
  }
};

export default imagesService;
