import searchErrorNotFound from './components/notifyErrors';
const API_V3 = 'fbc3bc6c91e2bf410b7bbf6ff5567525';
const API_V4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzYmM2YzkxZTJiZjQxMGI3YmJmNmZmNTU2NzUyNSIsInN1YiI6IjVlY2U0YTQxYWFlYzcxMDAyMDY2ZTE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.slIvk3yfJxfRtir2YlHit8J3E08usmxRcmm8Plgt87I';
const url = 'https://api.themoviedb.org/3/';
const popularURL = `${url}/movie/popular?language=en-US&page=1`;
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
    return fetch(`${popularURL}`, options)
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
  searchQuery: '',
  apiKey: '18257903-4453e2975e3dd917fd04b41f9',
  baseUrl: 'https://pixabay.com/api/',
  perPage: 10,
  page: 1,
  editorsChoice: true,

  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },

  resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  fetchPopularMovies() {
    return fetch(`${popularURL}`, options)
      .then((res) => res.json())
      .then((obj) => {
        return obj.results;
      });
  },

  fetchImages() {
    return fetch(
      `${this.baseUrl}?key=${this.apiKey}&q=${this.query}&per_page=${this.perPage}&page=${this.page}
      &editors_choice=${this.editorsChoice}`
    )
      .then((res) => res.json())
      .then(({ hits: images }) => {
        if (!images.length) {
          throw new Error('Unfortunately, your request not found.');
        }
        this.incrementPage();
        return images;
      })
      .catch((err) => {
        searchErrorNotFound(err);
      });
  }
};

export default imagesService;