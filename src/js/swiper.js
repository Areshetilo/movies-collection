import swiperMarkup from '../templates/swiperCard.hbs';
import refs from './refs';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const updateSwiperMarkup = {
  show(movies) {
    const markup = swiperMarkup(movies);
    refs.swiperWrap.insertAdjacentHTML('beforeend', markup);
  },
  reset() {
    refs.swiperWrap.innerHTML = '';
    console.log('убираем разметку');
  },
};

const mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  effect: 'coverflow',
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

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default { updateSwiperMarkup, mySwiper };
