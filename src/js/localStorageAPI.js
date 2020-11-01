import globalVars from "./globalVars/vars";


class LocalStorageAPI{

  constructor() {
    this.toggleMovie = this.toggleMovie.bind(this);
    this.checkMovie = this.checkMovie.bind(this);
  }

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
  }

  addMovie(flagMovie, movie) {
    if (flagMovie === globalVars.watched) {
      movie.watched = true;
      movie.queue = null;
      localStorage.setItem('watchedMovies', JSON.stringify([movie, ...this.getMovies('watchedMovies')]));
    } else {
      movie.queue = true;
      movie.watched = null;
      localStorage.setItem('queueMovies', JSON.stringify([movie, ...this.getMovies('queueMovies')]));
    }
  }

  deleteMovie(keyStorage, movieID) {
    keyStorage === "watchedMovies" ?
      localStorage.setItem('watchedMovies', JSON.stringify(this.getMovies('watchedMovies').filter(film => film.id !== movieID))) :
      localStorage.setItem('queueMovies', JSON.stringify(this.getMovies('queueMovies').filter(film => film.id !== movieID)));
  }


  getMovies(keyStorage) {
    return localStorage.getItem(keyStorage) ? JSON.parse(localStorage.getItem(keyStorage)) : []

  }

  findForID(ID, key) {
    return this.getMovies(key).find(film => film.id === +ID);
  }


  checkMovie(movieID) {
    if (this.getMovies('watchedMovies').length > 0 || this.getMovies('queueMovies').length > 0) {
      if (this.findForID(movieID, 'watchedMovies')) {
        globalVars.currentMovie = this.getMovies('watchedMovies').find(film => film.id === +movieID)
        return globalVars.watched;
      } else if (this.findForID(movieID, 'queueMovies')) {
        globalVars.currentMovie = this.getMovies('queueMovies').find(film => film.id === +movieID)
        return globalVars.queue;
      }
    }
  }
}


export default LocalStorageAPI;
