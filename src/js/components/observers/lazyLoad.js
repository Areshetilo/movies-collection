const lazyLoad = () => {
  const imagesArr = Array.from(document.querySelectorAll('.movie-card__image'));
  const options = { rootMargin: '100px' };
  const onEntry = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.lazy;
        observer.unobserve(image);
      }
    });
  };
  const intersectionObserver = new IntersectionObserver(onEntry, options);
  imagesArr.forEach((image) => intersectionObserver.observe(image));
};

export default lazyLoad;
