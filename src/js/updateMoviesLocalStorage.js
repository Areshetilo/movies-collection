
const updateMoviesLocalStorage = {


  setAllMovies(){


  },

  setWatchedMovie(arr){
    localStorage.setItem('watchedMovies', JSON.stringify(arr));
  },

  setQueueMovie(){

  },

  getAllMovies(){
    return localStorage.getItem('allMovies')
  },
  getWatchedMovies(){
    if(localStorage.getItem('watchedMovies')){
      return JSON.parse(localStorage.getItem('watchedMovies'))
    }

  },
  getQueueMovies(){
    if(localStorage.getItem('queueMovies')){
      return JSON.parse(localStorage.getItem('queueMovies'))
    }
  }

}


export default  updateMoviesLocalStorage;
