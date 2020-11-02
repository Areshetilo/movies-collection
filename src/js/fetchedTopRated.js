import moviesService from './APIService/moviesAPI-service';
import globalVars from './globalVars/vars';
import searchErrorNotFound from './components/notifyErrors';
import { updateSwiperMarkup } from './swiper';

const fetchedTopRated = (queryType) => {
  const getMovies = async () => {
    return moviesService.topRatedMovies();
  };

  (function () {
    if (queryType === 'topRated') {
      getMovies()
        .then((moviesArr) => {
          const movies = moviesArr ?? [];
          console.log('movies:', movies);
          if (movies.length) {
            globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
            console.log('moviesArr: ', globalVars.moviesArr);
            updateSwiperMarkup.show(movies);
          }
        })
        .catch((err) => searchErrorNotFound(err))
        .finally(() => {});
    }
  })();
};

export default fetchedTopRated;
