function checkBodyScroll() {
  document.body.classList.toggle('modal-open');
}

const modalOptions = {
  onShow: () => {
    checkBodyScroll();
  },
  onClose: () => checkBodyScroll(),
};

export default modalOptions;
