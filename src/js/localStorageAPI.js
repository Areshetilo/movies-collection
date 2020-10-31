import globalVars from './globalVars/vars';

const localStorageAPI = {
  setAll(movie) {
    localStorage.setItem('watchedMovies', JSON.stringify(movie));
  },

  toggleWatchedMovie(movie) {
    if (this.getMovie(movie) === globalVars.watched) {
      localStorage.setItem(
        'watchedMovies',
        JSON.stringify(
          this.getWatchedMovies().filter((film) => film.id !== movie.id)
        )
      );
      return true;
    }
    this.toggleQueueMovie(movie) &&
      localStorage.setItem(
        'queueMovies',
        JSON.stringify(
          this.getQueueMovies().filter((film) => film.id !== movie.id)
        )
      );

    localStorage.setItem(
      'watchedMovies',
      JSON.stringify([movie, ...this.getWatchedMovies()])
    );
  },

  toggleQueueMovie(movie) {
    if (this.getMovie(movie) === globalVars.queue) {
      localStorage.setItem(
        'queueMovies',
        JSON.stringify(
          this.getQueueMovies().filter((film) => film.id !== movie.id)
        )
      );
      return true;
    }
    this.toggleWatchedMovie(movie) &&
      localStorage.setItem(
        'watchedMovies',
        JSON.stringify(
          this.getWatchedMovies().filter((film) => film.id !== movie.id)
        )
      );

    localStorage.setItem(
      'queueMovies',
      JSON.stringify([movie, ...this.getQueueMovies()])
    );
  },

  getWatchedMovies() {
    if (localStorage.getItem('watchedMovies')) {
      return JSON.parse(localStorage.getItem('watchedMovies'));
    }
  },
  getQueueMovies() {
    if (localStorage.getItem('queueMovies')) {
      return JSON.parse(localStorage.getItem('queueMovies'));
    }
  },

  getMovie(movie) {
    if (this.getWatchedMovies().find((film) => film.id === movie.id)) {
      return globalVars.watched;
    } else if (this.getQueueMovies().find((film) => film.id === movie.id)) {
      return globalVars.queue;
    }
  },
};

export default localStorageAPI;
