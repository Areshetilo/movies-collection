import refs from './refs';
import moviesService from './APIService/moviesAPI-service';
import globalVars from './globalVars/vars';
import swiperMarkup from '../templates/swiperCard.hbs';
import searchErrorNotFound from './components/notifyErrors';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const updateSwiperMarkup = {
  show(movies) {
    console.log('Создаю Разметку');
    const markup = swiperMarkup(movies);
    refs.swiperWrap.insertAdjacentHTML('beforeend', markup);
  },
};

const fetchedTopRated = (queryType) => {
  const getMovies = async () => {
    return moviesService.topRatedMovies();
  };

  (function () {
    if (queryType === 'topRated') {
      getMovies()
        .then((moviesArr) => {
          const movies = moviesArr.results;
          console.log('topRated:', movies);
          if (movies.length) {
            globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
            console.log('topRatedArr: ', globalVars.moviesArr);
            updateSwiperMarkup.show(movies);
            const mySwiper = new Swiper('.swiper-container', {
              direction: 'horizontal',
              effect: 'slide',
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: 3,
              loop: true,
              speed: 300,
              spaceBetween: 30,
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              },
              autoplay: {
                delay: 3000,
              },
            });
            mySwiper.init();
          }
        })
        .catch((err) => searchErrorNotFound(err))
        .finally(() => {});
    }
  })();
};

export default fetchedTopRated;
