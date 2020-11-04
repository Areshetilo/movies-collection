import moviesService from './APIService/moviesAPI-service';
import globalVars from './globalVars/vars';
import searchErrorNotFound from './components/notifyErrors';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import updateSwiperMarkup from './updateSwiperMarkup';

const fetchedTopRated = (queryType) => {
  const getMovies = async () => {
    return moviesService.topRatedMovies();
  };

  (function () {
    if (queryType === 'topRated') {
      getMovies()
        .then((moviesArr) => {
          globalVars.topMoviesArr = moviesArr.results;
          updateSwiperMarkup.show(globalVars.topMoviesArr);
          let mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            speed: 700,
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              940: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            },
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          });
          mySwiper.init();
        })
        .catch((err) => searchErrorNotFound(err))
        .finally(() => {});
    }
  })();
};

export default fetchedTopRated;
