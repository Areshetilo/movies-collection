import { destroyToasty, showToasty } from '../../updateToastyMarkup';
import refs from '../../refs';

const options = { rootMargin: '-60px' };
const onEntry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      showToasty();
      destroyToasty();
    }
  });
};
const intersectionObserver = new IntersectionObserver(onEntry, options);

const footerObserver = () => {
  intersectionObserver.observe(refs.footer);
};

export { footerObserver, intersectionObserver };
