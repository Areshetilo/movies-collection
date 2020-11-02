import searchErrorNotFound from '../components/notifyErrors';
import globalVars from '../globalVars/vars';

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

  async fetchPopularMovies() {
    if (this.page <= this.totalPages) {
      try {
        const popularMovies = await fetch(
          `${popularURL}&page=${this.page}`,
          options
        ).then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error("Oops, something happened, we're are fixing it");
        });
        console.log(popularMovies);
        this.totalPages = popularMovies.total_pages;
        this.incrementPage();
        return popularMovies.results;
      } catch (err) {
        throw err;
      }
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
  },

  fetchForID(targetID) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${targetID}?api_key=${API_V4}>>&language=en-US`,
      options
    ).then((res) => res.json());
  },
};

export default moviesService;
