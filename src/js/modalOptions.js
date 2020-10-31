const modalOptions = {
  onShow: () => {
    checkBodyScroll();
  },
  onClose: () => checkBodyScroll(),
};

function checkBodyScroll() {
  document.body.classList.toggle("modal-open");

}


export default modalOptions
