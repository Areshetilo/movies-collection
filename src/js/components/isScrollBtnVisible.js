import refs from '../refs';

function isVisible() {
  // eslint-disable-next-line radix
  let heightHide = parseInt(refs.toTop.getAttribute('height-hide')) || 100;
  if (
    document.body.scrollTop > heightHide ||
    document.documentElement.scrollTop > heightHide
  ) {
    refs.toTop.classList.remove('simplescrollup__button--hide');
    refs.toTop.classList.add('simplescrollup__button--show');
  } else {
    // Hide
    refs.toTop.classList.remove('simplescrollup__button--show');
    refs.toTop.classList.add('simplescrollup__button--hide');
  }
}

export default isVisible;
