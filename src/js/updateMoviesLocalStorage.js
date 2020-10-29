import globalVars from "./globalVars/vars";





const updateMoviesLocalStorage = {


  setAll(movie) {
    localStorage.setItem('watchedMovies', JSON.stringify(movie))
  },

  setWatchedMovie(movie) {

    if (this.getMovie(movie) === globalVars.watched) {
      return true
    }
    this.setQueueMovie(movie) &&
    localStorage.setItem('queueMovies', JSON.stringify(this.getQueueMovies().filter(film => film.id !== movie.id)));


    localStorage.setItem('watchedMovies', JSON.stringify([movie, ...this.getWatchedMovies()]));
  },

  setQueueMovie(movie) {
    if (this.getMovie(movie) === globalVars.queue) {
      return true
    }
    this.setWatchedMovie(movie) &&
    localStorage.setItem('queueMovies', JSON.stringify(this.getWatchedMovies().filter(film => film.id !== movie.id)));

    localStorage.setItem('queueMovies', JSON.stringify([movie, ...this.getQueueMovies()]));
  },


  getWatchedMovies() {
    if (localStorage.getItem('watchedMovies')) {
      return JSON.parse(localStorage.getItem('watchedMovies'))
    }

  },
  getQueueMovies() {
    if (localStorage.getItem('queueMovies')) {
      return JSON.parse(localStorage.getItem('queueMovies'))
    }
  },


  getMovie(movie) {

    if (this.getWatchedMovies().find(film => film.id === movie.id)) {
      return globalVars.watched;
    } else if (this.getQueueMovies().find(film => film.id === movie.id)) {
      return globalVars.queue;
    }

  }
}


export default  updateMoviesLocalStorage;
