import globalVars from './globalVars/vars';
import updateMoviesMarkup from './updateMoviesMarkup';

const localStorageAPI = {
  toggleMovie(flagMovie) {
    let movie = globalVars.currentMovie;

    if (this.checkMovie(movie.id) === globalVars.watched) {
      this.deleteMovie('watchedMovies', movie.id);
      if (flagMovie === globalVars.queue) {
        this.addMovie(flagMovie, movie);
      }
      return;
    } else if (this.checkMovie(movie.id) === globalVars.queue) {
      this.deleteMovie('queueMovies', movie.id);
      if (flagMovie === globalVars.watched) {
        this.addMovie(flagMovie, movie);
      }
      return;
    }
    this.addMovie(flagMovie, movie);
  },

  addMovie(flagMovie, movie) {
    if (flagMovie === globalVars.watched) {
      movie.watched = true;
      movie.queue = null;
      localStorage.setItem(
        'watchedMovies',
        JSON.stringify([movie, ...this.getMovies('watchedMovies')])
      );
      this.updateView('watchedMovies');
    } else {
      movie.queue = true;
      movie.watched = null;
      localStorage.setItem(
        'queueMovies',
        JSON.stringify([movie, ...this.getMovies('queueMovies')])
      );
      this.updateView('queueMovies');
    }
  },

  deleteMovie(keyStorage, movieID) {
    if (keyStorage === 'watchedMovies') {
      localStorage.setItem(
        'watchedMovies',
        JSON.stringify(
          this.getMovies('watchedMovies').filter((film) => film.id !== movieID)
        )
      );
      this.updateView('watchedMovies');
      return;
    }
    localStorage.setItem(
      'queueMovies',
      JSON.stringify(
        this.getMovies('queueMovies').filter((film) => film.id !== movieID)
      )
    );

    this.updateView('queueMovies');
  },

  getMovies(keyStorage) {
    return localStorage.getItem(keyStorage)
      ? JSON.parse(localStorage.getItem(keyStorage))
      : [];
  },

  findForID(ID, key) {
    return this.getMovies(key).find((film) => film.id === +ID);
  },

  updateView(keyStorage) {
    if (globalVars.activeTab === keyStorage) {
      updateMoviesMarkup.reset();
      updateMoviesMarkup.show(this.getMovies(keyStorage));
    } else if (globalVars.activeTab === keyStorage) {
      updateMoviesMarkup.reset();
      updateMoviesMarkup.show(this.getMovies(keyStorage));
    }
  },

  checkMovie(movieID) {
    if (
      this.getMovies('watchedMovies').length > 0 ||
      this.getMovies('queueMovies').length > 0
    ) {
      if (this.findForID(movieID, 'watchedMovies')) {
        globalVars.currentMovie = this.findForID(movieID, 'watchedMovies');
        return globalVars.watched;
      } else if (this.findForID(movieID, 'queueMovies')) {
        globalVars.currentMovie = this.findForID(movieID, 'queueMovies');
        return globalVars.queue;
      }
    }
  },
};

export default localStorageAPI;
