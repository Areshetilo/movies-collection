function scrollToTop(scrollDuration) {
  let scrollStep = -window.scrollY / (scrollDuration / 800),
    scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 400);
}

export default scrollToTop;
